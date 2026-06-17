import React from "react";
import ProductCard from "./ProductCard";
import type { ProductViewModel } from "@/lib/types/product";

export default function ProductGrid({
  products,
  tracking,
}: {
  products: ProductViewModel[];
  tracking?: { clickEventName: "search_result_click"; queryLength: number };
}) {
  return (
    <div className="dm-grid-products">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} tracking={tracking} />
      ))}
    </div>
  );
}
