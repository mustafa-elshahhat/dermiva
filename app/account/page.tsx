"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/store";
import { ORDERS, money } from "@/lib/catalog";

export default function AccountPage() {
  const router = useRouter();
  const { loggedIn, userName, userEmail, logout, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !loggedIn) {
      router.push("/login");
    }
  }, [hydrated, loggedIn, router]);

  if (!hydrated) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#a98e93" }}>
        Loading your account...
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="dm-fade" style={{ maxWidth: 480, margin: "60px auto 90px", width: "100%", padding: "0 16px", textAlign: "center" }}>
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 24, padding: 36, boxShadow: "0 12px 30px rgba(184,134,146,.1)" }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🔒</div>
          <h2 className="dm-serif" style={{ fontSize: 28, color: "#5a4145", margin: "0 0 10px" }}>Access Denied</h2>
          <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 24px" }}>Please sign in to view your dashboard.</p>
          <button onClick={() => router.push("/login")} className="dm-btn-primary" style={{ padding: "12px 36px", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 12.5, color: "#a98e93", marginBottom: 6 }}>Welcome back,</div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,5vw,46px)", color: "#5a4145", margin: 0 }}>{userName}</h1>
        </div>
        <button onClick={() => { logout(); router.push("/"); }} className="dm-btn-outline" style={{ fontSize: 13, fontWeight: 500, padding: "10px 22px", border: "1px solid #e3c3cc", color: "#8a7378" }}>Sign Out</button>
      </div>

      <div className="dm-grid-responsive-two-col" style={{ gap: 24 }}>
        {/* Profile Card */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px", borderBottom: "1px solid #f5eef0", paddingBottom: 10 }}>Account Details</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, color: "#7c6065" }}>
            <div>
              <span style={{ display: "block", fontSize: 12, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em" }}>Name</span>
              <strong>{userName}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 12, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em" }}>Email</span>
              <strong>{userEmail}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 12, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em" }}>Location</span>
              <strong>Cairo, Egypt</strong>
            </div>
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <Link href="/account/addresses" className="dm-btn-outline" style={{ display: "block", textAlign: "center", fontSize: 13, padding: "10px 18px", width: "100%" }}>Manage Addresses</Link>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #f5eef0", paddingBottom: 10, marginBottom: 16 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: 0 }}>Recent Orders</h3>
            <Link href="/account/orders" style={{ fontSize: 13, color: "#b76e79", fontWeight: 600, textDecoration: "underline" }}>View All</Link>
          </div>
          
          {ORDERS.length === 0 ? (
            <p style={{ fontSize: 14, color: "#a98e93", margin: "20px 0" }}>You haven&apos;t placed any orders yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ORDERS.slice(0, 2).map((order) => (
                <div
                  key={order.no}
                  onClick={() => router.push(`/account/orders/${order.no}`)}
                  className="dm-order-row"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer" }}
                >
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#4f3a3e" }}>{order.no}</div>
                    <div style={{ fontSize: 12, color: "#a98e93" }}>{order.date}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#b76e79" }}>{money(order.total)}</div>
                    <div style={{ fontSize: 11.5, color: order.status === "Delivered" ? "#5b9e7a" : "#b08a4e", fontWeight: 600 }}>{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
