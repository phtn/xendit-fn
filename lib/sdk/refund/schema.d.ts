import { z } from "zod";
export declare const RefundReasonSchema: z.ZodUnion<[z.ZodLiteral<"REQUESTED_BY_CUSTOMER">, z.ZodLiteral<"FRAUDULENT">, z.ZodLiteral<"DUPLICATE">, z.ZodLiteral<"CANCELLATION">, z.ZodLiteral<"OTHERS">]>;
export type RefundReason = z.infer<typeof RefundReasonSchema>;
export declare const RefundStatusSchema: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">]>;
export type RefundStatus = z.infer<typeof RefundStatusSchema>;
export declare const CreateRefundSchema: z.ZodObject<{
    payment_request_id: z.ZodString;
    amount: z.ZodOptional<z.ZodNumber>;
    reason: z.ZodUnion<[z.ZodLiteral<"REQUESTED_BY_CUSTOMER">, z.ZodLiteral<"FRAUDULENT">, z.ZodLiteral<"DUPLICATE">, z.ZodLiteral<"CANCELLATION">, z.ZodLiteral<"OTHERS">]>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    payment_request_id: string;
    reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
    metadata?: Record<string, unknown> | undefined;
    amount?: number | undefined;
}, {
    payment_request_id: string;
    reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
    metadata?: Record<string, unknown> | undefined;
    amount?: number | undefined;
}>;
export type CreateRefund = z.infer<typeof CreateRefundSchema>;
export declare const RefundResourceSchema: z.ZodObject<{
    id: z.ZodString;
    payment_request_id: z.ZodString;
    amount: z.ZodNumber;
    currency: z.ZodString;
    reason: z.ZodUnion<[z.ZodLiteral<"REQUESTED_BY_CUSTOMER">, z.ZodLiteral<"FRAUDULENT">, z.ZodLiteral<"DUPLICATE">, z.ZodLiteral<"CANCELLATION">, z.ZodLiteral<"OTHERS">]>;
    status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">]>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    created: z.ZodString;
    updated: z.ZodString;
    failure_reason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "SUCCEEDED" | "PENDING" | "FAILED";
    currency: string;
    id: string;
    created: string;
    updated: string;
    amount: number;
    payment_request_id: string;
    reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
    metadata?: Record<string, unknown> | undefined;
    failure_reason?: string | undefined;
}, {
    status: "SUCCEEDED" | "PENDING" | "FAILED";
    currency: string;
    id: string;
    created: string;
    updated: string;
    amount: number;
    payment_request_id: string;
    reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
    metadata?: Record<string, unknown> | undefined;
    failure_reason?: string | undefined;
}>;
export type RefundResource = z.infer<typeof RefundResourceSchema>;
export declare const GetRefundSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type GetRefund = z.infer<typeof GetRefundSchema>;
export declare const ListRefundsSchema: z.ZodObject<{
    payment_request_id: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    payment_request_id?: string | undefined;
}, {
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    payment_request_id?: string | undefined;
}>;
export type ListRefunds = z.infer<typeof ListRefundsSchema>;
export declare const ListRefundsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        payment_request_id: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodString;
        reason: z.ZodUnion<[z.ZodLiteral<"REQUESTED_BY_CUSTOMER">, z.ZodLiteral<"FRAUDULENT">, z.ZodLiteral<"DUPLICATE">, z.ZodLiteral<"CANCELLATION">, z.ZodLiteral<"OTHERS">]>;
        status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">]>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        created: z.ZodString;
        updated: z.ZodString;
        failure_reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "SUCCEEDED" | "PENDING" | "FAILED";
        currency: string;
        id: string;
        created: string;
        updated: string;
        amount: number;
        payment_request_id: string;
        reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
    }, {
        status: "SUCCEEDED" | "PENDING" | "FAILED";
        currency: string;
        id: string;
        created: string;
        updated: string;
        amount: number;
        payment_request_id: string;
        reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
    }>, "many">;
    has_more: z.ZodBoolean;
    links: z.ZodOptional<z.ZodArray<z.ZodObject<{
        href: z.ZodString;
        rel: z.ZodString;
        method: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        method: string;
        href: string;
        rel: string;
    }, {
        method: string;
        href: string;
        rel: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "SUCCEEDED" | "PENDING" | "FAILED";
        currency: string;
        id: string;
        created: string;
        updated: string;
        amount: number;
        payment_request_id: string;
        reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
    }[];
    has_more: boolean;
    links?: {
        method: string;
        href: string;
        rel: string;
    }[] | undefined;
}, {
    data: {
        status: "SUCCEEDED" | "PENDING" | "FAILED";
        currency: string;
        id: string;
        created: string;
        updated: string;
        amount: number;
        payment_request_id: string;
        reason: "REQUESTED_BY_CUSTOMER" | "FRAUDULENT" | "DUPLICATE" | "CANCELLATION" | "OTHERS";
        metadata?: Record<string, unknown> | undefined;
        failure_reason?: string | undefined;
    }[];
    has_more: boolean;
    links?: {
        method: string;
        href: string;
        rel: string;
    }[] | undefined;
}>;
export type ListRefundsResponse = z.infer<typeof ListRefundsResponseSchema>;
//# sourceMappingURL=schema.d.ts.map