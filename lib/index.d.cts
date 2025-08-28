import { InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { z } from 'zod';

/**
 * Rate limiting configuration
 */
interface RateLimitConfig {
    /**
     * Maximum number of requests per window
     * @default 100
     */
    maxRequests?: number;
    /**
     * Time window in milliseconds
     * @default 60000 (1 minute)
     */
    windowMs?: number;
    /**
     * Delay between requests in milliseconds
     * @default 0
     */
    requestDelayMs?: number;
    /**
     * Maximum number of retry attempts when rate limited
     * @default 3
     */
    maxRetries?: number;
    /**
     * Base delay for exponential backoff in milliseconds
     * @default 1000
     */
    baseRetryDelayMs?: number;
    /**
     * Maximum retry delay in milliseconds
     * @default 30000
     */
    maxRetryDelayMs?: number;
}
/**
 * Rate limiter implementation using token bucket algorithm
 */
declare class RateLimiter {
    private tokens;
    private lastRefill;
    private readonly config;
    constructor(config?: RateLimitConfig);
    /**
     * Refill tokens based on elapsed time
     */
    private refillTokens;
    /**
     * Check if a request can be made
     */
    canMakeRequest(): boolean;
    /**
     * Consume a token for a request
     */
    consumeToken(): boolean;
    /**
     * Get time until next token is available
     */
    getWaitTime(): number;
    /**
     * Wait for a token to become available
     */
    waitForToken(): Promise<void>;
    /**
     * Sleep for specified milliseconds
     */
    private sleep;
}
/**
 * Axios interceptor for rate limiting
 */
declare function createRateLimitInterceptor(rateLimiter: RateLimiter): {
    request: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig<any>>;
    response: (response: AxiosResponse) => AxiosResponse<any, any>;
    responseError: (error: AxiosError) => Promise<never>;
};
/**
 * Basic retry interceptor - simplified for compatibility
 */
declare function createRetryInterceptor(_config?: RateLimitConfig): (error: AxiosError) => Promise<any>;
/**
 * Setup rate limiting and retry logic for an Axios instance
 */
declare function setupRateLimit(axiosInstance: AxiosInstance, config?: RateLimitConfig): void;
/**
 * Create a rate-limited axios instance
 */
declare function createRateLimitedAxios(baseURL: string, apiKey: string, config?: RateLimitConfig): AxiosInstance;

declare const CustomerTypeSchema: z.ZodUnion<[z.ZodLiteral<"INDIVIDUAL">, z.ZodLiteral<"BUSINESS">]>;
type CustomerType = z.infer<typeof CustomerTypeSchema>;
declare const CustomerSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"INDIVIDUAL">;
    reference_id: z.ZodString;
    individual_detail: z.ZodObject<{
        given_names: z.ZodString;
        surname: z.ZodOptional<z.ZodString>;
        nationality: z.ZodOptional<z.ZodString>;
        place_of_birth: z.ZodOptional<z.ZodString>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
        employment: z.ZodOptional<z.ZodObject<{
            employer_name: z.ZodString;
            nature_of_business: z.ZodString;
            role_description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        }, {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    }, {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    }>;
    business_detail: z.ZodOptional<z.ZodUndefined>;
    email: z.ZodOptional<z.ZodString>;
    mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodString;
        category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }>, "many">>;
    identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"BANK_ACCOUNT">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                swift_code: z.ZodOptional<z.ZodString>;
                account_type: z.ZodOptional<z.ZodString>;
                account_details: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EWALLET">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CREDIT_CARD">;
            properties: z.ZodObject<{
                token_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                token_id: string;
            }, {
                token_id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OTC">;
            properties: z.ZodObject<{
                payment_code: z.ZodString;
                expires_at: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                payment_code: string;
                expires_at?: string | undefined;
            }, {
                payment_code: string;
                expires_at?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QR_CODE">;
            properties: z.ZodObject<{
                qr_string: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                qr_string: string;
            }, {
                qr_string: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAY_LATER">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_holder_name: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SOCIAL_MEDIA">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_handle: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_handle?: string | undefined;
            }, {
                account_id: string;
                account_handle?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }>, "many">>;
    kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        sub_type: z.ZodString;
        country: z.ZodString;
        document_name: z.ZodString;
        document_number: z.ZodString;
        expires_at: z.ZodNull;
        holder_name: z.ZodString;
        document_images: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }>, "many">>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
}, "strip", z.ZodTypeAny, {
    type: "INDIVIDUAL";
    individual_detail: {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    };
    reference_id: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    business_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}, {
    type: "INDIVIDUAL";
    individual_detail: {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    };
    reference_id: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    business_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"BUSINESS">;
    reference_id: z.ZodString;
    individual_detail: z.ZodOptional<z.ZodUndefined>;
    business_detail: z.ZodObject<{
        business_name: z.ZodString;
        trading_name: z.ZodOptional<z.ZodString>;
        business_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    }, {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    }>;
    email: z.ZodOptional<z.ZodString>;
    mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodString;
        category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }>, "many">>;
    identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"BANK_ACCOUNT">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                swift_code: z.ZodOptional<z.ZodString>;
                account_type: z.ZodOptional<z.ZodString>;
                account_details: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EWALLET">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CREDIT_CARD">;
            properties: z.ZodObject<{
                token_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                token_id: string;
            }, {
                token_id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OTC">;
            properties: z.ZodObject<{
                payment_code: z.ZodString;
                expires_at: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                payment_code: string;
                expires_at?: string | undefined;
            }, {
                payment_code: string;
                expires_at?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QR_CODE">;
            properties: z.ZodObject<{
                qr_string: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                qr_string: string;
            }, {
                qr_string: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAY_LATER">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_holder_name: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SOCIAL_MEDIA">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_handle: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_handle?: string | undefined;
            }, {
                account_id: string;
                account_handle?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }>, "many">>;
    kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        sub_type: z.ZodString;
        country: z.ZodString;
        document_name: z.ZodString;
        document_number: z.ZodString;
        expires_at: z.ZodNull;
        holder_name: z.ZodString;
        document_images: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }>, "many">>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
}, "strip", z.ZodTypeAny, {
    type: "BUSINESS";
    business_detail: {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    };
    reference_id: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    individual_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}, {
    type: "BUSINESS";
    business_detail: {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    };
    reference_id: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    individual_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}>]>;
