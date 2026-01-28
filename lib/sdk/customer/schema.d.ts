import { z } from "zod";
export declare const CustomerTypeSchema: z.ZodUnion<[z.ZodLiteral<"INDIVIDUAL">, z.ZodLiteral<"BUSINESS">]>;
export type CustomerType = z.infer<typeof CustomerTypeSchema>;
export declare const IndividualDetailSchema: z.ZodObject<{
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
export type IndividualDetail = z.infer<typeof IndividualDetailSchema>;
export declare const BusinessTypeSchema: z.ZodUnion<[z.ZodLiteral<"CORPORATION">, z.ZodLiteral<"SOLE_PROPRIETOR">, z.ZodLiteral<"PARTNERSHIP">, z.ZodLiteral<"COOPERATIVE">, z.ZodLiteral<"TRUST">, z.ZodLiteral<"NON_PROFIT">, z.ZodLiteral<"GOVERNMENT">]>;
export type BusinessType = z.infer<typeof BusinessTypeSchema>;
export declare const BusinessDetailSchema: z.ZodObject<{
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
export type BusinessDetail = z.infer<typeof BusinessDetailSchema>;
export declare const AddressSchema: z.ZodObject<{
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
}>;
export type Address = z.infer<typeof AddressSchema>;
export declare const AccountTypeSchema: z.ZodUnion<[z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"CREDIT_CARD">, z.ZodLiteral<"PAY_LATER">, z.ZodLiteral<"OTC">, z.ZodLiteral<"QR_CODE">, z.ZodLiteral<"SOCIAL_MEDIA">]>;
export type AccountType = z.infer<typeof AccountTypeSchema>;
export declare const BankAccountSchema: z.ZodObject<{
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
export type BankAccount = z.infer<typeof BankAccountSchema>;
export declare const EWalletAccountSchema: z.ZodObject<{
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
export type EWalletAccount = z.infer<typeof EWalletAccountSchema>;
export declare const CreditCardAccountSchema: z.ZodObject<{
    token_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token_id: string;
}, {
    token_id: string;
}>;
export type CreditCardAccount = z.infer<typeof CreditCardAccountSchema>;
export declare const OTCAccountSchema: z.ZodObject<{
    payment_code: z.ZodString;
    expires_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    payment_code: string;
    expires_at?: string | undefined;
}, {
    payment_code: string;
    expires_at?: string | undefined;
}>;
export type OTCAccount = z.infer<typeof OTCAccountSchema>;
export declare const QrAccountSchema: z.ZodObject<{
    qr_string: z.ZodString;
}, "strip", z.ZodTypeAny, {
    qr_string: string;
}, {
    qr_string: string;
}>;
export type QrAccount = z.infer<typeof QrAccountSchema>;
export declare const PayLaterAccountSchema: z.ZodObject<{
    account_id: z.ZodString;
    account_holder_name: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
}, "strip", z.ZodTypeAny, {
    account_id: string;
    account_holder_name?: string | undefined;
    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
}, {
    account_id: string;
    account_holder_name?: string | undefined;
    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
}>;
export type PayLaterAccount = z.infer<typeof PayLaterAccountSchema>;
export declare const SocialMediaAccountSchema: z.ZodObject<{
    account_id: z.ZodString;
    account_handle: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    account_id: string;
    account_handle?: string | undefined;
}, {
    account_id: string;
    account_handle?: string | undefined;
}>;
export type SocialMediaAccount = z.infer<typeof SocialMediaAccountSchema>;
export declare const IdentityAccountSchema: z.ZodObject<{
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
            currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
        }, "strip", z.ZodTypeAny, {
            account_id: string;
            account_holder_name?: string | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        }, {
            account_id: string;
            account_holder_name?: string | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "PAY_LATER";
        properties: {
            account_id: string;
            account_holder_name?: string | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        };
    }, {
        type: "PAY_LATER";
        properties: {
            account_id: string;
            account_holder_name?: string | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
}>;
export type IdentityAccount = z.infer<typeof IdentityAccountSchema>;
export declare const KYCDocumentSchema: z.ZodObject<{
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
}>;
export type KYCDocument = z.infer<typeof KYCDocumentSchema>;
declare const CommonCustomerResourceSchema: z.ZodObject<{
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
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
export type CommonCustomerResource = z.infer<typeof CommonCustomerResourceSchema>;
export declare const CustomerSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
export type Customer = z.infer<typeof CustomerSchema>;
export declare const GetCustomerSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetCustomer = z.infer<typeof GetCustomerSchema>;
export declare const CustomerResourceSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
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
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
            }, "strip", z.ZodTypeAny, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }, {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            };
        }, {
            type: "PAY_LATER";
            properties: {
                account_id: string;
                account_holder_name?: string | undefined;
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
export type CustomerResource = z.infer<typeof CustomerResourceSchema>;
export declare const GetCustomerByRefIdSchema: z.ZodObject<{
    reference_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reference_id: string;
}, {
    reference_id: string;
}>;
export type GetCustomerByRefId = z.infer<typeof GetCustomerByRefIdSchema>;
export declare const GetCustomerByRefIdResourceSchema: z.ZodObject<{
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
                    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                }, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                };
            }, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                }, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                };
            }, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
export type GetCustomerByRefIdResource = z.infer<typeof GetCustomerByRefIdResourceSchema>;
export type UpdatePayload = z.infer<typeof CommonCustomerResourceSchema>;
export declare const UpdateParamsSchema: z.ZodObject<{
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
                    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
                }, "strip", z.ZodTypeAny, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                }, {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
                };
            }, {
                type: "PAY_LATER";
                properties: {
                    account_id: string;
                    account_holder_name?: string | undefined;
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
                    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
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
export type UpdateParams = z.infer<typeof UpdateParamsSchema>;
export {};
//# sourceMappingURL=schema.d.ts.map