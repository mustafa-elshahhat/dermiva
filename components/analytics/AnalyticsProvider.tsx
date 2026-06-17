"use client";

import React from "react";
import WebVitalsReporter from "./WebVitalsReporter";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <WebVitalsReporter />
    </>
  );
}
