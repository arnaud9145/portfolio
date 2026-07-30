import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Experience } from "./Experience";

describe("Experience", () => {
  it("rend les 5 expériences avec périodes", () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Experience content={getContent("fr")} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("Unlockt.me")).toBeInTheDocument();
    expect(screen.getByText("BAM")).toBeInTheDocument();
    expect(screen.getByText(/Ornikar/)).toBeInTheDocument();
  });
});
