// Checkout service. Frontend-only for now: createCheckout simulates a successful
// order and returns a mock order number. No real payment is taken and no
// purchase event is fired. The request/response shapes already match what a
// future .NET checkout endpoint would use, so wiring the backend later is a
// body change here only.

import type { Locale } from "@/i18n/routing";
import type { ApiResult } from "@/lib/types/common";
import type {
  CheckoutRequest,
  CheckoutResponse,
  PaymentMethodViewModel,
} from "@/lib/types/checkout";
import { getPaymentMethodVMs } from "@/lib/view-models/checkout.vm";
import { USE_MOCK } from "./config";
import { ok } from "./errors";

export async function getPaymentMethods(
  locale: Locale
): Promise<ApiResult<PaymentMethodViewModel[]>> {
  return ok(getPaymentMethodVMs(locale));
}

function generateMockOrderNumber(): string {
  return "DRM-" + Math.floor(10000 + Math.random() * 89999);
}

/**
 * Place an order. While USE_MOCK is true this is a clearly frontend-only success
 * flow — it does not process payment or persist anything server-side.
 */
export async function createCheckout(
  _request: CheckoutRequest,
  _locale: Locale
): Promise<ApiResult<CheckoutResponse>> {
  void _request;
  void _locale;
  // Future: when a backend exists, POST _request to the checkout endpoint.
  return ok<CheckoutResponse>({ orderNumber: generateMockOrderNumber(), mock: USE_MOCK });
}
