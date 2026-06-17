"use client";

import { useReportWebVitals } from "next/web-vitals";
import { isAnalyticsEnabled, trackEvent } from "@/lib/analytics/analytics";
import { toWebVitalPayload } from "@/lib/analytics/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (!isAnalyticsEnabled()) return;
    trackEvent("web_vital", toWebVitalPayload(metric));
  });

  return null;
}
