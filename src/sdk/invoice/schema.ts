import { z } from "zod";
import { CurrencySchema, CountrySchema } from "../common";

// Invoice Status
export const InvoiceStatusSchema = z.union([
  z.literal("PENDING"),
  z.literal("PAID"),
  z.literal("SETTLED"),
  z.literal("EXPIRED"),
]);
export type InvoiceStatus = z.infer<typeof InvoiceStatusSchema>;

// Payer Email
export const PayerEmailSchema = z.object({
  email: z.string().email(),
});
export type PayerEmail = z.infer<typeof PayerEmailSchema>;

// Invoice Item
export const InvoiceItemSchema = z.object({
  name: z.string(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  category: z.string().optional(),
  url: z.string().url().optional(),
});
export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;

// Customer Notification Preference
export const CustomerNotificationPreferenceSchema = z.object({
  invoice_created: z
    .array(
      z.union([z.literal("whatsapp"), z.literal("sms"), z.literal("email")])
    )
    .optional(),
  invoice_reminder: z
    .array(
      z.union([z.literal("whatsapp"), z.literal("sms"), z.literal("email")])
    )
    .optional(),
  invoice_paid: z
    .array(
      z.union([z.literal("whatsapp"), z.literal("sms"), z.literal("email")])
    )
    .optional(),
  invoice_expired: z
    .array(
      z.union([z.literal("whatsapp"), z.literal("sms"), z.literal("email")])
    )
    .optional(),
});

// Customer Details
export const CustomerDetailsSchema = z.object({
  customer_name: z.string().optional(),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().optional(),
  billing_address: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      postal_code: z.string().optional(),
      phone: z.string().optional(),
      country_code: CountrySchema.optional(),
    })
    .optional(),
  shipping_address: z
    .object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      postal_code: z.string().optional(),
      phone: z.string().optional(),
      country_code: CountrySchema.optional(),
    })
    .optional(),
});
export type CustomerDetails = z.infer<typeof CustomerDetailsSchema>;

// Fee Details
export const FeeSchema = z.object({
  type: z.string(),
  value: z.number(),
});

// Available Bank and E-wallet
export const AvailableBankSchema = z.object({
  bank_code: z.string(),
  collection_type: z.string(),
  bank_branch: z.string(),
  transfer_amount: z.number(),
  bank_account_number: z.string(),
  account_holder_name: z.string(),
  identity_amount: z.number().optional(),
});

export const AvailableEwalletSchema = z.object({
  ewallet_type: z.string(),
});

export const AvailableRetailOutletSchema = z.object({
  retail_outlet_name: z.string(),
});

