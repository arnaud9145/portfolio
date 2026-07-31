import { describe, it, expect } from "vitest";
import { personJsonLd, buildMetadata, localizedUrl } from "@/lib/seo";

describe("seo", () => {
  it("génère un JSON-LD Person cohérent", () => {
    const ld = personJsonLd("fr", "https://arnaud.dev");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe("Arnaud Dufour");
    expect(ld.jobTitle).toContain("React Native");
  });
  it("génère un titre et une description", () => {
    const m = buildMetadata("fr");
    expect(m.title).toContain("Arnaud Dufour");
    expect(m.description).toBeTruthy();
  });

  it("inclut les liens sameAs et l'alumniOf dans le JSON-LD", () => {
    const ld = personJsonLd("fr", "https://arnaud.dev");
    expect(ld.sameAs).toEqual(
      expect.arrayContaining([
        "https://www.linkedin.com/in/arnaud-dufour/",
        "https://github.com/arnaud9145",
      ]),
    );
    expect(ld.alumniOf).toMatchObject({
      "@type": "CollegeOrUniversity",
      name: expect.stringContaining("Troyes"),
    });
  });

  it("expose les alternates hreflang fr / en / x-default", () => {
    const m = buildMetadata("fr");
    const languages = m.alternates?.languages;
    expect(languages?.fr).toBe("https://arnaud.dev");
    expect(languages?.en).toBe("https://arnaud.dev/en");
    expect(languages?.["x-default"]).toBe("https://arnaud.dev");
  });

  it("normalise localizedUrl quel que soit le format du pathname", () => {
    expect(localizedUrl("fr", "projets")).toBe("https://arnaud.dev/projets");
    expect(localizedUrl("fr", "/projets")).toBe("https://arnaud.dev/projets");
    expect(localizedUrl("fr", "/projets/")).toBe("https://arnaud.dev/projets");
    expect(localizedUrl("en", "projets")).toBe("https://arnaud.dev/en/projets");
    expect(localizedUrl("en")).toBe("https://arnaud.dev/en");
    expect(localizedUrl("fr")).toBe("https://arnaud.dev");
  });
});
