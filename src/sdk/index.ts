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
import {
  createPaymentRequest,
  getPaymentRequest,
  listPaymentRequests,
} from "./payment-request/index";
import { createRefund, getRefund, listRefunds } from "./refund/index";
import {
  createPayout,
  getPayout,
  listPayouts,
  cancelPayout,
} from "./payout/index";
import { getBalance, listTransactions } from "./balance/index";
import {
  createToken,
  getToken,
  authenticateToken,
  authorizeToken,
  zeroAuthorization,
  reverseAuthorization,
  createCharge,
  getCharge,
} from "./card/index";
import type { ListPaymentMethods } from "./payment-method/schema";
import type { ListInvoices } from "./invoice/schema";
import type { ListPaymentRequests } from "./payment-request/schema";
import type { ListRefunds } from "./refund/schema";
import type { ListPayouts } from "./payout/schema";
import type { ListTransactions } from "./balance/schema";

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

export type {
  // Payment Request types
  CreatePaymentRequest,
  GetPaymentRequest,
  ListPaymentRequests,
  PaymentRequestResource,
  PaymentRequestType,
  PaymentRequestStatus,
} from "./payment-request/schema";

export type {
  // Refund types
  CreateRefund,
  GetRefund,
  ListRefunds,
  RefundResource,
  RefundReason,
  RefundStatus,
} from "./refund/schema";

export type {
  // Payout types
  CreatePayout,
  GetPayout,
  ListPayouts,
  CancelPayout,
  PayoutResource,
  PayoutStatus,
  PayoutChannelCode,
} from "./payout/schema";

export type {
  // Balance & Transaction types
  BalanceResource,
  ListTransactions,
  TransactionResource,
  TransactionType,
  TransactionStatus,
} from "./balance/schema";

export type {
  // Card types
  TokenParams,
  TokenResource,
  TokenAuthentication,
  TokenAuthenticationResource,
  TokenAuthorization,
  ZeroAuthorization,
  ReverseAuthorizationParams,
  CreateCharge,
  ChargeResource,
  CardInfo,
  TokenStatus,
  CardType,
  CardBrand,
} from "./card/schema";

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
      list: (params?: ListPaymentMethods) =>
        listPaymentMethods(params, axiosInstance),
      update: createFn(updatePaymentMethod, axiosInstance),
    },
    invoice: {
      create: createFn(createInvoice, axiosInstance),
      get: createFn(getInvoice, axiosInstance),
      list: (params?: ListInvoices) => listInvoices(params, axiosInstance),
      update: createFn(updateInvoice, axiosInstance),
      expire: createFn(expireInvoice, axiosInstance),
    },
    paymentRequest: {
      create: createFn(createPaymentRequest, axiosInstance),
      get: createFn(getPaymentRequest, axiosInstance),
      list: (params?: ListPaymentRequests) =>
        listPaymentRequests(params, axiosInstance),
    },
    refund: {
      create: createFn(createRefund, axiosInstance),
      get: createFn(getRefund, axiosInstance),
      list: (params?: ListRefunds) => listRefunds(params, axiosInstance),
    },
    payout: {
      create: createFn(createPayout, axiosInstance),
      get: createFn(getPayout, axiosInstance),
      list: (params?: ListPayouts) => listPayouts(params, axiosInstance),
      cancel: createFn(cancelPayout, axiosInstance),
    },
    balance: {
      get: () => getBalance(axiosInstance),
      listTransactions: (params?: ListTransactions) =>
        listTransactions(params, axiosInstance),
    },
    card: {
      createToken: createFn(createToken, axiosInstance),
      getToken: createFn(getToken, axiosInstance),
      authenticateToken: createFn(authenticateToken, axiosInstance),
      authorizeToken: createFn(authorizeToken, axiosInstance),
      zeroAuthorization: createFn(zeroAuthorization, axiosInstance),
      reverseAuthorization: createFn(reverseAuthorization, axiosInstance),
      createCharge: createFn(createCharge, axiosInstance),
      getCharge: createFn(getCharge, axiosInstance),
    },
  };
};

export { Xendit };
