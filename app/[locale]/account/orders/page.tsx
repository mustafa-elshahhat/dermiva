"use client";

import React, { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/store";
import { ORDERS, money } from "@/lib/catalog";
import type { Locale } from "@/i18n/routing";

export default function OrdersPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { loggedIn, hydrated } = useAuth();

  useEffect(() => {
    if (hydrated && !loggedIn) {
      router.push("/login");
    }
  }, [hydrated, loggedIn, router]);

  const statusLabel = (status: string) =>
    status === "delivered" ? t("account.statusDelivered") : status === "shipped" ? t("account.statusShipped") : t("account.statusProcessing");

  if (!hydrated) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#a98e93" }}>
        {t("account.ordersLoading")}
      </div>
    );
  }

  if (!loggedIn) {
    return null; // Let the useEffect redirect
  }

  return (
    <div className="dm-fade" style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>
        <Link href="/account" style={{ textDecoration: "underline" }}>{t("seo.accountTitle")}</Link> / <span style={{ color: "#7c6065" }}>{t("account.ordersBreadcrumb")}</span>
      </div>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>{t("account.ordersTitle")}</h1>

      {ORDERS.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1" }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>📦</div>
          <h3 className="dm-serif" style={{ fontSize: 24, color: "#5a4145", margin: "0 0 8px" }}>{t("account.ordersEmptyTitle")}</h3>
          <p style={{ fontSize: 14, color: "#a98e93", margin: "0 0 20px" }}>{t("account.ordersEmptyText")}</p>
          <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ padding: "12px 30px", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>{t("common.startShopping")}</button>
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
                  <span style={{ fontSize: 12, background: order.status === "delivered" ? "#eef7f2" : "#fbf5ec", color: order.status === "delivered" ? "#388e3c" : "#b08a4e", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>
                    {statusLabel(order.status)}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#a98e93" }}>{t("account.ordersOrderedOn", { date: order.date[locale], count: order.items.reduce((sum, item) => sum + item.qty, 0) })}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ textAlign: "end" }}>
                  <div style={{ fontSize: 12, color: "#a98e93" }}>{t("account.ordersTotalAmount")}</div>
                  <div className="dm-serif" style={{ fontSize: 20, fontWeight: 700, color: "#b76e79" }}>{money(order.total)}</div>
                </div>
                <svg className="dm-rtl-flip" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b07c88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24, textAlign: "center" }}>
        <Link href="/account" className="dm-btn-outline" style={{ display: "inline-block", fontSize: 13, padding: "10px 24px" }}>
          {t("account.backToDashboard")}
        </Link>
      </div>
    </div>
  );
}
