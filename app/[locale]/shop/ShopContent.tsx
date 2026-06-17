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

export default function ShopContent({ products }: { products: ProductViewModel[] }) {
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 22, background: "#fff", border: "1px solid #f0dde1", borderRadius: 16, padding: "14px 18px" }}>
        <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
          <label htmlFor="shop-search" className="sr-only">{t("shop.searchPlaceholder")}</label>
          <input
            id="shop-search"
            value={filter.query}
            onChange={(e) => patch({ query: e.target.value })}
            placeholder={t("shop.searchPlaceholder")}
            style={{ width: "100%", border: "1px solid #efd9df", background: "#fdf6f4", borderRadius: 999, padding: "11px 16px", paddingInlineStart: 40, fontSize: 13.5, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }}
          />
          <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b89ca1" strokeWidth={1.8} style={{ position: "absolute", insetInlineStart: 15, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
        </div>
        <FilterControls filter={filter} onChange={patch} idPrefix="shop-filter" />
      </div>

      <div style={{ fontSize: 13, color: "#a98e93", marginBottom: 16 }}>{t("common.productsCount", { count: list.length })}</div>

      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1" }}>
          <div aria-hidden="true" style={{ fontSize: 46, marginBottom: 12 }}>👜</div>
          <h2 className="dm-serif" style={{ fontSize: 26, color: "#5a4145", margin: "0 0 8px" }}>{t("shop.emptyTitle")}</h2>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>{t("shop.emptyText")}</p>
          <button onClick={() => setFilter(DEFAULT_FILTER)} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "12px 28px" }}>{t("shop.clearFilters")}</button>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </>
  );
}
