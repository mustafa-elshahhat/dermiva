"use client";

import React, { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterControls from "@/components/FilterControls";
import { filteredList, type CategoryKey, type FilterState } from "@/lib/catalog";

const DEFAULT_FILTER: FilterState = { sort: "featured", max: 700, query: "" };

export default function CategoryContent({ cat }: { cat: CategoryKey }) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const patch = (p: Partial<FilterState>) => setFilter((f) => ({ ...f, ...p }));

  const list = filteredList(cat, filter);

  return (
    <>
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
    </>
  );
}
