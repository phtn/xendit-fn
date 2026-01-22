import { z } from "zod";
export declare const PaymentRequestTypeSchema: z.ZodUnion<[z.ZodLiteral<"PAY">, z.ZodLiteral<"PAY_AND_SAVE">, z.ZodLiteral<"REUSABLE_PAYMENT_CODE">]>;
export type PaymentRequestType = z.infer<typeof PaymentRequestTypeSchema>;
export declare const CaptureMethodSchema: z.ZodUnion<[z.ZodLiteral<"AUTOMATIC">, z.ZodLiteral<"MANUAL">]>;
export type CaptureMethod = z.infer<typeof CaptureMethodSchema>;
export declare const PaymentRequestStatusSchema: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"REQUIRES_ACTION">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"VOIDED">, z.ZodLiteral<"CANCELED">]>;
export type PaymentRequestStatus = z.infer<typeof PaymentRequestStatusSchema>;
export declare const ChannelCodeSchema: z.ZodString;
export type ChannelCode = z.infer<typeof ChannelCodeSchema>;
export declare const ChannelPropertiesSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export type ChannelProperties = z.infer<typeof ChannelPropertiesSchema>;
export declare const PaymentMethodSchema: z.ZodObject<{
    type: z.ZodString;
    card_information: z.ZodOptional<z.ZodObject<{
        token_id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token_id: string;
    }, {
        token_id: string;
    }>>;
    ewallet: z.ZodOptional<z.ZodObject<{
        channel_code: z.ZodString;
        channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }>>;
    direct_debit: z.ZodOptional<z.ZodObject<{
        channel_code: z.ZodString;
        channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }>>;
    over_the_counter: z.ZodOptional<z.ZodObject<{
        channel_code: z.ZodString;
        channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }>>;
    qr_code: z.ZodOptional<z.ZodObject<{
        channel_code: z.ZodString;
        channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }>>;
    virtual_account: z.ZodOptional<z.ZodObject<{
        channel_code: z.ZodString;
        channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }, {
        channel_code: string;
        channel_properties?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;
export declare const CreatePaymentRequestSchema: z.ZodObject<{
    reference_id: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"PAY">, z.ZodLiteral<"PAY_AND_SAVE">, z.ZodLiteral<"REUSABLE_PAYMENT_CODE">]>;
    country: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    request_amount: z.ZodNumber;
    payment_method: z.ZodObject<{
        type: z.ZodString;
        card_information: z.ZodOptional<z.ZodObject<{
            token_id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            token_id: string;
        }, {
            token_id: string;
        }>>;
        ewallet: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        direct_debit: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        over_the_counter: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        qr_code: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        virtual_account: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    customer_id: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        given_names: z.ZodString;
        surname: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        given_names: string;
        surname?: string | undefined;
        email?: string | undefined;
        mobile_number?: string | undefined;
    }, {
        given_names: string;
        surname?: string | undefined;
        email?: string | undefined;
        mobile_number?: string | undefined;
    }>>;
    shipping_information: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        phone_number: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        province: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        phone_number?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        address?: string | undefined;
        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        province?: string | undefined;
    }, {
        name: string;
        phone_number?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        address?: string | undefined;
        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        province?: string | undefined;
    }>>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        reference_id: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
        reference_id?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
        reference_id?: string | undefined;
    }>, "many">>;
    capture_method: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"AUTOMATIC">, z.ZodLiteral<"MANUAL">]>>;
    success_redirect_url: z.ZodOptional<z.ZodString>;
    failure_redirect_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type CreatePaymentRequest = z.infer<typeof CreatePaymentRequestSchema>;
export declare const PaymentRequestResourceSchema: z.ZodObject<{
    id: z.ZodString;
    reference_id: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"PAY">, z.ZodLiteral<"PAY_AND_SAVE">, z.ZodLiteral<"REUSABLE_PAYMENT_CODE">]>;
    country: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
    request_amount: z.ZodNumber;
    paid_amount: z.ZodOptional<z.ZodNumber>;
    status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"REQUIRES_ACTION">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"VOIDED">, z.ZodLiteral<"CANCELED">]>;
    payment_method: z.ZodObject<{
        type: z.ZodString;
        card_information: z.ZodOptional<z.ZodObject<{
            token_id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            token_id: string;
        }, {
            token_id: string;
        }>>;
        ewallet: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        direct_debit: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        over_the_counter: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        qr_code: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
        virtual_account: z.ZodOptional<z.ZodObject<{
            channel_code: z.ZodString;
            channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }, {
            channel_code: string;
            channel_properties?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    customer_id: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodObject<{
        given_names: z.ZodString;
        surname: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        mobile_number: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        given_names: string;
        surname?: string | undefined;
        email?: string | undefined;
        mobile_number?: string | undefined;
    }, {
        given_names: string;
        surname?: string | undefined;
        email?: string | undefined;
        mobile_number?: string | undefined;
    }>>;
    shipping_information: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        phone_number: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        province: z.ZodOptional<z.ZodString>;
        postal_code: z.ZodOptional<z.ZodString>;
        country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        phone_number?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        address?: string | undefined;
        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        province?: string | undefined;
    }, {
        name: string;
        phone_number?: string | undefined;
        city?: string | undefined;
        postal_code?: string | undefined;
        address?: string | undefined;
        country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
        province?: string | undefined;
    }>>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        reference_id: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
        reference_id?: string | undefined;
    }, {
        name: string;
        price: number;
        quantity: number;
        url?: string | undefined;
        category?: string | undefined;
        reference_id?: string | undefined;
    }>, "many">>;
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
    created: z.ZodString;
    updated: z.ZodString;
    failure_reason: z.ZodOptional<z.ZodString>;
    payment_request_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type PaymentRequestResource = z.infer<typeof PaymentRequestResourceSchema>;
