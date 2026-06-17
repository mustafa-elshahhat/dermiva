// Cart view-model builders. Resolve persisted { id, qty } entries to renderable
// lines using current catalog data; unresolved ids are skipped gracefully.

import type { Locale } from "@/i18n/routing";
import type { CartItem, CartLineViewModel } from "@/lib/types/cart";
import { findProductById } from "@/lib/mock/catalog.mock";
import { money } from "@/lib/locale/format";

export function buildCartLines(items: CartItem[], locale: Locale): CartLineViewModel[] {
  return items
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
        price: product.price,
        priceFormatted: money(product.price),
        lineTotalFormatted: money(product.price * item.qty),
        href: `/product/${item.id}`,
      } satisfies CartLineViewModel;
    })
    .filter((line): line is CartLineViewModel => line !== null);
}
