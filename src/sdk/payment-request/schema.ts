import { z } from "zod";
import { CurrencySchema, CountrySchema } from "../common";

// Payment Request Types
export const PaymentRequestTypeSchema = z.union([
  z.literal("PAY"),
  z.literal("PAY_AND_SAVE"),
  z.literal("REUSABLE_PAYMENT_CODE"),
]);
export type PaymentRequestType = z.infer<typeof PaymentRequestTypeSchema>;

// Capture Method
export const CaptureMethodSchema = z.union([
  z.literal("AUTOMATIC"),
  z.literal("MANUAL"),
]);
export type CaptureMethod = z.infer<typeof CaptureMethodSchema>;

// Payment Request Status
export const PaymentRequestStatusSchema = z.union([
  z.literal("PENDING"),
  z.literal("REQUIRES_ACTION"),
  z.literal("SUCCEEDED"),
  z.literal("FAILED"),
  z.literal("VOIDED"),
  z.literal("CANCELED"),
]);
export type PaymentRequestStatus = z.infer<typeof PaymentRequestStatusSchema>;

// Channel Code (simplified - can be expanded)
export const ChannelCodeSchema = z.string();
export type ChannelCode = z.infer<typeof ChannelCodeSchema>;

// Channel Properties
export const ChannelPropertiesSchema = z.record(z.unknown());
export type ChannelProperties = z.infer<typeof ChannelPropertiesSchema>;

// Payment Method
export const PaymentMethodSchema = z.object({
  type: z.string(),
  card_information: z
    .object({
      token_id: z.string(),
    })
    .optional(),
  ewallet: z
    .object({
      channel_code: z.string(),
      channel_properties: ChannelPropertiesSchema.optional(),
    })
    .optional(),
  direct_debit: z
    .object({
      channel_code: z.string(),
      channel_properties: ChannelPropertiesSchema.optional(),
    })
    .optional(),
  over_the_counter: z
    .object({
      channel_code: z.string(),
      channel_properties: ChannelPropertiesSchema.optional(),
    })
    .optional(),
  qr_code: z
    .object({
      channel_code: z.string(),
      channel_properties: ChannelPropertiesSchema.optional(),
    })
    .optional(),
  virtual_account: z
    .object({
      channel_code: z.string(),
      channel_properties: ChannelPropertiesSchema.optional(),
    })
    .optional(),
});
export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

// Create Payment Request Schema
export const CreatePaymentRequestSchema = z.object({
  reference_id: z.string(),
  type: PaymentRequestTypeSchema,
  country: CountrySchema,
  currency: CurrencySchema,
  request_amount: z.number().positive(),
  payment_method: PaymentMethodSchema,
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  customer_id: z.string().optional(),
  customer: z
    .object({
      given_names: z.string(),
      surname: z.string().optional(),
      email: z.string().email().optional(),
      mobile_number: z.string().optional(),
    })
    .optional(),
  shipping_information: z
    .object({
      name: z.string(),
      phone_number: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      province: z.string().optional(),
      postal_code: z.string().optional(),
      country_code: CountrySchema.optional(),
    })
    .optional(),
  items: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.number().positive(),
        price: z.number().positive(),
        category: z.string().optional(),
        reference_id: z.string().optional(),
        url: z.string().url().optional(),
      })
    )
    .optional(),
  capture_method: CaptureMethodSchema.optional(),
  success_redirect_url: z.string().url().optional(),
  failure_redirect_url: z.string().url().optional(),
});
export type CreatePaymentRequest = z.infer<typeof CreatePaymentRequestSchema>;

// Payment Request Resource
export const PaymentRequestResourceSchema = z.object({
  id: z.string(),
  reference_id: z.string(),
  type: PaymentRequestTypeSchema,
  country: CountrySchema,
  currency: CurrencySchema,
  request_amount: z.number(),
  paid_amount: z.number().optional(),
  status: PaymentRequestStatusSchema,
  payment_method: PaymentMethodSchema,
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  customer_id: z.string().optional(),
  customer: z
    .object({
      given_names: z.string(),
      surname: z.string().optional(),
      email: z.string().email().optional(),
      mobile_number: z.string().optional(),
    })
    .optional(),
  shipping_information: z
    .object({
      name: z.string(),
      phone_number: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      province: z.string().optional(),
      postal_code: z.string().optional(),
      country_code: CountrySchema.optional(),
    })
    .optional(),
  items: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.number().positive(),
        price: z.number().positive(),
        category: z.string().optional(),
        reference_id: z.string().optional(),
        url: z.string().url().optional(),
      })
    )
    .optional(),
  actions: z
    .object({
      desktop_web_checkout_url: z.string().url().optional(),
      mobile_web_checkout_url: z.string().url().optional(),
      mobile_deeplink_checkout_url: z.string().url().optional(),
      qr_checkout_string: z.string().optional(),
    })
    .optional(),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  failure_reason: z.string().optional(),
  payment_request_id: z.string().optional(),
});
export type PaymentRequestResource = z.infer<
  typeof PaymentRequestResourceSchema
>;

// Get Payment Request Schema
export const GetPaymentRequestSchema = z.object({
  id: z.string(),
});
export type GetPaymentRequest = z.infer<typeof GetPaymentRequestSchema>;

// List Payment Requests Schema
export const ListPaymentRequestsSchema = z.object({
  reference_id: z.string().optional(),
  customer_id: z.string().optional(),
  status: z.array(PaymentRequestStatusSchema).optional(),
  limit: z.number().min(1).max(100).optional(),
  after_id: z.string().optional(),
  before_id: z.string().optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
});
export type ListPaymentRequests = z.infer<typeof ListPaymentRequestsSchema>;

// List Payment Requests Response
export const ListPaymentRequestsResponseSchema = z.object({
  data: z.array(PaymentRequestResourceSchema),
  has_more: z.boolean(),
  links: z
    .array(
      z.object({
        href: z.string(),
        rel: z.string(),
        method: z.string(),
      })
    )
    .optional(),
});
export type ListPaymentRequestsResponse = z.infer<
  typeof ListPaymentRequestsResponseSchema
>;