export declare const GetPaymentRequestSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetPaymentRequest = z.infer<typeof GetPaymentRequestSchema>;
export declare const ListPaymentRequestsSchema: z.ZodObject<{
    reference_id: z.ZodOptional<z.ZodString>;
    customer_id: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"REQUIRES_ACTION">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"VOIDED">, z.ZodLiteral<"CANCELED">]>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: ("SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REQUIRES_ACTION" | "CANCELED")[] | undefined;
    reference_id?: string | undefined;
    customer_id?: string | undefined;
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
}, {
    status?: ("SUCCEEDED" | "PENDING" | "FAILED" | "VOIDED" | "REQUIRES_ACTION" | "CANCELED")[] | undefined;
    reference_id?: string | undefined;
    customer_id?: string | undefined;
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
}>;
export type ListPaymentRequests = z.infer<typeof ListPaymentRequestsSchema>;
export declare const ListPaymentRequestsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        reference_id: z.ZodString;
        type: z.ZodUnion<[z.ZodLiteral<"PAY">, z.ZodLiteral<"PAY_AND_SAVE">, z.ZodLiteral<"REUSABLE_PAYMENT_CODE">]>;
        country: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
        request_amount: z.ZodNumber;
        paid_amount: z.ZodOptional<z.ZodNumber>;
        status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"REQUIRES_ACTION">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"VOIDED">, z.ZodLiteral<"CANCELED">]>;
        payment_method: z.ZodObject<{
            type: z.ZodString;
            card_information: z.ZodOptional<z.ZodObject<{
                token_id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                token_id: string;
            }, {
                token_id: string;
            }>>;
            ewallet: z.ZodOptional<z.ZodObject<{
                channel_code: z.ZodString;
                channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }>>;
            direct_debit: z.ZodOptional<z.ZodObject<{
                channel_code: z.ZodString;
                channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }>>;
            over_the_counter: z.ZodOptional<z.ZodObject<{
                channel_code: z.ZodString;
                channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }>>;
            qr_code: z.ZodOptional<z.ZodObject<{
                channel_code: z.ZodString;
                channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }>>;
            virtual_account: z.ZodOptional<z.ZodObject<{
                channel_code: z.ZodString;
                channel_properties: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }, {
                channel_code: string;
                channel_properties?: Record<string, unknown> | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
        }>;
        description: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        customer_id: z.ZodOptional<z.ZodString>;
        customer: z.ZodOptional<z.ZodObject<{
            given_names: z.ZodString;
            surname: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            mobile_number: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            given_names: string;
            surname?: string | undefined;
            email?: string | undefined;
            mobile_number?: string | undefined;
        }, {
            given_names: string;
            surname?: string | undefined;
            email?: string | undefined;
            mobile_number?: string | undefined;
        }>>;
        shipping_information: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            phone_number: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            province: z.ZodOptional<z.ZodString>;
            postal_code: z.ZodOptional<z.ZodString>;
            country_code: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            phone_number?: string | undefined;
            city?: string | undefined;
            postal_code?: string | undefined;
            address?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            province?: string | undefined;
        }, {
            name: string;
            phone_number?: string | undefined;
            city?: string | undefined;
            postal_code?: string | undefined;
            address?: string | undefined;
            country_code?: "PH" | "ID" | "MY" | "TH" | "VN" | undefined;
            province?: string | undefined;
        }>>;
        items: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            quantity: z.ZodNumber;
            price: z.ZodNumber;
            category: z.ZodOptional<z.ZodString>;
            reference_id: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            price: number;
            quantity: number;
            url?: string | undefined;
            category?: string | undefined;
            reference_id?: string | undefined;
        }, {
            name: string;
            price: number;
            quantity: number;
            url?: string | undefined;
            category?: string | undefined;
            reference_id?: string | undefined;
        }>, "many">>;
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
        created: z.ZodString;
        updated: z.ZodString;
        failure_reason: z.ZodOptional<z.ZodString>;
        payment_request_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>, "many">;
    has_more: z.ZodBoolean;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type ListPaymentRequestsResponse = z.infer<typeof ListPaymentRequestsResponseSchema>;
//# sourceMappingURL=schema.d.ts.map