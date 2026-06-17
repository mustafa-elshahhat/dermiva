// FAQ view-model builder. Pure + client-safe.

import type { Locale } from "@/i18n/routing";
import type { FaqViewModel } from "@/lib/types/faq";
import { FAQS } from "@/lib/mock/catalog.mock";

export function buildFaqVMs(locale: Locale): FaqViewModel[] {
  return FAQS.map((faq) => ({ q: faq.q[locale], a: faq.a[locale] }));
}
