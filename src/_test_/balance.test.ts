import { describe, it, expect, beforeEach, mock } from "bun:test";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { getBalance, listTransactions } from "../sdk/balance/index";

describe("Balance & Transaction API", () => {
  let mockAxiosInstance: AxiosInstance;
  let mockGet: ReturnType<typeof mock>;

  beforeEach(() => {
    mockGet = mock(() =>
      Promise.resolve({
        data: {
          balance: 1000000,
          currency: "IDR",
          account_type: "CASH",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      })
    );

    mockAxiosInstance = {
      get: mockGet,
    } as unknown as AxiosInstance;
  });

  describe("getBalance", () => {
    it("should get account balance", async () => {
      const result = await getBalance(mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith("/balance", undefined);
      expect(result.balance).toBe(1000000);
      expect(result.currency).toBe("IDR");
    });
  });

  describe("listTransactions", () => {
    it("should list transactions without params", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          data: [
            {
              id: "txn-12345",
              reference_id: "ref_001",
              type: "PAYMENT",
              status: "SUCCEEDED",
              amount: 100000,
              currency: "IDR",
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

      const result = await listTransactions(undefined, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledWith("/transactions", undefined);
      expect(result.data).toHaveLength(1);
      expect(result.data[0]?.type).toBe("PAYMENT");
      expect(result.has_more).toBe(false);
    });

    it("should list transactions with filters", async () => {
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

      await listTransactions(
        {
          types: ["PAYMENT", "PAYOUT"],
          statuses: ["SUCCEEDED"],
          limit: 100,
          created_after: "2024-01-01T00:00:00Z",
        },
        mockAxiosInstance
      );

      const callUrl = decodeURIComponent(
        (mockGet.mock.calls[0]?.[0] as string) ?? ""
      );
      expect(callUrl).toContain("types[]=PAYMENT");
      expect(callUrl).toContain("statuses[]=SUCCEEDED");
      expect(callUrl).toContain("limit=100");
    });
  });
});
