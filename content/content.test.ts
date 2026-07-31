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

  it("chaque tag d'app d'une expérience référence un projet existant", () => {
    const { projects, experience } = getContent("fr");
    const ids = new Set(projects.map((p) => p.id));
    for (const xp of experience) {
      for (const tag of xp.appTags ?? []) {
        expect(ids.has(tag.projectId)).toBe(true);
      }
    }
  });

  it("respecte la règle de localisation (jamais 'Reims' seul)", () => {
    const fr = getContent("fr");
    expect(fr.hero.location).toContain("45 min");
  });
});
