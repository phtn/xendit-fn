import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { CreatePaymentRequest, PaymentRequestResource, GetPaymentRequest, ListPaymentRequests, ListPaymentRequestsResponse } from "./schema";
export declare const createPaymentRequest: (params: CreatePaymentRequest, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PaymentRequestResource>;
export declare const getPaymentRequest: (params: GetPaymentRequest, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PaymentRequestResource>;
export declare const listPaymentRequests: (params?: ListPaymentRequests, axiosInstance?: AxiosInstance, config?: AxiosRequestConfig) => Promise<ListPaymentRequestsResponse>;
//# sourceMappingURL=index.d.ts.map