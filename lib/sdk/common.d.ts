import { z } from "zod";
export declare const PhoneSchema: z.ZodEffects<z.ZodString, string, string>;
export type Phone = z.infer<typeof PhoneSchema>;
export declare const CountrySchema: z.ZodUnion<[z.ZodLiteral<"PH">, z.ZodLiteral<"ID">, z.ZodLiteral<"MY">, z.ZodLiteral<"TH">, z.ZodLiteral<"VN">]>;
export type Country = z.infer<typeof CountrySchema>;
export declare const CurrencySchema: z.ZodUnion<[z.ZodLiteral<"PHP">, z.ZodLiteral<"IDR">, z.ZodLiteral<"MYR">, z.ZodLiteral<"THB">, z.ZodLiteral<"VND">]>;
export type Currency = z.infer<typeof CurrencySchema>;
export declare const BillingDetailSchema: z.ZodObject<{
    given_names: z.ZodString;
    surname: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    mobile_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    phone_number: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    given_names: string;
    surname?: string | undefined;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
}, {
    given_names: string;
    surname?: string | undefined;
    email?: string | undefined;
    mobile_number?: string | undefined;
    phone_number?: string | undefined;
}>;
export type BillingDetail = z.infer<typeof BillingDetailSchema>;
//# sourceMappingURL=common.d.ts.map