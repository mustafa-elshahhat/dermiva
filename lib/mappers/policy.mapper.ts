// Pure raw-Policy -> PolicyViewModel mapping for a given locale. Client-safe.

import type { Locale } from "@/i18n/routing";
import type { Policy, PolicyKey, PolicyViewModel } from "@/lib/types/policy";

export function toPolicyVM(slug: PolicyKey, policy: Policy, locale: Locale): PolicyViewModel {
  return {
    slug,
    title: policy.title[locale],
    intro: policy.intro[locale],
    summary: policy.summary[locale],
    sections: policy.sections.map((s) => ({ h: s.h[locale], b: s.b[locale] })),
  };
}
