import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { EWalletChargeParams, GetEWalletChargeParams } from "./schema";
export declare const createEwalletCharge: (params: EWalletChargeParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<{
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
export declare const getEwalletCharge: (params: GetEWalletChargeParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<{
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
//# sourceMappingURL=create.d.ts.map