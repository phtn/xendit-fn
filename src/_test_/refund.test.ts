import { describe, it, expect, beforeEach, mock } from "bun:test";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { createRefund, getRefund, listRefunds } from "../sdk/refund/index";
import type {
  CreateRefund,
  RefundResource,
  ListRefundsResponse,
} from "../sdk/refund/schema";

describe("Refund API", () => {
  let mockAxiosInstance: AxiosInstance;
  let mockPost: ReturnType<typeof mock>;
  let mockGet: ReturnType<typeof mock>;

  beforeEach(() => {
    mockPost = mock(() =>
      Promise.resolve({
        data: {
          id: "refund-12345",
          payment_request_id: "pr-12345",
          amount: 10000,
          currency: "PHP",
          reason: "REQUESTED_BY_CUSTOMER",
          status: "PENDING",
          created: "2024-01-01T00:00:00Z",
          updated: "2024-01-01T00:00:00Z",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      })
    );

    mockGet = mock(() =>
      Promise.resolve({
        data: {
          id: "refund-12345",
          payment_request_id: "pr-12345",
          amount: 10000,
          currency: "PHP",
          reason: "REQUESTED_BY_CUSTOMER",
          status: "SUCCEEDED",
          created: "2024-01-01T00:00:00Z",
          updated: "2024-01-01T00:00:00Z",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      })
    );

    mockAxiosInstance = {
      post: mockPost,
      get: mockGet,
    } as unknown as AxiosInstance;
  });

  describe("createRefund", () => {
    it("should create a full refund", async () => {
      const params: CreateRefund = {
        payment_request_id: "pr-12345",
        reason: "REQUESTED_BY_CUSTOMER",
        metadata: {
          order_id: "order_123",
        },
      };

      const result = await createRefund(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(
        "/v3/refunds",
        expect.objectContaining({
          payment_request_id: "pr-12345",
          reason: "REQUESTED_BY_CUSTOMER",
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            "api-version": "2024-11-11",
          }),
        })
      );
      expect(result.id).toBe("refund-12345");
      expect(result.status).toBe("PENDING");
    });

    it("should create a partial refund", async () => {
      const params: CreateRefund = {
        payment_request_id: "pr-12345",
        amount: 5000,
        reason: "CANCELLATION",
      };

      await createRefund(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/v3/refunds",
        expect.objectContaining({
          amount: 5000,
          reason: "CANCELLATION",
        }),
        expect.any(Object)
      );
    });

    it("should handle validation errors", async () => {
      const invalidParams = {
        payment_request_id: "",
        reason: "INVALID_REASON",
      } as unknown as CreateRefund;

      await expect(
        createRefund(invalidParams, mockAxiosInstance)
      ).rejects.toThrow();
    });
  });

  describe("getRefund", () => {
    it("should get a refund by id", async () => {
      const result = await getRefund({ id: "refund-12345" }, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(
        "/v3/refunds/refund-12345",
        expect.objectContaining({
          headers: expect.objectContaining({
            "api-version": "2024-11-11",
          }),
        })
      );
      expect(result.id).toBe("refund-12345");
      expect(result.status).toBe("SUCCEEDED");
    });
  });

  describe("listRefunds", () => {
    it("should list refunds without params", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: [
            {
              id: "refund-12345",
              payment_request_id: "pr-12345",
              amount: 10000,
              currency: "PHP",
              reason: "REQUESTED_BY_CUSTOMER",
              status: "SUCCEEDED",
              created: "2024-01-01T00:00:00Z",
              updated: "2024-01-01T00:00:00Z",
            },
          ],
          has_more: false,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const result = await listRefunds(undefined, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledWith("/v3/refunds", expect.any(Object));
      expect(result.data).toHaveLength(1);
      expect(result.has_more).toBe(false);
    });

    it("should list refunds with filters", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: [],
          has_more: false,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      await listRefunds(
        {
          payment_request_id: "pr-12345",
          limit: 20,
        },
        mockAxiosInstance
      );

      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining("payment_request_id=pr-12345"),
        expect.any(Object)
      );
      expect(mockGet).toHaveBeenCalledWith(
        expect.stringContaining("limit=20"),
        expect.any(Object)
      );
    });
  });
});
