import axios from 'axios';
import { z } from 'zod';
import { createHmac } from 'crypto';

const createAxiosInstance = (config)=>axios.create({
        ...config,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            common: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            ...config?.headers
        },
        baseURL: "https://api.xendit.co"
    });

/**
 * Rate limiter implementation using token bucket algorithm
 */ class RateLimiter {
    /**
   * Refill tokens based on elapsed time
   */ refillTokens() {
        const now = Date.now();
        const timePassed = now - this.lastRefill;
        const tokensToAdd = timePassed / this.config.windowMs * this.config.maxRequests;
        this.tokens = Math.min(this.config.maxRequests, this.tokens + tokensToAdd);
        this.lastRefill = now;
    }
    /**
   * Check if a request can be made
   */ canMakeRequest() {
        this.refillTokens();
        return this.tokens >= 1;
    }
    /**
   * Consume a token for a request
   */ consumeToken() {
        this.refillTokens();
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }
    /**
   * Get time until next token is available
   */ getWaitTime() {
        if (this.canMakeRequest()) {
            return 0;
        }
        const tokensNeeded = 1 - this.tokens;
        return tokensNeeded / this.config.maxRequests * this.config.windowMs;
    }
    /**
   * Wait for a token to become available
   */ async waitForToken() {
        const waitTime = this.getWaitTime();
        if (waitTime > 0) {
            await this.sleep(waitTime);
        }
    }
    /**
   * Sleep for specified milliseconds
   */ sleep(ms) {
        return new Promise((resolve)=>setTimeout(resolve, ms));
    }
    constructor(config = {}){
        this.config = {
            maxRequests: config.maxRequests ?? 100,
            windowMs: config.windowMs ?? 60000,
            requestDelayMs: config.requestDelayMs ?? 0,
            maxRetries: config.maxRetries ?? 3,
            baseRetryDelayMs: config.baseRetryDelayMs ?? 1000,
            maxRetryDelayMs: config.maxRetryDelayMs ?? 30000
        };
        this.tokens = this.config.maxRequests;
        this.lastRefill = Date.now();
    }
}
/**
 * Axios interceptor for rate limiting
 */ function createRateLimitInterceptor(rateLimiter) {
    return {
        request: async (config)=>{
            // Wait for token availability
            await rateLimiter.waitForToken();
            // Consume token
            rateLimiter.consumeToken();
            // Apply request delay if configured
            const delay = rateLimiter.config.requestDelayMs;
            if (delay > 0) {
                await rateLimiter.sleep(delay);
            }
            return config;
        },
        response: (response)=>{
            // Check for rate limit headers and adjust if needed
            const rateLimitRemaining = response.headers["x-ratelimit-remaining"];
            if (rateLimitRemaining !== undefined && Number(rateLimitRemaining) === 0) {
                console.warn("Rate limit reached, requests will be throttled");
            }
            return response;
        },
        responseError: async (error)=>{
            // Handle rate limit errors (HTTP 429)
            if (error.response?.status === 429) {
                const retryAfter = error.response.headers["retry-after"];
                const delay = retryAfter ? Number(retryAfter) * 1000 : rateLimiter.config.baseRetryDelayMs;
                console.warn(`Rate limited, retrying after ${delay}ms`);
                await rateLimiter.sleep(delay);
                // Don't automatically retry here, let the retry interceptor handle it
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    };
}
/**
 * Basic retry interceptor - simplified for compatibility
 */ function createRetryInterceptor(_config = {}) {
    return async (error)=>{
        // For now, just log retryable errors and reject
        // This can be enhanced in the future with proper retry logic
        if (isRetryableError(error)) {
            console.warn("Request failed with retryable error:", error.message);
        }
        return Promise.reject(error);
    };
}
/**
 * Check if an error is retryable
 */ function isRetryableError(error) {
    // No response means network error, which is retryable
    if (!error.response) {
        return true;
    }
    // Specific status codes that are retryable
    const retryableStatusCodes = [
        408,
        429,
        500,
        502,
        503,
        504
    ];
    return retryableStatusCodes.includes(error.response.status);
}
/**
 * Setup rate limiting and retry logic for an Axios instance
 */ function setupRateLimit(axiosInstance, config = {}) {
    const rateLimiter = new RateLimiter(config);
    const rateLimitInterceptor = createRateLimitInterceptor(rateLimiter);
    const retryInterceptor = createRetryInterceptor(config);
    // Add request interceptor for rate limiting
    axiosInstance.interceptors.request.use(rateLimitInterceptor.request, (error)=>Promise.reject(error));
    // Add response interceptors
    axiosInstance.interceptors.response.use(rateLimitInterceptor.response, rateLimitInterceptor.responseError);
    // Add retry interceptor (should be last)
    axiosInstance.interceptors.response.use((response)=>response, retryInterceptor);
}
/**
 * Create a rate-limited axios instance
 */ function createRateLimitedAxios(baseURL, apiKey, config = {}) {
    const axiosInstance = axios.create({
        baseURL,
        headers: {
            Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
            "Content-Type": "application/json"
        }
    });
    setupRateLimit(axiosInstance, config);
    return axiosInstance;
}

const XenditErrorSchema = z.object({
    error_code: z.string(),
    message: z.string(),
    errors: z.array(z.object({
        field: z.string().optional(),
        message: z.string()
    })).optional()
});
class XenditApiError extends Error {
    constructor(message, code, statusCode, details){
        super(message);
        this.name = "XenditApiError";
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        // Maintain proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, XenditApiError);
        }
    }
}
class ValidationError extends Error {
    constructor(message, validationErrors, field){
        super(message);
        this.name = "ValidationError";
        this.field = field;
        this.validationErrors = validationErrors;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidationError);
        }
    }
}
class AuthenticationError extends XenditApiError {
    constructor(message = "Authentication failed"){
        super(message, "AUTHENTICATION_ERROR", 401);
        this.name = "AuthenticationError";
    }
}
class NotFoundError extends XenditApiError {
    constructor(message = "Resource not found"){
        super(message, "NOT_FOUND_ERROR", 404);
        this.name = "NotFoundError";
    }
}
class RateLimitError extends XenditApiError {
    constructor(message = "Rate limit exceeded"){
        super(message, "RATE_LIMIT_ERROR", 429);
        this.name = "RateLimitError";
    }
}
const handleAxiosError = (error)=>{
    if (error.response?.data) {
        const parsed = XenditErrorSchema.safeParse(error.response.data);
        if (parsed.success) {
            throw new XenditApiError(parsed.data.message, parsed.data.error_code, error.response.status, parsed.data.errors ? {
                errors: parsed.data.errors
            } : undefined);
        }
    }
    throw new XenditApiError(error.message || "Unknown API error", error.code || "UNKNOWN_ERROR", error.response?.status, error.response?.data);
};
const validateInput = (schema, data, fieldName)=>{
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new ValidationError(`Validation failed${fieldName ? ` for field ${fieldName}` : ""}`, result.error.issues, fieldName);
    }
    return result.data;
};

const PhoneSchema = z.string().min(7).max(15).refine((value)=>value.startsWith("+"));
const CountrySchema = z.union([
    z.literal("PH"),
    z.literal("ID"),
    z.literal("MY"),
    z.literal("TH"),
    z.literal("VN")
]);
const CurrencySchema = z.union([
    z.literal("PHP"),
    z.literal("IDR"),
    z.literal("MYR"),
    z.literal("THB"),
    z.literal("VND")
]);
const BillingDetailSchema = z.object({
    given_names: z.string(),
    surname: z.string().optional(),
    email: z.string().email().optional(),
    mobile_number: PhoneSchema.optional(),
    phone_number: PhoneSchema.optional()
});

