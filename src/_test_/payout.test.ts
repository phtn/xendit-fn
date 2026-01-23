import { describe, it, expect, beforeEach, mock } from "bun:test";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  createPayout,
  getPayout,
  listPayouts,
  cancelPayout,
} from "../sdk/payout/index";
import type {
  CreatePayout,
} from "../sdk/payout/schema";

describe("Payout API", () => {
  let mockAxiosInstance: AxiosInstance;
  let mockPost: ReturnType<typeof mock>;
  let mockGet: ReturnType<typeof mock>;

  beforeEach(() => {
    mockPost = mock(() =>
      Promise.resolve({
        data: {
          id: "payout-12345",
          reference_id: "payout_001",
          channel_code: "BANK",
          channel_properties: {
            channel_code: "BANK",
            bank_account: {
              account_holder_name: "John Doe",
              account_number: "1234567890",
              bank_code: "BCA",
            },
          },
          amount: 100000,
          currency: "IDR",
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
          id: "payout-12345",
          reference_id: "payout_001",
          channel_code: "BANK",
          channel_properties: {
            channel_code: "BANK",
            bank_account: {
              account_holder_name: "John Doe",
              account_number: "1234567890",
              bank_code: "BCA",
            },
          },
          amount: 100000,
          currency: "IDR",
          status: "COMPLETED",
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

  describe("createPayout", () => {
    it("should create a bank payout", async () => {
      const params: CreatePayout = {
        reference_id: "payout_001",
        channel_code: "BANK",
        channel_properties: {
          channel_code: "BANK",
          bank_account: {
            account_holder_name: "John Doe",
            account_number: "1234567890",
            bank_code: "BCA",
          },
        },
        amount: 100000,
        currency: "IDR",
        description: "Payout for order #123",
      };

      const result = await createPayout(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(
        "/v2/payouts",
        expect.objectContaining({
          reference_id: "payout_001",
          channel_code: "BANK",
          amount: 100000,
          currency: "IDR",
        }),
        undefined
      );
      expect(result.id).toBe("payout-12345");
      expect(result.status).toBe("PENDING");
    });

    it("should create an e-wallet payout", async () => {
      const params: CreatePayout = {
        reference_id: "payout_002",
        channel_code: "EWALLET",
        channel_properties: {
          channel_code: "EWALLET",
          ewallet: {
            account_holder_name: "Jane Doe",
            account_number: "+6281234567890",
            ewallet_type: "OVO",
          },
        },
        amount: 50000,
        currency: "IDR",
      };

      await createPayout(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/v2/payouts",
        expect.objectContaining({
          channel_code: "EWALLET",
          channel_properties: expect.objectContaining({
            ewallet: expect.objectContaining({
              ewallet_type: "OVO",
            }),
          }),
        }),
        undefined
      );
    });

    it("should handle validation errors", async () => {
      const invalidParams = {
        reference_id: "",
        channel_code: "INVALID",
      } as unknown as CreatePayout;

      await expect(
        createPayout(invalidParams, mockAxiosInstance)
      ).rejects.toThrow();
    });
  });

  describe("getPayout", () => {
    it("should get a payout by id", async () => {
      const result = await getPayout({ id: "payout-12345" }, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(
        "/v2/payouts/payout-12345",
        undefined
      );
      expect(result.id).toBe("payout-12345");
      expect(result.status).toBe("COMPLETED");
    });
  });

  describe("listPayouts", () => {
    it("should list payouts without params", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: [
            {
              id: "payout-12345",
              reference_id: "payout_001",
              channel_code: "BANK",
              channel_properties: {
                channel_code: "BANK",
                bank_account: {
                  account_holder_name: "John Doe",
                  account_number: "1234567890",
                  bank_code: "BCA",
                },
              },
              amount: 100000,
              currency: "IDR",
              status: "COMPLETED",
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

      const result = await listPayouts(undefined, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledWith("/v2/payouts", undefined);
      expect(result.data).toHaveLength(1);
      expect(result.has_more).toBe(false);
    });

    it("should list payouts with filters", async () => {
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

      await listPayouts(
        {
          status: ["COMPLETED", "PENDING"],
          channel_code: ["BANK"],
          limit: 50,
        },
        mockAxiosInstance
      );

      const callUrl = decodeURIComponent(
        (mockGet.mock.calls[0]?.[0] as string) ?? ""
      );
      expect(callUrl).toContain("status[]=COMPLETED");
      expect(callUrl).toContain("channel_code[]=BANK");
    });
  });

  describe("cancelPayout", () => {
    it("should cancel a payout", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          id: "payout-12345",
          reference_id: "payout_001",
          channel_code: "BANK",
          channel_properties: {
            channel_code: "BANK",
            bank_account: {
              account_holder_name: "John Doe",
              account_number: "1234567890",
              bank_code: "BCA",
            },
          },
          amount: 100000,
          currency: "IDR",
          status: "CANCELLED",
          created: "2024-01-01T00:00:00Z",
          updated: "2024-01-01T00:00:00Z",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const result = await cancelPayout(
        { id: "payout-12345" },
        mockAxiosInstance
      );

      expect(mockPost).toHaveBeenCalledWith(
        "/v2/payouts/payout-12345/cancel",
        {},
        undefined
      );
      expect(result.status).toBe("CANCELLED");
    });
  });
});
