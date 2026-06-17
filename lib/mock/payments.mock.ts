// Dermiva accepted payment methods — the single source of truth for every
// component that renders payment logos or options. Stand-in for a future API.

import type { PaymentMethod } from "@/lib/types/checkout";

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

export function getAllPaymentMethods(): PaymentMethod[] {
  return PAYMENT_METHODS.slice();
}
