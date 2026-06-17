// Category view-model builders. Pure + client-safe.

import type { Locale } from "@/i18n/routing";
import type {
  CategoryKey,
  CategoryViewModel,
  CategoryTileViewModel,
} from "@/lib/types/category";
import {
  CATS,
  CATEGORY_CONTENT,
  getAllCategoryKeys,
  getProductCountByCategory,
  getFirstProductInCategory,
} from "@/lib/mock/catalog.mock";
import { toCategoryVM } from "@/lib/mappers/category.mapper";

export function buildCategoryVM(key: CategoryKey, locale: Locale): CategoryViewModel | undefined {
  const category = CATS[key];
  if (!category) return undefined;
  return toCategoryVM(key, category, CATEGORY_CONTENT[key], getProductCountByCategory(key), locale);
}

export function buildCategoryVMs(locale: Locale): CategoryViewModel[] {
  return getAllCategoryKeys()
    .map((key) => buildCategoryVM(key, locale))
    .filter((vm): vm is CategoryViewModel => vm !== undefined);
}

/** Compact tiles for the search "browse categories" grid. */
export function buildCategoryTileVMs(locale: Locale): CategoryTileViewModel[] {
  return getAllCategoryKeys().map((key) => {
    const label = CATS[key].label[locale];
    const product = getFirstProductInCategory(key);
    return {
      key,
      label,
      href: `/category/${key}`,
      image: product.packshotImage,
      kind: product.kind,
      alt: label,
    };
  });
}
