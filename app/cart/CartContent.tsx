"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { getProduct, money, productImage } from "@/lib/catalog";
import { useCartState, useCartActions, usePromo } from "@/lib/store";

export default function CartContent() {
  const router = useRouter();
  const { cart, subtotal, shipping, discount, total } = useCartState();
  const { setQty, removeFromCart } = useCartActions();
  const { promo, promoApplied, setPromo, applyPromo } = usePromo();

  const lines = cart.map((c) => ({ ...getProduct(c.id)!, qty: c.qty, id: c.id })).filter((l) => l.name);
  const freeShipNote = subtotal > 0 && subtotal < 500 ? `Add ${money(500 - subtotal)} for free shipping` : "";

  if (lines.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1" }}>
        <div style={{ fontSize: 54, marginBottom: 14 }}>🛒</div>
        <h3 className="dm-serif" style={{ fontSize: 28, color: "#5a4145", margin: "0 0 8px" }}>Your cart is empty</h3>
        <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 24px" }}>Discover our bestselling skincare and find your glow.</p>
        <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px" }}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="dm-grid-responsive-two-col" style={{ gap: "clamp(18px,2.5vw,32px)", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {lines.map((it) => (
          <div key={it.id} style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 18, padding: 14, display: "flex", gap: 14, alignItems: "center" }}>
            <div onClick={() => router.push(`/product/${it.id}`)} style={{ cursor: "pointer", flex: "0 0 auto", width: 84, height: 84, borderRadius: 14, overflow: "hidden" }}>
              <ProductImage image={productImage(it)} mode="packshot" name={it.name} kind={it.kind} style={{ objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div onClick={() => router.push(`/product/${it.id}`)} className="dm-serif" style={{ cursor: "pointer", fontWeight: 600, fontSize: 19, color: "#4f3a3e", lineHeight: 1.1 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: "#a98e93", marginBottom: 8 }}>{it.sub}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #e3c3cc", borderRadius: 999, overflow: "hidden", height: 44 }}>
                  <button aria-label="Decrease" onClick={() => setQty(it.id, -1)} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 44, fontSize: 17, color: "#b07c88" }}>−</button>
                  <span style={{ minWidth: 28, textAlign: "center", fontSize: 14, color: "#5a4145" }}>{it.qty}</span>
                  <button aria-label="Increase" onClick={() => setQty(it.id, 1)} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 44, fontSize: 17, color: "#b07c88" }}>+</button>
                </div>
                <button onClick={() => removeFromCart(it.id)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 12.5, color: "#bd8a93", textDecoration: "underline", padding: "10px 14px" }}>Remove</button>
              </div>
            </div>
            <div style={{ flex: "0 0 auto", fontSize: 16, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap" }}>{money(it.price * it.qty)}</div>
          </div>
        ))}
        {freeShipNote ? (
          <div style={{ background: "#faecef", border: "1px dashed #e3b9c1", borderRadius: 14, padding: "13px 18px", fontSize: 13, color: "#8f5360", textAlign: "center" }}>🚚 {freeShipNote}</div>
        ) : null}
      </div>

      <div className="dm-sticky-panel" style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
        <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 24, color: "#5a4145", margin: "0 0 18px" }}>Order Summary</h3>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#7c6065", marginBottom: 11 }}><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#7c6065", marginBottom: 11 }}><span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
        {discount > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#5b9e7a", marginBottom: 11 }}><span>Discount (GLOW10)</span><span>- {money(discount)}</span></div>
        ) : null}
        <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
          <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code (GLOW10)" style={{ flex: 1, minWidth: 0, border: "1px solid #efd9df", background: "#fdf6f4", borderRadius: 999, padding: "11px 16px", fontSize: 13, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }} />
          <button onClick={applyPromo} className="dm-btn-dark" style={{ fontSize: 12.5, padding: "0 18px" }}>{promoApplied ? "Applied" : "Apply"}</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 18, fontWeight: 600, color: "#4f3a3e", paddingTop: 16, borderTop: "1px solid #f0dde1", marginBottom: 20 }}>
          <span>Total</span>
          <span className="dm-serif" style={{ fontSize: 26, color: "#b76e79" }}>{money(total)}</span>
        </div>
        <button onClick={() => router.push("/checkout")} className="dm-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: 16 }}>Checkout</button>
        <button onClick={() => router.push("/shop")} style={{ width: "100%", border: "none", background: "none", cursor: "pointer", color: "#a98e93", fontSize: 13, marginTop: 12 }}>Continue Shopping</button>
      </div>
    </div>
  );
}
