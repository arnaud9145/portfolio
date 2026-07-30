import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Apps } from "./Apps";

describe("Apps", () => {
  it("rend chaque app avec son lien", () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Apps content={getContent("fr")} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("Disorder")).toBeInTheDocument();
    expect(screen.getByText("Movizer")).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(4);
  });
});
