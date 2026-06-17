import React from "react";
import Link from "next/link";
import { LogoMark } from "./icons";
import MobileMenu from "./MobileMenu";
import HeaderActions from "./HeaderActions";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Face", href: "/category/face" },
  { label: "Hair", href: "/category/hair" },
  { label: "Body", href: "/category/body" },
  { label: "Lip", href: "/category/lip" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: "linear-gradient(90deg,#b9818d,#a86f7c)", color: "#fff7f3", textAlign: "center", fontSize: 13, letterSpacing: ".08em", padding: "9px 16px", fontWeight: 500 }}>
        <span style={{ color: "#f3d9b0" }}>✦</span>&nbsp; EID OFFERS ARE HERE! ENJOY UP TO 30% OFF &nbsp;<span style={{ color: "#f3d9b0" }}>✦</span>
      </div>

      {/* HEADER */}
      <header className="dm-site-header">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 clamp(16px,4vw,40px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <MobileMenu />

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <LogoMark width={42} height={42} />
            <span className="dm-serif dm-logo-text" style={{ fontWeight: 700, fontSize: 25, letterSpacing: ".22em", color: "#c0934a" }}>DERMIVA</span>
          </Link>

          <nav className="dm-nav">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="dm-navlink">
                {n.label}
              </Link>
            ))}
          </nav>

          <HeaderActions />
        </div>
      </header>
    </>
  );
}
