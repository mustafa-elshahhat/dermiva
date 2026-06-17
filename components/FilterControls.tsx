"use client";

import React from "react";
import { SORT_OPTIONS, type FilterState } from "@/lib/catalog";

const selectStyle: React.CSSProperties = {
  border: "1px solid #efd9df",
  background: "#fdf6f4",
  borderRadius: 999,
  padding: "9px 14px",
  fontSize: 13,
  fontFamily: "var(--font-jost),sans-serif",
  color: "#5a4145",
  cursor: "pointer",
};

export default function FilterControls({
  filter,
  onChange,
  selectBg = "#fdf6f4",
}: {
  filter: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  selectBg?: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12.5, color: "#a98e93", whiteSpace: "nowrap" }}>Max EGP {filter.max}</span>
        <input
          type="range"
          min={120}
          max={700}
          step={10}
          value={filter.max}
          onChange={(e) => onChange({ max: Number(e.target.value) })}
          style={{ width: 120, accentColor: "#c07f8d" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <span style={{ fontSize: 12.5, color: "#a98e93" }}>Sort</span>
        <select value={filter.sort} onChange={(e) => onChange({ sort: e.target.value })} style={{ ...selectStyle, background: selectBg }}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
