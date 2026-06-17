"use client";

import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/catalog";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="dm-grid-products">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
