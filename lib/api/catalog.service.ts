// Catalog service — the data access surface used by pages/components.
//
// Async + ApiResult-shaped so swapping mock for the .NET API later only changes
// the bodies here (e.g. `return apiClient.get<...>("/products")`), never callers.
// Today it resolves locally from mock data through the mapper/VM layer.

import type { Locale } from "@/i18n/routing";
import type { ApiResult } from "@/lib/types/common";
import type { CategoryKey, ProductId } from "@/lib/types/product";
import type { ProductViewModel } from "@/lib/types/product";
import type { CategoryViewModel } from "@/lib/types/category";
import {
  getProductsByCategoryKey,
  getBestSellerProducts,
  getRelatedProducts as getRelatedRaw,
} from "@/lib/mock/catalog.mock";
import { toProductVMs } from "@/lib/mappers/product.mapper";
import {
  buildAllProductVMs,
  buildProductVMById,
  searchProductVMs,
} from "@/lib/view-models/product.vm";
import { buildCategoryVMs, buildCategoryVM } from "@/lib/view-models/category.vm";
import { ok, notFound } from "./errors";

export async function getProducts(locale: Locale): Promise<ApiResult<ProductViewModel[]>> {
  return ok(buildAllProductVMs(locale));
}

export async function getProductById(
  id: ProductId,
  locale: Locale
): Promise<ApiResult<ProductViewModel>> {
  const vm = buildProductVMById(id, locale);
  return vm ? ok(vm) : notFound(`Product "${id}" not found`);
}

export async function getProductsByCategory(
  cat: CategoryKey,
  locale: Locale
): Promise<ApiResult<ProductViewModel[]>> {
  return ok(toProductVMs(getProductsByCategoryKey(cat), locale));
}

export async function searchProducts(
  query: string,
  locale: Locale
): Promise<ApiResult<ProductViewModel[]>> {
  return ok(searchProductVMs(buildAllProductVMs(locale), query));
}

export async function getBestSellers(locale: Locale): Promise<ApiResult<ProductViewModel[]>> {
  return ok(toProductVMs(getBestSellerProducts(), locale));
}

export async function getRelatedProducts(
  cat: CategoryKey,
  excludeId: ProductId,
  locale: Locale
): Promise<ApiResult<ProductViewModel[]>> {
  return ok(toProductVMs(getRelatedRaw(cat, excludeId), locale));
}

export async function getCategories(locale: Locale): Promise<ApiResult<CategoryViewModel[]>> {
  return ok(buildCategoryVMs(locale));
}

export async function getCategoryByKey(
  key: CategoryKey,
  locale: Locale
): Promise<ApiResult<CategoryViewModel>> {
  const vm = buildCategoryVM(key, locale);
  return vm ? ok(vm) : notFound(`Category "${key}" not found`);
}
