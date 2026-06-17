// Policies service. Async + ApiResult-shaped; resolves from mock today.

import type { Locale } from "@/i18n/routing";
import type { ApiResult } from "@/lib/types/common";
import type { PolicyKey, PolicyViewModel } from "@/lib/types/policy";
import { buildPolicyVMs, buildPolicyVM } from "@/lib/view-models/policy.vm";
import { ok, notFound } from "./errors";

export async function getPolicies(locale: Locale): Promise<ApiResult<PolicyViewModel[]>> {
  return ok(buildPolicyVMs(locale));
}

export async function getPolicyBySlug(
  slug: PolicyKey,
  locale: Locale
): Promise<ApiResult<PolicyViewModel>> {
  const vm = buildPolicyVM(slug, locale);
  return vm ? ok(vm) : notFound(`Policy "${slug}" not found`);
}
