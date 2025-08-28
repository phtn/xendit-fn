import type { AxiosError } from "axios";
import { z } from "zod";

export interface XenditError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export const XenditErrorSchema = z.object({
  error_code: z.string(),
  message: z.string(),
  errors: z
    .array(
      z.object({
        field: z.string().optional(),
        message: z.string(),
      })
    )
    .optional(),
});

export class XenditApiError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;
  public readonly statusCode?: number;

  constructor(
    message: string,
    code: string,
    statusCode?: number,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "XenditApiError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    // Maintain proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, XenditApiError);
    }
  }
}

export class ValidationError extends Error {
  public readonly field?: string;
  public readonly validationErrors: z.ZodIssue[];

  constructor(message: string, validationErrors: z.ZodIssue[], field?: string) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.validationErrors = validationErrors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

export class AuthenticationError extends XenditApiError {
  constructor(message: string = "Authentication failed") {
    super(message, "AUTHENTICATION_ERROR", 401);
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends XenditApiError {
  constructor(message: string = "Resource not found") {
    super(message, "NOT_FOUND_ERROR", 404);
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends XenditApiError {
  constructor(message: string = "Rate limit exceeded") {
    super(message, "RATE_LIMIT_ERROR", 429);
    this.name = "RateLimitError";
  }
}

export const handleAxiosError = (error: AxiosError): never => {
  if (error.response?.data) {
    const parsed = XenditErrorSchema.safeParse(error.response.data);
    if (parsed.success) {
      throw new XenditApiError(
        parsed.data.message,
        parsed.data.error_code,
        error.response.status,
        parsed.data.errors ? { errors: parsed.data.errors } : undefined
      );
    }
  }

  throw new XenditApiError(
    error.message || "Unknown API error",
    error.code || "UNKNOWN_ERROR",
    error.response?.status,
    error.response?.data as Record<string, unknown>
  );
};

export const validateInput = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  fieldName?: string
): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ValidationError(
      `Validation failed${fieldName ? ` for field ${fieldName}` : ""}`,
      result.error.issues,
      fieldName
    );
  }
  return result.data;
};
