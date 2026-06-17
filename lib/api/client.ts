// Typed fetch wrapper for the future .NET backend.
//
// Today the app runs on mock data, so this client is wired but not exercised
// (services short-circuit while USE_MOCK is true). When a base URL is set, the
// services can call request<T>() / get<T>() / etc. with no shape changes.
// All failures are returned as structured ApiResult — never thrown.

import type { ApiResult } from "@/lib/types/common";
import { API_BASE_URL } from "./config";
import { ERROR_CODES, fail, ok } from "./errors";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: Method;
  /** JSON-serialisable request body (for POST/PATCH). */
  body?: unknown;
  /** Extra headers merged over the defaults. */
  headers?: Record<string, string>;
  /** Next.js fetch caching hints, passed through untouched. */
  cache?: RequestCache;
  signal?: AbortSignal;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<ApiResult<T>> {
  const { method = "GET", body, headers, cache, signal } = options;
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache,
      signal,
    });
  } catch (e) {
    return fail<T>({
      code: ERROR_CODES.NETWORK_ERROR,
      message: e instanceof Error ? e.message : "Network request failed",
    });
  }

  if (!response.ok) {
    return fail<T>({
      code: response.status === 404 ? ERROR_CODES.NOT_FOUND : ERROR_CODES.HTTP_ERROR,
      message: `Request failed with status ${response.status}`,
      status: response.status,
    });
  }

  // 204 / empty body -> treat as null payload.
  if (response.status === 204) {
    return ok<T>(null as T);
  }

  try {
    const data = (await response.json()) as T;
    return ok<T>(data);
  } catch {
    return fail<T>({ code: ERROR_CODES.PARSE_ERROR, message: "Failed to parse response body" });
  }
}

export const apiClient = {
  request,
  get: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
