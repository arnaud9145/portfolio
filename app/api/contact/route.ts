import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  // Rate-limit en production uniquement : en local toutes les requêtes partagent
  // l'IP "unknown", ce qui bloque vite pendant les tests.
  if (
    process.env.NODE_ENV === "production" &&
    !rateLimit(`contact:${ip}`, { limit: 5, windowMs: 600_000 }).allowed
  ) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { name?: string; email?: string; message?: string; hp?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { name, email, message, hp } = body;
  // Honeypot : un vrai humain ne remplit pas ce champ caché.
  if (hp) return NextResponse.json({ error: "spam" }, { status: 400 });
  if (!name || !email || !message || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  // Expéditeur configurable : une fois un domaine vérifié dans Resend, pointer
  // CONTACT_FROM_EMAIL vers "Portfolio <contact@dufour.build>" pour une bonne
  // délivrabilité. Par défaut, l'adresse de test Resend (souvent filtrée spam).
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Contact portfolio — ${name}`,
    text: `De : ${name} <${email}>\n\n${message}`,
  });
  if (error) return NextResponse.json({ error: "send_failed" }, { status: 502 });

  return NextResponse.json({ ok: true });
}
