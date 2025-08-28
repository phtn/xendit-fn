import type { Country, Currency, Phone } from "../sdk/common";
import type { CustomerType } from "../sdk/customer/schema";
import type { CheckoutMethod } from "../sdk/ewallet/schema";
export declare function isValidPhone(value: string): value is Phone;
export declare function isValidCountry(value: string): value is Country;
export declare function isValidCurrency(value: string): value is Currency;
export declare function isValidCustomerType(value: string): value is CustomerType;
export declare function isValidCheckoutMethod(value: string): value is CheckoutMethod;
export declare function isNotNullOrUndefined<T>(value: T | null | undefined): value is T;
export declare function isValidUrl(value: string): boolean;
export declare function isValidEmail(value: string): boolean;
export declare function isValidDateString(value: string): boolean;
//# sourceMappingURL=type-guards.d.ts.map