"use client";

import React, { useState } from "react";
import Link from "next/link";
import Bottle from "@/components/Bottle";
import ProductGrid from "@/components/ProductGrid";
import { CATS, CAT_KIND, PRODUCTS, searchProducts, type CategoryKey } from "@/lib/catalog";
import { useSearch } from "@/lib/store";

export default function SearchPage() {
  const { recent } = useSearch();
  const [query, setQuery] = useState("");
  const q = query.trim();
  const results = searchProducts(query);
  const catKeys = Object.keys(CATS) as CategoryKey[];

  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 18px", textAlign: "center" }}>Search</h1>
      <div style={{ position: "relative", maxWidth: 600, margin: "0 auto 24px" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for serums, oils, lip care..."
          autoFocus
          style={{ width: "100%", border: "1px solid #e3c3cc", background: "#fff", borderRadius: 999, padding: "16px 22px 16px 52px", fontSize: 15, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145", boxSizing: "border-box", boxShadow: "0 8px 20px rgba(184,134,146,.12)" }}
        />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b89ca1" strokeWidth={1.8} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)" }}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4-4" />
        </svg>
      </div>

      {!q ? (
        <div style={{ maxWidth: 600, margin: "0 auto 32px" }}>
          <div style={{ fontSize: 12.5, color: "#a98e93", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 12 }}>Recent Searches</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
            {recent.map((term) => (
              <button key={term} onClick={() => setQuery(term)} className="dm-chip">{term}</button>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: "#a98e93", letterSpacing: ".06em", textTransform: "uppercase", margin: "26px 0 14px" }}>Browse Categories</div>
          <div className="dm-grid-cats">
            {catKeys.map((k) => (
              <Link key={k} href={`/category/${k}`} style={{ cursor: "pointer", background: "#fff", border: "1px solid #f0dde1", borderRadius: 16, padding: 14, textAlign: "center" }}>
                <div style={{ height: 70, marginBottom: 6 }}><Bottle kind={CAT_KIND[k]} name={CATS[k].label} /></div>
                <div className="dm-serif" style={{ fontWeight: 600, fontSize: 16, color: "#4f3a3e" }}>{CATS[k].label}</div>
              </Link>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: "center", padding: "54px 20px", background: "#fff", borderRadius: 20, border: "1px solid #f0dde1", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 46, marginBottom: 12 }}>🔍</div>
          <h3 className="dm-serif" style={{ fontSize: 24, color: "#5a4145", margin: "0 0 8px" }}>No results found</h3>
          <p style={{ fontSize: 14, color: "#a98e93", margin: 0 }}>We couldn&apos;t find anything matching your search. Try a different keyword.</p>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 13, color: "#a98e93", marginBottom: 16, textAlign: "center" }}>{results.length} results</div>
          <ProductGrid products={results} />
        </>
      )}
    </div>
  );
}

// Silence unused import lint in case PRODUCTS isn't referenced elsewhere.
void PRODUCTS;
