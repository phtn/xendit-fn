import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { TokenParams, TokenResource, TokenAuthentication, TokenAuthenticationResource, TokenAuthorization, ZeroAuthorization, ReverseAuthorizationParams, CreateCharge, ChargeResource } from "./schema";
export declare const createToken: (params: TokenParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<TokenResource>;
export declare const getToken: (params: {
    credit_card_token_id: string;
}, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<TokenResource>;
export declare const authenticateToken: (params: TokenAuthentication, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<TokenAuthenticationResource>;
export declare const authorizeToken: (params: TokenAuthorization, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<ChargeResource>;
export declare const zeroAuthorization: (params: ZeroAuthorization, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<ChargeResource>;
export declare const reverseAuthorization: (params: ReverseAuthorizationParams, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<ChargeResource>;
export declare const createCharge: (params: CreateCharge, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<ChargeResource>;
export declare const getCharge: (params: {
    id: string;
}, axiosInstance: AxiosInstance, config?: AxiosRequestConfig) => Promise<ChargeResource>;
//# sourceMappingURL=index.d.ts.map