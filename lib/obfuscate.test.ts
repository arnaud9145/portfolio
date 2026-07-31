import { describe, it, expect } from "vitest";
import { deobfuscate } from "@/lib/obfuscate";

describe("deobfuscate", () => {
  it("reconstitue l'email à partir de morceaux", () => {
    expect(deobfuscate(["arnaud", "@", "example", ".", "com"])).toBe("arnaud@example.com");
  });
});
