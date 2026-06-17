// Centralized SEO configuration — the single source of truth for the site base
// URL, brand name, default social image, and locale -> Open Graph locale codes.

import type { Locale } from "@/i18n/routing";

/** Strip any trailing slashes so URL joins never produce `//`. */
function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Absolute base URL of the storefront. Prefers NEXT_PUBLIC_SITE_URL when set,
 * otherwise falls back to the deployed Vercel URL. The env var is optional so
 * local builds work without configuration.
 */
export const SITE_URL: string = normalizeUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dermiva-eg.vercel.app",
);

/** Brand name — never translated. */
export const SITE_NAME = "Dermiva" as const;

/** Default social-share image (purpose-built 1200x630 PNG). */
export const DEFAULT_OG_IMAGE = {
  url: "/brand/og-image.png",
  width: 1200,
  height: 630,
} as const;

/** Open Graph locale code per app locale. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_EG",
};

/** The OG locale of the *other* supported language, for og:locale:alternate. */
export function alternateOgLocale(locale: Locale): string {
  return locale === "ar" ? OG_LOCALE.en : OG_LOCALE.ar;
}
