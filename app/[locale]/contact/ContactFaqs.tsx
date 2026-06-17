"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { buildFaqVMs } from "@/lib/view-models/faq.vm";
import type { Locale } from "@/i18n/routing";

export default function ContactFaqs() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const faqs = buildFaqVMs(locale);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
      <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>{t("faqsTitle")}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((faq, i) => {
          const active = activeFaq === i;
          const buttonId = `contact-faq-button-${i}`;
          const panelId = `contact-faq-panel-${i}`;
          return (
            <div key={i} style={{ borderBottom: "1px solid #f5eef0", paddingBottom: 12 }}>
              <button
                id={buttonId}
                type="button"
                aria-expanded={active}
                aria-controls={panelId}
                onClick={() => toggleFaq(i)}
                style={{ width: "100%", border: "none", background: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "start", padding: "12px 8px", fontSize: 15, fontWeight: 600, color: "#4f3a3e", fontFamily: "var(--font-jost),sans-serif" }}
              >
                <span>{faq.q}</span>
                <span aria-hidden="true" style={{ color: "#b76e79", fontSize: 16, fontWeight: 700 }}>{active ? "−" : "+"}</span>
              </button>
              {active && (
                <div id={panelId} role="region" aria-labelledby={buttonId} className="dm-fade" style={{ marginTop: 8, fontSize: 14, color: "#7c6065", lineHeight: 1.6 }}>
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
