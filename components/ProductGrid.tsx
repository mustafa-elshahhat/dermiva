import React from "react";
import ProductCard from "./ProductCard";
import type { ProductViewModel } from "@/lib/types/product";

export default function ProductGrid({ products }: { products: ProductViewModel[] }) {
  return (
    <div className="dm-grid-products">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
