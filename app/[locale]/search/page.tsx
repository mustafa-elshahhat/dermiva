import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProducts } from "@/lib/api/catalog.service";
import { buildCategoryTileVMs } from "@/lib/view-models/category.vm";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import SearchContent from "./SearchContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  // Internal search results are not indexed in this phase.
  return buildPageMetadata({
    locale,
    path: routes.search(),
    title: t("searchTitle"),
    description: t("searchDescription"),
    index: false,
    ogAlt: t("ogAlt"),
  });
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;

  const result = await getProducts(locale);
  const products = result.ok ? result.data : [];
  const categoryTiles = buildCategoryTileVMs(locale);

  return <SearchContent products={products} categoryTiles={categoryTiles} />;
}
