import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "1" }, error: null });
vi.mock("resend", () => ({
  // `function` (not an arrow) so the mock stays constructible under `new Resend(...)` —
  // Vitest 4's mock invokes Reflect.construct, which requires a real constructor function.
  Resend: vi.fn().mockImplementation(function Resend() {
    return { emails: { send: sendMock } };
  }),
}));

import { POST } from "@/app/api/contact/route";

function post(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "9.9.9.9" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockClear();
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "arnaud@example.com";
  });

  it("envoie l'email pour un payload valide", async () => {
    const res = await POST(post({ name: "Jean", email: "j@x.com", message: "Bonjour, un poste ?", hp: "" }));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("rejette si le honeypot est rempli", async () => {
    const res = await POST(post({ name: "Bot", email: "b@x.com", message: "spam", hp: "http://spam" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejette un email invalide", async () => {
    const res = await POST(post({ name: "Jean", email: "pasunemail", message: "Bonjour", hp: "" }));
    expect(res.status).toBe(400);
  });

  it("rejette un body JSON valide mais non-objet (ex: null) sans planter", async () => {
    const res = await POST(post(null));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("invalid");
  });

  it("rejette un body JSON valide mais non-objet (ex: string) sans planter", async () => {
    const res = await POST(post("hello"));
    expect(res.status).toBe(400);
  });
});
