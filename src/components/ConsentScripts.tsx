"use client";

import React, { useState, useEffect } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function ConsentScripts() {
  const [consent, setConsent] = useState<CookieSettings | null>(null);

  useEffect(() => {
    // Initial load
    const saved = localStorage.getItem("cookie-consent");
    if (saved) {
      setConsent(JSON.parse(saved));
    }

    // Listen for updates from CookieConsent component
    const handleUpdate = (event: any) => {
      setConsent(event.detail);
    };

    window.addEventListener("cookie-consent-updated", handleUpdate);
    return () => window.removeEventListener("cookie-consent-updated", handleUpdate);
  }, []);

  if (!consent) return null;

  return (
    <>
      {/* Vercel Analytics & Speed Insights - Require Analytics consent */}
      {consent.analytics && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
