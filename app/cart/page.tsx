import React from "react";
import CartContent from "./CartContent";

export default function CartPage() {
  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(20px,3vw,32px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 22px" }}>Shopping Cart</h1>
      <CartContent />
    </div>
  );
}
