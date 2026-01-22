import { z } from "zod";
export declare const TokenParamsSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodString>;
    card_data: z.ZodOptional<z.ZodObject<{
        account_number: z.ZodString;
        exp_month: z.ZodString;
        exp_year: z.ZodString;
        card_holder_first_name: z.ZodString;
        card_holder_last_name: z.ZodString;
        card_holder_email: z.ZodString;
        card_holder_phone_number: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        exp_month: string;
        exp_year: string;
        card_holder_first_name: string;
        card_holder_last_name: string;
        card_holder_email: string;
        card_holder_phone_number: string;
    }, {
        account_number: string;
        exp_month: string;
        exp_year: string;
        card_holder_first_name: string;
        card_holder_last_name: string;
        card_holder_email: string;
        card_holder_phone_number: string;
    }>>;
    external_id: z.ZodOptional<z.ZodString>;
    card_cvn: z.ZodOptional<z.ZodString>;
    is_multiple_use: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
    should_authenticate: z.ZodDefault<z.ZodBoolean>;
    billing_details: z.ZodOptional<z.ZodObject<{
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
    }>>;
    mid_label: z.ZodString;
}, "strip", z.ZodTypeAny, {
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
}, {
    mid_label: string;
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
    is_multiple_use?: boolean | undefined;
    should_authenticate?: boolean | undefined;
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
}>;
export type TokenParams = z.infer<typeof TokenParamsSchema>;
declare const TokenStatusSchema: z.ZodUnion<[z.ZodLiteral<"IN_REVIEW">, z.ZodLiteral<"VERIFIED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"CAPTURED">, z.ZodLiteral<"REVERSED">, z.ZodLiteral<"AUTHORISED">]>;
declare const CardTypeSchema: z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">, z.ZodLiteral<"PREPAID">, z.ZodLiteral<"UNKNOWN">]>;
declare const CardBrandSchema: z.ZodUnion<[z.ZodLiteral<"VISA">, z.ZodLiteral<"MASTERCARD">, z.ZodLiteral<"JCB">, z.ZodLiteral<"AMEX">]>;
declare const TokenFailureReasonSchema: z.ZodUnion<[z.ZodLiteral<"AUTHENTICATION_FAILED">, z.ZodLiteral<"REVERSE_AUTHORIZATION_REJECTED_BY_BANK">, z.ZodLiteral<"PROCESSOR_ERROR">]>;
export declare const TokenErrorCodeSchema: z.ZodUnion<[z.ZodLiteral<"API_VALIDATION_ERROR">, z.ZodLiteral<"INVALID_JSON_FORMAT">, z.ZodLiteral<"ACCOUNT_NUMBER_INVALID_ERROR">, z.ZodLiteral<"VALIDATION_ERROR">, z.ZodLiteral<"BRAND_NOT_SUPPORTED_ERROR">, z.ZodLiteral<"AUTHENTICATION_REQUIRED_ERROR">, z.ZodLiteral<"REQUEST_FORBIDDEN_ERROR">, z.ZodLiteral<"VERIFICATION_TIMEOUT_ERROR">, z.ZodLiteral<"TEMPORARY_SERVICE_ERROR">, z.ZodLiteral<"CONNECTION_ERROR">]>;
export type TokenErrorCode = z.infer<typeof TokenErrorCodeSchema>;
export declare const CardInfoSchema: z.ZodObject<{
    bank: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
    type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">, z.ZodLiteral<"PREPAID">, z.ZodLiteral<"UNKNOWN">]>>;
    brand: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"VISA">, z.ZodLiteral<"MASTERCARD">, z.ZodLiteral<"JCB">, z.ZodLiteral<"AMEX">]>>;
    fingerprint: z.ZodOptional<z.ZodString>;
    card_art_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type?: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN" | undefined;
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    bank?: string | undefined;
    brand?: "VISA" | "MASTERCARD" | "JCB" | "AMEX" | undefined;
    fingerprint?: string | undefined;
    card_art_url?: string | undefined;
}, {
    type?: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN" | undefined;
    country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
    bank?: string | undefined;
    brand?: "VISA" | "MASTERCARD" | "JCB" | "AMEX" | undefined;
    fingerprint?: string | undefined;
    card_art_url?: string | undefined;
}>;
export type CardInfo = z.infer<typeof CardInfoSchema>;
export type TokenStatus = z.infer<typeof TokenStatusSchema>;
export type CardType = z.infer<typeof CardTypeSchema>;
export type CardBrand = z.infer<typeof CardBrandSchema>;
export type TokenFailureReason = z.infer<typeof TokenFailureReasonSchema>;
export declare const TokenResourceSchema: z.ZodObject<{
    id: z.ZodString;
    business_id: z.ZodOptional<z.ZodString>;
    created: z.ZodString;
    authentication_id: z.ZodString;
    external_id: z.ZodString;
    masked_card_number: z.ZodString;
    status: z.ZodString;
    payer_authentication_url: z.ZodOptional<z.ZodString>;
    failure_reason: z.ZodOptional<z.ZodString>;
    card_info: z.ZodOptional<z.ZodObject<{
        bank: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">, z.ZodLiteral<"PREPAID">, z.ZodLiteral<"UNKNOWN">]>>;
        brand: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"VISA">, z.ZodLiteral<"MASTERCARD">, z.ZodLiteral<"JCB">, z.ZodLiteral<"AMEX">]>>;
        fingerprint: z.ZodOptional<z.ZodString>;
        card_art_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type?: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        bank?: string | undefined;
        brand?: "VISA" | "MASTERCARD" | "JCB" | "AMEX" | undefined;
        fingerprint?: string | undefined;
        card_art_url?: string | undefined;
    }, {
        type?: "CREDIT" | "DEBIT" | "PREPAID" | "UNKNOWN" | undefined;
        country?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        bank?: string | undefined;
        brand?: "VISA" | "MASTERCARD" | "JCB" | "AMEX" | undefined;
        fingerprint?: string | undefined;
        card_art_url?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type TokenResource = z.infer<typeof TokenResourceSchema>;
export declare const GetTokemParamsSchema: z.ZodObject<{
    credit_card_token_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    credit_card_token_id: string;
}, {
    credit_card_token_id: string;
}>;
export declare const TokenAuthenticationSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodString>;
    token_id: z.ZodOptional<z.ZodString>;
    card_data: z.ZodOptional<z.ZodObject<{
        account_number: z.ZodString;
        exp_month: z.ZodString;
        exp_year: z.ZodString;
        card_holder_first_name: z.ZodString;
        card_holder_last_name: z.ZodString;
        card_holder_email: z.ZodString;
        card_holder_phone_number: z.ZodEffects<z.ZodString, string, string>;
    }, "strip", z.ZodTypeAny, {
        account_number: string;
        exp_month: string;
        exp_year: string;
        card_holder_first_name: string;
        card_holder_last_name: string;
        card_holder_email: string;
        card_holder_phone_number: string;
    }, {
        account_number: string;
        exp_month: string;
        exp_year: string;
        card_holder_first_name: string;
        card_holder_last_name: string;
        card_holder_email: string;
        card_holder_phone_number: string;
    }>>;
    external_id: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
    mid_label: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type TokenAuthentication = z.infer<typeof TokenAuthenticationSchema>;
export declare const TokenAuthenticationResourceSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodUnion<[z.ZodLiteral<"IN_REVIEW">, z.ZodLiteral<"VERIFIED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"CAPTURED">, z.ZodLiteral<"REVERSED">, z.ZodLiteral<"AUTHORISED">]>;
    external_id: z.ZodOptional<z.ZodString>;
    payer_authentication_url: z.ZodOptional<z.ZodString>;
    mid_label: z.ZodOptional<z.ZodString>;
    failure_reason: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"AUTHENTICATION_FAILED">, z.ZodLiteral<"REVERSE_AUTHORIZATION_REJECTED_BY_BANK">, z.ZodLiteral<"PROCESSOR_ERROR">]>>;
}, "strip", z.ZodTypeAny, {
    status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
    id: string;
    external_id?: string | undefined;
    mid_label?: string | undefined;
    failure_reason?: "AUTHENTICATION_FAILED" | "REVERSE_AUTHORIZATION_REJECTED_BY_BANK" | "PROCESSOR_ERROR" | undefined;
    payer_authentication_url?: string | undefined;
}, {
    status: "SUCCEEDED" | "FAILED" | "REVERSED" | "IN_REVIEW" | "VERIFIED" | "CAPTURED" | "AUTHORISED";
    id: string;
    external_id?: string | undefined;
    mid_label?: string | undefined;
    failure_reason?: "AUTHENTICATION_FAILED" | "REVERSE_AUTHORIZATION_REJECTED_BY_BANK" | "PROCESSOR_ERROR" | undefined;
    payer_authentication_url?: string | undefined;
}>;
export type TokenAuthenticationResource = z.infer<typeof TokenAuthenticationResourceSchema>;
export declare const TokenAuthorizationSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodString>;
    token_id: z.ZodOptional<z.ZodString>;
    capture: z.ZodDefault<z.ZodBoolean>;
    external_id: z.ZodOptional<z.ZodString>;
    authentication_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    capture: boolean;
    token_id?: string | undefined;
    amount?: string | undefined;
    external_id?: string | undefined;
    authentication_id?: string | undefined;
}, {
    token_id?: string | undefined;
    amount?: string | undefined;
    external_id?: string | undefined;
    authentication_id?: string | undefined;
    capture?: boolean | undefined;
}>;
export type TokenAuthorization = z.infer<typeof TokenAuthorizationSchema>;
export declare const ZeroAuthorizationSchema: z.ZodObject<{
    amount: z.ZodDefault<z.ZodString>;
    token_id: z.ZodOptional<z.ZodString>;
    capture: z.ZodDefault<z.ZodBoolean>;
    external_id: z.ZodOptional<z.ZodString>;
    authentication_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amount: string;
    capture: boolean;
    token_id?: string | undefined;
    external_id?: string | undefined;
    authentication_id?: string | undefined;
}, {
    token_id?: string | undefined;
    amount?: string | undefined;
    external_id?: string | undefined;
    authentication_id?: string | undefined;
    capture?: boolean | undefined;
}>;
export type ZeroAuthorization = z.infer<typeof ZeroAuthorizationSchema>;
export declare const ReverseAuthorizationSchema: z.ZodObject<{
    external_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    external_id: string;
}, {
    external_id: string;
}>;
export type ReverseAuthorizationParams = z.infer<typeof ReverseAuthorizationSchema>;
export declare const PromotionSummarySchema: z.ZodObject<{
    reference_id: z.ZodString;
    original_amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    reference_id: string;
    original_amount: number;
}, {
    reference_id: string;
    original_amount: number;
}>;
export type PromotionSummary = z.infer<typeof PromotionSummarySchema>;
export declare const IntervalSchema: z.ZodLiteral<"month">;
export declare const InstallmentSummary: z.ZodObject<{
    count: z.ZodOptional<z.ZodNumber>;
    interval: z.ZodOptional<z.ZodLiteral<"month">>;
}, "strip", z.ZodTypeAny, {
    count?: number | undefined;
    interval?: "month" | undefined;
}, {
    count?: number | undefined;
    interval?: "month" | undefined;
}>;
export declare const ECICodeSchema: z.ZodUnion<[z.ZodLiteral<"0">, z.ZodLiteral<"1">, z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">]>;
export declare const CreateChargeSchema: z.ZodObject<{
    token_id: z.ZodString;
    external_id: z.ZodString;
    amount: z.ZodNumber;
    authentication_id: z.ZodOptional<z.ZodString>;
    capture: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    descriptor: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>>;
    mid_label: z.ZodOptional<z.ZodString>;
    billing_details: z.ZodOptional<z.ZodObject<{
        given_names: z.ZodString;
        surname: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
        phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    }, "strip", z.ZodTypeAny, {
        given_names: string;
        surname?: string | undefined;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
    }, {
        given_names: string;
        surname?: string | undefined;
        email?: string | undefined;
        mobile_number?: string | undefined;
        phone_number?: string | undefined;
    }>>;
    promotion: z.ZodOptional<z.ZodObject<{
        reference_id: z.ZodString;
        original_amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        reference_id: string;
        original_amount: number;
    }, {
        reference_id: string;
        original_amount: number;
    }>>;
    installment: z.ZodOptional<z.ZodObject<{
        count: z.ZodOptional<z.ZodNumber>;
        interval: z.ZodOptional<z.ZodLiteral<"month">>;
    }, "strip", z.ZodTypeAny, {
        count?: number | undefined;
        interval?: "month" | undefined;
    }, {
        count?: number | undefined;
        interval?: "month" | undefined;
    }>>;
    metadata: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strip", z.ZodTypeAny, {
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
}, {
    token_id: string;
    amount: number;
    external_id: string;
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
    capture?: boolean | undefined;
    descriptor?: string | undefined;
    promotion?: {
        reference_id: string;
        original_amount: number;
    } | undefined;
    installment?: {
        count?: number | undefined;
        interval?: "month" | undefined;
    } | undefined;
}>;
export declare const ChargeTypeSchema: z.ZodUnion<[z.ZodLiteral<"SINGLE_USE_TOKEN">, z.ZodLiteral<"MULTIPLE_USE_TOKEN">, z.ZodLiteral<"RECURRING">]>;
export type CreateCharge = z.infer<typeof CreateChargeSchema>;
export declare const ChargeResourceSchema: z.ZodObject<{
    created: z.ZodString;
    status: z.ZodUnion<[z.ZodLiteral<"IN_REVIEW">, z.ZodLiteral<"VERIFIED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"CAPTURED">, z.ZodLiteral<"REVERSED">, z.ZodLiteral<"AUTHORISED">]>;
    business_id: z.ZodString;
    authorized_amount: z.ZodNumber;
    external_id: z.ZodString;
    merchant_id: z.ZodString;
    merchant_reference_code: z.ZodString;
    card_type: z.ZodUnion<[z.ZodLiteral<"CREDIT">, z.ZodLiteral<"DEBIT">, z.ZodLiteral<"PREPAID">, z.ZodLiteral<"UNKNOWN">]>;
    masked_card_number: z.ZodString;
    charge_type: z.ZodUnion<[z.ZodLiteral<"SINGLE_USE_TOKEN">, z.ZodLiteral<"MULTIPLE_USE_TOKEN">, z.ZodLiteral<"RECURRING">]>;
    card_brand: z.ZodUnion<[z.ZodLiteral<"VISA">, z.ZodLiteral<"MASTERCARD">, z.ZodLiteral<"JCB">, z.ZodLiteral<"AMEX">]>;
    bank_reconciliation_id: z.ZodString;
    failure_reason: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"AUTHENTICATION_FAILED">, z.ZodLiteral<"DECLINED_BY_ISSUER">, z.ZodLiteral<"DECLINED_BY_PROCESSOR">, z.ZodLiteral<"EXPIRED_CARD">, z.ZodLiteral<"ISSUER_SUSPECT_FRAUD">, z.ZodLiteral<"INACTIVE_OR_UNAUTHORIZED_CARD">, z.ZodLiteral<"INSUFFICIENT_BALANCE">, z.ZodLiteral<"INVALID_CARD">, z.ZodLiteral<"INVALID_CVV">, z.ZodLiteral<"ISSUER_UNAVAILABLE">, z.ZodLiteral<"PROCESSOR_ERROR">, z.ZodLiteral<"STOLEN_CARD">, z.ZodLiteral<"PROCESSOR_TIMEOUT">, z.ZodLiteral<"FRAUD_RISK_BLOCKED">]>>;
    eci: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"0">, z.ZodLiteral<"1">, z.ZodLiteral<"2">, z.ZodLiteral<"3">, z.ZodLiteral<"4">, z.ZodLiteral<"5">]>>;
    cvn_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"M">, z.ZodLiteral<"N">, z.ZodLiteral<"P">]>>;
    capture_amount: z.ZodOptional<z.ZodNumber>;
    descriptor: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
    mid_label: z.ZodOptional<z.ZodString>;
    promotion: z.ZodOptional<z.ZodObject<{
        reference_id: z.ZodString;
        original_amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        reference_id: string;
        original_amount: number;
    }, {
        reference_id: string;
        original_amount: number;
    }>>;
    installment: z.ZodOptional<z.ZodObject<{
        count: z.ZodOptional<z.ZodNumber>;
        interval: z.ZodOptional<z.ZodLiteral<"month">>;
    }, "strip", z.ZodTypeAny, {
        count?: number | undefined;
        interval?: "month" | undefined;
    }, {
        count?: number | undefined;
        interval?: "month" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type ChargeResource = z.infer<typeof ChargeResourceSchema>;
export {};
//# sourceMappingURL=schema.d.ts.map