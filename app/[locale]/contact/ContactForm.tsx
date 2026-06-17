"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useToast } from "@/lib/store";
import { trackEvent } from "@/lib/analytics/analytics";

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const route = usePathname();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = t("formErrorName");
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = t("formErrorEmail");
    if (!message.trim() || message.trim().length < 10) newErrors.message = t("formErrorMessage");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("fixErrors");
      return;
    }

    showToast("messageSent");
    trackEvent("contact_submit", { locale, route, status: "success" });
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
      <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>{t("formTitle")}</h3>
      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-name" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("formName")} *</label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
            placeholder={`${t("formName")} *`}
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.name ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
          {errors.name ? <div id="contact-name-error" role="alert" style={{ fontSize: 11.5, color: "#b94f4f", marginTop: 4 }}>{errors.name}</div> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-email" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("formEmail")} *</label>
          <input
            id="contact-email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
            placeholder={`${t("formEmail")} *`}
            type="email"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.email ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
          {errors.email ? <div id="contact-email-error" role="alert" style={{ fontSize: 11.5, color: "#b94f4f", marginTop: 4 }}>{errors.email}</div> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-subject" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("formSubject")}</label>
          <input
            id="contact-subject"
            type="text"
            autoComplete="off"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t("formSubject")}
            style={{ width: "100%", background: "#fdf6f4", border: "1px solid #e3c3cc", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-message" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>{t("formMessage")} *</label>
          <textarea
            id="contact-message"
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: undefined })); }}
            placeholder={t("formMessagePlaceholder")}
            rows={4}
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.message ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif", resize: "vertical" }}
          />
          {errors.message ? <div id="contact-message-error" role="alert" style={{ fontSize: 11.5, color: "#b94f4f", marginTop: 4 }}>{errors.message}</div> : null}
        </div>

        <button type="submit" className="dm-btn-primary" style={{ padding: "13px 0", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
          {t("formSend")}
        </button>
      </form>
    </div>
  );
}
