import type { AnalyticsEvent, AnalyticsEventName } from "./events";

export interface AnalyticsProvider {
  readonly id: string;
  track<TName extends AnalyticsEventName>(event: AnalyticsEvent<TName>): void;
}

export const noopAnalyticsProvider: AnalyticsProvider = {
  id: "noop",
  track() {
    // Intentionally empty. Real analytics providers are added only after consent
    // and vendor decisions are made.
  },
};

export const debugAnalyticsProvider: AnalyticsProvider = {
  id: "debug",
  track(event) {
    console.info("[analytics]", event.name, event.payload);
  },
};

export function resolveAnalyticsProvider({
  enabled,
  debug,
  provider,
}: {
  enabled: boolean;
  debug: boolean;
  provider?: string;
}): AnalyticsProvider {
  if (!enabled) return noopAnalyticsProvider;
  if (process.env.NODE_ENV !== "production" && debug && (!provider || provider === "debug" || provider === "noop")) {
    return debugAnalyticsProvider;
  }
  return noopAnalyticsProvider;
}
