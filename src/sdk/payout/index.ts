import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  CreatePayout,
  PayoutResource,
  GetPayout,
  ListPayouts,
  ListPayoutsResponse,
  CancelPayout,
} from "./schema";
import {
  CreatePayoutSchema,
  GetPayoutSchema,
  ListPayoutsSchema,
  CancelPayoutSchema,
  PayoutResourceSchema,
} from "./schema";

export const createPayout = async (
  params: CreatePayout,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PayoutResource> => {
  try {
    const validatedParams = validateInput(
      CreatePayoutSchema,
      params,
      "payout params"
    );
    const response = await axiosInstance.post<PayoutResource>(
      config?.url ?? "/v2/payouts",
      validatedParams,
      config
    );
    return validateInput(
      PayoutResourceSchema,
      response.data,
      "payout response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getPayout = async (
  params: GetPayout,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PayoutResource> => {
  try {
    const validatedParams = validateInput(
      GetPayoutSchema,
      params,
      "get payout params"
    );
    const response = await axiosInstance.get<PayoutResource>(
      config?.url ?? `/v2/payouts/${validatedParams.id}`,
      config
    );
    return validateInput(
      PayoutResourceSchema,
      response.data,
      "payout response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const listPayouts = async (
  params?: ListPayouts,
  axiosInstance?: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ListPayoutsResponse> => {
  try {
    const validatedParams: ListPayouts = params
      ? validateInput(ListPayoutsSchema, params, "list payouts params")
      : ({} as ListPayouts);

    const queryParams = new URLSearchParams();
    if (validatedParams.reference_id) {
      queryParams.append("reference_id", validatedParams.reference_id);
    }
    if (validatedParams.channel_code) {
      validatedParams.channel_code.forEach((code) =>
        queryParams.append("channel_code[]", code)
      );
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
    const url = queryString ? `/v2/payouts?${queryString}` : "/v2/payouts";

    if (!axiosInstance) {
      throw new Error('axiosInstance is required');
    }
    const response = await axiosInstance.get<ListPayoutsResponse>(
      config?.url ?? url,
      config
    );
    return response.data as ListPayoutsResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const cancelPayout = async (
  params: CancelPayout,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<PayoutResource> => {
  try {
    const validatedParams = validateInput(
      CancelPayoutSchema,
      params,
      "cancel payout params"
    );
    const response = await axiosInstance.post<PayoutResource>(
      config?.url ?? `/v2/payouts/${validatedParams.id}/cancel`,
      {},
      config
    );
    return validateInput(
      PayoutResourceSchema,
      response.data,
      "payout response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
