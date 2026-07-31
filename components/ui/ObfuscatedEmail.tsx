"use client";
import { deobfuscate } from "@/lib/obfuscate";

// Les morceaux évitent d'exposer l'email en clair dans le HTML.
export function ObfuscatedEmail({ parts }: { parts: string[] }) {
  const email = deobfuscate(parts);
  return <a href={`mailto:${email}`} className="text-accent underline underline-offset-4">{email}</a>;
}
