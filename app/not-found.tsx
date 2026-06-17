"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Bottle from "@/components/Bottle";

export default function NotFound() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="dm-fade" style={{ minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 28, padding: "clamp(32px,5vw,56px) clamp(20px,5vw,44px)", maxWidth: 580, width: "100%", textAlign: "center", boxShadow: "0 16px 40px rgba(184,134,146,.12)" }}>
        
        {/* CSS Bottle with 404 styling */}
        <div style={{ height: 160, width: 120, margin: "0 auto 24px", position: "relative" }}>
          <Bottle kind="serum" name="404" />
        </div>

        <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(30px,4.5vw,42px)", color: "#5a4145", margin: "0 0 10px", lineHeight: 1.1 }}>
          Lost in the Glow?
        </h1>
        <p style={{ fontSize: 14.5, color: "#a98e93", maxWidth: 440, margin: "0 auto 24px", lineHeight: 1.6 }}>
          We couldn&apos;t find the page you were looking for. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Search Helper */}
        <form onSubmit={handleSearchSubmit} style={{ position: "relative", maxWidth: 420, margin: "0 auto 28px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for serums, oils..."
            style={{ width: "100%", border: "1px solid #efd9df", background: "#fdf6f4", borderRadius: 999, padding: "13px 20px 13px 48px", fontSize: 13.5, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145", boxSizing: "border-box" }}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b89ca1" strokeWidth={2} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
        </form>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="dm-btn-primary" style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "12px 30px" }}>
            Back to Home
          </Link>
          <Link href="/shop" className="dm-btn-outline" style={{ display: "block", fontSize: 13, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "11px 30px" }}>
            Explore Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
