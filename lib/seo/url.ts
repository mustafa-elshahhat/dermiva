// URL helpers for SEO. Canonical/alternate values are returned root-relative and
// resolved to absolute URLs by `metadataBase` (set in the locale layout).

import type { Locale } from "@/i18n/routing";
import { SITE_URL } from "./config";

/** Normalized absolute base URL of the site. */
export function getSiteUrl(): string {
  return SITE_URL;
}

/**
 * Build a locale-prefixed, root-relative path. `path` is the locale-agnostic
 * route with a leading slash (or "" for the home page).
 *   localizedPath("en", "/shop") -> "/en/shop"
 *   localizedPath("ar", "")      -> "/ar"
 */
export function localizedPath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}
