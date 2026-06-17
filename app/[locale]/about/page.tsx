import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { JsonLdScript } from "@/lib/seo/structured-data-script";
import { buildAboutPageJsonLd, buildBreadcrumbListJsonLd } from "@/lib/seo/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: routes.about(),
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    index: true,
    ogAlt: t("ogAlt"),
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");
  const tNav = await getTranslations("nav");
  const pageName = `${t("titleLine1")} ${t("titleLine2")}`;
  const pageJsonLd = [
    buildBreadcrumbListJsonLd(locale, [
      { name: tCommon("home"), path: routes.home() },
      { name: tNav("about"), path: routes.about() },
    ]),
    buildAboutPageJsonLd({
      locale,
      name: pageName,
      description: t("intro"),
    }),
  ];

  return (
    <>
      <JsonLdScript data={pageJsonLd} />
      <div className="dm-fade">
      {/* Hero Header */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) 0" }}>
        <div style={{ background: "radial-gradient(120% 120% at 50% 20%,#fbe2e7,#f2c9d2 60%,#eec1cd)", borderRadius: 28, padding: "clamp(36px,6vw,72px) clamp(20px,5vw,56px)", textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#b07c88", fontWeight: 600, marginBottom: 12 }}>{t("eyebrow")}</div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(36px,5.5vw,56px)", color: "#9a5d6a", margin: "0 0 16px", lineHeight: 1.05 }}>
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>
          <p style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "#7c6065", maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.6 }}>
            {t("intro")}
          </p>
          <Link href="/shop" className="dm-btn-primary" style={{ display: "inline-block", padding: "14px 38px", fontSize: 14, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", textAlign: "center" }}>{t("shopCollection")}</Link>
        </div>
      </section>

      {/* Narrative Section */}
      <section style={{ maxWidth: 1000, margin: "0 auto", width: "100%", padding: "clamp(40px,5vw,64px) clamp(16px,4vw,40px)" }}>
        <div className="dm-grid-responsive-two-col" style={{ gap: 36, alignItems: "center" }}>
          <div style={{ height: "clamp(280px,36vw,400px)", borderRadius: 24, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/our-story.webp"
              alt={t("storyImageAlt")}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            />
          </div>
          <div>
            <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,3.5vw,38px)", color: "#5a4145", margin: "0 0 16px" }}>{t("storyTitle")}</h2>
            <p style={{ fontSize: 15, color: "#7c6065", lineHeight: 1.65, marginBottom: 16 }}>
              {t("storyP1")}
            </p>
            <p style={{ fontSize: 15, color: "#7c6065", lineHeight: 1.65, margin: 0 }}>
              {t("storyP2")}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: "#fff", borderTop: "1px solid #f0dde1", borderBottom: "1px solid #f0dde1" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(44px,6vw,72px) clamp(16px,4vw,40px)" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,3.5vw,38px)", color: "#5a4145", textAlign: "center", marginBottom: 36 }}>{t("whatDefinesUs")}</h2>
          <div className="dm-grid-three-col">
            <div style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔬</div>
              <h3 className="dm-serif" style={{ fontSize: 20, color: "#4f3a3e", fontWeight: 600, margin: "0 0 8px" }}>{t("pillarActiveTitle")}</h3>
              <p style={{ fontSize: 13.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{t("pillarActiveDesc")}</p>
            </div>
            <div style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
              <h3 className="dm-serif" style={{ fontSize: 20, color: "#4f3a3e", fontWeight: 600, margin: "0 0 8px" }}>{t("pillarCleanTitle")}</h3>
              <p style={{ fontSize: 13.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{t("pillarCleanDesc")}</p>
            </div>
            <div style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🇪🇬</div>
              <h3 className="dm-serif" style={{ fontSize: 20, color: "#4f3a3e", fontWeight: 600, margin: "0 0 8px" }}>{t("pillarEgyptianTitle")}</h3>
              <p style={{ fontSize: 13.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>{t("pillarEgyptianDesc")}</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
