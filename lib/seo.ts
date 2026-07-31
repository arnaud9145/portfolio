import type { Metadata } from "next";
import { getContent, type Locale } from "@/content";

const DESCRIPTION: Record<Locale, string> = {
  fr: "Senior React Native Engineer — React Native depuis 2018, ex-CTO & cofondateur, AI-Native. Reims, 45 min de Paris.",
  en: "Senior React Native Engineer — React Native since 2018, former CTO & co-founder, AI-Native. Reims, 45 min from Paris.",
};

const SITE_URL = "https://arnaud.dev";

// Locale URLs under the "as-needed" prefix strategy: fr (default) is
// unprefixed, en carries a /en prefix. Keep in sync with i18n/routing.ts.
function localizedUrl(locale: Locale, pathname: string): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${pathname}`;
}

export function buildMetadata(locale: Locale, pathname = ""): Metadata {
  const c = getContent(locale);
  const title = `${c.hero.name} — ${c.hero.title}`;
  const canonical = localizedUrl(locale, pathname);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: DESCRIPTION[locale],
    alternates: {
      canonical,
      languages: {
        fr: localizedUrl("fr", pathname),
        en: localizedUrl("en", pathname),
        "x-default": localizedUrl("fr", pathname),
      },
    },
    openGraph: {
      title,
      description: DESCRIPTION[locale],
      type: "profile",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION[locale] },
  };
}

export function personJsonLd(locale: Locale, url: string) {
  const c = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.hero.name,
    jobTitle: c.hero.title,
    url,
    address: { "@type": "PostalAddress", addressLocality: "Reims", addressCountry: "FR" },
    knowsLanguage: c.languages.map((l) => l.name),
  } as const;
}
