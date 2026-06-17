import React from "react";
import Link from "next/link";

// Global fallback for paths that never reach a locale segment. In-locale 404s
// are handled by the localized app/[locale]/not-found.tsx. Because the root
// layout is a pass-through, this page renders its own <html>/<body>.
export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#fdf6f4",
          color: "#5a4145",
          textAlign: "center",
          padding: "40px 16px",
        }}
      >
        <div>
          <h1 style={{ fontSize: 40, margin: "0 0 10px" }}>404</h1>
          <p style={{ fontSize: 16, color: "#a98e93", margin: "0 0 24px" }}>
            This page could not be found.
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg,#d79aa6,#bd7382)",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 30px",
              borderRadius: 999,
              fontSize: 14,
            }}
          >
            Back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
