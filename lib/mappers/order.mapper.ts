// Pure raw-Order -> OrderViewModel mapping for a given locale. Resolves order
// line products from the catalog and derives the money breakdown. Client-safe.

import type { Locale } from "@/i18n/routing";
import type { Order, OrderLineViewModel, OrderViewModel } from "@/lib/types/order";
import { findProductById } from "@/lib/mock/catalog.mock";
import { money } from "@/lib/locale/format";

const FREE_SHIPPING_THRESHOLD = 500;
const FLAT_SHIPPING = 40;

export function toOrderVM(order: Order, locale: Locale): OrderViewModel {
  const items: OrderLineViewModel[] = order.items
    .map((item) => {
      const product = findProductById(item.id);
      if (!product) return null;
      return {
        id: item.id,
        name: product.name[locale],
        sub: product.sub[locale],
        image: product.packshotImage,
        kind: product.kind,
        qty: item.qty,
        lineTotalFormatted: money(product.price * item.qty),
      } satisfies OrderLineViewModel;
    })
    .filter((it): it is OrderLineViewModel => it !== null);

  const subtotal = order.items.reduce((sum, item) => {
    const product = findProductById(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const discount = subtotal + shipping - order.total > 0 ? subtotal + shipping - order.total : 0;

  return {
    no: order.no,
    dateFormatted: order.date[locale],
    status: order.status,
    statusKey: order.status,
    itemCount: order.items.reduce((n, item) => n + item.qty, 0),
    items,
    subtotalFormatted: money(subtotal),
    shippingFormatted: money(shipping),
    shippingFree: shipping === 0,
    discount,
    discountFormatted: money(discount),
    totalFormatted: money(order.total),
  };
}
