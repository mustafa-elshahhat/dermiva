import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CATS, getCategoryText, type CategoryKey } from "@/lib/catalog";
import { getHeroImageSet } from "@/lib/images";
import type { Locale } from "@/i18n/routing";
import CategoryContent from "./CategoryContent";

export function generateStaticParams() {
  return [{ cat: "face" }, { cat: "hair" }, { cat: "body" }, { cat: "lip" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; cat: string }> }): Promise<Metadata> {
  const { locale, cat } = await params;
  if (!CATS[cat as CategoryKey]) return {};
  const text = getCategoryText(cat as CategoryKey, locale as Locale);
  return { title: text.label, description: text.tagline, alternates: { canonical: `/${locale}/category/${cat}` } };
}

interface Props {
  params: Promise<{ locale: string; cat: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { locale: localeParam, cat: catParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const cat = catParam as CategoryKey;

  if (!CATS[cat]) {
    notFound();
  }

  const info = CATS[cat];
  const t = await getTranslations();
  const text = getCategoryText(cat, locale);
  const hero = getHeroImageSet(info.heroImages, locale, info.heroImagesRtl);

  return (
    <div className="dm-fade">
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) 0" }}>
        <div className="dm-cat-hero">
          <picture className="dm-cat-hero__media">
            <source media="(min-width: 1024px)" srcSet={hero.desktop} />
            <source media="(min-width: 768px)" srcSet={hero.tablet} />
            <img src={hero.mobile} alt={t("category.heroAlt", { label: text.label })} fetchPriority="high" />
          </picture>
          <div className="dm-cat-hero__overlay" aria-hidden="true" />
          <div className="dm-cat-hero__content">
            <div className="dm-cat-hero__crumb">{t("common.home")} / <span>{text.label}</span></div>
            <h1 className="dm-serif dm-cat-hero__title">{text.label}</h1>
            <p className="dm-cat-hero__text">{text.tagline}</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(22px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <CategoryContent cat={cat} />
      </section>
    </div>
  );
}
