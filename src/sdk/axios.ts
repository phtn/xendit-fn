import axios, { type AxiosRequestConfig } from "axios";

export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      ...config?.headers,
    },
    baseURL: "https://api.xendit.co",
  });
