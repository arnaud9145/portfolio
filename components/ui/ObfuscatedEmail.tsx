"use client";
import { useEffect, useState } from "react";
import { deobfuscate } from "@/lib/obfuscate";

// Les morceaux évitent d'exposer l'email en clair dans le HTML — mais un
// composant "use client" est quand même rendu côté serveur par défaut dans
// l'App Router. On n'assemble donc l'adresse qu'après le montage client
// (useEffect) : le HTML servi (et donc un simple curl sans JS) ne voit
// jamais l'email en clair, seul un navigateur avec JS actif le révèle.
export function ObfuscatedEmail({ parts }: { parts: string[] }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(deobfuscate(parts));
  }, [parts]);

  if (!email) {
    return <span className="text-accent underline underline-offset-4">···@···</span>;
  }

  return (
    <a href={`mailto:${email}`} className="text-accent underline underline-offset-4">
      {email}
    </a>
  );
}
