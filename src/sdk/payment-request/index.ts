import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  CreatePaymentRequest,
  PaymentRequestResource,
  GetPaymentRequest,
  ListPaymentRequests,
  ListPaymentRequestsResponse,
} from "./schema";
import {
  CreatePaymentRequestSchema,
  GetPaymentRequestSchema,
  ListPaymentRequestsSchema,
  PaymentRequestResourceSchema,
} from "./schema";

export const createPaymentRequest = async (
  params: CreatePaymentRequest,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PaymentRequestResource> => {
  try {
    const validatedParams = validateInput(
      CreatePaymentRequestSchema,
      params,
      "payment request params"
    );
    const response = await axiosInstance.post<PaymentRequestResource>(
      config?.url ?? "/v3/payment_requests",
      validatedParams,
      {
        ...config,
        headers: {
          "api-version": "2024-11-11",
          ...config?.headers,
        },
      }
    );
    return validateInput(
      PaymentRequestResourceSchema,
      response.data,
      "payment request response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getPaymentRequest = async (
  params: GetPaymentRequest,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PaymentRequestResource> => {
  try {
    const validatedParams = validateInput(
      GetPaymentRequestSchema,
      params,
      "get payment request params"
    );
    const response = await axiosInstance.get<PaymentRequestResource>(
      config?.url ?? `/v3/payment_requests/${validatedParams.id}`,
      {
        ...config,
        headers: {
          "api-version": "2024-11-11",
          ...config?.headers,
        },
      }
    );
    return validateInput(
      PaymentRequestResourceSchema,
      response.data,
      "payment request response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const listPaymentRequests = async (
  params?: ListPaymentRequests,
  axiosInstance?: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ListPaymentRequestsResponse> => {
  try {
    const validatedParams: ListPaymentRequests = params
      ? validateInput(
          ListPaymentRequestsSchema,
          params,
          "list payment requests params"
        )
      : ({} as ListPaymentRequests);

    const queryParams = new URLSearchParams();
    if (validatedParams.reference_id) {
      queryParams.append("reference_id", validatedParams.reference_id);
    }
    if (validatedParams.customer_id) {
      queryParams.append("customer_id", validatedParams.customer_id);
    }
    if (validatedParams.status) {
      validatedParams.status.forEach((status) =>
        queryParams.append("status[]", status)
      );
    }
    if (validatedParams.limit) {
      queryParams.append("limit", validatedParams.limit.toString());
    }
    if (validatedParams.after_id) {
      queryParams.append("after_id", validatedParams.after_id);
    }
    if (validatedParams.before_id) {
      queryParams.append("before_id", validatedParams.before_id);
    }
    if (validatedParams.created_after) {
      queryParams.append("created_after", validatedParams.created_after);
    }
    if (validatedParams.created_before) {
      queryParams.append("created_before", validatedParams.created_before);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `/v3/payment_requests?${queryString}`
      : "/v3/payment_requests";

    const response = await axiosInstance!.get<ListPaymentRequestsResponse>(
      config?.url ?? url,
      {
        ...config,
        headers: {
          "api-version": "2024-11-11",
          ...config?.headers,
        },
      }
    );
    return response.data as ListPaymentRequestsResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
