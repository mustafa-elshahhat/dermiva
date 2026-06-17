"use client";

import React, { useState } from "react";
import { useToast } from "@/lib/store";

export default function SubscribeForm() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const onSubscribe = () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      showToast("Please enter a valid email address");
      return;
    }
    showToast("Subscribed! Welcome to Dermiva");
    setEmail("");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 460, margin: "0 auto" }}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{ flex: "1 1 220px", minWidth: 180, border: "1px solid #e3c3cc", background: "#fff", borderRadius: 999, padding: "14px 22px", fontSize: 14, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }}
      />
      <button onClick={onSubscribe} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 14, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>Subscribe</button>
    </div>
  );
}
