import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/content";
import { SiteNav } from "@/components/ui/SiteNav";
import { MobileTabBar } from "@/components/ui/MobileTabBar";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// viewport-fit=cover is required for env(safe-area-inset-*) to be non-zero on
// notched devices, and it stabilises the fixed bottom tab bar on iOS Safari
// (the layout viewport spans the full screen instead of shifting with the toolbar).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marque JS actif : arme les animations Reveal (sinon contenu visible d'office). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden />
        <NextIntlClientProvider>
          <SiteNav />
          {children}
          <MobileTabBar />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
