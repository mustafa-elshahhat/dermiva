"use client";

import React, { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Bottle from "@/components/Bottle";
import ProductGrid from "@/components/ProductGrid";
import { RawIcon, TRUST_ICONS } from "@/components/icons";
import { CONTENT, PRODUCTS, galleryKinds, getProduct, money } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const TRUST = [
  { icon: TRUST_ICONS.pay, title: "Secure Payment", sub: "SSL protected" },
  { icon: TRUST_ICONS.ship, title: "Fast Delivery", sub: "2-4 days" },
  { icon: TRUST_ICONS.auth, title: "100% Authentic", sub: "Genuine products" },
];

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { wishlist, addToCart, toggleWishlist } = useStore();
  const [qty, setQty] = useState(1);

  const product = getProduct(params.id);
  if (!product) {
    notFound();
  }
  const p = product!;
  const content = CONTENT[p.cat];
  const wished = wishlist.includes(p.id);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);

  return (
    <div className="dm-fade" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 18, fontSize: 12.5, color: "#a98e93" }}>Home / Shop / <span style={{ color: "#7c6065" }}>{p.name}</span></div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(24px,3vw,44px)", alignItems: "start" }}>
        {/* gallery */}
        <div style={{ position: "sticky", top: 84 }}>
          <div style={{ background: "radial-gradient(120% 120% at 70% 20%,#fbeef0,#f3d9e0 70%,#edccd5)", borderRadius: 24, aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", padding: "10%", position: "relative" }}>
            {p.tag ? (
              <div style={{ position: "absolute", top: 18, left: 18, background: "linear-gradient(135deg,#d9a24f,#c2974f)", color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 }}>{p.tag}</div>
            ) : null}
            <div style={{ width: "60%", height: "80%" }}><Bottle kind={p.kind} name={p.name} /></div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {galleryKinds(p.kind).map((gk, i) => (
              <div key={i} style={{ flex: 1, aspectRatio: "1/1", background: "linear-gradient(160deg,#fbeef0,#f4dbe2)", borderRadius: 14, border: "1px solid #f0dde1", padding: "12%" }}>
                <Bottle kind={gk} name={p.name} />
              </div>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,48px)", color: "#5a4145", margin: "0 0 6px", lineHeight: 1.02 }}>{p.name}</h1>
          <div style={{ fontSize: 14, color: "#a98e93", marginBottom: 12 }}>{p.sub}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ color: "#d9a24f", fontSize: 17 }}>★★★★★</span>
            <span style={{ fontSize: 14, color: "#7c6468" }}>{p.rating} ({p.reviews} reviews)</span>
          </div>
          <div className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,40px)", color: "#b76e79", marginBottom: 18 }}>{money(p.price)}</div>
          <p style={{ fontSize: 15.5, color: "#7c6065", lineHeight: 1.65, margin: "0 0 22px", maxWidth: 480 }}>{content.desc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            {content.benefits.map((b) => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 7, background: "#faecef", border: "1px solid #f0dde1", borderRadius: 999, padding: "8px 15px", fontSize: 13, color: "#8f5360" }}>
                <span style={{ color: "#c2974f" }}>✓</span>
                {b}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", border: "1px solid #e3c3cc", borderRadius: 999, background: "#fff", overflow: "hidden" }}>
              <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 46, fontSize: 20, color: "#b07c88" }}>−</button>
              <span style={{ minWidth: 36, textAlign: "center", fontSize: 16, color: "#5a4145", fontWeight: 500 }}>{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 46, fontSize: 20, color: "#b07c88" }}>+</button>
            </div>
            <button onClick={() => toggleWishlist(p.id)} style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${wished ? "#c07f8d" : "#e3c3cc"}`, background: wished ? "#faecef" : "#fff", cursor: "pointer", borderRadius: 999, height: 46, padding: "0 20px", fontSize: 14, color: "#8f5360", fontFamily: "var(--font-jost),sans-serif" }}>
              <span style={{ color: "#c97f8d", fontSize: 16 }}>{wished ? "♥" : "♡"}</span> {wished ? "Saved" : "Save"}
            </button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
            <button onClick={() => addToCart(p.id, qty)} className="dm-btn-outline" style={{ flex: "1 1 180px", fontSize: 14, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "16px 24px" }}>Add to Cart</button>
            <button onClick={() => { addToCart(p.id, qty); router.push("/checkout"); }} className="dm-btn-primary" style={{ flex: "1 1 180px", fontSize: 14, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "16px 24px" }}>Buy Now</button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, padding: "16px 0", borderTop: "1px solid #f0dde1", borderBottom: "1px solid #f0dde1", marginBottom: 24 }}>
            {TRUST.map((t) => (
              <div key={t.title} style={{ flex: "1 1 120px", display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#faecef", display: "flex", alignItems: "center", justifyContent: "center", color: "#c2974f" }}>
                  <RawIcon svg={t.icon} />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#5a4145", lineHeight: 1.2 }}>{t.title}</div>
                  <div style={{ fontSize: 11, color: "#a98e93", lineHeight: 1.2 }}>{t.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ borderTop: "1px solid #f0dde1", padding: "16px 0" }}>
              <div className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", marginBottom: 8 }}>Ingredients</div>
              <p style={{ fontSize: 14, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{content.ingredients.join(", ")}</p>
            </div>
            <div style={{ borderTop: "1px solid #f0dde1", padding: "16px 0" }}>
              <div className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", marginBottom: 8 }}>How to Use</div>
              <p style={{ fontSize: 14, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{content.howto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      <div style={{ marginTop: "clamp(40px,5vw,60px)" }}>
        <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(26px,3.5vw,38px)", color: "#5a4145", margin: "0 0 24px", textAlign: "center" }}>You May Also Like</h2>
        <ProductGrid products={related} />
      </div>
    </div>
  );
}
