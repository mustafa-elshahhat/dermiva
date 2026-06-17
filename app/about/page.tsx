"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Bottle from "@/components/Bottle";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="dm-fade">
      {/* Hero Header */}
      <section style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) 0" }}>
        <div style={{ background: "radial-gradient(120% 120% at 50% 20%,#fbe2e7,#f2c9d2 60%,#eec1cd)", borderRadius: 28, padding: "clamp(36px,6vw,72px) clamp(20px,5vw,56px)", textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#b07c88", fontWeight: 600, marginBottom: 12 }}>Our Essence</div>
          <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(36px,5.5vw,56px)", color: "#9a5d6a", margin: "0 0 16px", lineHeight: 1.05 }}>
            Science-Driven Skincare
            <br />
            Formulated in Egypt
          </h1>
          <p style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "#7c6065", maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.6 }}>
            At Dermiva, we merge clinical active ingredients with local production expertise to craft skincare that works safely and effectively.
          </p>
          <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ padding: "14px 38px", fontSize: 14, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase" }}>Shop the Collection</button>
        </div>
      </section>

      {/* Narrative Section */}
      <section style={{ maxWidth: 1000, margin: "0 auto", width: "100%", padding: "clamp(40px,5vw,64px) clamp(16px,4vw,40px)" }}>
        <div className="dm-grid-responsive-two-col" style={{ gap: 36, alignItems: "center" }}>
          <div style={{ height: "clamp(280px,36vw,400px)", background: "linear-gradient(160deg,#faecef,#f6dfe5)", borderRadius: 24, padding: "12%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div style={{ width: "45%", height: "92%", animation: "dmFloat 6s ease-in-out infinite" }}><Bottle kind="serum" name="Super Serum" /></div>
            <div style={{ width: "38%", height: "64%", animation: "dmFloat 6s ease-in-out infinite .5s" }}><Bottle kind="tube" name="Lip Balm" /></div>
          </div>
          <div>
            <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,3.5vw,38px)", color: "#5a4145", margin: "0 0 16px" }}>Our Story</h2>
            <p style={{ fontSize: 15, color: "#7c6065", lineHeight: 1.65, marginBottom: 16 }}>
              Dermiva was born from a simple belief: you shouldn&apos;t have to choose between premium clinical-grade active ingredients and accessible price tags. Frustrated by the high cost of imported serums, our team of skincare scientists decided to build a local laboratory in Egypt.
            </p>
            <p style={{ fontSize: 15, color: "#7c6065", lineHeight: 1.65, margin: 0 }}>
              By sourcing globally certified active ingredients like Vitamin C, Niacinamide, and Hyaluronic Acid, and formulating them in state-of-the-art facilities in Egypt, we formulate products that are clean, highly effective, and tailored specifically to our warm climate.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: "#fff", borderTop: "1px solid #f0dde1", borderBottom: "1px solid #f0dde1" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(44px,6vw,72px) clamp(16px,4vw,40px)" }}>
          <h2 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(28px,3.5vw,38px)", color: "#5a4145", textAlign: "center", marginBottom: 36 }}>What Defines Us</h2>
          <div className="dm-grid-three-col">
            <div style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔬</div>
              <h3 className="dm-serif" style={{ fontSize: 20, color: "#4f3a3e", fontWeight: 600, margin: "0 0 8px" }}>Active Formulations</h3>
              <p style={{ fontSize: 13.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>We use active ingredients in clinically proven percentages to target specific skin concerns for real results.</p>
            </div>
            <div style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🌿</div>
              <h3 className="dm-serif" style={{ fontSize: 20, color: "#4f3a3e", fontWeight: 600, margin: "0 0 8px" }}>100% Clean & Safe</h3>
              <p style={{ fontSize: 13.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>All our products are paraben-free, cruelty-free, silicone-free, and tested rigorously on all skin types.</p>
            </div>
            <div style={{ background: "#fdf6f4", border: "1px solid #f0dde1", borderRadius: 20, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🇪🇬</div>
              <h3 className="dm-serif" style={{ fontSize: 20, color: "#4f3a3e", fontWeight: 600, margin: "0 0 8px" }}>Proudly Egyptian</h3>
              <p style={{ fontSize: 13.5, color: "#7c6065", lineHeight: 1.6, margin: 0 }}>Locally formulated, tested, and bottled. We support our local community and economies while maintaining top quality standards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
