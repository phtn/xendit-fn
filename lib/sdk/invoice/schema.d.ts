import { z } from "zod";
export declare const InvoiceStatusSchema: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"PAID">, z.ZodLiteral<"SETTLED">, z.ZodLiteral<"EXPIRED">]>;
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;
export declare const PayerEmailSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type PayerEmail = z.infer<typeof PayerEmailSchema>;
export declare const InvoiceItemSchema: z.ZodObject<{
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
}>;
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
export declare const CustomerNotificationPreferenceSchema: z.ZodObject<{
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
}>;
export declare const CustomerDetailsSchema: z.ZodObject<{
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
}>;
export type CustomerDetails = z.infer<typeof CustomerDetailsSchema>;
export declare const FeeSchema: z.ZodObject<{
    type: z.ZodString;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: string;
}, {
    value: number;
    type: string;
}>;
export declare const AvailableBankSchema: z.ZodObject<{
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
}>;
export declare const AvailableEwalletSchema: z.ZodObject<{
    ewallet_type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ewallet_type: string;
}, {
    ewallet_type: string;
}>;
export declare const AvailableRetailOutletSchema: z.ZodObject<{
    retail_outlet_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    retail_outlet_name: string;
}, {
    retail_outlet_name: string;
}>;
export declare const CreateInvoiceSchema: z.ZodObject<{
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
export type CreateInvoice = z.infer<typeof CreateInvoiceSchema>;
export declare const UpdateInvoiceSchema: z.ZodObject<{
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
export type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>;
export declare const InvoiceResourceSchema: z.ZodObject<{
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
export type InvoiceResource = z.infer<typeof InvoiceResourceSchema>;
export declare const GetInvoiceSchema: z.ZodObject<{
    invoice_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoice_id: string;
}, {
    invoice_id: string;
}>;
export type GetInvoice = z.infer<typeof GetInvoiceSchema>;
export declare const ListInvoicesSchema: z.ZodObject<{
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
export type ListInvoices = z.infer<typeof ListInvoicesSchema>;
export declare const ListInvoicesResponseSchema: z.ZodObject<{
    has_more: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type ListInvoicesResponse = z.infer<typeof ListInvoicesResponseSchema>;
export declare const UpdateInvoiceParamsSchema: z.ZodObject<{
    invoice_id: z.ZodString;
    payload: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
export type UpdateInvoiceParams = z.infer<typeof UpdateInvoiceParamsSchema>;
export declare const ExpireInvoiceSchema: z.ZodObject<{
    invoice_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    invoice_id: string;
}, {
    invoice_id: string;
}>;
export type ExpireInvoice = z.infer<typeof ExpireInvoiceSchema>;
//# sourceMappingURL=schema.d.ts.map