"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import ProductGrid from "@/components/ProductGrid";
import FilterControls from "@/components/FilterControls";
import type { Locale } from "@/i18n/routing";
import type { FilterState, ProductViewModel } from "@/lib/types/product";
import { filterProductVMs } from "@/lib/view-models/product.vm";
import { trackEvent } from "@/lib/analytics/analytics";

const DEFAULT_FILTER: FilterState = { sort: "featured", max: 700, query: "" };

export default function CategoryContent({ products }: { products: ProductViewModel[] }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const route = usePathname();
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const patch = (p: Partial<FilterState>) => setFilter((f) => {
    if (p.sort && p.sort !== f.sort) {
      trackEvent("sort_change", { locale, route, sort: p.sort });
    }
    if (typeof p.max === "number" && p.max !== f.max) {
      trackEvent("filter_apply", { locale, route, filterKey: "max_price", filterValue: p.max, currency: "EGP" });
    }
    return { ...f, ...p };
  });

  const list = filterProductVMs(products, filter, locale);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div style={{ fontSize: 13, color: "#a98e93" }}>{t("common.productsCount", { count: list.length })}</div>
        <FilterControls filter={filter} onChange={patch} selectBg="#fff" idPrefix="category-filter" />
      </div>

      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1" }}>
          <div aria-hidden="true" style={{ fontSize: 46, marginBottom: 12 }}>🌸</div>
          <h2 className="dm-serif" style={{ fontSize: 26, color: "#5a4145", margin: "0 0 8px" }}>{t("category.emptyTitle")}</h2>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>{t("category.emptyText")}</p>
          <button onClick={() => setFilter(DEFAULT_FILTER)} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "12px 28px" }}>{t("category.resetFilters")}</button>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </>
  );
}
