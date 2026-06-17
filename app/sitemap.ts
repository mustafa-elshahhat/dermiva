import type { MetadataRoute } from "next";

import { routing, type Locale } from "@/i18n/routing";
import { getSiteUrl, localizedPath } from "@/lib/seo/url";
import { routes } from "@/lib/seo/routes";
import { getAllProducts, getAllCategoryKeys } from "@/lib/mock/catalog.mock";
import { getAllPolicies } from "@/lib/mock/policies.mock";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** An indexable, locale-agnostic storefront route (leading slash, "" for home). */
interface IndexableRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

/** Absolute, locale-prefixed URL built from the same source of truth as Phase 2. */
function absoluteUrl(locale: Locale, path: string): string {
  return `${getSiteUrl()}${localizedPath(locale, path)}`;
}

/**
 * Public indexable routes only. Private/customer/utility routes (search, cart,
 * checkout, wishlist, auth, account) are intentionally excluded — they are
 * noindex in Phase 2 and disallowed in robots.ts. Product/category/policy lists
 * come from the data layer so there is a single source of truth.
 */
function getIndexableRoutes(): IndexableRoute[] {
  return [
    { path: routes.home(), changeFrequency: "weekly", priority: 1.0 },
    { path: routes.shop(), changeFrequency: "weekly", priority: 0.9 },
    ...getAllProducts().map((product): IndexableRoute => ({
      path: routes.product(product.id),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...getAllCategoryKeys().map((cat): IndexableRoute => ({
      path: routes.category(cat),
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    { path: routes.about(), changeFrequency: "monthly", priority: 0.6 },
    { path: routes.contact(), changeFrequency: "monthly", priority: 0.6 },
    ...getAllPolicies().map(({ slug }): IndexableRoute => ({
      path: routes.policy(slug),
      changeFrequency: "yearly",
      priority: 0.4,
    })),
  ];
}

/** en/ar alternates (absolute) for a locale-agnostic route path. */
function languageAlternates(path: string): Record<Locale, string> {
  return {
    en: absoluteUrl("en", path),
    ar: absoluteUrl("ar", path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable build-time date applied consistently across every entry.
  const now = new Date();

  return getIndexableRoutes().flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(route.path) },
    })),
  );
}
