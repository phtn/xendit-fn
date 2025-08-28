import type { AxiosError } from "axios";
import { z } from "zod";
export interface XenditError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}
export declare const XenditErrorSchema: z.ZodObject<{
    error_code: z.ZodString;
    message: z.ZodString;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodOptional<z.ZodString>;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        field?: string | undefined;
    }, {
        message: string;
        field?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    error_code: string;
    message: string;
    errors?: {
        message: string;
        field?: string | undefined;
    }[] | undefined;
}, {
    error_code: string;
    message: string;
    errors?: {
        message: string;
        field?: string | undefined;
    }[] | undefined;
}>;
export declare class XenditApiError extends Error {
    readonly code: string;
    readonly details?: Record<string, unknown>;
    readonly statusCode?: number;
    constructor(message: string, code: string, statusCode?: number, details?: Record<string, unknown>);
}
export declare class ValidationError extends Error {
    readonly field?: string;
    readonly validationErrors: z.ZodIssue[];
    constructor(message: string, validationErrors: z.ZodIssue[], field?: string);
}
export declare class AuthenticationError extends XenditApiError {
    constructor(message?: string);
}
export declare class NotFoundError extends XenditApiError {
    constructor(message?: string);
}
export declare class RateLimitError extends XenditApiError {
    constructor(message?: string);
}
export declare const handleAxiosError: (error: AxiosError) => never;
export declare const validateInput: <T>(schema: z.ZodSchema<T>, data: unknown, fieldName?: string) => T;
//# sourceMappingURL=errors.d.ts.map