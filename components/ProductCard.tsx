"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductImage from "./ProductImage";
import { money, productImage, type Product } from "@/lib/catalog";
import { useWishlist, useCartActions } from "@/lib/store";

// Ported from ProductCard.dc.html. Whole card opens the product; the heart and
// the + button act without opening (stopPropagation), matching the prototype.

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCartActions();
  const wished = wishlist.includes(product.id);

  return (
    <div
      className="dm-card"
      onClick={() => router.push(`/product/${product.id}`)}
      style={{ display: "flex", flexDirection: "column", cursor: "pointer", height: "100%" }}
    >
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
        <ProductImage
          image={productImage(product)}
          mode="packshot"
          name={product.name}
          kind={product.kind}
          style={{ objectFit: "cover" }}
        />
        {product.tag ? (
          <div style={{ position: "absolute", top: 12, left: 12, background: "linear-gradient(135deg,#d9a24f,#c2974f)", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999, boxShadow: "0 4px 10px rgba(194,151,79,.3)" }}>
            {product.tag}
          </div>
        ) : null}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="dm-card-wishlist-btn"
        >
          <span style={{ color: wished ? "#c97f8d" : "#c9a7ad" }}>{wished ? "♥" : "♡"}</span>
        </button>
      </div>
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <div className="dm-serif" style={{ fontSize: 20, fontWeight: 600, color: "#4f3a3e", lineHeight: 1.1 }}>{product.name}</div>
        <div style={{ fontSize: 12.5, color: "#a98e93" }}>{product.sub}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#b08a4e" }}>
          <span style={{ color: "#d9a24f" }}>{"★"}</span>
          <span style={{ color: "#7c6468", fontWeight: 500 }}>{product.rating}</span>
          <span style={{ color: "#bfa6ab" }}>({product.reviews})</span>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ fontSize: 15.5, fontWeight: 600, color: "#4f3a3e", letterSpacing: ".01em" }}>{money(product.price)}</div>
          <button
            aria-label="Add to cart"
            className="dm-add-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product.id);
            }}
          >
            {"+"}
          </button>
        </div>
      </div>
    </div>
  );
}
