import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Stack } from "./Stack";
import { Languages } from "./Languages";

function wrap(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>
  );
}

describe("Stack & Languages", () => {
  it("rend les groupes de stack", () => {
    wrap(<Stack content={getContent("fr")} />);
    expect(screen.getByText("React Native")).toBeInTheDocument();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
  });
  it("rend le bloc Langues autonome (les diplômes sont désormais dans la timeline)", () => {
    wrap(<Languages content={getContent("fr")} />);
    expect(screen.getByRole("heading", { name: /Langues/ })).toBeInTheDocument();
    expect(screen.getByText(/Espagnol/)).toBeInTheDocument();
    // les diplômes ne sont plus rendus ici
    expect(
      screen.queryByText(/Université de Technologie de Troyes/)
    ).not.toBeInTheDocument();
  });
});
