// FAQ domain + view-model types.

import type { Localized } from "./common";

export interface Faq {
  q: Localized<string>;
  a: Localized<string>;
}

/** Locale-resolved FAQ for rendering. */
export interface FaqViewModel {
  q: string;
  a: string;
}
