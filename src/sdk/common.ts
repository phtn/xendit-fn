import { z } from "zod";

export const PhoneSchema = z
  .string()
  .min(7)
  .max(15)
  .refine((value) => value.startsWith("+"));
export type Phone = z.infer<typeof PhoneSchema>;

export const CountrySchema = z.union([
  z.literal("PH"),
  z.literal("ID"),
  z.literal("MY"),
  z.literal("TH"),
  z.literal("VN"),
]);
export type Country = z.infer<typeof CountrySchema>;

export const CurrencySchema = z.union([
  z.literal("PHP"),
  z.literal("IDR"),
  z.literal("MYR"),
  z.literal("THB"),
  z.literal("VND"),
]);
export type Currency = z.infer<typeof CurrencySchema>;

export const BillingDetailSchema = z.object({
  given_names: z.string(),
  surname: z.string().optional(),
  email: z.string().email().optional(),
  mobile_number: PhoneSchema.optional(),
  phone_number: PhoneSchema.optional(),
});

export type BillingDetail = z.infer<typeof BillingDetailSchema>;
