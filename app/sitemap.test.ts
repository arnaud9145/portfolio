import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("liste les routes attendues pour chaque locale", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://arnaud.dev",
        "https://arnaud.dev/en",
        "https://arnaud.dev/projets",
        "https://arnaud.dev/en/projets",
      ]),
    );
    // Exactly one entry per route × locale — no stray/duplicate routes.
    expect(urls).toHaveLength(4);
  });

  it("expose les alternates hreflang fr / en / x-default pour chaque route", () => {
    const entries = sitemap();
    for (const entry of entries) {
      const languages = entry.alternates?.languages;
      expect(languages, entry.url).toBeTruthy();
      expect(languages?.fr, entry.url).toBeTruthy();
      expect(languages?.en, entry.url).toBeTruthy();
      expect(languages?.["x-default"], entry.url).toBeTruthy();
    }
  });

  it("le hreflang de la home pointe vers les bonnes URLs localisées", () => {
    const home = sitemap().find((entry) => entry.url === "https://arnaud.dev");
    expect(home?.alternates?.languages).toMatchObject({
      fr: "https://arnaud.dev",
      en: "https://arnaud.dev/en",
      "x-default": "https://arnaud.dev",
    });
  });

  it("le hreflang de /projets pointe vers les bonnes URLs localisées", () => {
    const projets = sitemap().find((entry) => entry.url === "https://arnaud.dev/projets");
    expect(projets?.alternates?.languages).toMatchObject({
      fr: "https://arnaud.dev/projets",
      en: "https://arnaud.dev/en/projets",
      "x-default": "https://arnaud.dev/projets",
    });
  });
});
