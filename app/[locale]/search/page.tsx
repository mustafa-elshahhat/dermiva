import React from "react";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProducts } from "@/lib/api/catalog.service";
import { buildCategoryTileVMs } from "@/lib/view-models/category.vm";
import SearchContent from "./SearchContent";

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;

  const result = await getProducts(locale);
  const products = result.ok ? result.data : [];
  const categoryTiles = buildCategoryTileVMs(locale);

  return <SearchContent products={products} categoryTiles={categoryTiles} />;
}
