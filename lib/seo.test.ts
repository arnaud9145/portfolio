import { describe, it, expect } from "vitest";
import { personJsonLd, buildMetadata } from "@/lib/seo";

describe("seo", () => {
  it("génère un JSON-LD Person cohérent", () => {
    const ld = personJsonLd("fr", "https://arnaud.dev");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe("Arnaud Dufour");
    expect(ld.jobTitle).toContain("React Native");
  });
  it("génère un titre et une description", () => {
    const m = buildMetadata("fr");
    expect(m.title).toContain("Arnaud Dufour");
    expect(m.description).toBeTruthy();
  });
});