type Customer = z.infer<typeof CustomerSchema>;
declare const GetCustomerSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type GetCustomer = z.infer<typeof GetCustomerSchema>;
declare const CustomerResourceSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"INDIVIDUAL">;
    id: z.ZodString;
    reference_id: z.ZodString;
    individual_detail: z.ZodObject<{
        given_names: z.ZodString;
        surname: z.ZodOptional<z.ZodString>;
        nationality: z.ZodOptional<z.ZodString>;
        place_of_birth: z.ZodOptional<z.ZodString>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
        employment: z.ZodOptional<z.ZodObject<{
            employer_name: z.ZodString;
            nature_of_business: z.ZodString;
            role_description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        }, {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    }, {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    }>;
    business_detail: z.ZodOptional<z.ZodUndefined>;
    email: z.ZodOptional<z.ZodString>;
    mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodString;
        category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }>, "many">>;
    identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"BANK_ACCOUNT">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                swift_code: z.ZodOptional<z.ZodString>;
                account_type: z.ZodOptional<z.ZodString>;
                account_details: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EWALLET">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CREDIT_CARD">;
            properties: z.ZodObject<{
                token_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                token_id: string;
            }, {
                token_id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OTC">;
            properties: z.ZodObject<{
                payment_code: z.ZodString;
                expires_at: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                payment_code: string;
                expires_at?: string | undefined;
            }, {
                payment_code: string;
                expires_at?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QR_CODE">;
            properties: z.ZodObject<{
                qr_string: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                qr_string: string;
            }, {
                qr_string: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAY_LATER">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_holder_name: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SOCIAL_MEDIA">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_handle: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_handle?: string | undefined;
            }, {
                account_id: string;
                account_handle?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }>, "many">>;
    kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        sub_type: z.ZodString;
        country: z.ZodString;
        document_name: z.ZodString;
        document_number: z.ZodString;
        expires_at: z.ZodNull;
        holder_name: z.ZodString;
        document_images: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }>, "many">>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
    created: z.ZodString;
    updated: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "INDIVIDUAL";
    individual_detail: {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    };
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    business_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}, {
    type: "INDIVIDUAL";
    individual_detail: {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        employment?: {
            employer_name: string;
            nature_of_business: string;
            role_description: string;
        } | undefined;
    };
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    business_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"BUSINESS">;
    id: z.ZodString;
    reference_id: z.ZodString;
    individual_detail: z.ZodOptional<z.ZodUndefined>;
    business_detail: z.ZodObject<{
        business_name: z.ZodString;
        trading_name: z.ZodOptional<z.ZodString>;
        business_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    }, {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    }>;
    email: z.ZodOptional<z.ZodString>;
    mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodString;
        category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }, {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }>, "many">>;
    identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
        company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"BANK_ACCOUNT">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                swift_code: z.ZodOptional<z.ZodString>;
                account_type: z.ZodOptional<z.ZodString>;
                account_details: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }, {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EWALLET">;
            properties: z.ZodObject<{
                account_number: z.ZodString;
                account_holder_name: z.ZodString;
                currency: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }, {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }, {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CREDIT_CARD">;
            properties: z.ZodObject<{
                token_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                token_id: string;
            }, {
                token_id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }, {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OTC">;
            properties: z.ZodObject<{
                payment_code: z.ZodString;
                expires_at: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                payment_code: string;
                expires_at?: string | undefined;
            }, {
                payment_code: string;
                expires_at?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }, {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QR_CODE">;
            properties: z.ZodObject<{
                qr_string: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                qr_string: string;
            }, {
                qr_string: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }, {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAY_LATER">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_holder_name: z.ZodOptional<z.ZodString>;
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SOCIAL_MEDIA">;
            properties: z.ZodObject<{
                account_id: z.ZodString;
                account_handle: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_handle?: string | undefined;
            }, {
                account_id: string;
                account_handle?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }, {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        }>]>;
    }, "strip", z.ZodTypeAny, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }, {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }>, "many">>;
    kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        sub_type: z.ZodString;
        country: z.ZodString;
        document_name: z.ZodString;
        document_number: z.ZodString;
        expires_at: z.ZodNull;
        holder_name: z.ZodString;
        document_images: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }, {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }>, "many">>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
    created: z.ZodString;
    updated: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "BUSINESS";
    business_detail: {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    };
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    individual_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}, {
    type: "BUSINESS";
    business_detail: {
        business_name: string;
        business_type: string;
        trading_name?: string | undefined;
    };
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
    description?: string | null | undefined;
    individual_detail?: undefined;
    hashed_phone_number?: string | null | undefined;
    addresses?: {
        country: string;
        street_line1?: string | null | undefined;
        street_line2?: string | null | undefined;
        city?: string | null | undefined;
        province_state?: string | null | undefined;
        postal_code?: string | null | undefined;
        category?: string | null | undefined;
        is_primary?: boolean | null | undefined;
    }[] | undefined;
    identity_accounts?: {
        type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
        properties: {
            type: "BANK_ACCOUNT";
            properties: {
                account_number: string;
                account_holder_name: string;
                swift_code?: string | undefined;
                account_type?: string | undefined;
                account_details?: string | undefined;
                currency?: string | undefined;
            };
        } | {
            type: "EWALLET";
            properties: {
                account_number: string;
                account_holder_name: string;
                currency?: string | undefined;
            };
        } | {
            type: "CREDIT_CARD";
            properties: {
                token_id: string;
            };
        } | {
            type: "OTC";
            properties: {
                payment_code: string;
                expires_at?: string | undefined;
            };
        } | {
            type: "QR_CODE";
            properties: {
                qr_string: string;
            };
        } | {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            };
        } | {
            type: "SOCIAL_MEDIA";
            properties: {
                account_id: string;
                account_handle?: string | undefined;
            };
        };
        country?: string | null | undefined;
        company?: string | null | undefined;
        description?: string | null | undefined;
    }[] | undefined;
    kyc_documents?: {
        type: string;
        country: string;
        expires_at: null;
        sub_type: string;
        document_name: string;
        document_number: string;
        holder_name: string;
        document_images: string[];
    }[] | undefined;
    date_of_registration?: string | null | undefined;
    domicile_of_registration?: string | null | undefined;
    metadata?: {} | null | undefined;
}>]>;
type CustomerResource = z.infer<typeof CustomerResourceSchema>;
declare const GetCustomerByRefIdSchema: z.ZodObject<{
    reference_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reference_id: string;
}, {
    reference_id: string;
}>;
type GetCustomerByRefId = z.infer<typeof GetCustomerByRefIdSchema>;
declare const GetCustomerByRefIdResourceSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"INDIVIDUAL">;
        id: z.ZodString;
        reference_id: z.ZodString;
        individual_detail: z.ZodObject<{
            given_names: z.ZodString;
            surname: z.ZodOptional<z.ZodString>;
            nationality: z.ZodOptional<z.ZodString>;
            place_of_birth: z.ZodOptional<z.ZodString>;
            date_of_birth: z.ZodOptional<z.ZodString>;
            gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
            employment: z.ZodOptional<z.ZodObject<{
                employer_name: z.ZodString;
                nature_of_business: z.ZodString;
                role_description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            }, {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        }, {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        }>;
        business_detail: z.ZodOptional<z.ZodUndefined>;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodString;
            category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }, {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }>, "many">>;
        identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
            company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"BANK_ACCOUNT">;
                properties: z.ZodObject<{
                    account_number: z.ZodString;
                    account_holder_name: z.ZodString;
                    swift_code: z.ZodOptional<z.ZodString>;
                    account_type: z.ZodOptional<z.ZodString>;
                    account_details: z.ZodOptional<z.ZodString>;
                    currency: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                }, {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            }, {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EWALLET">;
                properties: z.ZodObject<{
                    account_number: z.ZodString;
                    account_holder_name: z.ZodString;
                    currency: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                }, {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            }, {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CREDIT_CARD">;
                properties: z.ZodObject<{
                    token_id: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    token_id: string;
                }, {
                    token_id: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            }, {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OTC">;
                properties: z.ZodObject<{
                    payment_code: z.ZodString;
                    expires_at: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    payment_code: string;
                    expires_at?: string | undefined;
                }, {
                    payment_code: string;
                    expires_at?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            }, {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"QR_CODE">;
                properties: z.ZodObject<{
                    qr_string: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    qr_string: string;
                }, {
                    qr_string: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            }, {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PAY_LATER">;
                properties: z.ZodObject<{
                    account_id: z.ZodString;
                    account_holder_name: z.ZodOptional<z.ZodString>;
                    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                }, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            }, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SOCIAL_MEDIA">;
                properties: z.ZodObject<{
                    account_id: z.ZodString;
                    account_handle: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_handle?: string | undefined;
                }, {
                    account_id: string;
                    account_handle?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            }, {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            }>]>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }, {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }>, "many">>;
        kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            sub_type: z.ZodString;
            country: z.ZodString;
            document_name: z.ZodString;
            document_number: z.ZodString;
            expires_at: z.ZodNull;
            holder_name: z.ZodString;
            document_images: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }, {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }>, "many">>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
        created: z.ZodString;
        updated: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        business_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    }, {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        business_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUSINESS">;
        id: z.ZodString;
        reference_id: z.ZodString;
        individual_detail: z.ZodOptional<z.ZodUndefined>;
        business_detail: z.ZodObject<{
            business_name: z.ZodString;
            trading_name: z.ZodOptional<z.ZodString>;
            business_type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        }, {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        }>;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodString;
            category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }, {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }>, "many">>;
        identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
            company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"BANK_ACCOUNT">;
                properties: z.ZodObject<{
                    account_number: z.ZodString;
                    account_holder_name: z.ZodString;
                    swift_code: z.ZodOptional<z.ZodString>;
                    account_type: z.ZodOptional<z.ZodString>;
                    account_details: z.ZodOptional<z.ZodString>;
                    currency: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                }, {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            }, {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EWALLET">;
                properties: z.ZodObject<{
                    account_number: z.ZodString;
                    account_holder_name: z.ZodString;
                    currency: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                }, {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            }, {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CREDIT_CARD">;
                properties: z.ZodObject<{
                    token_id: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    token_id: string;
                }, {
                    token_id: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            }, {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OTC">;
                properties: z.ZodObject<{
                    payment_code: z.ZodString;
                    expires_at: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    payment_code: string;
                    expires_at?: string | undefined;
                }, {
                    payment_code: string;
                    expires_at?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            }, {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"QR_CODE">;
                properties: z.ZodObject<{
                    qr_string: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    qr_string: string;
                }, {
                    qr_string: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            }, {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PAY_LATER">;
                properties: z.ZodObject<{
                    account_id: z.ZodString;
                    account_holder_name: z.ZodOptional<z.ZodString>;
                    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                }, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            }, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SOCIAL_MEDIA">;
                properties: z.ZodObject<{
                    account_id: z.ZodString;
                    account_handle: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_handle?: string | undefined;
                }, {
                    account_id: string;
                    account_handle?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            }, {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            }>]>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }, {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }>, "many">>;
        kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            sub_type: z.ZodString;
            country: z.ZodString;
            document_name: z.ZodString;
            document_number: z.ZodString;
            expires_at: z.ZodNull;
            holder_name: z.ZodString;
            document_images: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }, {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }>, "many">>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
        created: z.ZodString;
        updated: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BUSINESS";
        business_detail: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    }, {
        type: "BUSINESS";
        business_detail: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    }>]>, "many">;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    data: ({
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        business_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    } | {
        type: "BUSINESS";
        business_detail: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    })[];
    hasMore: boolean;
}, {
    data: ({
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        business_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    } | {
        type: "BUSINESS";
        business_detail: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        };
        reference_id: string;
        id: string;
        created: string;
        updated: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    })[];
    hasMore: boolean;
}>;
type GetCustomerByRefIdResource = z.infer<typeof GetCustomerByRefIdResourceSchema>;
declare const UpdateParamsSchema: z.ZodObject<{
    id: z.ZodString;
    payload: z.ZodObject<{
        individual_detail: z.ZodOptional<z.ZodObject<{
            given_names: z.ZodString;
            surname: z.ZodOptional<z.ZodString>;
            nationality: z.ZodOptional<z.ZodString>;
            place_of_birth: z.ZodOptional<z.ZodString>;
            date_of_birth: z.ZodOptional<z.ZodString>;
            gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
            employment: z.ZodOptional<z.ZodObject<{
                employer_name: z.ZodString;
                nature_of_business: z.ZodString;
                role_description: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            }, {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        }, {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        }>>;
        business_detail: z.ZodOptional<z.ZodObject<{
            business_name: z.ZodString;
            trading_name: z.ZodOptional<z.ZodString>;
            business_type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        }, {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        }>>;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        hashed_phone_number: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            street_line1: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            street_line2: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            province_state: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            postal_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodString;
            category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            is_primary: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }, {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }>, "many">>;
        identity_accounts: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
            company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            country: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            properties: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"BANK_ACCOUNT">;
                properties: z.ZodObject<{
                    account_number: z.ZodString;
                    account_holder_name: z.ZodString;
                    swift_code: z.ZodOptional<z.ZodString>;
                    account_type: z.ZodOptional<z.ZodString>;
                    account_details: z.ZodOptional<z.ZodString>;
                    currency: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                }, {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            }, {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EWALLET">;
                properties: z.ZodObject<{
                    account_number: z.ZodString;
                    account_holder_name: z.ZodString;
                    currency: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                }, {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            }, {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CREDIT_CARD">;
                properties: z.ZodObject<{
                    token_id: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    token_id: string;
                }, {
                    token_id: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            }, {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OTC">;
                properties: z.ZodObject<{
                    payment_code: z.ZodString;
                    expires_at: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    payment_code: string;
                    expires_at?: string | undefined;
                }, {
                    payment_code: string;
                    expires_at?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            }, {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"QR_CODE">;
                properties: z.ZodObject<{
                    qr_string: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    qr_string: string;
                }, {
                    qr_string: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            }, {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PAY_LATER">;
                properties: z.ZodObject<{
                    account_id: z.ZodString;
                    account_holder_name: z.ZodOptional<z.ZodString>;
                    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                }, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            }, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SOCIAL_MEDIA">;
                properties: z.ZodObject<{
                    account_id: z.ZodString;
                    account_handle: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_handle?: string | undefined;
                }, {
                    account_id: string;
                    account_handle?: string | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            }, {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            }>]>;
        }, "strip", z.ZodTypeAny, {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }, {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }>, "many">>;
        kyc_documents: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            sub_type: z.ZodString;
            country: z.ZodString;
            document_name: z.ZodString;
            document_number: z.ZodString;
            expires_at: z.ZodNull;
            holder_name: z.ZodString;
            document_images: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }, {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }>, "many">>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        domicile_of_registration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        } | undefined;
        business_detail?: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        } | undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    }, {
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        } | undefined;
        business_detail?: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        } | undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    payload: {
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        } | undefined;
        business_detail?: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        } | undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    };
}, {
    id: string;
    payload: {
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
        description?: string | null | undefined;
        individual_detail?: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
            employment?: {
                employer_name: string;
                nature_of_business: string;
                role_description: string;
            } | undefined;
        } | undefined;
        business_detail?: {
            business_name: string;
            business_type: string;
            trading_name?: string | undefined;
        } | undefined;
        hashed_phone_number?: string | null | undefined;
        addresses?: {
            country: string;
            street_line1?: string | null | undefined;
            street_line2?: string | null | undefined;
            city?: string | null | undefined;
            province_state?: string | null | undefined;
            postal_code?: string | null | undefined;
            category?: string | null | undefined;
            is_primary?: boolean | null | undefined;
        }[] | undefined;
        identity_accounts?: {
            type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
            properties: {
                type: "BANK_ACCOUNT";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    swift_code?: string | undefined;
                    account_type?: string | undefined;
                    account_details?: string | undefined;
                    currency?: string | undefined;
                };
            } | {
                type: "EWALLET";
                properties: {
                    account_number: string;
                    account_holder_name: string;
                    currency?: string | undefined;
                };
            } | {
                type: "CREDIT_CARD";
                properties: {
                    token_id: string;
                };
            } | {
                type: "OTC";
                properties: {
                    payment_code: string;
                    expires_at?: string | undefined;
                };
            } | {
                type: "QR_CODE";
                properties: {
                    qr_string: string;
                };
            } | {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                };
            } | {
                type: "SOCIAL_MEDIA";
                properties: {
                    account_id: string;
                    account_handle?: string | undefined;
                };
            };
            country?: string | null | undefined;
            company?: string | null | undefined;
            description?: string | null | undefined;
        }[] | undefined;
        kyc_documents?: {
            type: string;
            country: string;
            expires_at: null;
            sub_type: string;
            document_name: string;
            document_number: string;
            holder_name: string;
            document_images: string[];
        }[] | undefined;
        date_of_registration?: string | null | undefined;
        domicile_of_registration?: string | null | undefined;
        metadata?: {} | null | undefined;
    };
}>;
type UpdateParams = z.infer<typeof UpdateParamsSchema>;

