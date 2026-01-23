import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  CreateRefund,
  RefundResource,
  GetRefund,
  ListRefunds,
  ListRefundsResponse,
} from "./schema";
import {
  CreateRefundSchema,
  GetRefundSchema,
  ListRefundsSchema,
  RefundResourceSchema,
} from "./schema";

export const createRefund = async (
  params: CreateRefund,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<RefundResource> => {
  try {
    const validatedParams = validateInput(
      CreateRefundSchema,
      params,
      "refund params"
    );
    const response = await axiosInstance.post<RefundResource>(
      config?.url ?? "/v3/refunds",
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
      RefundResourceSchema,
      response.data,
      "refund response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getRefund = async (
  params: GetRefund,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<RefundResource> => {
  try {
    const validatedParams = validateInput(
      GetRefundSchema,
      params,
      "get refund params"
    );
    const response = await axiosInstance.get<RefundResource>(
      config?.url ?? `/v3/refunds/${validatedParams.id}`,
      {
        ...config,
        headers: {
          "api-version": "2024-11-11",
          ...config?.headers,
        },
      }
    );
    return validateInput(
      RefundResourceSchema,
      response.data,
      "refund response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const listRefunds = async (
  params?: ListRefunds,
  axiosInstance?: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ListRefundsResponse> => {
  try {
    const validatedParams: ListRefunds = params
      ? validateInput(ListRefundsSchema, params, "list refunds params")
      : ({} as ListRefunds);

    const queryParams = new URLSearchParams();
    if (validatedParams.payment_request_id) {
      queryParams.append(
        "payment_request_id",
        validatedParams.payment_request_id
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
    const url = queryString ? `/v3/refunds?${queryString}` : "/v3/refunds";

    if (!axiosInstance) {
      throw new Error("axiosInstance is required");
    }
    const response = await axiosInstance.get<ListRefundsResponse>(
      config?.url ?? url,
      {
        ...config,
        headers: {
          "api-version": "2024-11-11",
          ...config?.headers,
        },
      }
    );
    return response.data as ListRefundsResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
