import React from "react";
import type { BottleKind } from "@/lib/catalog";

// Pure CSS-drawn product bottle, ported from Bottle.dc.html. Four variants:
// serum, jar, tube, pump. Label text scales with viewport (vw units) exactly
// as in the prototype.

const wrap: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
};

export default function Bottle({ kind = "serum", name = "DERMIVA" }: { kind?: BottleKind; name?: string }) {
  const label = name || "DERMIVA";

  if (kind === "jar") {
    return (
      <div style={wrap}>
        <div style={{ width: "70%", height: "64%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", filter: "drop-shadow(0 14px 18px rgba(150,120,60,0.25))" }}>
          <div style={{ width: "54%", height: "24%", background: "linear-gradient(120deg,#e8c878,#c79a45 45%,#f1d99a 70%,#b8852f)", borderRadius: "9px 9px 4px 4px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "16%", width: "16%", height: "100%", background: "linear-gradient(90deg,rgba(255,255,255,0.5),rgba(255,255,255,0))" }} />
          </div>
          <div style={{ width: "60%", height: "5%", background: "linear-gradient(90deg,#a8772a,#d8b259,#a8772a)", borderRadius: 2 }} />
          <div style={{ position: "relative", width: "56%", height: "46%", background: "linear-gradient(95deg,#f3ead9,#fffdf8 40%,#ece0cb)", borderRadius: "4px 4px 12px 12px", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5%" }}>
            <div className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(8px, 0.85vw, 12px)", letterSpacing: "0.12em", color: "#b9863f", lineHeight: 1 }}>DERMIVA</div>
            <div style={{ width: "50%", height: 1, background: "#e6cfa3" }} />
            <div style={{ fontFamily: "var(--font-jost),sans-serif", fontSize: "clamp(6px, 0.58vw, 9px)", color: "#8a7a6a", textAlign: "center", lineHeight: 1.1, padding: "0 8%" }}>{label}</div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "tube") {
    return (
      <div style={wrap}>
        <div style={{ width: "70%", height: "88%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", filter: "drop-shadow(0 14px 16px rgba(190,120,140,0.25))" }}>
          <div style={{ width: "23%", height: "20%", background: "linear-gradient(150deg,#f3c4d2,#e29bb0 60%,#d886a0)", borderRadius: "7px 7px 3px 3px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "18%", width: "18%", height: "100%", background: "linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,255,255,0))" }} />
          </div>
          <div style={{ width: "26%", height: "4%", background: "linear-gradient(90deg,#bb8b34,#e7c777,#bb8b34)" }} />
          <div style={{ position: "relative", width: "23%", height: "58%", background: "linear-gradient(95deg,#f7dbe4,#fffdfd 42%,#f0c9d6)", borderRadius: "3px 3px 26% 26%/3px 3px 9% 9%", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8%", padding: "8% 0" }}>
            <div className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(6.5px, 0.62vw, 9px)", letterSpacing: "0.1em", color: "#c98aa0", lineHeight: 1 }}>DERMIVA</div>
            <div style={{ width: "46%", height: 1, background: "#eccdd8" }} />
            <div style={{ fontFamily: "var(--font-jost),sans-serif", fontSize: "clamp(5.5px, 0.5vw, 8px)", color: "#a98090", textAlign: "center", lineHeight: 1.1, padding: "0 10%" }}>{label}</div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "pump") {
    return (
      <div style={wrap}>
        <div style={{ width: "70%", height: "92%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", filter: "drop-shadow(0 14px 18px rgba(120,70,40,0.22))" }}>
          <div style={{ width: "42%", height: "7%", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "48%", height: "55%", background: "linear-gradient(90deg,#3a3330,#1d1a18)", borderRadius: "3px 0 0 3px" }} />
            <div style={{ width: "52%", height: "100%", background: "linear-gradient(160deg,#3a3330,#1d1a18)", borderRadius: 3 }} />
          </div>
          <div style={{ width: "11%", height: "11%", background: "linear-gradient(90deg,#2a2522,#46403c,#2a2522)" }} />
          <div style={{ width: "24%", height: "4%", background: "linear-gradient(90deg,#26211e,#4a433e,#26211e)", borderRadius: 2 }} />
          <div style={{ position: "relative", width: "42%", height: "54%", background: "linear-gradient(95deg,#8a4524,#b9663a 38%,#8a4524 72%,#6e3519)", borderRadius: "7px 7px 11px 11px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: "14%", width: "14%", height: "100%", background: "linear-gradient(90deg,rgba(255,255,255,0.42),rgba(255,255,255,0))" }} />
            <div style={{ position: "absolute", left: "8%", right: "8%", top: "26%", bottom: "14%", background: "linear-gradient(180deg,#fffdfb,#f7ede2)", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5%", padding: "6% 4%" }}>
              <div className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(8px, 0.8vw, 12px)", letterSpacing: "0.12em", color: "#b9863f", lineHeight: 1 }}>DERMIVA</div>
              <div style={{ width: "58%", height: 1, background: "#e6cfa3" }} />
              <div style={{ fontFamily: "var(--font-jost),sans-serif", fontSize: "clamp(6px, 0.58vw, 9px)", color: "#8a7a6a", textAlign: "center", lineHeight: 1.1 }}>{label}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // serum (default)
  return (
    <div style={wrap}>
      <div style={{ width: "70%", height: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", filter: "drop-shadow(0 14px 18px rgba(120,70,40,0.22))" }}>
        <div style={{ width: "9%", paddingBottom: "9%", background: "linear-gradient(160deg,#f4d9b8,#d9a878)", borderRadius: "50% 50% 45% 45%" }} />
        <div style={{ width: "26%", height: "18%", background: "linear-gradient(155deg,#3a3330,#1d1a18)", borderRadius: "4px 4px 2px 2px" }} />
        <div style={{ width: "18%", height: "6%", background: "linear-gradient(90deg,#7a3f22,#a05a30,#7a3f22)" }} />
        <div style={{ position: "relative", width: "42%", height: "50%", background: "linear-gradient(95deg,#8a4524,#b9663a 38%,#8a4524 72%,#6e3519)", borderRadius: "10px 10px 11px 11px", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "14%", width: "14%", height: "100%", background: "linear-gradient(90deg,rgba(255,255,255,0.42),rgba(255,255,255,0))" }} />
          <div style={{ position: "absolute", left: "8%", right: "8%", top: "24%", bottom: "14%", background: "linear-gradient(180deg,#fffdfb,#f7ede2)", borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4%", padding: "6% 4%" }}>
            <div className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(8px, 0.82vw, 12px)", letterSpacing: "0.12em", color: "#b9863f", lineHeight: 1 }}>DERMIVA</div>
            <div style={{ width: "60%", height: 1, background: "#e6cfa3" }} />
            <div style={{ fontFamily: "var(--font-jost),sans-serif", fontSize: "clamp(6px, 0.6vw, 9px)", color: "#8a7a6a", textAlign: "center", lineHeight: 1.1 }}>{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
