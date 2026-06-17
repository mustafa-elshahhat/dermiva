"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { ORDERS, money } from "@/lib/catalog";

export default function OrdersPage() {
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
        Loading your orders...
      </div>
    );
  }

  if (!loggedIn) {
    return null; // Let the useEffect redirect
  }

  return (
    <div className="dm-fade" style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>
        <Link href="/account" style={{ textDecoration: "underline" }}>Account</Link> / <span style={{ color: "#7c6065" }}>Orders</span>
      </div>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>Order History</h1>

      {ORDERS.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1" }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>📦</div>
          <h3 className="dm-serif" style={{ fontSize: 24, color: "#5a4145", margin: "0 0 8px" }}>No orders found</h3>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>You haven&apos;t placed any orders with us yet.</p>
          <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ padding: "12px 30px", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>Start Shopping</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ORDERS.map((order) => (
            <div
              key={order.no}
              onClick={() => router.push(`/account/orders/${order.no}`)}
              className="dm-order-row"
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", padding: 20, gap: 16 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "#4f3a3e" }}>{order.no}</span>
                  <span style={{ fontSize: 12, background: order.status === "Delivered" ? "#eef7f2" : "#fbf5ec", color: order.status === "Delivered" ? "#388e3c" : "#b08a4e", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#a98e93" }}>Ordered on {order.date} · {order.items.reduce((sum, item) => sum + item.qty, 0)} items</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "#a98e93" }}>Total amount</div>
                  <div className="dm-serif" style={{ fontSize: 20, fontWeight: 700, color: "#b76e79" }}>{money(order.total)}</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b07c88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Link href="/account" className="dm-btn-outline" style={{ display: "inline-block", fontSize: 13, padding: "10px 24px" }}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
