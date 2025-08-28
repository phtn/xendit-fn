import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { Customer, CustomerResource, GetCustomer, GetCustomerByRefId, GetCustomerByRefIdResource, UpdateParams } from "./schema";
export declare const createCustomer: (params: Customer, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<CustomerResource>;
export declare const getCustomerId: (params: GetCustomer, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<CustomerResource>;
export declare const getCustomerRefId: (params: GetCustomerByRefId, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<GetCustomerByRefIdResource>;
export declare const updateCustomer: (params: UpdateParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<CustomerResource>;
//# sourceMappingURL=index.d.ts.map