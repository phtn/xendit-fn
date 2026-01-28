import { z } from "zod";
export declare const PaymentMethodTypeSchema: z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>;
export type PaymentMethodType = z.infer<typeof PaymentMethodTypeSchema>;
export declare const PaymentMethodStatusSchema: z.ZodUnion<[z.ZodLiteral<"ACTIVE">, z.ZodLiteral<"INACTIVE">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"EXPIRED">, z.ZodLiteral<"FAILED">]>;
export type PaymentMethodStatus = z.infer<typeof PaymentMethodStatusSchema>;
export declare const CardPropertiesSchema: z.ZodObject<{
    card_last_four: z.ZodString;
    card_expiry_month: z.ZodString;
    card_expiry_year: z.ZodString;
    network: z.ZodString;
    country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
    issuer: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">]>>;
    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
}, "strip", z.ZodTypeAny, {
    card_last_four: string;
    card_expiry_month: string;
    card_expiry_year: string;
    network: string;
    type?: "CREDIT" | "DEBIT" | undefined;
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
    issuer?: string | undefined;
}, {
    card_last_four: string;
    card_expiry_month: string;
    card_expiry_year: string;
    network: string;
    type?: "CREDIT" | "DEBIT" | undefined;
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
    issuer?: string | undefined;
}>;
export declare const BankAccountPropertiesSchema: z.ZodObject<{
    account_number: z.ZodString;
    account_holder_name: z.ZodString;
    bank_code: z.ZodString;
    account_type: z.ZodOptional<z.ZodString>;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
}, "strip", z.ZodTypeAny, {
    account_number: string;
    account_holder_name: string;
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    bank_code: string;
    account_type?: string | undefined;
}, {
    account_number: string;
    account_holder_name: string;
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    bank_code: string;
    account_type?: string | undefined;
}>;
export declare const EwalletPropertiesSchema: z.ZodObject<{
    account_details: z.ZodString;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
}, "strip", z.ZodTypeAny, {
    account_details: string;
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
}, {
    account_details: string;
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
}>;
export declare const PaymentMethodPropertiesSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"CARD">;
    card: z.ZodObject<{
        card_last_four: z.ZodString;
        card_expiry_month: z.ZodString;
        card_expiry_year: z.ZodString;
        network: z.ZodString;
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
        issuer: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">]>>;
        currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
    }, "strip", z.ZodTypeAny, {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    }, {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "CARD";
    card: {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    };
}, {
    type: "CARD";
    card: {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"BANK_ACCOUNT">;
    bank_account: z.ZodObject<{
        account_number: z.ZodString;
        account_holder_name: z.ZodString;
        bank_code: z.ZodString;
        account_type: z.ZodOptional<z.ZodString>;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    }, {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "BANK_ACCOUNT";
    bank_account: {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    };
}, {
    type: "BANK_ACCOUNT";
    bank_account: {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"EWALLET">;
    ewallet: z.ZodObject<{
        account_details: z.ZodString;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    }, "strip", z.ZodTypeAny, {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    }, {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    }>;
}, "strip", z.ZodTypeAny, {
    type: "EWALLET";
    ewallet: {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    };
}, {
    type: "EWALLET";
    ewallet: {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    };
}>]>;
export declare const CreatePaymentMethodSchema: z.ZodObject<{
    type: z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>;
    country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
    reusability: z.ZodUnion<[z.ZodLiteral<"ONE_TIME_USE">, z.ZodLiteral<"MULTIPLE_USE">]>;
    description: z.ZodOptional<z.ZodString>;
    reference_id: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    card: z.ZodOptional<z.ZodObject<{
        currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
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
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    }, {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    }>>;
    bank_account: z.ZodOptional<z.ZodObject<{
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
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
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        channel_properties?: {
            card_last_four?: string | undefined;
            card_expiry_month?: string | undefined;
            card_expiry_year?: string | undefined;
            account_mobile_number?: string | undefined;
            account_email?: string | undefined;
        } | undefined;
    }, {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
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
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
    card?: {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    } | undefined;
    bank_account?: {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
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
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
    card?: {
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        channel_properties?: {
            success_return_url?: string | undefined;
            failure_return_url?: string | undefined;
        } | undefined;
    } | undefined;
    bank_account?: {
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
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
export type CreatePaymentMethod = z.infer<typeof CreatePaymentMethodSchema>;
export declare const UpdatePaymentMethodSchema: z.ZodObject<{
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
export type UpdatePaymentMethod = z.infer<typeof UpdatePaymentMethodSchema>;
export declare const PaymentMethodResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>;
    country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
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
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
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
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    }, {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    }>>;
    failure_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    created: z.ZodString;
    updated: z.ZodString;
    card: z.ZodOptional<z.ZodObject<{
        card_last_four: z.ZodString;
        card_expiry_month: z.ZodString;
        card_expiry_year: z.ZodString;
        network: z.ZodString;
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
        issuer: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">]>>;
        currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
    }, "strip", z.ZodTypeAny, {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    }, {
        card_last_four: string;
        card_expiry_month: string;
        card_expiry_year: string;
        network: string;
        type?: "CREDIT" | "DEBIT" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    }>>;
    bank_account: z.ZodOptional<z.ZodObject<{
        account_number: z.ZodString;
        account_holder_name: z.ZodString;
        bank_code: z.ZodString;
        account_type: z.ZodOptional<z.ZodString>;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    }, {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    }>>;
    ewallet: z.ZodOptional<z.ZodObject<{
        account_details: z.ZodString;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    }, "strip", z.ZodTypeAny, {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    }, {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
    type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
    id: string;
    created: string;
    updated: string;
    business_id: string;
    reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
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
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    } | undefined;
    bank_account?: {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    } | undefined;
    ewallet?: {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    } | undefined;
    billing_information?: {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    } | undefined;
}, {
    status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
    type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
    id: string;
    created: string;
    updated: string;
    business_id: string;
    reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
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
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
        issuer?: string | undefined;
    } | undefined;
    bank_account?: {
        account_number: string;
        account_holder_name: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        bank_code: string;
        account_type?: string | undefined;
    } | undefined;
    ewallet?: {
        account_details: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    } | undefined;
    billing_information?: {
        street_line1?: string | undefined;
        street_line2?: string | undefined;
        city?: string | undefined;
        province_state?: string | undefined;
        postal_code?: string | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
    } | undefined;
}>;
export type PaymentMethodResource = z.infer<typeof PaymentMethodResourceSchema>;
export declare const GetPaymentMethodSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetPaymentMethod = z.infer<typeof GetPaymentMethodSchema>;
export declare const ListPaymentMethodsSchema: z.ZodObject<{
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
export type ListPaymentMethods = z.infer<typeof ListPaymentMethodsSchema>;
export declare const ListPaymentMethodsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodUnion<[z.ZodLiteral<"CARD">, z.ZodLiteral<"BANK_ACCOUNT">, z.ZodLiteral<"EWALLET">, z.ZodLiteral<"OVER_THE_COUNTER">, z.ZodLiteral<"VIRTUAL_ACCOUNT">, z.ZodLiteral<"QR_CODE">]>;
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
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
            country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
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
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        }, {
            street_line1?: string | undefined;
            street_line2?: string | undefined;
            city?: string | undefined;
            province_state?: string | undefined;
            postal_code?: string | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        }>>;
        failure_code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        created: z.ZodString;
        updated: z.ZodString;
        card: z.ZodOptional<z.ZodObject<{
            card_last_four: z.ZodString;
            card_expiry_month: z.ZodString;
            card_expiry_year: z.ZodString;
            network: z.ZodString;
            country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>>;
            issuer: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">]>>;
            currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>>;
        }, "strip", z.ZodTypeAny, {
            card_last_four: string;
            card_expiry_month: string;
            card_expiry_year: string;
            network: string;
            type?: "CREDIT" | "DEBIT" | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            issuer?: string | undefined;
        }, {
            card_last_four: string;
            card_expiry_month: string;
            card_expiry_year: string;
            network: string;
            type?: "CREDIT" | "DEBIT" | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            issuer?: string | undefined;
        }>>;
        bank_account: z.ZodOptional<z.ZodObject<{
            account_number: z.ZodString;
            account_holder_name: z.ZodString;
            bank_code: z.ZodString;
            account_type: z.ZodOptional<z.ZodString>;
            currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
        }, "strip", z.ZodTypeAny, {
            account_number: string;
            account_holder_name: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
            bank_code: string;
            account_type?: string | undefined;
        }, {
            account_number: string;
            account_holder_name: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
            bank_code: string;
            account_type?: string | undefined;
        }>>;
        ewallet: z.ZodOptional<z.ZodObject<{
            account_details: z.ZodString;
            currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
        }, "strip", z.ZodTypeAny, {
            account_details: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        }, {
            account_details: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        }>>;
    }, "strip", z.ZodTypeAny, {
        status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
        type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
        id: string;
        created: string;
        updated: string;
        business_id: string;
        reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
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
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            issuer?: string | undefined;
        } | undefined;
        bank_account?: {
            account_number: string;
            account_holder_name: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
            bank_code: string;
            account_type?: string | undefined;
        } | undefined;
        ewallet?: {
            account_details: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        } | undefined;
        billing_information?: {
            street_line1?: string | undefined;
            street_line2?: string | undefined;
            city?: string | undefined;
            province_state?: string | undefined;
            postal_code?: string | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        } | undefined;
    }, {
        status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
        type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
        id: string;
        created: string;
        updated: string;
        business_id: string;
        reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
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
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            issuer?: string | undefined;
        } | undefined;
        bank_account?: {
            account_number: string;
            account_holder_name: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
            bank_code: string;
            account_type?: string | undefined;
        } | undefined;
        ewallet?: {
            account_details: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        } | undefined;
        billing_information?: {
            street_line1?: string | undefined;
            street_line2?: string | undefined;
            city?: string | undefined;
            province_state?: string | undefined;
            postal_code?: string | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        } | undefined;
    }>, "many">;
    has_more: z.ZodBoolean;
    links: z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        rel: z.ZodString;
        method: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        method: string;
        href: string;
        rel: string;
    }, {
        method: string;
        href: string;
        rel: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
        type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
        id: string;
        created: string;
        updated: string;
        business_id: string;
        reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
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
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            issuer?: string | undefined;
        } | undefined;
        bank_account?: {
            account_number: string;
            account_holder_name: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
            bank_code: string;
            account_type?: string | undefined;
        } | undefined;
        ewallet?: {
            account_details: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        } | undefined;
        billing_information?: {
            street_line1?: string | undefined;
            street_line2?: string | undefined;
            city?: string | undefined;
            province_state?: string | undefined;
            postal_code?: string | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        } | undefined;
    }[];
    has_more: boolean;
    links: {
        method: string;
        href: string;
        rel: string;
    }[];
}, {
    data: {
        status: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED";
        type: "BANK_ACCOUNT" | "EWALLET" | "QR_CODE" | "CARD" | "OVER_THE_COUNTER" | "VIRTUAL_ACCOUNT";
        id: string;
        created: string;
        updated: string;
        business_id: string;
        reusability: "ONE_TIME_USE" | "MULTIPLE_USE";
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
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
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
            currency?: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD" | undefined;
            issuer?: string | undefined;
        } | undefined;
        bank_account?: {
            account_number: string;
            account_holder_name: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
            bank_code: string;
            account_type?: string | undefined;
        } | undefined;
        ewallet?: {
            account_details: string;
            currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        } | undefined;
        billing_information?: {
            street_line1?: string | undefined;
            street_line2?: string | undefined;
            city?: string | undefined;
            province_state?: string | undefined;
            postal_code?: string | undefined;
            country?: "PH" | "ID" | "MY" | "TH" | "VN" | "SG" | undefined;
        } | undefined;
    }[];
    has_more: boolean;
    links: {
        method: string;
        href: string;
        rel: string;
    }[];
}>;
export type ListPaymentMethodsResponse = z.infer<typeof ListPaymentMethodsResponseSchema>;
export declare const UpdatePaymentMethodParamsSchema: z.ZodObject<{
    id: z.ZodString;
    payload: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    id: string;
    payload: {
        status?: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED" | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        reference_id?: string | undefined;
    };
}, {
    id: string;
    payload: {
        status?: "PENDING" | "FAILED" | "ACTIVE" | "INACTIVE" | "EXPIRED" | undefined;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        reference_id?: string | undefined;
    };
}>;
export type UpdatePaymentMethodParams = z.infer<typeof UpdatePaymentMethodParamsSchema>;
//# sourceMappingURL=schema.d.ts.map