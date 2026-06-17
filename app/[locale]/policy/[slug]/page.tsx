import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { PolicyKey } from "@/lib/types/policy";
import { getPolicyBySlug } from "@/lib/api/policies.service";
import { buildPolicyMetadata } from "@/lib/seo/metadata";
import { buildNoIndexRobots } from "@/lib/seo/robots";
import { routes } from "@/lib/seo/routes";
import { JsonLdScript } from "@/lib/seo/structured-data-script";
import { buildBreadcrumbListJsonLd, buildPolicyWebPageJsonLd } from "@/lib/seo/structured-data";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return [{ slug: "shipping" }, { slug: "returns" }, { slug: "privacy" }, { slug: "terms" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const result = await getPolicyBySlug(slug as PolicyKey, locale);
  // Unknown policy: safe noindex; the page itself calls notFound().
  if (!result.ok) return { robots: buildNoIndexRobots() };
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPolicyMetadata({ locale, policy: result.data, ogAlt: t("ogAlt") });
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function PolicyPage({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;

  const result = await getPolicyBySlug(slug as PolicyKey, locale);
  if (!result.ok) {
    notFound();
  }

  const t = await getTranslations();
  const policy = result.data;
  const policyPath = routes.policy(policy.slug);
  const pageJsonLd = [
    buildBreadcrumbListJsonLd(locale, [
      { name: t("common.home"), path: routes.home() },
      { name: t("policy.breadcrumb"), path: policyPath },
      { name: policy.title, path: policyPath },
    ]),
    buildPolicyWebPageJsonLd({ locale, policy }),
  ];

  return (
    <>
      <JsonLdScript data={pageJsonLd} />
      <div className="dm-fade" style={{ maxWidth: 800, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <div style={{ marginBottom: 12, fontSize: 12.5, color: "#a98e93" }}>{t("common.home")} / {t("policy.breadcrumb")} / <span style={{ color: "#7c6065" }}>{policy.title}</span></div>

        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 24, padding: "clamp(24px,5vw,44px)", boxShadow: "0 10px 30px rgba(184,134,146,.08)" }}>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4.5vw,44px)", color: "#5a4145", margin: "0 0 10px", lineHeight: 1.1 }}>
            {policy.title}
          </h1>
          <p style={{ fontSize: 15.5, color: "#b76e79", fontWeight: 500, marginBottom: 28, lineHeight: 1.5 }}>
            {policy.intro}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {policy.sections.map((sec, idx) => (
              <div key={idx} style={{ borderBottom: idx < policy.sections.length - 1 ? "1px solid #f5eef0" : "none", paddingBottom: idx < policy.sections.length - 1 ? 20 : 0 }}>
                <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 21, color: "#4f3a3e", margin: "0 0 8px" }}>
                  {sec.h}
                </h3>
                <p style={{ fontSize: 14.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>
                  {sec.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
