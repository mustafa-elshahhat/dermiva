"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import ProductImage from "@/components/ProductImage";
import { useRouter } from "@/i18n/navigation";
import { money } from "@/lib/locale/format";
import { buildCartLines } from "@/lib/view-models/cart.vm";
import { getPaymentMethodVMs, toCheckoutRequest } from "@/lib/view-models/checkout.vm";
import { createCheckout } from "@/lib/api/checkout.service";
import type { Locale } from "@/i18n/routing";
import type { CheckoutForm } from "@/lib/types/checkout";
import { useCartState, useCartActions, useToast } from "@/lib/store";

type Errors = Partial<Record<keyof CheckoutForm, string>>;

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "#fdf6f4",
  borderRadius: 12,
  padding: "13px 16px",
  fontSize: 14,
  fontFamily: "var(--font-jost),sans-serif",
  color: "#5a4145",
  boxSizing: "border-box",
};

export default function CheckoutContent() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { cart, subtotal, shipping, discount, total, hydrated } = useCartState();
  const { clearCart } = useCartActions();
  const { showToast } = useToast();

  const [form, setForm] = useState<CheckoutForm>({ name: "", email: "", phone: "", address: "", city: "", gov: "", payment: "cod" });
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  const lines = buildCartLines(cart, locale);
  const paymentMethods = getPaymentMethodVMs(locale);

  const setField = (k: keyof CheckoutForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const placeOrder = async () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t("checkout.required");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t("checkout.validEmail");
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) e.phone = t("checkout.validPhone");
    if (!form.address.trim()) e.address = t("checkout.required");
    if (!form.city.trim()) e.city = t("checkout.required");
    if (!form.gov.trim()) e.gov = t("checkout.required");
    if (Object.keys(e).length) {
      setErrors(e);
      showToast("completeRequiredFields");
      return;
    }
    // Frontend-only mock checkout: no real payment is taken.
    const result = await createCheckout(toCheckoutRequest(form, cart), locale);
    if (!result.ok) return;
    setOrderNo(result.data.orderNumber);
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0 });
  };

  const border = (k: keyof CheckoutForm) => `1px solid ${errors[k] ? "#e6a3a3" : "#e3c3cc"}`;

  // Don't render the order summary from un-hydrated cart state — wait for the
  // persisted cart so totals/line items don't flicker after a refresh.
  if (!hydrated) {
    return (
      <div className="dm-grid-responsive-two-col" style={{ gap: "clamp(18px,2.5vw,32px)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }} aria-busy="true" aria-label={t("checkout.loading")}>
          <div className="dm-skeleton" style={{ height: 180, borderRadius: 20 }} />
          <div className="dm-skeleton" style={{ height: 180, borderRadius: 20 }} />
          <div className="dm-skeleton" style={{ height: 220, borderRadius: 20 }} />
        </div>
        <div className="dm-skeleton" style={{ height: 360, borderRadius: 20 }} />
      </div>
    );
  }

  if (placed) {
    return (
      <div style={{ textAlign: "center", padding: "clamp(40px,6vw,72px) 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1", maxWidth: 560, margin: "0 auto" }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#e9c98a,#d6a85a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", boxShadow: "0 12px 30px rgba(194,151,79,.4)" }}>
          <span style={{ color: "#fff", fontSize: 42 }}>✓</span>
        </div>
        <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,42px)", color: "#5a4145", margin: "0 0 10px" }}>{t("checkout.thankYouTitle")}</h1>
        <p style={{ fontSize: 15, color: "#7c6065", margin: "0 0 6px" }}>{t("checkout.thankYouText")}</p>
        <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 8px" }}>{t("checkout.orderNumber")}</p>
        <div className="dm-serif" style={{ fontWeight: 700, fontSize: 24, color: "#b76e79", marginBottom: 24, letterSpacing: ".04em" }}>{orderNo}</div>
        <p style={{ fontSize: 13.5, color: "#a98e93", maxWidth: 380, margin: "0 auto 26px", lineHeight: 1.6 }}>{t("checkout.thankYouConfirm")}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => router.push("/")} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>{t("common.backToHome")}</button>
          <button onClick={() => router.push("/shop")} className="dm-btn-outline" style={{ fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>{t("common.continueShopping")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dm-grid-responsive-two-col" style={{ gap: "clamp(18px,2.5vw,32px)", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* customer */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>{t("checkout.customerInfo")}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="checkout-name" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("checkout.fullName")} *</label>
              <input id="checkout-name" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder={`${t("checkout.fullName")} *`} style={{ ...inputBase, border: border("name") }} />
              {errors.name ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.name}</div> : null}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="checkout-email" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("checkout.email")} *</label>
                <input id="checkout-email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder={`${t("checkout.email")} *`} style={{ ...inputBase, border: border("email") }} />
                {errors.email ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.email}</div> : null}
              </div>
              <div style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="checkout-phone" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("checkout.phone")} *</label>
                <input id="checkout-phone" value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder={`${t("checkout.phone")} *`} style={{ ...inputBase, border: border("phone") }} />
                {errors.phone ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.phone}</div> : null}
              </div>
            </div>
          </div>
        </div>

        {/* shipping */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>{t("checkout.shippingAddress")}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <label htmlFor="checkout-address" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("checkout.streetAddress")} *</label>
              <input id="checkout-address" value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder={`${t("checkout.streetAddress")} *`} style={{ ...inputBase, border: border("address") }} />
              {errors.address ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.address}</div> : null}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="checkout-city" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("checkout.city")} *</label>
                <input id="checkout-city" value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder={`${t("checkout.city")} *`} style={{ ...inputBase, border: border("city") }} />
                {errors.city ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.city}</div> : null}
              </div>
              <div style={{ flex: "1 1 140px", display: "flex", flexDirection: "column", gap: 4 }}>
                <label htmlFor="checkout-gov" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("checkout.governorate")} *</label>
                <input id="checkout-gov" value={form.gov} onChange={(e) => setField("gov", e.target.value)} placeholder={`${t("checkout.governorate")} *`} style={{ ...inputBase, border: border("gov") }} />
                {errors.gov ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.gov}</div> : null}
              </div>
            </div>
          </div>
        </div>

        {/* payment */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>{t("checkout.paymentMethod")}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {paymentMethods.map((pm) => {
              const active = form.payment === pm.id;
              return (
                <div
                  key={pm.id}
                  onClick={() => setField("payment", pm.id)}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    border: `1.5px solid ${active ? "#c07f8d" : "#f0dde1"}`,
                    background: active ? "#faecef" : "#fff",
                    borderRadius: 14,
                    padding: "14px 18px",
                    transition: "border-color .2s, background .2s, box-shadow .2s",
                    boxShadow: active ? "0 2px 12px rgba(192,127,141,.15)" : "none",
                  }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${active ? "#c07f8d" : "#d8c3c8"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {active ? <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#c07f8d" }} /> : null}
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fdf6f4", border: "1px solid #f0dde1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", padding: 4 }}>
                    <Image
                      src={pm.image}
                      alt={pm.label}
                      width={32}
                      height={32}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#5a4145" }}>{pm.label}</div>
                    <div style={{ fontSize: 12, color: "#a98e93" }}>{pm.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* summary */}
      <div className="dm-sticky-panel" style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
        <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>{t("checkout.yourOrder")}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, maxHeight: 230, overflow: "auto" }}>
          {lines.map((it) => (
            <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ flex: "0 0 auto", width: 48, height: 48, borderRadius: 10, position: "relative" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: 10, overflow: "hidden" }}>
                  <ProductImage image={it.image} mode="packshot" name={it.name} kind={it.kind} style={{ objectFit: "cover" }} />
                </div>
                <span style={{ position: "absolute", top: -6, insetInlineEnd: -6, background: "#c07f8d", color: "#fff", fontSize: 10, minWidth: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{it.qty}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 13, color: "#5a4145" }}>{it.name}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap" }}>{it.lineTotalFormatted}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 9, paddingTop: 14, borderTop: "1px solid #f0dde1" }}><span>{t("common.subtotal")}</span><span>{money(subtotal)}</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 9 }}><span>{t("common.shipping")}</span><span>{shipping === 0 ? t("common.free") : money(shipping)}</span></div>
        {discount > 0 ? <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#5b9e7a", marginBottom: 9 }}><span>{t("common.discount")}</span><span>- {money(discount)}</span></div> : null}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 16, fontWeight: 600, color: "#4f3a3e", paddingTop: 14, borderTop: "1px solid #f0dde1", marginBottom: 20 }}>
          <span>{t("common.total")}</span>
          <span className="dm-serif" style={{ fontSize: 24, color: "#b76e79" }}>{money(total)}</span>
        </div>
        <button onClick={placeOrder} className="dm-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: 16 }}>{t("checkout.placeOrder")}</button>
        <div style={{ textAlign: "center", fontSize: 11.5, color: "#a98e93", marginTop: 12 }}>🔒 {t("checkout.secureNote")}</div>
      </div>
    </div>
  );
}
