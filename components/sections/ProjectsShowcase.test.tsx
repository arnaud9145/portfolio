import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import type { ProjectItem } from "@/content/types";
import { ProjectsShowcase } from "./ProjectsShowcase";

function wrap() {
  const content = getContent("fr");
  return {
    content,
    ...render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <ProjectsShowcase projects={content.projects} locale="fr" />
      </NextIntlClientProvider>,
    ),
  };
}

describe("ProjectsShowcase", () => {
  it("rend une section avec l'id de chaque projet (ancres de deep-link)", () => {
    const { content } = wrap();
    for (const p of content.projects) {
      const section = document.getElementById(p.id);
      expect(section, `section #${p.id}`).not.toBeNull();
      expect(section?.tagName).toBe("SECTION");
    }
  });

  it("affiche chaque nom de projet en titre de niveau 2", () => {
    const { content } = wrap();
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(content.projects.length);
    expect(
      screen.getByRole("heading", { level: 2, name: "Unlockt" }),
    ).toBeInTheDocument();
  });

  it("utilise les vraies captures Roger pour la locale courante", () => {
    wrap();
    const rogerImg = screen
      .getAllByRole("img")
      .find((img) => img.getAttribute("src")?.includes("roger-fr-1"));
    expect(rogerImg).toBeTruthy();
  });

  it("utilise les vraies captures Movizer (données dans project.screenshots)", () => {
    wrap();
    const srcs = screen.getAllByRole("img").map((img) => img.getAttribute("src") ?? "");
    expect(srcs.some((s) => s.includes("movizer-1"))).toBe(true);
    expect(srcs.some((s) => s.includes("movizer-2"))).toBe(true);
    expect(srcs.some((s) => s.includes("movizer-3"))).toBe(true);
  });

  it("affiche les tech tags réels d'un projet", () => {
    wrap();
    // "Reanimated" appears on several projects; "Veriff" is Unlockt-only.
    expect(screen.getAllByText("Reanimated").length).toBeGreaterThan(0);
    expect(screen.getByText("Veriff")).toBeInTheDocument();
  });

  it("affiche la métrique Unlockt (base du compteur animé)", () => {
    wrap();
    expect(
      screen.getByText(/1,2 M d'utilisateurs actifs/, { selector: ".proj-metric span" }),
    ).toBeInTheDocument();
  });

  it("marque les mockups placeholder d'une légende 'aperçu à venir'", () => {
    // Tous les projets réels ont désormais un visuel ; on vérifie le fallback du
    // composant : un projet sans captures (et non Roger) retombe sur le mockup.
    const placeholder: ProjectItem = {
      id: "sans-captures",
      name: "Sans Captures",
      contribution: "minor",
      tagline: "Projet sans captures réelles.",
      metrics: [],
    };
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <ProjectsShowcase projects={[placeholder]} locale="fr" />
      </NextIntlClientProvider>,
    );
    expect(screen.getAllByText("aperçu non disponible").length).toBeGreaterThan(0);
  });

  it("expose le lien store quand il existe", () => {
    wrap();
    const hrefs = screen
      .getAllByRole("link", { name: /App Store/ })
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toContain(
      "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425",
    );
  });
});
