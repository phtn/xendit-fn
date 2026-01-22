import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  BalanceResource,
  ListTransactions,
  ListTransactionsResponse,
} from "./schema";
import {
  BalanceResourceSchema,
  ListTransactionsSchema,
} from "./schema";

export const getBalance = async (
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<BalanceResource> => {
  try {
    const response = await axiosInstance.get<BalanceResource>(
      config?.url ?? "/balance",
      config
    );
    return validateInput(
      BalanceResourceSchema,
      response.data,
      "balance response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const listTransactions = async (
  params?: ListTransactions,
  axiosInstance?: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ListTransactionsResponse> => {
  try {
    const validatedParams: ListTransactions = params
      ? validateInput(
          ListTransactionsSchema,
          params,
          "list transactions params"
        )
      : ({} as ListTransactions);

    const queryParams = new URLSearchParams();
    if (validatedParams.types) {
      validatedParams.types.forEach((type) =>
        queryParams.append("types[]", type)
      );
    }
    if (validatedParams.statuses) {
      validatedParams.statuses.forEach((status) =>
        queryParams.append("statuses[]", status)
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
      ? `/transactions?${queryString}`
      : "/transactions";

    const response = await axiosInstance!.get<ListTransactionsResponse>(
      config?.url ?? url,
      config
    );
    return response.data as ListTransactionsResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
