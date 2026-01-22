import { z } from "zod";
import { CurrencySchema } from "../common";

// Payout Status
export const PayoutStatusSchema = z.union([
  z.literal("ACCEPTED"),
  z.literal("PENDING"),
  z.literal("PROCESSING"),
  z.literal("COMPLETED"),
  z.literal("FAILED"),
  z.literal("CANCELLED"),
  z.literal("REVERSED"),
]);
export type PayoutStatus = z.infer<typeof PayoutStatusSchema>;

// Payout Channel Code
export const PayoutChannelCodeSchema = z.union([
  z.literal("BANK"),
  z.literal("EWALLET"),
  z.literal("CASH"),
]);
export type PayoutChannelCode = z.infer<typeof PayoutChannelCodeSchema>;

// Bank Account
export const BankAccountSchema = z.object({
  account_holder_name: z.string(),
  account_number: z.string(),
  bank_code: z.string(),
  account_type: z.string().optional(),
});
export type BankAccount = z.infer<typeof BankAccountSchema>;

// E-wallet Account
export const EwalletAccountSchema = z.object({
  account_holder_name: z.string(),
  account_number: z.string(),
  ewallet_type: z.string(),
});
export type EwalletAccount = z.infer<typeof EwalletAccountSchema>;

// Payout Method
export const PayoutMethodSchema = z.discriminatedUnion("channel_code", [
  z.object({
    channel_code: z.literal("BANK"),
    bank_account: BankAccountSchema,
  }),
  z.object({
    channel_code: z.literal("EWALLET"),
    ewallet: EwalletAccountSchema,
  }),
  z.object({
    channel_code: z.literal("CASH"),
    cash: z.object({
      account_holder_name: z.string(),
      account_number: z.string(),
    }),
  }),
]);
export type PayoutMethod = z.infer<typeof PayoutMethodSchema>;

// Create Payout Schema
export const CreatePayoutSchema = z.object({
  reference_id: z.string(),
  channel_code: PayoutChannelCodeSchema,
  channel_properties: PayoutMethodSchema,
  amount: z.number().positive(),
  currency: CurrencySchema,
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  receipt_notification: z
    .object({
      email_to: z.array(z.string().email()).optional(),
      email_cc: z.array(z.string().email()).optional(),
      email_bcc: z.array(z.string().email()).optional(),
    })
    .optional(),
});
export type CreatePayout = z.infer<typeof CreatePayoutSchema>;

// Payout Resource
export const PayoutResourceSchema = z.object({
  id: z.string(),
  reference_id: z.string(),
  channel_code: PayoutChannelCodeSchema,
  channel_properties: PayoutMethodSchema,
  amount: z.number(),
  currency: CurrencySchema,
  status: PayoutStatusSchema,
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  failure_reason: z.string().optional(),
  estimated_arrival_time: z.string().datetime().optional(),
  receipt_notification: z
    .object({
      email_to: z.array(z.string().email()).optional(),
      email_cc: z.array(z.string().email()).optional(),
      email_bcc: z.array(z.string().email()).optional(),
    })
    .optional(),
});
export type PayoutResource = z.infer<typeof PayoutResourceSchema>;

// Get Payout Schema
export const GetPayoutSchema = z.object({
  id: z.string(),
});
export type GetPayout = z.infer<typeof GetPayoutSchema>;

// List Payouts Schema
export const ListPayoutsSchema = z.object({
  reference_id: z.string().optional(),
  channel_code: z.array(PayoutChannelCodeSchema).optional(),
  status: z.array(PayoutStatusSchema).optional(),
  limit: z.number().min(1).max(100).optional(),
  after_id: z.string().optional(),
  before_id: z.string().optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
});
export type ListPayouts = z.infer<typeof ListPayoutsSchema>;

// List Payouts Response
export const ListPayoutsResponseSchema = z.object({
  data: z.array(PayoutResourceSchema),
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
export type ListPayoutsResponse = z.infer<typeof ListPayoutsResponseSchema>;

// Cancel Payout Schema
export const CancelPayoutSchema = z.object({
  id: z.string(),
});
export type CancelPayout = z.infer<typeof CancelPayoutSchema>;
