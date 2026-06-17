// Cross-cutting primitive types shared across the data layer.
//
// Localized<T> keeps stable business data separate from per-locale display
// text: business values (ids, prices, image paths) live once, while
// user-visible strings carry one variant per supported locale.

import type { Locale } from "@/i18n/routing";

/** A value with one variant per supported locale, e.g. { en, ar }. */
export type Localized<T> = Record<Locale, T>;

/** Stable, internal error description for a failed service/API call. */
export interface ApiError {
  /** Machine-readable code, e.g. "NOT_FOUND", "HTTP_ERROR", "PARSE_ERROR". */
  code: string;
  /** Developer-facing message. Never shown raw to end users. */
  message: string;
  /** HTTP status when the error originated from a network response. */
  status?: number;
}

/**
 * Discriminated result returned by every service/API call. Callers branch on
 * `ok` so success and failure are both handled explicitly (no thrown errors
 * leaking to the UI).
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };
