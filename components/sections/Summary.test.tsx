import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Summary } from "./Summary";

describe("Summary", () => {
  it("rend les 3 arguments", () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Summary content={getContent("fr")} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(/Senior React Native/)).toBeInTheDocument();
    expect(screen.getByText(/Ex-CTO/)).toBeInTheDocument();
    expect(screen.getByText(/AI-Native/)).toBeInTheDocument();
  });
});
