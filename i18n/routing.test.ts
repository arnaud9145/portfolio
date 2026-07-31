import { describe, it, expect } from "vitest";
import { routing } from "@/i18n/routing";

describe("routing", () => {
  it("supporte fr et en, défaut fr", () => {
    expect(routing.locales).toEqual(["fr", "en"]);
    expect(routing.defaultLocale).toBe("fr");
  });

  it("n'affiche pas de préfixe pour la locale par défaut (as-needed)", () => {
    expect(routing.localePrefix).toBe("as-needed");
  });
});
