import { z } from "zod";
import {
  BillingDetailSchema,
  CountrySchema,
  CurrencySchema,
  PhoneSchema,
} from "../common";
import { AddressSchema } from "../customer/schema";

const CardDataSchema = z.object({
  account_number: z.string(),
  exp_month: z.string(),
  exp_year: z.string(),
  card_holder_first_name: z.string(),
  card_holder_last_name: z.string(),
  card_holder_email: z.string().email(),
  card_holder_phone_number: PhoneSchema,
});

export const TokenParamsSchema = z.object({
  amount: z.string().optional(),
  card_data: CardDataSchema.optional(),
  external_id: z.string().optional(),
  card_cvn: z.string().min(3).max(3).optional(),
  is_multiple_use: z.boolean().optional().default(false),
  currency: CurrencySchema.optional(),
  should_authenticate: z.boolean().default(true),
  billing_details: AddressSchema.optional(),
  mid_label: z.string(),
});
export type TokenParams = z.infer<typeof TokenParamsSchema>;

const TokenStatusSchema = z.union([
  z.literal("IN_REVIEW"),
  z.literal("VERIFIED"),
  z.literal("FAILED"),
  z.literal("SUCCEEDED"),
  z.literal("CAPTURED"),
  z.literal("REVERSED"),
  z.literal("AUTHORISED"),
]);
const CardTypeSchema = z.union([
  z.literal("CREDIT"),
  z.literal("DEBIT"),
  z.literal("PREPAID"),
  z.literal("UNKNOWN"),
]);
const CardBrandSchema = z.union([
  z.literal("VISA"),
  z.literal("MASTERCARD"),
  z.literal("JCB"),
  z.literal("AMEX"),
]);
const TokenFailureReasonSchema = z.union([
  z.literal("AUTHENTICATION_FAILED"),
  z.literal("REVERSE_AUTHORIZATION_REJECTED_BY_BANK"),
  z.literal("PROCESSOR_ERROR"),
]);
export const TokenErrorCodeSchema = z.union([
  z.literal("API_VALIDATION_ERROR"),
  z.literal("INVALID_JSON_FORMAT"),
  z.literal("ACCOUNT_NUMBER_INVALID_ERROR"),
  z.literal("VALIDATION_ERROR"),
  z.literal("BRAND_NOT_SUPPORTED_ERROR"),
  z.literal("AUTHENTICATION_REQUIRED_ERROR"),
  z.literal("REQUEST_FORBIDDEN_ERROR"),
  z.literal("VERIFICATION_TIMEOUT_ERROR"),
  z.literal("TEMPORARY_SERVICE_ERROR"),
  z.literal("CONNECTION_ERROR"),
]);
export type TokenErrorCode = z.infer<typeof TokenErrorCodeSchema>;

export const CardInfoSchema = z.object({
  bank: z.string().optional(),
  country: CountrySchema.optional(),
  type: CardTypeSchema.optional(),
  brand: CardBrandSchema.optional(),
  fingerprint: z.string().optional(),
  card_art_url: z.string().url().optional(),
});
export type CardInfo = z.infer<typeof CardInfoSchema>;

export type TokenStatus = z.infer<typeof TokenStatusSchema>;
export type CardType = z.infer<typeof CardTypeSchema>;
export type CardBrand = z.infer<typeof CardBrandSchema>;
export type TokenFailureReason = z.infer<typeof TokenFailureReasonSchema>;

export const TokenResourceSchema = z.object({
  id: z.string(),
  business_id: z.string().optional(),
  created: z.string().datetime(),
  authentication_id: z.string(),
  external_id: z.string(),
  masked_card_number: z.string(),
  status: z.string(),
  payer_authentication_url: z.string().url().optional(),
  failure_reason: z.string().optional(),
  card_info: CardInfoSchema.optional(),
});
export type TokenResource = z.infer<typeof TokenResourceSchema>;

export const GetTokemParamsSchema = z.object({
  credit_card_token_id: z.string(),
});

export const TokenAuthenticationSchema = z.object({
  amount: z.string().optional(),
  token_id: z.string().optional(),
  card_data: CardDataSchema.optional(),
  external_id: z.string().optional(),
  currency: CurrencySchema.optional(),
  mid_label: z.string().optional(),
});
export type TokenAuthentication = z.infer<typeof TokenAuthenticationSchema>;

