import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import { JsonLdScript } from "@/lib/seo/structured-data-script";
import { buildBreadcrumbListJsonLd, buildContactPageJsonLd } from "@/lib/seo/structured-data";
import ContactForm from "./ContactForm";
import ContactFaqs from "./ContactFaqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: routes.contact(),
    title: t("contactTitle"),
    description: t("contactDescription"),
    index: true,
    ogAlt: t("ogAlt"),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");
  const pageJsonLd = [
    buildBreadcrumbListJsonLd(locale, [
      { name: tCommon("home"), path: routes.home() },
      { name: t("title"), path: routes.contact() },
    ]),
    buildContactPageJsonLd({
      locale,
      name: t("title"),
      description: t("subtitle"),
    }),
  ];

  return (
    <>
      <JsonLdScript data={pageJsonLd} />
      <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 8px", textAlign: "center" }}>{t("title")}</h1>
        <p style={{ fontSize: 14.5, color: "#a98e93", textAlign: "center", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
          {t("subtitle")}
        </p>

        <section style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24, marginBottom: 28 }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: 26, color: "#5a4145", margin: "0 0 14px" }}>{t("supportTopicsTitle")}</h2>
          <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 10, padding: 0, margin: 0, listStyle: "none" }}>
            {[t("supportOrders"), t("supportShipping"), t("supportReturns"), t("supportProducts"), t("supportPayments")].map((item) => (
              <li key={item} style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 999, padding: "10px 14px", color: "#7c6065", fontSize: 14, fontWeight: 600 }}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="dm-grid-responsive-two-col" style={{ gap: 32, alignItems: "start" }}>
          {/* Contact Form & Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Form */}
            <ContactForm />

            {/* Quick Info */}
            <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
              <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 12px" }}>{t("directContact")}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "#7c6065" }}>
                <div>📞 <strong>{t("phoneLabel")}</strong> +20 100 123 4567</div>
                <div>✉ <strong>{t("emailLabel")}</strong> support@dermiva.com</div>
                <div>📍 <strong>{t("addressLabel")}</strong> {t("addressValue")}</div>
                <div style={{ marginTop: 8, fontSize: 12, color: "#a98e93" }}>{t("hours")}</div>
                {/* TODO: Confirm final public phone, email, address and social links before production launch. */}
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <ContactFaqs />
        </div>
      </div>
    </>
  );
}
