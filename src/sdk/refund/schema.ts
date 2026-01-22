import { z } from "zod";

// Refund Reason
export const RefundReasonSchema = z.union([
  z.literal("REQUESTED_BY_CUSTOMER"),
  z.literal("FRAUDULENT"),
  z.literal("DUPLICATE"),
  z.literal("CANCELLATION"),
  z.literal("OTHERS"),
]);
export type RefundReason = z.infer<typeof RefundReasonSchema>;

// Refund Status
export const RefundStatusSchema = z.union([
  z.literal("PENDING"),
  z.literal("SUCCEEDED"),
  z.literal("FAILED"),
]);
export type RefundStatus = z.infer<typeof RefundStatusSchema>;

// Create Refund Schema
export const CreateRefundSchema = z.object({
  payment_request_id: z.string(),
  amount: z.number().positive().optional(),
  reason: RefundReasonSchema,
  metadata: z.record(z.unknown()).optional(),
});
export type CreateRefund = z.infer<typeof CreateRefundSchema>;

// Refund Resource
export const RefundResourceSchema = z.object({
  id: z.string(),
  payment_request_id: z.string(),
  amount: z.number(),
  currency: z.string(),
  reason: RefundReasonSchema,
  status: RefundStatusSchema,
  metadata: z.record(z.unknown()).optional(),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  failure_reason: z.string().optional(),
});
export type RefundResource = z.infer<typeof RefundResourceSchema>;

// Get Refund Schema
export const GetRefundSchema = z.object({
  id: z.string(),
});
export type GetRefund = z.infer<typeof GetRefundSchema>;

// List Refunds Schema
export const ListRefundsSchema = z.object({
  payment_request_id: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  after_id: z.string().optional(),
  before_id: z.string().optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
});
export type ListRefunds = z.infer<typeof ListRefundsSchema>;

// List Refunds Response
export const ListRefundsResponseSchema = z.object({
  data: z.array(RefundResourceSchema),
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
export type ListRefundsResponse = z.infer<typeof ListRefundsResponseSchema>;
