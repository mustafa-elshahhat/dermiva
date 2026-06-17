"use client";

import { useEffect, useRef } from "react";
import type { AnalyticsEventName, AnalyticsEventPayloadMap } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/analytics";

export default function EventReporter<TName extends AnalyticsEventName>({
  name,
  payload,
}: {
  name: TName;
  payload: AnalyticsEventPayloadMap[TName];
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent(name, payload);
  }, [name, payload]);

  return null;
}
