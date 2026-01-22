import { z } from "zod";
import { CurrencySchema, PhoneSchema } from "../common";

export const CheckoutMethodSchema = z.union([
  z.literal("ONE_TIME_PAYMENT"),
  z.literal("TOKENIZED_PAYMENT"),
]);
export type CheckoutMethod = z.infer<typeof CheckoutMethodSchema>;
export const ChannelCodeSchema = z.union([
  z.literal("ID_OVO"),
  z.literal("ID_DANA"),
  z.literal("ID_LINKAJA"),
  z.literal("ID_SHOPEEPAY"),
  z.literal("ID_ASTRAPAY"),
  z.literal("ID_JENIUSPAY"),
  z.literal("ID_SAKUKU"),
  z.literal("PH_PAYMAYA"),
  z.literal("PH_GCASH"),
  z.literal("PH_GRABPAY"),
  z.literal("PH_SHOPEEPAY"),
  z.literal("VN_APPOTA"),
  z.literal("VN_MOMO"),
  z.literal("VN_SHOPEEPAY"),
  z.literal("VN_VNPTWALLET"),
  z.literal("VN_VIETTELPAY"),
  z.literal("VN_ZALOPAY"),
  z.literal("TH_WECHATPAY"),
  z.literal("TH_LINEPAY"),
  z.literal("TH_TRUEMONEY"),
  z.literal("TH_SHOPEEPAY"),
  z.literal("MY_TOUCHNGO"),
  z.literal("MY_SHOPEEPAY"),
  z.literal("MY_GRABPAY"),
]);

const OVOChannelSchema = z.object({
  mobile_number: PhoneSchema,
});

const ChannelsSchema = z.object({
  cashtag: z
    .string()
    .refine((value: string) => value.startsWith("$"))
    .optional(),
  mobile_number: PhoneSchema.optional(),
  success_redirect_url: z.string().url().optional(),
  failure_redirect_url: z.string().url().optional(),
  cancel_redirect_url: z.string().url().optional(),
  redeem_points: z
    .union([z.literal("REDEEM_ALL"), z.literal("REDEEM_NONE")])
    .default("REDEEM_NONE")
    .optional(),
});

const ChannelPropertiesSchema = z.discriminatedUnion("channel_code", [
  z.object({
    channel_code: z.literal("ID_OVO"),
    channel_properties: OVOChannelSchema,
  }),
  z.object({
    channel_code: z.literal("ID_JENIUSPAY"),
    properties: z.discriminatedUnion("method", [
      z.object({
        method: z.literal("ONE_TIME_PAYMENT"),
        properties: z.object({
          cashtag: z.string().refine((value: string) => value.startsWith("$")),
        }),
      }),
      z.object({
        method: z.literal("TOKENIZED_PAYMENT"),
        properties: z.object({
          success_redirect_url: z.string().url(),
          failure_redirect_url: z.string().url(),
          redeem_points: z
            .union([z.literal("REDEEM_ALL"), z.literal("REDEEM_NONE")])
            .default("REDEEM_NONE")
            .optional(),
        }),
      }),
    ]),
  }),
  z.object({
    channel_code: z.union([
      z.literal("ID_DANA"),
      z.literal("ID_LINKAJA"),
      z.literal("ID_SHOPEEPAY"),
      z.literal("PH_SHOPEEPAY"),
      z.literal("TH_SHOPEEPAY"),
      z.literal("TH_WECHATPAY"),
      z.literal("TH_TOUCHNGO"),
      z.literal("TH_TRUEMONEY"),
      z.literal("ID_SAKUKU"),
    ]),
    properties: z.discriminatedUnion("method", [
      z.object({
        method: z.literal("ONE_TIME_PAYMENT"),
        properties: z.object({
          success_redirect_url: z.string().url(),
        }),
      }),
      z.object({
        method: z.literal("TOKENIZED_PAYMENT"),
        properties: z.object({
          success_redirect_url: z.string().url(),
          failure_redirect_url: z.string().url(),
          redeem_points: z
            .union([z.literal("REDEEM_ALL"), z.literal("REDEEM_NONE")])
            .default("REDEEM_NONE")
            .optional(),
        }),
      }),
    ]),
  }),
  z.object({
    channel_code: z.literal("PH_PAYMAYA"),
    properties: z.object({
      success_redirect_url: z.string().url(),
      failure_redirect_url: z.string().url(),
      cancel_redirect_url: z.string().url(),
    }),
  }),
]);

