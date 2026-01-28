import { z } from "zod";
import { CountrySchema, CurrencySchema } from "../common";

// Session Type
export const SessionTypeSchema = z.union([
  z.literal("SAVE"),
  z.literal("PAY"),
]);
export type SessionType = z.infer<typeof SessionTypeSchema>;

// Allow Save Payment Method
export const AllowSavePaymentMethodSchema = z.union([
  z.literal("DISABLED"),
  z.literal("OPTIONAL"),
  z.literal("FORCED"),
]);
export type AllowSavePaymentMethod = z.infer<
  typeof AllowSavePaymentMethodSchema
>;

// Session Mode
export const SessionModeSchema = z.union([
  z.literal("PAYMENT_LINK"),
  z.literal("COMPONENTS"),
]);
export type SessionMode = z.infer<typeof SessionModeSchema>;

// Capture Method
export const CaptureMethodSchema = z.union([
  z.literal("AUTOMATIC"),
  z.literal("MANUAL"),
]);
export type CaptureMethod = z.infer<typeof CaptureMethodSchema>;

// Session Status
export const SessionStatusSchema = z.union([
  z.literal("ACTIVE"),
  z.literal("COMPLETED"),
  z.literal("EXPIRED"),
  z.literal("CANCELED"),
]);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

// Item Type
export const ItemTypeSchema = z.union([
  z.literal("DIGITAL_PRODUCT"),
  z.literal("PHYSICAL_PRODUCT"),
  z.literal("DIGITAL_SERVICE"),
  z.literal("PHYSICAL_SERVICE"),
  z.literal("FEE"),
]);
export type ItemType = z.infer<typeof ItemTypeSchema>;

// Gender
export const GenderSchema = z.union([
  z.literal("MALE"),
  z.literal("FEMALE"),
  z.literal("OTHER"),
]);
export type Gender = z.infer<typeof GenderSchema>;

// Individual Detail
export const IndividualDetailSchema = z.object({
  given_names: z.string().min(1).max(50),
  surname: z.string().min(1).max(50).optional(),
  nationality: z.string().length(2).optional(),
  place_of_birth: z.string().min(1).max(60).optional(),
  date_of_birth: z.string().length(10).optional(),
  gender: GenderSchema.optional(),
});
export type IndividualDetail = z.infer<typeof IndividualDetailSchema>;

// Customer Details
export const PaymentSessionCustomerDetailsSchema = z.object({
  type: z.literal("INDIVIDUAL"),
  reference_id: z.string().min(1).max(255),
  email: z.string().email().min(4).max(50).optional(),
  mobile_number: z.string().min(1).max(50).optional(),
  individual_detail: IndividualDetailSchema,
});
export type PaymentSessionCustomerDetails = z.infer<
  typeof PaymentSessionCustomerDetailsSchema
>;

// Item Schema
export const PaymentSessionItemSchema = z.object({
  reference_id: z.string().min(1).max(255),
  type: ItemTypeSchema.optional(),
  name: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  net_unit_amount: z.number(),
  quantity: z.number().int().min(1),
  currency: CurrencySchema,
  url: z.string().url().optional(),
  image_url: z.string().url().optional(),
  category: z.string().max(255),
  subcategory: z.string().max(255).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});
export type PaymentSessionItem = z.infer<typeof PaymentSessionItemSchema>;

// Channel Properties
export const ChannelPropertiesSchema = z.object({
  allowed_payment_channels: z.array(z.string()).optional(),
});
export type ChannelProperties = z.infer<typeof ChannelPropertiesSchema>;

// Metadata
export const MerchantMetadataSchema = z
  .record(z.string().max(40), z.string().max(500))
  .refine(
    (obj) => Object.keys(obj).length <= 50,
    "Metadata can have at most 50 keys"
  )
  .nullable()
  .optional();
export type MerchantMetadata = z.infer<typeof MerchantMetadataSchema>;

// Create Session Schema
export const CreateSessionSchema = z
  .object({
    reference_id: z.string().min(1).max(64),
    customer_id: z.string().min(41).max(41).optional(),
    customer: PaymentSessionCustomerDetailsSchema.optional(),
    session_type: SessionTypeSchema,
    allow_save_payment_method: AllowSavePaymentMethodSchema.optional(),
    currency: CurrencySchema,
    amount: z.number().min(0),
    mode: SessionModeSchema,
    capture_method: CaptureMethodSchema.optional(),
    country: CountrySchema,
    channel_properties: ChannelPropertiesSchema.optional(),
    expires_at: z.string().datetime().optional(),
    locale: z.string().optional(),
    metadata: MerchantMetadataSchema,
    description: z.string().min(1).max(1000).optional(),
    items: z.array(PaymentSessionItemSchema).nullable().optional(),
    success_return_url: z.string().url().optional(),
    cancel_return_url: z.string().url().optional(),
  })
  .refine(
    (data) => {
      // For SAVE session_type, amount must be 0
      if (data.session_type === "SAVE" && data.amount !== 0) {
        return false;
      }
      return true;
    },
    {
      message: "For SAVE session_type, amount must be 0",
      path: ["amount"],
    }
  )
  .refine(
    (data) => {
      // Either customer_id or customer must be provided
      return data.customer_id !== undefined || data.customer !== undefined;
    },
    {
      message: "Either customer_id or customer must be provided",
      path: ["customer"],
    }
  );
export type CreateSession = z.infer<typeof CreateSessionSchema>;

// Session Resource Schema
export const SessionResourceSchema = z.object({
  payment_session_id: z.string().min(27).max(27),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  reference_id: z.string().min(1).max(64),
  customer_id: z.string().min(41).max(41).optional(),
  session_type: SessionTypeSchema,
  allow_save_payment_method: AllowSavePaymentMethodSchema.optional(),
  currency: CurrencySchema,
  amount: z.number().min(0),
  country: CountrySchema,
  mode: SessionModeSchema,
  capture_method: CaptureMethodSchema.optional(),
  channel_properties: ChannelPropertiesSchema.optional(),
  allowed_payment_channels: z.array(z.string()).optional(),
  expires_at: z.string().datetime().optional(),
  locale: z.string().optional(),
  metadata: MerchantMetadataSchema,
  description: z.string().min(1).max(1000).optional(),
  items: z.array(PaymentSessionItemSchema).nullable().optional(),
  success_return_url: z.string().url().optional(),
  cancel_return_url: z.string().url().optional(),
  status: SessionStatusSchema,
  payment_link_url: z.string().url().nullable(),
  payment_token_id: z.string().nullable(),
  payment_id: z.string().nullable(),
  payment_request_id: z.string().nullable(),
  business_id: z.string(),
});
export type SessionResource = z.infer<typeof SessionResourceSchema>;
