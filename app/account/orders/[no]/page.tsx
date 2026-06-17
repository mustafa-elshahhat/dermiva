"use client";

import React, { useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import Bottle from "@/components/Bottle";
import { useStore } from "@/lib/store";
import { ORDERS, getProduct, money } from "@/lib/catalog";

export default function OrderDetailPage() {
  const params = useParams<{ no: string }>();
  const router = useRouter();
  const { loggedIn, hydrated } = useStore();

  useEffect(() => {
    if (hydrated && !loggedIn) {
      router.push("/login");
    }
  }, [hydrated, loggedIn, router]);

  if (!hydrated) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#a98e93" }}>
        Loading order details...
      </div>
    );
  }

  if (!loggedIn) {
    return null;
  }

  const order = ORDERS.find((o) => o.no === params.no);
  if (!order) {
    notFound();
  }

  const resolvedItems = order.items
    .map((item) => {
      const prod = getProduct(item.id);
      return prod ? { ...prod, qty: item.qty } : null;
    })
    .filter((it): it is NonNullable<typeof it> => it !== null);

  const subtotal = resolvedItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 40;
  const discount = subtotal + shipping - order.total > 0 ? subtotal + shipping - order.total : 0;

  return (
    <div className="dm-fade" style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>
        <Link href="/account" style={{ textDecoration: "underline" }}>Account</Link> /{" "}
        <Link href="/account/orders" style={{ textDecoration: "underline" }}>Orders</Link> /{" "}
        <span style={{ color: "#7c6065" }}>{order.no}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
        <div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,38px)", color: "#5a4145", margin: 0 }}>Order Details</h1>
          <div style={{ fontSize: 13.5, color: "#a98e93", marginTop: 4 }}>Placed on {order.date}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#a98e93" }}>Status:</span>
          <span style={{ fontSize: 13, background: order.status === "Delivered" ? "#eef7f2" : "#fbf5ec", color: order.status === "Delivered" ? "#388e3c" : "#b08a4e", padding: "4px 12px", borderRadius: 999, fontWeight: 600 }}>
            {order.status}
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 24, alignItems: "start" }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 16px" }}>Order Items</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {resolvedItems.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ flex: "0 0 auto", width: 56, height: 56, background: "linear-gradient(160deg,#fbeef0,#f4dbe2)", borderRadius: 10, padding: 5 }}>
                    <Bottle kind={item.kind} name={item.name} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#a98e93" }}>{item.sub} · Qty {item.qty}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap" }}>{money(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Totals & Delivery Address */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Summary */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 14px" }}>Order Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 8 }}>
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 8 }}>
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : money(shipping)}</span>
            </div>
            {discount > 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#5b9e7a", marginBottom: 8 }}>
                <span>Discount</span>
                <span>- {money(discount)}</span>
              </div>
            ) : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 16, fontWeight: 600, color: "#4f3a3e", paddingTop: 12, borderTop: "1px solid #f0dde1", marginTop: 8 }}>
              <span>Total</span>
              <span className="dm-serif" style={{ fontSize: 22, color: "#b76e79" }}>{money(order.total)}</span>
            </div>
          </div>

          {/* Delivery & Payment details */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 12px" }}>Shipping & Payment</h3>
            <div style={{ fontSize: 14, color: "#7c6065", display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <span style={{ display: "block", fontSize: 11.5, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>Shipping Address</span>
                <strong>12 El Obour Buildings, Floor 14, Heliopolis, Cairo, Egypt</strong>
              </div>
              <div>
                <span style={{ display: "block", fontSize: 11.5, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>Payment Method</span>
                <strong>Cash on Delivery (COD)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
        <Link href="/account/orders" className="dm-btn-outline" style={{ display: "block", fontSize: 13, padding: "10px 24px" }}>
          Back to Orders
        </Link>
        <Link href="/shop" className="dm-btn-primary" style={{ display: "block", fontSize: 13, padding: "11px 24px" }}>
          Shop More
        </Link>
      </div>
    </div>
  );
}