export const LineItemSchema = z.object({
  reference_id: z.string(),
  name: z.string(),
  category: z.string(),
  currency: CurrencySchema,
  price: z.number(),
  quantity: z.number(),
  type: z.union([z.literal("PRODUCT"), z.literal("SERVICE")]),
  url: z.string().url().optional(),
  description: z.string().optional(),
  subcategory: z.string().optional(),
  metadata: z.object({}).optional(),
});
export type LineItem = z.infer<typeof LineItemSchema>;

// Create a discriminated union based on checkout method
export const EWalletChargeSchema = z.discriminatedUnion("checkout_method", [
  z.object({
    reference_id: z.string(),
    currency: CurrencySchema,
    amount: z.number(),
    checkout_method: z.literal("ONE_TIME_PAYMENT"),
    channel_code: ChannelCodeSchema,
    channel_properties: ChannelsSchema,
    payment_method_id: z.undefined().optional(),
    customer_id: z.string().optional(),
    basket: z.array(LineItemSchema).optional(),
    metadata: z.object({}).optional(),
  }),
  z.object({
    reference_id: z.string(),
    currency: CurrencySchema,
    amount: z.number(),
    checkout_method: z.literal("TOKENIZED_PAYMENT"),
    channel_code: ChannelCodeSchema.optional(),
    channel_properties: ChannelsSchema,
    payment_method_id: z.string(),
    customer_id: z.string().optional(),
    basket: z.array(LineItemSchema).optional(),
    metadata: z.object({}).optional(),
  }),
]);

export type EWalletChargeParams = z.infer<typeof EWalletChargeSchema>;

export const EWalletStatusSchema = z.union([
  z.literal("SUCCEEDED"),
  z.literal("PENDING"),
  z.literal("FAILED"),
  z.literal("VOIDED"),
  z.literal("REFUNDED"),
]);

export const EWalletResourceActionsSchema = z.object({
  desktop_web_checkout_url: z.string().url().optional(),
  mobile_web_checkout_url: z.string().url().optional(),
  mobile_deeplink_checkout_url: z.string().url().optional(),
  qr_checkout_string: z.string().url().optional(),
});
export type EWalletResourceActions = z.infer<
  typeof EWalletResourceActionsSchema
>;

export const EWalletChargeResourceSchema = z.object({
  id: z.string(),
  business_id: z.string(),
  reference_id: z.string(),
  status: EWalletStatusSchema,
  currency: CurrencySchema,
  charge_amount: z.number(),
  capture_amount: z.number().optional(),
  refunded_amount: z.number().nullable(),
  checkout_method: CheckoutMethodSchema,
  channel_code: ChannelCodeSchema,
  channel_properties: ChannelPropertiesSchema,
  actions: EWalletResourceActionsSchema.optional(),
  is_redirect_required: z.boolean(),
  callback_url: z.string(),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  void_status: z.string().nullable(),
  voided_at: z.string().nullable(),
  capture_now: z.boolean(),
  customer_id: z.string().nullable(),
  payment_method_id: z.string().nullable(),
  failure_code: z.string().nullable(),
  basket: z.array(LineItemSchema).optional(),
  metadata: z.object({}).optional(),
});

export type EWalletChargeResource = z.infer<typeof EWalletChargeResourceSchema>;

export const GetEWalletChargeSchema = z.object({
  id: z.string().startsWith("ewc"),
});
export type GetEWalletChargeParams = z.infer<typeof GetEWalletChargeSchema>;
