import { z } from "zod";
import { CurrencySchema, PhoneSchema } from "../common";

export const CustomerTypeSchema = z.union([
  z.literal("INDIVIDUAL"),
  z.literal("BUSINESS"),
]);
export type CustomerType = z.infer<typeof CustomerTypeSchema>;

export const IndividualDetailSchema = z.object({
  given_names: z.string(),
  surname: z.string().optional(),
  nationality: z.string().optional(),
  place_of_birth: z.string().optional(),
  date_of_birth: z.string().optional(),
  gender: z
    .union([z.literal("MALE"), z.literal("FEMALE"), z.literal("OTHER")])
    .optional(),
  employment: z
    .object({
      employer_name: z.string(),
      nature_of_business: z.string(),
      role_description: z.string(),
    })
    .optional(),
});
export type IndividualDetail = z.infer<typeof IndividualDetailSchema>;

export const BusinessTypeSchema = z.union([
  z.literal("CORPORATION"),
  z.literal("SOLE_PROPRIETOR"),
  z.literal("PARTNERSHIP"),
  z.literal("COOPERATIVE"),
  z.literal("TRUST"),
  z.literal("NON_PROFIT"),
  z.literal("GOVERNMENT"),
]);
export type BusinessType = z.infer<typeof BusinessTypeSchema>;

export const BusinessDetailSchema = z.object({
  business_name: z.string(),
  trading_name: z.string().optional(),
  business_type: z.string(),
});
export type BusinessDetail = z.infer<typeof BusinessDetailSchema>;

export const AddressSchema = z.object({
  street_line1: z.string().nullable().optional(),
  street_line2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  province_state: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  country: z.string(),
  category: z.string().nullable().optional(),
  is_primary: z.boolean().nullable().optional(),
});
export type Address = z.infer<typeof AddressSchema>;

export const AccountTypeSchema = z.union([
  z.literal("BANK_ACCOUNT"),
  z.literal("EWALLET"),
  z.literal("CREDIT_CARD"),
  z.literal("PAY_LATER"),
  z.literal("OTC"),
  z.literal("QR_CODE"),
  z.literal("SOCIAL_MEDIA"),
]);
export type AccountType = z.infer<typeof AccountTypeSchema>;

export const BankAccountSchema = z.object({
  account_number: z.string(),
  account_holder_name: z.string(),
  swift_code: z.string().optional(),
  account_type: z.string().optional(),
  account_details: z.string().optional(),
  currency: z.string().optional(),
});
export type BankAccount = z.infer<typeof BankAccountSchema>;

export const EWalletAccountSchema = z.object({
  account_number: z.string(),
  account_holder_name: z.string(),
  currency: z.string().optional(),
});
export type EWalletAccount = z.infer<typeof EWalletAccountSchema>;

export const CreditCardAccountSchema = z.object({
  token_id: z.string(),
});
export type CreditCardAccount = z.infer<typeof CreditCardAccountSchema>;

export const OTCAccountSchema = z.object({
  payment_code: z.string(),
  expires_at: z.string().optional(),
});
export type OTCAccount = z.infer<typeof OTCAccountSchema>;

export const QrAccountSchema = z.object({
  qr_string: z.string(),
});
export type QrAccount = z.infer<typeof QrAccountSchema>;

export const PayLaterAccountSchema = z.object({
  account_id: z.string(),
  account_holder_name: z.string().optional(),
  currency: CurrencySchema.optional(),
});
export type PayLaterAccount = z.infer<typeof PayLaterAccountSchema>;

export const SocialMediaAccountSchema = z.object({
  account_id: z.string(),
  account_handle: z.string().optional(),
});
export type SocialMediaAccount = z.infer<typeof SocialMediaAccountSchema>;

const PropertiesSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("BANK_ACCOUNT"),
    properties: BankAccountSchema,
  }),
  z.object({
    type: z.literal("EWALLET"),
    properties: EWalletAccountSchema,
  }),
  z.object({
    type: z.literal("CREDIT_CARD"),
    properties: CreditCardAccountSchema,
  }),
  z.object({
    type: z.literal("OTC"),
    properties: OTCAccountSchema,
  }),
  z.object({
    type: z.literal("QR_CODE"),
    properties: QrAccountSchema,
  }),
  z.object({
    type: z.literal("PAY_LATER"),
    properties: PayLaterAccountSchema,
  }),
  z.object({
    type: z.literal("SOCIAL_MEDIA"),
    properties: SocialMediaAccountSchema,
  }),
]);

export const IdentityAccountSchema = z.object({
  type: AccountTypeSchema,
  company: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  properties: PropertiesSchema,
});
export type IdentityAccount = z.infer<typeof IdentityAccountSchema>;

export const KYCDocumentSchema = z.object({
  type: z.string(),
  sub_type: z.string(),
  country: z.string(),
  document_name: z.string(),
  document_number: z.string(),
  expires_at: z.null(),
  holder_name: z.string(),
  document_images: z.array(z.string()),
});
export type KYCDocument = z.infer<typeof KYCDocumentSchema>;

const CommonCustomerResourceSchema = z.object({
  individual_detail: CustomerTypeSchema.safeParse("INDIVIDUAL").success
    ? IndividualDetailSchema
    : z.undefined().nullable(),
  business_detail: CustomerTypeSchema.safeParse("BUSINESS").success
    ? BusinessDetailSchema
    : z.undefined().nullable(),
  email: z.string().email().optional(),
  mobile_number: PhoneSchema.optional(),
  phone_number: PhoneSchema.optional(),
  hashed_phone_number: z.string().nullable().optional(),
  addresses: z.array(AddressSchema).optional(),
  identity_accounts: z.array(IdentityAccountSchema).optional(),
  kyc_documents: z.array(KYCDocumentSchema).optional(),
  description: z.string().nullable().optional(),
  date_of_registration: z.string().nullable().optional(),
  domicile_of_registration: z.string().nullable().optional(),
  metadata: z.object({}).nullable().optional(),
});

export type CommonCustomerResource = z.infer<
  typeof CommonCustomerResourceSchema
>;

export const CustomerSchema = CommonCustomerResourceSchema.merge(
  z.object({
    reference_id: z.string(),
    type: CustomerTypeSchema,
  }),
);
export type Customer = z.infer<typeof CustomerSchema>;

export const GetCustomerSchema = z.object({
  id: z.string(),
});
export type GetCustomer = z.infer<typeof GetCustomerSchema>;

export const CustomerResourceSchema = CustomerSchema.merge(
  z.object({
    id: z.string(),
    created: z.string().datetime(),
    updated: z.string().datetime(),
  }),
);
export type CustomerResource = z.infer<typeof CustomerResourceSchema>;

export const GetCustomerByRefIdSchema = z.object({
  reference_id: z.string(),
});
export type GetCustomerByRefId = z.infer<typeof GetCustomerByRefIdSchema>;

export const GetCustomerByRefIdResourceSchema = z.object({
  data: z.array(CustomerResourceSchema),
  hasMore: z.boolean(),
});
export type GetCustomerByRefIdResource = z.infer<
  typeof GetCustomerByRefIdResourceSchema
>;

export type UpdatePayload = z.infer<typeof CommonCustomerResourceSchema>;

export const UpdateParamsSchema = z.object({
  id: z.string(),
  payload: CommonCustomerResourceSchema,
});
export type UpdateParams = z.infer<typeof UpdateParamsSchema>;
