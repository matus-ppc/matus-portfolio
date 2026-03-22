import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
});

import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentScripts } from "@/components/ConsentScripts";

export const metadata: Metadata = {
  title: "Matúš Baranec | PPC Špecialista",
  description: "Zvyšujem ziskovosť e-shopov a B2B firiem pomocou dátovo orientovaných PPC kampaní. Objednajte si audit alebo správu kampaní.",
  openGraph: {
    title: "Matúš Baranec | PPC Špecialista",
    description: "Zvyšujem ziskovosť e-shopov a B2B firiem pomocou dátovo orientovaných PPC kampaní. Objednajte si audit alebo správu kampaní.",
    url: "https://matusbaranec.vercel.app",
    siteName: "Matúš Baranec",
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matúš Baranec | PPC Špecialista",
    description: "Zvyšujem ziskovosť e-shopov a B2B firiem pomocou dátovo orientovaných PPC kampaní. Objednajte si audit alebo správu kampaní.",
  },
  metadataBase: new URL("https://matusbaranec.vercel.app"),
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 - Initialization */}
        <Script
          id="gtag-base"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              try {
                var saved = localStorage.getItem("cookie-consent");
                var settings = saved ? JSON.parse(saved) : null;
                
                gtag('consent', 'default', {
                  'analytics_storage': (settings && settings.analytics) ? 'granted' : 'denied',
                  'ad_storage': (settings && settings.marketing) ? 'granted' : 'denied',
                  'ad_user_data': (settings && settings.marketing) ? 'granted' : 'denied',
                  'ad_personalization': (settings && settings.marketing) ? 'granted' : 'denied'
                });
              } catch (e) {
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });
              }
            `,
          }}
        />
        {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-257R591JPD`}
          strategy="afterInteractive"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', 'G-257R591JPD');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased selection:bg-accent selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <CookieConsent />
            {/* Keeping ConsentScripts for Vercel Analytics/Speed Insights if they are still needed, 
                but removing GTM from it since we use GA now as requested. */}
            <ConsentScripts />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
