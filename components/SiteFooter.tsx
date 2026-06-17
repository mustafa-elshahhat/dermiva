"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandLogo from "./BrandLogo";
import { PAYMENT_METHODS, getPaymentText } from "@/lib/payments";
import { SOCIAL_LINKS } from "@/lib/social";
import type { Locale } from "@/i18n/routing";

const LINKS = [
  { key: "aboutUs", href: "/about" },
  { key: "shopAll", href: "/shop" },
  { key: "faqs", href: "/contact" },
  { key: "shippingPolicy", href: "/policy/shipping" },
  { key: "returns", href: "/policy/returns" },
  { key: "privacy", href: "/policy/privacy" },
  { key: "terms", href: "/policy/terms" },
  { key: "contactUs", href: "/contact" },
] as const;

export default function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <footer style={{ background: "#fdf6f4", borderTop: "1px solid #f0dde1" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(32px,4vw,48px) clamp(16px,4vw,40px) 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <Link href="/" aria-label={tNav("homeAria")} style={{ display: "inline-flex" }}>
            <BrandLogo height={64} />
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 13, color: "#a98e93", letterSpacing: ".1em", marginBottom: 12 }}>{t("weAccept")}</div>
          <div className="dm-footer-payments-row">
            {PAYMENT_METHODS.map((pm) => {
              const label = getPaymentText(pm, locale).label;
              return (
                <div
                  key={pm.id}
                  className="dm-footer-payment-badge"
                >
                  <Image
                    src={pm.image}
                    alt={label}
                    width={32}
                    height={32}
                    className="dm-footer-payment-icon"
                  />
                  <span className="dm-footer-payment-label" style={{ fontWeight: 600, color: "#8a7378", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px", justifyContent: "center", padding: "22px 0", borderTop: "1px solid #f0dde1", borderBottom: "1px solid #f0dde1" }}>
          {LINKS.map((l, i) => (
            <Link key={l.href + i} href={l.href} className="dm-footlink">
              {t(l.key)}
            </Link>
          ))}
        </div>
        <div className="dm-footer-bottom" style={{ paddingTop: 18 }}>
          <div style={{ fontSize: 12, color: "#a98e93" }}>{t("copyright")}</div>
          <div className="dm-footer-social">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("socialAria", { network: s.label })}
                className="dm-social-icon"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt={s.label}
                  width={24}
                  height={24}
                  style={{ objectFit: "contain", display: "block" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
