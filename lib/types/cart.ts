// Cart domain + view-model types.

import type { ProductId, BottleKind } from "./product";

/**
 * The only thing persisted per cart entry: a stable product id and quantity.
 * No localized text or display data is ever stored here.
 */
export interface CartItem {
  id: ProductId;
  qty: number;
}

/** Locale-resolved cart line for rendering. */
export interface CartLineViewModel {
  id: ProductId;
  name: string;
  sub: string;
  image: string;
  kind: BottleKind;
  qty: number;
  /** Raw unit price. */
  price: number;
  /** Display unit price. */
  priceFormatted: string;
  /** Display line total (price * qty). */
  lineTotalFormatted: string;
  /** Locale-agnostic href. */
  href: string;
}

/** Computed cart money summary (all raw numeric — format at render time). */
export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  cartCount: number;
}
