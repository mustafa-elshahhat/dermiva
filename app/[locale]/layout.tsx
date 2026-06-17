import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import { routing, type Locale } from "@/i18n/routing";
import { getDirection } from "@/i18n/direction";
import { getSiteUrl } from "@/lib/seo/url";
import { routes } from "@/lib/seo/routes";
import { buildLocalizedAlternates } from "@/lib/seo/metadata";
import { buildOpenGraph, buildTwitter } from "@/lib/seo/open-graph";
import { buildIndexRobots } from "@/lib/seo/robots";
import { JsonLdScript } from "@/lib/seo/structured-data-script";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/structured-data";
import { StoreProvider } from "@/lib/store";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ToastHost from "@/components/ToastHost";

const cormorant = localFont({
  src: [
    {
      path: "../../public/fonts/cormorant-garamond/cormorant-garamond-v21-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/cormorant-garamond/cormorant-garamond-v21-latin-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = localFont({
  src: [
    {
      path: "../../public/fonts/jost/jost-v20-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/jost/jost-v20-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/jost/jost-v20-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-jost",
  display: "swap",
});

// Arabic-capable font, applied only under /ar via CSS (html[lang="ar"]).
const ibmArabic = localFont({
  src: [
    {
      path: "../../public/fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-v15-arabic-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-v15-arabic-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-v15-arabic-600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-v15-arabic-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "seo" });

  const defaultTitle = t("defaultTitle");
  const defaultDescription = t("defaultDescription");

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: defaultTitle,
      template: `%s — ${t("siteName")}`,
    },
    description: defaultDescription,
    // Site-wide defaults; inner pages override per route. The home page is
    // covered entirely by these defaults (no separate home generateMetadata).
    alternates: buildLocalizedAlternates(locale, routes.home()),
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
    // defaultTitle already contains the brand name, so it is used as-is (no
    // extra " — Dermiva" suffix) for the social title.
    openGraph: buildOpenGraph({
      locale,
      title: defaultTitle,
      description: defaultDescription,
      path: routes.home(),
      ogAlt: t("ogAlt"),
    }),
    twitter: buildTwitter({
      title: defaultTitle,
      description: defaultDescription,
    }),
    robots: buildIndexRobots(),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!hasLocale(routing.locales, localeParam)) {
    notFound();
  }
  const locale = localeParam as Locale;

  // Enable static rendering for this locale.
  setRequestLocale(locale);

  const messages = await getMessages();
  const globalJsonLd = [
    buildOrganizationJsonLd(locale),
    buildWebSiteJsonLd(locale),
  ];

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${cormorant.variable} ${jost.variable} ${ibmArabic.variable}`}
    >
      <body>
        <JsonLdScript data={globalJsonLd} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <div className="dm-page-shell">
              <SiteHeader />
              <main style={{ flex: 1 }}>{children}</main>
              <SiteFooter />
            </div>
            <ToastHost />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
