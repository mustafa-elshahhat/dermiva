"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";
import type { ProductViewModel } from "@/lib/types/product";
import type { CategoryTileViewModel } from "@/lib/types/category";
import { searchProductVMs } from "@/lib/view-models/product.vm";
import { useSearch, useHydrated } from "@/lib/store";

interface Props {
  products: ProductViewModel[];
  categoryTiles: CategoryTileViewModel[];
}

export default function SearchContent({ products, categoryTiles }: Props) {
  const t = useTranslations();
  const { recent } = useSearch();
  const hydrated = useHydrated();
  const [query, setQuery] = useState("");
  const q = query.trim();
  const results = searchProductVMs(products, query);

  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 18px", textAlign: "center" }}>{t("search.title")}</h1>
      <div style={{ position: "relative", maxWidth: 600, margin: "0 auto 24px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          autoFocus
          style={{ width: "100%", border: "1px solid #e3c3cc", background: "#fff", borderRadius: 999, padding: "16px 22px", paddingInlineStart: 52, fontSize: 15, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145", boxSizing: "border-box", boxShadow: "0 8px 20px rgba(184,134,146,.12)" }}
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b89ca1" strokeWidth={1.8} style={{ position: "absolute", insetInlineStart: 20, top: "50%", transform: "translateY(-50%)" }}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      </div>

      {!q ? (
        <div style={{ maxWidth: 600, margin: "0 auto 32px" }}>
          {/* Recent searches come from persisted client state — only show once
              hydrated and non-empty so nothing flashes before saved terms load. */}
          {hydrated && recent.length > 0 ? (
            <>
              <div style={{ fontSize: 12.5, color: "#a98e93", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 12 }}>{t("search.recentSearches")}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                {recent.map((term) => (
                  <button key={term} onClick={() => setQuery(term)} className="dm-chip">{term}</button>
                ))}
              </div>
            </>
          ) : null}
          <div style={{ fontSize: 12.5, color: "#a98e93", letterSpacing: ".06em", textTransform: "uppercase", margin: recent.length > 0 && hydrated ? "26px 0 14px" : "0 0 14px" }}>{t("search.browseCategories")}</div>
          <div className="dm-grid-cats">
            {categoryTiles.map((tile) => (
              <Link key={tile.key} href={tile.href} style={{ cursor: "pointer", background: "#fff", border: "1px solid #f0dde1", borderRadius: 16, overflow: "hidden", textAlign: "center", display: "block" }}>
                <div style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                  <ProductImage image={tile.image} mode="packshot" name={tile.alt} kind={tile.kind} style={{ objectFit: "cover" }} />
                </div>
                <div className="dm-serif" style={{ fontWeight: 600, fontSize: 16, color: "#4f3a3e", padding: "10px 12px 14px" }}>{tile.label}</div>
              </Link>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: "center", padding: "54px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>🔍</div>
          <h3 className="dm-serif" style={{ fontSize: 24, color: "#5a4145", margin: "0 0 8px" }}>{t("search.noResultsTitle")}</h3>
          <p style={{ fontSize: 14, color: "#a98e93", margin: 0 }}>{t("search.noResultsText")}</p>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 13, color: "#a98e93", marginBottom: 16, textAlign: "center" }}>{t("common.resultsCount", { count: results.length })}</div>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}
