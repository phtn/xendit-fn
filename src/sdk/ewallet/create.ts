import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type {
  EWalletChargeParams,
  EWalletChargeResource,
  GetEWalletChargeParams,
} from "./schema";

export const createEwalletCharge = async (
  params: EWalletChargeParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) =>
  (
    await axiosInstance.post<EWalletChargeResource>(
      config?.url ?? "/ewallets/charges",
      params,
      config,
    )
  ).data;

export const getEwalletCharge = async (
  params: GetEWalletChargeParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) =>
  (
    await axiosInstance.get<EWalletChargeResource>(
      config?.url ?? `/ewallets/charges/${params.id}`,
      config,
    )
  ).data;
