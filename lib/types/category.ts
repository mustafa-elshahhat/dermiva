// Category domain + view-model types.

import type { Localized } from "./common";
import type { CategoryKey, BottleKind } from "./product";
import type { ResponsiveImageSet } from "@/lib/images";

export type { CategoryKey };

export interface CategoryHeroImages {
  desktop: string;
  tablet: string;
  mobile: string;
}

/** Raw category model: localized labels + art-directed imagery. */
export interface Category {
  label: Localized<string>;
  tagline: Localized<string>;
  /** Category card visual used in the "Shop by Category" cards. */
  cardImage: string;
  /** Responsive hero banner imagery (English / default). */
  heroImages: CategoryHeroImages;
  /** Optional art-directed RTL variant for Arabic; falls back to heroImages. */
  heroImagesRtl?: CategoryHeroImages;
}

/** Marketing/usage copy keyed by category (shared by its products). */
export interface CategoryContent {
  desc: Localized<string>;
  benefits: Localized<string[]>;
  ingredients: Localized<string[]>;
  howto: Localized<string>;
}

/** Locale-resolved category content. */
export interface CategoryContentViewModel {
  desc: string;
  benefits: string[];
  ingredients: string[];
  howto: string;
}

/** Compact category tile (e.g. search "browse categories"): label + preview. */
export interface CategoryTileViewModel {
  key: CategoryKey;
  label: string;
  href: string;
  /** Preview image (first product in the category). */
  image: string;
  kind: BottleKind;
  alt: string;
}

/** Frontend-friendly, locale-resolved category. */
export interface CategoryViewModel {
  key: CategoryKey;
  label: string;
  tagline: string;
  cardImage: string;
  /** Hero image set already resolved for the active locale. */
  hero: ResponsiveImageSet;
  /** Locale-agnostic href. */
  href: string;
  /** Number of products in this category (for "X products" labels). */
  productCount: number;
  content: CategoryContentViewModel;
}