// Create Invoice Schema
export const CreateInvoiceSchema = z.object({
  external_id: z.string(),
  payer_email: z.string().email(),
  description: z.string(),
  amount: z.number().positive(),
  invoice_duration: z.number().positive().optional(),
  callback_virtual_account_id: z.string().optional(),
  should_exclude_credit_card: z.boolean().optional(),
  should_send_email: z.boolean().optional(),
  customer_name: z.string().optional(),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().optional(),
  customer: CustomerDetailsSchema.optional(),
  customer_notification_preference:
    CustomerNotificationPreferenceSchema.optional(),
  success_redirect_url: z.string().url().optional(),
  failure_redirect_url: z.string().url().optional(),
  payment_methods: z.array(z.string()).optional(),
  mid_label: z.string().optional(),
  should_authenticate_credit_card: z.boolean().optional(),
  currency: CurrencySchema.optional(),
  items: z.array(InvoiceItemSchema).optional(),
  fixed_va: z.boolean().optional(),
  reminder_time_unit: z
    .union([z.literal("days"), z.literal("hours"), z.literal("minutes")])
    .optional(),
  reminder_time: z.number().optional(),
  locale: z.string().optional(),
  fees: z.array(FeeSchema).optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type CreateInvoice = z.infer<typeof CreateInvoiceSchema>;

// Update Invoice Schema
export const UpdateInvoiceSchema = z.object({
  should_send_email: z.boolean().optional(),
  customer_name: z.string().optional(),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().optional(),
  customer: CustomerDetailsSchema.optional(),
  customer_notification_preference:
    CustomerNotificationPreferenceSchema.optional(),
  success_redirect_url: z.string().url().optional(),
  failure_redirect_url: z.string().url().optional(),
  items: z.array(InvoiceItemSchema).optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>;

// Invoice Resource
export const InvoiceResourceSchema = z.object({
  id: z.string(),
  external_id: z.string(),
  user_id: z.string(),
  status: InvoiceStatusSchema,
  merchant_name: z.string(),
  merchant_profile_picture_url: z.string().url(),
  amount: z.number(),
  payer_email: z.string().email(),
  description: z.string(),
  expiry_date: z.string().datetime(),
  invoice_url: z.string().url(),
  should_exclude_credit_card: z.boolean(),
  should_send_email: z.boolean(),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  currency: CurrencySchema,
  paid_amount: z.number().optional(),
  credit_card_charge_id: z.string().optional(),
  payment_method: z.string().optional(),
  payment_channel: z.string().optional(),
  payment_destination: z.string().optional(),
  payment_id: z.string().optional(),
  paid_at: z.string().datetime().optional(),
  bank_code: z.string().optional(),
  ewallet_type: z.string().optional(),
  on_demand_link: z.string().url().optional(),
  recurring_payment_id: z.string().optional(),
  // Customer information
  customer_name: z.string().optional(),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().optional(),
  customer: CustomerDetailsSchema.optional(),
  customer_notification_preference:
    CustomerNotificationPreferenceSchema.optional(),
  // URLs
  success_redirect_url: z.string().url().optional(),
  failure_redirect_url: z.string().url().optional(),
  // Items and fees
  items: z.array(InvoiceItemSchema).optional(),
  fees: z.array(FeeSchema).optional(),
  // Available payment methods
  available_banks: z.array(AvailableBankSchema).optional(),
  available_ewallets: z.array(AvailableEwalletSchema).optional(),
  available_retail_outlets: z.array(AvailableRetailOutletSchema).optional(),
  available_paylaters: z
    .array(
      z.object({
        paylater_type: z.string(),
      })
    )
    .optional(),
  available_qr_codes: z
    .array(
      z.object({
        qr_code_type: z.string(),
      })
    )
    .optional(),
  available_direct_debits: z
    .array(
      z.object({
        direct_debit_type: z.string(),
      })
    )
    .optional(),
  should_authenticate_credit_card: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type InvoiceResource = z.infer<typeof InvoiceResourceSchema>;

// Get Invoice Schema
export const GetInvoiceSchema = z.object({
  invoice_id: z.string(),
});
export type GetInvoice = z.infer<typeof GetInvoiceSchema>;

// List Invoices Schema
export const ListInvoicesSchema = z.object({
  statuses: z.array(InvoiceStatusSchema).optional(),
  limit: z.number().min(1).max(100).optional(),
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
  paid_after: z.string().datetime().optional(),
  paid_before: z.string().datetime().optional(),
  expired_after: z.string().datetime().optional(),
  expired_before: z.string().datetime().optional(),
  last_invoice: z.string().optional(),
  client_types: z.array(z.string()).optional(),
  payment_channels: z.array(z.string()).optional(),
  on_demand_link: z.string().optional(),
  recurring_payment_id: z.string().optional(),
});
export type ListInvoices = z.infer<typeof ListInvoicesSchema>;

// List Invoices Response
export const ListInvoicesResponseSchema = z.object({
  has_more: z.boolean(),
  data: z.array(InvoiceResourceSchema),
});
export type ListInvoicesResponse = z.infer<typeof ListInvoicesResponseSchema>;

// Update Invoice Params
export const UpdateInvoiceParamsSchema = z.object({
  invoice_id: z.string(),
  payload: UpdateInvoiceSchema,
});
export type UpdateInvoiceParams = z.infer<typeof UpdateInvoiceParamsSchema>;

// Expire Invoice Schema
export const ExpireInvoiceSchema = z.object({
  invoice_id: z.string(),
});
export type ExpireInvoice = z.infer<typeof ExpireInvoiceSchema>;
