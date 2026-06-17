"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "./BrandLogo";
import { PAYMENT_METHODS } from "@/lib/payments";
import { SOCIAL_LINKS } from "@/lib/social";

const LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Shop All", href: "/shop" },
  { label: "FAQs", href: "/contact" },
  { label: "Shipping Policy", href: "/policy/shipping" },
  { label: "Returns", href: "/policy/returns" },
  { label: "Privacy", href: "/policy/privacy" },
  { label: "Terms", href: "/policy/terms" },
  { label: "Contact Us", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer style={{ background: "#fdf6f4", borderTop: "1px solid #f0dde1" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(32px,4vw,48px) clamp(16px,4vw,40px) 20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <Link href="/" aria-label="Dermiva home" style={{ display: "inline-flex" }}>
            <BrandLogo height={64} />
          </Link>
        </div>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 13, color: "#a98e93", letterSpacing: ".1em", marginBottom: 12 }}>WE ACCEPT</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {PAYMENT_METHODS.map((pm) => (
              <div
                key={pm.id}
                style={{
                  background: "#fff",
                  border: "1px solid #f0dde1",
                  borderRadius: 12,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  transition: "box-shadow .2s, border-color .2s",
                }}
                className="dm-payment-badge"
              >
                <Image
                  src={pm.image}
                  alt={pm.label}
                  width={32}
                  height={32}
                  style={{ objectFit: "contain", flexShrink: 0 }}
                />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#8a7378", letterSpacing: ".04em", whiteSpace: "nowrap" }}>
                  {pm.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 28px", justifyContent: "center", padding: "22px 0", borderTop: "1px solid #f0dde1", borderBottom: "1px solid #f0dde1" }}>
          {LINKS.map((l, i) => (
            <Link key={l.href + i} href={l.href} className="dm-footlink">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="dm-footer-bottom" style={{ paddingTop: 18 }}>
          <div style={{ fontSize: 12, color: "#a98e93" }}>© 2026 Dermiva. All rights reserved. Made in Egypt.</div>
          <div className="dm-footer-social">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Dermiva on ${s.label}`}
                className="dm-social-icon"
                style={{ width: 34, height: 34, borderRadius: "50%", background: "#f3dde2", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.icon}
                  alt={s.label}
                  width={20}
                  height={20}
                  style={{ objectFit: "contain", display: "block" }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
