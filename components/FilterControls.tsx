"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { SORT_VALUES, type FilterState, type SortValue } from "@/lib/types/product";

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

const SORT_LABEL_KEY: Record<SortValue, string> = {
  featured: "featured",
  "price-asc": "priceAsc",
  "price-desc": "priceDesc",
  rating: "rating",
  name: "name",
};

export default function FilterControls({
  filter,
  onChange,
  selectBg = "#fdf6f4",
  idPrefix = "product-filter",
}: {
  filter: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  selectBg?: string;
  idPrefix?: string;
}) {
  const t = useTranslations("sorting");
  const priceId = `${idPrefix}-max-price`;
  const sortId = `${idPrefix}-sort`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <label htmlFor={priceId} style={{ fontSize: 12.5, color: "#7c6065", whiteSpace: "nowrap" }}>{t("maxPrice", { max: filter.max })}</label>
        <input
          id={priceId}
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
        <label htmlFor={sortId} style={{ fontSize: 12.5, color: "#7c6065" }}>{t("label")}</label>
        <select id={sortId} value={filter.sort} onChange={(e) => onChange({ sort: e.target.value })} style={{ ...selectStyle, background: selectBg }}>
          {SORT_VALUES.map((value) => (
            <option key={value} value={value}>
              {t(SORT_LABEL_KEY[value])}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
