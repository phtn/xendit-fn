// Main SDK export
export { Xendit } from "./sdk";

// Type exports
export type {
  // Core types
  RateLimitConfig,
  // Customer types
  Customer,
  CustomerResource,
  GetCustomer,
  GetCustomerByRefId,
  GetCustomerByRefIdResource,
  UpdateParams,
  // E-wallet types
  EWalletChargeParams,
  EWalletChargeResource,
  GetEWalletChargeParams,
  // Payment Method types
  CreatePaymentMethod,
  GetPaymentMethod,
  ListPaymentMethods,
  UpdatePaymentMethod,
  PaymentMethodResource,
  // Invoice types
  CreateInvoice,
  GetInvoice,
  ListInvoices,
  UpdateInvoice,
  ExpireInvoice,
  InvoiceResource,
} from "./sdk";

// Utility exports for advanced usage
export * from "./utils";

// For backwards compatibility and convenience
export type {
  WebhookEvent,
  WebhookEventType,
  WebhookHandlers,
  WebhookVerificationOptions,
} from "./utils/webhook";

export type {
  PaginationOptions,
  AutoPaginationOptions,
  PaginatedResponse,
  SearchPaginationOptions,
} from "./utils/pagination";

export type {
  XenditError,
  ValidationError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
} from "./utils/errors";
