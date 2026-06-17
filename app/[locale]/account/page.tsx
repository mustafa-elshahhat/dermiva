"use client";

import React, { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/store";
import { buildOrderVMs } from "@/lib/view-models/order.vm";
import type { Locale } from "@/i18n/routing";

export default function AccountPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const { loggedIn, userName, userEmail, logout, hydrated } = useAuth();
  const orders = buildOrderVMs(locale);

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
        {t("account.loading")}
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="dm-fade" style={{ maxWidth: 480, margin: "60px auto 90px", width: "100%", padding: "0 16px", textAlign: "center" }}>
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 24, padding: 36, boxShadow: "0 12px 30px rgba(184,134,146,.1)" }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>🔒</div>
          <h2 className="dm-serif" style={{ fontSize: 28, color: "#5a4145", margin: "0 0 10px" }}>{t("account.accessDeniedTitle")}</h2>
          <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 24px" }}>{t("account.accessDeniedText")}</p>
          <button onClick={() => router.push("/login")} className="dm-btn-primary" style={{ padding: "12px 36px", fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase" }}>{t("account.signIn")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 12.5, color: "#a98e93", marginBottom: 6 }}>{t("account.welcomeBack")}</div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,5vw,46px)", color: "#5a4145", margin: 0 }}>{userName}</h1>
        </div>
        <button onClick={() => { logout(); router.push("/"); }} className="dm-btn-outline" style={{ fontSize: 13, fontWeight: 500, padding: "10px 22px", border: "1px solid #e3c3cc", color: "#8a7378" }}>{t("account.signOut")}</button>
      </div>

      <div className="dm-grid-responsive-two-col" style={{ gap: 24 }}>
        {/* Profile Card */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px", borderBottom: "1px solid #f5eef0", paddingBottom: 10 }}>{t("account.accountDetails")}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14.5, color: "#7c6065" }}>
            <div>
              <span style={{ display: "block", fontSize: 12, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em" }}>{t("account.name")}</span>
              <strong>{userName}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 12, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em" }}>{t("account.email")}</span>
              <strong>{userEmail}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: 12, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em" }}>{t("account.location")}</span>
              <strong>{t("account.locationValue")}</strong>
            </div>
          </div>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <Link href="/account/addresses" className="dm-btn-outline" style={{ display: "block", textAlign: "center", fontSize: 13, padding: "10px 18px", width: "100%" }}>{t("account.manageAddresses")}</Link>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid #f5eef0", paddingBottom: 10, marginBottom: 16 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: 0 }}>{t("account.recentOrders")}</h3>
            <Link href="/account/orders" style={{ fontSize: 13, color: "#b76e79", fontWeight: 600, textDecoration: "underline" }}>{t("common.viewAll")}</Link>
          </div>

          {orders.length === 0 ? (
            <p style={{ fontSize: 14, color: "#a98e93", margin: "20px 0" }}>{t("account.noOrders")}</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {orders.slice(0, 2).map((order) => (
                <div
                  key={order.no}
                  onClick={() => router.push(`/account/orders/${order.no}`)}
                  className="dm-order-row"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", cursor: "pointer" }}
                >
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#4f3a3e" }}>{order.no}</div>
                    <div style={{ fontSize: 12, color: "#a98e93" }}>{order.dateFormatted}</div>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "#b76e79" }}>{order.totalFormatted}</div>
                    <div style={{ fontSize: 11.5, color: order.status === "delivered" ? "#5b9e7a" : "#b08a4e", fontWeight: 600 }}>{statusLabel(order.statusKey)}</div>
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
