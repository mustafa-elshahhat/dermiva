// Robots directives. Indexable public storefront pages use buildIndexRobots();
// account/cart/checkout/search and similar private/utility pages use the
// noindex variant.

import type { Metadata } from "next";

type Robots = NonNullable<Metadata["robots"]>;

export function buildIndexRobots(): Robots {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function buildNoIndexRobots(): Robots {
  return { index: false, follow: false };
}
