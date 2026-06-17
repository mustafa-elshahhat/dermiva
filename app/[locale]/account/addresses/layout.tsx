import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: routes.addresses(),
    title: t("addressesTitle"),
    description: t("addressesDescription"),
    index: false,
    ogAlt: t("ogAlt"),
  });
}

export default function AddressesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
