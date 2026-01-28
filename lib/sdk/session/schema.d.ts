import { z } from "zod";
export declare const SessionTypeSchema: z.ZodUnion<[z.ZodLiteral<"SAVE">, z.ZodLiteral<"PAY">]>;
export type SessionType = z.infer<typeof SessionTypeSchema>;
export declare const AllowSavePaymentMethodSchema: z.ZodUnion<[z.ZodLiteral<"DISABLED">, z.ZodLiteral<"OPTIONAL">, z.ZodLiteral<"FORCED">]>;
export type AllowSavePaymentMethod = z.infer<typeof AllowSavePaymentMethodSchema>;
export declare const SessionModeSchema: z.ZodUnion<[z.ZodLiteral<"PAYMENT_LINK">, z.ZodLiteral<"COMPONENTS">]>;
export type SessionMode = z.infer<typeof SessionModeSchema>;
export declare const CaptureMethodSchema: z.ZodUnion<[z.ZodLiteral<"AUTOMATIC">, z.ZodLiteral<"MANUAL">]>;
export type CaptureMethod = z.infer<typeof CaptureMethodSchema>;
export declare const SessionStatusSchema: z.ZodUnion<[z.ZodLiteral<"ACTIVE">, z.ZodLiteral<"COMPLETED">, z.ZodLiteral<"EXPIRED">, z.ZodLiteral<"CANCELED">]>;
export type SessionStatus = z.infer<typeof SessionStatusSchema>;
export declare const ItemTypeSchema: z.ZodUnion<[z.ZodLiteral<"DIGITAL_PRODUCT">, z.ZodLiteral<"PHYSICAL_PRODUCT">, z.ZodLiteral<"DIGITAL_SERVICE">, z.ZodLiteral<"PHYSICAL_SERVICE">, z.ZodLiteral<"FEE">]>;
export type ItemType = z.infer<typeof ItemTypeSchema>;
export declare const GenderSchema: z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>;
export type Gender = z.infer<typeof GenderSchema>;
export declare const IndividualDetailSchema: z.ZodObject<{
    given_names: z.ZodString;
    surname: z.ZodOptional<z.ZodString>;
    nationality: z.ZodOptional<z.ZodString>;
    place_of_birth: z.ZodOptional<z.ZodString>;
    date_of_birth: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
}, "strip", z.ZodTypeAny, {
    given_names: string;
    surname?: string | undefined;
    nationality?: string | undefined;
    place_of_birth?: string | undefined;
    date_of_birth?: string | undefined;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
}, {
    given_names: string;
    surname?: string | undefined;
    nationality?: string | undefined;
    place_of_birth?: string | undefined;
    date_of_birth?: string | undefined;
    gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
}>;
export type IndividualDetail = z.infer<typeof IndividualDetailSchema>;
export declare const PaymentSessionCustomerDetailsSchema: z.ZodObject<{
    type: z.ZodLiteral<"INDIVIDUAL">;
    reference_id: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    mobile_number: z.ZodOptional<z.ZodString>;
    individual_detail: z.ZodObject<{
        given_names: z.ZodString;
        surname: z.ZodOptional<z.ZodString>;
        nationality: z.ZodOptional<z.ZodString>;
        place_of_birth: z.ZodOptional<z.ZodString>;
        date_of_birth: z.ZodOptional<z.ZodString>;
        gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
    }, "strip", z.ZodTypeAny, {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    }, {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "INDIVIDUAL";
    individual_detail: {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    };
    reference_id: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
}, {
    type: "INDIVIDUAL";
    individual_detail: {
        given_names: string;
        surname?: string | undefined;
        nationality?: string | undefined;
        place_of_birth?: string | undefined;
        date_of_birth?: string | undefined;
        gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
    };
    reference_id: string;
    email?: string | undefined;
    mobile_number?: string | undefined;
}>;
export type PaymentSessionCustomerDetails = z.infer<typeof PaymentSessionCustomerDetailsSchema>;
export declare const PaymentSessionItemSchema: z.ZodObject<{
    reference_id: z.ZodString;
    type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"DIGITAL_PRODUCT">, z.ZodLiteral<"PHYSICAL_PRODUCT">, z.ZodLiteral<"DIGITAL_SERVICE">, z.ZodLiteral<"PHYSICAL_SERVICE">, z.ZodLiteral<"FEE">]>>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    net_unit_amount: z.ZodNumber;
    quantity: z.ZodNumber;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    url: z.ZodOptional<z.ZodString>;
    image_url: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    subcategory: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    category: string;
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    name: string;
    quantity: number;
    net_unit_amount: number;
    url?: string | undefined;
    type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | undefined;
    subcategory?: string | undefined;
    image_url?: string | undefined;
}, {
    category: string;
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    name: string;
    quantity: number;
    net_unit_amount: number;
    url?: string | undefined;
    type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | undefined;
    subcategory?: string | undefined;
    image_url?: string | undefined;
}>;
export type PaymentSessionItem = z.infer<typeof PaymentSessionItemSchema>;
export declare const ChannelPropertiesSchema: z.ZodObject<{
    allowed_payment_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    allowed_payment_channels?: string[] | undefined;
}, {
    allowed_payment_channels?: string[] | undefined;
}>;
export type ChannelProperties = z.infer<typeof ChannelPropertiesSchema>;
export declare const MerchantMetadataSchema: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>>;
export type MerchantMetadata = z.infer<typeof MerchantMetadataSchema>;
export declare const CreateSessionSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    reference_id: z.ZodString;
    customer_id: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"INDIVIDUAL">;
        reference_id: z.ZodString;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodString>;
        individual_detail: z.ZodObject<{
            given_names: z.ZodString;
            surname: z.ZodOptional<z.ZodString>;
            nationality: z.ZodOptional<z.ZodString>;
            place_of_birth: z.ZodOptional<z.ZodString>;
            date_of_birth: z.ZodOptional<z.ZodString>;
            gender: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"MALE">, z.ZodLiteral<"FEMALE">, z.ZodLiteral<"OTHER">]>>;
        }, "strip", z.ZodTypeAny, {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        }, {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    }, {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    }>>;
    session_type: z.ZodUnion<[z.ZodLiteral<"SAVE">, z.ZodLiteral<"PAY">]>;
    allow_save_payment_method: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"DISABLED">, z.ZodLiteral<"OPTIONAL">, z.ZodLiteral<"FORCED">]>>;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    amount: z.ZodNumber;
    mode: z.ZodUnion<[z.ZodLiteral<"PAYMENT_LINK">, z.ZodLiteral<"COMPONENTS">]>;
    capture_method: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"AUTOMATIC">, z.ZodLiteral<"MANUAL">]>>;
    country: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>;
    channel_properties: z.ZodOptional<z.ZodObject<{
        allowed_payment_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowed_payment_channels?: string[] | undefined;
    }, {
        allowed_payment_channels?: string[] | undefined;
    }>>;
    expires_at: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>>;
    description: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"DIGITAL_PRODUCT">, z.ZodLiteral<"PHYSICAL_PRODUCT">, z.ZodLiteral<"DIGITAL_SERVICE">, z.ZodLiteral<"PHYSICAL_SERVICE">, z.ZodLiteral<"FEE">]>>;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        net_unit_amount: z.ZodNumber;
        quantity: z.ZodNumber;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
        url: z.ZodOptional<z.ZodString>;
        image_url: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        subcategory: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }, {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }>, "many">>>;
    success_return_url: z.ZodOptional<z.ZodString>;
    cancel_return_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    amount: number;
    session_type: "PAY" | "SAVE";
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    customer?: {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    } | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    amount: number;
    session_type: "PAY" | "SAVE";
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    customer?: {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    } | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}>, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    amount: number;
    session_type: "PAY" | "SAVE";
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    customer?: {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    } | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    amount: number;
    session_type: "PAY" | "SAVE";
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    customer?: {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    } | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}>, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    amount: number;
    session_type: "PAY" | "SAVE";
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    customer?: {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    } | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    amount: number;
    session_type: "PAY" | "SAVE";
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    customer?: {
        type: "INDIVIDUAL";
        individual_detail: {
            given_names: string;
            surname?: string | undefined;
            nationality?: string | undefined;
            place_of_birth?: string | undefined;
            date_of_birth?: string | undefined;
            gender?: "MALE" | "FEMALE" | "OTHER" | undefined;
        };
        reference_id: string;
        email?: string | undefined;
        mobile_number?: string | undefined;
    } | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}>;
