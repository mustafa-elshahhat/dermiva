// Product domain + view-model types.

import type { Localized } from "./common";

/** Stable, language-independent product identifier (also used as the slug). */
export type ProductId = string;

/** Stable category key. Language-independent; labels are localized elsewhere. */
export type CategoryKey = "face" | "hair" | "body" | "lip";

/** Drawn-bottle variant used by the CSS fallback artwork. */
export type BottleKind = "serum" | "jar" | "tube" | "pump";

/** Stable product badge key ("" means no badge). Labels are translated in UI. */
export type ProductTag = "" | "best-seller" | "new";

/**
 * Raw product domain model. Stable business data (id, price, image, rating)
 * is language-independent; only `name`/`sub` are Localized. Product names stay
 * English in both locales by design — the Localized shape just keeps the door
 * open without duplicating the whole product per locale.
 */
export interface Product {
  id: ProductId;
  cat: CategoryKey;
  name: Localized<string>;
  sub: Localized<string>;
  price: number;
  kind: BottleKind;
  tag: ProductTag;
  rating: string;
  reviews: number;
  /** Canonical main product image (packshot) — single source of truth. */
  packshotImage: string;
}

/**
 * Frontend-friendly, locale-resolved product. Pre-localized display fields
 * (`name`, `sub`, `priceFormatted`, `image`) sit alongside raw values
 * (`price`, `ratingValue`) so client-side filtering/sorting still works without
 * re-reading the domain model.
 */
export interface ProductViewModel {
  id: ProductId;
  categoryKey: CategoryKey;
  name: string;
  sub: string;
  /** Raw numeric price (for totals, filtering, sorting). */
  price: number;
  /** Display price, e.g. "EGP 550.00". */
  priceFormatted: string;
  image: string;
  /** Locale-agnostic href (the active locale is applied by next-intl Link). */
  href: string;
  kind: BottleKind;
  tag: ProductTag;
  rating: string;
  /** Parsed rating for sorting. */
  ratingValue: number;
  reviews: number;
  /** Image alt text. */
  alt: string;
}

/** Sort option values. Labels are translated in the UI (sorting namespace). */
export const SORT_VALUES = ["featured", "price-asc", "price-desc", "rating", "name"] as const;
export type SortValue = (typeof SORT_VALUES)[number];

/** Client-side product list filter state (shop/category). */
export interface FilterState {
  sort: string;
  max: number;
  query: string;
}
