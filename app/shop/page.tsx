import React from "react";
import ShopContent from "./ShopContent";
import { PRODUCTS } from "@/lib/catalog";

export default function ShopPage() {
  return (
    <div className="dm-fade" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>Home / <span style={{ color: "#7c6065" }}>Shop All</span></div>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>All Products</h1>
      <ShopContent initialProducts={PRODUCTS} />
    </div>
  );
}
