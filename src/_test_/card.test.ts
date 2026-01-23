import { describe, it, expect, beforeEach, mock } from "bun:test";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  createToken,
  getToken,
  authenticateToken,
  authorizeToken,
  zeroAuthorization,
  reverseAuthorization,
  createCharge,
  getCharge,
} from "../sdk/card/index";
import type {
  TokenParams,
  TokenAuthentication,
  TokenAuthorization,
  CreateCharge,
} from "../sdk/card/schema";

describe("Card Operations API", () => {
  let mockAxiosInstance: AxiosInstance;
  let mockPost: ReturnType<typeof mock>;
  let mockGet: ReturnType<typeof mock>;

  beforeEach(() => {
    mockPost = mock(() =>
      Promise.resolve({
        data: {
          id: "token-12345",
          business_id: "biz-12345",
          created: "2024-01-01T00:00:00Z",
          authentication_id: "auth-12345",
          external_id: "ext-12345",
          masked_card_number: "4111********1111",
          status: "VERIFIED",
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
          id: "token-12345",
          business_id: "biz-12345",
          created: "2024-01-01T00:00:00Z",
          authentication_id: "auth-12345",
          external_id: "ext-12345",
          masked_card_number: "4111********1111",
          status: "VERIFIED",
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

  describe("createToken", () => {
    it("should create a card token", async () => {
      const params: TokenParams = {
        mid_label: "merchant_label",
        card_data: {
          account_number: "4111111111111111",
          exp_month: "12",
          exp_year: "2025",
          card_holder_first_name: "John",
          card_holder_last_name: "Doe",
          card_holder_email: "john@example.com",
          card_holder_phone_number: "+639171234567",
        },
        is_multiple_use: true,
        currency: "PHP",
      };

      const result = await createToken(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledTimes(1);
      expect(mockPost).toHaveBeenCalledWith(
        "/credit_card_tokens",
        expect.objectContaining({
          mid_label: "merchant_label",
          card_data: expect.objectContaining({
            account_number: "4111111111111111",
          }),
        }),
        undefined
      );
      expect(result.id).toBe("token-12345");
      expect(result.status).toBe("VERIFIED");
    });

    it("should handle validation errors", async () => {
      const invalidParams = {
        mid_label: "merchant_label",
        card_data: {
          account_number: "invalid",
          exp_month: "13", // Invalid month
          exp_year: "2025",
          card_holder_first_name: "John",
          card_holder_last_name: "Doe",
          card_holder_email: "invalid-email", // Invalid email
          card_holder_phone_number: "123", // Invalid phone
        },
      } as unknown as TokenParams;

      await expect(
        createToken(invalidParams, mockAxiosInstance)
      ).rejects.toThrow();
    });
  });

  describe("getToken", () => {
    it("should get a token by id", async () => {
      const result = await getToken(
        { credit_card_token_id: "token-12345" },
        mockAxiosInstance
      );

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet).toHaveBeenCalledWith(
        "/credit_card_tokens/token-12345",
        undefined
      );
      expect(result.id).toBe("token-12345");
    });
  });

  describe("authenticateToken", () => {
    it("should authenticate a token", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          id: "auth-12345",
          status: "SUCCEEDED",
          external_id: "ext-12345",
          payer_authentication_url: "https://auth.example.com",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const params: TokenAuthentication = {
        token_id: "token-12345",
        amount: "10000",
        currency: "PHP",
        external_id: "auth_001",
      };

      const result = await authenticateToken(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/credit_card_tokens/authenticate",
        expect.objectContaining({
          token_id: "token-12345",
          amount: "10000",
        }),
        undefined
      );
      expect(result.id).toBe("auth-12345");
      expect(result.status).toBe("SUCCEEDED");
    });
  });

  describe("authorizeToken", () => {
    it("should authorize a token", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          id: "charge-12345",
          created: "2024-01-01T00:00:00Z",
          status: "AUTHORISED",
          business_id: "biz-12345",
          authorized_amount: 10000,
          external_id: "charge_001",
          merchant_id: "merchant-12345",
          merchant_reference_code: "ref-12345",
          card_type: "CREDIT",
          masked_card_number: "4111********1111",
          charge_type: "MULTIPLE_USE_TOKEN",
          card_brand: "VISA",
          bank_reconciliation_id: "recon-12345",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const params: TokenAuthorization = {
        token_id: "token-12345",
        amount: "10000",
        external_id: "charge_001",
        capture: true,
      };

      const result = await authorizeToken(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/credit_card_charges",
        expect.objectContaining({
          token_id: "token-12345",
          amount: "10000",
          capture: true,
        }),
        undefined
      );
      expect(result.id).toBe("charge-12345");
      expect(result.status).toBe("AUTHORISED");
    });
  });

  describe("zeroAuthorization", () => {
    it("should perform zero-dollar authorization", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          id: "charge-12345",
          created: "2024-01-01T00:00:00Z",
          status: "AUTHORISED",
          business_id: "biz-12345",
          authorized_amount: 0,
          external_id: "zero_auth_001",
          merchant_id: "merchant-12345",
          merchant_reference_code: "ref-12345",
          card_type: "CREDIT",
          masked_card_number: "4111********1111",
          charge_type: "MULTIPLE_USE_TOKEN",
          card_brand: "VISA",
          bank_reconciliation_id: "recon-12345",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const params = {
        token_id: "token-12345",
        external_id: "zero_auth_001",
      };

      const result = await zeroAuthorization(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/credit_card_charges",
        expect.objectContaining({
          amount: "0",
          token_id: "token-12345",
        }),
        undefined
      );
      expect(result.authorized_amount).toBe(0);
    });
  });

  describe("reverseAuthorization", () => {
    it("should reverse an authorization", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          id: "charge-12345",
          created: "2024-01-01T00:00:00Z",
          status: "REVERSED",
          business_id: "biz-12345",
          authorized_amount: 10000,
          external_id: "charge_001",
          merchant_id: "merchant-12345",
          merchant_reference_code: "ref-12345",
          card_type: "CREDIT",
          masked_card_number: "4111********1111",
          charge_type: "MULTIPLE_USE_TOKEN",
          card_brand: "VISA",
          bank_reconciliation_id: "recon-12345",
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const result = await reverseAuthorization(
        { external_id: "charge_001" },
        mockAxiosInstance
      );

      expect(mockPost).toHaveBeenCalledWith(
        "/credit_card_charges/charge_001/reverse_authorization",
        {},
        undefined
      );
      expect(result.status).toBe("REVERSED");
    });
  });

  describe("createCharge", () => {
    it("should create a charge", async () => {
      mockPost.mockResolvedValueOnce({
        data: {
          id: "charge-12345",
          created: "2024-01-01T00:00:00Z",
          status: "CAPTURED",
          business_id: "biz-12345",
          authorized_amount: 10000,
          external_id: "charge_001",
          merchant_id: "merchant-12345",
          merchant_reference_code: "ref-12345",
          card_type: "CREDIT",
          masked_card_number: "4111********1111",
          charge_type: "MULTIPLE_USE_TOKEN",
          card_brand: "VISA",
          bank_reconciliation_id: "recon-12345",
          capture_amount: 10000,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const params: CreateCharge = {
        token_id: "token-12345",
        external_id: "charge_001",
        amount: 10000,
        currency: "PHP",
        capture: true,
        authentication_id: "auth-12345",
      };

      const result = await createCharge(params, mockAxiosInstance);

      expect(mockPost).toHaveBeenCalledWith(
        "/credit_card_charges",
        expect.objectContaining({
          token_id: "token-12345",
          amount: 10000,
          capture: true,
        }),
        undefined
      );
      expect(result.id).toBe("charge-12345");
      expect(result.status).toBe("CAPTURED");
    });
  });

  describe("getCharge", () => {
    it("should get a charge by id", async () => {
      mockGet.mockResolvedValueOnce({
        data: {
          id: "charge-12345",
          created: "2024-01-01T00:00:00Z",
          status: "CAPTURED",
          business_id: "biz-12345",
          authorized_amount: 10000,
          external_id: "charge_001",
          merchant_id: "merchant-12345",
          merchant_reference_code: "ref-12345",
          card_type: "CREDIT",
          masked_card_number: "4111********1111",
          charge_type: "MULTIPLE_USE_TOKEN",
          card_brand: "VISA",
          bank_reconciliation_id: "recon-12345",
          capture_amount: 10000,
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosRequestConfig,
      });

      const result = await getCharge({ id: "charge-12345" }, mockAxiosInstance);

      expect(mockGet).toHaveBeenCalledWith(
        "/credit_card_charges/charge-12345",
        undefined
      );
      expect(result.id).toBe("charge-12345");
      expect(result.status).toBe("CAPTURED");
    });
  });
});
