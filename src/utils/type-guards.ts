import type { Country, Currency, Phone } from "../sdk/common";
import type { CustomerType } from "../sdk/customer/schema";
import type { CheckoutMethod } from "../sdk/ewallet/schema";

// Type guard for phone numbers
export function isValidPhone(value: string): value is Phone {
  return (
    typeof value === "string" &&
    value.startsWith("+") &&
    value.length >= 8 &&
    value.length <= 15
  );
}

// Type guard for country codes
export function isValidCountry(value: string): value is Country {
  return ["PH", "ID", "MY", "TH", "VN"].includes(value);
}

// Type guard for currency codes
export function isValidCurrency(value: string): value is Currency {
  return ["PHP", "IDR", "MYR", "THB", "VND"].includes(value);
}

// Type guard for customer type
export function isValidCustomerType(value: string): value is CustomerType {
  return ["INDIVIDUAL", "BUSINESS"].includes(value);
}

// Type guard for checkout method
export function isValidCheckoutMethod(value: string): value is CheckoutMethod {
  return ["ONE_TIME_PAYMENT", "TOKENIZED_PAYMENT"].includes(value);
}

// Generic type guard for checking if value is not null or undefined
export function isNotNullOrUndefined<T>(
  value: T | null | undefined
): value is T {
  return value !== null && value !== undefined;
}

// Type guard for checking if value is a valid URL
export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

// Type guard for checking if value is a valid email
export function isValidEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// Type guard for checking if value is a valid date string
export function isValidDateString(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
}
