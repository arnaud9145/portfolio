import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Experience } from "./Experience";

function wrap() {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>
      <Experience content={getContent("fr")} />
    </NextIntlClientProvider>
  );
}

describe("Experience", () => {
  it("rend les expériences dont UNG (déplacée depuis Formation)", () => {
    wrap();
    expect(screen.getByText("Unlockt.me")).toBeInTheDocument();
    expect(screen.getByText("BAM")).toBeInTheDocument();
    expect(screen.getByText("UNG (UTT Net Group)")).toBeInTheDocument();
  });

  it("expose les tags d'apps qui pointent vers /projets#<id>", () => {
    wrap();
    const tag = screen.getByRole("link", { name: /Unlockt/ });
    expect(tag).toHaveAttribute("href", "/projets#unlockt");
    // tag Ornikar (ex-« client » BAM) devient un lien vers son projet
    expect(screen.getByRole("link", { name: /Ornikar/ })).toHaveAttribute(
      "href",
      "/projets#ornikar"
    );
  });

  it("déplie et replie une expérience (accordéon accessible)", () => {
    wrap();
    const btn = screen.getAllByRole("button", { expanded: false })[0];
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("rend le panneau inert (hors du DOM d'accessibilité et du tab order) quand il est replié, et le réactive à l'ouverture", () => {
    wrap();
    const btn = screen.getAllByRole("button", { expanded: false })[0];
    const panelId = btn.getAttribute("aria-controls");
    const panel = document.getElementById(panelId!) as HTMLElement;

    // replié : l'attribut HTML inert doit être posé sur le panneau
    // (jsdom ne reflète pas encore la propriété IDL HTMLElement.inert,
    // donc on vérifie l'attribut réellement rendu dans le DOM)
    expect(panel.getAttribute("inert")).not.toBeNull();

    fireEvent.click(btn);

    // déplié : le panneau redevient interactif/accessible
    expect(panel.getAttribute("inert")).toBeNull();
  });

  it("ne rend pas de lien LinkedIn pour une entreprise dont l'URL est le placeholder '#'", () => {
    wrap();
    const btn = screen.getAllByRole("button", { expanded: false })[0];
    fireEvent.click(btn);
    expect(
      screen.queryByRole("link", { name: /LinkedIn|linkedin/i })
    ).not.toBeInTheDocument();
  });

  it("le clic sur n'importe quelle zone de l'en-tête (période, chevron) déplie l'accordéon", () => {
    wrap();
    const btn = screen.getAllByRole("button", { expanded: false })[0];
    // Cliquer sur un nœud enfant profond de l'en-tête (le texte de la période)
    // doit remonter (bubbling) jusqu'au bouton et déclencher le toggle.
    const period = within(btn).getByText(/sept\. 2024/);
    fireEvent.click(period);
    expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  it("les tags d'apps restent des liens séparés, hors du bouton, et ne déplient pas l'accordéon", () => {
    wrap();
    const btn = screen.getAllByRole("button", { expanded: false })[0];
    const tag = screen.getByRole("link", { name: /Unlockt/ });
    // Le lien ne doit jamais être un descendant du bouton (pas de <a> dans <button>).
    expect(btn.contains(tag)).toBe(false);
    fireEvent.click(tag);
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });
});
