Object.defineProperty(exports, '__esModule', { value: true });

var axios = require('axios');
var zod = require('zod');
var crypto = require('crypto');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var axios__default = /*#__PURE__*/_interopDefault(axios);

const createAxiosInstance = (config)=>axios__default.default.create({
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
    const axiosInstance = axios__default.default.create({
        baseURL,
        headers: {
            Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
            "Content-Type": "application/json"
        }
    });
    setupRateLimit(axiosInstance, config);
    return axiosInstance;
}

const XenditErrorSchema = zod.z.object({
    error_code: zod.z.string(),
    message: zod.z.string(),
    errors: zod.z.array(zod.z.object({
        field: zod.z.string().optional(),
        message: zod.z.string()
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

const PhoneSchema = zod.z.string().min(7).max(15).refine((value)=>value.startsWith("+"));
const CountrySchema = zod.z.union([
    zod.z.literal("PH"),
    zod.z.literal("ID"),
    zod.z.literal("MY"),
    zod.z.literal("TH"),
    zod.z.literal("VN")
]);
const CurrencySchema = zod.z.union([
    zod.z.literal("PHP"),
    zod.z.literal("IDR"),
    zod.z.literal("MYR"),
    zod.z.literal("THB"),
    zod.z.literal("VND")
]);
const BillingDetailSchema = zod.z.object({
    given_names: zod.z.string(),
    surname: zod.z.string().optional(),
    email: zod.z.string().email().optional(),
    mobile_number: PhoneSchema.optional(),
    phone_number: PhoneSchema.optional()
});

zod.z.union([
    zod.z.literal("INDIVIDUAL"),
    zod.z.literal("BUSINESS")
]);
const IndividualDetailSchema = zod.z.object({
    given_names: zod.z.string(),
    surname: zod.z.string().optional(),
    nationality: zod.z.string().optional(),
    place_of_birth: zod.z.string().optional(),
    date_of_birth: zod.z.string().optional(),
    gender: zod.z.union([
        zod.z.literal("MALE"),
        zod.z.literal("FEMALE"),
        zod.z.literal("OTHER")
    ]).optional(),
    employment: zod.z.object({
        employer_name: zod.z.string(),
        nature_of_business: zod.z.string(),
        role_description: zod.z.string()
    }).optional()
});
zod.z.union([
    zod.z.literal("CORPORATION"),
    zod.z.literal("SOLE_PROPRIETOR"),
    zod.z.literal("PARTNERSHIP"),
    zod.z.literal("COOPERATIVE"),
    zod.z.literal("TRUST"),
    zod.z.literal("NON_PROFIT"),
    zod.z.literal("GOVERNMENT")
]);
const BusinessDetailSchema = zod.z.object({
    business_name: zod.z.string(),
    trading_name: zod.z.string().optional(),
    business_type: zod.z.string()
});
const AddressSchema = zod.z.object({
    street_line1: zod.z.string().nullable().optional(),
    street_line2: zod.z.string().nullable().optional(),
    city: zod.z.string().nullable().optional(),
    province_state: zod.z.string().nullable().optional(),
    postal_code: zod.z.string().nullable().optional(),
    country: zod.z.string(),
    category: zod.z.string().nullable().optional(),
    is_primary: zod.z.boolean().nullable().optional()
});
const AccountTypeSchema = zod.z.union([
    zod.z.literal("BANK_ACCOUNT"),
    zod.z.literal("EWALLET"),
    zod.z.literal("CREDIT_CARD"),
    zod.z.literal("PAY_LATER"),
    zod.z.literal("OTC"),
    zod.z.literal("QR_CODE"),
    zod.z.literal("SOCIAL_MEDIA")
]);
const BankAccountSchema$1 = zod.z.object({
    account_number: zod.z.string(),
    account_holder_name: zod.z.string(),
    swift_code: zod.z.string().optional(),
    account_type: zod.z.string().optional(),
    account_details: zod.z.string().optional(),
    currency: zod.z.string().optional()
});
const EWalletAccountSchema = zod.z.object({
    account_number: zod.z.string(),
    account_holder_name: zod.z.string(),
    currency: zod.z.string().optional()
});
const CreditCardAccountSchema = zod.z.object({
    token_id: zod.z.string()
});
const OTCAccountSchema = zod.z.object({
    payment_code: zod.z.string(),
    expires_at: zod.z.string().optional()
});
const QrAccountSchema = zod.z.object({
    qr_string: zod.z.string()
});
const PayLaterAccountSchema = zod.z.object({
    account_id: zod.z.string(),
    account_holder_name: zod.z.string().optional(),
    currency: CurrencySchema.optional()
});
const SocialMediaAccountSchema = zod.z.object({
    account_id: zod.z.string(),
    account_handle: zod.z.string().optional()
});
const PropertiesSchema = zod.z.discriminatedUnion("type", [
    zod.z.object({
        type: zod.z.literal("BANK_ACCOUNT"),
        properties: BankAccountSchema$1
    }),
    zod.z.object({
        type: zod.z.literal("EWALLET"),
        properties: EWalletAccountSchema
    }),
    zod.z.object({
        type: zod.z.literal("CREDIT_CARD"),
        properties: CreditCardAccountSchema
    }),
    zod.z.object({
        type: zod.z.literal("OTC"),
        properties: OTCAccountSchema
    }),
    zod.z.object({
        type: zod.z.literal("QR_CODE"),
        properties: QrAccountSchema
    }),
    zod.z.object({
        type: zod.z.literal("PAY_LATER"),
        properties: PayLaterAccountSchema
    }),
    zod.z.object({
        type: zod.z.literal("SOCIAL_MEDIA"),
        properties: SocialMediaAccountSchema
    })
]);
const IdentityAccountSchema = zod.z.object({
    type: AccountTypeSchema,
    company: zod.z.string().nullable().optional(),
    description: zod.z.string().nullable().optional(),
    country: zod.z.string().nullable().optional(),
    properties: PropertiesSchema
});
const KYCDocumentSchema = zod.z.object({
    type: zod.z.string(),
    sub_type: zod.z.string(),
    country: zod.z.string(),
    document_name: zod.z.string(),
    document_number: zod.z.string(),
    expires_at: zod.z.null(),
    holder_name: zod.z.string(),
    document_images: zod.z.array(zod.z.string())
});
const CommonCustomerResourceSchema = zod.z.object({
    individual_detail: IndividualDetailSchema.optional(),
    business_detail: BusinessDetailSchema.optional(),
    email: zod.z.string().email().optional(),
    mobile_number: PhoneSchema.optional(),
    phone_number: PhoneSchema.optional(),
    hashed_phone_number: zod.z.string().nullable().optional(),
    addresses: zod.z.array(AddressSchema).optional(),
    identity_accounts: zod.z.array(IdentityAccountSchema).optional(),
    kyc_documents: zod.z.array(KYCDocumentSchema).optional(),
    description: zod.z.string().nullable().optional(),
    date_of_registration: zod.z.string().nullable().optional(),
    domicile_of_registration: zod.z.string().nullable().optional(),
    metadata: zod.z.object({}).nullable().optional()
});
// Create a discriminated union for customer types
const CustomerSchema = zod.z.discriminatedUnion("type", [
    zod.z.object({
        type: zod.z.literal("INDIVIDUAL"),
        reference_id: zod.z.string(),
        individual_detail: IndividualDetailSchema,
        business_detail: zod.z.undefined().optional(),
        email: zod.z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: zod.z.string().nullable().optional(),
        addresses: zod.z.array(AddressSchema).optional(),
        identity_accounts: zod.z.array(IdentityAccountSchema).optional(),
        kyc_documents: zod.z.array(KYCDocumentSchema).optional(),
        description: zod.z.string().nullable().optional(),
        date_of_registration: zod.z.string().nullable().optional(),
        domicile_of_registration: zod.z.string().nullable().optional(),
        metadata: zod.z.object({}).nullable().optional()
    }),
    zod.z.object({
        type: zod.z.literal("BUSINESS"),
        reference_id: zod.z.string(),
        individual_detail: zod.z.undefined().optional(),
        business_detail: BusinessDetailSchema,
        email: zod.z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: zod.z.string().nullable().optional(),
        addresses: zod.z.array(AddressSchema).optional(),
        identity_accounts: zod.z.array(IdentityAccountSchema).optional(),
        kyc_documents: zod.z.array(KYCDocumentSchema).optional(),
        description: zod.z.string().nullable().optional(),
        date_of_registration: zod.z.string().nullable().optional(),
        domicile_of_registration: zod.z.string().nullable().optional(),
        metadata: zod.z.object({}).nullable().optional()
    })
]);
const GetCustomerSchema = zod.z.object({
    id: zod.z.string()
});
// Create CustomerResourceSchema by extending both discriminated union options
const CustomerResourceSchema = zod.z.discriminatedUnion("type", [
    zod.z.object({
        type: zod.z.literal("INDIVIDUAL"),
        id: zod.z.string(),
        reference_id: zod.z.string(),
        individual_detail: IndividualDetailSchema,
        business_detail: zod.z.undefined().optional(),
        email: zod.z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: zod.z.string().nullable().optional(),
        addresses: zod.z.array(AddressSchema).optional(),
        identity_accounts: zod.z.array(IdentityAccountSchema).optional(),
        kyc_documents: zod.z.array(KYCDocumentSchema).optional(),
        description: zod.z.string().nullable().optional(),
        date_of_registration: zod.z.string().nullable().optional(),
        domicile_of_registration: zod.z.string().nullable().optional(),
        metadata: zod.z.object({}).nullable().optional(),
        created: zod.z.string().datetime(),
        updated: zod.z.string().datetime()
    }),
    zod.z.object({
        type: zod.z.literal("BUSINESS"),
        id: zod.z.string(),
        reference_id: zod.z.string(),
        individual_detail: zod.z.undefined().optional(),
        business_detail: BusinessDetailSchema,
        email: zod.z.string().email().optional(),
        mobile_number: PhoneSchema.optional(),
        phone_number: PhoneSchema.optional(),
        hashed_phone_number: zod.z.string().nullable().optional(),
        addresses: zod.z.array(AddressSchema).optional(),
        identity_accounts: zod.z.array(IdentityAccountSchema).optional(),
        kyc_documents: zod.z.array(KYCDocumentSchema).optional(),
        description: zod.z.string().nullable().optional(),
        date_of_registration: zod.z.string().nullable().optional(),
        domicile_of_registration: zod.z.string().nullable().optional(),
        metadata: zod.z.object({}).nullable().optional(),
        created: zod.z.string().datetime(),
        updated: zod.z.string().datetime()
    })
]);
const GetCustomerByRefIdSchema = zod.z.object({
    reference_id: zod.z.string()
});
zod.z.object({
    data: zod.z.array(CustomerResourceSchema),
    hasMore: zod.z.boolean()
});
const UpdateParamsSchema = zod.z.object({
    id: zod.z.string(),
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

const CheckoutMethodSchema = zod.z.union([
    zod.z.literal("ONE_TIME_PAYMENT"),
    zod.z.literal("TOKENIZED_PAYMENT")
]);
const ChannelCodeSchema = zod.z.union([
    zod.z.literal("ID_OVO"),
    zod.z.literal("ID_DANA"),
    zod.z.literal("ID_LINKAJA"),
    zod.z.literal("ID_SHOPEEPAY"),
    zod.z.literal("ID_ASTRAPAY"),
    zod.z.literal("ID_JENIUSPAY"),
    zod.z.literal("ID_SAKUKU"),
    zod.z.literal("PH_PAYMAYA"),
    zod.z.literal("PH_GCASH"),
    zod.z.literal("PH_GRABPAY"),
    zod.z.literal("PH_SHOPEEPAY"),
    zod.z.literal("VN_APPOTA"),
    zod.z.literal("VN_MOMO"),
    zod.z.literal("VN_SHOPEEPAY"),
    zod.z.literal("VN_VNPTWALLET"),
    zod.z.literal("VN_VIETTELPAY"),
    zod.z.literal("VN_ZALOPAY"),
    zod.z.literal("TH_WECHATPAY"),
    zod.z.literal("TH_LINEPAY"),
    zod.z.literal("TH_TRUEMONEY"),
    zod.z.literal("TH_SHOPEEPAY"),
    zod.z.literal("MY_TOUCHNGO"),
    zod.z.literal("MY_SHOPEEPAY"),
    zod.z.literal("MY_GRABPAY")
]);
const OVOChannelSchema = zod.z.object({
    mobile_number: PhoneSchema
});
const ChannelsSchema = zod.z.object({
    cashtag: zod.z.string().refine((value)=>value.startsWith("$")).optional(),
    mobile_number: PhoneSchema.optional(),
    success_redirect_url: zod.z.string().url().optional(),
    failure_redirect_url: zod.z.string().url().optional(),
    cancel_redirect_url: zod.z.string().url().optional(),
    redeem_points: zod.z.union([
        zod.z.literal("REDEEM_ALL"),
        zod.z.literal("REDEEM_NONE")
    ]).default("REDEEM_NONE").optional()
});
const ChannelPropertiesSchema$1 = zod.z.discriminatedUnion("channel_code", [
    zod.z.object({
        channel_code: zod.z.literal("ID_OVO"),
        channel_properties: OVOChannelSchema
    }),
    zod.z.object({
        channel_code: zod.z.literal("ID_JENIUSPAY"),
        properties: zod.z.discriminatedUnion("method", [
            zod.z.object({
                method: zod.z.literal("ONE_TIME_PAYMENT"),
                properties: zod.z.object({
                    cashtag: zod.z.string().refine((value)=>value.startsWith("$"))
                })
            }),
            zod.z.object({
                method: zod.z.literal("TOKENIZED_PAYMENT"),
                properties: zod.z.object({
                    success_redirect_url: zod.z.string().url(),
                    failure_redirect_url: zod.z.string().url(),
                    redeem_points: zod.z.union([
                        zod.z.literal("REDEEM_ALL"),
                        zod.z.literal("REDEEM_NONE")
                    ]).default("REDEEM_NONE").optional()
                })
            })
        ])
    }),
    zod.z.object({
        channel_code: zod.z.union([
            zod.z.literal("ID_DANA"),
            zod.z.literal("ID_LINKAJA"),
            zod.z.literal("ID_SHOPEEPAY"),
            zod.z.literal("PH_SHOPEEPAY"),
            zod.z.literal("TH_SHOPEEPAY"),
            zod.z.literal("TH_WECHATPAY"),
            zod.z.literal("TH_TOUCHNGO"),
            zod.z.literal("TH_TRUEMONEY"),
            zod.z.literal("ID_SAKUKU")
        ]),
        properties: zod.z.discriminatedUnion("method", [
            zod.z.object({
                method: zod.z.literal("ONE_TIME_PAYMENT"),
                properties: zod.z.object({
                    success_redirect_url: zod.z.string().url()
                })
            }),
            zod.z.object({
                method: zod.z.literal("TOKENIZED_PAYMENT"),
                properties: zod.z.object({
                    success_redirect_url: zod.z.string().url(),
                    failure_redirect_url: zod.z.string().url(),
                    redeem_points: zod.z.union([
                        zod.z.literal("REDEEM_ALL"),
                        zod.z.literal("REDEEM_NONE")
                    ]).default("REDEEM_NONE").optional()
                })
            })
        ])
    }),
    zod.z.object({
        channel_code: zod.z.literal("PH_PAYMAYA"),
        properties: zod.z.object({
            success_redirect_url: zod.z.string().url(),
            failure_redirect_url: zod.z.string().url(),
            cancel_redirect_url: zod.z.string().url()
        })
    })
]);
const LineItemSchema = zod.z.object({
    reference_id: zod.z.string(),
    name: zod.z.string(),
    category: zod.z.string(),
    currency: CurrencySchema,
    price: zod.z.number(),
    quantity: zod.z.number(),
    type: zod.z.union([
        zod.z.literal("PRODUCT"),
        zod.z.literal("SERVICE")
    ]),
    url: zod.z.string().url().optional(),
    description: zod.z.string().optional(),
    subcategory: zod.z.string().optional(),
    metadata: zod.z.object({}).optional()
});
// Create a discriminated union based on checkout method
const EWalletChargeSchema = zod.z.discriminatedUnion("checkout_method", [
    zod.z.object({
        reference_id: zod.z.string(),
        currency: CurrencySchema,
        amount: zod.z.number(),
        checkout_method: zod.z.literal("ONE_TIME_PAYMENT"),
        channel_code: ChannelCodeSchema,
        channel_properties: ChannelsSchema,
        payment_method_id: zod.z.undefined().optional(),
        customer_id: zod.z.string().optional(),
        basket: zod.z.array(LineItemSchema).optional(),
        metadata: zod.z.object({}).optional()
    }),
    zod.z.object({
        reference_id: zod.z.string(),
        currency: CurrencySchema,
        amount: zod.z.number(),
        checkout_method: zod.z.literal("TOKENIZED_PAYMENT"),
        channel_code: ChannelCodeSchema.optional(),
        channel_properties: ChannelsSchema,
        payment_method_id: zod.z.string(),
        customer_id: zod.z.string().optional(),
        basket: zod.z.array(LineItemSchema).optional(),
        metadata: zod.z.object({}).optional()
    })
]);
const EWalletStatusSchema = zod.z.union([
    zod.z.literal("SUCCEEDED"),
    zod.z.literal("PENDING"),
    zod.z.literal("FAILED"),
    zod.z.literal("VOIDED"),
    zod.z.literal("REFUNDED")
]);
const EWalletResourceActionsSchema = zod.z.object({
    desktop_web_checkout_url: zod.z.string().url().optional(),
    mobile_web_checkout_url: zod.z.string().url().optional(),
    mobile_deeplink_checkout_url: zod.z.string().url().optional(),
    qr_checkout_string: zod.z.string().url().optional()
});
const EWalletChargeResourceSchema = zod.z.object({
    id: zod.z.string(),
    business_id: zod.z.string(),
    reference_id: zod.z.string(),
    status: EWalletStatusSchema,
    currency: CurrencySchema,
    charge_amount: zod.z.number(),
    capture_amount: zod.z.number().optional(),
    refunded_amount: zod.z.number().nullable(),
    checkout_method: CheckoutMethodSchema,
    channel_code: ChannelCodeSchema,
    channel_properties: ChannelPropertiesSchema$1,
    actions: EWalletResourceActionsSchema.optional(),
    is_redirect_required: zod.z.boolean(),
    callback_url: zod.z.string(),
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    void_status: zod.z.string().nullable(),
    voided_at: zod.z.string().nullable(),
    capture_now: zod.z.boolean(),
    customer_id: zod.z.string().nullable(),
    payment_method_id: zod.z.string().nullable(),
    failure_code: zod.z.string().nullable(),
    basket: zod.z.array(LineItemSchema).optional(),
    metadata: zod.z.object({}).optional()
});
const GetEWalletChargeSchema = zod.z.object({
    id: zod.z.string().startsWith("ewc")
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
const PaymentMethodTypeSchema = zod.z.union([
    zod.z.literal("CARD"),
    zod.z.literal("BANK_ACCOUNT"),
    zod.z.literal("EWALLET"),
    zod.z.literal("OVER_THE_COUNTER"),
    zod.z.literal("VIRTUAL_ACCOUNT"),
    zod.z.literal("QR_CODE")
]);
// Payment Method Status
const PaymentMethodStatusSchema = zod.z.union([
    zod.z.literal("ACTIVE"),
    zod.z.literal("INACTIVE"),
    zod.z.literal("PENDING"),
    zod.z.literal("EXPIRED"),
    zod.z.literal("FAILED")
]);
// Card Properties
const CardPropertiesSchema = zod.z.object({
    card_last_four: zod.z.string(),
    card_expiry_month: zod.z.string(),
    card_expiry_year: zod.z.string(),
    network: zod.z.string(),
    country: CountrySchema.optional(),
    issuer: zod.z.string().optional(),
    type: zod.z.union([
        zod.z.literal("CREDIT"),
        zod.z.literal("DEBIT")
    ]).optional(),
    currency: CurrencySchema.optional()
});
// Bank Account Properties
const BankAccountPropertiesSchema = zod.z.object({
    account_number: zod.z.string(),
    account_holder_name: zod.z.string(),
    bank_code: zod.z.string(),
    account_type: zod.z.string().optional(),
    currency: CurrencySchema
});
// E-wallet Properties
const EwalletPropertiesSchema = zod.z.object({
    account_details: zod.z.string(),
    currency: CurrencySchema
});
// Payment Method Properties (Discriminated Union)
zod.z.discriminatedUnion("type", [
    zod.z.object({
        type: zod.z.literal("CARD"),
        card: CardPropertiesSchema
    }),
    zod.z.object({
        type: zod.z.literal("BANK_ACCOUNT"),
        bank_account: BankAccountPropertiesSchema
    }),
    zod.z.object({
        type: zod.z.literal("EWALLET"),
        ewallet: EwalletPropertiesSchema
    })
]);
// Create Payment Method Request
const CreatePaymentMethodSchema = zod.z.object({
    type: PaymentMethodTypeSchema,
    country: CountrySchema.optional(),
    reusability: zod.z.union([
        zod.z.literal("ONE_TIME_USE"),
        zod.z.literal("MULTIPLE_USE")
    ]),
    description: zod.z.string().optional(),
    reference_id: zod.z.string().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional(),
    // Specific properties based on type
    card: zod.z.object({
        currency: CurrencySchema.optional(),
        channel_properties: zod.z.object({
            success_return_url: zod.z.string().url().optional(),
            failure_return_url: zod.z.string().url().optional()
        }).optional()
    }).optional(),
    bank_account: zod.z.object({
        currency: CurrencySchema,
        channel_properties: zod.z.object({
            account_mobile_number: zod.z.string().optional(),
            card_last_four: zod.z.string().optional(),
            card_expiry_month: zod.z.string().optional(),
            card_expiry_year: zod.z.string().optional(),
            account_email: zod.z.string().email().optional()
        }).optional()
    }).optional(),
    ewallet: zod.z.object({
        channel_code: zod.z.string(),
        channel_properties: zod.z.object({
            success_return_url: zod.z.string().url().optional(),
            failure_return_url: zod.z.string().url().optional(),
            cancel_return_url: zod.z.string().url().optional()
        }).optional()
    }).optional()
});
// Update Payment Method Request
const UpdatePaymentMethodSchema = zod.z.object({
    description: zod.z.string().optional(),
    reference_id: zod.z.string().optional(),
    status: PaymentMethodStatusSchema.optional(),
    metadata: zod.z.record(zod.z.unknown()).optional()
});
// Payment Method Resource
const PaymentMethodResourceSchema = zod.z.object({
    id: zod.z.string(),
    type: PaymentMethodTypeSchema,
    country: CountrySchema.optional(),
    business_id: zod.z.string(),
    customer_id: zod.z.string().optional(),
    reference_id: zod.z.string().optional(),
    description: zod.z.string().optional(),
    status: PaymentMethodStatusSchema,
    reusability: zod.z.union([
        zod.z.literal("ONE_TIME_USE"),
        zod.z.literal("MULTIPLE_USE")
    ]),
    actions: zod.z.array(zod.z.object({
        action: zod.z.string(),
        url: zod.z.string().url().optional(),
        url_type: zod.z.string().optional(),
        method: zod.z.string().optional()
    })).optional(),
    metadata: zod.z.record(zod.z.unknown()).optional(),
    billing_information: zod.z.object({
        country: CountrySchema.optional(),
        street_line1: zod.z.string().optional(),
        street_line2: zod.z.string().optional(),
        city: zod.z.string().optional(),
        province_state: zod.z.string().optional(),
        postal_code: zod.z.string().optional()
    }).optional(),
    failure_code: zod.z.string().nullable().optional(),
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    // Type-specific properties
    card: CardPropertiesSchema.optional(),
    bank_account: BankAccountPropertiesSchema.optional(),
    ewallet: EwalletPropertiesSchema.optional()
});
// Get Payment Method Request
const GetPaymentMethodSchema = zod.z.object({
    id: zod.z.string()
});
// List Payment Methods Request
const ListPaymentMethodsSchema = zod.z.object({
    id: zod.z.array(zod.z.string()).optional(),
    type: zod.z.array(PaymentMethodTypeSchema).optional(),
    status: zod.z.array(PaymentMethodStatusSchema).optional(),
    reusability: zod.z.union([
        zod.z.literal("ONE_TIME_USE"),
        zod.z.literal("MULTIPLE_USE")
    ]).optional(),
    customer_id: zod.z.string().optional(),
    reference_id: zod.z.string().optional(),
    after_id: zod.z.string().optional(),
    before_id: zod.z.string().optional(),
    limit: zod.z.number().min(1).max(100).default(10).optional()
});
// List Payment Methods Response
zod.z.object({
    data: zod.z.array(PaymentMethodResourceSchema),
    has_more: zod.z.boolean(),
    links: zod.z.object({
        href: zod.z.string(),
        rel: zod.z.string(),
        method: zod.z.string()
    }).array()
});
// Update Payment Method Params
const UpdatePaymentMethodParamsSchema = zod.z.object({
    id: zod.z.string(),
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
            throw new Error("axiosInstance is required");
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
const InvoiceStatusSchema = zod.z.union([
    zod.z.literal("PENDING"),
    zod.z.literal("PAID"),
    zod.z.literal("SETTLED"),
    zod.z.literal("EXPIRED")
]);
// Payer Email
zod.z.object({
    email: zod.z.string().email()
});
// Invoice Item
const InvoiceItemSchema = zod.z.object({
    name: zod.z.string(),
    quantity: zod.z.number().positive(),
    price: zod.z.number().positive(),
    category: zod.z.string().optional(),
    url: zod.z.string().url().optional()
});
// Customer Notification Preference
const CustomerNotificationPreferenceSchema = zod.z.object({
    invoice_created: zod.z.array(zod.z.union([
        zod.z.literal("whatsapp"),
        zod.z.literal("sms"),
        zod.z.literal("email")
    ])).optional(),
    invoice_reminder: zod.z.array(zod.z.union([
        zod.z.literal("whatsapp"),
        zod.z.literal("sms"),
        zod.z.literal("email")
    ])).optional(),
    invoice_paid: zod.z.array(zod.z.union([
        zod.z.literal("whatsapp"),
        zod.z.literal("sms"),
        zod.z.literal("email")
    ])).optional(),
    invoice_expired: zod.z.array(zod.z.union([
        zod.z.literal("whatsapp"),
        zod.z.literal("sms"),
        zod.z.literal("email")
    ])).optional()
});
// Customer Details
const CustomerDetailsSchema = zod.z.object({
    customer_name: zod.z.string().optional(),
    customer_email: zod.z.string().email().optional(),
    customer_phone: zod.z.string().optional(),
    billing_address: zod.z.object({
        first_name: zod.z.string().optional(),
        last_name: zod.z.string().optional(),
        address: zod.z.string().optional(),
        city: zod.z.string().optional(),
        postal_code: zod.z.string().optional(),
        phone: zod.z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional(),
    shipping_address: zod.z.object({
        first_name: zod.z.string().optional(),
        last_name: zod.z.string().optional(),
        address: zod.z.string().optional(),
        city: zod.z.string().optional(),
        postal_code: zod.z.string().optional(),
        phone: zod.z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional()
});
// Fee Details
const FeeSchema = zod.z.object({
    type: zod.z.string(),
    value: zod.z.number()
});
// Available Bank and E-wallet
const AvailableBankSchema = zod.z.object({
    bank_code: zod.z.string(),
    collection_type: zod.z.string(),
    bank_branch: zod.z.string(),
    transfer_amount: zod.z.number(),
    bank_account_number: zod.z.string(),
    account_holder_name: zod.z.string(),
    identity_amount: zod.z.number().optional()
});
const AvailableEwalletSchema = zod.z.object({
    ewallet_type: zod.z.string()
});
const AvailableRetailOutletSchema = zod.z.object({
    retail_outlet_name: zod.z.string()
});
// Create Invoice Schema
const CreateInvoiceSchema = zod.z.object({
    external_id: zod.z.string(),
    payer_email: zod.z.string().email(),
    description: zod.z.string(),
    amount: zod.z.number().positive(),
    invoice_duration: zod.z.number().positive().optional(),
    callback_virtual_account_id: zod.z.string().optional(),
    should_exclude_credit_card: zod.z.boolean().optional(),
    should_send_email: zod.z.boolean().optional(),
    customer_name: zod.z.string().optional(),
    customer_email: zod.z.string().email().optional(),
    customer_phone: zod.z.string().optional(),
    customer: CustomerDetailsSchema.optional(),
    customer_notification_preference: CustomerNotificationPreferenceSchema.optional(),
    success_redirect_url: zod.z.string().url().optional(),
    failure_redirect_url: zod.z.string().url().optional(),
    payment_methods: zod.z.array(zod.z.string()).optional(),
    mid_label: zod.z.string().optional(),
    should_authenticate_credit_card: zod.z.boolean().optional(),
    currency: CurrencySchema.optional(),
    items: zod.z.array(InvoiceItemSchema).optional(),
    fixed_va: zod.z.boolean().optional(),
    reminder_time_unit: zod.z.union([
        zod.z.literal("days"),
        zod.z.literal("hours"),
        zod.z.literal("minutes")
    ]).optional(),
    reminder_time: zod.z.number().optional(),
    locale: zod.z.string().optional(),
    fees: zod.z.array(FeeSchema).optional(),
    metadata: zod.z.record(zod.z.unknown()).optional()
});
// Update Invoice Schema
const UpdateInvoiceSchema = zod.z.object({
    should_send_email: zod.z.boolean().optional(),
    customer_name: zod.z.string().optional(),
    customer_email: zod.z.string().email().optional(),
    customer_phone: zod.z.string().optional(),
    customer: CustomerDetailsSchema.optional(),
    customer_notification_preference: CustomerNotificationPreferenceSchema.optional(),
    success_redirect_url: zod.z.string().url().optional(),
    failure_redirect_url: zod.z.string().url().optional(),
    items: zod.z.array(InvoiceItemSchema).optional(),
    metadata: zod.z.record(zod.z.unknown()).optional()
});
// Invoice Resource
const InvoiceResourceSchema = zod.z.object({
    id: zod.z.string(),
    external_id: zod.z.string(),
    user_id: zod.z.string(),
    status: InvoiceStatusSchema,
    merchant_name: zod.z.string(),
    merchant_profile_picture_url: zod.z.string().url(),
    amount: zod.z.number(),
    payer_email: zod.z.string().email(),
    description: zod.z.string(),
    expiry_date: zod.z.string().datetime(),
    invoice_url: zod.z.string().url(),
    should_exclude_credit_card: zod.z.boolean(),
    should_send_email: zod.z.boolean(),
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    currency: CurrencySchema,
    paid_amount: zod.z.number().optional(),
    credit_card_charge_id: zod.z.string().optional(),
    payment_method: zod.z.string().optional(),
    payment_channel: zod.z.string().optional(),
    payment_destination: zod.z.string().optional(),
    payment_id: zod.z.string().optional(),
    paid_at: zod.z.string().datetime().optional(),
    bank_code: zod.z.string().optional(),
    ewallet_type: zod.z.string().optional(),
    on_demand_link: zod.z.string().url().optional(),
    recurring_payment_id: zod.z.string().optional(),
    // Customer information
    customer_name: zod.z.string().optional(),
    customer_email: zod.z.string().email().optional(),
    customer_phone: zod.z.string().optional(),
    customer: CustomerDetailsSchema.optional(),
    customer_notification_preference: CustomerNotificationPreferenceSchema.optional(),
    // URLs
    success_redirect_url: zod.z.string().url().optional(),
    failure_redirect_url: zod.z.string().url().optional(),
    // Items and fees
    items: zod.z.array(InvoiceItemSchema).optional(),
    fees: zod.z.array(FeeSchema).optional(),
    // Available payment methods
    available_banks: zod.z.array(AvailableBankSchema).optional(),
    available_ewallets: zod.z.array(AvailableEwalletSchema).optional(),
    available_retail_outlets: zod.z.array(AvailableRetailOutletSchema).optional(),
    available_paylaters: zod.z.array(zod.z.object({
        paylater_type: zod.z.string()
    })).optional(),
    available_qr_codes: zod.z.array(zod.z.object({
        qr_code_type: zod.z.string()
    })).optional(),
    available_direct_debits: zod.z.array(zod.z.object({
        direct_debit_type: zod.z.string()
    })).optional(),
    should_authenticate_credit_card: zod.z.boolean().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional()
});
// Get Invoice Schema
const GetInvoiceSchema = zod.z.object({
    invoice_id: zod.z.string()
});
// List Invoices Schema
const ListInvoicesSchema = zod.z.object({
    statuses: zod.z.array(InvoiceStatusSchema).optional(),
    limit: zod.z.number().min(1).max(100).optional(),
    created_after: zod.z.string().datetime().optional(),
    created_before: zod.z.string().datetime().optional(),
    paid_after: zod.z.string().datetime().optional(),
    paid_before: zod.z.string().datetime().optional(),
    expired_after: zod.z.string().datetime().optional(),
    expired_before: zod.z.string().datetime().optional(),
    last_invoice: zod.z.string().optional(),
    client_types: zod.z.array(zod.z.string()).optional(),
    payment_channels: zod.z.array(zod.z.string()).optional(),
    on_demand_link: zod.z.string().optional(),
    recurring_payment_id: zod.z.string().optional()
});
// List Invoices Response
zod.z.object({
    has_more: zod.z.boolean(),
    data: zod.z.array(InvoiceResourceSchema)
});
// Update Invoice Params
const UpdateInvoiceParamsSchema = zod.z.object({
    invoice_id: zod.z.string(),
    payload: UpdateInvoiceSchema
});
// Expire Invoice Schema
const ExpireInvoiceSchema = zod.z.object({
    invoice_id: zod.z.string()
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
            throw new Error("axiosInstance is required");
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
const PaymentRequestTypeSchema = zod.z.union([
    zod.z.literal("PAY"),
    zod.z.literal("PAY_AND_SAVE"),
    zod.z.literal("REUSABLE_PAYMENT_CODE")
]);
// Capture Method
const CaptureMethodSchema = zod.z.union([
    zod.z.literal("AUTOMATIC"),
    zod.z.literal("MANUAL")
]);
// Payment Request Status
const PaymentRequestStatusSchema = zod.z.union([
    zod.z.literal("PENDING"),
    zod.z.literal("REQUIRES_ACTION"),
    zod.z.literal("SUCCEEDED"),
    zod.z.literal("FAILED"),
    zod.z.literal("VOIDED"),
    zod.z.literal("CANCELED")
]);
// Channel Code (simplified - can be expanded)
zod.z.union([
    zod.z.literal("GCASH"),
    zod.z.literal("GRABPAY"),
    zod.z.literal("PAYMAYA"),
    zod.z.literal("SHOPEEPAY")
]);
// Channel Properties
const ChannelPropertiesSchema = zod.z.object({
    failure_return_url: zod.z.string().url().min(8).max(2000),
    success_return_url: zod.z.string().url().min(8).max(2000),
    enable_otp: zod.z.boolean().optional()
});
// Payment Method
const PaymentMethodSchema = zod.z.object({
    type: zod.z.string(),
    card_information: zod.z.object({
        token_id: zod.z.string()
    }).optional(),
    ewallet: zod.z.object({
        channel_code: zod.z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    direct_debit: zod.z.object({
        channel_code: zod.z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    over_the_counter: zod.z.object({
        channel_code: zod.z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    qr_code: zod.z.object({
        channel_code: zod.z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional(),
    virtual_account: zod.z.object({
        channel_code: zod.z.string(),
        channel_properties: ChannelPropertiesSchema.optional()
    }).optional()
});
// Create Payment Request Schema
const CreatePaymentRequestSchema = zod.z.object({
    reference_id: zod.z.string(),
    type: PaymentRequestTypeSchema,
    country: CountrySchema,
    currency: CurrencySchema,
    request_amount: zod.z.number().positive(),
    payment_method: PaymentMethodSchema,
    description: zod.z.string().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional(),
    customer_id: zod.z.string().optional(),
    customer: zod.z.object({
        given_names: zod.z.string(),
        surname: zod.z.string().optional(),
        email: zod.z.string().email().optional(),
        mobile_number: zod.z.string().optional()
    }).optional(),
    shipping_information: zod.z.object({
        name: zod.z.string(),
        phone_number: zod.z.string().optional(),
        address: zod.z.string().optional(),
        city: zod.z.string().optional(),
        province: zod.z.string().optional(),
        postal_code: zod.z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional(),
    items: zod.z.array(zod.z.object({
        name: zod.z.string(),
        quantity: zod.z.number().positive(),
        price: zod.z.number().positive(),
        category: zod.z.string().optional(),
        reference_id: zod.z.string().optional(),
        url: zod.z.string().url().optional()
    })).optional(),
    capture_method: CaptureMethodSchema.optional(),
    success_redirect_url: zod.z.string().url().optional(),
    failure_redirect_url: zod.z.string().url().optional()
});
// Payment Request Resource
const PaymentRequestResourceSchema = zod.z.object({
    id: zod.z.string(),
    reference_id: zod.z.string(),
    type: PaymentRequestTypeSchema,
    country: CountrySchema,
    currency: CurrencySchema,
    request_amount: zod.z.number(),
    paid_amount: zod.z.number().optional(),
    status: PaymentRequestStatusSchema,
    payment_method: PaymentMethodSchema,
    description: zod.z.string().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional(),
    customer_id: zod.z.string().optional(),
    customer: zod.z.object({
        given_names: zod.z.string(),
        surname: zod.z.string().optional(),
        email: zod.z.string().email().optional(),
        mobile_number: zod.z.string().optional()
    }).optional(),
    shipping_information: zod.z.object({
        name: zod.z.string(),
        phone_number: zod.z.string().optional(),
        address: zod.z.string().optional(),
        city: zod.z.string().optional(),
        province: zod.z.string().optional(),
        postal_code: zod.z.string().optional(),
        country_code: CountrySchema.optional()
    }).optional(),
    items: zod.z.array(zod.z.object({
        name: zod.z.string(),
        quantity: zod.z.number().positive(),
        price: zod.z.number().positive(),
        category: zod.z.string().optional(),
        reference_id: zod.z.string().optional(),
        url: zod.z.string().url().optional()
    })).optional(),
    actions: zod.z.object({
        desktop_web_checkout_url: zod.z.string().url().optional(),
        mobile_web_checkout_url: zod.z.string().url().optional(),
        mobile_deeplink_checkout_url: zod.z.string().url().optional(),
        qr_checkout_string: zod.z.string().optional()
    }).optional(),
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    failure_reason: zod.z.string().optional(),
    payment_request_id: zod.z.string().optional()
});
// Get Payment Request Schema
const GetPaymentRequestSchema = zod.z.object({
    id: zod.z.string()
});
// List Payment Requests Schema
const ListPaymentRequestsSchema = zod.z.object({
    reference_id: zod.z.string().optional(),
    customer_id: zod.z.string().optional(),
    status: zod.z.array(PaymentRequestStatusSchema).optional(),
    limit: zod.z.number().min(1).max(100).optional(),
    after_id: zod.z.string().optional(),
    before_id: zod.z.string().optional(),
    created_after: zod.z.string().datetime().optional(),
    created_before: zod.z.string().datetime().optional()
});
// List Payment Requests Response
zod.z.object({
    data: zod.z.array(PaymentRequestResourceSchema),
    has_more: zod.z.boolean(),
    links: zod.z.array(zod.z.object({
        href: zod.z.string(),
        rel: zod.z.string(),
        method: zod.z.string()
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
            throw new Error("axiosInstance is required");
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
const RefundReasonSchema = zod.z.union([
    zod.z.literal("REQUESTED_BY_CUSTOMER"),
    zod.z.literal("FRAUDULENT"),
    zod.z.literal("DUPLICATE"),
    zod.z.literal("CANCELLATION"),
    zod.z.literal("OTHERS")
]);
// Refund Status
const RefundStatusSchema = zod.z.union([
    zod.z.literal("PENDING"),
    zod.z.literal("SUCCEEDED"),
    zod.z.literal("FAILED")
]);
// Create Refund Schema
const CreateRefundSchema = zod.z.object({
    payment_request_id: zod.z.string(),
    amount: zod.z.number().positive().optional(),
    reason: RefundReasonSchema,
    metadata: zod.z.record(zod.z.unknown()).optional()
});
// Refund Resource
const RefundResourceSchema = zod.z.object({
    id: zod.z.string(),
    payment_request_id: zod.z.string(),
    amount: zod.z.number(),
    currency: zod.z.string(),
    reason: RefundReasonSchema,
    status: RefundStatusSchema,
    metadata: zod.z.record(zod.z.unknown()).optional(),
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    failure_reason: zod.z.string().optional()
});
// Get Refund Schema
const GetRefundSchema = zod.z.object({
    id: zod.z.string()
});
// List Refunds Schema
const ListRefundsSchema = zod.z.object({
    payment_request_id: zod.z.string().optional(),
    limit: zod.z.number().min(1).max(100).optional(),
    after_id: zod.z.string().optional(),
    before_id: zod.z.string().optional(),
    created_after: zod.z.string().datetime().optional(),
    created_before: zod.z.string().datetime().optional()
});
// List Refunds Response
zod.z.object({
    data: zod.z.array(RefundResourceSchema),
    has_more: zod.z.boolean(),
    links: zod.z.array(zod.z.object({
        href: zod.z.string(),
        rel: zod.z.string(),
        method: zod.z.string()
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
            throw new Error("axiosInstance is required");
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
const PayoutStatusSchema = zod.z.union([
    zod.z.literal("ACCEPTED"),
    zod.z.literal("PENDING"),
    zod.z.literal("PROCESSING"),
    zod.z.literal("COMPLETED"),
    zod.z.literal("FAILED"),
    zod.z.literal("CANCELLED"),
    zod.z.literal("REVERSED")
]);
// Payout Channel Code
const PayoutChannelCodeSchema = zod.z.union([
    zod.z.literal("BANK"),
    zod.z.literal("EWALLET"),
    zod.z.literal("CASH")
]);
// Bank Account
const BankAccountSchema = zod.z.object({
    account_holder_name: zod.z.string(),
    account_number: zod.z.string(),
    bank_code: zod.z.string(),
    account_type: zod.z.string().optional()
});
// E-wallet Account
const EwalletAccountSchema = zod.z.object({
    account_holder_name: zod.z.string(),
    account_number: zod.z.string(),
    ewallet_type: zod.z.string()
});
// Payout Method
const PayoutMethodSchema = zod.z.discriminatedUnion("channel_code", [
    zod.z.object({
        channel_code: zod.z.literal("BANK"),
        bank_account: BankAccountSchema
    }),
    zod.z.object({
        channel_code: zod.z.literal("EWALLET"),
        ewallet: EwalletAccountSchema
    }),
    zod.z.object({
        channel_code: zod.z.literal("CASH"),
        cash: zod.z.object({
            account_holder_name: zod.z.string(),
            account_number: zod.z.string()
        })
    })
]);
// Create Payout Schema
const CreatePayoutSchema = zod.z.object({
    reference_id: zod.z.string(),
    channel_code: PayoutChannelCodeSchema,
    channel_properties: PayoutMethodSchema,
    amount: zod.z.number().positive(),
    currency: CurrencySchema,
    description: zod.z.string().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional(),
    receipt_notification: zod.z.object({
        email_to: zod.z.array(zod.z.string().email()).optional(),
        email_cc: zod.z.array(zod.z.string().email()).optional(),
        email_bcc: zod.z.array(zod.z.string().email()).optional()
    }).optional()
});
// Payout Resource
const PayoutResourceSchema = zod.z.object({
    id: zod.z.string(),
    reference_id: zod.z.string(),
    channel_code: PayoutChannelCodeSchema,
    channel_properties: PayoutMethodSchema,
    amount: zod.z.number(),
    currency: CurrencySchema,
    status: PayoutStatusSchema,
    description: zod.z.string().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional(),
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    failure_reason: zod.z.string().optional(),
    estimated_arrival_time: zod.z.string().datetime().optional(),
    receipt_notification: zod.z.object({
        email_to: zod.z.array(zod.z.string().email()).optional(),
        email_cc: zod.z.array(zod.z.string().email()).optional(),
        email_bcc: zod.z.array(zod.z.string().email()).optional()
    }).optional()
});
// Get Payout Schema
const GetPayoutSchema = zod.z.object({
    id: zod.z.string()
});
// List Payouts Schema
const ListPayoutsSchema = zod.z.object({
    reference_id: zod.z.string().optional(),
    channel_code: zod.z.array(PayoutChannelCodeSchema).optional(),
    status: zod.z.array(PayoutStatusSchema).optional(),
    limit: zod.z.number().min(1).max(100).optional(),
    after_id: zod.z.string().optional(),
    before_id: zod.z.string().optional(),
    created_after: zod.z.string().datetime().optional(),
    created_before: zod.z.string().datetime().optional()
});
// List Payouts Response
zod.z.object({
    data: zod.z.array(PayoutResourceSchema),
    has_more: zod.z.boolean(),
    links: zod.z.array(zod.z.object({
        href: zod.z.string(),
        rel: zod.z.string(),
        method: zod.z.string()
    })).optional()
});
// Cancel Payout Schema
const CancelPayoutSchema = zod.z.object({
    id: zod.z.string()
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
            throw new Error("axiosInstance is required");
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
const BalanceResourceSchema = zod.z.object({
    balance: zod.z.number(),
    currency: CurrencySchema,
    account_type: zod.z.string().optional()
});
// Transaction Type
const TransactionTypeSchema = zod.z.union([
    zod.z.literal("PAYMENT"),
    zod.z.literal("PAYOUT"),
    zod.z.literal("REFUND"),
    zod.z.literal("FEE"),
    zod.z.literal("ADJUSTMENT")
]);
// Transaction Status
const TransactionStatusSchema = zod.z.union([
    zod.z.literal("PENDING"),
    zod.z.literal("SUCCEEDED"),
    zod.z.literal("FAILED"),
    zod.z.literal("CANCELLED")
]);
// Transaction Resource
const TransactionResourceSchema = zod.z.object({
    id: zod.z.string(),
    reference_id: zod.z.string().optional(),
    type: TransactionTypeSchema,
    status: TransactionStatusSchema,
    amount: zod.z.number(),
    currency: CurrencySchema,
    created: zod.z.string().datetime(),
    updated: zod.z.string().datetime(),
    description: zod.z.string().optional(),
    metadata: zod.z.record(zod.z.unknown()).optional()
});
// List Transactions Schema
const ListTransactionsSchema = zod.z.object({
    types: zod.z.array(TransactionTypeSchema).optional(),
    statuses: zod.z.array(TransactionStatusSchema).optional(),
    limit: zod.z.number().min(1).max(100).optional(),
    after_id: zod.z.string().optional(),
    before_id: zod.z.string().optional(),
    created_after: zod.z.string().datetime().optional(),
    created_before: zod.z.string().datetime().optional()
});
// List Transactions Response
zod.z.object({
    data: zod.z.array(TransactionResourceSchema),
    has_more: zod.z.boolean(),
    links: zod.z.array(zod.z.object({
        href: zod.z.string(),
        rel: zod.z.string(),
        method: zod.z.string()
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
            throw new Error("axiosInstance is required");
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

const CardDataSchema = zod.z.object({
    account_number: zod.z.string(),
    exp_month: zod.z.string(),
    exp_year: zod.z.string(),
    card_holder_first_name: zod.z.string(),
    card_holder_last_name: zod.z.string(),
    card_holder_email: zod.z.string().email(),
    card_holder_phone_number: PhoneSchema
});
const TokenParamsSchema = zod.z.object({
    amount: zod.z.string().optional(),
    card_data: CardDataSchema.optional(),
    external_id: zod.z.string().optional(),
    card_cvn: zod.z.string().min(3).max(3).optional(),
    is_multiple_use: zod.z.boolean().optional().default(false),
    currency: CurrencySchema.optional(),
    should_authenticate: zod.z.boolean().default(true),
    billing_details: AddressSchema.optional(),
    mid_label: zod.z.string()
});
const TokenStatusSchema = zod.z.union([
    zod.z.literal("IN_REVIEW"),
    zod.z.literal("VERIFIED"),
    zod.z.literal("FAILED"),
    zod.z.literal("SUCCEEDED"),
    zod.z.literal("CAPTURED"),
    zod.z.literal("REVERSED"),
    zod.z.literal("AUTHORISED")
]);
const CardTypeSchema = zod.z.union([
    zod.z.literal("CREDIT"),
    zod.z.literal("DEBIT"),
    zod.z.literal("PREPAID"),
    zod.z.literal("UNKNOWN")
]);
const CardBrandSchema = zod.z.union([
    zod.z.literal("VISA"),
    zod.z.literal("MASTERCARD"),
    zod.z.literal("JCB"),
    zod.z.literal("AMEX")
]);
const TokenFailureReasonSchema = zod.z.union([
    zod.z.literal("AUTHENTICATION_FAILED"),
    zod.z.literal("REVERSE_AUTHORIZATION_REJECTED_BY_BANK"),
    zod.z.literal("PROCESSOR_ERROR")
]);
zod.z.union([
    zod.z.literal("API_VALIDATION_ERROR"),
    zod.z.literal("INVALID_JSON_FORMAT"),
    zod.z.literal("ACCOUNT_NUMBER_INVALID_ERROR"),
    zod.z.literal("VALIDATION_ERROR"),
    zod.z.literal("BRAND_NOT_SUPPORTED_ERROR"),
    zod.z.literal("AUTHENTICATION_REQUIRED_ERROR"),
    zod.z.literal("REQUEST_FORBIDDEN_ERROR"),
    zod.z.literal("VERIFICATION_TIMEOUT_ERROR"),
    zod.z.literal("TEMPORARY_SERVICE_ERROR"),
    zod.z.literal("CONNECTION_ERROR")
]);
const CardInfoSchema = zod.z.object({
    bank: zod.z.string().optional(),
    country: CountrySchema.optional(),
    type: CardTypeSchema.optional(),
    brand: CardBrandSchema.optional(),
    fingerprint: zod.z.string().optional(),
    card_art_url: zod.z.string().url().optional()
});
const TokenResourceSchema = zod.z.object({
    id: zod.z.string(),
    business_id: zod.z.string().optional(),
    created: zod.z.string().datetime(),
    authentication_id: zod.z.string(),
    external_id: zod.z.string(),
    masked_card_number: zod.z.string(),
    status: zod.z.string(),
    payer_authentication_url: zod.z.string().url().optional(),
    failure_reason: zod.z.string().optional(),
    card_info: CardInfoSchema.optional()
});
const GetTokemParamsSchema = zod.z.object({
    credit_card_token_id: zod.z.string()
});
const TokenAuthenticationSchema = zod.z.object({
    amount: zod.z.string().optional(),
    token_id: zod.z.string().optional(),
    card_data: CardDataSchema.optional(),
    external_id: zod.z.string().optional(),
    currency: CurrencySchema.optional(),
    mid_label: zod.z.string().optional()
});
const TokenAuthenticationResourceSchema = zod.z.object({
    id: zod.z.string(),
    status: TokenStatusSchema,
    external_id: zod.z.string().optional(),
    payer_authentication_url: zod.z.string().url().optional(),
    mid_label: zod.z.string().optional(),
    failure_reason: TokenFailureReasonSchema.optional()
});
const TokenAuthorizationSchema = zod.z.object({
    amount: zod.z.string().optional(),
    token_id: zod.z.string().optional(),
    capture: zod.z.boolean().default(false),
    external_id: zod.z.string().optional(),
    authentication_id: zod.z.string().optional()
});
const ZeroAuthorizationSchema = zod.z.object({
    amount: zod.z.string().default("0"),
    token_id: zod.z.string().optional(),
    capture: zod.z.boolean().default(false),
    external_id: zod.z.string().optional(),
    authentication_id: zod.z.string().optional()
});
const ReverseAuthorizationSchema = zod.z.object({
    external_id: zod.z.string()
});
const PromotionSummarySchema = zod.z.object({
    reference_id: zod.z.string(),
    original_amount: zod.z.number()
});
const IntervalSchema = zod.z.literal("month");
const InstallmentSummary = zod.z.object({
    count: zod.z.number().optional(),
    interval: IntervalSchema.optional()
});
const ECICodeSchema = zod.z.union([
    zod.z.literal("0"),
    zod.z.literal("1"),
    zod.z.literal("2"),
    zod.z.literal("3"),
    zod.z.literal("4"),
    zod.z.literal("5")
]);
const CVNCodeSchema = zod.z.union([
    zod.z.literal("M"),
    zod.z.literal("N"),
    zod.z.literal("P")
]);
const CreateChargeSchema = zod.z.object({
    token_id: zod.z.string(),
    external_id: zod.z.string(),
    amount: zod.z.number(),
    authentication_id: zod.z.string().optional(),
    capture: zod.z.boolean().optional().default(false),
    descriptor: zod.z.string().optional(),
    currency: CurrencySchema.optional(),
    mid_label: zod.z.string().optional(),
    billing_details: BillingDetailSchema.optional(),
    promotion: PromotionSummarySchema.optional(),
    installment: InstallmentSummary.optional(),
    metadata: zod.z.object({}).optional()
});
const ChargeFailureReasonSchema = zod.z.union([
    zod.z.literal("AUTHENTICATION_FAILED"),
    zod.z.literal("DECLINED_BY_ISSUER"),
    zod.z.literal("DECLINED_BY_PROCESSOR"),
    zod.z.literal("EXPIRED_CARD"),
    zod.z.literal("ISSUER_SUSPECT_FRAUD"),
    zod.z.literal("INACTIVE_OR_UNAUTHORIZED_CARD"),
    zod.z.literal("INSUFFICIENT_BALANCE"),
    zod.z.literal("INVALID_CARD"),
    zod.z.literal("INVALID_CVV"),
    zod.z.literal("ISSUER_UNAVAILABLE"),
    zod.z.literal("PROCESSOR_ERROR"),
    zod.z.literal("STOLEN_CARD"),
    zod.z.literal("PROCESSOR_TIMEOUT"),
    zod.z.literal("FRAUD_RISK_BLOCKED")
]);
const ChargeTypeSchema = zod.z.union([
    zod.z.literal("SINGLE_USE_TOKEN"),
    zod.z.literal("MULTIPLE_USE_TOKEN"),
    zod.z.literal("RECURRING")
]);
const ChargeResourceSchema = zod.z.object({
    created: zod.z.string().datetime(),
    status: TokenStatusSchema,
    business_id: zod.z.string(),
    authorized_amount: zod.z.number(),
    external_id: zod.z.string(),
    merchant_id: zod.z.string(),
    merchant_reference_code: zod.z.string(),
    card_type: CardTypeSchema,
    masked_card_number: zod.z.string(),
    charge_type: ChargeTypeSchema,
    card_brand: CardBrandSchema,
    bank_reconciliation_id: zod.z.string(),
    failure_reason: ChargeFailureReasonSchema.optional(),
    eci: ECICodeSchema.optional(),
    cvn_code: CVNCodeSchema.optional(),
    capture_amount: zod.z.number().optional(),
    descriptor: zod.z.string().optional(),
    id: zod.z.string(),
    mid_label: zod.z.string().optional(),
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
const WebhookEventTypeSchema = zod.z.union([
    zod.z.literal("invoice.paid"),
    zod.z.literal("invoice.expired"),
    zod.z.literal("payment.succeeded"),
    zod.z.literal("payment.failed"),
    zod.z.literal("ewallet.charge.succeeded"),
    zod.z.literal("ewallet.charge.pending"),
    zod.z.literal("ewallet.charge.failed"),
    zod.z.literal("payment_method.activate"),
    zod.z.literal("payment_method.expire"),
    zod.z.literal("customer.created"),
    zod.z.literal("customer.updated")
]);
// Base Webhook Event Schema
const WebhookEventSchema = zod.z.object({
    id: zod.z.string(),
    event: WebhookEventTypeSchema,
    api_version: zod.z.string(),
    created: zod.z.string().datetime(),
    business_id: zod.z.string(),
    data: zod.z.record(zod.z.unknown())
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
    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");
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
const PaginationMetaSchema = zod.z.object({
    has_more: zod.z.boolean(),
    after_id: zod.z.string().optional(),
    before_id: zod.z.string().optional(),
    total_count: zod.z.number().optional()
});
const PaginatedResponseSchema = (itemSchema)=>zod.z.object({
        data: zod.z.array(itemSchema),
        has_more: zod.z.boolean(),
        after_id: zod.z.string().optional(),
        before_id: zod.z.string().optional(),
        total_count: zod.z.number().optional()
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

exports.AuthenticationError = AuthenticationError;
exports.NotFoundError = NotFoundError;
exports.PaginatedResponseSchema = PaginatedResponseSchema;
exports.PaginationMetaSchema = PaginationMetaSchema;
exports.RateLimitError = RateLimitError;
exports.RateLimiter = RateLimiter;
exports.ValidationError = ValidationError;
exports.WebhookEventSchema = WebhookEventSchema;
exports.WebhookEventTypeSchema = WebhookEventTypeSchema;
exports.Xendit = Xendit;
exports.XenditApiError = XenditApiError;
exports.XenditErrorSchema = XenditErrorSchema;
exports.buildPaginationParams = buildPaginationParams;
exports.buildSearchParams = buildSearchParams;
exports.createPaginator = createPaginator;
exports.createRateLimitInterceptor = createRateLimitInterceptor;
exports.createRateLimitedAxios = createRateLimitedAxios;
exports.createRetryInterceptor = createRetryInterceptor;
exports.createWebhookProcessor = createWebhookProcessor;
exports.fetchAllPages = fetchAllPages;
exports.fetchPaginated = fetchPaginated;
exports.handleAxiosError = handleAxiosError;
exports.handleWebhookEvent = handleWebhookEvent;
exports.isNotNullOrUndefined = isNotNullOrUndefined;
exports.isValidCheckoutMethod = isValidCheckoutMethod;
exports.isValidCountry = isValidCountry;
exports.isValidCurrency = isValidCurrency;
exports.isValidCustomerType = isValidCustomerType;
exports.isValidDateString = isValidDateString;
exports.isValidEmail = isValidEmail;
exports.isValidPhone = isValidPhone;
exports.isValidUrl = isValidUrl;
exports.iterateItems = iterateItems;
exports.iteratePages = iteratePages;
exports.parseWebhookEvent = parseWebhookEvent;
exports.setupRateLimit = setupRateLimit;
exports.validateInput = validateInput;
exports.verifyWebhookHmac = verifyWebhookHmac;
exports.verifyWebhookSignature = verifyWebhookSignature;
