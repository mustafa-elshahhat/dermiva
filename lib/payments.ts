// Dermiva – centralised payment methods data source.
// All payment-related UI should import from here instead of
// maintaining separate lists.

export type PaymentMethodId = "cod" | "mobile-wallets" | "fawry" | "instapay";

export interface PaymentMethod {
  /** Unique identifier used in form state and order records. */
  id: PaymentMethodId;
  /** Human-readable label. */
  label: string;
  /** Path to the optimised webp logo under /public. */
  image: string;
  /** Short description shown as subtitle. */
  description: string;
}

/**
 * The four payment methods accepted by Dermiva.
 * This single list is the source of truth for every component
 * that renders payment logos or options.
 */
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    image: "/payments/cash-on-delivery.webp",
    description: "Pay when your order arrives",
  },
  {
    id: "mobile-wallets",
    label: "Mobile Wallets",
    image: "/payments/mobile-wallets.webp",
    description: "Vodafone Cash, Orange Cash, Etisalat Cash & more",
  },
  {
    id: "fawry",
    label: "Fawry Pay",
    image: "/payments/fawry-pay.webp",
    description: "Pay at any Fawry outlet or via the app",
  },
  {
    id: "instapay",
    label: "InstaPay",
    image: "/payments/instapay.webp",
    description: "Instant bank transfer via InstaPay",
  },
];
