"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export default function ContactPage() {
  const { showToast } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 8px", textAlign: "center" }}>Contact &amp; Support</h1>
      <p style={{ fontSize: 14.5, color: "#a98e93", textAlign: "center", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
        Have questions about formulations, order shipping, or returns? We&apos;re here to help.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 32, alignItems: "start" }}>
        {/* Contact Form & Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Form */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>Send us a message</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
                  placeholder="Your Name *"
                  style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.name ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
                />
                {errors.name ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 4 }}>{errors.name}</div> : null}
              </div>

              <div>
                <input
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }}
                  placeholder="Your Email *"
                  type="email"
                  style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${errors.email ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
                />
                {errors.email ? <div style={{ fontSize: 11.5, color: "#cf6b6b", marginTop: 4 }}>{errors.email}</div> : null}
              </div>

              <div>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject (Optional)"
                  style={{ width: "100%", background: "#fdf6f4", border: "1px solid #e3c3cc", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
                />
              </div>

              <div>
                <textarea
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

          {/* Quick Info */}
          <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 20 }}>
            <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 20, color: "#5a4145", margin: "0 0 12px" }}>Direct Contact</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: "#7c6065" }}>
              <div>📞 <strong>Phone / WhatsApp:</strong> +20 100 123 4567</div>
              <div>✉ <strong>Email Support:</strong> support@dermiva.com</div>
              <div>📍 <strong>Address:</strong> Heliopolis, Cairo, Egypt</div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#a98e93" }}>Hours: Sunday - Thursday, 9:00 AM - 5:00 PM EET</div>
            </div>
          </div>
        </div>

        {/* Accordion FAQs */}
        <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 20, padding: 24 }}>
          <h3 className="dm-serif" style={{ fontWeight: 600, fontSize: 22, color: "#5a4145", margin: "0 0 16px" }}>Frequently Asked Questions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => {
              const active = activeFaq === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid #f5eef0", paddingBottom: 12 }}>
                  <button
                    onClick={() => toggleFaq(i)}
                    style={{ width: "100%", border: "none", background: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left", padding: "6px 0", fontSize: 15, fontWeight: 600, color: "#4f3a3e", fontFamily: "var(--font-jost),sans-serif" }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: "#b76e79", fontSize: 16, fontWeight: 700 }}>{active ? "−" : "+"}</span>
                  </button>
                  {active ? (
                    <div className="dm-fade" style={{ marginTop: 8, fontSize: 14, color: "#7c6065", lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
