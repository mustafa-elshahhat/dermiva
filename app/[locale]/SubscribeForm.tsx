"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useToast } from "@/lib/store";
import { trackEvent } from "@/lib/analytics/analytics";

export default function SubscribeForm() {
  const t = useTranslations("subscribe");
  const locale = useLocale();
  const route = usePathname();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const onSubscribe = () => {
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      showToast("subscribeInvalidEmail");
      return;
    }
    showToast("subscribed");
    trackEvent("newsletter_submit", { locale, route, status: "success" });
    setEmail("");
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxWidth: 460, margin: "0 auto" }}>
      <label htmlFor="newsletter-email" className="sr-only">{t("placeholder")}</label>
      <input
        id="newsletter-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        style={{ flex: "1 1 220px", minWidth: 180, border: "1px solid #e3c3cc", background: "#fff", borderRadius: 999, padding: "14px 22px", fontSize: 14, fontFamily: "var(--font-jost),sans-serif", color: "#5a4145" }}
      />
      <button onClick={onSubscribe} className="dm-btn-primary" style={{ boxShadow: "none", fontSize: 14, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", padding: "14px 30px" }}>{t("button")}</button>
    </div>
  );
}