declare const CheckoutMethodSchema: z.ZodUnion<[z.ZodLiteral<"ONE_TIME_PAYMENT">, z.ZodLiteral<"TOKENIZED_PAYMENT">]>;
type CheckoutMethod = z.infer<typeof CheckoutMethodSchema>;
declare const EWalletChargeSchema: z.ZodDiscriminatedUnion<"checkout_method", [z.ZodObject<{
    reference_id: z.ZodString;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    amount: z.ZodNumber;
    checkout_method: z.ZodLiteral<"ONE_TIME_PAYMENT">;
    channel_code: z.ZodUnion<[z.ZodLiteral<"ID_OVO">, z.ZodLiteral<"ID_DANA">, z.ZodLiteral<"ID_LINKAJA">, z.ZodLiteral<"ID_SHOPEEPAY">, z.ZodLiteral<"ID_ASTRAPAY">, z.ZodLiteral<"ID_JENIUSPAY">, z.ZodLiteral<"ID_SAKUKU">, z.ZodLiteral<"PH_PAYMAYA">, z.ZodLiteral<"PH_GCASH">, z.ZodLiteral<"PH_GRABPAY">, z.ZodLiteral<"PH_SHOPEEPAY">, z.ZodLiteral<"VN_APPOTA">, z.ZodLiteral<"VN_MOMO">, z.ZodLiteral<"VN_SHOPEEPAY">, z.ZodLiteral<"VN_VNPTWALLET">, z.ZodLiteral<"VN_VIETTELPAY">, z.ZodLiteral<"VN_ZALOPAY">, z.ZodLiteral<"TH_WECHATPAY">, z.ZodLiteral<"TH_LINEPAY">, z.ZodLiteral<"TH_TRUEMONEY">, z.ZodLiteral<"TH_SHOPEEPAY">, z.ZodLiteral<"MY_TOUCHNGO">, z.ZodLiteral<"MY_SHOPEEPAY">, z.ZodLiteral<"MY_GRABPAY">]>;
    channel_properties: z.ZodObject<{
        cashtag: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        success_redirect_url: z.ZodOptional<z.ZodString>;
        failure_redirect_url: z.ZodOptional<z.ZodString>;
        cancel_redirect_url: z.ZodOptional<z.ZodString>;
        redeem_points: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"REDEEM_ALL">, z.ZodLiteral<"REDEEM_NONE">]>>>;
    }, "strip", z.ZodTypeAny, {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    }, {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    }>;
    payment_method_id: z.ZodOptional<z.ZodUndefined>;
    customer_id: z.ZodOptional<z.ZodString>;
    basket: z.ZodOptional<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        name: z.ZodString;
        category: z.ZodString;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        type: z.ZodUnion<[z.ZodLiteral<"PRODUCT">, z.ZodLiteral<"SERVICE">]>;
        url: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        subcategory: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }, {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    reference_id: string;
    channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
    channel_properties: {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    };
    checkout_method: "ONE_TIME_PAYMENT";
    amount: number;
    metadata?: {} | undefined;
    payment_method_id?: undefined;
    customer_id?: string | undefined;
    basket?: {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }[] | undefined;
}, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    reference_id: string;
    channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
    channel_properties: {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    };
    checkout_method: "ONE_TIME_PAYMENT";
    amount: number;
    metadata?: {} | undefined;
    payment_method_id?: undefined;
    customer_id?: string | undefined;
    basket?: {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }[] | undefined;
}>, z.ZodObject<{
    reference_id: z.ZodString;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    amount: z.ZodNumber;
    checkout_method: z.ZodLiteral<"TOKENIZED_PAYMENT">;
    channel_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"ID_OVO">, z.ZodLiteral<"ID_DANA">, z.ZodLiteral<"ID_LINKAJA">, z.ZodLiteral<"ID_SHOPEEPAY">, z.ZodLiteral<"ID_ASTRAPAY">, z.ZodLiteral<"ID_JENIUSPAY">, z.ZodLiteral<"ID_SAKUKU">, z.ZodLiteral<"PH_PAYMAYA">, z.ZodLiteral<"PH_GCASH">, z.ZodLiteral<"PH_GRABPAY">, z.ZodLiteral<"PH_SHOPEEPAY">, z.ZodLiteral<"VN_APPOTA">, z.ZodLiteral<"VN_MOMO">, z.ZodLiteral<"VN_SHOPEEPAY">, z.ZodLiteral<"VN_VNPTWALLET">, z.ZodLiteral<"VN_VIETTELPAY">, z.ZodLiteral<"VN_ZALOPAY">, z.ZodLiteral<"TH_WECHATPAY">, z.ZodLiteral<"TH_LINEPAY">, z.ZodLiteral<"TH_TRUEMONEY">, z.ZodLiteral<"TH_SHOPEEPAY">, z.ZodLiteral<"MY_TOUCHNGO">, z.ZodLiteral<"MY_SHOPEEPAY">, z.ZodLiteral<"MY_GRABPAY">]>>;
    channel_properties: z.ZodObject<{
        cashtag: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        success_redirect_url: z.ZodOptional<z.ZodString>;
        failure_redirect_url: z.ZodOptional<z.ZodString>;
        cancel_redirect_url: z.ZodOptional<z.ZodString>;
        redeem_points: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"REDEEM_ALL">, z.ZodLiteral<"REDEEM_NONE">]>>>;
    }, "strip", z.ZodTypeAny, {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    }, {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    }>;
    payment_method_id: z.ZodString;
    customer_id: z.ZodOptional<z.ZodString>;
    basket: z.ZodOptional<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        name: z.ZodString;
        category: z.ZodString;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        type: z.ZodUnion<[z.ZodLiteral<"PRODUCT">, z.ZodLiteral<"SERVICE">]>;
        url: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        subcategory: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }, {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    reference_id: string;
    channel_properties: {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    };
    checkout_method: "TOKENIZED_PAYMENT";
    amount: number;
    payment_method_id: string;
    metadata?: {} | undefined;
    channel_code?: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY" | undefined;
    customer_id?: string | undefined;
    basket?: {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }[] | undefined;
}, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    reference_id: string;
    channel_properties: {
        mobile_number?: string | undefined;
        cashtag?: string | undefined;
        success_redirect_url?: string | undefined;
        failure_redirect_url?: string | undefined;
        cancel_redirect_url?: string | undefined;
        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
    };
    checkout_method: "TOKENIZED_PAYMENT";
    amount: number;
    payment_method_id: string;
    metadata?: {} | undefined;
    channel_code?: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY" | undefined;
    customer_id?: string | undefined;
    basket?: {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }[] | undefined;
}>]>;
type EWalletChargeParams = z.infer<typeof EWalletChargeSchema>;
declare const EWalletChargeResourceSchema: z.ZodObject<{
    id: z.ZodString;
    business_id: z.ZodString;
    reference_id: z.ZodString;
    status: z.ZodUnion<[z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"VOIDED">, z.ZodLiteral<"REFUNDED">]>;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    charge_amount: z.ZodNumber;
    capture_amount: z.ZodOptional<z.ZodNumber>;
    refunded_amount: z.ZodNullable<z.ZodNumber>;
    checkout_method: z.ZodUnion<[z.ZodLiteral<"ONE_TIME_PAYMENT">, z.ZodLiteral<"TOKENIZED_PAYMENT">]>;
    channel_code: z.ZodUnion<[z.ZodLiteral<"ID_OVO">, z.ZodLiteral<"ID_DANA">, z.ZodLiteral<"ID_LINKAJA">, z.ZodLiteral<"ID_SHOPEEPAY">, z.ZodLiteral<"ID_ASTRAPAY">, z.ZodLiteral<"ID_JENIUSPAY">, z.ZodLiteral<"ID_SAKUKU">, z.ZodLiteral<"PH_PAYMAYA">, z.ZodLiteral<"PH_GCASH">, z.ZodLiteral<"PH_GRABPAY">, z.ZodLiteral<"PH_SHOPEEPAY">, z.ZodLiteral<"VN_APPOTA">, z.ZodLiteral<"VN_MOMO">, z.ZodLiteral<"VN_SHOPEEPAY">, z.ZodLiteral<"VN_VNPTWALLET">, z.ZodLiteral<"VN_VIETTELPAY">, z.ZodLiteral<"VN_ZALOPAY">, z.ZodLiteral<"TH_WECHATPAY">, z.ZodLiteral<"TH_LINEPAY">, z.ZodLiteral<"TH_TRUEMONEY">, z.ZodLiteral<"TH_SHOPEEPAY">, z.ZodLiteral<"MY_TOUCHNGO">, z.ZodLiteral<"MY_SHOPEEPAY">, z.ZodLiteral<"MY_GRABPAY">]>;
    channel_properties: z.ZodDiscriminatedUnion<"channel_code", [z.ZodObject<{
        channel_code: z.ZodLiteral<"ID_OVO">;
        channel_properties: z.ZodObject<{
            mobile_number: z.ZodEffects<z.ZodString, string, string>;
        }, "strip", z.ZodTypeAny, {
            mobile_number: string;
        }, {
            mobile_number: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        channel_code: "ID_OVO";
        channel_properties: {
            mobile_number: string;
        };
    }, {
        channel_code: "ID_OVO";
        channel_properties: {
            mobile_number: string;
        };
    }>, z.ZodObject<{
        channel_code: z.ZodLiteral<"ID_JENIUSPAY">;
        properties: z.ZodDiscriminatedUnion<"method", [z.ZodObject<{
            method: z.ZodLiteral<"ONE_TIME_PAYMENT">;
            properties: z.ZodObject<{
                cashtag: z.ZodEffects<z.ZodString, string, string>;
            }, "strip", z.ZodTypeAny, {
                cashtag: string;
            }, {
                cashtag: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "ONE_TIME_PAYMENT";
            properties: {
                cashtag: string;
            };
        }, {
            method: "ONE_TIME_PAYMENT";
            properties: {
                cashtag: string;
            };
        }>, z.ZodObject<{
            method: z.ZodLiteral<"TOKENIZED_PAYMENT">;
            properties: z.ZodObject<{
                success_redirect_url: z.ZodString;
                failure_redirect_url: z.ZodString;
                redeem_points: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"REDEEM_ALL">, z.ZodLiteral<"REDEEM_NONE">]>>>;
            }, "strip", z.ZodTypeAny, {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            }, {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        }, {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        }>]>;
    }, "strip", z.ZodTypeAny, {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                cashtag: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_JENIUSPAY";
    }, {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                cashtag: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_JENIUSPAY";
    }>, z.ZodObject<{
        channel_code: z.ZodUnion<[z.ZodLiteral<"ID_DANA">, z.ZodLiteral<"ID_LINKAJA">, z.ZodLiteral<"ID_SHOPEEPAY">, z.ZodLiteral<"PH_SHOPEEPAY">, z.ZodLiteral<"TH_SHOPEEPAY">, z.ZodLiteral<"TH_WECHATPAY">, z.ZodLiteral<"TH_TOUCHNGO">, z.ZodLiteral<"TH_TRUEMONEY">, z.ZodLiteral<"ID_SAKUKU">]>;
        properties: z.ZodDiscriminatedUnion<"method", [z.ZodObject<{
            method: z.ZodLiteral<"ONE_TIME_PAYMENT">;
            properties: z.ZodObject<{
                success_redirect_url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                success_redirect_url: string;
            }, {
                success_redirect_url: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "ONE_TIME_PAYMENT";
            properties: {
                success_redirect_url: string;
            };
        }, {
            method: "ONE_TIME_PAYMENT";
            properties: {
                success_redirect_url: string;
            };
        }>, z.ZodObject<{
            method: z.ZodLiteral<"TOKENIZED_PAYMENT">;
            properties: z.ZodObject<{
                success_redirect_url: z.ZodString;
                failure_redirect_url: z.ZodString;
                redeem_points: z.ZodOptional<z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"REDEEM_ALL">, z.ZodLiteral<"REDEEM_NONE">]>>>;
            }, "strip", z.ZodTypeAny, {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            }, {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        }, {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        }>]>;
    }, "strip", z.ZodTypeAny, {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                success_redirect_url: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_SAKUKU" | "PH_SHOPEEPAY" | "TH_WECHATPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "TH_TOUCHNGO";
    }, {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                success_redirect_url: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_SAKUKU" | "PH_SHOPEEPAY" | "TH_WECHATPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "TH_TOUCHNGO";
    }>, z.ZodObject<{
        channel_code: z.ZodLiteral<"PH_PAYMAYA">;
        properties: z.ZodObject<{
            success_redirect_url: z.ZodString;
            failure_redirect_url: z.ZodString;
            cancel_redirect_url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            success_redirect_url: string;
            failure_redirect_url: string;
            cancel_redirect_url: string;
        }, {
            success_redirect_url: string;
            failure_redirect_url: string;
            cancel_redirect_url: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        properties: {
            success_redirect_url: string;
            failure_redirect_url: string;
            cancel_redirect_url: string;
        };
        channel_code: "PH_PAYMAYA";
    }, {
        properties: {
            success_redirect_url: string;
            failure_redirect_url: string;
            cancel_redirect_url: string;
        };
        channel_code: "PH_PAYMAYA";
    }>]>;
    actions: z.ZodOptional<z.ZodObject<{
        desktop_web_checkout_url: z.ZodOptional<z.ZodString>;
        mobile_web_checkout_url: z.ZodOptional<z.ZodString>;
        mobile_deeplink_checkout_url: z.ZodOptional<z.ZodString>;
        qr_checkout_string: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        desktop_web_checkout_url?: string | undefined;
        mobile_web_checkout_url?: string | undefined;
        mobile_deeplink_checkout_url?: string | undefined;
        qr_checkout_string?: string | undefined;
    }, {
        desktop_web_checkout_url?: string | undefined;
        mobile_web_checkout_url?: string | undefined;
        mobile_deeplink_checkout_url?: string | undefined;
        qr_checkout_string?: string | undefined;
    }>>;
    is_redirect_required: z.ZodBoolean;
    callback_url: z.ZodString;
    created: z.ZodString;
    updated: z.ZodString;
    void_status: z.ZodNullable<z.ZodString>;
    voided_at: z.ZodNullable<z.ZodString>;
    capture_now: z.ZodBoolean;
    customer_id: z.ZodNullable<z.ZodString>;
    payment_method_id: z.ZodNullable<z.ZodString>;
    failure_code: z.ZodNullable<z.ZodString>;
    basket: z.ZodOptional<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        name: z.ZodString;
        category: z.ZodString;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
        price: z.ZodNumber;
        quantity: z.ZodNumber;
        type: z.ZodUnion<[z.ZodLiteral<"PRODUCT">, z.ZodLiteral<"SERVICE">]>;
        url: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        subcategory: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }, {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
    status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REFUNDED";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
    channel_properties: {
        channel_code: "ID_OVO";
        channel_properties: {
            mobile_number: string;
        };
    } | {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                cashtag: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_JENIUSPAY";
    } | {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                success_redirect_url: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_SAKUKU" | "PH_SHOPEEPAY" | "TH_WECHATPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "TH_TOUCHNGO";
    } | {
        properties: {
            success_redirect_url: string;
            failure_redirect_url: string;
            cancel_redirect_url: string;
        };
        channel_code: "PH_PAYMAYA";
    };
    checkout_method: "ONE_TIME_PAYMENT" | "TOKENIZED_PAYMENT";
    payment_method_id: string | null;
    customer_id: string | null;
    business_id: string;
    charge_amount: number;
    refunded_amount: number | null;
    is_redirect_required: boolean;
    callback_url: string;
    void_status: string | null;
    voided_at: string | null;
    capture_now: boolean;
    failure_code: string | null;
    metadata?: {} | undefined;
    basket?: {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }[] | undefined;
    capture_amount?: number | undefined;
    actions?: {
        desktop_web_checkout_url?: string | undefined;
        mobile_web_checkout_url?: string | undefined;
        mobile_deeplink_checkout_url?: string | undefined;
        qr_checkout_string?: string | undefined;
    } | undefined;
}, {
    status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REFUNDED";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    reference_id: string;
    id: string;
    created: string;
    updated: string;
    channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
    channel_properties: {
        channel_code: "ID_OVO";
        channel_properties: {
            mobile_number: string;
        };
    } | {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                cashtag: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_JENIUSPAY";
    } | {
        properties: {
            method: "ONE_TIME_PAYMENT";
            properties: {
                success_redirect_url: string;
            };
        } | {
            method: "TOKENIZED_PAYMENT";
            properties: {
                success_redirect_url: string;
                failure_redirect_url: string;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
        };
        channel_code: "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_SAKUKU" | "PH_SHOPEEPAY" | "TH_WECHATPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "TH_TOUCHNGO";
    } | {
        properties: {
            success_redirect_url: string;
            failure_redirect_url: string;
            cancel_redirect_url: string;
        };
        channel_code: "PH_PAYMAYA";
    };
    checkout_method: "ONE_TIME_PAYMENT" | "TOKENIZED_PAYMENT";
    payment_method_id: string | null;
    customer_id: string | null;
    business_id: string;
    charge_amount: number;
    refunded_amount: number | null;
    is_redirect_required: boolean;
    callback_url: string;
    void_status: string | null;
    voided_at: string | null;
    capture_now: boolean;
    failure_code: string | null;
    metadata?: {} | undefined;
    basket?: {
        type: "PRODUCT" | "SERVICE";
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        reference_id: string;
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        description?: string | undefined;
        metadata?: {} | undefined;
        subcategory?: string | undefined;
    }[] | undefined;
    capture_amount?: number | undefined;
    actions?: {
        desktop_web_checkout_url?: string | undefined;
        mobile_web_checkout_url?: string | undefined;
        mobile_deeplink_checkout_url?: string | undefined;
        qr_checkout_string?: string | undefined;
    } | undefined;
}>;
type EWalletChargeResource = z.infer<typeof EWalletChargeResourceSchema>;
declare const GetEWalletChargeSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type GetEWalletChargeParams = z.infer<typeof GetEWalletChargeSchema>;

declare const CreatePaymentMethodSchema: z.ZodObject<{
    type: z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>;
    country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
    reusability: z.ZodUnion<[z.ZodLiteral<"ONE_TIME_USE">, z.ZodLiteral<"MULTIPLE_USE">]>;
    description: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    card: z.ZodOptional<z.ZodObject<{
        currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
        channel_properties: z.ZodOptional<z.ZodObject<{
            success_return_url: z.ZodOptional<z.ZodString>;
            failure_return_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        }, {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    }, {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    }>>;
    bank_account: z.ZodOptional<z.ZodObject<{
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
        channel_properties: z.ZodOptional<z.ZodObject<{
            account_mobile_number: z.ZodOptional<z.ZodString>;
            card_last_four: z.ZodOptional<z.ZodString>;
            card_expiry_month: z.ZodOptional<z.ZodString>;
            card_expiry_year: z.ZodOptional<z.ZodString>;
            account_email: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        }, {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        channel_properties?: {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        } | undefined;
    }, {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        channel_properties?: {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        } | undefined;
    }>>;
    ewallet: z.ZodOptional<z.ZodObject<{
        channel_code: z.ZodString;
        channel_properties: z.ZodOptional<z.ZodObject<{
            success_return_url: z.ZodOptional<z.ZodString>;
            failure_return_url: z.ZodOptional<z.ZodString>;
            cancel_return_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
            cancel_return_url?: string | undefined;
        }, {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
            cancel_return_url?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        channel_code: string;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
            cancel_return_url?: string | undefined;
        } | undefined;
    }, {
        channel_code: string;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
            cancel_return_url?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
    reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
    card?: {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    } | undefined;
    bank_account?: {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        channel_properties?: {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        } | undefined;
    } | undefined;
    ewallet?: {
        channel_code: string;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
            cancel_return_url?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
    reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
    card?: {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    } | undefined;
    bank_account?: {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        channel_properties?: {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        } | undefined;
    } | undefined;
    ewallet?: {
        channel_code: string;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
            cancel_return_url?: string | undefined;
        } | undefined;
    } | undefined;
}>;
type CreatePaymentMethod = z.infer<typeof CreatePaymentMethodSchema>;
declare const UpdatePaymentMethodSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"ACTIVE">, z.ZodLiteral<"INACTIVE">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"EXPIRED">, z.ZodLiteral<"FAILED">]>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status?: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
}, {
    status?: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
}>;
type UpdatePaymentMethod = z.infer<typeof UpdatePaymentMethodSchema>;
declare const PaymentMethodResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>;
    country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
    business_id: z.ZodString;
    customer_id: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodUnion<[z.ZodLiteral<"ACTIVE">, z.ZodLiteral<"INACTIVE">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"EXPIRED">, z.ZodLiteral<"FAILED">]>;
    reusability: z.ZodUnion<[z.ZodLiteral<"ONE_TIME_USE">, z.ZodLiteral<"MULTIPLE_USE">]>;
    actions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        action: z.ZodString;
        url: z.ZodOptional<z.ZodString>;
        url_type: z.ZodOptional<z.ZodString>;
        method: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        action: string;
        url?: string | undefined;
        method?: string | undefined;
        url_type?: string | undefined;
    }, {
        action: string;
        url?: string | undefined;
        method?: string | undefined;
        url_type?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    billing_information: z.ZodOptional<z.ZodObject<{
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        street_line1: z.ZodOptional<z.ZodString>;
        street_line2: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        province_state: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    }, {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    }>>;
    failure_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created: z.ZodString;
    updated: z.ZodString;
    card: z.ZodOptional<z.ZodObject<{
        card_last_four: z.ZodString;
        card_expiry_month: z.ZodString;
        card_expiry_year: z.ZodString;
        network: z.ZodString;
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        issuer: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">]>>;
        currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
    }, "strip", z.ZodTypeAny, {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        issuer?: string | undefined;
    }, {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        issuer?: string | undefined;
    }>>;
    bank_account: z.ZodOptional<z.ZodObject<{
        account_number: z.ZodString;
        account_holder_name: z.ZodString;
        bank_code: z.ZodString;
        account_type: z.ZodOptional<z.ZodString>;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        bank_code: string;
        account_type?: string | undefined;
    }, {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        bank_code: string;
        account_type?: string | undefined;
    }>>;
    ewallet: z.ZodOptional<z.ZodObject<{
        account_details: z.ZodString;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    }, "strip", z.ZodTypeAny, {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    }, {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
    type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
    id: string;
    created: string;
    updated: string;
    business_id: string;
    reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
    customer_id?: string | undefined;
    actions?: {
        action: string;
        url?: string | undefined;
        method?: string | undefined;
        url_type?: string | undefined;
    }[] | undefined;
    failure_code?: string | null | undefined;
    card?: {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        issuer?: string | undefined;
    } | undefined;
    bank_account?: {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        bank_code: string;
        account_type?: string | undefined;
    } | undefined;
    ewallet?: {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    } | undefined;
    billing_information?: {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    } | undefined;
}, {
    status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
    type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
    id: string;
    created: string;
    updated: string;
    business_id: string;
    reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
    customer_id?: string | undefined;
    actions?: {
        action: string;
        url?: string | undefined;
        method?: string | undefined;
        url_type?: string | undefined;
    }[] | undefined;
    failure_code?: string | null | undefined;
    card?: {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
        issuer?: string | undefined;
    } | undefined;
    bank_account?: {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
        bank_code: string;
        account_type?: string | undefined;
    } | undefined;
    ewallet?: {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    } | undefined;
    billing_information?: {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    } | undefined;
}>;
type PaymentMethodResource = z.infer<typeof PaymentMethodResourceSchema>;
declare const GetPaymentMethodSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type GetPaymentMethod = z.infer<typeof GetPaymentMethodSchema>;
declare const ListPaymentMethodsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    type: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"ACTIVE">, z.ZodLiteral<"INACTIVE">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"EXPIRED">, z.ZodLiteral<"FAILED">]>, "many">>;
    reusability: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"ONE_TIME_USE">, z.ZodLiteral<"MULTIPLE_USE">]>>;
    customer_id: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    status?: ("PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED")[] | undefined;
    type?: ("BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT")[] | undefined;
    reference_id?: string | undefined;
    id?: string[] | undefined;
    customer_id?: string | undefined;
    reusability?: "ONE_TIME_USE" | "MULTIPLE_USE" | undefined;
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
}, {
    status?: ("PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED")[] | undefined;
    type?: ("BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT")[] | undefined;
    reference_id?: string | undefined;
    id?: string[] | undefined;
    customer_id?: string | undefined;
    reusability?: "ONE_TIME_USE" | "MULTIPLE_USE" | undefined;
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
}>;
type ListPaymentMethods = z.infer<typeof ListPaymentMethodsSchema>;

declare const CreateInvoiceSchema: z.ZodObject<{
    external_id: z.ZodString;
    payer_email: z.ZodString;
    description: z.ZodString;
    amount: z.ZodNumber;
    invoice_duration: z.ZodOptional<z.ZodNumber>;
    callback_virtual_account_id: z.ZodOptional<z.ZodString>;
    should_exclude_credit_card: z.ZodOptional<z.ZodBoolean>;
    should_send_email: z.ZodOptional<z.ZodBoolean>;
    customer_name: z.ZodOptional<z.ZodString>;
    customer_email: z.ZodOptional<z.ZodString>;
    customer_phone: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        customer_name: z.ZodOptional<z.ZodString>;
        customer_email: z.ZodOptional<z.ZodString>;
        customer_phone: z.ZodOptional<z.ZodString>;
        billing_address: z.ZodOptional<z.ZodObject<{
            first_name: z.ZodOptional<z.ZodString>;
            last_name: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }>>;
        shipping_address: z.ZodOptional<z.ZodObject<{
            first_name: z.ZodOptional<z.ZodString>;
            last_name: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    }, {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    }>>;
    customer_notification_preference: z.ZodOptional<z.ZodObject<{
        invoice_created: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_reminder: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_paid: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_expired: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    }, {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    }>>;
    success_redirect_url: z.ZodOptional<z.ZodString>;
    failure_redirect_url: z.ZodOptional<z.ZodString>;
    payment_methods: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    mid_label: z.ZodOptional<z.ZodString>;
    should_authenticate_credit_card: z.ZodOptional<z.ZodBoolean>;
    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }>, "many">>;
    fixed_va: z.ZodOptional<z.ZodBoolean>;
    reminder_time_unit: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"days">, z.ZodLiteral<"hours">, z.ZodLiteral<"minutes">]>>;
    reminder_time: z.ZodOptional<z.ZodNumber>;
    locale: z.ZodOptional<z.ZodString>;
    fees: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: string;
    }, {
        value: number;
        type: string;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    description: string;
    amount: number;
    external_id: string;
    payer_email: string;
    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
    metadata?: Record<string, unknown> | undefined;
    success_redirect_url?: string | undefined;
    failure_redirect_url?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    customer_phone?: string | undefined;
    invoice_duration?: number | undefined;
    callback_virtual_account_id?: string | undefined;
    should_exclude_credit_card?: boolean | undefined;
    should_send_email?: boolean | undefined;
    customer?: {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    } | undefined;
    customer_notification_preference?: {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    } | undefined;
    payment_methods?: string[] | undefined;
    mid_label?: string | undefined;
    should_authenticate_credit_card?: boolean | undefined;
    items?: {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }[] | undefined;
    fixed_va?: boolean | undefined;
    reminder_time_unit?: "days" | "hours" | "minutes" | undefined;
    reminder_time?: number | undefined;
    locale?: string | undefined;
    fees?: {
        value: number;
        type: string;
    }[] | undefined;
}, {
    description: string;
    amount: number;
    external_id: string;
    payer_email: string;
    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
    metadata?: Record<string, unknown> | undefined;
    success_redirect_url?: string | undefined;
    failure_redirect_url?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    customer_phone?: string | undefined;
    invoice_duration?: number | undefined;
    callback_virtual_account_id?: string | undefined;
    should_exclude_credit_card?: boolean | undefined;
    should_send_email?: boolean | undefined;
    customer?: {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    } | undefined;
    customer_notification_preference?: {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    } | undefined;
    payment_methods?: string[] | undefined;
    mid_label?: string | undefined;
    should_authenticate_credit_card?: boolean | undefined;
    items?: {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }[] | undefined;
    fixed_va?: boolean | undefined;
    reminder_time_unit?: "days" | "hours" | "minutes" | undefined;
    reminder_time?: number | undefined;
    locale?: string | undefined;
    fees?: {
        value: number;
        type: string;
    }[] | undefined;
}>;
type CreateInvoice = z.infer<typeof CreateInvoiceSchema>;
declare const UpdateInvoiceSchema: z.ZodObject<{
    should_send_email: z.ZodOptional<z.ZodBoolean>;
    customer_name: z.ZodOptional<z.ZodString>;
    customer_email: z.ZodOptional<z.ZodString>;
    customer_phone: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        customer_name: z.ZodOptional<z.ZodString>;
        customer_email: z.ZodOptional<z.ZodString>;
        customer_phone: z.ZodOptional<z.ZodString>;
        billing_address: z.ZodOptional<z.ZodObject<{
            first_name: z.ZodOptional<z.ZodString>;
            last_name: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }>>;
        shipping_address: z.ZodOptional<z.ZodObject<{
            first_name: z.ZodOptional<z.ZodString>;
            last_name: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    }, {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    }>>;
    customer_notification_preference: z.ZodOptional<z.ZodObject<{
        invoice_created: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_reminder: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_paid: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_expired: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    }, {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    }>>;
    success_redirect_url: z.ZodOptional<z.ZodString>;
    failure_redirect_url: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    metadata?: Record<string, unknown> | undefined;
    success_redirect_url?: string | undefined;
    failure_redirect_url?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    customer_phone?: string | undefined;
    should_send_email?: boolean | undefined;
    customer?: {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    } | undefined;
    customer_notification_preference?: {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    } | undefined;
    items?: {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }[] | undefined;
}, {
    metadata?: Record<string, unknown> | undefined;
    success_redirect_url?: string | undefined;
    failure_redirect_url?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    customer_phone?: string | undefined;
    should_send_email?: boolean | undefined;
    customer?: {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    } | undefined;
    customer_notification_preference?: {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    } | undefined;
    items?: {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }[] | undefined;
}>;
type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>;
declare const InvoiceResourceSchema: z.ZodObject<{
    id: z.ZodString;
    external_id: z.ZodString;
    user_id: z.ZodString;
    status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"PAID">, z.ZodLiteral<"SETTLED">, z.ZodLiteral<"EXPIRED">]>;
    merchant_name: z.ZodString;
    merchant_profile_picture_url: z.ZodString;
    amount: z.ZodNumber;
    payer_email: z.ZodString;
    description: z.ZodString;
    expiry_date: z.ZodString;
    invoice_url: z.ZodString;
    should_exclude_credit_card: z.ZodBoolean;
    should_send_email: z.ZodBoolean;
    created: z.ZodString;
    updated: z.ZodString;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    paid_amount: z.ZodOptional<z.ZodNumber>;
    credit_card_charge_id: z.ZodOptional<z.ZodString>;
    payment_method: z.ZodOptional<z.ZodString>;
    payment_channel: z.ZodOptional<z.ZodString>;
    payment_destination: z.ZodOptional<z.ZodString>;
    payment_id: z.ZodOptional<z.ZodString>;
    paid_at: z.ZodOptional<z.ZodString>;
    bank_code: z.ZodOptional<z.ZodString>;
    ewallet_type: z.ZodOptional<z.ZodString>;
    on_demand_link: z.ZodOptional<z.ZodString>;
    recurring_payment_id: z.ZodOptional<z.ZodString>;
    customer_name: z.ZodOptional<z.ZodString>;
    customer_email: z.ZodOptional<z.ZodString>;
    customer_phone: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        customer_name: z.ZodOptional<z.ZodString>;
        customer_email: z.ZodOptional<z.ZodString>;
        customer_phone: z.ZodOptional<z.ZodString>;
        billing_address: z.ZodOptional<z.ZodObject<{
            first_name: z.ZodOptional<z.ZodString>;
            last_name: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }>>;
        shipping_address: z.ZodOptional<z.ZodObject<{
            first_name: z.ZodOptional<z.ZodString>;
            last_name: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }, {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    }, {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    }>>;
    customer_notification_preference: z.ZodOptional<z.ZodObject<{
        invoice_created: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_reminder: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_paid: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
        invoice_expired: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"whatsapp">, z.ZodLiteral<"sms">, z.ZodLiteral<"email">]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    }, {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    }>>;
    success_redirect_url: z.ZodOptional<z.ZodString>;
    failure_redirect_url: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }>, "many">>;
    fees: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: string;
    }, {
        value: number;
        type: string;
    }>, "many">>;
    available_banks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        bank_code: z.ZodString;
        collection_type: z.ZodString;
        bank_branch: z.ZodString;
        transfer_amount: z.ZodNumber;
        bank_account_number: z.ZodString;
        account_holder_name: z.ZodString;
        identity_amount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        account_holder_name: string;
        bank_code: string;
        collection_type: string;
        bank_branch: string;
        transfer_amount: number;
        bank_account_number: string;
        identity_amount?: number | undefined;
    }, {
        account_holder_name: string;
        bank_code: string;
        collection_type: string;
        bank_branch: string;
        transfer_amount: number;
        bank_account_number: string;
        identity_amount?: number | undefined;
    }>, "many">>;
    available_ewallets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ewallet_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        ewallet_type: string;
    }, {
        ewallet_type: string;
    }>, "many">>;
    available_retail_outlets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        retail_outlet_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        retail_outlet_name: string;
    }, {
        retail_outlet_name: string;
    }>, "many">>;
    available_paylaters: z.ZodOptional<z.ZodArray<z.ZodObject<{
        paylater_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paylater_type: string;
    }, {
        paylater_type: string;
    }>, "many">>;
    available_qr_codes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        qr_code_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        qr_code_type: string;
    }, {
        qr_code_type: string;
    }>, "many">>;
    available_direct_debits: z.ZodOptional<z.ZodArray<z.ZodObject<{
        direct_debit_type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        direct_debit_type: string;
    }, {
        direct_debit_type: string;
    }>, "many">>;
    should_authenticate_credit_card: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    description: string;
    id: string;
    created: string;
    updated: string;
    amount: number;
    external_id: string;
    payer_email: string;
    should_exclude_credit_card: boolean;
    should_send_email: boolean;
    user_id: string;
    merchant_name: string;
    merchant_profile_picture_url: string;
    expiry_date: string;
    invoice_url: string;
    metadata?: Record<string, unknown> | undefined;
    success_redirect_url?: string | undefined;
    failure_redirect_url?: string | undefined;
    bank_code?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    customer_phone?: string | undefined;
    ewallet_type?: string | undefined;
    customer?: {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    } | undefined;
    customer_notification_preference?: {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    } | undefined;
    should_authenticate_credit_card?: boolean | undefined;
    items?: {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }[] | undefined;
    fees?: {
        value: number;
        type: string;
    }[] | undefined;
    paid_amount?: number | undefined;
    credit_card_charge_id?: string | undefined;
    payment_method?: string | undefined;
    payment_channel?: string | undefined;
    payment_destination?: string | undefined;
    payment_id?: string | undefined;
    paid_at?: string | undefined;
    on_demand_link?: string | undefined;
    recurring_payment_id?: string | undefined;
    available_banks?: {
        account_holder_name: string;
        bank_code: string;
        collection_type: string;
        bank_branch: string;
        transfer_amount: number;
        bank_account_number: string;
        identity_amount?: number | undefined;
    }[] | undefined;
    available_ewallets?: {
        ewallet_type: string;
    }[] | undefined;
    available_retail_outlets?: {
        retail_outlet_name: string;
    }[] | undefined;
    available_paylaters?: {
        paylater_type: string;
    }[] | undefined;
    available_qr_codes?: {
        qr_code_type: string;
    }[] | undefined;
    available_direct_debits?: {
        direct_debit_type: string;
    }[] | undefined;
}, {
    status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
    description: string;
    id: string;
    created: string;
    updated: string;
    amount: number;
    external_id: string;
    payer_email: string;
    should_exclude_credit_card: boolean;
    should_send_email: boolean;
    user_id: string;
    merchant_name: string;
    merchant_profile_picture_url: string;
    expiry_date: string;
    invoice_url: string;
    metadata?: Record<string, unknown> | undefined;
    success_redirect_url?: string | undefined;
    failure_redirect_url?: string | undefined;
    bank_code?: string | undefined;
    customer_name?: string | undefined;
    customer_email?: string | undefined;
    customer_phone?: string | undefined;
    ewallet_type?: string | undefined;
    customer?: {
        customer_name?: string | undefined;
        customer_email?: string | undefined;
        customer_phone?: string | undefined;
        billing_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
        shipping_address?: {
            city?: string | undefined;
            postal_code?: string | undefined;
            first_name?: string | undefined;
            last_name?: string | undefined;
            address?: string | undefined;
            phone?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        } | undefined;
    } | undefined;
    customer_notification_preference?: {
        invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
        invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
    } | undefined;
    should_authenticate_credit_card?: boolean | undefined;
    items?: {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
    }[] | undefined;
    fees?: {
        value: number;
        type: string;
    }[] | undefined;
    paid_amount?: number | undefined;
    credit_card_charge_id?: string | undefined;
    payment_method?: string | undefined;
    payment_channel?: string | undefined;
    payment_destination?: string | undefined;
    payment_id?: string | undefined;
    paid_at?: string | undefined;
    on_demand_link?: string | undefined;
    recurring_payment_id?: string | undefined;
    available_banks?: {
        account_holder_name: string;
        bank_code: string;
        collection_type: string;
        bank_branch: string;
        transfer_amount: number;
        bank_account_number: string;
        identity_amount?: number | undefined;
    }[] | undefined;
    available_ewallets?: {
        ewallet_type: string;
    }[] | undefined;
    available_retail_outlets?: {
        retail_outlet_name: string;
    }[] | undefined;
    available_paylaters?: {
        paylater_type: string;
    }[] | undefined;
    available_qr_codes?: {
        qr_code_type: string;
    }[] | undefined;
    available_direct_debits?: {
        direct_debit_type: string;
    }[] | undefined;
}>;
type InvoiceResource = z.infer<typeof InvoiceResourceSchema>;
declare const GetInvoiceSchema: z.ZodObject<{
    invoice_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoice_id: string;
}, {
    invoice_id: string;
}>;
type GetInvoice = z.infer<typeof GetInvoiceSchema>;
declare const ListInvoicesSchema: z.ZodObject<{
    statuses: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"PAID">, z.ZodLiteral<"SETTLED">, z.ZodLiteral<"EXPIRED">]>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    paid_after: z.ZodOptional<z.ZodString>;
    paid_before: z.ZodOptional<z.ZodString>;
    expired_after: z.ZodOptional<z.ZodString>;
    expired_before: z.ZodOptional<z.ZodString>;
    last_invoice: z.ZodOptional<z.ZodString>;
    client_types: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    payment_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    on_demand_link: z.ZodOptional<z.ZodString>;
    recurring_payment_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    limit?: number | undefined;
    on_demand_link?: string | undefined;
    recurring_payment_id?: string | undefined;
    statuses?: ("PENDING" | "EXPIRED" | "PAID" | "SETTLED")[] | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    paid_after?: string | undefined;
    paid_before?: string | undefined;
    expired_after?: string | undefined;
    expired_before?: string | undefined;
    last_invoice?: string | undefined;
    client_types?: string[] | undefined;
    payment_channels?: string[] | undefined;
}, {
    limit?: number | undefined;
    on_demand_link?: string | undefined;
    recurring_payment_id?: string | undefined;
    statuses?: ("PENDING" | "EXPIRED" | "PAID" | "SETTLED")[] | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    paid_after?: string | undefined;
    paid_before?: string | undefined;
    expired_after?: string | undefined;
    expired_before?: string | undefined;
    last_invoice?: string | undefined;
    client_types?: string[] | undefined;
    payment_channels?: string[] | undefined;
}>;
type ListInvoices = z.infer<typeof ListInvoicesSchema>;
declare const ExpireInvoiceSchema: z.ZodObject<{
    invoice_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoice_id: string;
}, {
    invoice_id: string;
}>;
type ExpireInvoice = z.infer<typeof ExpireInvoiceSchema>;

