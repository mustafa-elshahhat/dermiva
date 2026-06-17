// Locale-aware art-directed image selection.
//
// English uses the current image sets. Arabic can use RTL-specific variants
// (composition mirrored, but packaging/text never flipped) WHEN they exist.
// When no RTL variant is provided, Arabic safely falls back to the English set
// so an image is never broken.

import type { Locale } from "@/i18n/routing";

export interface ResponsiveImageSet {
  desktop: string;
  tablet: string;
  mobile: string;
}

/**
 * Pick the right responsive image set for the active locale.
 * Returns `rtlSet` only for Arabic when it is provided; otherwise `set`.
 */
export function getHeroImageSet(
  set: ResponsiveImageSet,
  locale: Locale,
  rtlSet?: ResponsiveImageSet
): ResponsiveImageSet {
  if (locale === "ar" && rtlSet) return rtlSet;
  return set;
}

// Homepage hero. English assets live under /hero/en. Drop RTL-specific files under
// /hero/ar and set HOME_HERO_RTL to enable them for Arabic.
export const HOME_HERO: ResponsiveImageSet = {
  desktop: "/hero/en/desktop.webp",
  tablet: "/hero/en/tablet.webp",
  mobile: "/hero/en/mobile.webp",
};
export const HOME_HERO_RTL: ResponsiveImageSet | undefined = {
  desktop: "/hero/ar/desktop.webp",
  tablet: "/hero/ar/tablet.webp",
  mobile: "/hero/ar/mobile.webp",
};

// Hair Therapy collection banner.
export const HAIR_COLLECTION: ResponsiveImageSet = {
  desktop: "/hair-therapy-collection/en/hair-therapy-collection-desktop.webp",
  tablet: "/hair-therapy-collection/en/hair-therapy-collection-tablet.webp",
  mobile: "/hair-therapy-collection/en/hair-therapy-collection-mobile.webp",
};
export const HAIR_COLLECTION_RTL: ResponsiveImageSet | undefined = {
  desktop: "/hair-therapy-collection/ar/hair-therapy-collection-desktop.webp",
  tablet: "/hair-therapy-collection/ar/hair-therapy-collection-tablet.webp",
  mobile: "/hair-therapy-collection/ar/hair-therapy-collection-mobile.webp",
};
