// Account service. Async + ApiResult-shaped. The current auth/profile state is
// client-only (persisted in the store); this service exposes the account-scoped
// order data and is the place a future .NET account API would be wired in.

import type { Locale } from "@/i18n/routing";
import type { ApiResult } from "@/lib/types/common";
import type { OrderViewModel } from "@/lib/types/order";
import { getOrders } from "./orders.service";

/** Orders belonging to the signed-in customer (all mock orders today). */
export async function getAccountOrders(locale: Locale): Promise<ApiResult<OrderViewModel[]>> {
  return getOrders(locale);
}
