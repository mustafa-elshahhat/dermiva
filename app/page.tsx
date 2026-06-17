"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Bottle from "@/components/Bottle";
import ProductGrid from "@/components/ProductGrid";
import { RawIcon, PROMISE_ICONS } from "@/components/icons";
import { CATS, CAT_KIND, PRODUCTS, bestSellers, type CategoryKey } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const PROMISES = [
  { icon: PROMISE_ICONS.cruelty, title: "Cruelty Free", sub: "Kind to animals" },
  { icon: PROMISE_ICONS.natural, title: "Natural Ingredients", sub: "Pure & effective" },
  { icon: PROMISE_ICONS.science, title: "Science-Driven", sub: "Real results" },
  { icon: PROMISE_ICONS.egypt, title: "Made in Egypt", sub: "Proudly local" },
];

const HERO_INGREDIENTS = ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Alpha Arbutin", "Collagen Peptide"];

export default function HomePage() {
  const router = useRouter();
  const { showToast } = useStore();
  const [email, setEmail] = useState("");

  const onSubscribe = () => {
    showToast("Subscribed! Welcome to Dermiva");
    setEmail("");
  };

  const catKeys = Object.keys(CATS) as CategoryKey[];

  return (
    <div className="dm-fade">
      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,32px) clamp(16px,4vw,40px)" }}>
        <div style={{ background: "radial-gradient(120% 120% at 80% 10%,#fbe2e7,#f4cdd6 55%,#eec1cd)", borderRadius: 28, overflow: "hidden", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, padding: "clamp(28px,4vw,56px)", position: "relative" }}>
          <div style={{ flex: "1 1 320px", minWidth: 280, position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#b07c88", fontWeight: 600, marginBottom: 14 }}>Science-Driven Skincare</div>
            <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(40px,6.5vw,66px)", lineHeight: 1.02, color: "#9a5d6a", margin: "0 0 16px" }}>
              Reveal Your
              <br />
              Natural Glow
            </h1>
            <p style={{ fontSize: "clamp(15px,1.6vw,17px)", color: "#7c6065", maxWidth: 420, lineHeight: 1.55, margin: "0 0 22px" }}>A blend of clean, effective skincare for healthy, radiant skin — made with care in Egypt.</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 26 }}>
              <span style={{ fontSize: 13, letterSpacing: ".12em", color: "#b07c88", textTransform: "uppercase" }}>Up to</span>
              <span className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(46px,8vw,72px)", color: "#b76e79", lineHeight: 0.9 }}>30%</span>
              <span className="dm-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "#b76e79", fontWeight: 600 }}>OFF</span>
            </div>
            <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ fontSize: 15, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", padding: "15px 38px" }}>Shop Now</button>
          </div>
          <div style={{ flex: "1 1 320px", minWidth: 280, position: "relative", height: "clamp(280px,38vw,420px)", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "clamp(4px,1vw,14px)" }}>
            <div style={{ position: "absolute", bottom: "6%", left: "6%", right: "6%", height: "14%", background: "linear-gradient(180deg,#f6ece0,#e7d4c2)", borderRadius: "50%/40%", filter: "blur(2px)" }} />
            <div style={{ width: "26%", height: "62%", animation: "dmFloat 6s ease-in-out infinite" }}><Bottle kind="tube" name="Lip Balm" /></div>
            <div style={{ width: "34%", height: "88%", zIndex: 2, animation: "dmFloat 5s ease-in-out infinite .4s" }}><Bottle kind="serum" name="Super Serum" /></div>
            <div style={{ width: "32%", height: "54%", animation: "dmFloat 6.5s ease-in-out infinite .8s" }}><Bottle kind="jar" name="Glow Peel Pads" /></div>
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
              <div style={{ aspectRatio: "1/1", background: "linear-gradient(160deg,#fbeef0,#f4dbe2)", padding: "8%" }}>
                <Bottle kind={CAT_KIND[k]} name={CATS[k].label} />
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
          <div style={{ flex: "1 1 300px", minWidth: 280, background: "radial-gradient(120% 120% at 30% 20%,#f7ecd6,#eed9b4 70%,#e3c894)", display: "flex", alignItems: "center", justifyContent: "center", padding: 36, position: "relative" }}>
            <div style={{ width: "min(60%,220px)", height: "clamp(220px,30vw,320px)" }}><Bottle kind="serum" name="Super Serum" /></div>
            <div style={{ position: "absolute", top: 30, right: 30, display: "flex", flexDirection: "column", gap: 9 }}>
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
            <button onClick={() => router.push("/product/super-serum")} className="dm-btn-primary" style={{ alignSelf: "flex-start", fontSize: 14, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px" }}>Shop Now</button>
          </div>
        </div>
      </section>

      {/* COLLECTION BANNER */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 clamp(16px,4vw,40px) clamp(36px,5vw,56px)" }}>
        <div onClick={() => router.push("/category/hair")} style={{ cursor: "pointer", background: "radial-gradient(120% 120% at 85% 50%,#f3d3da,#ecbfc9 60%,#e3aeba)", borderRadius: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, padding: "clamp(28px,4vw,48px)", overflow: "hidden" }}>
          <div style={{ flex: "1 1 280px", minWidth: 260 }}>
            <h3 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4.5vw,48px)", color: "#8f5360", margin: "0 0 10px", lineHeight: 1.02 }}>
              Hair Therapy
              <br />
              Collection
            </h3>
            <p style={{ fontSize: 15, color: "#7c5560", margin: "0 0 22px", maxWidth: 340 }}>Stronger, shinier &amp; healthier hair you&apos;ll love — powered by nourishing oils and repair actives.</p>
            <span className="dm-btn-primary" style={{ display: "inline-block", fontSize: 13, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", padding: "13px 30px" }}>Explore Collection</span>
          </div>
          <div style={{ flex: "1 1 240px", minWidth: 220, height: "clamp(180px,24vw,240px)", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 10 }}>
            <div style={{ width: "34%", height: "70%" }}><Bottle kind="pump" name="Hair Oil" /></div>
            <div style={{ width: "38%", height: "54%" }}><Bottle kind="jar" name="Hair Mask" /></div>
            <div style={{ width: "30%", height: "80%" }}><Bottle kind="pump" name="Shampoo" /></div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section style={{ background: "radial-gradient(120% 140% at 50% 0%,#f8e4e9,#f3d4dc)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", width: "100%", padding: "clamp(44px,6vw,72px) clamp(16px,4vw,40px)", textAlign: "center" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", color: "#5a4145", margin: "0 0 8px" }}>Subscribe to our emails</h2>
          <p style={{ fontSize: 14.5, color: "#7c6065", margin: "0 0 24px" }}>Join our community for exclusive offers and skincare tips.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 460, margin: "0 auto" }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ flex: "1 1 220px", minWidth: 180, border: "1px solid #e3c3cc", background: "#fff", borderRadius: 999, padding: "14px 22px", fontSize: 14, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }}
            />
            <button onClick={onSubscribe} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 14, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
