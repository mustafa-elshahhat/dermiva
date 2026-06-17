import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getProducts } from "@/lib/api/catalog.service";
import ShopContent from "./ShopContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("shopTitle"), description: t("shopDescription") };
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations();

  const result = await getProducts(locale);
  const products = result.ok ? result.data : [];

  return (
    <div className="dm-fade" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>{t("common.home")} / <span style={{ color: "#7c6065" }}>{t("shop.breadcrumbCurrent")}</span></div>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>{t("shop.title")}</h1>
      <ShopContent products={products} />
    </div>
  );
}
