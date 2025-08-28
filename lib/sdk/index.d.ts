import { type RateLimitConfig } from "../utils/rate-limit";
export type { Customer, CustomerResource, GetCustomer, GetCustomerByRefId, GetCustomerByRefIdResource, UpdateParams, } from "./customer/schema";
export type { EWalletChargeParams, EWalletChargeResource, GetEWalletChargeParams, } from "./ewallet/schema";
export type { CreatePaymentMethod, GetPaymentMethod, ListPaymentMethods, UpdatePaymentMethod, PaymentMethodResource, } from "./payment-method/schema";
export type { CreateInvoice, GetInvoice, ListInvoices, UpdateInvoice, ExpireInvoice, InvoiceResource, } from "./invoice/schema";
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
export { Xendit };
//# sourceMappingURL=index.d.ts.map