interface XenditOptions {
    /**
     * Rate limiting configuration
     */
    rateLimit?: RateLimitConfig;
}
declare const Xendit: (key: string, options?: XenditOptions) => {
    customer: {
        create: (data: {
            type: "INDIVIDUAL";
            individual_detail: {
                given_names: string;
                surname?: string | undefined;
                nationality?: string | undefined;
                place_of_birth?: string | undefined;
                date_of_birth?: string | undefined;
                gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
                employment?: {
                    employer_name: string;
                    nature_of_business: string;
                    role_description: string;
                } | undefined;
            };
            reference_id: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            business_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        } | {
            type: "BUSINESS";
            business_detail: {
                business_name: string;
                business_type: string;
                trading_name?: string | undefined;
            };
            reference_id: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            individual_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        }) => Promise<{
            type: "INDIVIDUAL";
            individual_detail: {
                given_names: string;
                surname?: string | undefined;
                nationality?: string | undefined;
                place_of_birth?: string | undefined;
                date_of_birth?: string | undefined;
                gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
                employment?: {
                    employer_name: string;
                    nature_of_business: string;
                    role_description: string;
                } | undefined;
            };
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            business_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        } | {
            type: "BUSINESS";
            business_detail: {
                business_name: string;
                business_type: string;
                trading_name?: string | undefined;
            };
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            individual_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        }>;
        getById: (data: {
            id: string;
        }) => Promise<{
            type: "INDIVIDUAL";
            individual_detail: {
                given_names: string;
                surname?: string | undefined;
                nationality?: string | undefined;
                place_of_birth?: string | undefined;
                date_of_birth?: string | undefined;
                gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
                employment?: {
                    employer_name: string;
                    nature_of_business: string;
                    role_description: string;
                } | undefined;
            };
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            business_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        } | {
            type: "BUSINESS";
            business_detail: {
                business_name: string;
                business_type: string;
                trading_name?: string | undefined;
            };
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            individual_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        }>;
        getByRefId: (data: {
            reference_id: string;
        }) => Promise<{
            data: ({
                type: "INDIVIDUAL";
                individual_detail: {
                    given_names: string;
                    surname?: string | undefined;
                    nationality?: string | undefined;
                    place_of_birth?: string | undefined;
                    date_of_birth?: string | undefined;
                    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
                    employment?: {
                        employer_name: string;
                        nature_of_business: string;
                        role_description: string;
                    } | undefined;
                };
                reference_id: string;
                id: string;
                created: string;
                updated: string;
                email?: string | undefined;
                mobile_number?: string | undefined;
                phone_number?: string | undefined;
                description?: string | null | undefined;
                business_detail?: undefined;
                hashed_phone_number?: string | null | undefined;
                addresses?: {
                    country: string;
                    street_line1?: string | null | undefined;
                    street_line2?: string | null | undefined;
                    city?: string | null | undefined;
                    province_state?: string | null | undefined;
                    postal_code?: string | null | undefined;
                    category?: string | null | undefined;
                    is_primary?: boolean | null | undefined;
                }[] | undefined;
                identity_accounts?: {
                    type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                    properties: {
                        type: "BANK_ACCOUNT";
                        properties: {
                            account_number: string;
                            account_holder_name: string;
                            swift_code?: string | undefined;
                            account_type?: string | undefined;
                            account_details?: string | undefined;
                            currency?: string | undefined;
                        };
                    } | {
                        type: "EWALLET";
                        properties: {
                            account_number: string;
                            account_holder_name: string;
                            currency?: string | undefined;
                        };
                    } | {
                        type: "CREDIT_CARD";
                        properties: {
                            token_id: string;
                        };
                    } | {
                        type: "OTC";
                        properties: {
                            payment_code: string;
                            expires_at?: string | undefined;
                        };
                    } | {
                        type: "QR_CODE";
                        properties: {
                            qr_string: string;
                        };
                    } | {
                        type: "PAY_LATER";
                        properties: {
                            account_id: string;
                            account_holder_name?: string | undefined;
                            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                        };
                    } | {
                        type: "SOCIAL_MEDIA";
                        properties: {
                            account_id: string;
                            account_handle?: string | undefined;
                        };
                    };
                    country?: string | null | undefined;
                    company?: string | null | undefined;
                    description?: string | null | undefined;
                }[] | undefined;
                kyc_documents?: {
                    type: string;
                    country: string;
                    expires_at: null;
                    sub_type: string;
                    document_name: string;
                    document_number: string;
                    holder_name: string;
                    document_images: string[];
                }[] | undefined;
                date_of_registration?: string | null | undefined;
                domicile_of_registration?: string | null | undefined;
                metadata?: {} | null | undefined;
            } | {
                type: "BUSINESS";
                business_detail: {
                    business_name: string;
                    business_type: string;
                    trading_name?: string | undefined;
                };
                reference_id: string;
                id: string;
                created: string;
                updated: string;
                email?: string | undefined;
                mobile_number?: string | undefined;
                phone_number?: string | undefined;
                description?: string | null | undefined;
                individual_detail?: undefined;
                hashed_phone_number?: string | null | undefined;
                addresses?: {
                    country: string;
                    street_line1?: string | null | undefined;
                    street_line2?: string | null | undefined;
                    city?: string | null | undefined;
                    province_state?: string | null | undefined;
                    postal_code?: string | null | undefined;
                    category?: string | null | undefined;
                    is_primary?: boolean | null | undefined;
                }[] | undefined;
                identity_accounts?: {
                    type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                    properties: {
                        type: "BANK_ACCOUNT";
                        properties: {
                            account_number: string;
                            account_holder_name: string;
                            swift_code?: string | undefined;
                            account_type?: string | undefined;
                            account_details?: string | undefined;
                            currency?: string | undefined;
                        };
                    } | {
                        type: "EWALLET";
                        properties: {
                            account_number: string;
                            account_holder_name: string;
                            currency?: string | undefined;
                        };
                    } | {
                        type: "CREDIT_CARD";
                        properties: {
                            token_id: string;
                        };
                    } | {
                        type: "OTC";
                        properties: {
                            payment_code: string;
                            expires_at?: string | undefined;
                        };
                    } | {
                        type: "QR_CODE";
                        properties: {
                            qr_string: string;
                        };
                    } | {
                        type: "PAY_LATER";
                        properties: {
                            account_id: string;
                            account_holder_name?: string | undefined;
                            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                        };
                    } | {
                        type: "SOCIAL_MEDIA";
                        properties: {
                            account_id: string;
                            account_handle?: string | undefined;
                        };
                    };
                    country?: string | null | undefined;
                    company?: string | null | undefined;
                    description?: string | null | undefined;
                }[] | undefined;
                kyc_documents?: {
                    type: string;
                    country: string;
                    expires_at: null;
                    sub_type: string;
                    document_name: string;
                    document_number: string;
                    holder_name: string;
                    document_images: string[];
                }[] | undefined;
                date_of_registration?: string | null | undefined;
                domicile_of_registration?: string | null | undefined;
                metadata?: {} | null | undefined;
            })[];
            hasMore: boolean;
        }>;
        update: (data: {
            id: string;
            payload: {
                email?: string | undefined;
                mobile_number?: string | undefined;
                phone_number?: string | undefined;
                description?: string | null | undefined;
                individual_detail?: {
                    given_names: string;
                    surname?: string | undefined;
                    nationality?: string | undefined;
                    place_of_birth?: string | undefined;
                    date_of_birth?: string | undefined;
                    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
                    employment?: {
                        employer_name: string;
                        nature_of_business: string;
                        role_description: string;
                    } | undefined;
                } | undefined;
                business_detail?: {
                    business_name: string;
                    business_type: string;
                    trading_name?: string | undefined;
                } | undefined;
                hashed_phone_number?: string | null | undefined;
                addresses?: {
                    country: string;
                    street_line1?: string | null | undefined;
                    street_line2?: string | null | undefined;
                    city?: string | null | undefined;
                    province_state?: string | null | undefined;
                    postal_code?: string | null | undefined;
                    category?: string | null | undefined;
                    is_primary?: boolean | null | undefined;
                }[] | undefined;
                identity_accounts?: {
                    type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                    properties: {
                        type: "BANK_ACCOUNT";
                        properties: {
                            account_number: string;
                            account_holder_name: string;
                            swift_code?: string | undefined;
                            account_type?: string | undefined;
                            account_details?: string | undefined;
                            currency?: string | undefined;
                        };
                    } | {
                        type: "EWALLET";
                        properties: {
                            account_number: string;
                            account_holder_name: string;
                            currency?: string | undefined;
                        };
                    } | {
                        type: "CREDIT_CARD";
                        properties: {
                            token_id: string;
                        };
                    } | {
                        type: "OTC";
                        properties: {
                            payment_code: string;
                            expires_at?: string | undefined;
                        };
                    } | {
                        type: "QR_CODE";
                        properties: {
                            qr_string: string;
                        };
                    } | {
                        type: "PAY_LATER";
                        properties: {
                            account_id: string;
                            account_holder_name?: string | undefined;
                            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                        };
                    } | {
                        type: "SOCIAL_MEDIA";
                        properties: {
                            account_id: string;
                            account_handle?: string | undefined;
                        };
                    };
                    country?: string | null | undefined;
                    company?: string | null | undefined;
                    description?: string | null | undefined;
                }[] | undefined;
                kyc_documents?: {
                    type: string;
                    country: string;
                    expires_at: null;
                    sub_type: string;
                    document_name: string;
                    document_number: string;
                    holder_name: string;
                    document_images: string[];
                }[] | undefined;
                date_of_registration?: string | null | undefined;
                domicile_of_registration?: string | null | undefined;
                metadata?: {} | null | undefined;
            };
        }) => Promise<{
            type: "INDIVIDUAL";
            individual_detail: {
                given_names: string;
                surname?: string | undefined;
                nationality?: string | undefined;
                place_of_birth?: string | undefined;
                date_of_birth?: string | undefined;
                gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
                employment?: {
                    employer_name: string;
                    nature_of_business: string;
                    role_description: string;
                } | undefined;
            };
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            business_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        } | {
            type: "BUSINESS";
            business_detail: {
                business_name: string;
                business_type: string;
                trading_name?: string | undefined;
            };
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            email?: string | undefined;
            mobile_number?: string | undefined;
            phone_number?: string | undefined;
            description?: string | null | undefined;
            individual_detail?: undefined;
            hashed_phone_number?: string | null | undefined;
            addresses?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            }[] | undefined;
            identity_accounts?: {
                type: "BANK_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "PAY_LATER" | "OTC" | "QR_CODE" | "SOCIAL_MEDIA";
                properties: {
                    type: "BANK_ACCOUNT";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        swift_code?: string | undefined;
                        account_type?: string | undefined;
                        account_details?: string | undefined;
                        currency?: string | undefined;
                    };
                } | {
                    type: "EWALLET";
                    properties: {
                        account_number: string;
                        account_holder_name: string;
                        currency?: string | undefined;
                    };
                } | {
                    type: "CREDIT_CARD";
                    properties: {
                        token_id: string;
                    };
                } | {
                    type: "OTC";
                    properties: {
                        payment_code: string;
                        expires_at?: string | undefined;
                    };
                } | {
                    type: "QR_CODE";
                    properties: {
                        qr_string: string;
                    };
                } | {
                    type: "PAY_LATER";
                    properties: {
                        account_id: string;
                        account_holder_name?: string | undefined;
                        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    };
                } | {
                    type: "SOCIAL_MEDIA";
                    properties: {
                        account_id: string;
                        account_handle?: string | undefined;
                    };
                };
                country?: string | null | undefined;
                company?: string | null | undefined;
                description?: string | null | undefined;
            }[] | undefined;
            kyc_documents?: {
                type: string;
                country: string;
                expires_at: null;
                sub_type: string;
                document_name: string;
                document_number: string;
                holder_name: string;
                document_images: string[];
            }[] | undefined;
            date_of_registration?: string | null | undefined;
            domicile_of_registration?: string | null | undefined;
            metadata?: {} | null | undefined;
        }>;
    };
    ewallet: {
        charge: (data: {
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
            channel_properties: {
                mobile_number?: string | undefined;
                cashtag?: string | undefined;
                success_redirect_url?: string | undefined;
                failure_redirect_url?: string | undefined;
                cancel_redirect_url?: string | undefined;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
            checkout_method: "ONE_TIME_PAYMENT";
            amount: number;
            metadata?: {} | undefined;
            payment_method_id?: undefined;
            customer_id?: string | undefined;
            basket?: {
                type: "PRODUCT" | "SERVICE";
                category: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                reference_id: string;
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                description?: string | undefined;
                metadata?: {} | undefined;
                subcategory?: string | undefined;
            }[] | undefined;
        } | {
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            channel_properties: {
                mobile_number?: string | undefined;
                cashtag?: string | undefined;
                success_redirect_url?: string | undefined;
                failure_redirect_url?: string | undefined;
                cancel_redirect_url?: string | undefined;
                redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
            };
            checkout_method: "TOKENIZED_PAYMENT";
            amount: number;
            payment_method_id: string;
            metadata?: {} | undefined;
            channel_code?: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY" | undefined;
            customer_id?: string | undefined;
            basket?: {
                type: "PRODUCT" | "SERVICE";
                category: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                reference_id: string;
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                description?: string | undefined;
                metadata?: {} | undefined;
                subcategory?: string | undefined;
            }[] | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REFUNDED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
            channel_properties: {
                channel_code: "ID_OVO";
                channel_properties: {
                    mobile_number: string;
                };
            } | {
                properties: {
                    method: "ONE_TIME_PAYMENT";
                    properties: {
                        cashtag: string;
                    };
                } | {
                    method: "TOKENIZED_PAYMENT";
                    properties: {
                        success_redirect_url: string;
                        failure_redirect_url: string;
                        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
                    };
                };
                channel_code: "ID_JENIUSPAY";
            } | {
                properties: {
                    method: "ONE_TIME_PAYMENT";
                    properties: {
                        success_redirect_url: string;
                    };
                } | {
                    method: "TOKENIZED_PAYMENT";
                    properties: {
                        success_redirect_url: string;
                        failure_redirect_url: string;
                        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
                    };
                };
                channel_code: "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_SAKUKU" | "PH_SHOPEEPAY" | "TH_WECHATPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "TH_TOUCHNGO";
            } | {
                properties: {
                    success_redirect_url: string;
                    failure_redirect_url: string;
                    cancel_redirect_url: string;
                };
                channel_code: "PH_PAYMAYA";
            };
            checkout_method: "ONE_TIME_PAYMENT" | "TOKENIZED_PAYMENT";
            payment_method_id: string | null;
            customer_id: string | null;
            business_id: string;
            charge_amount: number;
            refunded_amount: number | null;
            is_redirect_required: boolean;
            callback_url: string;
            void_status: string | null;
            voided_at: string | null;
            capture_now: boolean;
            failure_code: string | null;
            metadata?: {} | undefined;
            basket?: {
                type: "PRODUCT" | "SERVICE";
                category: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                reference_id: string;
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                description?: string | undefined;
                metadata?: {} | undefined;
                subcategory?: string | undefined;
            }[] | undefined;
            capture_amount?: number | undefined;
            actions?: {
                desktop_web_checkout_url?: string | undefined;
                mobile_web_checkout_url?: string | undefined;
                mobile_deeplink_checkout_url?: string | undefined;
                qr_checkout_string?: string | undefined;
            } | undefined;
        }>;
        get: (data: {
            id: string;
        }) => Promise<{
            status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REFUNDED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            channel_code: "ID_OVO" | "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_ASTRAPAY" | "ID_JENIUSPAY" | "ID_SAKUKU" | "PH_PAYMAYA" | "PH_GCASH" | "PH_GRABPAY" | "PH_SHOPEEPAY" | "VN_APPOTA" | "VN_MOMO" | "VN_SHOPEEPAY" | "VN_VNPTWALLET" | "VN_VIETTELPAY" | "VN_ZALOPAY" | "TH_WECHATPAY" | "TH_LINEPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "MY_TOUCHNGO" | "MY_SHOPEEPAY" | "MY_GRABPAY";
            channel_properties: {
                channel_code: "ID_OVO";
                channel_properties: {
                    mobile_number: string;
                };
            } | {
                properties: {
                    method: "ONE_TIME_PAYMENT";
                    properties: {
                        cashtag: string;
                    };
                } | {
                    method: "TOKENIZED_PAYMENT";
                    properties: {
                        success_redirect_url: string;
                        failure_redirect_url: string;
                        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
                    };
                };
                channel_code: "ID_JENIUSPAY";
            } | {
                properties: {
                    method: "ONE_TIME_PAYMENT";
                    properties: {
                        success_redirect_url: string;
                    };
                } | {
                    method: "TOKENIZED_PAYMENT";
                    properties: {
                        success_redirect_url: string;
                        failure_redirect_url: string;
                        redeem_points?: "REDEEM_ALL" | "REDEEM_NONE" | undefined;
                    };
                };
                channel_code: "ID_DANA" | "ID_LINKAJA" | "ID_SHOPEEPAY" | "ID_SAKUKU" | "PH_SHOPEEPAY" | "TH_WECHATPAY" | "TH_TRUEMONEY" | "TH_SHOPEEPAY" | "TH_TOUCHNGO";
            } | {
                properties: {
                    success_redirect_url: string;
                    failure_redirect_url: string;
                    cancel_redirect_url: string;
                };
                channel_code: "PH_PAYMAYA";
            };
            checkout_method: "ONE_TIME_PAYMENT" | "TOKENIZED_PAYMENT";
            payment_method_id: string | null;
            customer_id: string | null;
            business_id: string;
            charge_amount: number;
            refunded_amount: number | null;
            is_redirect_required: boolean;
            callback_url: string;
            void_status: string | null;
            voided_at: string | null;
            capture_now: boolean;
            failure_code: string | null;
            metadata?: {} | undefined;
            basket?: {
                type: "PRODUCT" | "SERVICE";
                category: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                reference_id: string;
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                description?: string | undefined;
                metadata?: {} | undefined;
                subcategory?: string | undefined;
            }[] | undefined;
            capture_amount?: number | undefined;
            actions?: {
                desktop_web_checkout_url?: string | undefined;
                mobile_web_checkout_url?: string | undefined;
                mobile_deeplink_checkout_url?: string | undefined;
                qr_checkout_string?: string | undefined;
            } | undefined;
        }>;
    };
    paymentMethod: {
        create: (data: {
            type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
            reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            reference_id?: string | undefined;
            card?: {
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                channel_properties?: {
                    success_return_url?: string | undefined;
                    failure_return_url?: string | undefined;
                } | undefined;
            } | undefined;
            bank_account?: {
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                channel_properties?: {
                    card_last_four?: string | undefined;
                    card_expiry_month?: string | undefined;
                    card_expiry_year?: string | undefined;
                    account_mobile_number?: string | undefined;
                    account_email?: string | undefined;
                } | undefined;
            } | undefined;
            ewallet?: {
                channel_code: string;
                channel_properties?: {
                    success_return_url?: string | undefined;
                    failure_return_url?: string | undefined;
                    cancel_return_url?: string | undefined;
                } | undefined;
            } | undefined;
        }) => Promise<{
            status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
            type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
            id: string;
            created: string;
            updated: string;
            business_id: string;
            reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            reference_id?: string | undefined;
            customer_id?: string | undefined;
            actions?: {
                action: string;
                url?: string | undefined;
                method?: string | undefined;
                url_type?: string | undefined;
            }[] | undefined;
            failure_code?: string | null | undefined;
            card?: {
                card_last_four: string;
                card_expiry_month: string;
                card_expiry_year: string;
                network: string;
                type?: "CREDIT" | "DEBIT" | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                issuer?: string | undefined;
            } | undefined;
            bank_account?: {
                account_number: string;
                account_holder_name: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                bank_code: string;
                account_type?: string | undefined;
            } | undefined;
            ewallet?: {
                account_details: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            } | undefined;
            billing_information?: {
                street_line1?: string | undefined;
                street_line2?: string | undefined;
                city?: string | undefined;
                province_state?: string | undefined;
                postal_code?: string | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            } | undefined;
        }>;
        get: (data: {
            id: string;
        }) => Promise<{
            status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
            type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
            id: string;
            created: string;
            updated: string;
            business_id: string;
            reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            reference_id?: string | undefined;
            customer_id?: string | undefined;
            actions?: {
                action: string;
                url?: string | undefined;
                method?: string | undefined;
                url_type?: string | undefined;
            }[] | undefined;
            failure_code?: string | null | undefined;
            card?: {
                card_last_four: string;
                card_expiry_month: string;
                card_expiry_year: string;
                network: string;
                type?: "CREDIT" | "DEBIT" | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                issuer?: string | undefined;
            } | undefined;
            bank_account?: {
                account_number: string;
                account_holder_name: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                bank_code: string;
                account_type?: string | undefined;
            } | undefined;
            ewallet?: {
                account_details: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            } | undefined;
            billing_information?: {
                street_line1?: string | undefined;
                street_line2?: string | undefined;
                city?: string | undefined;
                province_state?: string | undefined;
                postal_code?: string | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            } | undefined;
        }>;
        list: (params?: any) => Promise<{
            data: {
                status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
                type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
                id: string;
                created: string;
                updated: string;
                business_id: string;
                reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                description?: string | undefined;
                metadata?: Record<string, unknown> | undefined;
                reference_id?: string | undefined;
                customer_id?: string | undefined;
                actions?: {
                    action: string;
                    url?: string | undefined;
                    method?: string | undefined;
                    url_type?: string | undefined;
                }[] | undefined;
                failure_code?: string | null | undefined;
                card?: {
                    card_last_four: string;
                    card_expiry_month: string;
                    card_expiry_year: string;
                    network: string;
                    type?: "CREDIT" | "DEBIT" | undefined;
                    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                    issuer?: string | undefined;
                } | undefined;
                bank_account?: {
                    account_number: string;
                    account_holder_name: string;
                    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                    bank_code: string;
                    account_type?: string | undefined;
                } | undefined;
                ewallet?: {
                    account_details: string;
                    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                } | undefined;
                billing_information?: {
                    street_line1?: string | undefined;
                    street_line2?: string | undefined;
                    city?: string | undefined;
                    province_state?: string | undefined;
                    postal_code?: string | undefined;
                    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
            }[];
            has_more: boolean;
            links: {
                method: string;
                href: string;
                rel: string;
            }[];
        }>;
        update: (data: {
            id: string;
            payload: {
                status?: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED" | undefined;
                description?: string | undefined;
                metadata?: Record<string, unknown> | undefined;
                reference_id?: string | undefined;
            };
        }) => Promise<{
            status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
            type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
            id: string;
            created: string;
            updated: string;
            business_id: string;
            reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            reference_id?: string | undefined;
            customer_id?: string | undefined;
            actions?: {
                action: string;
                url?: string | undefined;
                method?: string | undefined;
                url_type?: string | undefined;
            }[] | undefined;
            failure_code?: string | null | undefined;
            card?: {
                card_last_four: string;
                card_expiry_month: string;
                card_expiry_year: string;
                network: string;
                type?: "CREDIT" | "DEBIT" | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
                issuer?: string | undefined;
            } | undefined;
            bank_account?: {
                account_number: string;
                account_holder_name: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                bank_code: string;
                account_type?: string | undefined;
            } | undefined;
            ewallet?: {
                account_details: string;
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            } | undefined;
            billing_information?: {
                street_line1?: string | undefined;
                street_line2?: string | undefined;
                city?: string | undefined;
                province_state?: string | undefined;
                postal_code?: string | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            } | undefined;
        }>;
    };
    invoice: {
        create: (data: {
            description: string;
            amount: number;
            external_id: string;
            payer_email: string;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            metadata?: Record<string, unknown> | undefined;
            success_redirect_url?: string | undefined;
            failure_redirect_url?: string | undefined;
            customer_name?: string | undefined;
            customer_email?: string | undefined;
            customer_phone?: string | undefined;
            invoice_duration?: number | undefined;
            callback_virtual_account_id?: string | undefined;
            should_exclude_credit_card?: boolean | undefined;
            should_send_email?: boolean | undefined;
            customer?: {
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                billing_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
                shipping_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
            } | undefined;
            customer_notification_preference?: {
                invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
            } | undefined;
            payment_methods?: string[] | undefined;
            mid_label?: string | undefined;
            should_authenticate_credit_card?: boolean | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
            }[] | undefined;
            fixed_va?: boolean | undefined;
            reminder_time_unit?: "days" | "hours" | "minutes" | undefined;
            reminder_time?: number | undefined;
            locale?: string | undefined;
            fees?: {
                value: number;
                type: string;
            }[] | undefined;
        }) => Promise<{
            status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            description: string;
            id: string;
            created: string;
            updated: string;
            amount: number;
            external_id: string;
            payer_email: string;
            should_exclude_credit_card: boolean;
            should_send_email: boolean;
            user_id: string;
            merchant_name: string;
            merchant_profile_picture_url: string;
            expiry_date: string;
            invoice_url: string;
            metadata?: Record<string, unknown> | undefined;
            success_redirect_url?: string | undefined;
            failure_redirect_url?: string | undefined;
            bank_code?: string | undefined;
            customer_name?: string | undefined;
            customer_email?: string | undefined;
            customer_phone?: string | undefined;
            ewallet_type?: string | undefined;
            customer?: {
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                billing_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
                shipping_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
            } | undefined;
            customer_notification_preference?: {
                invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
            } | undefined;
            should_authenticate_credit_card?: boolean | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
            }[] | undefined;
            fees?: {
                value: number;
                type: string;
            }[] | undefined;
            paid_amount?: number | undefined;
            credit_card_charge_id?: string | undefined;
            payment_method?: string | undefined;
            payment_channel?: string | undefined;
            payment_destination?: string | undefined;
            payment_id?: string | undefined;
            paid_at?: string | undefined;
            on_demand_link?: string | undefined;
            recurring_payment_id?: string | undefined;
            available_banks?: {
                account_holder_name: string;
                bank_code: string;
                collection_type: string;
                bank_branch: string;
                transfer_amount: number;
                bank_account_number: string;
                identity_amount?: number | undefined;
            }[] | undefined;
            available_ewallets?: {
                ewallet_type: string;
            }[] | undefined;
            available_retail_outlets?: {
                retail_outlet_name: string;
            }[] | undefined;
            available_paylaters?: {
                paylater_type: string;
            }[] | undefined;
            available_qr_codes?: {
                qr_code_type: string;
            }[] | undefined;
            available_direct_debits?: {
                direct_debit_type: string;
            }[] | undefined;
        }>;
        get: (data: {
            invoice_id: string;
        }) => Promise<{
            status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            description: string;
            id: string;
            created: string;
            updated: string;
            amount: number;
            external_id: string;
            payer_email: string;
            should_exclude_credit_card: boolean;
            should_send_email: boolean;
            user_id: string;
            merchant_name: string;
            merchant_profile_picture_url: string;
            expiry_date: string;
            invoice_url: string;
            metadata?: Record<string, unknown> | undefined;
            success_redirect_url?: string | undefined;
            failure_redirect_url?: string | undefined;
            bank_code?: string | undefined;
            customer_name?: string | undefined;
            customer_email?: string | undefined;
            customer_phone?: string | undefined;
            ewallet_type?: string | undefined;
            customer?: {
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                billing_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
                shipping_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
            } | undefined;
            customer_notification_preference?: {
                invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
            } | undefined;
            should_authenticate_credit_card?: boolean | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
            }[] | undefined;
            fees?: {
                value: number;
                type: string;
            }[] | undefined;
            paid_amount?: number | undefined;
            credit_card_charge_id?: string | undefined;
            payment_method?: string | undefined;
            payment_channel?: string | undefined;
            payment_destination?: string | undefined;
            payment_id?: string | undefined;
            paid_at?: string | undefined;
            on_demand_link?: string | undefined;
            recurring_payment_id?: string | undefined;
            available_banks?: {
                account_holder_name: string;
                bank_code: string;
                collection_type: string;
                bank_branch: string;
                transfer_amount: number;
                bank_account_number: string;
                identity_amount?: number | undefined;
            }[] | undefined;
            available_ewallets?: {
                ewallet_type: string;
            }[] | undefined;
            available_retail_outlets?: {
                retail_outlet_name: string;
            }[] | undefined;
            available_paylaters?: {
                paylater_type: string;
            }[] | undefined;
            available_qr_codes?: {
                qr_code_type: string;
            }[] | undefined;
            available_direct_debits?: {
                direct_debit_type: string;
            }[] | undefined;
        }>;
        list: (params?: any) => Promise<{
            data: {
                status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                description: string;
                id: string;
                created: string;
                updated: string;
                amount: number;
                external_id: string;
                payer_email: string;
                should_exclude_credit_card: boolean;
                should_send_email: boolean;
                user_id: string;
                merchant_name: string;
                merchant_profile_picture_url: string;
                expiry_date: string;
                invoice_url: string;
                metadata?: Record<string, unknown> | undefined;
                success_redirect_url?: string | undefined;
                failure_redirect_url?: string | undefined;
                bank_code?: string | undefined;
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                ewallet_type?: string | undefined;
                customer?: {
                    customer_name?: string | undefined;
                    customer_email?: string | undefined;
                    customer_phone?: string | undefined;
                    billing_address?: {
                        city?: string | undefined;
                        postal_code?: string | undefined;
                        first_name?: string | undefined;
                        last_name?: string | undefined;
                        address?: string | undefined;
                        phone?: string | undefined;
                        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                    } | undefined;
                    shipping_address?: {
                        city?: string | undefined;
                        postal_code?: string | undefined;
                        first_name?: string | undefined;
                        last_name?: string | undefined;
                        address?: string | undefined;
                        phone?: string | undefined;
                        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                    } | undefined;
                } | undefined;
                customer_notification_preference?: {
                    invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                    invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                    invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                    invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
                } | undefined;
                should_authenticate_credit_card?: boolean | undefined;
                items?: {
                    name: string;
                    price: number;
                    quantity: number;
                    url?: string | undefined;
                    category?: string | undefined;
                }[] | undefined;
                fees?: {
                    value: number;
                    type: string;
                }[] | undefined;
                paid_amount?: number | undefined;
                credit_card_charge_id?: string | undefined;
                payment_method?: string | undefined;
                payment_channel?: string | undefined;
                payment_destination?: string | undefined;
                payment_id?: string | undefined;
                paid_at?: string | undefined;
                on_demand_link?: string | undefined;
                recurring_payment_id?: string | undefined;
                available_banks?: {
                    account_holder_name: string;
                    bank_code: string;
                    collection_type: string;
                    bank_branch: string;
                    transfer_amount: number;
                    bank_account_number: string;
                    identity_amount?: number | undefined;
                }[] | undefined;
                available_ewallets?: {
                    ewallet_type: string;
                }[] | undefined;
                available_retail_outlets?: {
                    retail_outlet_name: string;
                }[] | undefined;
                available_paylaters?: {
                    paylater_type: string;
                }[] | undefined;
                available_qr_codes?: {
                    qr_code_type: string;
                }[] | undefined;
                available_direct_debits?: {
                    direct_debit_type: string;
                }[] | undefined;
            }[];
            has_more: boolean;
        }>;
        update: (data: {
            payload: {
                metadata?: Record<string, unknown> | undefined;
                success_redirect_url?: string | undefined;
                failure_redirect_url?: string | undefined;
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                should_send_email?: boolean | undefined;
                customer?: {
                    customer_name?: string | undefined;
                    customer_email?: string | undefined;
                    customer_phone?: string | undefined;
                    billing_address?: {
                        city?: string | undefined;
                        postal_code?: string | undefined;
                        first_name?: string | undefined;
                        last_name?: string | undefined;
                        address?: string | undefined;
                        phone?: string | undefined;
                        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                    } | undefined;
                    shipping_address?: {
                        city?: string | undefined;
                        postal_code?: string | undefined;
                        first_name?: string | undefined;
                        last_name?: string | undefined;
                        address?: string | undefined;
                        phone?: string | undefined;
                        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                    } | undefined;
                } | undefined;
                customer_notification_preference?: {
                    invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                    invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                    invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                    invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
                } | undefined;
                items?: {
                    name: string;
                    price: number;
                    quantity: number;
                    url?: string | undefined;
                    category?: string | undefined;
                }[] | undefined;
            };
            invoice_id: string;
        }) => Promise<{
            status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            description: string;
            id: string;
            created: string;
            updated: string;
            amount: number;
            external_id: string;
            payer_email: string;
            should_exclude_credit_card: boolean;
            should_send_email: boolean;
            user_id: string;
            merchant_name: string;
            merchant_profile_picture_url: string;
            expiry_date: string;
            invoice_url: string;
            metadata?: Record<string, unknown> | undefined;
            success_redirect_url?: string | undefined;
            failure_redirect_url?: string | undefined;
            bank_code?: string | undefined;
            customer_name?: string | undefined;
            customer_email?: string | undefined;
            customer_phone?: string | undefined;
            ewallet_type?: string | undefined;
            customer?: {
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                billing_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
                shipping_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
            } | undefined;
            customer_notification_preference?: {
                invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
            } | undefined;
            should_authenticate_credit_card?: boolean | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
            }[] | undefined;
            fees?: {
                value: number;
                type: string;
            }[] | undefined;
            paid_amount?: number | undefined;
            credit_card_charge_id?: string | undefined;
            payment_method?: string | undefined;
            payment_channel?: string | undefined;
            payment_destination?: string | undefined;
            payment_id?: string | undefined;
            paid_at?: string | undefined;
            on_demand_link?: string | undefined;
            recurring_payment_id?: string | undefined;
            available_banks?: {
                account_holder_name: string;
                bank_code: string;
                collection_type: string;
                bank_branch: string;
                transfer_amount: number;
                bank_account_number: string;
                identity_amount?: number | undefined;
            }[] | undefined;
            available_ewallets?: {
                ewallet_type: string;
            }[] | undefined;
            available_retail_outlets?: {
                retail_outlet_name: string;
            }[] | undefined;
            available_paylaters?: {
                paylater_type: string;
            }[] | undefined;
            available_qr_codes?: {
                qr_code_type: string;
            }[] | undefined;
            available_direct_debits?: {
                direct_debit_type: string;
            }[] | undefined;
        }>;
        expire: (data: {
            invoice_id: string;
        }) => Promise<{
            status: "PENDING" | "EXPIRED" | "PAID" | "SETTLED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            description: string;
            id: string;
            created: string;
            updated: string;
            amount: number;
            external_id: string;
            payer_email: string;
            should_exclude_credit_card: boolean;
            should_send_email: boolean;
            user_id: string;
            merchant_name: string;
            merchant_profile_picture_url: string;
            expiry_date: string;
            invoice_url: string;
            metadata?: Record<string, unknown> | undefined;
            success_redirect_url?: string | undefined;
            failure_redirect_url?: string | undefined;
            bank_code?: string | undefined;
            customer_name?: string | undefined;
            customer_email?: string | undefined;
            customer_phone?: string | undefined;
            ewallet_type?: string | undefined;
            customer?: {
                customer_name?: string | undefined;
                customer_email?: string | undefined;
                customer_phone?: string | undefined;
                billing_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
                shipping_address?: {
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    first_name?: string | undefined;
                    last_name?: string | undefined;
                    address?: string | undefined;
                    phone?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                } | undefined;
            } | undefined;
            customer_notification_preference?: {
                invoice_created?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_reminder?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_paid?: ("email" | "whatsapp" | "sms")[] | undefined;
                invoice_expired?: ("email" | "whatsapp" | "sms")[] | undefined;
            } | undefined;
            should_authenticate_credit_card?: boolean | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
            }[] | undefined;
            fees?: {
                value: number;
                type: string;
            }[] | undefined;
            paid_amount?: number | undefined;
            credit_card_charge_id?: string | undefined;
            payment_method?: string | undefined;
            payment_channel?: string | undefined;
            payment_destination?: string | undefined;
            payment_id?: string | undefined;
            paid_at?: string | undefined;
            on_demand_link?: string | undefined;
            recurring_payment_id?: string | undefined;
            available_banks?: {
                account_holder_name: string;
                bank_code: string;
                collection_type: string;
                bank_branch: string;
                transfer_amount: number;
                bank_account_number: string;
                identity_amount?: number | undefined;
            }[] | undefined;
            available_ewallets?: {
                ewallet_type: string;
            }[] | undefined;
            available_retail_outlets?: {
                retail_outlet_name: string;
            }[] | undefined;
            available_paylaters?: {
                paylater_type: string;
            }[] | undefined;
            available_qr_codes?: {
                qr_code_type: string;
            }[] | undefined;
            available_direct_debits?: {
                direct_debit_type: string;
            }[] | undefined;
        }>;
    };
};

