import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";
import { RawIcon, TRUST_ICONS } from "@/components/icons";
import { getAllProducts } from "@/lib/mock/catalog.mock";
import { getProductById, getCategoryByKey, getRelatedProducts } from "@/lib/api/catalog.service";
import { buildProductMetadata } from "@/lib/seo/metadata";
import { buildNoIndexRobots } from "@/lib/seo/robots";
import { formatList } from "@/lib/locale/format";
import type { Locale } from "@/i18n/routing";
import ProductActions from "./ProductActions";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale: localeParam, id } = await params;
  const locale = localeParam as Locale;
  const result = await getProductById(id, locale);
  // Missing product: safe noindex; the page itself calls notFound().
  if (!result.ok) return { robots: buildNoIndexRobots() };
  const p = result.data;
  const t = await getTranslations({ locale, namespace: "seo" });
  // Product name stays English in both locales; the description is localized.
  return buildProductMetadata({
    locale,
    product: p,
    description: t("productDescription", { name: p.name }),
    ogAlt: t("ogAlt"),
  });
}

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { locale: localeParam, id } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const result = await getProductById(id, locale);

  if (!result.ok) {
    notFound();
  }

  const p = result.data;
  const t = await getTranslations();
  const categoryResult = await getCategoryByKey(p.categoryKey, locale);
  const content = categoryResult.ok
    ? categoryResult.data.content
    : { desc: "", benefits: [] as string[], ingredients: [] as string[], howto: "" };
  const relatedResult = await getRelatedProducts(p.categoryKey, p.id, locale);
  const related = relatedResult.ok ? relatedResult.data : [];
  const name = p.name;
  const tagLabel = p.tag === "best-seller" ? t("common.tagBestSeller") : p.tag === "new" ? t("common.tagNew") : "";

  const TRUST = [
    { icon: TRUST_ICONS.pay, title: t("product.trustPayTitle"), sub: t("product.trustPaySub") },
    { icon: TRUST_ICONS.ship, title: t("product.trustShipTitle"), sub: t("product.trustShipSub") },
    { icon: TRUST_ICONS.auth, title: t("product.trustAuthTitle"), sub: t("product.trustAuthSub") },
  ];

  return (
    <div className="dm-fade" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 18, fontSize: 12.5, color: "#a98e93" }}>{t("common.home")} / {t("common.shop")} / <span style={{ color: "#7c6065" }}>{name}</span></div>

      <div className="dm-grid-responsive-two-col" style={{ gap: "clamp(24px,3vw,44px)", alignItems: "start" }}>
        {/* gallery */}
        <div className="dm-sticky-panel">
          <div style={{ borderRadius: 24, aspectRatio: "1/1", overflow: "hidden", position: "relative" }}>
            {tagLabel ? (
              <div style={{ position: "absolute", top: 18, insetInlineStart: 18, background: "linear-gradient(135deg,#d9a24f,#c2974f)", color: "#fff", fontSize: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "6px 14px", borderRadius: 999, zIndex: 10 }}>{tagLabel}</div>
            ) : null}
            <ProductImage image={p.image} mode="packshot" name={name} kind={p.kind} style={{ objectFit: "cover" }} />
          </div>
        </div>

        {/* info */}
        <div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,48px)", color: "#5a4145", margin: "0 0 6px", lineHeight: 1.02 }}>{name}</h1>
          <div style={{ fontSize: 14, color: "#a98e93", marginBottom: 12 }}>{p.sub}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ color: "#d9a24f", fontSize: 17 }}>★★★★★</span>
            <span style={{ fontSize: 14, color: "#7c6468" }}>{p.rating} ({t("product.reviewsCount", { count: p.reviews })})</span>
          </div>
          <div className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,40px)", color: "#b76e79", marginBottom: 18 }}>{p.priceFormatted}</div>
          <p style={{ fontSize: 15.5, color: "#7c6065", lineHeight: 1.65, margin: "0 0 22px", maxWidth: 480 }}>{content.desc}</p>

          <div className="dm-product-benefits-container">
            {content.benefits.map((b) => (
              <div key={b} className="dm-product-benefit-badge">
                <span className="dm-product-benefit-check">✓</span>
                {b}
              </div>
            ))}
          </div>

          <ProductActions productId={p.id} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, padding: "16px 0", borderTop: "1px solid #f0dde1", borderBottom: "1px solid #f0dde1", marginBottom: 24 }}>
            {TRUST.map((tr) => (
              <div key={tr.title} style={{ flex: "1 1 120px", display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#faecef", display: "flex", alignItems: "center", justifyContent: "center", color: "#c2974f" }}>
                  <RawIcon svg={tr.icon} />
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "#5a4145", lineHeight: 1.2 }}>{tr.title}</div>
                  <div style={{ fontSize: 11, color: "#a98e93", lineHeight: 1.2 }}>{tr.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ borderTop: "1px solid #f0dde1", padding: "16px 0" }}>
              <div className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", marginBottom: 8 }}>{t("product.ingredients")}</div>
              <p style={{ fontSize: 14, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{formatList(content.ingredients, locale)}</p>
            </div>
            <div style={{ borderTop: "1px solid #f0dde1", padding: "16px 0" }}>
              <div className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", marginBottom: 8 }}>{t("product.howToUse")}</div>
              <p style={{ fontSize: 14, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{content.howto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      <div style={{ marginTop: "clamp(40px,5vw,60px)" }}>
        <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(26px,3.5vw,38px)", color: "#5a4145", margin: "0 0 24px", textAlign: "center" }}>{t("product.relatedTitle")}</h2>
        <ProductGrid products={related} />
      </div>
    </div>
  );
}
