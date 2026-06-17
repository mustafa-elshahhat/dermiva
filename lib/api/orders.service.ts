// Orders service. Async + ApiResult-shaped; resolves from mock today.
// (Account pages are client-rendered/auth-gated and build order VMs directly via
// view-models/order.vm.ts; this service is the API-ready server-side surface.)

import type { Locale } from "@/i18n/routing";
import type { ApiResult } from "@/lib/types/common";
import type { OrderViewModel } from "@/lib/types/order";
import { buildOrderVMs, buildOrderVM } from "@/lib/view-models/order.vm";
import { ok, notFound } from "./errors";

export async function getOrders(locale: Locale): Promise<ApiResult<OrderViewModel[]>> {
  return ok(buildOrderVMs(locale));
}

export async function getOrderByNumber(
  orderNo: string,
  locale: Locale
): Promise<ApiResult<OrderViewModel>> {
  const vm = buildOrderVM(orderNo, locale);
  return vm ? ok(vm) : notFound(`Order "${orderNo}" not found`);
}
