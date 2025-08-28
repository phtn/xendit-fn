import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { CreatePaymentMethod, PaymentMethodResource, GetPaymentMethod, ListPaymentMethods, ListPaymentMethodsResponse, UpdatePaymentMethodParams } from "./schema";
export declare const createPaymentMethod: (params: CreatePaymentMethod, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PaymentMethodResource>;
export declare const getPaymentMethod: (params: GetPaymentMethod, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PaymentMethodResource>;
export declare const listPaymentMethods: (params?: ListPaymentMethods, axiosInstance?: AxiosInstance, config?: AxiosRequestConfig) => Promise<ListPaymentMethodsResponse>;
export declare const updatePaymentMethod: (params: UpdatePaymentMethodParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PaymentMethodResource>;
//# sourceMappingURL=index.d.ts.map