interface XenditError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}
declare const XenditErrorSchema: z.ZodObject<{
    error_code: z.ZodString;
    message: z.ZodString;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodOptional<z.ZodString>;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        field?: string | undefined;
    }, {
        message: string;
        field?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    error_code: string;
    message: string;
    errors?: {
        message: string;
        field?: string | undefined;
    }[] | undefined;
}, {
    error_code: string;
    message: string;
    errors?: {
        message: string;
        field?: string | undefined;
    }[] | undefined;
}>;
declare class XenditApiError extends Error {
    readonly code: string;
    readonly details?: Record<string, unknown>;
    readonly statusCode?: number;
    constructor(message: string, code: string, statusCode?: number, details?: Record<string, unknown>);
}
declare class ValidationError extends Error {
    readonly field?: string;
    readonly validationErrors: z.ZodIssue[];
    constructor(message: string, validationErrors: z.ZodIssue[], field?: string);
}
declare class AuthenticationError extends XenditApiError {
    constructor(message?: string);
}
declare class NotFoundError extends XenditApiError {
    constructor(message?: string);
}
declare class RateLimitError extends XenditApiError {
    constructor(message?: string);
}
declare const handleAxiosError: (error: AxiosError) => never;
declare const validateInput: <T>(schema: z.ZodSchema<T>, data: unknown, fieldName?: string) => T;

