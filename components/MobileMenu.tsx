"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import BrandLogo from "./BrandLogo";
import LanguageSwitcher from "./LanguageSwitcher";
import NavLink from "./NavLink";

const DRAWER_LINKS = [
  { key: "home", href: "/" },
  { key: "shopAll", href: "/shop" },
  { key: "faceCare", href: "/category/face" },
  { key: "hairCare", href: "/category/hair" },
  { key: "bodyCare", href: "/category/body" },
  { key: "lipCare", href: "/category/lip" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
  { key: "myWishlist", href: "/wishlist" },
  { key: "myAccount", href: "/account" },
] as const;

export default function MobileMenu() {
  const t = useTranslations("nav");
  const drawerId = "mobile-navigation-menu";
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
      wasOpen.current = true;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else if (wasOpen.current) {
      menuButtonRef.current?.focus();
      wasOpen.current = false;
    }
  }, [menuOpen]);

  return (
    <>
      <button
        aria-label={t("openMenu")}
        aria-expanded={menuOpen}
        aria-controls={drawerId}
        aria-haspopup="dialog"
        ref={menuButtonRef}
        onClick={() => setMenuOpen(true)}
        className="dm-burger"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
      >
          <div aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
          <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
          <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
        </div>
      </button>

      {menuOpen && mounted && createPortal(
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, height: "100dvh", zIndex: 1000, background: "rgba(80,55,60,.4)", backdropFilter: "blur(2px)" }}
        >
          <div
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label={t("openMenu")}
            onClick={(e) => e.stopPropagation()}
            className="dm-drawer"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "min(80vw,320px)",
              height: "100dvh",
              maxHeight: "100dvh",
              background: "#fdf6f4",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              animation: "dmFade .25s ease",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label={t("homeAria")} style={{ display: "flex", alignItems: "center" }}>
                <BrandLogo height={44} />
              </Link>
              <button
                ref={closeButtonRef}
                aria-label={t("closeMenu")}
                onClick={() => setMenuOpen(false)}
                className="dm-icon-btn"
                style={{ width: 44, height: 44, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", color: "#7c5f64" }}
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            {DRAWER_LINKS.map((l, i) => (
              <NavLink
                key={l.href + i}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ cursor: "pointer", padding: "13px 8px", borderBottom: i < DRAWER_LINKS.length - 1 ? "1px solid #f0dde1" : "none", fontSize: 15, color: "#5a4145" }}
              >
                {t(l.key)}
              </NavLink>
            ))}
            <div style={{ marginTop: 16 }}>
              <LanguageSwitcher compact />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
