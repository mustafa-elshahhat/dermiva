import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { getSiteUrl, localizedPath } from "@/lib/seo/url";
import { routes } from "@/lib/seo/routes";

/**
 * Locale-agnostic private/customer/utility routes that must not be crawled.
 * `account` covers its sub-routes (orders, orders/[no], addresses) by prefix.
 */
const privatePaths = [
  routes.search(),
  routes.cart(),
  routes.checkout(),
  routes.wishlist(),
  routes.login(),
  routes.register(),
  routes.account(),
];

export default function robots(): MetadataRoute.Robots {
  // Localized private routes (/en/cart, /ar/cart, …) plus framework/internal paths.
  const localizedDisallow = routing.locales.flatMap((locale) =>
    privatePaths.map((path) => localizedPath(locale, path)),
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...localizedDisallow, "/api/", "/_next/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
