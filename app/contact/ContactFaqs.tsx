"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/catalog";

export default function ContactFaqs() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
      <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>Frequently Asked Questions</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {FAQS.map((faq, i) => {
          const active = activeFaq === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid #f5eef0", paddingBottom: 12 }}>
              <button
                onClick={() => toggleFaq(i)}
                style={{ width: "100%", border: "none", background: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", padding: "12px 8px", fontSize: 15, fontWeight: 600, color: "#4f3a3e", fontFamily: "var(--font-jost),sans-serif" }}
              >
                <span>{faq.q}</span>
                <span style={{ color: "#b76e79", fontSize: 16, fontWeight: 700 }}>{active ? "−" : "+"}</span>
              </button>
              {active && (
                <div className="dm-fade" style={{ marginTop: 8, fontSize: 14, color: "#7c6065", lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
