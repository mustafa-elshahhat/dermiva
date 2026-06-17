import React from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RegisterForm from "./RegisterForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return { title: t("registerTitle"), description: t("registerDescription") };
}

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="dm-fade" style={{ maxWidth: 480, margin: "40px auto 70px", width: "100%", padding: "0 16px" }}>
      <RegisterForm />
    </div>
  );
}
