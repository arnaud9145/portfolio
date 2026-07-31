import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "@/app/api/phone/route";

function req() {
  return new Request("http://localhost/api/phone", {
    headers: { "x-forwarded-for": `1.2.3.${Math.floor(Math.random() * 1000)}` },
  });
}

describe("GET /api/phone", () => {
  beforeEach(() => {
    process.env.PHONE_NUMBER = "+33600000000";
  });

  it("renvoie le numéro configuré", async () => {
    const res = await GET(req());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.phone).toBe("+33600000000");
  });

  it("renvoie 503 si non configuré", async () => {
    delete process.env.PHONE_NUMBER;
    const res = await GET(req());
    expect(res.status).toBe(503);
  });
});
