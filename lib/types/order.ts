// Order domain + view-model types.

import type { Localized } from "./common";
import type { ProductId, BottleKind } from "./product";

export type OrderStatus = "delivered" | "shipped" | "processing";

/** Raw order model. `date` is localized display text; money is numeric. */
export interface Order {
  no: string;
  date: Localized<string>;
  status: OrderStatus;
  total: number;
  items: { id: ProductId; qty: number }[];
}

/** Locale-resolved order line for rendering. */
export interface OrderLineViewModel {
  id: ProductId;
  name: string;
  sub: string;
  image: string;
  kind: BottleKind;
  qty: number;
  lineTotalFormatted: string;
}

/** Frontend-friendly, locale-resolved order. */
export interface OrderViewModel {
  no: string;
  dateFormatted: string;
  status: OrderStatus;
  /** Stable status key for translating the label in the UI. */
  statusKey: OrderStatus;
  itemCount: number;
  items: OrderLineViewModel[];
  subtotalFormatted: string;
  shippingFormatted: string;
  /** Whether shipping was free (for "Free" vs amount in the UI). */
  shippingFree: boolean;
  discount: number;
  discountFormatted: string;
  totalFormatted: string;
}
