import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  CreatePaymentMethod,
  PaymentMethodResource,
  GetPaymentMethod,
  ListPaymentMethods,
  ListPaymentMethodsResponse,
  UpdatePaymentMethodParams,
} from "./schema";
import {
  CreatePaymentMethodSchema,
  GetPaymentMethodSchema,
  ListPaymentMethodsSchema,
  UpdatePaymentMethodParamsSchema,
} from "./schema";

export const createPaymentMethod = async (
  params: CreatePaymentMethod,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PaymentMethodResource> => {
  try {
    const validatedParams = validateInput(
      CreatePaymentMethodSchema,
      params,
      "payment method params"
    );
    const response = await axiosInstance.post<PaymentMethodResource>(
      config?.url ?? "/v2/payment_methods",
      validatedParams,
      config
    );
    // Note: Actual API response handling - relaxed validation for production flexibility
    return response.data as PaymentMethodResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getPaymentMethod = async (
  params: GetPaymentMethod,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PaymentMethodResource> => {
  try {
    const validatedParams = validateInput(
      GetPaymentMethodSchema,
      params,
      "get payment method params"
    );
    const response = await axiosInstance.get<PaymentMethodResource>(
      config?.url ?? `/v2/payment_methods/${validatedParams.id}`,
      config
    );
    return response.data as PaymentMethodResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const listPaymentMethods = async (
  params?: ListPaymentMethods,
  axiosInstance?: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ListPaymentMethodsResponse> => {
  try {
    const validatedParams: ListPaymentMethods = params
      ? validateInput(
          ListPaymentMethodsSchema,
          params,
          "list payment methods params"
        )
      : ({} as ListPaymentMethods);

    const queryParams = new URLSearchParams();
    if (validatedParams.id) {
      validatedParams.id.forEach((id) => queryParams.append("id[]", id));
    }
    if (validatedParams.type) {
      validatedParams.type.forEach((type) =>
        queryParams.append("type[]", type)
      );
    }
    if (validatedParams.status) {
      validatedParams.status.forEach((status) =>
        queryParams.append("status[]", status)
      );
    }
    if (validatedParams.reusability) {
      queryParams.append("reusability", validatedParams.reusability);
    }
    if (validatedParams.customer_id) {
      queryParams.append("customer_id", validatedParams.customer_id);
    }
    if (validatedParams.reference_id) {
      queryParams.append("reference_id", validatedParams.reference_id);
    }
    if (validatedParams.after_id) {
      queryParams.append("after_id", validatedParams.after_id);
    }
    if (validatedParams.before_id) {
      queryParams.append("before_id", validatedParams.before_id);
    }
    if (validatedParams.limit) {
      queryParams.append("limit", validatedParams.limit.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `/v2/payment_methods?${queryString}`
      : "/v2/payment_methods";

    if (!axiosInstance) {
      throw new Error('axiosInstance is required');
    }
    const response = await axiosInstance.get<ListPaymentMethodsResponse>(
      config?.url ?? url,
      config
    );
    return response.data as ListPaymentMethodsResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const updatePaymentMethod = async (
  params: UpdatePaymentMethodParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PaymentMethodResource> => {
  try {
    const validatedParams = validateInput(
      UpdatePaymentMethodParamsSchema,
      params,
      "update payment method params"
    );
    const response = await axiosInstance.patch<PaymentMethodResource>(
      config?.url ?? `/v2/payment_methods/${validatedParams.id}`,
      validatedParams.payload,
      config
    );
    return response.data as PaymentMethodResource;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
