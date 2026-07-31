import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
});
