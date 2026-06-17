// Dermiva – centralised payment methods data source.
// All payment-related UI should import from here instead of
// maintaining separate lists.

import type { Locale } from "@/i18n/routing";
import type { Localized } from "./catalog";

export type PaymentMethodId = "cod" | "mobile-wallets" | "fawry" | "instapay";

export interface PaymentMethod {
  /** Unique identifier used in form state and order records. */
  id: PaymentMethodId;
  /** Human-readable label (brand names such as InstaPay stay English). */
  label: Localized<string>;
  /** Path to the optimised webp logo under /public. */
  image: string;
  /** Short description shown as subtitle. */
  description: Localized<string>;
}

/**
 * The four payment methods accepted by Dermiva.
 * This single list is the source of truth for every component
 * that renders payment logos or options.
 */
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    label: { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
    image: "/payments/cash-on-delivery.webp",
    description: { en: "Pay when your order arrives", ar: "ادفعي عند وصول طلبك" },
  },
  {
    id: "mobile-wallets",
    label: { en: "Mobile Wallets", ar: "المحافظ الإلكترونية" },
    image: "/payments/mobile-wallets.webp",
    description: { en: "Vodafone Cash, Orange Cash, Etisalat Cash & more", ar: "فودافون كاش، أورنج كاش، اتصالات كاش والمزيد" },
  },
  {
    id: "fawry",
    label: { en: "Fawry Pay", ar: "فوري" },
    image: "/payments/fawry-pay.webp",
    description: { en: "Pay at any Fawry outlet or via the app", ar: "ادفعي في أي منفذ فوري أو عبر التطبيق" },
  },
  {
    id: "instapay",
    label: { en: "InstaPay", ar: "InstaPay" },
    image: "/payments/instapay.webp",
    description: { en: "Instant bank transfer via InstaPay", ar: "تحويل بنكي فوري عبر InstaPay" },
  },
];

export function getPaymentText(method: PaymentMethod, locale: Locale): { label: string; description: string } {
  return { label: method.label[locale], description: method.description[locale] };
}
