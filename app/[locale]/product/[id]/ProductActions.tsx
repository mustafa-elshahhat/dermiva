"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useWishlist, useCartActions } from "@/lib/store";

export default function ProductActions({ productId }: { productId: string }) {
  const t = useTranslations();
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCartActions();
  const wished = wishlist.includes(productId);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", border: "1px solid #e3c3cc", borderRadius: 999, background: "#fff", overflow: "hidden" }}>
          <button aria-label={t("common.decreaseQty")} onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 46, fontSize: 20, color: "#b07c88" }}>−</button>
          <span style={{ minWidth: 36, textAlign: "center", fontSize: 16, color: "#5a4145", fontWeight: 500 }}>{qty}</span>
          <button aria-label={t("common.increaseQty")} onClick={() => setQty((q) => q + 1)} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 46, fontSize: 20, color: "#b07c88" }}>+</button>
        </div>
        <button onClick={() => toggleWishlist(productId)} style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${wished ? "#c07f8d" : "#e3c3cc"}`, background: wished ? "#faecef" : "#fff", cursor: "pointer", borderRadius: 999, height: 46, padding: "0 20px", fontSize: 14, color: "#8f5360", fontFamily: "var(--font-jost),sans-serif" }}>
          <span style={{ color: "#c97f8d", fontSize: 16 }}>{wished ? "♥" : "♡"}</span> {wished ? t("product.saved") : t("product.save")}
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
        <button onClick={() => addToCart(productId, qty)} className="dm-btn-outline" style={{ flex: "1 1 180px", fontSize: 14, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "16px 24px" }}>{t("product.addToCart")}</button>
        <button onClick={() => { addToCart(productId, qty); router.push("/checkout"); }} className="dm-btn-primary" style={{ flex: "1 1 180px", fontSize: 14, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "16px 24px" }}>{t("product.buyNow")}</button>
      </div>
    </>
  );
}