declare const PhoneSchema: z.ZodEffects<z.ZodString, string, string>;
type Phone = z.infer<typeof PhoneSchema>;
declare const CountrySchema: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>;
type Country = z.infer<typeof CountrySchema>;
declare const CurrencySchema: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
type Currency = z.infer<typeof CurrencySchema>;

declare function isValidPhone(value: string): value is Phone;
declare function isValidCountry(value: string): value is Country;
declare function isValidCurrency(value: string): value is Currency;
declare function isValidCustomerType(value: string): value is CustomerType;
declare function isValidCheckoutMethod(value: string): value is CheckoutMethod;
declare function isNotNullOrUndefined<T>(value: T | null | undefined): value is T;
declare function isValidUrl(value: string): boolean;
declare function isValidEmail(value: string): boolean;
declare function isValidDateString(value: string): boolean;

declare const WebhookEventTypeSchema: z.ZodUnion<[z.ZodLiteral<"invoice.paid">, z.ZodLiteral<"invoice.expired">, z.ZodLiteral<"payment.succeeded">, z.ZodLiteral<"payment.failed">, z.ZodLiteral<"ewallet.charge.succeeded">, z.ZodLiteral<"ewallet.charge.pending">, z.ZodLiteral<"ewallet.charge.failed">, z.ZodLiteral<"payment_method.activate">, z.ZodLiteral<"payment_method.expire">, z.ZodLiteral<"customer.created">, z.ZodLiteral<"customer.updated">]>;
type WebhookEventType = z.infer<typeof WebhookEventTypeSchema>;
declare const WebhookEventSchema: z.ZodObject<{
    id: z.ZodString;
    event: z.ZodUnion<[z.ZodLiteral<"invoice.paid">, z.ZodLiteral<"invoice.expired">, z.ZodLiteral<"payment.succeeded">, z.ZodLiteral<"payment.failed">, z.ZodLiteral<"ewallet.charge.succeeded">, z.ZodLiteral<"ewallet.charge.pending">, z.ZodLiteral<"ewallet.charge.failed">, z.ZodLiteral<"payment_method.activate">, z.ZodLiteral<"payment_method.expire">, z.ZodLiteral<"customer.created">, z.ZodLiteral<"customer.updated">]>;
    api_version: z.ZodString;
    created: z.ZodString;
    business_id: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    id: string;
    created: string;
    business_id: string;
    event: "invoice.paid" | "invoice.expired" | "payment.succeeded" | "payment.failed" | "ewallet.charge.succeeded" | "ewallet.charge.pending" | "ewallet.charge.failed" | "payment_method.activate" | "payment_method.expire" | "customer.created" | "customer.updated";
    api_version: string;
}, {
    data: Record<string, unknown>;
    id: string;
    created: string;
    business_id: string;
    event: "invoice.paid" | "invoice.expired" | "payment.succeeded" | "payment.failed" | "ewallet.charge.succeeded" | "ewallet.charge.pending" | "ewallet.charge.failed" | "payment_method.activate" | "payment_method.expire" | "customer.created" | "customer.updated";
    api_version: string;
}>;
type WebhookEvent = z.infer<typeof WebhookEventSchema>;
interface WebhookVerificationOptions {
    /**
     * Webhook callback token from Xendit Dashboard
     */
    callbackToken: string;
    /**
     * Raw request body as received from Xendit
     */
    requestBody: string | Buffer;
    /**
     * X-Callback-Token header from the webhook request
     */
    receivedToken: string;
}
/**
 * Verify webhook signature from Xendit
 * @param options Verification options
 * @returns true if signature is valid, false otherwise
 */
