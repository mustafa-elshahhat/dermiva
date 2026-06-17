// Pure raw-Product -> ProductViewModel mapping for a given locale. Client-safe.

import type { Locale } from "@/i18n/routing";
import type { Product, ProductViewModel } from "@/lib/types/product";
import { money } from "@/lib/locale/format";

export function toProductVM(product: Product, locale: Locale): ProductViewModel {
  const name = product.name[locale];
  return {
    id: product.id,
    categoryKey: product.cat,
    name,
    sub: product.sub[locale],
    price: product.price,
    priceFormatted: money(product.price),
    // The packshot is the single source of truth for the product image; never
    // read an image from persisted cart/wishlist storage (which holds ids only).
    image: product.packshotImage,
    href: `/product/${product.id}`,
    kind: product.kind,
    tag: product.tag,
    rating: product.rating,
    ratingValue: parseFloat(product.rating),
    reviews: product.reviews,
    alt: name,
  };
}

export function toProductVMs(products: Product[], locale: Locale): ProductViewModel[] {
  return products.map((p) => toProductVM(p, locale));
}
