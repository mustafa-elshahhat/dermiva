// ApiResult constructors + well-known error codes. Keeps service code terse and
// ensures errors stay structured (never raw exceptions leaking to the UI).

import type { ApiError, ApiResult } from "@/lib/types/common";

export const ERROR_CODES = {
  NOT_FOUND: "NOT_FOUND",
  HTTP_ERROR: "HTTP_ERROR",
  PARSE_ERROR: "PARSE_ERROR",
  NETWORK_ERROR: "NETWORK_ERROR",
} as const;

export function ok<T>(data: T): ApiResult<T> {
  return { ok: true, data };
}

export function fail<T>(error: ApiError): ApiResult<T> {
  return { ok: false, error };
}

export function notFound<T>(message = "Resource not found"): ApiResult<T> {
  return fail<T>({ code: ERROR_CODES.NOT_FOUND, message });
}
