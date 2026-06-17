import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandLogo from "./BrandLogo";
import MobileMenu from "./MobileMenu";
import HeaderActions from "./HeaderActions";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV = [
  { key: "home", href: "/" },
  { key: "shop", href: "/shop" },
  { key: "face", href: "/category/face" },
  { key: "hair", href: "/category/hair" },
  { key: "body", href: "/category/body" },
  { key: "lip", href: "/category/lip" },
  { key: "about", href: "/about" },
] as const;

export default function SiteHeader() {
  const t = useTranslations("nav");
  const tAnn = useTranslations("announcement");

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: "linear-gradient(90deg,#b9818d,#a86f7c)", color: "#fff7f3", textAlign: "center", fontSize: 13, letterSpacing: ".08em", padding: "9px 16px", fontWeight: 500 }}>
        <span style={{ color: "#f3d9b0" }}>✦</span>&nbsp; {tAnn("text")} &nbsp;<span style={{ color: "#f3d9b0" }}>✦</span>
      </div>

      {/* HEADER */}
      <header className="dm-site-header">
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 clamp(16px,4vw,40px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <MobileMenu />

          <Link href="/" aria-label={t("homeAria")} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <BrandLogo height={52} priority />
          </Link>

          <nav className="dm-nav">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="dm-navlink">
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="dm-header-desktop-only">
              <LanguageSwitcher />
            </span>
            <HeaderActions />
          </div>
        </div>
      </header>
    </>
  );
}
