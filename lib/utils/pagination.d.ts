import { z } from "zod";
import { AxiosInstance } from "axios";
export declare const PaginationMetaSchema: z.ZodObject<{
    has_more: z.ZodBoolean;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    total_count: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}, {
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}>;
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export declare const PaginatedResponseSchema: <T extends z.ZodType>(itemSchema: T) => z.ZodObject<{
    data: z.ZodArray<T, "many">;
    has_more: z.ZodBoolean;
    after_id: z.ZodOptional<z.ZodString>;
    before_id: z.ZodOptional<z.ZodString>;
    total_count: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    data: T["_output"][];
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}, {
    data: T["_input"][];
    has_more: boolean;
    after_id?: string | undefined;
    before_id?: string | undefined;
    total_count?: number | undefined;
}>;
export type PaginatedResponse<T> = {
    data: T[];
    has_more: boolean;
    after_id?: string;
    before_id?: string;
    total_count?: number;
};
export interface PaginationOptions {
    /**
     * Maximum number of items to return per page
     * @default 10
     */
    limit?: number;
    /**
     * Return items after this ID (for forward pagination)
     */
    after_id?: string;
    /**
     * Return items before this ID (for backward pagination)
     */
    before_id?: string;
}
export interface AutoPaginationOptions extends PaginationOptions {
    /**
     * Maximum number of pages to fetch (safety limit)
     * @default 100
     */
    maxPages?: number;
    /**
     * Maximum number of total items to fetch
     */
    maxItems?: number;
}
/**
 * Helper to build pagination query parameters
 */
export declare function buildPaginationParams(options: PaginationOptions): Record<string, string>;
/**
 * Generic paginated API fetcher
 */
export declare function fetchPaginated<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: PaginationOptions): Promise<PaginatedResponse<T>>;
/**
 * Auto-paginate through all pages and return all items
 */
export declare function fetchAllPages<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: AutoPaginationOptions): Promise<T[]>;
/**
 * Create a paginator iterator for streaming through pages
 */
export declare function createPaginator<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, initialOptions?: PaginationOptions): {
    /**
     * Get the next page
     */
    next(): Promise<{
        value: PaginatedResponse<T>;
        done: boolean;
    }>;
    /**
     * Reset the paginator to start from the beginning
     */
    reset(options?: PaginationOptions): void;
    /**
     * Check if there are more pages available
     */
    hasMore(): boolean;
};
/**
 * Async iterator for easy for-await-of usage
 */
export declare function iteratePages<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: PaginationOptions): AsyncIterableIterator<PaginatedResponse<T>>;
/**
 * Async iterator for individual items across all pages
 */
export declare function iterateItems<T>(axiosInstance: AxiosInstance, endpoint: string, itemSchema: z.ZodType<T>, options?: AutoPaginationOptions): AsyncIterableIterator<T>;
/**
 * Utility for search and filtering with pagination
 */
export interface SearchPaginationOptions extends PaginationOptions {
    /**
     * Search query
     */
    query?: string;
    /**
     * Filter parameters
     */
    filters?: Record<string, unknown>;
    /**
     * Sort field
     */
    sort_by?: string;
    /**
     * Sort direction
     */
    sort_direction?: "asc" | "desc";
}
export declare function buildSearchParams(options: SearchPaginationOptions): Record<string, string>;
//# sourceMappingURL=pagination.d.ts.map