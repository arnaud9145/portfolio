import { describe, it, expect } from "vitest";
import { getContent } from "@/content";

describe("content", () => {
  it("expose fr et en avec les mêmes clés de sections", () => {
    const fr = getContent("fr");
    const en = getContent("en");
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
  });

  it("liste les mêmes apps dans les deux langues", () => {
    const fr = getContent("fr");
    const en = getContent("en");
    expect(fr.apps.map((a) => a.id)).toEqual(en.apps.map((a) => a.id));
  });

  it("liste les mêmes projets (ids stables) dans les deux langues", () => {
    const fr = getContent("fr");
    const en = getContent("en");
    expect(fr.projects.map((p) => p.id)).toEqual(en.projects.map((p) => p.id));
  });

  it.each(["fr", "en"] as const)(
    "chaque tag d'app d'une expérience référence un projet existant (%s)",
    (locale) => {
      const { projects, experience } = getContent(locale);
      const ids = new Set(projects.map((p) => p.id));
      for (const xp of experience) {
        for (const tag of xp.appTags ?? []) {
          expect(ids.has(tag.projectId), `${locale}: ${tag.projectId}`).toBe(true);
        }
      }
    },
  );

  it("inclut le projet gala-tv avec une stack renseignée", () => {
    for (const locale of ["fr", "en"] as const) {
      const project = getContent(locale).projects.find((p) => p.id === "gala-tv");
      expect(project, `${locale}: gala-tv`).toBeDefined();
      expect(project?.tech?.length ?? 0).toBeGreaterThan(0);
    }
  });

  it("renseigne une stack (tech) pour chaque projet dans les deux langues", () => {
    for (const locale of ["fr", "en"] as const) {
      for (const p of getContent(locale).projects) {
        expect(p.tech?.length ?? 0, `${locale}: ${p.id}`).toBeGreaterThan(0);
      }
    }
  });

  it("respecte la règle de localisation (jamais 'Reims' seul)", () => {
    const fr = getContent("fr");
    expect(fr.hero.location).toContain("45 min");
  });
});
