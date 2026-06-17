// Small text helpers shared across SEO metadata builders.

import { SITE_NAME } from "./config";

/**
 * Append the brand name for Open Graph / Twitter titles. Next's `title.template`
 * only rewrites the document <title>, not social titles, so we add it here to
 * keep them consistent (e.g. "Super Serum" -> "Super Serum — Dermiva").
 */
export function withSiteName(title: string): string {
  return `${title} — ${SITE_NAME}`;
}

/** Trim a description to a safe meta length on a word boundary. */
export function truncate(text: string, max = 160): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}
