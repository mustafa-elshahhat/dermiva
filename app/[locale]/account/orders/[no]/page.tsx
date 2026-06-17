"use client";

import React, { useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import ProductImage from "@/components/ProductImage";
import { useAuth } from "@/lib/store";
import { buildOrderVM } from "@/lib/view-models/order.vm";
import type { Locale } from "@/i18n/routing";

export default function OrderDetailPage() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const params = useParams<{ no: string }>();
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
        {t("account.detailLoading")}
      </div>
    );
  }

  if (!loggedIn) {
    return null;
  }

  const order = buildOrderVM(params.no, locale);
  if (!order) {
    notFound();
  }

  return (
    <div className="dm-fade" style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>
        <Link href="/account" style={{ textDecoration: "underline" }}>{t("seo.accountTitle")}</Link> /{" "}
        <Link href="/account/orders" style={{ textDecoration: "underline" }}>{t("account.ordersBreadcrumb")}</Link> /{" "}
        <span style={{ color: "#7c6065" }}>{order.no}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 22 }}>
        <div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,38px)", color: "#5a4145", margin: 0 }}>{t("account.detailTitle")}</h1>
          <div style={{ fontSize: 13.5, color: "#a98e93", marginTop: 4 }}>{t("account.detailPlacedOn", { date: order.dateFormatted })}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#a98e93" }}>{t("account.detailStatusLabel")}</span>
          <span style={{ fontSize: 13, background: order.status === "delivered" ? "#eef7f2" : "#fbf5ec", color: order.status === "delivered" ? "#388e3c" : "#b08a4e", padding: "4px 12px", borderRadius: 999, fontWeight: 600 }}>
            {statusLabel(order.statusKey)}
          </span>
        </div>
      </div>

      <div className="dm-grid-responsive-two-col" style={{ gap: 24, alignItems: "start" }}>
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 16px" }}>{t("account.detailOrderItems")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {order.items.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ flex: "0 0 auto", width: 56, height: 56, borderRadius: 10, overflow: "hidden" }}>
                    <ProductImage image={item.image} mode="packshot" name={item.name} kind={item.kind} style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#a98e93" }}>{item.sub} · {t("account.detailQty", { qty: item.qty })}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#4f3a3e", whiteSpace: "nowrap" }}>{item.lineTotalFormatted}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Totals & Delivery Address */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Summary */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 14px" }}>{t("account.detailSummary")}</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 8 }}>
              <span>{t("common.subtotal")}</span>
              <span>{order.subtotalFormatted}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#7c6065", marginBottom: 8 }}>
              <span>{t("common.shipping")}</span>
              <span>{order.shippingFree ? t("common.free") : order.shippingFormatted}</span>
            </div>
            {order.discount > 0 ? (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "#5b9e7a", marginBottom: 8 }}>
                <span>{t("common.discount")}</span>
                <span>- {order.discountFormatted}</span>
              </div>
            ) : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 16, fontWeight: 600, color: "#4f3a3e", paddingTop: 12, borderTop: "1px solid #f0dde1", marginTop: 8 }}>
              <span>{t("common.total")}</span>
              <span className="dm-serif" style={{ fontSize: 22, color: "#b76e79" }}>{order.totalFormatted}</span>
            </div>
          </div>

          {/* Delivery & Payment details */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 12px" }}>{t("account.detailShippingPayment")}</h3>
            <div style={{ fontSize: 14, color: "#7c6065", display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <span style={{ display: "block", fontSize: 11.5, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{t("account.detailShippingAddress")}</span>
                <strong>{t("account.detailShippingAddressValue")}</strong>
              </div>
              <div>
                <span style={{ display: "block", fontSize: 11.5, color: "#a98e93", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 2 }}>{t("account.detailPaymentMethod")}</span>
                <strong>{t("account.detailPaymentValue")}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
        <Link href="/account/orders" className="dm-btn-outline" style={{ display: "block", fontSize: 13, padding: "10px 24px" }}>
          {t("account.detailBackToOrders")}
        </Link>
        <Link href="/shop" className="dm-btn-primary" style={{ display: "block", fontSize: 13, padding: "11px 24px" }}>
          {t("account.detailShopMore")}
        </Link>
      </div>
    </div>
  );
}
