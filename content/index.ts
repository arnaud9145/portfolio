import type { CvContent, Locale } from "./types";
import { fr } from "./fr";
import { en } from "./en";

const byLocale: Record<Locale, CvContent> = { fr, en };

export function getContent(locale: Locale): CvContent {
  return byLocale[locale];
}

export type { CvContent, Locale };
