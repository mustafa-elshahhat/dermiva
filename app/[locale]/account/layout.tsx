import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

// The account pages are client components, so their (noindex) metadata is
// provided here via a server layout.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: routes.account(),
    title: t("accountTitle"),
    description: t("accountDescription"),
    index: false,
    ogAlt: t("ogAlt"),
  });
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
