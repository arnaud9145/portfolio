import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./SectionHeading";
import { StoreLink } from "./StoreLink";

describe("SectionHeading", () => {
  it("rend un h2 avec id d'ancre", () => {
    render(<SectionHeading id="apps">Apps</SectionHeading>);
    const h = screen.getByRole("heading", { level: 2, name: "Apps" });
    expect(h).toHaveAttribute("id", "apps");
  });
});

describe("StoreLink", () => {
  it("ouvre dans un nouvel onglet en sécurité", () => {
    render(<StoreLink href="https://example.com" label="App Store" />);
    const a = screen.getByRole("link", { name: /App Store/ });
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });
});
