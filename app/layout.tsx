import type { ReactNode } from "react";

// The <html>/<body> shell, fonts, direction and providers live in the localized
// layout at app/[locale]/layout.tsx. This root layout is a required pass-through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
