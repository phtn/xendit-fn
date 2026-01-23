import type { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { handleAxiosError, validateInput } from "../../utils/errors";
import type {
  TokenParams,
  TokenResource,
  TokenAuthentication,
  TokenAuthenticationResource,
  TokenAuthorization,
  ZeroAuthorization,
  ReverseAuthorizationParams,
  CreateCharge,
  ChargeResource,
} from "./schema";
import {
  TokenParamsSchema,
  GetTokemParamsSchema,
  TokenResourceSchema,
  TokenAuthenticationSchema,
  TokenAuthenticationResourceSchema,
  TokenAuthorizationSchema,
  ZeroAuthorizationSchema,
  ReverseAuthorizationSchema,
  CreateChargeSchema,
  ChargeResourceSchema,
} from "./schema";

export const createToken = async (
  params: TokenParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<TokenResource> => {
  try {
    const validatedParams = validateInput(
      TokenParamsSchema,
      params,
      "token params"
    );
    const response = await axiosInstance.post<TokenResource>(
      config?.url ?? "/credit_card_tokens",
      validatedParams,
      config
    );
    return validateInput(TokenResourceSchema, response.data, "token response");
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getToken = async (
  params: { credit_card_token_id: string },
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<TokenResource> => {
  try {
    const validatedParams = validateInput(
      GetTokemParamsSchema,
      params,
      "get token params"
    );
    const response = await axiosInstance.get<TokenResource>(
      config?.url ??
        `/credit_card_tokens/${validatedParams.credit_card_token_id}`,
      config
    );
    return validateInput(TokenResourceSchema, response.data, "token response");
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const authenticateToken = async (
  params: TokenAuthentication,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<TokenAuthenticationResource> => {
  try {
    const validatedParams = validateInput(
      TokenAuthenticationSchema,
      params,
      "token authentication params"
    );
    const response = await axiosInstance.post<TokenAuthenticationResource>(
      config?.url ?? "/credit_card_tokens/authenticate",
      validatedParams,
      config
    );
    return validateInput(
      TokenAuthenticationResourceSchema,
      response.data,
      "token authentication response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const authorizeToken = async (
  params: TokenAuthorization,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ChargeResource> => {
  try {
    const validatedParams = validateInput(
      TokenAuthorizationSchema,
      params,
      "token authorization params"
    );
    const response = await axiosInstance.post<ChargeResource>(
      config?.url ?? "/credit_card_charges",
      validatedParams,
      config
    );
    return validateInput(
      ChargeResourceSchema,
      response.data,
      "charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const zeroAuthorization = async (
  params: ZeroAuthorization,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ChargeResource> => {
  try {
    const validatedParams = validateInput(
      ZeroAuthorizationSchema,
      params,
      "zero authorization params"
    );
    const response = await axiosInstance.post<ChargeResource>(
      config?.url ?? "/credit_card_charges",
      validatedParams,
      config
    );
    return validateInput(
      ChargeResourceSchema,
      response.data,
      "charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const reverseAuthorization = async (
  params: ReverseAuthorizationParams,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ChargeResource> => {
  try {
    const validatedParams = validateInput(
      ReverseAuthorizationSchema,
      params,
      "reverse authorization params"
    );
    const response = await axiosInstance.post<ChargeResource>(
      config?.url ??
        `/credit_card_charges/${validatedParams.external_id}/reverse_authorization`,
      {},
      config
    );
    return validateInput(
      ChargeResourceSchema,
      response.data,
      "charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const createCharge = async (
  params: CreateCharge,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ChargeResource> => {
  try {
    const validatedParams = validateInput(
      CreateChargeSchema,
      params,
      "charge params"
    );
    const response = await axiosInstance.post<ChargeResource>(
      config?.url ?? "/credit_card_charges",
      validatedParams,
      config
    );
    return validateInput(
      ChargeResourceSchema,
      response.data,
      "charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};

export const getCharge = async (
  params: { id: string },
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig
): Promise<ChargeResource> => {
  try {
    const response = await axiosInstance.get<ChargeResource>(
      config?.url ?? `/credit_card_charges/${params.id}`,
      config
    );
    return validateInput(
      ChargeResourceSchema,
      response.data,
      "charge response"
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AxiosError") {
      handleAxiosError(error as AxiosError);
    }
    throw error;
  }
};
