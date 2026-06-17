// Checkout + payment domain types. Shaped to be compatible with a future
// .NET checkout endpoint (CheckoutRequest in, CheckoutResponse out).

import type { Localized } from "./common";
import type { ProductId } from "./product";

export type PaymentMethodId = "cod" | "mobile-wallets" | "fawry" | "instapay";

/** Raw payment method (brand names such as InstaPay stay English). */
export interface PaymentMethod {
  id: PaymentMethodId;
  label: Localized<string>;
  /** Path to the optimised webp logo under /public. */
  image: string;
  description: Localized<string>;
}

/** Locale-resolved payment method for rendering. */
export interface PaymentMethodViewModel {
  id: PaymentMethodId;
  label: string;
  description: string;
  image: string;
}

/** Checkout form state captured from the UI. */
export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  gov: string;
  payment: PaymentMethodId;
}

/** A single line in a checkout request — stable ids + quantities only. */
export interface CheckoutRequestItem {
  id: ProductId;
  qty: number;
}

/**
 * Payload a future .NET checkout endpoint would receive. Contains only stable
 * ids/quantities + customer details — never localized product text or prices
 * (the server is the source of truth for pricing).
 */
export interface CheckoutRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    gov: string;
  };
  payment: PaymentMethodId;
  items: CheckoutRequestItem[];
  /** Optional promo code applied at checkout. */
  promoCode?: string;
}

/** Response a future .NET checkout endpoint would return. */
export interface CheckoutResponse {
  orderNumber: string;
  /** True while the success flow is mock/frontend-only (no real payment). */
  mock: boolean;
}
