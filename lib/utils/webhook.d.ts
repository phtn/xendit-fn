import { z } from "zod";
export declare const WebhookEventTypeSchema: z.ZodUnion<[z.ZodLiteral<"invoice.paid">, z.ZodLiteral<"invoice.expired">, z.ZodLiteral<"payment.succeeded">, z.ZodLiteral<"payment.failed">, z.ZodLiteral<"ewallet.charge.succeeded">, z.ZodLiteral<"ewallet.charge.pending">, z.ZodLiteral<"ewallet.charge.failed">, z.ZodLiteral<"payment_method.activate">, z.ZodLiteral<"payment_method.expire">, z.ZodLiteral<"customer.created">, z.ZodLiteral<"customer.updated">]>;
export type WebhookEventType = z.infer<typeof WebhookEventTypeSchema>;
export declare const WebhookEventSchema: z.ZodObject<{
    id: z.ZodString;
    event: z.ZodUnion<[z.ZodLiteral<"invoice.paid">, z.ZodLiteral<"invoice.expired">, z.ZodLiteral<"payment.succeeded">, z.ZodLiteral<"payment.failed">, z.ZodLiteral<"ewallet.charge.succeeded">, z.ZodLiteral<"ewallet.charge.pending">, z.ZodLiteral<"ewallet.charge.failed">, z.ZodLiteral<"payment_method.activate">, z.ZodLiteral<"payment_method.expire">, z.ZodLiteral<"customer.created">, z.ZodLiteral<"customer.updated">]>;
    api_version: z.ZodString;
    created: z.ZodString;
    business_id: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, unknown>;
    id: string;
    created: string;
    business_id: string;
    event: "invoice.paid" | "invoice.expired" | "payment.succeeded" | "payment.failed" | "ewallet.charge.succeeded" | "ewallet.charge.pending" | "ewallet.charge.failed" | "payment_method.activate" | "payment_method.expire" | "customer.created" | "customer.updated";
    api_version: string;
}, {
    data: Record<string, unknown>;
    id: string;
    created: string;
    business_id: string;
    event: "invoice.paid" | "invoice.expired" | "payment.succeeded" | "payment.failed" | "ewallet.charge.succeeded" | "ewallet.charge.pending" | "ewallet.charge.failed" | "payment_method.activate" | "payment_method.expire" | "customer.created" | "customer.updated";
    api_version: string;
}>;
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;
export interface WebhookVerificationOptions {
    /**
     * Webhook callback token from Xendit Dashboard
     */
    callbackToken: string;
    /**
     * Raw request body as received from Xendit
     */
    requestBody: string | Buffer;
    /**
     * X-Callback-Token header from the webhook request
     */
    receivedToken: string;
}
/**
 * Verify webhook signature from Xendit
 * @param options Verification options
 * @returns true if signature is valid, false otherwise
 */
export declare function verifyWebhookSignature(options: WebhookVerificationOptions): boolean;
/**
 * Advanced webhook signature verification using HMAC
 * @param options Verification options with HMAC
 * @returns true if signature is valid, false otherwise
 */
export declare function verifyWebhookHmac(options: {
    secret: string;
    requestBody: string | Buffer;
    signature: string;
}): boolean;
/**
 * Parse and validate webhook event
 * @param rawEvent Raw webhook event data
 * @returns Parsed and validated webhook event
 */
export declare function parseWebhookEvent(rawEvent: unknown): WebhookEvent;
/**
 * Type-safe webhook event handler
 */
export interface WebhookHandlers {
    'invoice.paid'?: (event: WebhookEvent) => void | Promise<void>;
    'invoice.expired'?: (event: WebhookEvent) => void | Promise<void>;
    'payment.succeeded'?: (event: WebhookEvent) => void | Promise<void>;
    'payment.failed'?: (event: WebhookEvent) => void | Promise<void>;
    'ewallet.charge.succeeded'?: (event: WebhookEvent) => void | Promise<void>;
    'ewallet.charge.pending'?: (event: WebhookEvent) => void | Promise<void>;
    'ewallet.charge.failed'?: (event: WebhookEvent) => void | Promise<void>;
    'payment_method.activate'?: (event: WebhookEvent) => void | Promise<void>;
    'payment_method.expire'?: (event: WebhookEvent) => void | Promise<void>;
    'customer.created'?: (event: WebhookEvent) => void | Promise<void>;
    'customer.updated'?: (event: WebhookEvent) => void | Promise<void>;
    [key: string]: ((event: WebhookEvent) => void | Promise<void>) | undefined;
}
/**
 * Handle webhook events with type-safe handlers
 * @param event Webhook event
 * @param handlers Event handlers
 */
export declare function handleWebhookEvent(event: WebhookEvent, handlers: WebhookHandlers): Promise<void>;
/**
 * Create a webhook processor with built-in verification
 */
export declare function createWebhookProcessor(options: {
    callbackToken?: string;
    hmacSecret?: string;
}): {
    /**
     * Process a webhook request
     */
    processWebhook(requestBody: string | Buffer, headers: Record<string, string>, handlers: WebhookHandlers): Promise<{
        success: boolean;
        error?: string;
    }>;
};
//# sourceMappingURL=webhook.d.ts.map