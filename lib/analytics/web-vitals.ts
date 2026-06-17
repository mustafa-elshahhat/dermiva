import type { AnalyticsWebVitalPayload } from "./events";

export function toWebVitalPayload(metric: {
  id: string;
  name: string;
  value: number;
  rating?: string;
  navigationType?: string;
}): AnalyticsWebVitalPayload {
  return {
    metricId: metric.id,
    metricName: metric.name,
    value: metric.value,
    rating: metric.rating,
    navigationType: metric.navigationType,
  };
}
