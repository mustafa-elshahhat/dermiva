// Policy view-model builders. Pure + client-safe.

import type { Locale } from "@/i18n/routing";
import type { PolicyKey, PolicyViewModel } from "@/lib/types/policy";
import { getAllPolicies, findPolicyBySlug } from "@/lib/mock/policies.mock";
import { toPolicyVM } from "@/lib/mappers/policy.mapper";

export function buildPolicyVMs(locale: Locale): PolicyViewModel[] {
  return getAllPolicies().map(({ slug, policy }) => toPolicyVM(slug, policy, locale));
}

export function buildPolicyVM(slug: PolicyKey, locale: Locale): PolicyViewModel | undefined {
  const policy = findPolicyBySlug(slug);
  return policy ? toPolicyVM(slug, policy, locale) : undefined;
}
