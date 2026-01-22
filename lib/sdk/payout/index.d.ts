import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { CreatePayout, PayoutResource, GetPayout, ListPayouts, ListPayoutsResponse, CancelPayout } from "./schema";
export declare const createPayout: (params: CreatePayout, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PayoutResource>;
export declare const getPayout: (params: GetPayout, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PayoutResource>;
export declare const listPayouts: (params?: ListPayouts, axiosInstance?: AxiosInstance, config?: AxiosRequestConfig) => Promise<ListPayoutsResponse>;
export declare const cancelPayout: (params: CancelPayout, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<PayoutResource>;
//# sourceMappingURL=index.d.ts.map