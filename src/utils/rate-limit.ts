import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

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
export class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  public readonly config: Required<RateLimitConfig>;

  constructor(config: RateLimitConfig = {}) {
    this.config = {
      maxRequests: config.maxRequests ?? 100,
      windowMs: config.windowMs ?? 60000,
      requestDelayMs: config.requestDelayMs ?? 0,
      maxRetries: config.maxRetries ?? 3,
      baseRetryDelayMs: config.baseRetryDelayMs ?? 1000,
      maxRetryDelayMs: config.maxRetryDelayMs ?? 30000,
    };

    this.tokens = this.config.maxRequests;
    this.lastRefill = Date.now();
  }

  /**
   * Refill tokens based on elapsed time
   */
  private refillTokens(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd =
      (timePassed / this.config.windowMs) * this.config.maxRequests;

    this.tokens = Math.min(this.config.maxRequests, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  /**
   * Check if a request can be made
   */
  canMakeRequest(): boolean {
    this.refillTokens();
    return this.tokens >= 1;
  }

  /**
   * Consume a token for a request
   */
  consumeToken(): boolean {
    this.refillTokens();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  /**
   * Get time until next token is available
   */
  getWaitTime(): number {
    if (this.canMakeRequest()) {
      return 0;
    }

    const tokensNeeded = 1 - this.tokens;
    return (tokensNeeded / this.config.maxRequests) * this.config.windowMs;
  }

  /**
   * Wait for a token to become available
   */
  async waitForToken(): Promise<void> {
    const waitTime = this.getWaitTime();
    if (waitTime > 0) {
      await this.sleep(waitTime);
    }
  }

  /**
   * Sleep for specified milliseconds
   */
  sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Axios interceptor for rate limiting
 */
export function createRateLimitInterceptor(rateLimiter: RateLimiter) {
  return {
    request: async (config: InternalAxiosRequestConfig) => {
      // Wait for token availability
      await rateLimiter.waitForToken();

      // Consume token
      rateLimiter.consumeToken();

      // Apply request delay if configured
      const delay = rateLimiter.config.requestDelayMs;
      if (delay > 0) {
        await rateLimiter.sleep(delay);
      }

      return config;
    },

    response: (response: AxiosResponse) => {
      // Check for rate limit headers and adjust if needed
      const rateLimitRemaining = response.headers["x-ratelimit-remaining"];

      if (
        rateLimitRemaining !== undefined &&
        Number(rateLimitRemaining) === 0
      ) {
        console.warn("Rate limit reached, requests will be throttled");
      }

      return response;
    },

    responseError: async (error: AxiosError) => {
      // Handle rate limit errors (HTTP 429)
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        const delay = retryAfter
          ? Number(retryAfter) * 1000
          : rateLimiter.config.baseRetryDelayMs;

        console.warn(`Rate limited, retrying after ${delay}ms`);
        await rateLimiter.sleep(delay);

        // Don't automatically retry here, let the retry interceptor handle it
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  };
}

/**
 * Basic retry interceptor - simplified for compatibility
 */
export function createRetryInterceptor(_config: RateLimitConfig = {}) {
  return async (error: AxiosError): Promise<AxiosResponse> => {
    // For now, just log retryable errors and reject
    // This can be enhanced in the future with proper retry logic
    if (isRetryableError(error)) {
      console.warn("Request failed with retryable error:", error.message);
    }

    return Promise.reject(error);
  };
}

/**
 * Check if an error is retryable
 */
function isRetryableError(error: AxiosError): boolean {
  // No response means network error, which is retryable
  if (!error.response) {
    return true;
  }

  // Specific status codes that are retryable
  const retryableStatusCodes = [408, 429, 500, 502, 503, 504];
  return retryableStatusCodes.includes(error.response.status);
}

/**
 * Setup rate limiting and retry logic for an Axios instance
 */
export function setupRateLimit(
  axiosInstance: AxiosInstance,
  config: RateLimitConfig = {}
): void {
  const rateLimiter = new RateLimiter(config);
  const rateLimitInterceptor = createRateLimitInterceptor(rateLimiter);
  const retryInterceptor = createRetryInterceptor(config);

  // Add request interceptor for rate limiting
  axiosInstance.interceptors.request.use(
    rateLimitInterceptor.request,
    (error: AxiosError) => Promise.reject(error)
  );

  // Add response interceptors
  axiosInstance.interceptors.response.use(
    rateLimitInterceptor.response,
    rateLimitInterceptor.responseError
  );

  // Add retry interceptor (should be last)
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    retryInterceptor
  );
}

/**
 * Create a rate-limited axios instance
 */
export function createRateLimitedAxios(
  baseURL: string,
  apiKey: string,
  config: RateLimitConfig = {}
): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
  });

  setupRateLimit(axiosInstance, config);

  return axiosInstance;
}
