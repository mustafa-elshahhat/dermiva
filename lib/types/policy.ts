// Policy domain + view-model types.

import type { Localized } from "./common";

export type PolicyKey = "shipping" | "returns" | "privacy" | "terms";

/** Raw policy model. */
export interface Policy {
  title: Localized<string>;
  intro: Localized<string>;
  summary: Localized<string[]>;
  sections: { h: Localized<string>; b: Localized<string> }[];
}

/** Locale-resolved policy for rendering. */
export interface PolicyViewModel {
  slug: PolicyKey;
  title: string;
  intro: string;
  summary: string[];
  sections: { h: string; b: string }[];
}
