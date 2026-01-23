import { describe, it, expect, beforeEach, mock } from "bun:test";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  createPaymentRequest,
  getPaymentRequest,
  listPaymentRequests,
} from "../sdk/payment-request/index";
import type { CreatePaymentRequest } from "../sdk/payment-request/schema";

describe("Payment Request API", () => {
  let mockAxiosInstance: AxiosInstance;
  let mockPost: ReturnType<typeof mock>;
  let mockGet: ReturnType<typeof mock>;

  beforeEach(() => {
    mockPost = mock(() =>
      Promise.resolve({
        data: {
          id: "pr-12345",
          reference_id: "payment_001",
          type: "PAY",
          country: "PH",
          currency: "PHP",
          request_amount: 10000,
          paid_amount: 0,
          status: "PENDING",
          payment_method: {
            type: "EWALLET",
            ewallet: {
              channel_code: "PH_GCASH",
              channel_properties: {},
            },
          },
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
          id: "pr-12345",
          reference_id: "payment_001",
          type: "PAY",
          country: "PH",
          currency: "PHP",
          request_amount: 10000,
          paid_amount: 10000,
          status: "SUCCEEDED",
          payment_method: {
            type: "EWALLET",
            ewallet: {
              channel_code: "PH_GCASH",
              channel_properties: {},
            },
          },
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

  describe("createPaymentRequest", () => {
    it("should create a payment request with e-wallet", async () => {
      const params: CreatePaymentRequest = {
        reference_id: "payment_001",
        type: "PAY",
        country: "PH",
        currency: "PHP",
        request_amount: 10000,
        payment_method: {
          type: "EWALLET",
          ewallet: {
            channel_code: "PH_GCASH",
            channel_properties: {
              success_redirect_url: "https://yourapp.com/success",
              failure_redirect_url: "https://yourapp.com/failure",
            },
          },
        },
      };

      const result = await createPaymentRequest(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(
        "/v3/payment_requests",
        expect.objectContaining({
          reference_id: "payment_001",
          type: "PAY",
          country: "PH",
          currency: "PHP",
          request_amount: 10000,
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            "api-version": "2024-11-11",
          }),
        })
      );
      expect(result.id).toBe("pr-12345");
      expect(result.status).toBe("PENDING");
    });

    it("should create a payment request with card", async () => {
      const params: CreatePaymentRequest = {
        reference_id: "payment_002",
        type: "PAY",
        country: "PH",
        currency: "PHP",
        request_amount: 50000,
        payment_method: {
          type: "CARD",
          card_information: {
            token_id: "token-12345",
          },
        },
        capture_method: "AUTOMATIC",
      };

      await createPaymentRequest(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/v3/payment_requests",
        expect.objectContaining({
          payment_method: expect.objectContaining({
            type: "CARD",
            card_information: expect.objectContaining({
              token_id: "token-12345",
            }),
          }),
        }),
        expect.any(Object)
      );
    });

    it("should handle validation errors", async () => {
      const invalidParams = {
        reference_id: "",
        type: "INVALID",
      } as unknown as CreatePaymentRequest;

      await expect(
        createPaymentRequest(invalidParams, mockAxiosInstance)
      ).rejects.toThrow();
    });
  });

  describe("getPaymentRequest", () => {
    it("should get a payment request by id", async () => {
      const result = await getPaymentRequest(
        { id: "pr-12345" },
        mockAxiosInstance
      );

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(
        "/v3/payment_requests/pr-12345",
        expect.objectContaining({
          headers: expect.objectContaining({
            "api-version": "2024-11-11",
          }),
        })
      );
      expect(result.id).toBe("pr-12345");
      expect(result.status).toBe("SUCCEEDED");
    });
  });

  describe("listPaymentRequests", () => {
    it("should list payment requests without params", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: [
            {
              id: "pr-12345",
              reference_id: "payment_001",
              type: "PAY",
              country: "PH",
              currency: "PHP",
              request_amount: 10000,
              status: "SUCCEEDED",
              payment_method: {
                type: "EWALLET",
                ewallet: {
                  channel_code: "PH_GCASH",
                  channel_properties: {},
                },
              },
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

      const result = await listPaymentRequests(undefined, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledWith(
        "/v3/payment_requests",
        expect.any(Object)
      );
      expect(result.data).toHaveLength(1);
      expect(result.has_more).toBe(false);
    });

    it("should list payment requests with filters", async () => {
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

      await listPaymentRequests(
        {
          status: ["SUCCEEDED", "PENDING"],
          limit: 50,
          created_after: "2024-01-01T00:00:00Z",
        },
        mockAxiosInstance
      );

      const callUrl = decodeURIComponent(
        (mockGet.mock.calls[0]?.[0] as string) ?? ""
      );
      expect(callUrl).toContain("status[]=SUCCEEDED");
      expect(callUrl).toContain("limit=50");
    });
  });
});
