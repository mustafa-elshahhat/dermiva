"use client";

import React, { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterControls from "@/components/FilterControls";
import { filteredList, type FilterState, type Product } from "@/lib/catalog";

const DEFAULT_FILTER: FilterState = { sort: "featured", max: 700, query: "" };

export default function ShopContent({ initialProducts }: { initialProducts: Product[] }) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);
  const patch = (p: Partial<FilterState>) => setFilter((f) => ({ ...f, ...p }));

  const list = filteredList(null, filter);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 22, background: "#fff", border: "1px solid #f0dde1", borderRadius: 16, padding: "14px 18px" }}>
        <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
          <input
            value={filter.query}
            onChange={(e) => patch({ query: e.target.value })}
            placeholder="Search products..."
            style={{ width: "100%", border: "1px solid #efd9df", background: "#fdf6f4", borderRadius: 999, padding: "11px 16px 11px 40px", fontSize: 13.5, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }}
          />
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#b89ca1" strokeWidth={1.8} style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
        </div>
        <FilterControls filter={filter} onChange={patch} />
      </div>

      <div style={{ fontSize: 13, color: "#a98e93", marginBottom: 16 }}>{list.length} products</div>

      {list.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1" }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>👜</div>
          <h3 className="dm-serif" style={{ fontSize: 26, color: "#5a4145", margin: "0 0 8px" }}>No products found</h3>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>Try adjusting your filters or search.</p>
          <button onClick={() => setFilter(DEFAULT_FILTER)} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "12px 28px" }}>Clear Filters</button>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </>
  );
}
