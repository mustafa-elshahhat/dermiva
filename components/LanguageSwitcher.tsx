"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Switches the current route to the other locale, preserving the path and any
// dynamic params (e.g. /ar/product/super-serum <-> /en/product/super-serum).
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const other = locale === "ar" ? "en" : "ar";
  const otherLabel = other === "ar" ? t("languageAr") : t("languageEn");

  const switchTo = () => {
    // usePathname() from i18n/navigation returns the resolved, locale-stripped
    // pathname (e.g. /product/super-serum), so switching locale keeps the route.
    router.replace(pathname, { locale: other });
  };

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={t("switchLanguage")}
      title={t("switchLanguage")}
      className="dm-lang-switch"
      style={{
        cursor: "pointer",
        background: "none",
        border: "1px solid #e3c3cc",
        borderRadius: 999,
        color: "#7c5f64",
        fontFamily: "var(--font-jost),sans-serif",
        fontWeight: 600,
        fontSize: compact ? 14 : 13,
        padding: compact ? "8px 14px" : "7px 12px",
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      {otherLabel}
    </button>
  );
}

// Re-exported for any caller that wants to enumerate locales.
export const LOCALES = routing.locales;
