import type { Metadata } from "next";
import { getContent, type Locale } from "@/content";

// Kept ≤155 chars so Google doesn't truncate the SERP snippet.
const DESCRIPTION: Record<Locale, string> = {
  fr: "Arnaud Dufour, ingénieur mobile senior spécialisé React Native — React Native depuis 2018, ex-CTO & cofondateur, AI-Native. Basé à Reims, à 45 minutes de Paris.",
  en: "Arnaud Dufour, senior React Native mobile engineer since 2018, former CTO & co-founder, AI-Native. Based in Reims, 45 min from Paris.",
};

export const SITE_URL = "https://arnaud.dev";

export const LINKEDIN_URL = "https://www.linkedin.com/in/arnaud-dufour/";
export const GITHUB_URL = "https://github.com/arnaud9145";

// Locale URLs under the "as-needed" prefix strategy: fr (default) is
// unprefixed, en carries a /en prefix. Keep in sync with i18n/routing.ts.
// `pathname` is normalized so callers may pass "", "/", "projets", "/projets"
// or "/projets/" and always get exactly one slash between segments.
export function localizedUrl(locale: Locale, pathname = ""): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  const trimmed = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const suffix = trimmed ? `/${trimmed}` : "";
  return `${SITE_URL}${prefix}${suffix}`;
}

export function buildMetadata(locale: Locale, pathname = ""): Metadata {
  const c = getContent(locale);
  const title = `${c.hero.name} — ${c.hero.title}`;
  const canonical = localizedUrl(locale, pathname);
  const otherLocale = locale === "fr" ? "en" : "fr";
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
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: otherLocale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION[locale] },
  };
}

const PROJECTS_TITLE: Record<Locale, string> = {
  fr: "Projets — Arnaud Dufour, ingénieur mobile React Native",
  en: "Projects — Arnaud Dufour, React Native mobile engineer",
};

const PROJECTS_DESCRIPTION: Record<Locale, string> = {
  fr: "Sept ans d'applications React Native : Unlockt (1,2 M d'utilisateurs), Exposed (~500k/mois), Disorder, Movizer, et du conseil chez BAM. Le portfolio mobile d'Arnaud Dufour.",
  en: "Seven years of React Native apps: Unlockt (1.2M users), Exposed (~500k/month), Disorder, Movizer, and agency work at BAM. The mobile portfolio of Arnaud Dufour.",
};

export function buildProjectsMetadata(locale: Locale): Metadata {
  const path = "projets";
  const title = PROJECTS_TITLE[locale];
  const description = PROJECTS_DESCRIPTION[locale];
  const canonical = localizedUrl(locale, path);
  const otherLocale = locale === "fr" ? "en" : "fr";
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        fr: localizedUrl("fr", path),
        en: localizedUrl("en", path),
        "x-default": localizedUrl("fr", path),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: otherLocale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
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
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Université de Technologie de Troyes",
    },
    knowsAbout: [
      "React Native",
      "TypeScript",
      "Expo",
      "Reanimated",
      "Mobile app development",
      "iOS",
      "Android",
      "NestJS",
    ],
    worksFor: { "@type": "Organization", name: "Unlockt.me" },
  } as const;
}
