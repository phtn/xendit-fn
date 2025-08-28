import { z } from "zod";
import { createHmac } from "crypto";

// Webhook Event Types
export const WebhookEventTypeSchema = z.union([
  z.literal("invoice.paid"),
  z.literal("invoice.expired"),
  z.literal("payment.succeeded"),
  z.literal("payment.failed"),
  z.literal("ewallet.charge.succeeded"),
  z.literal("ewallet.charge.pending"),
  z.literal("ewallet.charge.failed"),
  z.literal("payment_method.activate"),
  z.literal("payment_method.expire"),
  z.literal("customer.created"),
  z.literal("customer.updated"),
]);
export type WebhookEventType = z.infer<typeof WebhookEventTypeSchema>;

// Base Webhook Event Schema
export const WebhookEventSchema = z.object({
  id: z.string(),
  event: WebhookEventTypeSchema,
  api_version: z.string(),
  created: z.string().datetime(),
  business_id: z.string(),
  data: z.record(z.unknown()),
});
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;

// Webhook signature verification
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
export function verifyWebhookSignature(
  options: WebhookVerificationOptions
): boolean {
  const { callbackToken, receivedToken } = options;

  // Simple token comparison for Xendit webhooks
  return callbackToken === receivedToken;
}

/**
 * Advanced webhook signature verification using HMAC
 * @param options Verification options with HMAC
 * @returns true if signature is valid, false otherwise
 */
export function verifyWebhookHmac(options: {
  secret: string;
  requestBody: string | Buffer;
  signature: string;
}): boolean {
  const { secret, requestBody, signature } = options;

  const body =
    typeof requestBody === "string"
      ? requestBody
      : requestBody.toString("utf8");
  const expectedSignature = createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return `sha256=${expectedSignature}` === signature;
}

/**
 * Parse and validate webhook event
 * @param rawEvent Raw webhook event data
 * @returns Parsed and validated webhook event
 */
export function parseWebhookEvent(rawEvent: unknown): WebhookEvent {
  const result = WebhookEventSchema.safeParse(rawEvent);

  if (!result.success) {
    throw new Error(`Invalid webhook event format: ${result.error.message}`);
  }

  return result.data;
}

/**
 * Type-safe webhook event handler
 */
export interface WebhookHandlers {
  "invoice.paid"?: (event: WebhookEvent) => void | Promise<void>;
  "invoice.expired"?: (event: WebhookEvent) => void | Promise<void>;
  "payment.succeeded"?: (event: WebhookEvent) => void | Promise<void>;
  "payment.failed"?: (event: WebhookEvent) => void | Promise<void>;
  "ewallet.charge.succeeded"?: (event: WebhookEvent) => void | Promise<void>;
  "ewallet.charge.pending"?: (event: WebhookEvent) => void | Promise<void>;
  "ewallet.charge.failed"?: (event: WebhookEvent) => void | Promise<void>;
  "payment_method.activate"?: (event: WebhookEvent) => void | Promise<void>;
  "payment_method.expire"?: (event: WebhookEvent) => void | Promise<void>;
  "customer.created"?: (event: WebhookEvent) => void | Promise<void>;
  "customer.updated"?: (event: WebhookEvent) => void | Promise<void>;
  [key: string]: ((event: WebhookEvent) => void | Promise<void>) | undefined;
}

/**
 * Handle webhook events with type-safe handlers
 * @param event Webhook event
 * @param handlers Event handlers
 */
export async function handleWebhookEvent(
  event: WebhookEvent,
  handlers: WebhookHandlers
): Promise<void> {
  const handler = handlers[event.event];

  if (handler) {
    await handler(event);
  } else {
    console.warn(`No handler found for webhook event: ${event.event}`);
  }
}

/**
 * Create a webhook processor with built-in verification
 */
export function createWebhookProcessor(options: {
  callbackToken?: string;
  hmacSecret?: string;
}) {
  return {
    /**
     * Process a webhook request
     */
    async processWebhook(
      requestBody: string | Buffer,
      headers: Record<string, string>,
      handlers: WebhookHandlers
    ): Promise<{ success: boolean; error?: string }> {
      try {
        // Verify signature
        if (options.callbackToken) {
          const receivedToken =
            headers["x-callback-token"] || headers["X-Callback-Token"];
          if (
            !receivedToken ||
            !verifyWebhookSignature({
              callbackToken: options.callbackToken,
              requestBody,
              receivedToken,
            })
          ) {
            return { success: false, error: "Invalid webhook signature" };
          }
        }

        if (options.hmacSecret) {
          const signature =
            headers["x-xendit-signature"] || headers["X-Xendit-Signature"];
          if (
            !signature ||
            !verifyWebhookHmac({
              secret: options.hmacSecret,
              requestBody,
              signature,
            })
          ) {
            return { success: false, error: "Invalid HMAC signature" };
          }
        }

        // Parse event
        const body =
          typeof requestBody === "string"
            ? requestBody
            : requestBody.toString("utf8");
        const rawEvent = JSON.parse(body);
        const event = parseWebhookEvent(rawEvent);

        // Handle event
        await handleWebhookEvent(event, handlers);

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  };
}
