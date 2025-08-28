import { z } from "zod";
import { CountrySchema, CurrencySchema } from "../common";

// Payment Method Types
export const PaymentMethodTypeSchema = z.union([
  z.literal("CARD"),
  z.literal("BANK_ACCOUNT"),
  z.literal("EWALLET"),
  z.literal("OVER_THE_COUNTER"),
  z.literal("VIRTUAL_ACCOUNT"),
  z.literal("QR_CODE"),
]);
export type PaymentMethodType = z.infer<typeof PaymentMethodTypeSchema>;

// Payment Method Status
export const PaymentMethodStatusSchema = z.union([
  z.literal("ACTIVE"),
  z.literal("INACTIVE"),
  z.literal("PENDING"),
  z.literal("EXPIRED"),
  z.literal("FAILED"),
]);
export type PaymentMethodStatus = z.infer<typeof PaymentMethodStatusSchema>;

// Card Properties
export const CardPropertiesSchema = z.object({
  card_last_four: z.string(),
  card_expiry_month: z.string(),
  card_expiry_year: z.string(),
  network: z.string(),
  country: CountrySchema.optional(),
  issuer: z.string().optional(),
  type: z.union([z.literal("CREDIT"), z.literal("DEBIT")]).optional(),
  currency: CurrencySchema.optional(),
});

// Bank Account Properties
export const BankAccountPropertiesSchema = z.object({
  account_number: z.string(),
  account_holder_name: z.string(),
  bank_code: z.string(),
  account_type: z.string().optional(),
  currency: CurrencySchema,
});

// E-wallet Properties
export const EwalletPropertiesSchema = z.object({
  account_details: z.string(),
  currency: CurrencySchema,
});

// Payment Method Properties (Discriminated Union)
export const PaymentMethodPropertiesSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("CARD"),
    card: CardPropertiesSchema,
  }),
  z.object({
    type: z.literal("BANK_ACCOUNT"),
    bank_account: BankAccountPropertiesSchema,
  }),
  z.object({
    type: z.literal("EWALLET"),
    ewallet: EwalletPropertiesSchema,
  }),
]);

// Create Payment Method Request
export const CreatePaymentMethodSchema = z.object({
  type: PaymentMethodTypeSchema,
  country: CountrySchema.optional(),
  reusability: z.union([z.literal("ONE_TIME_USE"), z.literal("MULTIPLE_USE")]),
  description: z.string().optional(),
  reference_id: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  // Specific properties based on type
  card: z
    .object({
      currency: CurrencySchema.optional(),
      channel_properties: z
        .object({
          success_return_url: z.string().url().optional(),
          failure_return_url: z.string().url().optional(),
        })
        .optional(),
    })
    .optional(),
  bank_account: z
    .object({
      currency: CurrencySchema,
      channel_properties: z
        .object({
          account_mobile_number: z.string().optional(),
          card_last_four: z.string().optional(),
          card_expiry_month: z.string().optional(),
          card_expiry_year: z.string().optional(),
          account_email: z.string().email().optional(),
        })
        .optional(),
    })
    .optional(),
  ewallet: z
    .object({
      channel_code: z.string(),
      channel_properties: z
        .object({
          success_return_url: z.string().url().optional(),
          failure_return_url: z.string().url().optional(),
          cancel_return_url: z.string().url().optional(),
        })
        .optional(),
    })
    .optional(),
});
export type CreatePaymentMethod = z.infer<typeof CreatePaymentMethodSchema>;

// Update Payment Method Request
export const UpdatePaymentMethodSchema = z.object({
  description: z.string().optional(),
  reference_id: z.string().optional(),
  status: PaymentMethodStatusSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type UpdatePaymentMethod = z.infer<typeof UpdatePaymentMethodSchema>;

// Payment Method Resource
export const PaymentMethodResourceSchema = z.object({
  id: z.string(),
  type: PaymentMethodTypeSchema,
  country: CountrySchema.optional(),
  business_id: z.string(),
  customer_id: z.string().optional(),
  reference_id: z.string().optional(),
  description: z.string().optional(),
  status: PaymentMethodStatusSchema,
  reusability: z.union([z.literal("ONE_TIME_USE"), z.literal("MULTIPLE_USE")]),
  actions: z
    .array(
      z.object({
        action: z.string(),
        url: z.string().url().optional(),
        url_type: z.string().optional(),
        method: z.string().optional(),
      })
    )
    .optional(),
  metadata: z.record(z.unknown()).optional(),
  billing_information: z
    .object({
      country: CountrySchema.optional(),
      street_line1: z.string().optional(),
      street_line2: z.string().optional(),
      city: z.string().optional(),
      province_state: z.string().optional(),
      postal_code: z.string().optional(),
    })
    .optional(),
  failure_code: z.string().nullable().optional(),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  // Type-specific properties
  card: CardPropertiesSchema.optional(),
  bank_account: BankAccountPropertiesSchema.optional(),
  ewallet: EwalletPropertiesSchema.optional(),
});
export type PaymentMethodResource = z.infer<typeof PaymentMethodResourceSchema>;

// Get Payment Method Request
export const GetPaymentMethodSchema = z.object({
  id: z.string(),
});
export type GetPaymentMethod = z.infer<typeof GetPaymentMethodSchema>;

// List Payment Methods Request
export const ListPaymentMethodsSchema = z.object({
  id: z.array(z.string()).optional(),
  type: z.array(PaymentMethodTypeSchema).optional(),
  status: z.array(PaymentMethodStatusSchema).optional(),
  reusability: z
    .union([z.literal("ONE_TIME_USE"), z.literal("MULTIPLE_USE")])
    .optional(),
  customer_id: z.string().optional(),
  reference_id: z.string().optional(),
  after_id: z.string().optional(),
  before_id: z.string().optional(),
  limit: z.number().min(1).max(100).default(10).optional(),
});
export type ListPaymentMethods = z.infer<typeof ListPaymentMethodsSchema>;

// List Payment Methods Response
export const ListPaymentMethodsResponseSchema = z.object({
  data: z.array(PaymentMethodResourceSchema),
  has_more: z.boolean(),
  links: z
    .object({
      href: z.string(),
      rel: z.string(),
      method: z.string(),
    })
    .array(),
});
export type ListPaymentMethodsResponse = z.infer<
  typeof ListPaymentMethodsResponseSchema
>;

// Update Payment Method Params
export const UpdatePaymentMethodParamsSchema = z.object({
  id: z.string(),
  payload: UpdatePaymentMethodSchema,
});
export type UpdatePaymentMethodParams = z.infer<
  typeof UpdatePaymentMethodParamsSchema
>;
