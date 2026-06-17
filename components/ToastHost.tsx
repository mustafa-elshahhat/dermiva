"use client";

import React from "react";
import { useToast } from "@/lib/store";

export default function ToastHost() {
  const { toast } = useToast();
  if (!toast) return null;
  return (
    <div
      style={{ position: "fixed", bottom: 26, left: "50%", transform: "translateX(-50%)", zIndex: 90, background: "#5a4145", color: "#fff", padding: "13px 26px", borderRadius: 999, fontSize: 14, boxShadow: "0 12px 30px rgba(90,65,69,.4)", animation: "dmToast .3s ease", display: "flex", alignItems: "center", gap: 9 }}
    >
      <span style={{ color: "#f3d9b0" }}>✓</span>
      {toast}
    </div>
  );
}
