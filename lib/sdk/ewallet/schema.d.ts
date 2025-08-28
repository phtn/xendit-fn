import { z } from "zod";
export declare const CheckoutMethodSchema: z.ZodUnion<[z.ZodLiteral<"ONE_TIME_PAYMENT">, z.ZodLiteral<"TOKENIZED_PAYMENT">]>;
export type CheckoutMethod = z.infer<typeof CheckoutMethodSchema>;
export declare const ChannelCodeSchema: z.ZodUnion<[z.ZodLiteral<"ID_OVO">, z.ZodLiteral<"ID_DANA">, z.ZodLiteral<"ID_LINKAJA">, z.ZodLiteral<"ID_SHOPEEPAY">, z.ZodLiteral<"ID_ASTRAPAY">, z.ZodLiteral<"ID_JENIUSPAY">, z.ZodLiteral<"ID_SAKUKU">, z.ZodLiteral<"PH_PAYMAYA">, z.ZodLiteral<"PH_GCASH">, z.ZodLiteral<"PH_GRABPAY">, z.ZodLiteral<"PH_SHOPEEPAY">, z.ZodLiteral<"VN_APPOTA">, z.ZodLiteral<"VN_MOMO">, z.ZodLiteral<"VN_SHOPEEPAY">, z.ZodLiteral<"VN_VNPTWALLET">, z.ZodLiteral<"VN_VIETTELPAY">, z.ZodLiteral<"VN_ZALOPAY">, z.ZodLiteral<"TH_WECHATPAY">, z.ZodLiteral<"TH_LINEPAY">, z.ZodLiteral<"TH_TRUEMONEY">, z.ZodLiteral<"TH_SHOPEEPAY">, z.ZodLiteral<"MY_TOUCHNGO">, z.ZodLiteral<"MY_SHOPEEPAY">, z.ZodLiteral<"MY_GRABPAY">]>;
export declare const LineItemSchema: z.ZodObject<{
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
}>;
export type LineItem = z.infer<typeof LineItemSchema>;
export declare const EWalletChargeSchema: z.ZodDiscriminatedUnion<"checkout_method", [z.ZodObject<{
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
export type EWalletChargeParams = z.infer<typeof EWalletChargeSchema>;
export declare const EWalletStatusSchema: z.ZodUnion<[z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"PENDING">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"VOIDED">, z.ZodLiteral<"REFUNDED">]>;
export declare const EWalletResourceActionsSchema: z.ZodObject<{
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
}>;
export type EWalletResourceActions = z.infer<typeof EWalletResourceActionsSchema>;
export declare const EWalletChargeResourceSchema: z.ZodObject<{
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
export type EWalletChargeResource = z.infer<typeof EWalletChargeResourceSchema>;
export declare const GetEWalletChargeSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetEWalletChargeParams = z.infer<typeof GetEWalletChargeSchema>;
//# sourceMappingURL=schema.d.ts.map