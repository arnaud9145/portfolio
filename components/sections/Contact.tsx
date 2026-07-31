import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

// Email en morceaux — évite de l'exposer en clair dans le HTML.
const EMAIL_PARTS = ["arnaud.dufour10", "@", "gmail", ".", "com"];

export function Contact({ linkedin, github }: { linkedin: string; github: string }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="contact">{t("contact")}</SectionHeading>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <a href={linkedin} target="_blank" rel="noreferrer noopener" className="text-accent underline underline-offset-4">LinkedIn ↗</a>
        <a href={github} target="_blank" rel="noreferrer noopener" className="text-accent underline underline-offset-4">GitHub ↗</a>
        <ObfuscatedEmail parts={EMAIL_PARTS} />
      </div>
      <ContactForm />
    </section>
  );
}
