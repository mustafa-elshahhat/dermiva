import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";
import { RawIcon, PROMISE_ICONS } from "@/components/icons";
import { CATS, PRODUCTS, bestSellers, getProduct, productImage, getCategoryContentText, type CategoryKey } from "@/lib/catalog";
import { getHeroImageSet, HOME_HERO, HOME_HERO_RTL, HAIR_COLLECTION, HAIR_COLLECTION_RTL } from "@/lib/images";
import type { Locale } from "@/i18n/routing";
import SubscribeForm from "./SubscribeForm";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  setRequestLocale(localeParam);
  const locale = localeParam as Locale;
  const t = await getTranslations();

  const catKeys = Object.keys(CATS) as CategoryKey[];
  const superSerum = getProduct("super-serum")!;
  const hero = getHeroImageSet(HOME_HERO, locale, HOME_HERO_RTL);
  const collection = getHeroImageSet(HAIR_COLLECTION, locale, HAIR_COLLECTION_RTL);
  const heroIngredients = getCategoryContentText("face", locale).ingredients;

  const PROMISES = [
    { icon: PROMISE_ICONS.cruelty, title: t("home.promiseCrueltyTitle"), sub: t("home.promiseCrueltySub") },
    { icon: PROMISE_ICONS.natural, title: t("home.promiseNaturalTitle"), sub: t("home.promiseNaturalSub") },
    { icon: PROMISE_ICONS.science, title: t("home.promiseScienceTitle"), sub: t("home.promiseScienceSub") },
    { icon: PROMISE_ICONS.egypt, title: t("home.promiseEgyptTitle"), sub: t("home.promiseEgyptSub") },
  ];

  return (
    <div className="dm-fade">
      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,32px) clamp(16px,4vw,40px)" }}>
        <div className="dm-hero">
          <picture className="dm-hero__media">
            <source media="(min-width: 1024px)" srcSet={hero.desktop} />
            <source media="(min-width: 768px)" srcSet={hero.tablet} />
            <img src={hero.mobile} alt={t("home.heroAlt")} fetchPriority="high" />
          </picture>
          <div className="dm-hero__overlay" aria-hidden="true" />
          <div className="dm-hero__content">
            <div className="dm-hero__eyebrow">{t("home.heroEyebrow")}</div>
            <h1 className="dm-serif dm-hero__title">
              {t("home.heroTitleLine1")}
              <br />
              {t("home.heroTitleLine2")}
            </h1>
            <p className="dm-hero__text">{t("home.heroText")}</p>
            <div className="dm-hero__discount">
              <span className="dm-hero__discount-label">{t("home.heroDiscountLabel")}</span>
              <span className="dm-serif dm-hero__discount-num">30%</span>
              <span className="dm-serif dm-hero__discount-off">{t("home.heroDiscountOff")}</span>
            </div>
            <Link href="/shop" className="dm-btn-primary dm-hero__cta">{t("common.shopNow")}</Link>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(36px,5vw,60px) clamp(16px,4vw,40px) clamp(10px,2vw,20px)" }}>
        <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", color: "#5a4145", textAlign: "center", margin: "0 0 28px" }}>
          <span style={{ color: "#d9a24f" }}>✦</span> {t("home.shopByCategory")} <span style={{ color: "#d9a24f" }}>✦</span>
        </h2>
        <div className="dm-grid-cats">
          {catKeys.map((k) => {
            const label = CATS[k].label[locale];
            return (
              <Link key={k} href={`/category/${k}`} className="dm-cat-card">
                <div className="dm-cat-card__media" style={{ aspectRatio: "1/1", background: "linear-gradient(160deg,#fbeef0,#f4dbe2)" }}>
                  <img src={CATS[k].cardImage} alt={t("home.categoryCardAlt", { label })} loading="lazy" />
                </div>
                <div style={{ padding: "14px 12px 16px", textAlign: "center" }}>
                  <div className="dm-serif" style={{ fontWeight: 600, fontSize: 19, color: "#4f3a3e" }}>{label}</div>
                  <div style={{ fontSize: 11.5, color: "#a98e93", marginTop: 2 }}>{t("common.productsCount", { count: PRODUCTS.filter((p) => p.cat === k).length })}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(36px,5vw,56px) clamp(16px,4vw,40px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 26 }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", color: "#5a4145", margin: 0 }}>
            <span style={{ color: "#d9a24f" }}>✦</span> {t("home.bestSellers")}
          </h2>
          <Link href="/shop" style={{ cursor: "pointer", fontSize: 14, color: "#b76e79", fontWeight: 600, borderBottom: "1px solid #e3b9c1", paddingBottom: 2, whiteSpace: "nowrap" }}>{t("common.viewAll")}</Link>
        </div>
        <ProductGrid products={bestSellers()} />
      </section>

      {/* OUR PROMISE */}
      <section style={{ background: "linear-gradient(180deg,#fdf6f4,#faecef)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(40px,5vw,64px) clamp(16px,4vw,40px)" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(26px,3.5vw,38px)", color: "#5a4145", textAlign: "center", margin: "0 0 34px" }}>{t("home.ourPromise")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 18 }}>
            {PROMISES.map((pr) => (
              <div key={pr.title} style={{ textAlign: "center", padding: "0 8px" }}>
                <div style={{ width: 64, height: 64, margin: "0 auto 14px", borderRadius: "50%", background: "#fff", boxShadow: "0 8px 20px rgba(184,134,146,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c2974f" }}>
                  <RawIcon svg={pr.icon} />
                </div>
                <div className="dm-serif" style={{ fontWeight: 600, fontSize: 18, color: "#4f3a3e" }}>{pr.title}</div>
                <div style={{ fontSize: 12.5, color: "#a98e93", marginTop: 3 }}>{pr.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(36px,5vw,56px) clamp(16px,4vw,40px)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 40px rgba(184,134,146,.14)" }}>
          <div style={{ flex: "1 1 300px", minWidth: 280, position: "relative", overflow: "hidden", minHeight: "clamp(320px,40vw,440px)" }}>
            <ProductImage image={productImage(superSerum)} mode="packshot" name={superSerum.name[locale]} kind="serum" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 30, insetInlineEnd: 30, display: "flex", flexDirection: "column", gap: 9, zIndex: 2 }}>
              {heroIngredients.map((ing) => (
                <div key={ing} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#8a6a3a", background: "rgba(255,255,255,.6)", padding: "5px 11px", borderRadius: 999 }}>
                  <span style={{ color: "#c2974f" }}>✦</span>
                  {ing}
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: 280, background: "#fff", padding: "clamp(28px,4vw,48px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "#b07c88", fontWeight: 600, marginBottom: 8 }}>{t("home.featuredEyebrow")}</div>
            <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,44px)", color: "#5a4145", margin: "0 0 12px", lineHeight: 1 }}>{superSerum.name[locale]}</h3>
            <p style={{ fontSize: 15, color: "#7c6065", lineHeight: 1.6, margin: "0 0 16px", maxWidth: 380 }}>{t("home.featuredDesc")}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <span style={{ color: "#d9a24f", fontSize: 16 }}>★★★★★</span>
              <span style={{ fontSize: 14, color: "#7c6468" }}>({superSerum.rating})</span>
            </div>
            <Link href="/product/super-serum" className="dm-btn-primary" style={{ alignSelf: "flex-start", fontSize: 14, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px", textDecoration: "none", textAlign: "center" }}>{t("common.shopNow")}</Link>
          </div>
        </div>
      </section>

      {/* COLLECTION BANNER */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 clamp(16px,4vw,40px) clamp(36px,5vw,56px)" }}>
        <Link href="/category/hair" className="dm-collection" aria-label={t("home.collectionAria")}>
          <picture className="dm-collection__media">
            <source media="(min-width: 1024px)" srcSet={collection.desktop} />
            <source media="(min-width: 768px)" srcSet={collection.tablet} />
            <img src={collection.mobile} alt={t("home.collectionAlt")} loading="lazy" />
          </picture>
          <div className="dm-collection__overlay" aria-hidden="true" />
          <div className="dm-collection__content">
            <h3 className="dm-serif dm-collection__title">{t("home.collectionTitle")}</h3>
            <p className="dm-collection__text">{t("home.collectionText")}</p>
            <span className="dm-btn-primary dm-collection__cta">{t("home.collectionCta")}</span>
          </div>
        </Link>
      </section>

      {/* SUBSCRIBE */}
      <section style={{ background: "radial-gradient(120% 140% at 50% 0%,#f8e4e9,#f3d4dc)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: "clamp(44px,6vw,72px) clamp(16px,4vw,40px)", textAlign: "center" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", color: "#5a4145", margin: "0 0 8px" }}>{t("home.subscribeTitle")}</h2>
          <p style={{ fontSize: 14.5, color: "#7c6065", margin: "0 0 24px" }}>{t("home.subscribeText")}</p>
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}
