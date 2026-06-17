"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, useToast } from "@/lib/store";

export default function LoginForm() {
  const router = useRouter();
  const { login, loggedIn } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      router.push("/account");
    }
  }, [loggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      showToast("Invalid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      showToast("Password too short");
      return;
    }

    const inferredName = email.split("@")[0];
    const capitalizedName = inferredName.charAt(0).toUpperCase() + inferredName.slice(1);

    login(email, capitalizedName);
    router.push("/account");
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 24, padding: "clamp(24px,5vw,40px)", boxShadow: "0 12px 36px rgba(184,134,146,.12)" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: 32, color: "#5a4145", margin: "0 0 8px" }}>Welcome Back</h1>
        <p style={{ fontSize: 14, color: "#a98e93", margin: 0 }}>Sign in to access your orders, wishlist & addresses.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label htmlFor="email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7c6065", marginBottom: 6, letterSpacing: ".02em" }}>Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="e.g. name@example.com"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${error && !email ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7c6065", marginBottom: 6, letterSpacing: ".02em" }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="••••••••"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${error && password.length < 6 ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

        {error ? (
          <div style={{ fontSize: 13, color: "#cf6b6b", textAlign: "center", background: "#fff5f5", borderRadius: 8, padding: "8px 12px", border: "1px solid #fce8e8" }}>
            {error}
          </div>
        ) : null}

        <button type="submit" className="dm-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "15px 0", marginTop: 6 }}>
          Sign In
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: 24, fontSize: 13.5, color: "#7c6065", borderTop: "1px solid #f0dde1", paddingTop: 20 }}>
        Don&apos;t have an account?{" "}
        <Link href="/register" style={{ color: "#b76e79", fontWeight: 600, textDecoration: "underline" }}>
          Create one
        </Link>
      </div>
    </div>
  );
}