export const TokenAuthenticationResourceSchema = z.object({
  id: z.string(),
  status: TokenStatusSchema,
  external_id: z.string().optional(),
  payer_authentication_url: z.string().url().optional(),
  mid_label: z.string().optional(),
  failure_reason: TokenFailureReasonSchema.optional(),
});
export type TokenAuthenticationResource = z.infer<
  typeof TokenAuthenticationResourceSchema
>;

export const TokenAuthorizationSchema = z.object({
  amount: z.string().optional(),
  token_id: z.string().optional(),
  capture: z.boolean().default(false),
  external_id: z.string().optional(),
  authentication_id: z.string().optional(),
});
export type TokenAuthorization = z.infer<typeof TokenAuthorizationSchema>;

export const ZeroAuthorizationSchema = z.object({
  amount: z.string().default("0"),
  token_id: z.string().optional(),
  capture: z.boolean().default(false),
  external_id: z.string().optional(),
  authentication_id: z.string().optional(),
});
export type ZeroAuthorization = z.infer<typeof ZeroAuthorizationSchema>;

export const ReverseAuthorizationSchema = z.object({
  external_id: z.string(),
});
export type ReverseAuthorizationParams = z.infer<
  typeof ReverseAuthorizationSchema
>;

export const PromotionSummarySchema = z.object({
  reference_id: z.string(),
  original_amount: z.number(),
});
export type PromotionSummary = z.infer<typeof PromotionSummarySchema>;

export const IntervalSchema = z.literal("month");
export const InstallmentSummary = z.object({
  count: z.number().optional(),
  interval: IntervalSchema.optional(),
});

export const ECICodeSchema = z.union([
  z.literal("0"),
  z.literal("1"),
  z.literal("2"),
  z.literal("3"),
  z.literal("4"),
  z.literal("5"),
]);

const CVNCodeSchema = z.union([z.literal("M"), z.literal("N"), z.literal("P")]);

export const CreateChargeSchema = z.object({
  token_id: z.string(),
  external_id: z.string(),
  amount: z.number(),
  authentication_id: z.string().optional(),
  capture: z.boolean().optional().default(false),
  descriptor: z.string().optional(),
  currency: CurrencySchema.optional(),
  mid_label: z.string().optional(),
  billing_details: BillingDetailSchema.optional(),
  promotion: PromotionSummarySchema.optional(),
  installment: InstallmentSummary.optional(),
  metadata: z.object({}).optional(),
});

const ChargeFailureReasonSchema = z.union([
  z.literal("AUTHENTICATION_FAILED"),
  z.literal("DECLINED_BY_ISSUER"),
  z.literal("DECLINED_BY_PROCESSOR"),
  z.literal("EXPIRED_CARD"),
  z.literal("ISSUER_SUSPECT_FRAUD"),
  z.literal("INACTIVE_OR_UNAUTHORIZED_CARD"),
  z.literal("INSUFFICIENT_BALANCE"),
  z.literal("INVALID_CARD"),
  z.literal("INVALID_CVV"),
  z.literal("ISSUER_UNAVAILABLE"),
  z.literal("PROCESSOR_ERROR"),
  z.literal("STOLEN_CARD"),
  z.literal("PROCESSOR_TIMEOUT"),
  z.literal("FRAUD_RISK_BLOCKED"),
]);

export const ChargeTypeSchema = z.union([
  z.literal("SINGLE_USE_TOKEN"),
  z.literal("MULTIPLE_USE_TOKEN"),
  z.literal("RECURRING"),
]);

export type CreateCharge = z.infer<typeof CreateChargeSchema>;

export const ChargeResourceSchema = z.object({
  created: z.string().datetime(),
  status: TokenStatusSchema,
  business_id: z.string(),
  authorized_amount: z.number(),
  external_id: z.string(),
  merchant_id: z.string(),
  merchant_reference_code: z.string(),
  card_type: CardTypeSchema,
  masked_card_number: z.string(),
  charge_type: ChargeTypeSchema,
  card_brand: CardBrandSchema,
  bank_reconciliation_id: z.string(),
  failure_reason: ChargeFailureReasonSchema.optional(),
  eci: ECICodeSchema.optional(),
  cvn_code: CVNCodeSchema.optional(),
  capture_amount: z.number().optional(),
  descriptor: z.string().optional(),
  id: z.string(),
  mid_label: z.string().optional(),
  promotion: PromotionSummarySchema.optional(),
  installment: InstallmentSummary.optional(),
});
export type ChargeResource = z.infer<typeof ChargeResourceSchema>;