declare function verifyWebhookSignature(options: WebhookVerificationOptions): boolean;
/**
 * Advanced webhook signature verification using HMAC
 * @param options Verification options with HMAC
 * @returns true if signature is valid, false otherwise
 */
declare function verifyWebhookHmac(options: {
    secret: string;
    requestBody: string | Buffer;
    signature: string;
}): boolean;
/**
 * Parse and validate webhook event
 * @param rawEvent Raw webhook event data
 * @returns Parsed and validated webhook event
 */
declare function parseWebhookEvent(rawEvent: unknown): WebhookEvent;
/**
 * Type-safe webhook event handler
 */
interface WebhookHandlers {
    'invoice.paid'?: (event: WebhookEvent) => void | Promise<void>;
    'invoice.expired'?: (event: WebhookEvent) => void | Promise<void>;
    'payment.succeeded'?: (event: WebhookEvent) => void | Promise<void>;
    'payment.failed'?: (event: WebhookEvent) => void | Promise<void>;
    'ewallet.charge.succeeded'?: (event: WebhookEvent) => void | Promise<void>;
    'ewallet.charge.pending'?: (event: WebhookEvent) => void | Promise<void>;
    'ewallet.charge.failed'?: (event: WebhookEvent) => void | Promise<void>;
    'payment_method.activate'?: (event: WebhookEvent) => void | Promise<void>;
    'payment_method.expire'?: (event: WebhookEvent) => void | Promise<void>;
    'customer.created'?: (event: WebhookEvent) => void | Promise<void>;
    'customer.updated'?: (event: WebhookEvent) => void | Promise<void>;
    [key: string]: ((event: WebhookEvent) => void | Promise<void>) | undefined;
}
/**
 * Handle webhook events with type-safe handlers
 * @param event Webhook event
 * @param handlers Event handlers
 */
