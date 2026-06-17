// Order view-model builders. Pure + client-safe (the account pages are
// client-rendered and auth-gated, so they build VMs synchronously from here;
// the async api/orders.service.ts exists for future server/API use).

import type { Locale } from "@/i18n/routing";
import type { OrderViewModel } from "@/lib/types/order";
import { getAllOrders, findOrderByNo } from "@/lib/mock/orders.mock";
import { toOrderVM } from "@/lib/mappers/order.mapper";

export function buildOrderVMs(locale: Locale): OrderViewModel[] {
  return getAllOrders().map((order) => toOrderVM(order, locale));
}

export function buildOrderVM(no: string, locale: Locale): OrderViewModel | undefined {
  const order = findOrderByNo(no);
  return order ? toOrderVM(order, locale) : undefined;
}