z.union([
    z.literal("INDIVIDUAL"),
    z.literal("BUSINESS")
]);
const IndividualDetailSchema = z.object({
    given_names: z.string(),
    surname: z.string().optional(),
    nationality: z.string().optional(),
    place_of_birth: z.string().optional(),
    date_of_birth: z.string().optional(),
    gender: z.union([
        z.literal("MALE"),
        z.literal("FEMALE"),
        z.literal("OTHER")
    ]).optional(),
    employment: z.object({
        employer_name: z.string(),
        nature_of_business: z.string(),
        role_description: z.string()
    }).optional()
});
z.union([
    z.literal("CORPORATION"),
    z.literal("SOLE_PROPRIETOR"),
    z.literal("PARTNERSHIP"),
    z.literal("COOPERATIVE"),
    z.literal("TRUST"),
    z.literal("NON_PROFIT"),
    z.literal("GOVERNMENT")
]);
const BusinessDetailSchema = z.object({
    business_name: z.string(),
    trading_name: z.string().optional(),
    business_type: z.string()
});
const AddressSchema = z.object({
    street_line1: z.string().nullable().optional(),
    street_line2: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    province_state: z.string().nullable().optional(),
    postal_code: z.string().nullable().optional(),
    country: z.string(),
    category: z.string().nullable().optional(),
    is_primary: z.boolean().nullable().optional()
});
const AccountTypeSchema = z.union([
    z.literal("BANK_ACCOUNT"),
    z.literal("EWALLET"),
    z.literal("CREDIT_CARD"),
    z.literal("PAY_LATER"),
    z.literal("OTC"),
    z.literal("QR_CODE"),
    z.literal("SOCIAL_MEDIA")
]);
const BankAccountSchema$1 = z.object({
    account_number: z.string(),
    account_holder_name: z.string(),
    swift_code: z.string().optional(),
    account_type: z.string().optional(),
    account_details: z.string().optional(),
    currency: z.string().optional()
});
const EWalletAccountSchema = z.object({
    account_number: z.string(),
    account_holder_name: z.string(),
    currency: z.string().optional()
});
const CreditCardAccountSchema = z.object({
    token_id: z.string()
});
const OTCAccountSchema = z.object({
    payment_code: z.string(),
    expires_at: z.string().optional()
});
const QrAccountSchema = z.object({
    qr_string: z.string()
});
const PayLaterAccountSchema = z.object({
    account_id: z.string(),
    account_holder_name: z.string().optional(),
    currency: CurrencySchema.optional()
});
const SocialMediaAccountSchema = z.object({
    account_id: z.string(),
    account_handle: z.string().optional()
});
const PropertiesSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("BANK_ACCOUNT"),
        properties: BankAccountSchema$1
    }),
    z.object({
        type: z.literal("EWALLET"),
        properties: EWalletAccountSchema
    }),
    z.object({
        type: z.literal("CREDIT_CARD"),
        properties: CreditCardAccountSchema
    }),
    z.object({
        type: z.literal("OTC"),
        properties: OTCAccountSchema
    }),
    z.object({
        type: z.literal("QR_CODE"),
        properties: QrAccountSchema
    }),
    z.object({
        type: z.literal("PAY_LATER"),
        properties: PayLaterAccountSchema
    }),
    z.object({
        type: z.literal("SOCIAL_MEDIA"),
        properties: SocialMediaAccountSchema
    })
]);
const IdentityAccountSchema = z.object({
    type: AccountTypeSchema,
    company: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    properties: PropertiesSchema
});
const KYCDocumentSchema = z.object({
    type: z.string(),
    sub_type: z.string(),
    country: z.string(),
    document_name: z.string(),
    document_number: z.string(),
    expires_at: z.null(),
    holder_name: z.string(),
    document_images: z.array(z.string())
});
const CommonCustomerResourceSchema = z.object({
    individual_detail: IndividualDetailSchema.optional(),
    business_detail: BusinessDetailSchema.optional(),
    email: z.string().email().optional(),
    mobile_number: PhoneSchema.optional(),
    phone_number: PhoneSchema.optional(),
    hashed_phone_number: z.string().nullable().optional(),
    addresses: z.array(AddressSchema).optional(),
    identity_accounts: z.array(IdentityAccountSchema).optional(),
    kyc_documents: z.array(KYCDocumentSchema).optional(),
    description: z.string().nullable().optional(),
    date_of_registration: z.string().nullable().optional(),
    domicile_of_registration: z.string().nullable().optional(),
    metadata: z.object({}).nullable().optional()
});
// Create a discriminated union for customer types
const CustomerSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("INDIVIDUAL"),
        reference_id: z.string(),
        individual_detail: IndividualDetailSchema,
        business_detail: z.undefined().optional(),
        email: z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: z.string().nullable().optional(),
        addresses: z.array(AddressSchema).optional(),
        identity_accounts: z.array(IdentityAccountSchema).optional(),
        kyc_documents: z.array(KYCDocumentSchema).optional(),
        description: z.string().nullable().optional(),
        date_of_registration: z.string().nullable().optional(),
        domicile_of_registration: z.string().nullable().optional(),
        metadata: z.object({}).nullable().optional()
    }),
    z.object({
        type: z.literal("BUSINESS"),
        reference_id: z.string(),
        individual_detail: z.undefined().optional(),
        business_detail: BusinessDetailSchema,
        email: z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: z.string().nullable().optional(),
        addresses: z.array(AddressSchema).optional(),
        identity_accounts: z.array(IdentityAccountSchema).optional(),
        kyc_documents: z.array(KYCDocumentSchema).optional(),
        description: z.string().nullable().optional(),
        date_of_registration: z.string().nullable().optional(),
        domicile_of_registration: z.string().nullable().optional(),
        metadata: z.object({}).nullable().optional()
    })
]);
const GetCustomerSchema = z.object({
    id: z.string()
});
// Create CustomerResourceSchema by extending both discriminated union options
const CustomerResourceSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("INDIVIDUAL"),
        id: z.string(),
        reference_id: z.string(),
        individual_detail: IndividualDetailSchema,
        business_detail: z.undefined().optional(),
        email: z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: z.string().nullable().optional(),
        addresses: z.array(AddressSchema).optional(),
        identity_accounts: z.array(IdentityAccountSchema).optional(),
        kyc_documents: z.array(KYCDocumentSchema).optional(),
        description: z.string().nullable().optional(),
        date_of_registration: z.string().nullable().optional(),
        domicile_of_registration: z.string().nullable().optional(),
        metadata: z.object({}).nullable().optional(),
        created: z.string().datetime(),
        updated: z.string().datetime()
    }),
    z.object({
        type: z.literal("BUSINESS"),
        id: z.string(),
        reference_id: z.string(),
        individual_detail: z.undefined().optional(),
        business_detail: BusinessDetailSchema,
        email: z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: z.string().nullable().optional(),
        addresses: z.array(AddressSchema).optional(),
        identity_accounts: z.array(IdentityAccountSchema).optional(),
        kyc_documents: z.array(KYCDocumentSchema).optional(),
        description: z.string().nullable().optional(),
        date_of_registration: z.string().nullable().optional(),
        domicile_of_registration: z.string().nullable().optional(),
        metadata: z.object({}).nullable().optional(),
        created: z.string().datetime(),
        updated: z.string().datetime()
    })
]);
const GetCustomerByRefIdSchema = z.object({
    reference_id: z.string()
});
z.object({
    data: z.array(CustomerResourceSchema),
    hasMore: z.boolean()
});
const UpdateParamsSchema = z.object({
    id: z.string(),
    payload: CommonCustomerResourceSchema
});

const createCustomer = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CustomerSchema, params, "customer params");
        const response = await axiosInstance.post(config?.url ?? "/customers", validatedParams, config);
        // Note: Actual API response might not match discriminated union exactly
        // For production use, consider making the schema more flexible
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getCustomerId = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetCustomerSchema, params, "get customer params");
        const response = await axiosInstance.get(config?.url ?? `/customers/${validatedParams.id}`, config);
        // Note: Actual API response might not match discriminated union exactly
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getCustomerRefId = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetCustomerByRefIdSchema, params, "get customer by ref params");
        const response = await axiosInstance.get(config?.url ?? `/customers?reference_id=${validatedParams.reference_id}`, config);
        // Note: Actual API response might not match discriminated union exactly
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const updateCustomer = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(UpdateParamsSchema, params, "update customer params");
        const response = await axiosInstance.patch(config?.url ?? `/customers/${validatedParams.id}`, validatedParams.payload, config);
        // Note: Actual API response might not match discriminated union exactly
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

