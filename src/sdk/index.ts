import type { AxiosInstance } from "axios";
import { createAxiosInstance } from "./axios";
import { setupRateLimit, type RateLimitConfig } from "../utils/rate-limit";
import {
  createCustomer,
  getCustomerId,
  getCustomerRefId,
  updateCustomer,
} from "./customer/index";
import { createEwalletCharge, getEwalletCharge } from "./ewallet/create";
import {
  createPaymentMethod,
  getPaymentMethod,
  listPaymentMethods,
  updatePaymentMethod,
} from "./payment-method/index";
import {
  createInvoice,
  getInvoice,
  listInvoices,
  updateInvoice,
  expireInvoice,
} from "./invoice/index";

// Re-export all types for library consumers
export type {
  // Customer types
  Customer,
  CustomerResource,
  GetCustomer,
  GetCustomerByRefId,
  GetCustomerByRefIdResource,
  UpdateParams,
} from "./customer/schema";

export type {
  // E-wallet types
  EWalletChargeParams,
  EWalletChargeResource,
  GetEWalletChargeParams,
} from "./ewallet/schema";

export type {
  // Payment Method types
  CreatePaymentMethod,
  GetPaymentMethod,
  ListPaymentMethods,
  UpdatePaymentMethod,
  PaymentMethodResource,
} from "./payment-method/schema";

export type {
  // Invoice types
  CreateInvoice,
  GetInvoice,
  ListInvoices,
  UpdateInvoice,
  ExpireInvoice,
  InvoiceResource,
} from "./invoice/schema";

export type { RateLimitConfig };

const btoa = (string: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(string).toString("base64");
  }
  return window.btoa(string);
};

const createFn = <TParams, TReturn>(
  fn: (params: TParams, axiosInstance: AxiosInstance) => Promise<TReturn>,
  axiosInstance: AxiosInstance
) => {
  return (data: TParams) => fn(data, axiosInstance);
};
// const createFnNoData = <TParams, TReturn>(
//   fn: (axiosInstance: AxiosInstance) => Promise<TReturn>,
//   axiosInstance: AxiosInstance,
// ) => {
//   return () => fn(axiosInstance);
// };

interface XenditOptions {
  /**
   * Rate limiting configuration
   */
  rateLimit?: RateLimitConfig;
}

const Xendit = (key: string, options: XenditOptions = {}) => {
  const axiosInstance = createAxiosInstance({
    headers: {
      Authorization: `Basic ${btoa(key + ":")}`,
    },
  });

  // Apply rate limiting if configured
  if (options.rateLimit) {
    setupRateLimit(axiosInstance, options.rateLimit);
  }

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
    paymentMethod: {
      create: createFn(createPaymentMethod, axiosInstance),
      get: createFn(getPaymentMethod, axiosInstance),
      list: (params?: any) => listPaymentMethods(params, axiosInstance),
      update: createFn(updatePaymentMethod, axiosInstance),
    },
    invoice: {
      create: createFn(createInvoice, axiosInstance),
      get: createFn(getInvoice, axiosInstance),
      list: (params?: any) => listInvoices(params, axiosInstance),
      update: createFn(updateInvoice, axiosInstance),
      expire: createFn(expireInvoice, axiosInstance),
    },
  };
};

export { Xendit };
