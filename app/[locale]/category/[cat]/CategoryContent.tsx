"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductGrid from "@/components/ProductGrid";
import FilterControls from "@/components/FilterControls";
import type { Locale } from "@/i18n/routing";
import type { FilterState, ProductViewModel } from "@/lib/types/product";
import { filterProductVMs } from "@/lib/view-models/product.vm";

const DEFAULT_FILTER: FilterState = { sort: "featured", max: 700, query: "" };

export default function CategoryContent({ products }: { products: ProductViewModel[] }) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const patch = (p: Partial<FilterState>) => setFilter((f) => ({ ...f, ...p }));

  const list = filterProductVMs(products, filter, locale);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div style={{ fontSize: 13, color: "#a98e93" }}>{t("common.productsCount", { count: list.length })}</div>
        <FilterControls filter={filter} onChange={patch} selectBg="#fff" />
      </div>

      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1" }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>🌸</div>
          <h3 className="dm-serif" style={{ fontSize: 26, color: "#5a4145", margin: "0 0 8px" }}>{t("category.emptyTitle")}</h3>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>{t("category.emptyText")}</p>
          <button onClick={() => setFilter(DEFAULT_FILTER)} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "12px 28px" }}>{t("category.resetFilters")}</button>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </>
  );
}
