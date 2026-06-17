import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { CategoryKey } from "@/lib/types/category";
import { getCategoryByKey, getProductsByCategory } from "@/lib/api/catalog.service";
import { buildCategoryMetadata } from "@/lib/seo/metadata";
import { buildNoIndexRobots } from "@/lib/seo/robots";
import CategoryContent from "./CategoryContent";

export function generateStaticParams() {
  return [{ cat: "face" }, { cat: "hair" }, { cat: "body" }, { cat: "lip" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; cat: string }> }): Promise<Metadata> {
  const { locale: localeParam, cat } = await params;
  const locale = localeParam as Locale;
  const result = await getCategoryByKey(cat as CategoryKey, locale);
  // Unknown category: safe noindex so no broken canonical/alternates are emitted.
  if (!result.ok) return { robots: buildNoIndexRobots() };
  const t = await getTranslations({ locale, namespace: "seo" });
  return buildCategoryMetadata({ locale, category: result.data, ogAlt: t("ogAlt") });
}

interface Props {
  params: Promise<{ locale: string; cat: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { locale: localeParam, cat: catParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const cat = catParam as CategoryKey;

  const result = await getCategoryByKey(cat, locale);
  if (!result.ok) {
    notFound();
  }

  const category = result.data;
  const productsResult = await getProductsByCategory(cat, locale);
  const products = productsResult.ok ? productsResult.data : [];
  const t = await getTranslations();
  const hero = category.hero;

  return (
    <div className="dm-fade">
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) 0" }}>
        <div className="dm-cat-hero">
          <picture className="dm-cat-hero__media">
            <source media="(min-width: 1024px)" srcSet={hero.desktop} />
            <source media="(min-width: 768px)" srcSet={hero.tablet} />
            <img src={hero.mobile} alt={t("category.heroAlt", { label: category.label })} fetchPriority="high" />
          </picture>
          <div className="dm-cat-hero__overlay" aria-hidden="true" />
          <div className="dm-cat-hero__content">
            <div className="dm-cat-hero__crumb">{t("common.home")} / <span>{category.label}</span></div>
            <h1 className="dm-serif dm-cat-hero__title">{category.label}</h1>
            <p className="dm-cat-hero__text">{category.tagline}</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(22px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <CategoryContent products={products} />
      </section>
    </div>
  );
}
