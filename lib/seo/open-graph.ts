// Open Graph + Twitter metadata builders. Each returns a *complete* object,
// because Next.js replaces (does not deep-merge) nested metadata fields when a
// child segment redefines them.

import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import {
  DEFAULT_OG_IMAGE,
  OG_LOCALE,
  SITE_NAME,
  alternateOgLocale,
} from "./config";
import { localizedPath } from "./url";

type OpenGraphMetadata = NonNullable<Metadata["openGraph"]>;
type TwitterMetadata = NonNullable<Metadata["twitter"]>;

export interface OgImageInput {
  url: string;
  width?: number;
  height?: number;
  alt: string;
}

export interface OpenGraphInput {
  locale: Locale;
  /** Final, display-ready title (brand suffix already applied by the caller). */
  title: string;
  description: string;
  /** Locale-agnostic route path; the OG url always matches the canonical URL. */
  path: string;
  /** Alt text for the default brand image. */
  ogAlt: string;
  /** Optional image override (otherwise the brand OG image is used). */
  image?: OgImageInput;
}

export function buildOpenGraph({
  locale,
  title,
  description,
  path,
  ogAlt,
  image,
}: OpenGraphInput): OpenGraphMetadata {
  const ogImage: OgImageInput = image ?? { ...DEFAULT_OG_IMAGE, alt: ogAlt };
  return {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url: localizedPath(locale, path),
    locale: OG_LOCALE[locale],
    alternateLocale: alternateOgLocale(locale),
    images: [ogImage],
  };
}

export interface TwitterInput {
  /** Final, display-ready title (brand suffix already applied by the caller). */
  title: string;
  description: string;
  image?: OgImageInput;
}

export function buildTwitter({
  title,
  description,
  image,
}: TwitterInput): TwitterMetadata {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [(image ?? DEFAULT_OG_IMAGE).url],
  };
}
