import type { AnalyticsEventName, AnalyticsEventPayloadMap } from "./events";
import { resolveAnalyticsProvider } from "./providers";

function isPublicFlagEnabled(value: string | undefined): boolean {
  return value === "1" || value === "true" || value === "yes";
}

export function isAnalyticsEnabled(): boolean {
  return isPublicFlagEnabled(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED);
}

export function isAnalyticsDebugEnabled(): boolean {
  return isPublicFlagEnabled(process.env.NEXT_PUBLIC_ANALYTICS_DEBUG);
}

export function getAnalyticsProviderId(): string {
  return process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "noop";
}

export function trackEvent<TName extends AnalyticsEventName>(
  name: TName,
  payload: AnalyticsEventPayloadMap[TName]
): void {
  try {
    const provider = resolveAnalyticsProvider({
      enabled: isAnalyticsEnabled(),
      debug: isAnalyticsDebugEnabled(),
      provider: getAnalyticsProviderId(),
    });
    provider.track({ name, payload });
  } catch {
    // Analytics must never break storefront, cart, or checkout UX.
  }
}
