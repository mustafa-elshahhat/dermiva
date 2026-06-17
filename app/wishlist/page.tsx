"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Bottle from "@/components/Bottle";
import { getProduct, money } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const router = useRouter();
  const { wishlist, moveToCart, toggleWishlist } = useStore();

  const items = wishlist
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="dm-fade" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>Home / <span style={{ color: "#7c6065" }}>Wishlist</span></div>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>My Wishlist</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 54, marginBottom: 14 }}>♥</div>
          <h3 className="dm-serif" style={{ fontSize: 28, color: "#5a4145", margin: "0 0 8px" }}>Your wishlist is empty</h3>
          <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 24px" }}>Save items you love here to easily find them later.</p>
          <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px" }}>Explore Products</button>
        </div>
      ) : (
        <div className="dm-grid-products">
          {items.map((product) => (
            <div
              key={product.id}
              className="dm-card"
              style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <div
                onClick={() => router.push(`/product/${product.id}`)}
                style={{ position: "relative", background: "linear-gradient(160deg,#fbeef0,#f6dfe5)", aspectRatio: "1/1", cursor: "pointer" }}
              >
                <Bottle kind={product.kind} name={product.name} />
                {product.tag ? (
                  <div style={{ position: "absolute", top: 12, left: 12, background: "linear-gradient(135deg,#d9a24f,#c2974f)", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999 }}>
                    {product.tag}
                  </div>
                ) : null}
                <button
                  aria-label="Remove from wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="dm-card-wishlist-btn"
                >
                  <span style={{ color: "#c97f8d" }}>♥</span>
                </button>
              </div>
              <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
                <div
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="dm-serif"
                  style={{ fontSize: 20, fontWeight: 600, color: "#4f3a3e", lineHeight: 1.1, cursor: "pointer" }}
                >
                  {product.name}
                </div>
                <div style={{ fontSize: 12.5, color: "#a98e93" }}>{product.sub}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#b08a4e", marginBottom: 12 }}>
                  <span style={{ color: "#d9a24f" }}>{"★"}</span>
                  <span style={{ color: "#7c6468", fontWeight: 500 }}>{product.rating}</span>
                  <span style={{ color: "#bfa6ab" }}>({product.reviews})</span>
                </div>
                
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 600, color: "#4f3a3e", letterSpacing: ".01em", marginBottom: 4 }}>
                    {money(product.price)}
                  </div>
                  <button
                    onClick={() => moveToCart(product.id)}
                    className="dm-btn-primary"
                    style={{ width: "100%", fontSize: 12.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "13px 0" }}
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="dm-btn-outline"
                    style={{ width: "100%", fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", padding: "12px 0" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
