"use client";

import React, { useState } from "react";
import { useToast } from "@/lib/store";

export default function ContactForm() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Valid email is required";
    if (!message.trim() || message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the errors in the form");
      return;
    }

    showToast("Message sent! We'll reply soon");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
      <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>Send us a message</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-name" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Your Name *</label>
          <input
            id="contact-name"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
            placeholder="Your Name *"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.name ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
          {errors.name ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 4 }}>{errors.name}</div> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-email" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Your Email *</label>
          <input
            id="contact-email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
            placeholder="Your Email *"
            type="email"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.email ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
          {errors.email ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 4 }}>{errors.email}</div> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-subject" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Subject (Optional)</label>
          <input
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject (Optional)"
            style={{ width: "100%", background: "#fdf6f4", border: "1px solid #e3c3cc", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label htmlFor="contact-message" style={{ fontSize: 13, fontWeight: 500, color: "#7c6065" }}>Your Message *</label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: undefined })); }}
            placeholder="Your Message * (Min. 10 characters)"
            rows={4}
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.message ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif", resize: "vertical" }}
          />
          {errors.message ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 4 }}>{errors.message}</div> : null}
        </div>

        <button type="submit" className="dm-btn-primary" style={{ padding: "13px 0", fontSize: 14, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
          Send Message
        </button>
      </form>
    </div>
  );
}
