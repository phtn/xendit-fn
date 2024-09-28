import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type {
  Customer,
  CustomerResource,
  GetCustomer,
  GetCustomerByRefId,
  GetCustomerByRefIdResource,
  UpdateParams,
} from "./schema";

export const createCustomer = async (
  params: Customer,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) =>
  (
    await axiosInstance.post<CustomerResource>(
      config?.url ?? "/customers",
      params,
      config,
    )
  ).data;

export const getCustomerId = async (
  params: GetCustomer,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) =>
  (
    await axiosInstance.get<CustomerResource>(
      config?.url ?? `/customers/${params.id}`,
      config,
    )
  ).data;

export const getCustomerRefId = async (
  params: GetCustomerByRefId,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) =>
  (
    await axiosInstance.get<GetCustomerByRefIdResource>(
      config?.url ?? `/customers?reference_id=${params.reference_id}`,
      config,
    )
  ).data;

export const updateCustomer = async (
  params: UpdateParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) =>
  (
    await axiosInstance.patch<CustomerResource>(
      config?.url ?? `/customers/${params.id}`,
      params.payload,
      config,
    )
  ).data;
