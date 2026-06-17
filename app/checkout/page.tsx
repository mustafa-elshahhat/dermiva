"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Bottle from "@/components/Bottle";
import { getProduct, money } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { PAYMENT_METHODS, PaymentMethodId } from "@/lib/payments";

interface Form {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  gov: string;
  payment: PaymentMethodId;
}
type Errors = Partial<Record<keyof Form, string>>;

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

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, shipping, discount, total, clearCart, showToast } = useStore();
  const [form, setForm] = useState<Form>({ name: "", email: "", phone: "", address: "", city: "", gov: "", payment: "cod" });
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  const lines = cart.map((c) => ({ ...getProduct(c.id)!, qty: c.qty, id: c.id })).filter((l) => l.name);

  const setField = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const placeOrder = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.gov.trim()) e.gov = "Required";
    if (Object.keys(e).length) {
      setErrors(e);
      showToast("Please complete required fields");
      return;
    }
    setOrderNo("DRM-" + Math.floor(10000 + Math.random() * 89999));
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0 });
  };

  const border = (k: keyof Form) => `1px solid ${errors[k] ? "#e6a3a3" : "#e3c3cc"}`;

  if (placed) {
    return (
      <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ textAlign: "center", padding: "clamp(40px,6vw,72px) 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1", maxWidth: 560, margin: "0 auto" }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg,#e9c98a,#d6a85a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", boxShadow: "0 12px 30px rgba(194,151,79,.4)" }}>
            <span style={{ color: "#fff", fontSize: 42 }}>✓</span>
          </div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,42px)", color: "#5a4145", margin: "0 0 10px" }}>Thank You!</h1>
          <p style={{ fontSize: 15, color: "#7c6065", margin: "0 0 6px" }}>Your order has been placed successfully.</p>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 8px" }}>Order number</p>
          <div className="dm-serif" style={{ fontWeight: 700, fontSize: 24, color: "#b76e79", marginBottom: 24, letterSpacing: ".04em" }}>{orderNo}</div>
          <p style={{ fontSize: 13.5, color: "#a98e93", maxWidth: 380, margin: "0 auto 26px", lineHeight: 1.6 }}>We&apos;ve sent a confirmation to your email. You&apos;ll receive an SMS once your order ships.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => router.push("/")} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>Back to Home</button>
            <button onClick={() => router.push("/shop")} className="dm-btn-outline" style={{ fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>Continue Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>Checkout</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "clamp(18px,2.5vw,32px)", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* customer */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
            <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>Customer Information</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Full Name *" style={{ ...inputBase, border: border("name") }} />
                {errors.name ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.name}</div> : null}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 160px" }}>
                  <input value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="Email *" style={{ ...inputBase, border: border("email") }} />
                  {errors.email ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.email}</div> : null}
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="Phone *" style={{ ...inputBase, border: border("phone") }} />
                  {errors.phone ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.phone}</div> : null}
                </div>
              </div>
            </div>
          </div>

          {/* shipping */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
            <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>Shipping Address</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <input value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="Street Address *" style={{ ...inputBase, border: border("address") }} />
                {errors.address ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.address}</div> : null}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 140px" }}>
                  <input value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder="City *" style={{ ...inputBase, border: border("city") }} />
                  {errors.city ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.city}</div> : null}
                </div>
                <div style={{ flex: "1 1 140px" }}>
                  <input value={form.gov} onChange={(e) => setField("gov", e.target.value)} placeholder="Governorate *" style={{ ...inputBase, border: border("gov") }} />
                  {errors.gov ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 5 }}>{errors.gov}</div> : null}
                </div>
              </div>
            </div>
          </div>

          {/* payment */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
            <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 18px" }}>Payment Method</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PAYMENT_METHODS.map((pm) => {
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
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24, position: "sticky", top: 84 }}>
          <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>Your Order</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16, maxHeight: 230, overflow: "auto" }}>
            {lines.map((it) => (
              <div key={it.id} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ flex: "0 0 auto", width: 48, height: 48, background: "linear-gradient(160deg,#fbeef0,#f4dbe2)", borderRadius: 10, padding: 5, position: "relative" }}>
                  <Bottle kind={it.kind} name={it.name} />
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#c07f8d", color: "#fff", fontSize: 10, minWidth: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{it.qty}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0, fontSize: 13, color: "#5a4145" }}>{it.name}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap" }}>{money(it.price * it.qty)}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 9, paddingTop: 14, borderTop: "1px solid #f0dde1" }}><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 9 }}><span>Shipping</span><span>{shipping === 0 ? "Free" : money(shipping)}</span></div>
          {discount > 0 ? <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#5b9e7a", marginBottom: 9 }}><span>Discount</span><span>- {money(discount)}</span></div> : null}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 16, fontWeight: 600, color: "#4f3a3e", paddingTop: 14, borderTop: "1px solid #f0dde1", marginBottom: 20 }}>
            <span>Total</span>
            <span className="dm-serif" style={{ fontSize: 24, color: "#b76e79" }}>{money(total)}</span>
          </div>
          <button onClick={placeOrder} className="dm-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", padding: 16 }}>Place Order</button>
          <div style={{ textAlign: "center", fontSize: 11.5, color: "#a98e93", marginTop: 12 }}>🔒 Secure checkout · SSL encrypted</div>
        </div>
      </div>
    </div>
  );
}
