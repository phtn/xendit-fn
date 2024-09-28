import type { AxiosInstance } from "axios";
import { createAxiosInstance } from "./axios";
import {
  createCustomer,
  getCustomerId,
  getCustomerRefId,
  updateCustomer,
} from "./customer";
import { createEwalletCharge, getEwalletCharge } from "./ewallet/create";

const btoa = (string: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(string).toString("base64");
  }
  return window.btoa(string);
};

const createFn = <TParams, TReturn>(
  fn: (params: TParams, axiosInstance: AxiosInstance) => Promise<TReturn>,
  axiosInstance: AxiosInstance,
) => {
  return (data: TParams) => fn(data, axiosInstance);
};
// const createFnNoData = <TParams, TReturn>(
//   fn: (axiosInstance: AxiosInstance) => Promise<TReturn>,
//   axiosInstance: AxiosInstance,
// ) => {
//   return () => fn(axiosInstance);
// };

const Xendit = (key: string) => {
  const axiosInstance = createAxiosInstance({
    headers: {
      Authorization: `Basic ${btoa(key + ":")}`,
    },
  });

  if (key.includes("development")) {
    console.log("👾 You are on → TEST MODE");
  }

  return {
    customer: {
      create: createFn(createCustomer, axiosInstance),
      getById: createFn(getCustomerId, axiosInstance),
      getByRefId: createFn(getCustomerRefId, axiosInstance),
      update: createFn(updateCustomer, axiosInstance),
    },
    ewallet: {
      charge: createFn(createEwalletCharge, axiosInstance),
      get: createFn(getEwalletCharge, axiosInstance),
    },
  };
};

export { Xendit };
