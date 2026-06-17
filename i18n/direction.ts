export type Direction = "ltr" | "rtl";

/** Reading direction for a locale. Arabic is RTL; everything else is LTR. */
export function getDirection(locale: string): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Convenience flag for Arabic-specific branches (fonts, RTL assets, etc.). */
export function isArabic(locale: string): boolean {
  return locale === "ar";
}