declare function handleWebhookEvent(event: WebhookEvent, handlers: WebhookHandlers): Promise<void>;
/**
 * Create a webhook processor with built-in verification
 */
declare function createWebhookProcessor(options: {
    callbackToken?: string;
    hmacSecret?: string;
}): {
    /**
     * Process a webhook request
     */
    processWebhook(requestBody: string | Buffer, headers: Record<string, string>, handlers: WebhookHandlers): Promise<{
        success: boolean;
        error?: string;
    }>;
};

declare const PaginationMetaSchema: z.ZodObject<{
    has_more: z.ZodBoolean;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    total_count: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}, {
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}>;
type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
declare const PaginatedResponseSchema: <T extends z.ZodType>(itemSchema: T) => z.ZodObject<{
    data: z.ZodArray<T, "many">;
    has_more: z.ZodBoolean;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    total_count: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    data: T["_output"][];
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}, {
    data: T["_input"][];
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}>;
type PaginatedResponse<T> = {
    data: T[];
    has_more: boolean;
    after_id?: string;
    before_id?: string;
    total_count?: number;
};
interface PaginationOptions {
    /**
     * Maximum number of items to return per page
     * @default 10
     */
    limit?: number;
    /**
     * Return items after this ID (for forward pagination)
     */
    after_id?: string;
    /**
     * Return items before this ID (for backward pagination)
     */
    before_id?: string;
}
interface AutoPaginationOptions extends PaginationOptions {
    /**
     * Maximum number of pages to fetch (safety limit)
     * @default 100
     */
    maxPages?: number;
    /**
     * Maximum number of total items to fetch
     */
    maxItems?: number;
}
/**
 * Helper to build pagination query parameters
 */
declare function buildPaginationParams(options: PaginationOptions): Record<string, string>;
/**
 * Generic paginated API fetcher
 */
declare function fetchPaginated<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: PaginationOptions): Promise<PaginatedResponse<T>>;
/**
 * Auto-paginate through all pages and return all items
 */
declare function fetchAllPages<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: AutoPaginationOptions): Promise<T[]>;
/**
 * Create a paginator iterator for streaming through pages
 */
declare function createPaginator<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, initialOptions?: PaginationOptions): {
    /**
     * Get the next page
     */
    next(): Promise<{
        value: PaginatedResponse<T>;
        done: boolean;
    }>;
    /**
     * Reset the paginator to start from the beginning
     */
    reset(options?: PaginationOptions): void;
    /**
     * Check if there are more pages available
     */
    hasMore(): boolean;
};
/**
 * Async iterator for easy for-await-of usage
 */
declare function iteratePages<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: PaginationOptions): AsyncIterableIterator<PaginatedResponse<T>>;
/**
 * Async iterator for individual items across all pages
 */
declare function iterateItems<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: AutoPaginationOptions): AsyncIterableIterator<T>;
/**
 * Utility for search and filtering with pagination
 */
interface SearchPaginationOptions extends PaginationOptions {
    /**
     * Search query
     */
    query?: string;
    /**
     * Filter parameters
     */
    filters?: Record<string, any>;
    /**
     * Sort field
     */
    sort_by?: string;
    /**
     * Sort direction
     */
    sort_direction?: 'asc' | 'desc';
}
declare function buildSearchParams(options: SearchPaginationOptions): Record<string, string>;

export { AuthenticationError, type AutoPaginationOptions, type CreateInvoice, type CreatePaymentMethod, type Customer, type CustomerResource, type EWalletChargeParams, type EWalletChargeResource, type ExpireInvoice, type GetCustomer, type GetCustomerByRefId, type GetCustomerByRefIdResource, type GetEWalletChargeParams, type GetInvoice, type GetPaymentMethod, type InvoiceResource, type ListInvoices, type ListPaymentMethods, NotFoundError, type PaginatedResponse, PaginatedResponseSchema, type PaginationMeta, PaginationMetaSchema, type PaginationOptions, type PaymentMethodResource, type RateLimitConfig, RateLimitError, RateLimiter, type SearchPaginationOptions, type UpdateInvoice, type UpdateParams, type UpdatePaymentMethod, ValidationError, type WebhookEvent, WebhookEventSchema, type WebhookEventType, WebhookEventTypeSchema, type WebhookHandlers, type WebhookVerificationOptions, Xendit, XenditApiError, type XenditError, XenditErrorSchema, buildPaginationParams, buildSearchParams, createPaginator, createRateLimitInterceptor, createRateLimitedAxios, createRetryInterceptor, createWebhookProcessor, fetchAllPages, fetchPaginated, handleAxiosError, handleWebhookEvent, isNotNullOrUndefined, isValidCheckoutMethod, isValidCountry, isValidCurrency, isValidCustomerType, isValidDateString, isValidEmail, isValidPhone, isValidUrl, iterateItems, iteratePages, parseWebhookEvent, setupRateLimit, validateInput, verifyWebhookHmac, verifyWebhookSignature };
