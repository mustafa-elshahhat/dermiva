"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

const DRAWER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Face Care", href: "/category/face" },
  { label: "Hair Care", href: "/category/hair" },
  { label: "Body Care", href: "/category/body" },
  { label: "Lip Care", href: "/category/lip" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "My Wishlist", href: "/wishlist" },
  { label: "My Account", href: "/account" },
];

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

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
        aria-label="Open menu"
        ref={menuButtonRef}
        onClick={() => setMenuOpen(true)}
        className="dm-burger"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
          <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
          <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
        </div>
      </button>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(80,55,60,.4)", backdropFilter: "blur(2px)" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "min(80vw,320px)",
              background: "#fdf6f4",
              boxShadow: "6px 0 30px rgba(120,80,90,.2)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              animation: "dmFade .25s ease",
              overflowY: "auto"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Dermiva home" style={{ display: "flex", alignItems: "center" }}>
                <BrandLogo height={44} />
              </Link>
              <button
                ref={closeButtonRef}
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="dm-icon-btn"
                style={{ width: 44, height: 44, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", color: "#7c5f64" }}
              >
                ✕
              </button>
            </div>
            {DRAWER_LINKS.map((l, i) => (
              <Link
                key={l.href + i}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ cursor: "pointer", padding: "13px 8px", borderBottom: i < DRAWER_LINKS.length - 1 ? "1px solid #f0dde1" : "none", fontSize: 15, color: "#5a4145" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
