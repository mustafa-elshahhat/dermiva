// High-level metadata orchestrator. Pages call these builders so canonical /
// hreflang / Open Graph / Twitter / robots are constructed consistently in one
// place.

import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import type { ProductViewModel } from "@/lib/types/product";
import type { CategoryViewModel } from "@/lib/types/category";
import type { PolicyViewModel } from "@/lib/types/policy";
import { localizedPath } from "./url";
import { routes } from "./routes";
import { truncate, withSiteName } from "./text";
import { buildOpenGraph, buildTwitter, type OgImageInput } from "./open-graph";
import { buildIndexRobots, buildNoIndexRobots } from "./robots";

type Alternates = NonNullable<Metadata["alternates"]>;

/**
 * Self-referencing canonical + en/ar/x-default hreflang alternates for a given
 * locale-agnostic route path. x-default points at the English equivalent of the
 * *same* route (never the homepage).
 */
export function buildLocalizedAlternates(
  locale: Locale,
  path: string,
): Alternates {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      en: `/en${path}`,
      ar: `/ar${path}`,
      "x-default": `/en${path}`,
    },
  };
}

export interface PageMetadataInput {
  locale: Locale;
  /** Locale-agnostic route path (leading slash, "" for home). */
  path: string;
  /** Bare page title (no brand suffix); the layout template adds " — Dermiva". */
  title: string;
  description: string;
  /** Whether the page should be indexed by search engines. */
  index: boolean;
  /** Alt text for the brand OG image. */
  ogAlt: string;
  /** Optional OG/Twitter image override (defaults to the brand image). */
  image?: OgImageInput;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  index,
  ogAlt,
  image,
}: PageMetadataInput): Metadata {
  const desc = truncate(description);
  const ogTitle = withSiteName(title);
  return {
    // Absolute title (brand suffix already applied) so it stays correct
    // regardless of nesting depth — intermediate layouts that set a title would
    // otherwise consume the root layout's title.template for deeper segments.
    title: { absolute: ogTitle },
    description: desc,
    alternates: buildLocalizedAlternates(locale, path),
    openGraph: buildOpenGraph({
      locale,
      title: ogTitle,
      description: desc,
      path,
      ogAlt,
      image,
    }),
    twitter: buildTwitter({ title: ogTitle, description: desc, image }),
    robots: index ? buildIndexRobots() : buildNoIndexRobots(),
  };
}

export function buildProductMetadata(input: {
  locale: Locale;
  product: ProductViewModel;
  description: string;
  ogAlt: string;
}): Metadata {
  // Product names stay English in both locales; the localized description wraps
  // the English name.
  return buildPageMetadata({
    locale: input.locale,
    path: routes.product(input.product.id),
    title: input.product.name,
    description: input.description,
    index: true,
    ogAlt: input.ogAlt,
  });
}

export function buildCategoryMetadata(input: {
  locale: Locale;
  category: CategoryViewModel;
  ogAlt: string;
}): Metadata {
  const { category } = input;
  return buildPageMetadata({
    locale: input.locale,
    path: routes.category(category.key),
    title: category.label,
    description: category.content.desc || category.tagline,
    index: true,
    ogAlt: input.ogAlt,
  });
}

export function buildPolicyMetadata(input: {
  locale: Locale;
  policy: PolicyViewModel;
  ogAlt: string;
}): Metadata {
  const { policy } = input;
  return buildPageMetadata({
    locale: input.locale,
    path: routes.policy(policy.slug),
    title: policy.title,
    description: policy.intro,
    index: true,
    ogAlt: input.ogAlt,
  });
}
