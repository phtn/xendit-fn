import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { CreateInvoice, InvoiceResource, GetInvoice, ListInvoices, ListInvoicesResponse, UpdateInvoiceParams, ExpireInvoice } from "./schema";
export declare const createInvoice: (params: CreateInvoice, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<InvoiceResource>;
export declare const getInvoice: (params: GetInvoice, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<InvoiceResource>;
export declare const listInvoices: (params?: ListInvoices, axiosInstance?: AxiosInstance, config?: AxiosRequestConfig) => Promise<ListInvoicesResponse>;
export declare const updateInvoice: (params: UpdateInvoiceParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<InvoiceResource>;
export declare const expireInvoice: (params: ExpireInvoice, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<InvoiceResource>;
//# sourceMappingURL=index.d.ts.map