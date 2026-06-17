"use client";

import React, { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductImage from "@/components/ProductImage";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { money } from "@/lib/locale/format";
import { buildCartLines } from "@/lib/view-models/cart.vm";
import type { Locale } from "@/i18n/routing";
import { useCartState, useCartActions, usePromo } from "@/lib/store";
import { trackEvent } from "@/lib/analytics/analytics";

export default function CartContent() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const route = usePathname();
  const router = useRouter();
  const { cart, subtotal, shipping, discount, total, hydrated } = useCartState();
  const { setQty, removeFromCart } = useCartActions();
  const { promo, promoApplied, setPromo, applyPromo } = usePromo();

  const lines = buildCartLines(cart, locale);
  const freeShipNote = subtotal > 0 && subtotal < 500 ? t("cart.freeShippingHint", { amount: money(500 - subtotal) }) : "";
  const trackedCartView = useRef(false);

  useEffect(() => {
    if (!hydrated || trackedCartView.current) return;
    trackedCartView.current = true;
    trackEvent("cart_view", { locale, route, cartValue: total, itemCount: cart.length, currency: "EGP", status: cart.length === 0 ? "empty" : undefined });
  }, [cart.length, hydrated, locale, route, total]);

  // Wait for persisted cart to load before deciding between items / empty state,
  // otherwise a saved cart briefly renders as "empty" right after a refresh.
  if (!hydrated) {
    return (
      <div className="dm-grid-responsive-two-col" style={{ gap: "clamp(18px,2.5vw,32px)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }} aria-busy="true" aria-label={t("cart.loading")}>
          {[0, 1].map((i) => (
            <div key={i} className="dm-skeleton" style={{ height: 112, borderRadius: 18 }} />
          ))}
        </div>
        <div className="dm-skeleton" style={{ height: 320, borderRadius: 20 }} />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1" }}>
        <div aria-hidden="true" style={{ fontSize: 54, marginBottom: 14 }}>🛒</div>
        <h2 className="dm-serif" style={{ fontSize: 28, color: "#5a4145", margin: "0 0 8px" }}>{t("cart.emptyTitle")}</h2>
        <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 24px" }}>{t("cart.emptyText")}</p>
        <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px" }}>{t("common.startShopping")}</button>
      </div>
    );
  }

  return (
    <div className="dm-grid-responsive-two-col" style={{ gap: "clamp(18px,2.5vw,32px)", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {lines.map((it) => (
          <div key={it.id} style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 18, padding: 14, display: "flex", gap: 14, alignItems: "center" }}>
            <Link href={it.href} aria-label={it.name} style={{ flex: "0 0 auto", width: 84, height: 84, borderRadius: 14, overflow: "hidden" }}>
              <ProductImage image={it.image} mode="packshot" name={it.name} kind={it.kind} style={{ objectFit: "cover" }} />
            </Link>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link href={it.href} className="dm-serif" style={{ fontWeight: 600, fontSize: 19, color: "#4f3a3e", lineHeight: 1.1 }}>{it.name}</Link>
              <div style={{ fontSize: 12, color: "#a98e93", marginBottom: 8 }}>{it.sub}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <div aria-label={`${it.name} quantity`} style={{ display: "flex", alignItems: "center", border: "1px solid #e3c3cc", borderRadius: 999, overflow: "hidden", height: 44 }}>
                  <button type="button" aria-label={`${t("common.decrease")} ${it.name}`} onClick={() => setQty(it.id, -1)} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 44, fontSize: 17, color: "#b07c88" }}>−</button>
                  <span aria-live="polite" style={{ minWidth: 28, textAlign: "center", fontSize: 14, color: "#5a4145" }}>{it.qty}</span>
                  <button type="button" aria-label={`${t("common.increase")} ${it.name}`} onClick={() => setQty(it.id, 1)} style={{ border: "none", background: "none", cursor: "pointer", width: 44, height: 44, fontSize: 17, color: "#b07c88" }}>+</button>
                </div>
                <button type="button" aria-label={`${t("common.remove")} ${it.name}`} onClick={() => { removeFromCart(it.id); trackEvent("remove_from_cart", { locale, route, productId: it.id, price: it.price, currency: "EGP", itemCount: it.qty, cartValue: total }); }} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 12.5, color: "#a75f6c", textDecoration: "underline", padding: "10px 14px" }}>{t("common.remove")}</button>
              </div>
            </div>
            <div style={{ flex: "0 0 auto", fontSize: 16, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap" }}>{it.lineTotalFormatted}</div>
          </div>
        ))}
        {freeShipNote ? (
          <div style={{ background: "#faecef", border: "1px dashed #e3b9c1", borderRadius: 14, padding: "13px 18px", fontSize: 13, color: "#8f5360", textAlign: "center" }}>🚚 {freeShipNote}</div>
        ) : null}
      </div>

      <div className="dm-sticky-panel" style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
        <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 24, color: "#5a4145", margin: "0 0 18px" }}>{t("cart.orderSummary")}</h3>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#7c6065", marginBottom: 11 }}><span>{t("common.subtotal")}</span><span>{money(subtotal)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#7c6065", marginBottom: 11 }}><span>{t("common.shipping")}</span><span>{shipping === 0 ? t("common.free") : money(shipping)}</span></div>
        {discount > 0 ? (
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#5b9e7a", marginBottom: 11 }}><span>{t("cart.discountLabel")}</span><span>- {money(discount)}</span></div>
        ) : null}
        <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
          <label htmlFor="cart-promo" className="sr-only">{t("cart.promoPlaceholder")}</label>
          <input id="cart-promo" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder={t("cart.promoPlaceholder")} style={{ flex: 1, minWidth: 0, border: "1px solid #efd9df", background: "#fdf6f4", borderRadius: 999, padding: "11px 16px", fontSize: 13, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }} />
          <button type="button" onClick={applyPromo} className="dm-btn-dark" style={{ fontSize: 12.5, padding: "0 18px" }}>{promoApplied ? t("common.applied") : t("common.apply")}</button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 18, fontWeight: 600, color: "#4f3a3e", paddingTop: 16, borderTop: "1px solid #f0dde1", marginBottom: 20 }}>
          <span>{t("common.total")}</span>
          <span className="dm-serif" style={{ fontSize: 26, color: "#b76e79" }}>{money(total)}</span>
        </div>
        <button onClick={() => router.push("/checkout")} className="dm-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: 16 }}>{t("cart.checkout")}</button>
        <button onClick={() => router.push("/shop")} style={{ width: "100%", border: "none", background: "none", cursor: "pointer", color: "#a98e93", fontSize: 13, marginTop: 12 }}>{t("common.continueShopping")}</button>
      </div>
    </div>
  );
}
