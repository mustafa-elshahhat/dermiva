import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ToastHost from "@/components/ToastHost";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dermiva.vercel.app"),
  title: "Dermiva — Science-Driven Skincare",
  description: "A blend of clean, effective skincare for healthy, radiant skin — made with care in Egypt.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/brand/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/brand/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/brand/icon-180.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Dermiva — Science-Driven Skincare",
    description: "A blend of clean, effective skincare for healthy, radiant skin — made with care in Egypt.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dermiva Skincare",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <StoreProvider>
          <div className="dm-page-shell">
            <SiteHeader />
            <main style={{ flex: 1 }}>{children}</main>
            <SiteFooter />
          </div>
          <ToastHost />
        </StoreProvider>
      </body>
    </html>
  );
}
