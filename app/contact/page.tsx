import React from "react";
import ContactForm from "./ContactForm";
import ContactFaqs from "./ContactFaqs";

export default function ContactPage() {
  return (
    <div className="dm-fade" style={{ maxWidth: 1100, margin: "0 auto", width: "100%", padding: "clamp(24px,4vw,40px) clamp(16px,4vw,40px) clamp(40px,5vw,64px)" }}>
      <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: "clamp(32px,4.5vw,46px)", color: "#5a4145", margin: "0 0 8px", textAlign: "center" }}>Contact &amp; Support</h1>
      <p style={{ fontSize: 14.5, color: "#a98e93", textAlign: "center", marginBottom: 36, maxWidth: 520, margin: "0 auto 36px" }}>
        Have questions about formulations, order shipping, or returns? We&apos;re here to help.
      </p>

      <div className="dm-grid-responsive-two-col" style={{ gap: 32, alignItems: "start" }}>
        {/* Contact Form & Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Form */}
          <ContactForm />

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

        {/* FAQs Accordion */}
        <ContactFaqs />
      </div>
    </div>
  );
}
