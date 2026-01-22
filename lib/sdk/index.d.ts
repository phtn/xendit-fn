import { type RateLimitConfig } from "../utils/rate-limit";
import type { ListPaymentMethods } from "./payment-method/schema";
import type { ListInvoices } from "./invoice/schema";
import type { ListPaymentRequests } from "./payment-request/schema";
import type { ListRefunds } from "./refund/schema";
import type { ListPayouts } from "./payout/schema";
import type { ListTransactions } from "./balance/schema";
export type { Customer, CustomerResource, GetCustomer, GetCustomerByRefId, GetCustomerByRefIdResource, UpdateParams, } from "./customer/schema";
export type { EWalletChargeParams, EWalletChargeResource, GetEWalletChargeParams, } from "./ewallet/schema";
export type { CreatePaymentMethod, GetPaymentMethod, ListPaymentMethods, UpdatePaymentMethod, PaymentMethodResource, } from "./payment-method/schema";
export type { CreateInvoice, GetInvoice, ListInvoices, UpdateInvoice, ExpireInvoice, InvoiceResource, } from "./invoice/schema";
export type { CreatePaymentRequest, GetPaymentRequest, ListPaymentRequests, PaymentRequestResource, PaymentRequestType, PaymentRequestStatus, } from "./payment-request/schema";
export type { CreateRefund, GetRefund, ListRefunds, RefundResource, RefundReason, RefundStatus, } from "./refund/schema";
export type { CreatePayout, GetPayout, ListPayouts, CancelPayout, PayoutResource, PayoutStatus, PayoutChannelCode, } from "./payout/schema";
export type { BalanceResource, ListTransactions, TransactionResource, TransactionType, TransactionStatus, } from "./balance/schema";
export type { TokenParams, TokenResource, TokenAuthentication, TokenAuthenticationResource, TokenAuthorization, ZeroAuthorization, ReverseAuthorizationParams, CreateCharge, ChargeResource, CardInfo, TokenStatus, CardType, CardBrand, } from "./card/schema";
export type { RateLimitConfig };
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
        list: (params?: ListPaymentMethods) => Promise<{
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
        list: (params?: ListInvoices) => Promise<{
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
    paymentRequest: {
        create: (data: {
            type: "PAY" | "PAY_AND_SAVE" | "REUSABLE_PAYMENT_CODE";
            country: "PH" | "ID" | "MY" | "TH" | "VN";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            payment_method: {
                type: string;
                ewallet?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                card_information?: {
                    token_id: string;
                } | undefined;
                direct_debit?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                over_the_counter?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                qr_code?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                virtual_account?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            request_amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            success_redirect_url?: string | undefined;
            failure_redirect_url?: string | undefined;
            customer_id?: string | undefined;
            customer?: {
                given_names: string;
                surname?: string | undefined;
                email?: string | undefined;
                mobile_number?: string | undefined;
            } | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
                reference_id?: string | undefined;
            }[] | undefined;
            shipping_information?: {
                name: string;
                phone_number?: string | undefined;
                city?: string | undefined;
                postal_code?: string | undefined;
                address?: string | undefined;
                country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                province?: string | undefined;
            } | undefined;
            capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REQUIRES_ACTION" | "CANCELED";
            type: "PAY" | "PAY_AND_SAVE" | "REUSABLE_PAYMENT_CODE";
            country: "PH" | "ID" | "MY" | "TH" | "VN";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            payment_method: {
                type: string;
                ewallet?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                card_information?: {
                    token_id: string;
                } | undefined;
                direct_debit?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                over_the_counter?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                qr_code?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                virtual_account?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            request_amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            customer_id?: string | undefined;
            actions?: {
                desktop_web_checkout_url?: string | undefined;
                mobile_web_checkout_url?: string | undefined;
                mobile_deeplink_checkout_url?: string | undefined;
                qr_checkout_string?: string | undefined;
            } | undefined;
            customer?: {
                given_names: string;
                surname?: string | undefined;
                email?: string | undefined;
                mobile_number?: string | undefined;
            } | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
                reference_id?: string | undefined;
            }[] | undefined;
            paid_amount?: number | undefined;
            shipping_information?: {
                name: string;
                phone_number?: string | undefined;
                city?: string | undefined;
                postal_code?: string | undefined;
                address?: string | undefined;
                country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                province?: string | undefined;
            } | undefined;
            failure_reason?: string | undefined;
            payment_request_id?: string | undefined;
        }>;
        get: (data: {
            id: string;
        }) => Promise<{
            status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REQUIRES_ACTION" | "CANCELED";
            type: "PAY" | "PAY_AND_SAVE" | "REUSABLE_PAYMENT_CODE";
            country: "PH" | "ID" | "MY" | "TH" | "VN";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            payment_method: {
                type: string;
                ewallet?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                card_information?: {
                    token_id: string;
                } | undefined;
                direct_debit?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                over_the_counter?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                qr_code?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
                virtual_account?: {
                    channel_code: string;
                    channel_properties?: Record<string, unknown> | undefined;
                } | undefined;
            };
            request_amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            customer_id?: string | undefined;
            actions?: {
                desktop_web_checkout_url?: string | undefined;
                mobile_web_checkout_url?: string | undefined;
                mobile_deeplink_checkout_url?: string | undefined;
                qr_checkout_string?: string | undefined;
            } | undefined;
            customer?: {
                given_names: string;
                surname?: string | undefined;
                email?: string | undefined;
                mobile_number?: string | undefined;
            } | undefined;
            items?: {
                name: string;
                price: number;
                quantity: number;
                url?: string | undefined;
                category?: string | undefined;
                reference_id?: string | undefined;
            }[] | undefined;
            paid_amount?: number | undefined;
            shipping_information?: {
                name: string;
                phone_number?: string | undefined;
                city?: string | undefined;
                postal_code?: string | undefined;
                address?: string | undefined;
                country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                province?: string | undefined;
            } | undefined;
            failure_reason?: string | undefined;
            payment_request_id?: string | undefined;
        }>;
        list: (params?: ListPaymentRequests) => Promise<{
            data: {
                status: "SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REQUIRES_ACTION" | "CANCELED";
                type: "PAY" | "PAY_AND_SAVE" | "REUSABLE_PAYMENT_CODE";
                country: "PH" | "ID" | "MY" | "TH" | "VN";
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                reference_id: string;
                id: string;
                created: string;
                updated: string;
                payment_method: {
                    type: string;
                    ewallet?: {
                        channel_code: string;
                        channel_properties?: Record<string, unknown> | undefined;
                    } | undefined;
                    card_information?: {
                        token_id: string;
                    } | undefined;
                    direct_debit?: {
                        channel_code: string;
                        channel_properties?: Record<string, unknown> | undefined;
                    } | undefined;
                    over_the_counter?: {
                        channel_code: string;
                        channel_properties?: Record<string, unknown> | undefined;
                    } | undefined;
                    qr_code?: {
                        channel_code: string;
                        channel_properties?: Record<string, unknown> | undefined;
                    } | undefined;
                    virtual_account?: {
                        channel_code: string;
                        channel_properties?: Record<string, unknown> | undefined;
                    } | undefined;
                };
                request_amount: number;
                description?: string | undefined;
                metadata?: Record<string, unknown> | undefined;
                customer_id?: string | undefined;
                actions?: {
                    desktop_web_checkout_url?: string | undefined;
                    mobile_web_checkout_url?: string | undefined;
                    mobile_deeplink_checkout_url?: string | undefined;
                    qr_checkout_string?: string | undefined;
                } | undefined;
                customer?: {
                    given_names: string;
                    surname?: string | undefined;
                    email?: string | undefined;
                    mobile_number?: string | undefined;
                } | undefined;
                items?: {
                    name: string;
                    price: number;
                    quantity: number;
                    url?: string | undefined;
                    category?: string | undefined;
                    reference_id?: string | undefined;
                }[] | undefined;
                paid_amount?: number | undefined;
                shipping_information?: {
                    name: string;
                    phone_number?: string | undefined;
                    city?: string | undefined;
                    postal_code?: string | undefined;
                    address?: string | undefined;
                    country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                    province?: string | undefined;
                } | undefined;
                failure_reason?: string | undefined;
                payment_request_id?: string | undefined;
            }[];
            has_more: boolean;
            links?: {
                method: string;
                href: string;
                rel: string;
            }[] | undefined;
        }>;
    };
    refund: {
        create: (data: {
            payment_request_id: string;
            reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
            metadata?: Record<string, unknown> | undefined;
            amount?: number | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "PENDING" | "FAILED";
            currency: string;
            id: string;
            created: string;
            updated: string;
            amount: number;
            payment_request_id: string;
            reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
            metadata?: Record<string, unknown> | undefined;
            failure_reason?: string | undefined;
        }>;
        get: (data: {
            id: string;
        }) => Promise<{
            status: "SUCCEEDED" | "PENDING" | "FAILED";
            currency: string;
            id: string;
            created: string;
            updated: string;
            amount: number;
            payment_request_id: string;
            reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
            metadata?: Record<string, unknown> | undefined;
            failure_reason?: string | undefined;
        }>;
        list: (params?: ListRefunds) => Promise<{
            data: {
                status: "SUCCEEDED" | "PENDING" | "FAILED";
                currency: string;
                id: string;
                created: string;
                updated: string;
                amount: number;
                payment_request_id: string;
                reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
                metadata?: Record<string, unknown> | undefined;
                failure_reason?: string | undefined;
            }[];
            has_more: boolean;
            links?: {
                method: string;
                href: string;
                rel: string;
            }[] | undefined;
        }>;
    };
    payout: {
        create: (data: {
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            channel_code: "EWALLET" | "BANK" | "CASH";
            channel_properties: {
                channel_code: "BANK";
                bank_account: {
                    account_number: string;
                    account_holder_name: string;
                    bank_code: string;
                    account_type?: string | undefined;
                };
            } | {
                channel_code: "EWALLET";
                ewallet: {
                    account_number: string;
                    account_holder_name: string;
                    ewallet_type: string;
                };
            } | {
                channel_code: "CASH";
                cash: {
                    account_number: string;
                    account_holder_name: string;
                };
            };
            amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            receipt_notification?: {
                email_to?: string[] | undefined;
                email_cc?: string[] | undefined;
                email_bcc?: string[] | undefined;
            } | undefined;
        }) => Promise<{
            status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            channel_code: "EWALLET" | "BANK" | "CASH";
            channel_properties: {
                channel_code: "BANK";
                bank_account: {
                    account_number: string;
                    account_holder_name: string;
                    bank_code: string;
                    account_type?: string | undefined;
                };
            } | {
                channel_code: "EWALLET";
                ewallet: {
                    account_number: string;
                    account_holder_name: string;
                    ewallet_type: string;
                };
            } | {
                channel_code: "CASH";
                cash: {
                    account_number: string;
                    account_holder_name: string;
                };
            };
            amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            failure_reason?: string | undefined;
            receipt_notification?: {
                email_to?: string[] | undefined;
                email_cc?: string[] | undefined;
                email_bcc?: string[] | undefined;
            } | undefined;
            estimated_arrival_time?: string | undefined;
        }>;
        get: (data: {
            id: string;
        }) => Promise<{
            status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            channel_code: "EWALLET" | "BANK" | "CASH";
            channel_properties: {
                channel_code: "BANK";
                bank_account: {
                    account_number: string;
                    account_holder_name: string;
                    bank_code: string;
                    account_type?: string | undefined;
                };
            } | {
                channel_code: "EWALLET";
                ewallet: {
                    account_number: string;
                    account_holder_name: string;
                    ewallet_type: string;
                };
            } | {
                channel_code: "CASH";
                cash: {
                    account_number: string;
                    account_holder_name: string;
                };
            };
            amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            failure_reason?: string | undefined;
            receipt_notification?: {
                email_to?: string[] | undefined;
                email_cc?: string[] | undefined;
                email_bcc?: string[] | undefined;
            } | undefined;
            estimated_arrival_time?: string | undefined;
        }>;
        list: (params?: ListPayouts) => Promise<{
            data: {
                status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                reference_id: string;
                id: string;
                created: string;
                updated: string;
                channel_code: "EWALLET" | "BANK" | "CASH";
                channel_properties: {
                    channel_code: "BANK";
                    bank_account: {
                        account_number: string;
                        account_holder_name: string;
                        bank_code: string;
                        account_type?: string | undefined;
                    };
                } | {
                    channel_code: "EWALLET";
                    ewallet: {
                        account_number: string;
                        account_holder_name: string;
                        ewallet_type: string;
                    };
                } | {
                    channel_code: "CASH";
                    cash: {
                        account_number: string;
                        account_holder_name: string;
                    };
                };
                amount: number;
                description?: string | undefined;
                metadata?: Record<string, unknown> | undefined;
                failure_reason?: string | undefined;
                receipt_notification?: {
                    email_to?: string[] | undefined;
                    email_cc?: string[] | undefined;
                    email_bcc?: string[] | undefined;
                } | undefined;
                estimated_arrival_time?: string | undefined;
            }[];
            has_more: boolean;
            links?: {
                method: string;
                href: string;
                rel: string;
            }[] | undefined;
        }>;
        cancel: (data: {
            id: string;
        }) => Promise<{
            status: "PENDING" | "FAILED" | "ACCEPTED" | "PROCESSING" | "COMPLETED" | "CANCELLED" | "REVERSED";
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            reference_id: string;
            id: string;
            created: string;
            updated: string;
            channel_code: "EWALLET" | "BANK" | "CASH";
            channel_properties: {
                channel_code: "BANK";
                bank_account: {
                    account_number: string;
                    account_holder_name: string;
                    bank_code: string;
                    account_type?: string | undefined;
                };
            } | {
                channel_code: "EWALLET";
                ewallet: {
                    account_number: string;
                    account_holder_name: string;
                    ewallet_type: string;
                };
            } | {
                channel_code: "CASH";
                cash: {
                    account_number: string;
                    account_holder_name: string;
                };
            };
            amount: number;
            description?: string | undefined;
            metadata?: Record<string, unknown> | undefined;
            failure_reason?: string | undefined;
            receipt_notification?: {
                email_to?: string[] | undefined;
                email_cc?: string[] | undefined;
                email_bcc?: string[] | undefined;
            } | undefined;
            estimated_arrival_time?: string | undefined;
        }>;
    };
    balance: {
        get: () => Promise<{
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
            balance: number;
            account_type?: string | undefined;
        }>;
        listTransactions: (params?: ListTransactions) => Promise<{
            data: {
                status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
                type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
                currency: "PHP" | "IDR" | "MYR" | "THB" | "VND";
                id: string;
                created: string;
                updated: string;
                amount: number;
                description?: string | undefined;
                metadata?: Record<string, unknown> | undefined;
                reference_id?: string | undefined;
            }[];
            has_more: boolean;
            links?: {
                method: string;
                href: string;
                rel: string;
            }[] | undefined;
        }>;
    };
    card: {
        createToken: (data: {
            mid_label: string;
            is_multiple_use: boolean;
            should_authenticate: boolean;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            amount?: string | undefined;
            external_id?: string | undefined;
            card_data?: {
                account_number: string;
                exp_month: string;
                exp_year: string;
                card_holder_first_name: string;
                card_holder_last_name: string;
                card_holder_email: string;
                card_holder_phone_number: string;
            } | undefined;
            card_cvn?: string | undefined;
            billing_details?: {
                country: string;
                street_line1?: string | null | undefined;
                street_line2?: string | null | undefined;
                city?: string | null | undefined;
                province_state?: string | null | undefined;
                postal_code?: string | null | undefined;
                category?: string | null | undefined;
                is_primary?: boolean | null | undefined;
            } | undefined;
        }) => Promise<{
            status: string;
            id: string;
            created: string;
            external_id: string;
            authentication_id: string;
            masked_card_number: string;
            business_id?: string | undefined;
            failure_reason?: string | undefined;
            payer_authentication_url?: string | undefined;
            card_info?: {
                type?: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN" | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                bank?: string | undefined;
                brand?: "VISA" | "MASTERCARD" | "JCB" | "AMEX" | undefined;
                fingerprint?: string | undefined;
                card_art_url?: string | undefined;
            } | undefined;
        }>;
        getToken: (data: {
            credit_card_token_id: string;
        }) => Promise<{
            status: string;
            id: string;
            created: string;
            external_id: string;
            authentication_id: string;
            masked_card_number: string;
            business_id?: string | undefined;
            failure_reason?: string | undefined;
            payer_authentication_url?: string | undefined;
            card_info?: {
                type?: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN" | undefined;
                country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
                bank?: string | undefined;
                brand?: "VISA" | "MASTERCARD" | "JCB" | "AMEX" | undefined;
                fingerprint?: string | undefined;
                card_art_url?: string | undefined;
            } | undefined;
        }>;
        authenticateToken: (data: {
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            token_id?: string | undefined;
            amount?: string | undefined;
            external_id?: string | undefined;
            mid_label?: string | undefined;
            card_data?: {
                account_number: string;
                exp_month: string;
                exp_year: string;
                card_holder_first_name: string;
                card_holder_last_name: string;
                card_holder_email: string;
                card_holder_phone_number: string;
            } | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
            id: string;
            external_id?: string | undefined;
            mid_label?: string | undefined;
            failure_reason?: "AUTHENTICATION_FAILED" | "REVERSE_AUTHORIZATION_REJECTED_BY_BANK" | "PROCESSOR_ERROR" | undefined;
            payer_authentication_url?: string | undefined;
        }>;
        authorizeToken: (data: {
            capture: boolean;
            token_id?: string | undefined;
            amount?: string | undefined;
            external_id?: string | undefined;
            authentication_id?: string | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
            id: string;
            created: string;
            business_id: string;
            external_id: string;
            masked_card_number: string;
            authorized_amount: number;
            merchant_id: string;
            merchant_reference_code: string;
            card_type: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN";
            charge_type: "SINGLE_USE_TOKEN" | "MULTIPLE_USE_TOKEN" | "RECURRING";
            card_brand: "VISA" | "MASTERCARD" | "JCB" | "AMEX";
            bank_reconciliation_id: string;
            capture_amount?: number | undefined;
            mid_label?: string | undefined;
            failure_reason?: "AUTHENTICATION_FAILED" | "PROCESSOR_ERROR" | "DECLINED_BY_ISSUER" | "DECLINED_BY_PROCESSOR" | "EXPIRED_CARD" | "ISSUER_SUSPECT_FRAUD" | "INACTIVE_OR_UNAUTHORIZED_CARD" | "INSUFFICIENT_BALANCE" | "INVALID_CARD" | "INVALID_CVV" | "ISSUER_UNAVAILABLE" | "STOLEN_CARD" | "PROCESSOR_TIMEOUT" | "FRAUD_RISK_BLOCKED" | undefined;
            descriptor?: string | undefined;
            promotion?: {
                reference_id: string;
                original_amount: number;
            } | undefined;
            installment?: {
                count?: number | undefined;
                interval?: "month" | undefined;
            } | undefined;
            eci?: "0" | "1" | "2" | "3" | "4" | "5" | undefined;
            cvn_code?: "M" | "N" | "P" | undefined;
        }>;
        zeroAuthorization: (data: {
            amount: string;
            capture: boolean;
            token_id?: string | undefined;
            external_id?: string | undefined;
            authentication_id?: string | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
            id: string;
            created: string;
            business_id: string;
            external_id: string;
            masked_card_number: string;
            authorized_amount: number;
            merchant_id: string;
            merchant_reference_code: string;
            card_type: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN";
            charge_type: "SINGLE_USE_TOKEN" | "MULTIPLE_USE_TOKEN" | "RECURRING";
            card_brand: "VISA" | "MASTERCARD" | "JCB" | "AMEX";
            bank_reconciliation_id: string;
            capture_amount?: number | undefined;
            mid_label?: string | undefined;
            failure_reason?: "AUTHENTICATION_FAILED" | "PROCESSOR_ERROR" | "DECLINED_BY_ISSUER" | "DECLINED_BY_PROCESSOR" | "EXPIRED_CARD" | "ISSUER_SUSPECT_FRAUD" | "INACTIVE_OR_UNAUTHORIZED_CARD" | "INSUFFICIENT_BALANCE" | "INVALID_CARD" | "INVALID_CVV" | "ISSUER_UNAVAILABLE" | "STOLEN_CARD" | "PROCESSOR_TIMEOUT" | "FRAUD_RISK_BLOCKED" | undefined;
            descriptor?: string | undefined;
            promotion?: {
                reference_id: string;
                original_amount: number;
            } | undefined;
            installment?: {
                count?: number | undefined;
                interval?: "month" | undefined;
            } | undefined;
            eci?: "0" | "1" | "2" | "3" | "4" | "5" | undefined;
            cvn_code?: "M" | "N" | "P" | undefined;
        }>;
        reverseAuthorization: (data: {
            external_id: string;
        }) => Promise<{
            status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
            id: string;
            created: string;
            business_id: string;
            external_id: string;
            masked_card_number: string;
            authorized_amount: number;
            merchant_id: string;
            merchant_reference_code: string;
            card_type: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN";
            charge_type: "SINGLE_USE_TOKEN" | "MULTIPLE_USE_TOKEN" | "RECURRING";
            card_brand: "VISA" | "MASTERCARD" | "JCB" | "AMEX";
            bank_reconciliation_id: string;
            capture_amount?: number | undefined;
            mid_label?: string | undefined;
            failure_reason?: "AUTHENTICATION_FAILED" | "PROCESSOR_ERROR" | "DECLINED_BY_ISSUER" | "DECLINED_BY_PROCESSOR" | "EXPIRED_CARD" | "ISSUER_SUSPECT_FRAUD" | "INACTIVE_OR_UNAUTHORIZED_CARD" | "INSUFFICIENT_BALANCE" | "INVALID_CARD" | "INVALID_CVV" | "ISSUER_UNAVAILABLE" | "STOLEN_CARD" | "PROCESSOR_TIMEOUT" | "FRAUD_RISK_BLOCKED" | undefined;
            descriptor?: string | undefined;
            promotion?: {
                reference_id: string;
                original_amount: number;
            } | undefined;
            installment?: {
                count?: number | undefined;
                interval?: "month" | undefined;
            } | undefined;
            eci?: "0" | "1" | "2" | "3" | "4" | "5" | undefined;
            cvn_code?: "M" | "N" | "P" | undefined;
        }>;
        createCharge: (data: {
            token_id: string;
            amount: number;
            external_id: string;
            capture: boolean;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | undefined;
            metadata?: {} | undefined;
            mid_label?: string | undefined;
            billing_details?: {
                given_names: string;
                surname?: string | undefined;
                email?: string | undefined;
                mobile_number?: string | undefined;
                phone_number?: string | undefined;
            } | undefined;
            authentication_id?: string | undefined;
            descriptor?: string | undefined;
            promotion?: {
                reference_id: string;
                original_amount: number;
            } | undefined;
            installment?: {
                count?: number | undefined;
                interval?: "month" | undefined;
            } | undefined;
        }) => Promise<{
            status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
            id: string;
            created: string;
            business_id: string;
            external_id: string;
            masked_card_number: string;
            authorized_amount: number;
            merchant_id: string;
            merchant_reference_code: string;
            card_type: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN";
            charge_type: "SINGLE_USE_TOKEN" | "MULTIPLE_USE_TOKEN" | "RECURRING";
            card_brand: "VISA" | "MASTERCARD" | "JCB" | "AMEX";
            bank_reconciliation_id: string;
            capture_amount?: number | undefined;
            mid_label?: string | undefined;
            failure_reason?: "AUTHENTICATION_FAILED" | "PROCESSOR_ERROR" | "DECLINED_BY_ISSUER" | "DECLINED_BY_PROCESSOR" | "EXPIRED_CARD" | "ISSUER_SUSPECT_FRAUD" | "INACTIVE_OR_UNAUTHORIZED_CARD" | "INSUFFICIENT_BALANCE" | "INVALID_CARD" | "INVALID_CVV" | "ISSUER_UNAVAILABLE" | "STOLEN_CARD" | "PROCESSOR_TIMEOUT" | "FRAUD_RISK_BLOCKED" | undefined;
            descriptor?: string | undefined;
            promotion?: {
                reference_id: string;
                original_amount: number;
            } | undefined;
            installment?: {
                count?: number | undefined;
                interval?: "month" | undefined;
            } | undefined;
            eci?: "0" | "1" | "2" | "3" | "4" | "5" | undefined;
            cvn_code?: "M" | "N" | "P" | undefined;
        }>;
        getCharge: (data: {
            id: string;
        }) => Promise<{
            status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
            id: string;
            created: string;
            business_id: string;
            external_id: string;
            masked_card_number: string;
            authorized_amount: number;
            merchant_id: string;
            merchant_reference_code: string;
            card_type: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN";
            charge_type: "SINGLE_USE_TOKEN" | "MULTIPLE_USE_TOKEN" | "RECURRING";
            card_brand: "VISA" | "MASTERCARD" | "JCB" | "AMEX";
            bank_reconciliation_id: string;
            capture_amount?: number | undefined;
            mid_label?: string | undefined;
            failure_reason?: "AUTHENTICATION_FAILED" | "PROCESSOR_ERROR" | "DECLINED_BY_ISSUER" | "DECLINED_BY_PROCESSOR" | "EXPIRED_CARD" | "ISSUER_SUSPECT_FRAUD" | "INACTIVE_OR_UNAUTHORIZED_CARD" | "INSUFFICIENT_BALANCE" | "INVALID_CARD" | "INVALID_CVV" | "ISSUER_UNAVAILABLE" | "STOLEN_CARD" | "PROCESSOR_TIMEOUT" | "FRAUD_RISK_BLOCKED" | undefined;
            descriptor?: string | undefined;
            promotion?: {
                reference_id: string;
                original_amount: number;
            } | undefined;
            installment?: {
                count?: number | undefined;
                interval?: "month" | undefined;
            } | undefined;
            eci?: "0" | "1" | "2" | "3" | "4" | "5" | undefined;
            cvn_code?: "M" | "N" | "P" | undefined;
        }>;
    };
};
export { Xendit };
//# sourceMappingURL=index.d.ts.map