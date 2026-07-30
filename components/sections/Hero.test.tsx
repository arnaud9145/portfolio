import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Hero } from "./Hero";

function wrap(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>
  );
}

describe("Hero", () => {
  it("affiche nom, titre et la localisation complète", () => {
    wrap(<Hero content={getContent("fr")} />);
    expect(screen.getByRole("heading", { level: 1, name: /Arnaud Dufour/ })).toBeInTheDocument();
    expect(screen.getByText(/45 min de Paris/)).toBeInTheDocument();
  });
});
