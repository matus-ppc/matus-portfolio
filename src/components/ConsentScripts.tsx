"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";
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
    // Initial load from localStorage
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
      {/* Google Analytics & GTM - ONLY LOAD AFTER CONSENT */}
      {(consent.analytics || consent.marketing) && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-257R591JPD"
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                
                gtag('consent', 'default', {
                  'analytics_storage': '${consent.analytics ? 'granted' : 'denied'}',
                  'ad_storage': '${consent.marketing ? 'granted' : 'denied'}',
                  'ad_user_data': '${consent.marketing ? 'granted' : 'denied'}',
                  'ad_personalization': '${consent.marketing ? 'granted' : 'denied'}'
                });

                gtag('config', 'G-257R591JPD');
              `,
            }}
          />
        </>
      )}

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
