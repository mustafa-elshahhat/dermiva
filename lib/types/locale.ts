// Locale + direction types. Re-exported from the canonical i18n config so the
// data layer has a single import surface (@/lib/types) without depending on the
// i18n package directly.

export type { Locale } from "@/i18n/routing";
export type { Direction } from "@/i18n/direction";
