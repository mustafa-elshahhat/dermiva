"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Bottle from "@/components/Bottle";
import ProductGrid from "@/components/ProductGrid";
import FilterControls from "@/components/FilterControls";
import { CATS, CAT_KIND, filteredList, type CategoryKey, type FilterState } from "@/lib/catalog";

const DEFAULT_FILTER: FilterState = { sort: "featured", max: 700, query: "" };

export default function CategoryPage() {
  const params = useParams<{ cat: string }>();
  const cat = params.cat as CategoryKey;
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  if (!CATS[cat]) {
    notFound();
  }

  const patch = (p: Partial<FilterState>) => setFilter((f) => ({ ...f, ...p }));
  const info = CATS[cat];
  const list = filteredList(cat, filter);

  return (
    <div className="dm-fade">
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) 0" }}>
        <div style={{ background: "radial-gradient(120% 120% at 80% 20%,#fbe2e7,#f1cbd4 70%,#ebbfca)", borderRadius: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, padding: "clamp(26px,4vw,44px)", overflow: "hidden" }}>
          <div style={{ flex: "1 1 300px", minWidth: 260 }}>
            <div style={{ fontSize: 12.5, color: "#a98e93", marginBottom: 8 }}>Home / <span style={{ color: "#7c6065" }}>{info.label}</span></div>
            <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(34px,5vw,54px)", color: "#9a5d6a", margin: "0 0 10px", lineHeight: 1 }}>{info.label}</h1>
            <p style={{ fontSize: 15, color: "#7c6065", maxWidth: 380, margin: 0, lineHeight: 1.55 }}>{info.tagline}</p>
          </div>
          <div style={{ flex: "0 0 auto", width: "clamp(120px,20vw,180px)", height: "clamp(150px,24vw,210px)" }}>
            <Bottle kind={CAT_KIND[cat]} name={info.label} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(22px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ fontSize: 13, color: "#a98e93" }}>{list.length} products</div>
          <FilterControls filter={filter} onChange={patch} selectBg="#fff" />
        </div>

        {list.length === 0 ? (
          <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1" }}>
            <div style={{ fontSize: 46, marginBottom: 12 }}>🌸</div>
            <h3 className="dm-serif" style={{ fontSize: 26, color: "#5a4145", margin: "0 0 8px" }}>Nothing here yet</h3>
            <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>No products match your filters in this category.</p>
            <button onClick={() => setFilter(DEFAULT_FILTER)} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "12px 28px" }}>Reset Filters</button>
          </div>
        ) : (
          <ProductGrid products={list} />
        )}
      </section>
    </div>
  );
}
