import { z } from "zod";
export declare const BalanceResourceSchema: z.ZodObject<{
    balance: z.ZodNumber;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    account_type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    balance: number;
    account_type?: string | undefined;
}, {
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    balance: number;
    account_type?: string | undefined;
}>;
export type BalanceResource = z.infer<typeof BalanceResourceSchema>;
export declare const TransactionTypeSchema: z.ZodUnion<[z.ZodLiteral<"PAYMENT">, z.ZodLiteral<"PAYOUT">, z.ZodLiteral<"REFUND">, z.ZodLiteral<"FEE">, z.ZodLiteral<"ADJUSTMENT">]>;
export type TransactionType = z.infer<typeof TransactionTypeSchema>;
export declare const TransactionStatusSchema: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">]>;
export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;
export declare const TransactionResourceSchema: z.ZodObject<{
    id: z.ZodString;
    reference_id: z.ZodOptional<z.ZodString>;
    type: z.ZodUnion<[z.ZodLiteral<"PAYMENT">, z.ZodLiteral<"PAYOUT">, z.ZodLiteral<"REFUND">, z.ZodLiteral<"FEE">, z.ZodLiteral<"ADJUSTMENT">]>;
    status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">]>;
    amount: z.ZodNumber;
    currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
    created: z.ZodString;
    updated: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
    type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    id: string;
    created: string;
    updated: string;
    amount: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
}, {
    status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
    type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
    currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
    id: string;
    created: string;
    updated: string;
    amount: number;
    description?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
    reference_id?: string | undefined;
}>;
export type TransactionResource = z.infer<typeof TransactionResourceSchema>;
export declare const ListTransactionsSchema: z.ZodObject<{
    types: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"PAYMENT">, z.ZodLiteral<"PAYOUT">, z.ZodLiteral<"REFUND">, z.ZodLiteral<"FEE">, z.ZodLiteral<"ADJUSTMENT">]>, "many">>;
    statuses: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">]>, "many">>;
    limit: z.ZodOptional<z.ZodNumber>;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    statuses?: ("SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED")[] | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    types?: ("PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT")[] | undefined;
}, {
    after_id?: string | undefined;
    before_id?: string | undefined;
    limit?: number | undefined;
    statuses?: ("SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED")[] | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    types?: ("PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT")[] | undefined;
}>;
export type ListTransactions = z.infer<typeof ListTransactionsSchema>;
export declare const ListTransactionsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        reference_id: z.ZodOptional<z.ZodString>;
        type: z.ZodUnion<[z.ZodLiteral<"PAYMENT">, z.ZodLiteral<"PAYOUT">, z.ZodLiteral<"REFUND">, z.ZodLiteral<"FEE">, z.ZodLiteral<"ADJUSTMENT">]>;
        status: z.ZodUnion<[z.ZodLiteral<"PENDING">, z.ZodLiteral<"SUCCEEDED">, z.ZodLiteral<"FAILED">, z.ZodLiteral<"CANCELLED">]>;
        amount: z.ZodNumber;
        currency: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">, z.ZodLiteral<"SGD">, z.ZodLiteral<"USD">]>;
        created: z.ZodString;
        updated: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
        type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        id: string;
        created: string;
        updated: string;
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        reference_id?: string | undefined;
    }, {
        status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
        type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        id: string;
        created: string;
        updated: string;
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        reference_id?: string | undefined;
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
        status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
        type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        id: string;
        created: string;
        updated: string;
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        reference_id?: string | undefined;
    }[];
    has_more: boolean;
    links?: {
        method: string;
        href: string;
        rel: string;
    }[] | undefined;
}, {
    data: {
        status: "SUCCEEDED" | "PENDING" | "FAILED" | "CANCELLED";
        type: "PAYMENT" | "PAYOUT" | "REFUND" | "FEE" | "ADJUSTMENT";
        currency: "PHP" | "IDR" | "MYR" | "THB" | "VND" | "SGD" | "USD";
        id: string;
        created: string;
        updated: string;
        amount: number;
        description?: string | undefined;
        metadata?: Record<string, unknown> | undefined;
        reference_id?: string | undefined;
    }[];
    has_more: boolean;
    links?: {
        method: string;
        href: string;
        rel: string;
    }[] | undefined;
}>;
export type ListTransactionsResponse = z.infer<typeof ListTransactionsResponseSchema>;
//# sourceMappingURL=schema.d.ts.map