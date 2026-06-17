import React from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import ProductGrid from "@/components/ProductGrid";
import { RawIcon, PROMISE_ICONS } from "@/components/icons";
import { CATS, PRODUCTS, bestSellers, getProduct, productImage, type CategoryKey } from "@/lib/catalog";
import SubscribeForm from "./SubscribeForm";

const PROMISES = [
  { icon: PROMISE_ICONS.cruelty, title: "Cruelty Free", sub: "Kind to animals" },
  { icon: PROMISE_ICONS.natural, title: "Natural Ingredients", sub: "Pure & effective" },
  { icon: PROMISE_ICONS.science, title: "Science-Driven", sub: "Real results" },
  { icon: PROMISE_ICONS.egypt, title: "Made in Egypt", sub: "Proudly local" },
];

const HERO_INGREDIENTS = ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Alpha Arbutin", "Collagen Peptide"];

export default function HomePage() {
  const catKeys = Object.keys(CATS) as CategoryKey[];
  const superSerum = getProduct("super-serum")!;

  return (
    <div className="dm-fade">
      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,32px) clamp(16px,4vw,40px)" }}>
        <div className="dm-hero">
          <picture className="dm-hero__media">
            <source media="(min-width: 1024px)" srcSet="/hero/desktop.webp" />
            <source media="(min-width: 768px)" srcSet="/hero/tablet.webp" />
            <img src="/hero/mobile.webp" alt="Dermiva Super Serum, Glow Peel Pads and Lip Balm collection" fetchPriority="high" />
          </picture>
          <div className="dm-hero__overlay" aria-hidden="true" />
          <div className="dm-hero__content">
            <div className="dm-hero__eyebrow">Science-Driven Skincare</div>
            <h1 className="dm-serif dm-hero__title">
              Reveal Your
              <br />
              Natural Glow
            </h1>
            <p className="dm-hero__text">A blend of clean, effective skincare for healthy, radiant skin — made with care in Egypt.</p>
            <div className="dm-hero__discount">
              <span className="dm-hero__discount-label">Up to</span>
              <span className="dm-serif dm-hero__discount-num">30%</span>
              <span className="dm-serif dm-hero__discount-off">OFF</span>
            </div>
            <Link href="/shop" className="dm-btn-primary dm-hero__cta">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(36px,5vw,60px) clamp(16px,4vw,40px) clamp(10px,2vw,20px)" }}>
        <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", color: "#5a4145", textAlign: "center", margin: "0 0 28px" }}>
          <span style={{ color: "#d9a24f" }}>✦</span> Shop by Category <span style={{ color: "#d9a24f" }}>✦</span>
        </h2>
        <div className="dm-grid-cats">
          {catKeys.map((k) => (
            <Link key={k} href={`/category/${k}`} className="dm-cat-card">
              <div className="dm-cat-card__media" style={{ aspectRatio: "1/1", background: "linear-gradient(160deg,#fbeef0,#f4dbe2)" }}>
                <img src={CATS[k].cardImage} alt={`${CATS[k].label} category`} loading="lazy" />
              </div>
              <div style={{ padding: "14px 12px 16px", textAlign: "center" }}>
                <div className="dm-serif" style={{ fontWeight: 600, fontSize: 19, color: "#4f3a3e" }}>{CATS[k].label}</div>
                <div style={{ fontSize: 11.5, color: "#a98e93", marginTop: 2 }}>{PRODUCTS.filter((p) => p.cat === k).length} products</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(36px,5vw,56px) clamp(16px,4vw,40px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 26 }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,42px)", color: "#5a4145", margin: 0 }}>
            <span style={{ color: "#d9a24f" }}>✦</span> Best Sellers
          </h2>
          <Link href="/shop" style={{ cursor: "pointer", fontSize: 14, color: "#b76e79", fontWeight: 600, borderBottom: "1px solid #e3b9c1", paddingBottom: 2, whiteSpace: "nowrap" }}>View All</Link>
        </div>
        <ProductGrid products={bestSellers()} />
      </section>

      {/* OUR PROMISE */}
      <section style={{ background: "linear-gradient(180deg,#fdf6f4,#faecef)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(40px,5vw,64px) clamp(16px,4vw,40px)" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(26px,3.5vw,38px)", color: "#5a4145", textAlign: "center", margin: "0 0 34px" }}>Our Promise</h2>
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
            <ProductImage image={productImage(superSerum)} mode="packshot" name="Super Serum" kind="serum" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 30, right: 30, display: "flex", flexDirection: "column", gap: 9, zIndex: 2 }}>
              {HERO_INGREDIENTS.map((ing) => (
                <div key={ing} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#8a6a3a", background: "rgba(255,255,255,.6)", padding: "5px 11px", borderRadius: 999 }}>
                  <span style={{ color: "#c2974f" }}>✦</span>
                  {ing}
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 300px", minWidth: 280, background: "#fff", padding: "clamp(28px,4vw,48px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", color: "#b07c88", fontWeight: 600, marginBottom: 8 }}>Our Best Seller</div>
            <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4vw,44px)", color: "#5a4145", margin: "0 0 12px", lineHeight: 1 }}>Super Serum</h3>
            <p style={{ fontSize: 15, color: "#7c6065", lineHeight: 1.6, margin: "0 0 16px", maxWidth: 380 }}>A powerful blend for brighter, smoother, healthier-looking skin — clinically inspired, gentle enough for daily use.</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <span style={{ color: "#d9a24f", fontSize: 16 }}>★★★★★</span>
              <span style={{ fontSize: 14, color: "#7c6468" }}>(4.9)</span>
            </div>
            <Link href="/product/super-serum" className="dm-btn-primary" style={{ alignSelf: "flex-start", fontSize: 14, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px", textDecoration: "none", textAlign: "center" }}>Shop Now</Link>
          </div>
        </div>
      </section>

      {/* COLLECTION BANNER */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 clamp(16px,4vw,40px) clamp(36px,5vw,56px)" }}>
        <Link href="/category/hair" className="dm-collection" aria-label="Explore the Hair Therapy Collection">
          <picture className="dm-collection__media">
            <source media="(min-width: 1024px)" srcSet="/hair-therapy-collection/hair-therapy-collection-desktop.webp" />
            <source media="(min-width: 768px)" srcSet="/hair-therapy-collection/hair-therapy-collection-tablet.webp" />
            <img src="/hair-therapy-collection/hair-therapy-collection-mobile.webp" alt="Dermiva Hair Therapy Collection — nourishing oils, masks and repair shampoo" loading="lazy" />
          </picture>
          <div className="dm-collection__overlay" aria-hidden="true" />
          <div className="dm-collection__content">
            <h3 className="dm-serif dm-collection__title">Hair Therapy Collection</h3>
            <p className="dm-collection__text">Stronger, shinier &amp; healthier hair you&apos;ll love — powered by nourishing oils and repair actives.</p>
            <span className="dm-btn-primary dm-collection__cta">Explore Collection</span>
          </div>
        </Link>
      </section>

      {/* SUBSCRIBE */}
      <section style={{ background: "radial-gradient(120% 140% at 50% 0%,#f8e4e9,#f3d4dc)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: "clamp(44px,6vw,72px) clamp(16px,4vw,40px)", textAlign: "center" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", color: "#5a4145", margin: "0 0 8px" }}>Subscribe to our emails</h2>
          <p style={{ fontSize: 14.5, color: "#7c6065", margin: "0 0 24px" }}>Join our community for exclusive offers and skincare tips.</p>
          <SubscribeForm />
        </div>
      </section>
    </div>
  );
}
