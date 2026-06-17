// Checkout view-model helpers: payment method display + form -> request shaping.
// Pure + client-safe.

import type { Locale } from "@/i18n/routing";
import type { CartItem } from "@/lib/types/cart";
import type {
  CheckoutForm,
  CheckoutRequest,
  PaymentMethodViewModel,
} from "@/lib/types/checkout";
import { getAllPaymentMethods } from "@/lib/mock/payments.mock";

export function getPaymentMethodVMs(locale: Locale): PaymentMethodViewModel[] {
  return getAllPaymentMethods().map((pm) => ({
    id: pm.id,
    label: pm.label[locale],
    description: pm.description[locale],
    image: pm.image,
  }));
}

/**
 * Build the API-compatible CheckoutRequest from the form + cart. Carries only
 * stable ids/quantities and customer details — never localized text or prices.
 */
export function toCheckoutRequest(
  form: CheckoutForm,
  items: CartItem[],
  promoCode?: string
): CheckoutRequest {
  return {
    customer: { name: form.name, email: form.email, phone: form.phone },
    shippingAddress: { address: form.address, city: form.city, gov: form.gov },
    payment: form.payment,
    items: items.map((item) => ({ id: item.id, qty: item.qty })),
    ...(promoCode ? { promoCode } : {}),
  };
}
