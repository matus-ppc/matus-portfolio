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
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased selection:bg-accent selection:text-white`}>
        <GoogleTagManager gtmId="GTM-TVDNDNBZ" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
