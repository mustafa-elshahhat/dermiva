import React from "react";
import { notFound } from "next/navigation";
import { CATS, type CategoryKey } from "@/lib/catalog";
import CategoryContent from "./CategoryContent";

export function generateStaticParams() {
  return [
    { cat: "face" },
    { cat: "hair" },
    { cat: "body" },
    { cat: "lip" },
  ];
}

interface Props {
  params: Promise<{ cat: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const cat = resolvedParams.cat as CategoryKey;

  if (!CATS[cat]) {
    notFound();
  }

  const info = CATS[cat];

  return (
    <div className="dm-fade">
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) 0" }}>
        <div className="dm-cat-hero">
          <picture className="dm-cat-hero__media">
            <source media="(min-width: 1024px)" srcSet={info.heroImages.desktop} />
            <source media="(min-width: 768px)" srcSet={info.heroImages.tablet} />
            <img src={info.heroImages.mobile} alt={`${info.label} collection`} fetchPriority="high" />
          </picture>
          <div className="dm-cat-hero__overlay" aria-hidden="true" />
          <div className="dm-cat-hero__content">
            <div className="dm-cat-hero__crumb">Home / <span>{info.label}</span></div>
            <h1 className="dm-serif dm-cat-hero__title">{info.label}</h1>
            <p className="dm-cat-hero__text">{info.tagline}</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(22px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <CategoryContent cat={cat} />
      </section>
    </div>
  );
}
