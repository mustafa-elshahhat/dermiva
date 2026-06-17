// Locale-aware display formatting. Pure + client-safe.

import type { Locale } from "@/i18n/routing";

/** Format a numeric EGP amount for display, e.g. money(550) -> "EGP 550.00". */
export function money(n: number): string {
  return "EGP " + Number(n).toFixed(2);
}

/** Join a list of strings with the locale-appropriate separator. */
export function formatList(items: string[], locale: Locale): string {
  const sep = locale === "ar" ? "، " : ", ";
  return items.join(sep);
}
