import { z } from "zod";
import { AxiosInstance, AxiosResponse } from "axios";

// Generic pagination response schema
export const PaginationMetaSchema = z.object({
  has_more: z.boolean(),
  after_id: z.string().optional(),
  before_id: z.string().optional(),
  total_count: z.number().optional(),
});
export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export const PaginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    has_more: z.boolean(),
    after_id: z.string().optional(),
    before_id: z.string().optional(),
    total_count: z.number().optional(),
  });

export type PaginatedResponse<T> = {
  data: T[];
  has_more: boolean;
  after_id?: string;
  before_id?: string;
  total_count?: number;
};

// Pagination options for API requests
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

// Options for auto-pagination
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
export function buildPaginationParams(
  options: PaginationOptions
): Record<string, string> {
  const params: Record<string, string> = {};

  if (options.limit) {
    params.limit = options.limit.toString();
  }

  if (options.after_id) {
    params.after_id = options.after_id;
  }

  if (options.before_id) {
    params.before_id = options.before_id;
  }

  return params;
}

/**
 * Generic paginated API fetcher
 */
export async function fetchPaginated<T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  itemSchema: z.ZodType<T>,
  options: PaginationOptions = {}
): Promise<PaginatedResponse<T>> {
  const params = buildPaginationParams(options);

  const response: AxiosResponse = await axiosInstance.get(endpoint, { params });

  const paginatedSchema = PaginatedResponseSchema(itemSchema);
  const result = paginatedSchema.parse(response.data);

  return result;
}

/**
 * Auto-paginate through all pages and return all items
 */
export async function fetchAllPages<T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  itemSchema: z.ZodType<T>,
  options: AutoPaginationOptions = {}
): Promise<T[]> {
  const {
    limit = 10,
    maxPages = 100,
    maxItems = Infinity,
    ...paginationOptions
  } = options;

  let allItems: T[] = [];
  let currentAfter: string | undefined = paginationOptions.after_id;
  let pageCount = 0;

  while (pageCount < maxPages && allItems.length < maxItems) {
    const response = await fetchPaginated(axiosInstance, endpoint, itemSchema, {
      ...paginationOptions,
      limit,
      after_id: currentAfter,
    });

    allItems = allItems.concat(response.data);
    pageCount++;

    // Stop if we've reached the maxItems limit
    if (allItems.length >= maxItems) {
      allItems = allItems.slice(0, maxItems);
      break;
    }

    // Stop if there are no more pages
    if (!response.has_more) {
      break;
    }

    // Update cursor for next page
    currentAfter = response.after_id;
  }

  return allItems;
}

/**
 * Create a paginator iterator for streaming through pages
 */
export function createPaginator<T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  itemSchema: z.ZodType<T>,
  initialOptions: PaginationOptions = {}
) {
  let currentOptions = { ...initialOptions };
  let exhausted = false;

  return {
    /**
     * Get the next page
     */
    async next(): Promise<{ value: PaginatedResponse<T>; done: boolean }> {
      if (exhausted) {
        return { value: {} as PaginatedResponse<T>, done: true };
      }

      const response = await fetchPaginated(
        axiosInstance,
        endpoint,
        itemSchema,
        currentOptions
      );

      // Update options for next call
      if (response.has_more && response.after_id) {
        currentOptions.after_id = response.after_id;
      } else {
        exhausted = true;
      }

      return { value: response, done: !response.has_more };
    },

    /**
     * Reset the paginator to start from the beginning
     */
    reset(options: PaginationOptions = {}) {
      currentOptions = { ...initialOptions, ...options };
      exhausted = false;
    },

    /**
     * Check if there are more pages available
     */
    hasMore(): boolean {
      return !exhausted;
    },
  };
}

/**
 * Async iterator for easy for-await-of usage
 */
export async function* iteratePages<T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  itemSchema: z.ZodType<T>,
  options: PaginationOptions = {}
): AsyncIterableIterator<PaginatedResponse<T>> {
  const paginator = createPaginator(
    axiosInstance,
    endpoint,
    itemSchema,
    options
  );

  while (paginator.hasMore()) {
    const { value, done } = await paginator.next();
    if (done) break;
    yield value;
  }
}

/**
 * Async iterator for individual items across all pages
 */
export async function* iterateItems<T>(
  axiosInstance: AxiosInstance,
  endpoint: string,
  itemSchema: z.ZodType<T>,
  options: AutoPaginationOptions = {}
): AsyncIterableIterator<T> {
  let itemCount = 0;
  const maxItems = options.maxItems || Infinity;

  for await (const page of iteratePages(
    axiosInstance,
    endpoint,
    itemSchema,
    options
  )) {
    for (const item of page.data) {
      if (itemCount >= maxItems) {
        return;
      }
      yield item;
      itemCount++;
    }
  }
}

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

export function buildSearchParams(
  options: SearchPaginationOptions
): Record<string, string> {
  const params = buildPaginationParams(options);

  if (options.query) {
    params.query = options.query;
  }

  if (options.sort_by) {
    params.sort_by = options.sort_by;
  }

  if (options.sort_direction) {
    params.sort_direction = options.sort_direction;
  }

  // Add filter parameters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = String(value);
      }
    });
  }

  return params;
}