export type CreateSession = z.infer<typeof CreateSessionSchema>;
export declare const SessionResourceSchema: z.ZodObject<{
    payment_session_id: z.ZodString;
    created: z.ZodString;
    updated: z.ZodString;
    reference_id: z.ZodString;
    customer_id: z.ZodOptional<z.ZodString>;
    session_type: z.ZodUnion<[z.ZodLiteral<"SAVE">, z.ZodLiteral<"PAY">]>;
    allow_save_payment_method: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"DISABLED">, z.ZodLiteral<"OPTIONAL">, z.ZodLiteral<"FORCED">]>>;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    amount: z.ZodNumber;
    country: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">, z.ZodLiteral<"SG">]>;
    mode: z.ZodUnion<[z.ZodLiteral<"PAYMENT_LINK">, z.ZodLiteral<"COMPONENTS">]>;
    capture_method: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"AUTOMATIC">, z.ZodLiteral<"MANUAL">]>>;
    channel_properties: z.ZodOptional<z.ZodObject<{
        allowed_payment_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowed_payment_channels?: string[] | undefined;
    }, {
        allowed_payment_channels?: string[] | undefined;
    }>>;
    allowed_payment_channels: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    expires_at: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodString>, Record<string, string>, Record<string, string>>>>;
    description: z.ZodOptional<z.ZodString>;
    items: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        reference_id: z.ZodString;
        type: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"DIGITAL_PRODUCT">, z.ZodLiteral<"PHYSICAL_PRODUCT">, z.ZodLiteral<"DIGITAL_SERVICE">, z.ZodLiteral<"PHYSICAL_SERVICE">, z.ZodLiteral<"FEE">]>>;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        net_unit_amount: z.ZodNumber;
        quantity: z.ZodNumber;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
        url: z.ZodOptional<z.ZodString>;
        image_url: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        subcategory: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }, {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }>, "many">>>;
    success_return_url: z.ZodOptional<z.ZodString>;
    cancel_return_url: z.ZodOptional<z.ZodString>;
    status: z.ZodUnion<[z.ZodLiteral<"ACTIVE">, z.ZodLiteral<"COMPLETED">, z.ZodLiteral<"EXPIRED">, z.ZodLiteral<"CANCELED">]>;
    payment_link_url: z.ZodNullable<z.ZodString>;
    payment_token_id: z.ZodNullable<z.ZodString>;
    payment_id: z.ZodNullable<z.ZodString>;
    payment_request_id: z.ZodNullable<z.ZodString>;
    business_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    status: "ACTIVE" | "EXPIRED" | "CANCELED" | "COMPLETED";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    created: string;
    updated: string;
    amount: number;
    business_id: string;
    payment_id: string | null;
    payment_request_id: string | null;
    session_type: "PAY" | "SAVE";
    payment_session_id: string;
    payment_link_url: string | null;
    payment_token_id: string | null;
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allowed_payment_channels?: string[] | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}, {
    mode: "PAYMENT_LINK" | "COMPONENTS";
    status: "ACTIVE" | "EXPIRED" | "CANCELED" | "COMPLETED";
    country: "PH" | "ID" | "MY" | "TH" | "VN" | "SG";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    reference_id: string;
    created: string;
    updated: string;
    amount: number;
    business_id: string;
    payment_id: string | null;
    payment_request_id: string | null;
    session_type: "PAY" | "SAVE";
    payment_session_id: string;
    payment_link_url: string | null;
    payment_token_id: string | null;
    expires_at?: string | undefined;
    description?: string | undefined;
    metadata?: Record<string, string> | null | undefined;
    channel_properties?: {
        allowed_payment_channels?: string[] | undefined;
    } | undefined;
    customer_id?: string | undefined;
    success_return_url?: string | undefined;
    cancel_return_url?: string | undefined;
    items?: {
        category: string;
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        reference_id: string;
        name: string;
        quantity: number;
        net_unit_amount: number;
        url?: string | undefined;
        type?: "FEE" | "DIGITAL_PRODUCT" | "PHYSICAL_PRODUCT" | "DIGITAL_SERVICE" | "PHYSICAL_SERVICE" | undefined;
        description?: string | undefined;
        metadata?: Record<string, string> | undefined;
        subcategory?: string | undefined;
        image_url?: string | undefined;
    }[] | null | undefined;
    locale?: string | undefined;
    capture_method?: "AUTOMATIC" | "MANUAL" | undefined;
    allowed_payment_channels?: string[] | undefined;
    allow_save_payment_method?: "DISABLED" | "OPTIONAL" | "FORCED" | undefined;
}>;
export type SessionResource = z.infer<typeof SessionResourceSchema>;
//# sourceMappingURL=schema.d.ts.map