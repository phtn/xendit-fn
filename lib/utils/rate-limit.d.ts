import { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
    /**
     * Maximum number of requests per window
     * @default 100
     */
    maxRequests?: number;
    /**
     * Time window in milliseconds
     * @default 60000 (1 minute)
     */
    windowMs?: number;
    /**
     * Delay between requests in milliseconds
     * @default 0
     */
    requestDelayMs?: number;
    /**
     * Maximum number of retry attempts when rate limited
     * @default 3
     */
    maxRetries?: number;
    /**
     * Base delay for exponential backoff in milliseconds
     * @default 1000
     */
    baseRetryDelayMs?: number;
    /**
     * Maximum retry delay in milliseconds
     * @default 30000
     */
    maxRetryDelayMs?: number;
}
/**
 * Rate limiter implementation using token bucket algorithm
 */
export declare class RateLimiter {
    private tokens;
    private lastRefill;
    readonly config: Required<RateLimitConfig>;
    constructor(config?: RateLimitConfig);
    /**
     * Refill tokens based on elapsed time
     */
    private refillTokens;
    /**
     * Check if a request can be made
     */
    canMakeRequest(): boolean;
    /**
     * Consume a token for a request
     */
    consumeToken(): boolean;
    /**
     * Get time until next token is available
     */
    getWaitTime(): number;
    /**
     * Wait for a token to become available
     */
    waitForToken(): Promise<void>;
    /**
     * Sleep for specified milliseconds
     */
    sleep(ms: number): Promise<void>;
}
/**
 * Axios interceptor for rate limiting
 */
export declare function createRateLimitInterceptor(rateLimiter: RateLimiter): {
    request: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig<any>>;
    response: (response: AxiosResponse) => AxiosResponse<any, any>;
    responseError: (error: AxiosError) => Promise<never>;
};
/**
 * Basic retry interceptor - simplified for compatibility
 */
export declare function createRetryInterceptor(_config?: RateLimitConfig): (error: AxiosError) => Promise<AxiosResponse>;
/**
 * Setup rate limiting and retry logic for an Axios instance
 */
export declare function setupRateLimit(axiosInstance: AxiosInstance, config?: RateLimitConfig): void;
/**
 * Create a rate-limited axios instance
 */
export declare function createRateLimitedAxios(baseURL: string, apiKey: string, config?: RateLimitConfig): AxiosInstance;
//# sourceMappingURL=rate-limit.d.ts.map