import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  Customer,
  CustomerResource,
  GetCustomer,
  GetCustomerByRefId,
  GetCustomerByRefIdResource,
  UpdateParams,
} from "./schema";
import {
  CustomerSchema,
  GetCustomerSchema,
  GetCustomerByRefIdSchema,
  UpdateParamsSchema,
} from "./schema";

export const createCustomer = async (
  params: Customer,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<CustomerResource> => {
  try {
    const validatedParams = validateInput(
      CustomerSchema,
      params,
      "customer params"
    );
    const response = await axiosInstance.post<CustomerResource>(
      config?.url ?? "/customers",
      validatedParams,
      config
    );
    // Note: Actual API response might not match discriminated union exactly
    // For production use, consider making the schema more flexible
    return response.data as CustomerResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getCustomerId = async (
  params: GetCustomer,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<CustomerResource> => {
  try {
    const validatedParams = validateInput(
      GetCustomerSchema,
      params,
      "get customer params"
    );
    const response = await axiosInstance.get<CustomerResource>(
      config?.url ?? `/customers/${validatedParams.id}`,
      config
    );
    // Note: Actual API response might not match discriminated union exactly
    return response.data as CustomerResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getCustomerRefId = async (
  params: GetCustomerByRefId,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<GetCustomerByRefIdResource> => {
  try {
    const validatedParams = validateInput(
      GetCustomerByRefIdSchema,
      params,
      "get customer by ref params"
    );
    const response = await axiosInstance.get<GetCustomerByRefIdResource>(
      config?.url ?? `/customers?reference_id=${validatedParams.reference_id}`,
      config
    );
    // Note: Actual API response might not match discriminated union exactly
    return response.data as GetCustomerByRefIdResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const updateCustomer = async (
  params: UpdateParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<CustomerResource> => {
  try {
    const validatedParams = validateInput(
      UpdateParamsSchema,
      params,
      "update customer params"
    );
    const response = await axiosInstance.patch<CustomerResource>(
      config?.url ?? `/customers/${validatedParams.id}`,
      validatedParams.payload,
      config
    );
    // Note: Actual API response might not match discriminated union exactly
    return response.data as CustomerResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
