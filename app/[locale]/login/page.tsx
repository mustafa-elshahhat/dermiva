import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/seo/routes";
import LoginForm from "./LoginForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildPageMetadata({
    locale,
    path: routes.login(),
    title: t("loginTitle"),
    description: t("loginDescription"),
    index: false,
    ogAlt: t("ogAlt"),
  });
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="dm-fade" style={{ maxWidth: 480, margin: "40px auto 70px", width: "100%", padding: "0 16px" }}>
      <LoginForm />
    </div>
  );
}
