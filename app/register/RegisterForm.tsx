"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, useToast } from "@/lib/store";

export default function RegisterForm() {
  const router = useRouter();
  const { register, loggedIn } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loggedIn) {
      router.push("/account");
    }
  }, [loggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name");
      showToast("Name is required");
      return;
    }
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
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      showToast("Passwords mismatch");
      return;
    }

    register(email, name);
    router.push("/account");
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #f0dde1", borderRadius: 24, padding: "clamp(24px,5vw,40px)", boxShadow: "0 12px 36px rgba(184,134,146,.12)" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <h1 className="dm-serif" style={{ fontWeight: 700, fontSize: 32, color: "#5a4145", margin: "0 0 8px" }}>Create Account</h1>
        <p style={{ fontSize: 14, color: "#a98e93", margin: 0 }}>Join Dermiva and discover science-driven skincare.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label htmlFor="name" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7c6065", marginBottom: 6, letterSpacing: ".02em" }}>Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            placeholder="e.g. Jasmine Aly"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${error && !name ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

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
            placeholder="Min. 6 characters"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${error && password.length < 6 ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7c6065", marginBottom: 6, letterSpacing: ".02em" }}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
            placeholder="Re-enter password"
            style={{ width: "100%", background: "#fdf6f4", border: `1px solid ${error && password !== confirmPassword ? "#e6a3a3" : "#e3c3cc"}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: "#5a4145", fontFamily: "var(--font-jost),sans-serif" }}
          />
        </div>

        {error ? (
          <div style={{ fontSize: 13, color: "#cf6b6b", textAlign: "center", background: "#fff5f5", borderRadius: 8, padding: "8px 12px", border: "1px solid #fce8e8" }}>
            {error}
          </div>
        ) : null}

        <button type="submit" className="dm-btn-primary" style={{ width: "100%", fontSize: 14, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", padding: "15px 0", marginTop: 6 }}>
          Register
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: 24, fontSize: 13.5, color: "#7c6065", borderTop: "1px solid #f0dde1", paddingTop: 20 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#b76e79", fontWeight: 600, textDecoration: "underline" }}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
