"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { SearchIcon, AccountIcon, HeartIcon, CartIcon } from "./icons";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Face", href: "/category/face" },
  { label: "Hair", href: "/category/hair" },
  { label: "Body", href: "/category/body" },
  { label: "Lip", href: "/category/lip" },
  { label: "About", href: "/about" },
];

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

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span style={{ position: "absolute", top: 4, right: 4, background: "#c07f8d", color: "#fff", fontSize: 10, minWidth: 16, height: 16, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", fontWeight: 600 }}>
      {count}
    </span>
  );
}

export default function SiteHeader() {
  const router = useRouter();
  const { cartCount, wishlist, loggedIn } = useStore();
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

  const accountHref = loggedIn ? "/account" : "/login";

  return (
    <>
      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: "linear-gradient(90deg,#b9818d,#a86f7c)", color: "#fff7f3", textAlign: "center", fontSize: 13, letterSpacing: ".08em", padding: "9px 16px", fontWeight: 500 }}>
        <span style={{ color: "#f3d9b0" }}>✦</span>&nbsp; EID OFFERS ARE HERE! ENJOY UP TO 30% OFF &nbsp;<span style={{ color: "#f3d9b0" }}>✦</span>
      </div>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(253,246,244,.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #f0dde1" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 clamp(16px,4vw,40px)", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <button aria-label="Open menu" ref={menuButtonRef} onClick={() => setMenuOpen(true)} className="dm-burger" style={{ background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
              <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
              <span style={{ width: 22, height: 2, background: "#7c5f64", borderRadius: 2, display: "block" }} />
            </div>
          </button>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <Image
              src="/brand/dermiva-logo.webp"
              alt="Dermiva"
              width={42}
              height={42}
              style={{ objectFit: "contain" }}
              priority
            />
            <span className="dm-serif dm-logo-text" style={{ fontWeight: 700, fontSize: 25, letterSpacing: ".22em", color: "#c0934a" }}>DERMIVA</span>
          </Link>

          <nav className="dm-nav">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="dm-navlink">
                {n.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button aria-label="Search" title="Search" className="dm-icon-btn" onClick={() => router.push("/search")}>
              <SearchIcon />
            </button>
            <button aria-label="Account" title="Account" className="dm-icon-btn dm-header-desktop-only" onClick={() => router.push(accountHref)}>
              <AccountIcon />
            </button>
            <button aria-label="Wishlist" title="Wishlist" className="dm-icon-btn dm-header-desktop-only" onClick={() => router.push("/wishlist")}>
              <HeartIcon />
              <Badge count={wishlist.length} />
            </button>
            <button aria-label="Cart" title="Cart" className="dm-icon-btn" onClick={() => router.push("/cart")}>
              <CartIcon />
              <Badge count={cartCount} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {menuOpen ? (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(80,55,60,.4)", backdropFilter: "blur(2px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "min(80vw,320px)", background: "#fdf6f4", boxShadow: "6px 0 30px rgba(120,80,90,.2)", padding: 24, display: "flex", flexDirection: "column", gap: 4, animation: "dmFade .25s ease", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Image
                  src="/brand/dermiva-logo.webp"
                  alt="Dermiva"
                  width={36}
                  height={36}
                  style={{ objectFit: "contain" }}
                />
                <span className="dm-serif" style={{ fontWeight: 700, fontSize: 22, letterSpacing: ".2em", color: "#c0934a" }}>DERMIVA</span>
              </div>
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
      ) : null}
    </>
  );
}
