import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { CreateRefund, RefundResource, GetRefund, ListRefunds, ListRefundsResponse } from "./schema";
export declare const createRefund: (params: CreateRefund, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<RefundResource>;
export declare const getRefund: (params: GetRefund, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<RefundResource>;
export declare const listRefunds: (params?: ListRefunds, axiosInstance?: AxiosInstance, config?: AxiosRequestConfig) => Promise<ListRefundsResponse>;
//# sourceMappingURL=index.d.ts.map