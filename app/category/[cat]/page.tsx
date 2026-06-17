import React from "react";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import { CATS, getCategoryProduct, productImage, type CategoryKey } from "@/lib/catalog";
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
  const catProduct = getCategoryProduct(cat);

  return (
    <div className="dm-fade">
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(18px,3vw,28px) clamp(16px,4vw,40px) 0" }}>
        <div className="dm-hero-container" style={{ background: "radial-gradient(120% 120% at 80% 20%,#fbe2e7,#f1cbd4 70%,#ebbfca)", borderRadius: 24, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20, overflow: "hidden" }}>
          <div className="dm-hero-child-left">
            <div style={{ fontSize: 12.5, color: "#a98e93", marginBottom: 8 }}>Home / <span style={{ color: "#7c6065" }}>{info.label}</span></div>
            <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(34px,5vw,54px)", color: "#9a5d6a", margin: "0 0 10px", lineHeight: 1 }}>{info.label}</h1>
            <p style={{ fontSize: 15, color: "#7c6065", maxWidth: 380, margin: 0, lineHeight: 1.55 }}>{info.tagline}</p>
          </div>
          <div style={{ flex: "0 0 auto", width: "clamp(120px,20vw,180px)", height: "clamp(150px,24vw,210px)" }}>
            <ProductImage image={productImage(catProduct)} mode="cutout" name={info.label} kind={catProduct.kind} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(22px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
        <CategoryContent cat={cat} />
      </section>
    </div>
  );
}