const CheckoutMethodSchema = z.union([
    z.literal("ONE_TIME_PAYMENT"),
    z.literal("TOKENIZED_PAYMENT")
]);
const ChannelCodeSchema = z.union([
    z.literal("ID_OVO"),
    z.literal("ID_DANA"),
    z.literal("ID_LINKAJA"),
    z.literal("ID_SHOPEEPAY"),
    z.literal("ID_ASTRAPAY"),
    z.literal("ID_JENIUSPAY"),
    z.literal("ID_SAKUKU"),
    z.literal("PH_PAYMAYA"),
    z.literal("PH_GCASH"),
    z.literal("PH_GRABPAY"),
    z.literal("PH_SHOPEEPAY"),
    z.literal("VN_APPOTA"),
    z.literal("VN_MOMO"),
    z.literal("VN_SHOPEEPAY"),
    z.literal("VN_VNPTWALLET"),
    z.literal("VN_VIETTELPAY"),
    z.literal("VN_ZALOPAY"),
    z.literal("TH_WECHATPAY"),
    z.literal("TH_LINEPAY"),
    z.literal("TH_TRUEMONEY"),
    z.literal("TH_SHOPEEPAY"),
    z.literal("MY_TOUCHNGO"),
    z.literal("MY_SHOPEEPAY"),
    z.literal("MY_GRABPAY")
]);
const OVOChannelSchema = z.object({
    mobile_number: PhoneSchema
});
const ChannelsSchema = z.object({
    cashtag: z.string().refine((value)=>value.startsWith("$")).optional(),
    mobile_number: PhoneSchema.optional(),
    success_redirect_url: z.string().url().optional(),
    failure_redirect_url: z.string().url().optional(),
    cancel_redirect_url: z.string().url().optional(),
    redeem_points: z.union([
        z.literal("REDEEM_ALL"),
        z.literal("REDEEM_NONE")
    ]).default("REDEEM_NONE").optional()
});
const ChannelPropertiesSchema$1 = z.discriminatedUnion("channel_code", [
    z.object({
        channel_code: z.literal("ID_OVO"),
        channel_properties: OVOChannelSchema
    }),
    z.object({
        channel_code: z.literal("ID_JENIUSPAY"),
        properties: z.discriminatedUnion("method", [
            z.object({
                method: z.literal("ONE_TIME_PAYMENT"),
                properties: z.object({
                    cashtag: z.string().refine((value)=>value.startsWith("$"))
                })
            }),
            z.object({
                method: z.literal("TOKENIZED_PAYMENT"),
                properties: z.object({
                    success_redirect_url: z.string().url(),
                    failure_redirect_url: z.string().url(),
                    redeem_points: z.union([
                        z.literal("REDEEM_ALL"),
                        z.literal("REDEEM_NONE")
                    ]).default("REDEEM_NONE").optional()
                })
            })
        ])
    }),
    z.object({
        channel_code: z.union([
            z.literal("ID_DANA"),
            z.literal("ID_LINKAJA"),
            z.literal("ID_SHOPEEPAY"),
            z.literal("PH_SHOPEEPAY"),
            z.literal("TH_SHOPEEPAY"),
            z.literal("TH_WECHATPAY"),
            z.literal("TH_TOUCHNGO"),
            z.literal("TH_TRUEMONEY"),
            z.literal("ID_SAKUKU")
        ]),
        properties: z.discriminatedUnion("method", [
            z.object({
                method: z.literal("ONE_TIME_PAYMENT"),
                properties: z.object({
                    success_redirect_url: z.string().url()
                })
            }),
            z.object({
                method: z.literal("TOKENIZED_PAYMENT"),
                properties: z.object({
                    success_redirect_url: z.string().url(),
                    failure_redirect_url: z.string().url(),
                    redeem_points: z.union([
                        z.literal("REDEEM_ALL"),
                        z.literal("REDEEM_NONE")
                    ]).default("REDEEM_NONE").optional()
                })
            })
        ])
    }),
    z.object({
        channel_code: z.literal("PH_PAYMAYA"),
        properties: z.object({
            success_redirect_url: z.string().url(),
            failure_redirect_url: z.string().url(),
            cancel_redirect_url: z.string().url()
        })
    })
]);
const LineItemSchema = z.object({
    reference_id: z.string(),
    name: z.string(),
    category: z.string(),
    currency: CurrencySchema,
    price: z.number(),
    quantity: z.number(),
    type: z.union([
        z.literal("PRODUCT"),
        z.literal("SERVICE")
    ]),
    url: z.string().url().optional(),
    description: z.string().optional(),
    subcategory: z.string().optional(),
    metadata: z.object({}).optional()
});
// Create a discriminated union based on checkout method
const EWalletChargeSchema = z.discriminatedUnion("checkout_method", [
    z.object({
        reference_id: z.string(),
        currency: CurrencySchema,
        amount: z.number(),
        checkout_method: z.literal("ONE_TIME_PAYMENT"),
        channel_code: ChannelCodeSchema,
        channel_properties: ChannelsSchema,
        payment_method_id: z.undefined().optional(),
        customer_id: z.string().optional(),
        basket: z.array(LineItemSchema).optional(),
        metadata: z.object({}).optional()
    }),
    z.object({
        reference_id: z.string(),
        currency: CurrencySchema,
        amount: z.number(),
        checkout_method: z.literal("TOKENIZED_PAYMENT"),
        channel_code: ChannelCodeSchema.optional(),
        channel_properties: ChannelsSchema,
        payment_method_id: z.string(),
        customer_id: z.string().optional(),
        basket: z.array(LineItemSchema).optional(),
        metadata: z.object({}).optional()
    })
]);
const EWalletStatusSchema = z.union([
    z.literal("SUCCEEDED"),
    z.literal("PENDING"),
    z.literal("FAILED"),
    z.literal("VOIDED"),
    z.literal("REFUNDED")
]);
const EWalletResourceActionsSchema = z.object({
    desktop_web_checkout_url: z.string().url().optional(),
    mobile_web_checkout_url: z.string().url().optional(),
    mobile_deeplink_checkout_url: z.string().url().optional(),
    qr_checkout_string: z.string().url().optional()
});
const EWalletChargeResourceSchema = z.object({
    id: z.string(),
    business_id: z.string(),
    reference_id: z.string(),
    status: EWalletStatusSchema,
    currency: CurrencySchema,
    charge_amount: z.number(),
    capture_amount: z.number().optional(),
    refunded_amount: z.number().nullable(),
    checkout_method: CheckoutMethodSchema,
    channel_code: ChannelCodeSchema,
    channel_properties: ChannelPropertiesSchema$1,
    actions: EWalletResourceActionsSchema.optional(),
    is_redirect_required: z.boolean(),
    callback_url: z.string(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
    void_status: z.string().nullable(),
    voided_at: z.string().nullable(),
    capture_now: z.boolean(),
    customer_id: z.string().nullable(),
    payment_method_id: z.string().nullable(),
    failure_code: z.string().nullable(),
    basket: z.array(LineItemSchema).optional(),
    metadata: z.object({}).optional()
});
const GetEWalletChargeSchema = z.object({
    id: z.string().startsWith("ewc")
});

const createEwalletCharge = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(EWalletChargeSchema, params, "ewallet charge params");
        const response = await axiosInstance.post(config?.url ?? "/ewallets/charges", validatedParams, config);
        return validateInput(EWalletChargeResourceSchema, response.data, "ewallet charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getEwalletCharge = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetEWalletChargeSchema, params, "get ewallet charge params");
        const response = await axiosInstance.get(config?.url ?? `/ewallets/charges/${validatedParams.id}`, config);
        return validateInput(EWalletChargeResourceSchema, response.data, "ewallet charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

// Payment Method Types
const PaymentMethodTypeSchema = z.union([
    z.literal("CARD"),
    z.literal("BANK_ACCOUNT"),
    z.literal("EWALLET"),
    z.literal("OVER_THE_COUNTER"),
    z.literal("VIRTUAL_ACCOUNT"),
    z.literal("QR_CODE")
]);
// Payment Method Status
const PaymentMethodStatusSchema = z.union([
    z.literal("ACTIVE"),
    z.literal("INACTIVE"),
    z.literal("PENDING"),
    z.literal("EXPIRED"),
    z.literal("FAILED")
]);
// Card Properties
const CardPropertiesSchema = z.object({
    card_last_four: z.string(),
    card_expiry_month: z.string(),
    card_expiry_year: z.string(),
    network: z.string(),
    country: CountrySchema.optional(),
    issuer: z.string().optional(),
    type: z.union([
        z.literal("CREDIT"),
        z.literal("DEBIT")
    ]).optional(),
    currency: CurrencySchema.optional()
});
// Bank Account Properties
const BankAccountPropertiesSchema = z.object({
    account_number: z.string(),
    account_holder_name: z.string(),
    bank_code: z.string(),
    account_type: z.string().optional(),
    currency: CurrencySchema
});
// E-wallet Properties
const EwalletPropertiesSchema = z.object({
    account_details: z.string(),
    currency: CurrencySchema
});
// Payment Method Properties (Discriminated Union)
z.discriminatedUnion("type", [
    z.object({
        type: z.literal("CARD"),
        card: CardPropertiesSchema
    }),
    z.object({
        type: z.literal("BANK_ACCOUNT"),
        bank_account: BankAccountPropertiesSchema
    }),
    z.object({
        type: z.literal("EWALLET"),
        ewallet: EwalletPropertiesSchema
    })
]);
// Create Payment Method Request
const CreatePaymentMethodSchema = z.object({
    type: PaymentMethodTypeSchema,
    country: CountrySchema.optional(),
    reusability: z.union([
        z.literal("ONE_TIME_USE"),
        z.literal("MULTIPLE_USE")
    ]),
    description: z.string().optional(),
    reference_id: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
    // Specific properties based on type
    card: z.object({
        currency: CurrencySchema.optional(),
        channel_properties: z.object({
            success_return_url: z.string().url().optional(),
            failure_return_url: z.string().url().optional()
        }).optional()
    }).optional(),
    bank_account: z.object({
        currency: CurrencySchema,
        channel_properties: z.object({
            account_mobile_number: z.string().optional(),
            card_last_four: z.string().optional(),
            card_expiry_month: z.string().optional(),
            card_expiry_year: z.string().optional(),
            account_email: z.string().email().optional()
        }).optional()
    }).optional(),
    ewallet: z.object({
        channel_code: z.string(),
        channel_properties: z.object({
            success_return_url: z.string().url().optional(),
            failure_return_url: z.string().url().optional(),
            cancel_return_url: z.string().url().optional()
        }).optional()
    }).optional()
});
// Update Payment Method Request
const UpdatePaymentMethodSchema = z.object({
    description: z.string().optional(),
    reference_id: z.string().optional(),
    status: PaymentMethodStatusSchema.optional(),
    metadata: z.record(z.unknown()).optional()
});
// Payment Method Resource
const PaymentMethodResourceSchema = z.object({
    id: z.string(),
    type: PaymentMethodTypeSchema,
    country: CountrySchema.optional(),
    business_id: z.string(),
    customer_id: z.string().optional(),
    reference_id: z.string().optional(),
    description: z.string().optional(),
    status: PaymentMethodStatusSchema,
    reusability: z.union([
        z.literal("ONE_TIME_USE"),
        z.literal("MULTIPLE_USE")
    ]),
    actions: z.array(z.object({
        action: z.string(),
        url: z.string().url().optional(),
        url_type: z.string().optional(),
        method: z.string().optional()
    })).optional(),
    metadata: z.record(z.unknown()).optional(),
    billing_information: z.object({
        country: CountrySchema.optional(),
        street_line1: z.string().optional(),
        street_line2: z.string().optional(),
        city: z.string().optional(),
        province_state: z.string().optional(),
        postal_code: z.string().optional()
    }).optional(),
    failure_code: z.string().nullable().optional(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
    // Type-specific properties
    card: CardPropertiesSchema.optional(),
    bank_account: BankAccountPropertiesSchema.optional(),
    ewallet: EwalletPropertiesSchema.optional()
});
// Get Payment Method Request
const GetPaymentMethodSchema = z.object({
    id: z.string()
});
// List Payment Methods Request
const ListPaymentMethodsSchema = z.object({
    id: z.array(z.string()).optional(),
    type: z.array(PaymentMethodTypeSchema).optional(),
    status: z.array(PaymentMethodStatusSchema).optional(),
    reusability: z.union([
        z.literal("ONE_TIME_USE"),
        z.literal("MULTIPLE_USE")
    ]).optional(),
    customer_id: z.string().optional(),
    reference_id: z.string().optional(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    limit: z.number().min(1).max(100).default(10).optional()
});
// List Payment Methods Response
z.object({
    data: z.array(PaymentMethodResourceSchema),
    has_more: z.boolean(),
    links: z.object({
        href: z.string(),
        rel: z.string(),
        method: z.string()
    }).array()
});
// Update Payment Method Params
const UpdatePaymentMethodParamsSchema = z.object({
    id: z.string(),
    payload: UpdatePaymentMethodSchema
});

const createPaymentMethod = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CreatePaymentMethodSchema, params, "payment method params");
        const response = await axiosInstance.post(config?.url ?? "/v2/payment_methods", validatedParams, config);
        // Note: Actual API response handling - relaxed validation for production flexibility
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getPaymentMethod = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetPaymentMethodSchema, params, "get payment method params");
        const response = await axiosInstance.get(config?.url ?? `/v2/payment_methods/${validatedParams.id}`, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const listPaymentMethods = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = params ? validateInput(ListPaymentMethodsSchema, params, "list payment methods params") : {};
        const queryParams = new URLSearchParams();
        if (validatedParams.id) {
            validatedParams.id.forEach((id)=>queryParams.append("id[]", id));
        }
        if (validatedParams.type) {
            validatedParams.type.forEach((type)=>queryParams.append("type[]", type));
        }
        if (validatedParams.status) {
            validatedParams.status.forEach((status)=>queryParams.append("status[]", status));
        }
        if (validatedParams.reusability) {
            queryParams.append("reusability", validatedParams.reusability);
        }
        if (validatedParams.customer_id) {
            queryParams.append("customer_id", validatedParams.customer_id);
        }
        if (validatedParams.reference_id) {
            queryParams.append("reference_id", validatedParams.reference_id);
        }
        if (validatedParams.after_id) {
            queryParams.append("after_id", validatedParams.after_id);
        }
        if (validatedParams.before_id) {
            queryParams.append("before_id", validatedParams.before_id);
        }
        if (validatedParams.limit) {
            queryParams.append("limit", validatedParams.limit.toString());
        }
        const queryString = queryParams.toString();
        const url = queryString ? `/v2/payment_methods?${queryString}` : "/v2/payment_methods";
        if (!axiosInstance) {
            throw new Error('axiosInstance is required');
        }
        const response = await axiosInstance.get(config?.url ?? url, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const updatePaymentMethod = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(UpdatePaymentMethodParamsSchema, params, "update payment method params");
        const response = await axiosInstance.patch(config?.url ?? `/v2/payment_methods/${validatedParams.id}`, validatedParams.payload, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

// Invoice Status
const InvoiceStatusSchema = z.union([
    z.literal("PENDING"),
    z.literal("PAID"),
    z.literal("SETTLED"),
    z.literal("EXPIRED")
]);
// Payer Email
z.object({
    email: z.string().email()
});
// Invoice Item
const InvoiceItemSchema = z.object({
    name: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
    category: z.string().optional(),
    url: z.string().url().optional()
});
// Customer Notification Preference
const CustomerNotificationPreferenceSchema = z.object({
    invoice_created: z.array(z.union([
        z.literal("whatsapp"),
        z.literal("sms"),
        z.literal("email")
    ])).optional(),
    invoice_reminder: z.array(z.union([
        z.literal("whatsapp"),
        z.literal("sms"),
        z.literal("email")
    ])).optional(),
    invoice_paid: z.array(z.union([
        z.literal("whatsapp"),
        z.literal("sms"),
        z.literal("email")
    ])).optional(),
    invoice_expired: z.array(z.union([
        z.literal("whatsapp"),
        z.literal("sms"),
        z.literal("email")
    ])).optional()
});
// Customer Details
const CustomerDetailsSchema = z.object({
    customer_name: z.string().optional(),
    customer_email: z.string().email().optional(),
    customer_phone: z.string().optional(),
    billing_address: z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        postal_code: z.string().optional(),
        phone: z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional(),
    shipping_address: z.object({
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        postal_code: z.string().optional(),
        phone: z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional()
});
// Fee Details
const FeeSchema = z.object({
    type: z.string(),
    value: z.number()
});
// Available Bank and E-wallet
const AvailableBankSchema = z.object({
    bank_code: z.string(),
    collection_type: z.string(),
    bank_branch: z.string(),
    transfer_amount: z.number(),
    bank_account_number: z.string(),
    account_holder_name: z.string(),
    identity_amount: z.number().optional()
});
const AvailableEwalletSchema = z.object({
    ewallet_type: z.string()
});
const AvailableRetailOutletSchema = z.object({
    retail_outlet_name: z.string()
});
// Create Invoice Schema
const CreateInvoiceSchema = z.object({
    external_id: z.string(),
    payer_email: z.string().email(),
    description: z.string(),
    amount: z.number().positive(),
    invoice_duration: z.number().positive().optional(),
    callback_virtual_account_id: z.string().optional(),
    should_exclude_credit_card: z.boolean().optional(),
    should_send_email: z.boolean().optional(),
    customer_name: z.string().optional(),
    customer_email: z.string().email().optional(),
    customer_phone: z.string().optional(),
    customer: CustomerDetailsSchema.optional(),
    customer_notification_preference: CustomerNotificationPreferenceSchema.optional(),
    success_redirect_url: z.string().url().optional(),
    failure_redirect_url: z.string().url().optional(),
    payment_methods: z.array(z.string()).optional(),
    mid_label: z.string().optional(),
    should_authenticate_credit_card: z.boolean().optional(),
    currency: CurrencySchema.optional(),
    items: z.array(InvoiceItemSchema).optional(),
    fixed_va: z.boolean().optional(),
    reminder_time_unit: z.union([
        z.literal("days"),
        z.literal("hours"),
        z.literal("minutes")
    ]).optional(),
    reminder_time: z.number().optional(),
    locale: z.string().optional(),
    fees: z.array(FeeSchema).optional(),
    metadata: z.record(z.unknown()).optional()
});
// Update Invoice Schema
const UpdateInvoiceSchema = z.object({
    should_send_email: z.boolean().optional(),
    customer_name: z.string().optional(),
    customer_email: z.string().email().optional(),
    customer_phone: z.string().optional(),
    customer: CustomerDetailsSchema.optional(),
    customer_notification_preference: CustomerNotificationPreferenceSchema.optional(),
    success_redirect_url: z.string().url().optional(),
    failure_redirect_url: z.string().url().optional(),
    items: z.array(InvoiceItemSchema).optional(),
    metadata: z.record(z.unknown()).optional()
});
// Invoice Resource
const InvoiceResourceSchema = z.object({
    id: z.string(),
    external_id: z.string(),
    user_id: z.string(),
    status: InvoiceStatusSchema,
    merchant_name: z.string(),
    merchant_profile_picture_url: z.string().url(),
    amount: z.number(),
    payer_email: z.string().email(),
    description: z.string(),
    expiry_date: z.string().datetime(),
    invoice_url: z.string().url(),
    should_exclude_credit_card: z.boolean(),
    should_send_email: z.boolean(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
    currency: CurrencySchema,
    paid_amount: z.number().optional(),
    credit_card_charge_id: z.string().optional(),
    payment_method: z.string().optional(),
    payment_channel: z.string().optional(),
    payment_destination: z.string().optional(),
    payment_id: z.string().optional(),
    paid_at: z.string().datetime().optional(),
    bank_code: z.string().optional(),
    ewallet_type: z.string().optional(),
    on_demand_link: z.string().url().optional(),
    recurring_payment_id: z.string().optional(),
    // Customer information
    customer_name: z.string().optional(),
    customer_email: z.string().email().optional(),
    customer_phone: z.string().optional(),
    customer: CustomerDetailsSchema.optional(),
    customer_notification_preference: CustomerNotificationPreferenceSchema.optional(),
    // URLs
    success_redirect_url: z.string().url().optional(),
    failure_redirect_url: z.string().url().optional(),
    // Items and fees
    items: z.array(InvoiceItemSchema).optional(),
    fees: z.array(FeeSchema).optional(),
    // Available payment methods
    available_banks: z.array(AvailableBankSchema).optional(),
    available_ewallets: z.array(AvailableEwalletSchema).optional(),
    available_retail_outlets: z.array(AvailableRetailOutletSchema).optional(),
    available_paylaters: z.array(z.object({
        paylater_type: z.string()
    })).optional(),
    available_qr_codes: z.array(z.object({
        qr_code_type: z.string()
    })).optional(),
    available_direct_debits: z.array(z.object({
        direct_debit_type: z.string()
    })).optional(),
    should_authenticate_credit_card: z.boolean().optional(),
    metadata: z.record(z.unknown()).optional()
});
// Get Invoice Schema
const GetInvoiceSchema = z.object({
    invoice_id: z.string()
});
// List Invoices Schema
const ListInvoicesSchema = z.object({
    statuses: z.array(InvoiceStatusSchema).optional(),
    limit: z.number().min(1).max(100).optional(),
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional(),
    paid_after: z.string().datetime().optional(),
    paid_before: z.string().datetime().optional(),
    expired_after: z.string().datetime().optional(),
    expired_before: z.string().datetime().optional(),
    last_invoice: z.string().optional(),
    client_types: z.array(z.string()).optional(),
    payment_channels: z.array(z.string()).optional(),
    on_demand_link: z.string().optional(),
    recurring_payment_id: z.string().optional()
});
// List Invoices Response
z.object({
    has_more: z.boolean(),
    data: z.array(InvoiceResourceSchema)
});
// Update Invoice Params
const UpdateInvoiceParamsSchema = z.object({
    invoice_id: z.string(),
    payload: UpdateInvoiceSchema
});
// Expire Invoice Schema
const ExpireInvoiceSchema = z.object({
    invoice_id: z.string()
});

const createInvoice = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CreateInvoiceSchema, params, "invoice params");
        const response = await axiosInstance.post(config?.url ?? "/v2/invoices", validatedParams, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getInvoice = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetInvoiceSchema, params, "get invoice params");
        const response = await axiosInstance.get(config?.url ?? `/v2/invoices/${validatedParams.invoice_id}`, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const listInvoices = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = params ? validateInput(ListInvoicesSchema, params, "list invoices params") : {};
        const queryParams = new URLSearchParams();
        if (validatedParams.statuses) {
            validatedParams.statuses.forEach((status)=>queryParams.append("statuses[]", status));
        }
        if (validatedParams.limit) {
            queryParams.append("limit", validatedParams.limit.toString());
        }
        if (validatedParams.created_after) {
            queryParams.append("created_after", validatedParams.created_after);
        }
        if (validatedParams.created_before) {
            queryParams.append("created_before", validatedParams.created_before);
        }
        if (validatedParams.paid_after) {
            queryParams.append("paid_after", validatedParams.paid_after);
        }
        if (validatedParams.paid_before) {
            queryParams.append("paid_before", validatedParams.paid_before);
        }
        if (validatedParams.expired_after) {
            queryParams.append("expired_after", validatedParams.expired_after);
        }
        if (validatedParams.expired_before) {
            queryParams.append("expired_before", validatedParams.expired_before);
        }
        if (validatedParams.last_invoice) {
            queryParams.append("last_invoice", validatedParams.last_invoice);
        }
        if (validatedParams.client_types) {
            validatedParams.client_types.forEach((type)=>queryParams.append("client_types[]", type));
        }
        if (validatedParams.payment_channels) {
            validatedParams.payment_channels.forEach((channel)=>queryParams.append("payment_channels[]", channel));
        }
        if (validatedParams.on_demand_link) {
            queryParams.append("on_demand_link", validatedParams.on_demand_link);
        }
        if (validatedParams.recurring_payment_id) {
            queryParams.append("recurring_payment_id", validatedParams.recurring_payment_id);
        }
        const queryString = queryParams.toString();
        const url = queryString ? `/v2/invoices?${queryString}` : "/v2/invoices";
        if (!axiosInstance) {
            throw new Error('axiosInstance is required');
        }
        const response = await axiosInstance.get(config?.url ?? url, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const updateInvoice = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(UpdateInvoiceParamsSchema, params, "update invoice params");
        const response = await axiosInstance.patch(config?.url ?? `/v2/invoices/${validatedParams.invoice_id}`, validatedParams.payload, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const expireInvoice = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(ExpireInvoiceSchema, params, "expire invoice params");
        const response = await axiosInstance.post(config?.url ?? `/invoices/${validatedParams.invoice_id}/expire`, {}, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

// Payment Request Types
const PaymentRequestTypeSchema = z.union([
    z.literal("PAY"),
    z.literal("PAY_AND_SAVE"),
    z.literal("REUSABLE_PAYMENT_CODE")
]);
// Capture Method
const CaptureMethodSchema = z.union([
    z.literal("AUTOMATIC"),
    z.literal("MANUAL")
]);
// Payment Request Status
const PaymentRequestStatusSchema = z.union([
    z.literal("PENDING"),
    z.literal("REQUIRES_ACTION"),
    z.literal("SUCCEEDED"),
    z.literal("FAILED"),
    z.literal("VOIDED"),
    z.literal("CANCELED")
]);
// Channel Code (simplified - can be expanded)
z.string();
// Channel Properties
const ChannelPropertiesSchema = z.record(z.unknown());
// Payment Method
const PaymentMethodSchema = z.object({
    type: z.string(),
    card_information: z.object({
        token_id: z.string()
    }).optional(),
    ewallet: z.object({
        channel_code: z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    direct_debit: z.object({
        channel_code: z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    over_the_counter: z.object({
        channel_code: z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    qr_code: z.object({
        channel_code: z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    virtual_account: z.object({
        channel_code: z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional()
});
// Create Payment Request Schema
const CreatePaymentRequestSchema = z.object({
    reference_id: z.string(),
    type: PaymentRequestTypeSchema,
    country: CountrySchema,
    currency: CurrencySchema,
    request_amount: z.number().positive(),
    payment_method: PaymentMethodSchema,
    description: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
    customer_id: z.string().optional(),
    customer: z.object({
        given_names: z.string(),
        surname: z.string().optional(),
        email: z.string().email().optional(),
        mobile_number: z.string().optional()
    }).optional(),
    shipping_information: z.object({
        name: z.string(),
        phone_number: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        postal_code: z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional(),
    items: z.array(z.object({
        name: z.string(),
        quantity: z.number().positive(),
        price: z.number().positive(),
        category: z.string().optional(),
        reference_id: z.string().optional(),
        url: z.string().url().optional()
    })).optional(),
    capture_method: CaptureMethodSchema.optional(),
    success_redirect_url: z.string().url().optional(),
    failure_redirect_url: z.string().url().optional()
});
// Payment Request Resource
const PaymentRequestResourceSchema = z.object({
    id: z.string(),
    reference_id: z.string(),
    type: PaymentRequestTypeSchema,
    country: CountrySchema,
    currency: CurrencySchema,
    request_amount: z.number(),
    paid_amount: z.number().optional(),
    status: PaymentRequestStatusSchema,
    payment_method: PaymentMethodSchema,
    description: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
    customer_id: z.string().optional(),
    customer: z.object({
        given_names: z.string(),
        surname: z.string().optional(),
        email: z.string().email().optional(),
        mobile_number: z.string().optional()
    }).optional(),
    shipping_information: z.object({
        name: z.string(),
        phone_number: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        province: z.string().optional(),
        postal_code: z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional(),
    items: z.array(z.object({
        name: z.string(),
        quantity: z.number().positive(),
        price: z.number().positive(),
        category: z.string().optional(),
        reference_id: z.string().optional(),
        url: z.string().url().optional()
    })).optional(),
    actions: z.object({
        desktop_web_checkout_url: z.string().url().optional(),
        mobile_web_checkout_url: z.string().url().optional(),
        mobile_deeplink_checkout_url: z.string().url().optional(),
        qr_checkout_string: z.string().optional()
    }).optional(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
    failure_reason: z.string().optional(),
    payment_request_id: z.string().optional()
});
// Get Payment Request Schema
const GetPaymentRequestSchema = z.object({
    id: z.string()
});
// List Payment Requests Schema
const ListPaymentRequestsSchema = z.object({
    reference_id: z.string().optional(),
    customer_id: z.string().optional(),
    status: z.array(PaymentRequestStatusSchema).optional(),
    limit: z.number().min(1).max(100).optional(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional()
});
// List Payment Requests Response
z.object({
    data: z.array(PaymentRequestResourceSchema),
    has_more: z.boolean(),
    links: z.array(z.object({
        href: z.string(),
        rel: z.string(),
        method: z.string()
    })).optional()
});

const createPaymentRequest = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CreatePaymentRequestSchema, params, "payment request params");
        const response = await axiosInstance.post(config?.url ?? "/v3/payment_requests", validatedParams, {
            ...config,
            headers: {
                "api-version": "2024-11-11",
                ...config?.headers
            }
        });
        return validateInput(PaymentRequestResourceSchema, response.data, "payment request response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getPaymentRequest = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetPaymentRequestSchema, params, "get payment request params");
        const response = await axiosInstance.get(config?.url ?? `/v3/payment_requests/${validatedParams.id}`, {
            ...config,
            headers: {
                "api-version": "2024-11-11",
                ...config?.headers
            }
        });
        return validateInput(PaymentRequestResourceSchema, response.data, "payment request response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const listPaymentRequests = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = params ? validateInput(ListPaymentRequestsSchema, params, "list payment requests params") : {};
        const queryParams = new URLSearchParams();
        if (validatedParams.reference_id) {
            queryParams.append("reference_id", validatedParams.reference_id);
        }
        if (validatedParams.customer_id) {
            queryParams.append("customer_id", validatedParams.customer_id);
        }
        if (validatedParams.status) {
            validatedParams.status.forEach((status)=>queryParams.append("status[]", status));
        }
        if (validatedParams.limit) {
            queryParams.append("limit", validatedParams.limit.toString());
        }
        if (validatedParams.after_id) {
            queryParams.append("after_id", validatedParams.after_id);
        }
        if (validatedParams.before_id) {
            queryParams.append("before_id", validatedParams.before_id);
        }
        if (validatedParams.created_after) {
            queryParams.append("created_after", validatedParams.created_after);
        }
        if (validatedParams.created_before) {
            queryParams.append("created_before", validatedParams.created_before);
        }
        const queryString = queryParams.toString();
        const url = queryString ? `/v3/payment_requests?${queryString}` : "/v3/payment_requests";
        if (!axiosInstance) {
            throw new Error('axiosInstance is required');
        }
        const response = await axiosInstance.get(config?.url ?? url, {
            ...config,
            headers: {
                "api-version": "2024-11-11",
                ...config?.headers
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

// Refund Reason
const RefundReasonSchema = z.union([
    z.literal("REQUESTED_BY_CUSTOMER"),
    z.literal("FRAUDULENT"),
    z.literal("DUPLICATE"),
    z.literal("CANCELLATION"),
    z.literal("OTHERS")
]);
// Refund Status
const RefundStatusSchema = z.union([
    z.literal("PENDING"),
    z.literal("SUCCEEDED"),
    z.literal("FAILED")
]);
// Create Refund Schema
const CreateRefundSchema = z.object({
    payment_request_id: z.string(),
    amount: z.number().positive().optional(),
    reason: RefundReasonSchema,
    metadata: z.record(z.unknown()).optional()
});
// Refund Resource
const RefundResourceSchema = z.object({
    id: z.string(),
    payment_request_id: z.string(),
    amount: z.number(),
    currency: z.string(),
    reason: RefundReasonSchema,
    status: RefundStatusSchema,
    metadata: z.record(z.unknown()).optional(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
    failure_reason: z.string().optional()
});
// Get Refund Schema
const GetRefundSchema = z.object({
    id: z.string()
});
// List Refunds Schema
const ListRefundsSchema = z.object({
    payment_request_id: z.string().optional(),
    limit: z.number().min(1).max(100).optional(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional()
});
// List Refunds Response
z.object({
    data: z.array(RefundResourceSchema),
    has_more: z.boolean(),
    links: z.array(z.object({
        href: z.string(),
        rel: z.string(),
        method: z.string()
    })).optional()
});

const createRefund = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CreateRefundSchema, params, "refund params");
        const response = await axiosInstance.post(config?.url ?? "/v3/refunds", validatedParams, {
            ...config,
            headers: {
                "api-version": "2024-11-11",
                ...config?.headers
            }
        });
        return validateInput(RefundResourceSchema, response.data, "refund response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getRefund = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetRefundSchema, params, "get refund params");
        const response = await axiosInstance.get(config?.url ?? `/v3/refunds/${validatedParams.id}`, {
            ...config,
            headers: {
                "api-version": "2024-11-11",
                ...config?.headers
            }
        });
        return validateInput(RefundResourceSchema, response.data, "refund response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const listRefunds = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = params ? validateInput(ListRefundsSchema, params, "list refunds params") : {};
        const queryParams = new URLSearchParams();
        if (validatedParams.payment_request_id) {
            queryParams.append("payment_request_id", validatedParams.payment_request_id);
        }
        if (validatedParams.limit) {
            queryParams.append("limit", validatedParams.limit.toString());
        }
        if (validatedParams.after_id) {
            queryParams.append("after_id", validatedParams.after_id);
        }
        if (validatedParams.before_id) {
            queryParams.append("before_id", validatedParams.before_id);
        }
        if (validatedParams.created_after) {
            queryParams.append("created_after", validatedParams.created_after);
        }
        if (validatedParams.created_before) {
            queryParams.append("created_before", validatedParams.created_before);
        }
        const queryString = queryParams.toString();
        const url = queryString ? `/v3/refunds?${queryString}` : "/v3/refunds";
        if (!axiosInstance) {
            throw new Error('axiosInstance is required');
        }
        const response = await axiosInstance.get(config?.url ?? url, {
            ...config,
            headers: {
                "api-version": "2024-11-11",
                ...config?.headers
            }
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

// Payout Status
const PayoutStatusSchema = z.union([
    z.literal("ACCEPTED"),
    z.literal("PENDING"),
    z.literal("PROCESSING"),
    z.literal("COMPLETED"),
    z.literal("FAILED"),
    z.literal("CANCELLED"),
    z.literal("REVERSED")
]);
// Payout Channel Code
const PayoutChannelCodeSchema = z.union([
    z.literal("BANK"),
    z.literal("EWALLET"),
    z.literal("CASH")
]);
// Bank Account
const BankAccountSchema = z.object({
    account_holder_name: z.string(),
    account_number: z.string(),
    bank_code: z.string(),
    account_type: z.string().optional()
});
// E-wallet Account
const EwalletAccountSchema = z.object({
    account_holder_name: z.string(),
    account_number: z.string(),
    ewallet_type: z.string()
});
// Payout Method
const PayoutMethodSchema = z.discriminatedUnion("channel_code", [
    z.object({
        channel_code: z.literal("BANK"),
        bank_account: BankAccountSchema
    }),
    z.object({
        channel_code: z.literal("EWALLET"),
        ewallet: EwalletAccountSchema
    }),
    z.object({
        channel_code: z.literal("CASH"),
        cash: z.object({
            account_holder_name: z.string(),
            account_number: z.string()
        })
    })
]);
// Create Payout Schema
const CreatePayoutSchema = z.object({
    reference_id: z.string(),
    channel_code: PayoutChannelCodeSchema,
    channel_properties: PayoutMethodSchema,
    amount: z.number().positive(),
    currency: CurrencySchema,
    description: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
    receipt_notification: z.object({
        email_to: z.array(z.string().email()).optional(),
        email_cc: z.array(z.string().email()).optional(),
        email_bcc: z.array(z.string().email()).optional()
    }).optional()
});
// Payout Resource
const PayoutResourceSchema = z.object({
    id: z.string(),
    reference_id: z.string(),
    channel_code: PayoutChannelCodeSchema,
    channel_properties: PayoutMethodSchema,
    amount: z.number(),
    currency: CurrencySchema,
    status: PayoutStatusSchema,
    description: z.string().optional(),
    metadata: z.record(z.unknown()).optional(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
    failure_reason: z.string().optional(),
    estimated_arrival_time: z.string().datetime().optional(),
    receipt_notification: z.object({
        email_to: z.array(z.string().email()).optional(),
        email_cc: z.array(z.string().email()).optional(),
        email_bcc: z.array(z.string().email()).optional()
    }).optional()
});
// Get Payout Schema
const GetPayoutSchema = z.object({
    id: z.string()
});
// List Payouts Schema
const ListPayoutsSchema = z.object({
    reference_id: z.string().optional(),
    channel_code: z.array(PayoutChannelCodeSchema).optional(),
    status: z.array(PayoutStatusSchema).optional(),
    limit: z.number().min(1).max(100).optional(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional()
});
// List Payouts Response
z.object({
    data: z.array(PayoutResourceSchema),
    has_more: z.boolean(),
    links: z.array(z.object({
        href: z.string(),
        rel: z.string(),
        method: z.string()
    })).optional()
});
// Cancel Payout Schema
const CancelPayoutSchema = z.object({
    id: z.string()
});

const createPayout = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CreatePayoutSchema, params, "payout params");
        const response = await axiosInstance.post(config?.url ?? "/v2/payouts", validatedParams, config);
        return validateInput(PayoutResourceSchema, response.data, "payout response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getPayout = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetPayoutSchema, params, "get payout params");
        const response = await axiosInstance.get(config?.url ?? `/v2/payouts/${validatedParams.id}`, config);
        return validateInput(PayoutResourceSchema, response.data, "payout response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const listPayouts = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = params ? validateInput(ListPayoutsSchema, params, "list payouts params") : {};
        const queryParams = new URLSearchParams();
        if (validatedParams.reference_id) {
            queryParams.append("reference_id", validatedParams.reference_id);
        }
        if (validatedParams.channel_code) {
            validatedParams.channel_code.forEach((code)=>queryParams.append("channel_code[]", code));
        }
        if (validatedParams.status) {
            validatedParams.status.forEach((status)=>queryParams.append("status[]", status));
        }
        if (validatedParams.limit) {
            queryParams.append("limit", validatedParams.limit.toString());
        }
        if (validatedParams.after_id) {
            queryParams.append("after_id", validatedParams.after_id);
        }
        if (validatedParams.before_id) {
            queryParams.append("before_id", validatedParams.before_id);
        }
        if (validatedParams.created_after) {
            queryParams.append("created_after", validatedParams.created_after);
        }
        if (validatedParams.created_before) {
            queryParams.append("created_before", validatedParams.created_before);
        }
        const queryString = queryParams.toString();
        const url = queryString ? `/v2/payouts?${queryString}` : "/v2/payouts";
        if (!axiosInstance) {
            throw new Error('axiosInstance is required');
        }
        const response = await axiosInstance.get(config?.url ?? url, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const cancelPayout = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CancelPayoutSchema, params, "cancel payout params");
        const response = await axiosInstance.post(config?.url ?? `/v2/payouts/${validatedParams.id}/cancel`, {}, config);
        return validateInput(PayoutResourceSchema, response.data, "payout response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

// Balance Resource
const BalanceResourceSchema = z.object({
    balance: z.number(),
    currency: CurrencySchema,
    account_type: z.string().optional()
});
// Transaction Type
const TransactionTypeSchema = z.union([
    z.literal("PAYMENT"),
    z.literal("PAYOUT"),
    z.literal("REFUND"),
    z.literal("FEE"),
    z.literal("ADJUSTMENT")
]);
// Transaction Status
const TransactionStatusSchema = z.union([
    z.literal("PENDING"),
    z.literal("SUCCEEDED"),
    z.literal("FAILED"),
    z.literal("CANCELLED")
]);
// Transaction Resource
const TransactionResourceSchema = z.object({
    id: z.string(),
    reference_id: z.string().optional(),
    type: TransactionTypeSchema,
    status: TransactionStatusSchema,
    amount: z.number(),
    currency: CurrencySchema,
    created: z.string().datetime(),
    updated: z.string().datetime(),
    description: z.string().optional(),
    metadata: z.record(z.unknown()).optional()
});
// List Transactions Schema
const ListTransactionsSchema = z.object({
    types: z.array(TransactionTypeSchema).optional(),
    statuses: z.array(TransactionStatusSchema).optional(),
    limit: z.number().min(1).max(100).optional(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    created_after: z.string().datetime().optional(),
    created_before: z.string().datetime().optional()
});
// List Transactions Response
z.object({
    data: z.array(TransactionResourceSchema),
    has_more: z.boolean(),
    links: z.array(z.object({
        href: z.string(),
        rel: z.string(),
        method: z.string()
    })).optional()
});

const getBalance = async (axiosInstance, config)=>{
    try {
        const response = await axiosInstance.get(config?.url ?? "/balance", config);
        return validateInput(BalanceResourceSchema, response.data, "balance response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const listTransactions = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = params ? validateInput(ListTransactionsSchema, params, "list transactions params") : {};
        const queryParams = new URLSearchParams();
        if (validatedParams.types) {
            validatedParams.types.forEach((type)=>queryParams.append("types[]", type));
        }
        if (validatedParams.statuses) {
            validatedParams.statuses.forEach((status)=>queryParams.append("statuses[]", status));
        }
        if (validatedParams.limit) {
            queryParams.append("limit", validatedParams.limit.toString());
        }
        if (validatedParams.after_id) {
            queryParams.append("after_id", validatedParams.after_id);
        }
        if (validatedParams.before_id) {
            queryParams.append("before_id", validatedParams.before_id);
        }
        if (validatedParams.created_after) {
            queryParams.append("created_after", validatedParams.created_after);
        }
        if (validatedParams.created_before) {
            queryParams.append("created_before", validatedParams.created_before);
        }
        const queryString = queryParams.toString();
        const url = queryString ? `/transactions?${queryString}` : "/transactions";
        if (!axiosInstance) {
            throw new Error('axiosInstance is required');
        }
        const response = await axiosInstance.get(config?.url ?? url, config);
        return response.data;
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

const CardDataSchema = z.object({
    account_number: z.string(),
    exp_month: z.string(),
    exp_year: z.string(),
    card_holder_first_name: z.string(),
    card_holder_last_name: z.string(),
    card_holder_email: z.string().email(),
    card_holder_phone_number: PhoneSchema
});
const TokenParamsSchema = z.object({
    amount: z.string().optional(),
    card_data: CardDataSchema.optional(),
    external_id: z.string().optional(),
    card_cvn: z.string().min(3).max(3).optional(),
    is_multiple_use: z.boolean().optional().default(false),
    currency: CurrencySchema.optional(),
    should_authenticate: z.boolean().default(true),
    billing_details: AddressSchema.optional(),
    mid_label: z.string()
});
const TokenStatusSchema = z.union([
    z.literal("IN_REVIEW"),
    z.literal("VERIFIED"),
    z.literal("FAILED"),
    z.literal("SUCCEEDED"),
    z.literal("CAPTURED"),
    z.literal("REVERSED"),
    z.literal("AUTHORISED")
]);
const CardTypeSchema = z.union([
    z.literal("CREDIT"),
    z.literal("DEBIT"),
    z.literal("PREPAID"),
    z.literal("UNKNOWN")
]);
const CardBrandSchema = z.union([
    z.literal("VISA"),
    z.literal("MASTERCARD"),
    z.literal("JCB"),
    z.literal("AMEX")
]);
const TokenFailureReasonSchema = z.union([
    z.literal("AUTHENTICATION_FAILED"),
    z.literal("REVERSE_AUTHORIZATION_REJECTED_BY_BANK"),
    z.literal("PROCESSOR_ERROR")
]);
z.union([
    z.literal("API_VALIDATION_ERROR"),
    z.literal("INVALID_JSON_FORMAT"),
    z.literal("ACCOUNT_NUMBER_INVALID_ERROR"),
    z.literal("VALIDATION_ERROR"),
    z.literal("BRAND_NOT_SUPPORTED_ERROR"),
    z.literal("AUTHENTICATION_REQUIRED_ERROR"),
    z.literal("REQUEST_FORBIDDEN_ERROR"),
    z.literal("VERIFICATION_TIMEOUT_ERROR"),
    z.literal("TEMPORARY_SERVICE_ERROR"),
    z.literal("CONNECTION_ERROR")
]);
const CardInfoSchema = z.object({
    bank: z.string().optional(),
    country: CountrySchema.optional(),
    type: CardTypeSchema.optional(),
    brand: CardBrandSchema.optional(),
    fingerprint: z.string().optional(),
    card_art_url: z.string().url().optional()
});
const TokenResourceSchema = z.object({
    id: z.string(),
    business_id: z.string().optional(),
    created: z.string().datetime(),
    authentication_id: z.string(),
    external_id: z.string(),
    masked_card_number: z.string(),
    status: z.string(),
    payer_authentication_url: z.string().url().optional(),
    failure_reason: z.string().optional(),
    card_info: CardInfoSchema.optional()
});
const GetTokemParamsSchema = z.object({
    credit_card_token_id: z.string()
});
const TokenAuthenticationSchema = z.object({
    amount: z.string().optional(),
    token_id: z.string().optional(),
    card_data: CardDataSchema.optional(),
    external_id: z.string().optional(),
    currency: CurrencySchema.optional(),
    mid_label: z.string().optional()
});
const TokenAuthenticationResourceSchema = z.object({
    id: z.string(),
    status: TokenStatusSchema,
    external_id: z.string().optional(),
    payer_authentication_url: z.string().url().optional(),
    mid_label: z.string().optional(),
    failure_reason: TokenFailureReasonSchema.optional()
});
const TokenAuthorizationSchema = z.object({
    amount: z.string().optional(),
    token_id: z.string().optional(),
    capture: z.boolean().default(false),
    external_id: z.string().optional(),
    authentication_id: z.string().optional()
});
const ZeroAuthorizationSchema = z.object({
    amount: z.string().default("0"),
    token_id: z.string().optional(),
    capture: z.boolean().default(false),
    external_id: z.string().optional(),
    authentication_id: z.string().optional()
});
const ReverseAuthorizationSchema = z.object({
    external_id: z.string()
});
const PromotionSummarySchema = z.object({
    reference_id: z.string(),
    original_amount: z.number()
});
const IntervalSchema = z.literal("month");
const InstallmentSummary = z.object({
    count: z.number().optional(),
    interval: IntervalSchema.optional()
});
const ECICodeSchema = z.union([
    z.literal("0"),
    z.literal("1"),
    z.literal("2"),
    z.literal("3"),
    z.literal("4"),
    z.literal("5")
]);
const CVNCodeSchema = z.union([
    z.literal("M"),
    z.literal("N"),
    z.literal("P")
]);
const CreateChargeSchema = z.object({
    token_id: z.string(),
    external_id: z.string(),
    amount: z.number(),
    authentication_id: z.string().optional(),
    capture: z.boolean().optional().default(false),
    descriptor: z.string().optional(),
    currency: CurrencySchema.optional(),
    mid_label: z.string().optional(),
    billing_details: BillingDetailSchema.optional(),
    promotion: PromotionSummarySchema.optional(),
    installment: InstallmentSummary.optional(),
    metadata: z.object({}).optional()
});
const ChargeFailureReasonSchema = z.union([
    z.literal("AUTHENTICATION_FAILED"),
    z.literal("DECLINED_BY_ISSUER"),
    z.literal("DECLINED_BY_PROCESSOR"),
    z.literal("EXPIRED_CARD"),
    z.literal("ISSUER_SUSPECT_FRAUD"),
    z.literal("INACTIVE_OR_UNAUTHORIZED_CARD"),
    z.literal("INSUFFICIENT_BALANCE"),
    z.literal("INVALID_CARD"),
    z.literal("INVALID_CVV"),
    z.literal("ISSUER_UNAVAILABLE"),
    z.literal("PROCESSOR_ERROR"),
    z.literal("STOLEN_CARD"),
    z.literal("PROCESSOR_TIMEOUT"),
    z.literal("FRAUD_RISK_BLOCKED")
]);
const ChargeTypeSchema = z.union([
    z.literal("SINGLE_USE_TOKEN"),
    z.literal("MULTIPLE_USE_TOKEN"),
    z.literal("RECURRING")
]);
const ChargeResourceSchema = z.object({
    created: z.string().datetime(),
    status: TokenStatusSchema,
    business_id: z.string(),
    authorized_amount: z.number(),
    external_id: z.string(),
    merchant_id: z.string(),
    merchant_reference_code: z.string(),
    card_type: CardTypeSchema,
    masked_card_number: z.string(),
    charge_type: ChargeTypeSchema,
    card_brand: CardBrandSchema,
    bank_reconciliation_id: z.string(),
    failure_reason: ChargeFailureReasonSchema.optional(),
    eci: ECICodeSchema.optional(),
    cvn_code: CVNCodeSchema.optional(),
    capture_amount: z.number().optional(),
    descriptor: z.string().optional(),
    id: z.string(),
    mid_label: z.string().optional(),
    promotion: PromotionSummarySchema.optional(),
    installment: InstallmentSummary.optional()
});

const createToken = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(TokenParamsSchema, params, "token params");
        const response = await axiosInstance.post(config?.url ?? "/credit_card_tokens", validatedParams, config);
        return validateInput(TokenResourceSchema, response.data, "token response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getToken = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(GetTokemParamsSchema, params, "get token params");
        const response = await axiosInstance.get(config?.url ?? `/credit_card_tokens/${validatedParams.credit_card_token_id}`, config);
        return validateInput(TokenResourceSchema, response.data, "token response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const authenticateToken = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(TokenAuthenticationSchema, params, "token authentication params");
        const response = await axiosInstance.post(config?.url ?? "/credit_card_tokens/authenticate", validatedParams, config);
        return validateInput(TokenAuthenticationResourceSchema, response.data, "token authentication response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const authorizeToken = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(TokenAuthorizationSchema, params, "token authorization params");
        const response = await axiosInstance.post(config?.url ?? "/credit_card_charges", validatedParams, config);
        return validateInput(ChargeResourceSchema, response.data, "charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const zeroAuthorization = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(ZeroAuthorizationSchema, params, "zero authorization params");
        const response = await axiosInstance.post(config?.url ?? "/credit_card_charges", validatedParams, config);
        return validateInput(ChargeResourceSchema, response.data, "charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const reverseAuthorization = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(ReverseAuthorizationSchema, params, "reverse authorization params");
        const response = await axiosInstance.post(config?.url ?? `/credit_card_charges/${validatedParams.external_id}/reverse_authorization`, {}, config);
        return validateInput(ChargeResourceSchema, response.data, "charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const createCharge = async (params, axiosInstance, config)=>{
    try {
        const validatedParams = validateInput(CreateChargeSchema, params, "charge params");
        const response = await axiosInstance.post(config?.url ?? "/credit_card_charges", validatedParams, config);
        return validateInput(ChargeResourceSchema, response.data, "charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};
const getCharge = async (params, axiosInstance, config)=>{
    try {
        const response = await axiosInstance.get(config?.url ?? `/credit_card_charges/${params.id}`, config);
        return validateInput(ChargeResourceSchema, response.data, "charge response");
    } catch (error) {
        if (error instanceof Error && error.name === "AxiosError") {
            handleAxiosError(error);
        }
        throw error;
    }
};

const btoa = (string)=>{
    if (typeof window === "undefined") {
        return Buffer.from(string).toString("base64");
    }
    return window.btoa(string);
};
const createFn = (fn, axiosInstance)=>{
    return (data)=>fn(data, axiosInstance);
};
const Xendit = (key, options = {})=>{
    const axiosInstance = createAxiosInstance({
        headers: {
            Authorization: `Basic ${btoa(key + ":")}`
        }
    });
    // Apply rate limiting if configured
    if (options.rateLimit) {
        setupRateLimit(axiosInstance, options.rateLimit);
    }
    if (key.includes("development")) {
        console.log("👾 You are on → TEST MODE");
    }
    return {
        customer: {
            create: createFn(createCustomer, axiosInstance),
            getById: createFn(getCustomerId, axiosInstance),
            getByRefId: createFn(getCustomerRefId, axiosInstance),
            update: createFn(updateCustomer, axiosInstance)
        },
        ewallet: {
            charge: createFn(createEwalletCharge, axiosInstance),
            get: createFn(getEwalletCharge, axiosInstance)
        },
        paymentMethod: {
            create: createFn(createPaymentMethod, axiosInstance),
            get: createFn(getPaymentMethod, axiosInstance),
            list: (params)=>listPaymentMethods(params, axiosInstance),
            update: createFn(updatePaymentMethod, axiosInstance)
        },
        invoice: {
            create: createFn(createInvoice, axiosInstance),
            get: createFn(getInvoice, axiosInstance),
            list: (params)=>listInvoices(params, axiosInstance),
            update: createFn(updateInvoice, axiosInstance),
            expire: createFn(expireInvoice, axiosInstance)
        },
        paymentRequest: {
            create: createFn(createPaymentRequest, axiosInstance),
            get: createFn(getPaymentRequest, axiosInstance),
            list: (params)=>listPaymentRequests(params, axiosInstance)
        },
        refund: {
            create: createFn(createRefund, axiosInstance),
            get: createFn(getRefund, axiosInstance),
            list: (params)=>listRefunds(params, axiosInstance)
        },
        payout: {
            create: createFn(createPayout, axiosInstance),
            get: createFn(getPayout, axiosInstance),
            list: (params)=>listPayouts(params, axiosInstance),
            cancel: createFn(cancelPayout, axiosInstance)
        },
        balance: {
            get: ()=>getBalance(axiosInstance),
            listTransactions: (params)=>listTransactions(params, axiosInstance)
        },
        card: {
            createToken: createFn(createToken, axiosInstance),
            getToken: createFn(getToken, axiosInstance),
            authenticateToken: createFn(authenticateToken, axiosInstance),
            authorizeToken: createFn(authorizeToken, axiosInstance),
            zeroAuthorization: createFn(zeroAuthorization, axiosInstance),
            reverseAuthorization: createFn(reverseAuthorization, axiosInstance),
            createCharge: createFn(createCharge, axiosInstance),
            getCharge: createFn(getCharge, axiosInstance)
        }
    };
};

// Type guard for phone numbers
function isValidPhone(value) {
    return typeof value === "string" && value.startsWith("+") && value.length >= 8 && value.length <= 15;
}
// Type guard for country codes
function isValidCountry(value) {
    return [
        "PH",
        "ID",
        "MY",
        "TH",
        "VN"
    ].includes(value);
}
// Type guard for currency codes
function isValidCurrency(value) {
    return [
        "PHP",
        "IDR",
        "MYR",
        "THB",
        "VND"
    ].includes(value);
}
// Type guard for customer type
function isValidCustomerType(value) {
    return [
        "INDIVIDUAL",
        "BUSINESS"
    ].includes(value);
}
// Type guard for checkout method
function isValidCheckoutMethod(value) {
    return [
        "ONE_TIME_PAYMENT",
        "TOKENIZED_PAYMENT"
    ].includes(value);
}
// Generic type guard for checking if value is not null or undefined
function isNotNullOrUndefined(value) {
    return value !== null && value !== undefined;
}
// Type guard for checking if value is a valid URL
function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    } catch  {
        return false;
    }
}
// Type guard for checking if value is a valid email
function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}
// Type guard for checking if value is a valid date string
function isValidDateString(value) {
    const date = new Date(value);
    return !isNaN(date.getTime()) && value === date.toISOString();
}

// Webhook Event Types
const WebhookEventTypeSchema = z.union([
    z.literal("invoice.paid"),
    z.literal("invoice.expired"),
    z.literal("payment.succeeded"),
    z.literal("payment.failed"),
    z.literal("ewallet.charge.succeeded"),
    z.literal("ewallet.charge.pending"),
    z.literal("ewallet.charge.failed"),
    z.literal("payment_method.activate"),
    z.literal("payment_method.expire"),
    z.literal("customer.created"),
    z.literal("customer.updated")
]);
// Base Webhook Event Schema
const WebhookEventSchema = z.object({
    id: z.string(),
    event: WebhookEventTypeSchema,
    api_version: z.string(),
    created: z.string().datetime(),
    business_id: z.string(),
    data: z.record(z.unknown())
});
/**
 * Verify webhook signature from Xendit
 * @param options Verification options
 * @returns true if signature is valid, false otherwise
 */ function verifyWebhookSignature(options) {
    const { callbackToken, receivedToken } = options;
    // Simple token comparison for Xendit webhooks
    return callbackToken === receivedToken;
}
/**
 * Advanced webhook signature verification using HMAC
 * @param options Verification options with HMAC
 * @returns true if signature is valid, false otherwise
 */ function verifyWebhookHmac(options) {
    const { secret, requestBody, signature } = options;
    const body = typeof requestBody === "string" ? requestBody : requestBody.toString("utf8");
    const expectedSignature = createHmac("sha256", secret).update(body).digest("hex");
    return `sha256=${expectedSignature}` === signature;
}
/**
 * Parse and validate webhook event
 * @param rawEvent Raw webhook event data
 * @returns Parsed and validated webhook event
 */ function parseWebhookEvent(rawEvent) {
    const result = WebhookEventSchema.safeParse(rawEvent);
    if (!result.success) {
        throw new Error(`Invalid webhook event format: ${result.error.message}`);
    }
    return result.data;
}
/**
 * Handle webhook events with type-safe handlers
 * @param event Webhook event
 * @param handlers Event handlers
 */ async function handleWebhookEvent(event, handlers) {
    const handler = handlers[event.event];
    if (handler) {
        await handler(event);
    } else {
        console.warn(`No handler found for webhook event: ${event.event}`);
    }
}
/**
 * Create a webhook processor with built-in verification
 */ function createWebhookProcessor(options) {
    return {
        /**
     * Process a webhook request
     */ async processWebhook (requestBody, headers, handlers) {
            try {
                // Verify signature
                if (options.callbackToken) {
                    const receivedToken = headers["x-callback-token"] || headers["X-Callback-Token"];
                    if (!receivedToken || !verifyWebhookSignature({
                        callbackToken: options.callbackToken,
                        requestBody,
                        receivedToken
                    })) {
                        return {
                            success: false,
                            error: "Invalid webhook signature"
                        };
                    }
                }
                if (options.hmacSecret) {
                    const signature = headers["x-xendit-signature"] || headers["X-Xendit-Signature"];
                    if (!signature || !verifyWebhookHmac({
                        secret: options.hmacSecret,
                        requestBody,
                        signature
                    })) {
                        return {
                            success: false,
                            error: "Invalid HMAC signature"
                        };
                    }
                }
                // Parse event
                const body = typeof requestBody === "string" ? requestBody : requestBody.toString("utf8");
                const rawEvent = JSON.parse(body);
                const event = parseWebhookEvent(rawEvent);
                // Handle event
                await handleWebhookEvent(event, handlers);
                return {
                    success: true
                };
            } catch (error) {
                return {
                    success: false,
                    error: error instanceof Error ? error.message : "Unknown error"
                };
            }
        }
    };
}

// Generic pagination response schema
const PaginationMetaSchema = z.object({
    has_more: z.boolean(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    total_count: z.number().optional()
});
const PaginatedResponseSchema = (itemSchema)=>z.object({
        data: z.array(itemSchema),
        has_more: z.boolean(),
        after_id: z.string().optional(),
        before_id: z.string().optional(),
        total_count: z.number().optional()
    });
/**
 * Helper to build pagination query parameters
 */ function buildPaginationParams(options) {
    const params = {};
    if (options.limit) {
        params.limit = options.limit.toString();
    }
    if (options.after_id) {
        params.after_id = options.after_id;
    }
    if (options.before_id) {
        params.before_id = options.before_id;
    }
    return params;
}
/**
 * Generic paginated API fetcher
 */ async function fetchPaginated(axiosInstance, endpoint, itemSchema, options = {}) {
    const params = buildPaginationParams(options);
    const response = await axiosInstance.get(endpoint, {
        params
    });
    const paginatedSchema = PaginatedResponseSchema(itemSchema);
    const result = paginatedSchema.parse(response.data);
    return result;
}
/**
 * Auto-paginate through all pages and return all items
 */ async function fetchAllPages(axiosInstance, endpoint, itemSchema, options = {}) {
    const { limit = 10, maxPages = 100, maxItems = Infinity, ...paginationOptions } = options;
    let allItems = [];
    let currentAfter = paginationOptions.after_id;
    let pageCount = 0;
    while(pageCount < maxPages && allItems.length < maxItems){
        const response = await fetchPaginated(axiosInstance, endpoint, itemSchema, {
            ...paginationOptions,
            limit,
            after_id: currentAfter
        });
        allItems = allItems.concat(response.data);
        pageCount++;
        // Stop if we've reached the maxItems limit
        if (allItems.length >= maxItems) {
            allItems = allItems.slice(0, maxItems);
            break;
        }
        // Stop if there are no more pages
        if (!response.has_more) {
            break;
        }
        // Update cursor for next page
        currentAfter = response.after_id;
    }
    return allItems;
}
/**
 * Create a paginator iterator for streaming through pages
 */ function createPaginator(axiosInstance, endpoint, itemSchema, initialOptions = {}) {
    let currentOptions = {
        ...initialOptions
    };
    let exhausted = false;
    return {
        /**
     * Get the next page
     */ async next () {
            if (exhausted) {
                return {
                    value: {},
                    done: true
                };
            }
            const response = await fetchPaginated(axiosInstance, endpoint, itemSchema, currentOptions);
            // Update options for next call
            if (response.has_more && response.after_id) {
                currentOptions.after_id = response.after_id;
            } else {
                exhausted = true;
            }
            return {
                value: response,
                done: !response.has_more
            };
        },
        /**
     * Reset the paginator to start from the beginning
     */ reset (options = {}) {
            currentOptions = {
                ...initialOptions,
                ...options
            };
            exhausted = false;
        },
        /**
     * Check if there are more pages available
     */ hasMore () {
            return !exhausted;
        }
    };
}
/**
 * Async iterator for easy for-await-of usage
 */ async function* iteratePages(axiosInstance, endpoint, itemSchema, options = {}) {
    const paginator = createPaginator(axiosInstance, endpoint, itemSchema, options);
    while(paginator.hasMore()){
        const { value, done } = await paginator.next();
        if (done) break;
        yield value;
    }
}
/**
 * Async iterator for individual items across all pages
 */ async function* iterateItems(axiosInstance, endpoint, itemSchema, options = {}) {
    let itemCount = 0;
    const maxItems = options.maxItems || Infinity;
    for await (const page of iteratePages(axiosInstance, endpoint, itemSchema, options)){
        for (const item of page.data){
            if (itemCount >= maxItems) {
                return;
            }
            yield item;
            itemCount++;
        }
    }
}
function buildSearchParams(options) {
    const params = buildPaginationParams(options);
    if (options.query) {
        params.query = options.query;
    }
    if (options.sort_by) {
        params.sort_by = options.sort_by;
    }
    if (options.sort_direction) {
        params.sort_direction = options.sort_direction;
    }
    // Add filter parameters
    if (options.filters) {
        Object.entries(options.filters).forEach(([key, value])=>{
            if (value !== undefined && value !== null) {
                params[key] = String(value);
            }
        });
    }
    return params;
}

export { AuthenticationError, NotFoundError, PaginatedResponseSchema, PaginationMetaSchema, RateLimitError, RateLimiter, ValidationError, WebhookEventSchema, WebhookEventTypeSchema, Xendit, XenditApiError, XenditErrorSchema, buildPaginationParams, buildSearchParams, createPaginator, createRateLimitInterceptor, createRateLimitedAxios, createRetryInterceptor, createWebhookProcessor, fetchAllPages, fetchPaginated, handleAxiosError, handleWebhookEvent, isNotNullOrUndefined, isValidCheckoutMethod, isValidCountry, isValidCurrency, isValidCustomerType, isValidDateString, isValidEmail, isValidPhone, isValidUrl, iterateItems, iteratePages, parseWebhookEvent, setupRateLimit, validateInput, verifyWebhookHmac, verifyWebhookSignature };
