// Product view-model builders + pure client-side list operations.
//
// Client components receive ProductViewModel[] from the server (via services)
// and use filterProductVMs / searchProductVMs to react to user input without
// touching the raw catalog. Builders that resolve by id are used where a client
// holds only stable ids (wishlist).

import type { Locale } from "@/i18n/routing";
import type { ProductId, ProductViewModel, FilterState } from "@/lib/types/product";
import { findProductById, getAllProducts } from "@/lib/mock/catalog.mock";
import { toProductVM, toProductVMs } from "@/lib/mappers/product.mapper";

/** Resolve a single product id to a view model (undefined if missing). */
export function buildProductVMById(id: ProductId, locale: Locale): ProductViewModel | undefined {
  const product = findProductById(id);
  return product ? toProductVM(product, locale) : undefined;
}

/** Resolve a list of ids to view models, silently skipping missing ids. */
export function buildProductVMs(ids: ProductId[], locale: Locale): ProductViewModel[] {
  return ids
    .map((id) => buildProductVMById(id, locale))
    .filter((vm): vm is ProductViewModel => vm !== undefined);
}

/** All products as view models (used by the server services). */
export function buildAllProductVMs(locale: Locale): ProductViewModel[] {
  return toProductVMs(getAllProducts(), locale);
}

function matches(vm: ProductViewModel, q: string): boolean {
  const haystack = (vm.name + " " + vm.categoryKey + " " + vm.sub).toLowerCase();
  return haystack.includes(q);
}

/** Apply the shop/category filter+sort to an already-resolved VM list. */
export function filterProductVMs(
  list: ProductViewModel[],
  f: FilterState,
  locale: Locale
): ProductViewModel[] {
  let out = list.slice();
  if (f.query && f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    out = out.filter((vm) => matches(vm, q));
  }
  out = out.filter((vm) => vm.price <= f.max);
  if (f.sort === "price-asc") out.sort((a, b) => a.price - b.price);
  else if (f.sort === "price-desc") out.sort((a, b) => b.price - a.price);
  else if (f.sort === "rating") out.sort((a, b) => b.ratingValue - a.ratingValue);
  else if (f.sort === "name") out.sort((a, b) => a.name.localeCompare(b.name, locale));
  return out;
}

/** Live substring search over an already-resolved VM list. */
export function searchProductVMs(list: ProductViewModel[], query: string): ProductViewModel[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return list.filter((vm) => matches(vm, q));
}
