import { z } from "zod";
import { CurrencySchema } from "../common";

// Balance Resource
export const BalanceResourceSchema = z.object({
  balance: z.number(),
  currency: CurrencySchema,
  account_type: z.string().optional(),
});
export type BalanceResource = z.infer<typeof BalanceResourceSchema>;

// Transaction Type
export const TransactionTypeSchema = z.union([
  z.literal("PAYMENT"),
  z.literal("PAYOUT"),
  z.literal("REFUND"),
  z.literal("FEE"),
  z.literal("ADJUSTMENT"),
]);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

// Transaction Status
export const TransactionStatusSchema = z.union([
  z.literal("PENDING"),
  z.literal("SUCCEEDED"),
  z.literal("FAILED"),
  z.literal("CANCELLED"),
]);
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

// Transaction Resource
export const TransactionResourceSchema = z.object({
  id: z.string(),
  reference_id: z.string().optional(),
  type: TransactionTypeSchema,
  status: TransactionStatusSchema,
  amount: z.number(),
  currency: CurrencySchema,
  created: z.string().datetime(),
  updated: z.string().datetime(),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type TransactionResource = z.infer<typeof TransactionResourceSchema>;

// List Transactions Schema
export const ListTransactionsSchema = z.object({
  types: z.array(TransactionTypeSchema).optional(),
  statuses: z.array(TransactionStatusSchema).optional(),
  limit: z.number().min(1).max(100).optional(),
  after_id: z.string().optional(),
  before_id: z.string().optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
});
export type ListTransactions = z.infer<typeof ListTransactionsSchema>;

// List Transactions Response
export const ListTransactionsResponseSchema = z.object({
  data: z.array(TransactionResourceSchema),
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
export type ListTransactionsResponse = z.infer<
  typeof ListTransactionsResponseSchema
>;
