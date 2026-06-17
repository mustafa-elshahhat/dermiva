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

export default function Bottle({ kind = "serum", name = "DERMIVA", light = false }: { kind?: BottleKind; name?: string; light?: boolean }) {
  const label = name || "DERMIVA";

  if (light) {
    if (kind === "jar") {
      return (
        <div style={wrap}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 10px rgba(150,120,60,0.15))" }}>
            <rect x="25" y="22" width="50" height="12" rx="3" fill="url(#jarCap)" />
            <rect x="23" y="37" width="54" height="42" rx="6" fill="url(#jarBody)" stroke="#ecd5b5" strokeWidth="0.5" />
            <text x="50" y="54" textAnchor="middle" fill="#b9863f" fontSize="7" fontWeight="bold" fontFamily="var(--font-cormorant)">DERMIVA</text>
            <line x1="35" y1="58" x2="65" y2="58" stroke="#e6cfa3" strokeWidth="0.5" />
            <text x="50" y="67" textAnchor="middle" fill="#8a7a6a" fontSize="5.5" fontFamily="var(--font-jost)">{label}</text>
            <defs>
              <linearGradient id="jarCap" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e8c878" />
                <stop offset="50%" stopColor="#f1d99a" />
                <stop offset="100%" stopColor="#b8852f" />
              </linearGradient>
              <linearGradient id="jarBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f3ead9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    if (kind === "tube") {
      return (
        <div style={wrap}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 10px rgba(190,120,140,0.15))" }}>
            <path d="M38 12 H62 L66 74 C66 74 66 78 62 78 H38 C34 78 34 74 34 74 Z" fill="url(#tubeBody)" />
            <rect x="44" y="78" width="12" height="12" rx="1.5" fill="url(#tubeCap)" />
            <text x="50" y="38" textAnchor="middle" fill="#c98aa0" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-cormorant)">DERMIVA</text>
            <line x1="40" y1="44" x2="60" y2="44" stroke="#eccdd8" strokeWidth="0.5" />
            <text x="50" y="53" textAnchor="middle" fill="#a98090" fontSize="5.5" fontFamily="var(--font-jost)">{label}</text>
            <defs>
              <linearGradient id="tubeBody" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f7dbe4" />
                <stop offset="100%" stopColor="#f0c9d6" />
              </linearGradient>
              <linearGradient id="tubeCap" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f3c4d2" />
                <stop offset="100%" stopColor="#d886a0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    if (kind === "pump") {
      return (
        <div style={wrap}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 10px rgba(120,70,40,0.15))" }}>
            <rect x="36" y="14" width="28" height="6" fill="#2a2522" />
            <rect x="46" y="20" width="8" height="14" fill="#46403c" />
            <rect x="32" y="34" width="36" height="56" rx="8" fill="url(#pumpBody)" />
            <rect x="37" y="44" width="26" height="40" rx="3" fill="url(#pumpLabel)" />
            <text x="50" y="58" textAnchor="middle" fill="#b9863f" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-cormorant)">DERMIVA</text>
            <line x1="42" y1="63" x2="58" y2="63" stroke="#e6cfa3" strokeWidth="0.5" />
            <text x="50" y="73" textAnchor="middle" fill="#8a7a6a" fontSize="5.5" fontFamily="var(--font-jost)">{label}</text>
            <defs>
              <linearGradient id="pumpBody" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8a4524" />
                <stop offset="50%" stopColor="#b9663a" />
                <stop offset="100%" stopColor="#6e3519" />
              </linearGradient>
              <linearGradient id="pumpLabel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffdfb" />
                <stop offset="100%" stopColor="#f7ede2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      );
    }

    // serum
    return (
      <div style={wrap}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 10px rgba(120,70,40,0.15))" }}>
          <path d="M44 14 C44 11 56 11 56 14 Z" fill="url(#serumDropper)" />
          <rect x="38" y="16" width="24" height="14" rx="2" fill="#2a2522" />
          <rect x="42" y="30" width="16" height="6" fill="#a05a30" />
          <rect x="32" y="36" width="36" height="54" rx="8" fill="url(#serumBody)" />
          <rect x="37" y="46" width="26" height="38" rx="3" fill="url(#serumLabel)" />
          <text x="50" y="60" textAnchor="middle" fill="#b9863f" fontSize="7.5" fontWeight="bold" fontFamily="var(--font-cormorant)">DERMIVA</text>
          <line x1="42" y1="65" x2="58" y2="65" stroke="#e6cfa3" strokeWidth="0.5" />
          <text x="50" y="74" textAnchor="middle" fill="#8a7a6a" fontSize="5.5" fontFamily="var(--font-jost)">{label}</text>
          <defs>
            <linearGradient id="serumDropper" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f4d9b8" />
              <stop offset="100%" stopColor="#d9a878" />
            </linearGradient>
            <linearGradient id="serumBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8a4524" />
              <stop offset="50%" stopColor="#b9663a" />
              <stop offset="100%" stopColor="#6e3519" />
            </linearGradient>
            <linearGradient id="serumLabel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fffdfb" />
              <stop offset="100%" stopColor="#f7ede2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

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
