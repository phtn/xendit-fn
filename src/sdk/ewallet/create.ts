import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  EWalletChargeParams,
  EWalletChargeResource,
  GetEWalletChargeParams,
} from "./schema";
import {
  EWalletChargeSchema,
  EWalletChargeResourceSchema,
  GetEWalletChargeSchema,
} from "./schema";

export const createEwalletCharge = async (
  params: EWalletChargeParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<EWalletChargeResource> => {
  try {
    const validatedParams = validateInput(
      EWalletChargeSchema,
      params,
      "ewallet charge params"
    );
    const response = await axiosInstance.post<EWalletChargeResource>(
      config?.url ?? "/ewallets/charges",
      validatedParams,
      config
    );
    return validateInput(
      EWalletChargeResourceSchema,
      response.data,
      "ewallet charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getEwalletCharge = async (
  params: GetEWalletChargeParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<EWalletChargeResource> => {
  try {
    const validatedParams = validateInput(
      GetEWalletChargeSchema,
      params,
      "get ewallet charge params"
    );
    const response = await axiosInstance.get<EWalletChargeResource>(
      config?.url ?? `/ewallets/charges/${validatedParams.id}`,
      config
    );
    return validateInput(
      EWalletChargeResourceSchema,
      response.data,
      "ewallet charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
