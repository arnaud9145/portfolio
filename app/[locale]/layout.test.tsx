import { describe, it, expect } from "vitest";
import { generateStaticParams } from "@/app/[locale]/layout";

describe("layout", () => {
  it("génère les params fr et en", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ locale: "fr" }, { locale: "en" }]);
  });
});
