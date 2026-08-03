import { describe, it, expect } from "vitest";
import { getContent, experienceApps, derivedStack } from "@/content";

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
    "chaque projet référence une expérience existante via experienceId (%s)",
    (locale) => {
      const content = getContent(locale);
      const expIds = new Set(content.experience.map((xp) => xp.id));
      for (const p of content.projects) {
        if (p.experienceId) {
          expect(
            expIds.has(p.experienceId),
            `${locale}: ${p.id} → ${p.experienceId}`,
          ).toBe(true);
        }
      }
    },
  );

  // Garde-fou "source unique" : les tags d'une expérience sont DÉRIVÉS des
  // projets — un projet ajouté ne peut plus être oublié sous son expérience.
  it.each(["fr", "en"] as const)(
    "dérive les apps d'une expérience depuis les projets (%s)",
    (locale) => {
      const content = getContent(locale);
      for (const p of content.projects) {
        if (!p.experienceId) continue;
        const surfaced = experienceApps(content, p.experienceId).map((a) => a.projectId);
        expect(surfaced, `${locale}: ${p.id} sous ${p.experienceId}`).toContain(p.id);
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

  // La stack est DÉRIVÉE des projets : ajouter une techno à un projet la fait
  // apparaître ; rien n'est oublié (le bug "Heroku manquant" ne peut plus arriver).
  it.each(["fr", "en"] as const)(
    "dérive la stack depuis les technos des projets (%s)",
    (locale) => {
      const items = derivedStack(getContent(locale)).flatMap((g) =>
        g.items.map((i) => i.name),
      );
      for (const t of ["React Native", "Heroku", "Stripe", "Node.js", "NestJS", "Next.js"]) {
        expect(items, `${locale}: ${t}`).toContain(t);
      }
      // exclus de la stack (mais peuvent rester en techno projet)
      expect(items).not.toContain("SVG");
      expect(items).not.toContain("Detox");
    },
  );

  it("respecte la règle de localisation (jamais 'Reims' seul)", () => {
    const fr = getContent("fr");
    expect(fr.hero.location).toContain("45 min");
  });
});
