import React from "react";
import WishlistContent from "./WishlistContent";

export default function WishlistPage() {
  return (
    <div className="dm-fade" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <div style={{ marginBottom: 8, fontSize: 12.5, color: "#a98e93" }}>Home / <span style={{ color: "#7c6065" }}>Wishlist</span></div>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>My Wishlist</h1>
      <WishlistContent />
    </div>
  );
}
