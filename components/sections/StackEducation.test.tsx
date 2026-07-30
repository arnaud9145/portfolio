import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Stack } from "./Stack";
import { Education } from "./Education";

function wrap(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>
  );
}

describe("Stack & Education", () => {
  it("rend les groupes de stack", () => {
    wrap(<Stack content={getContent("fr")} />);
    expect(screen.getByText("React Native")).toBeInTheDocument();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
  });
  it("rend formation, UNG et langues", () => {
    wrap(<Education content={getContent("fr")} />);
    expect(screen.getAllByText(/Université de Technologie de Troyes/)[0]).toBeInTheDocument();
    expect(screen.getByText(/UNG/)).toBeInTheDocument();
    expect(screen.getByText(/Espagnol/)).toBeInTheDocument();
  });
});
