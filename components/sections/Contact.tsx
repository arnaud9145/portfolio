import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { Reveal } from "@/components/ui/Reveal";

// Email en morceaux — évite de l'exposer en clair dans le HTML.
const EMAIL_PARTS = ["arnaud.dufour10", "@", "gmail", ".", "com"];

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Contact({
  content,
  linkedin,
  github,
}: {
  content: CvContent;
  linkedin: string;
  github: string;
}) {
  const t = useTranslations("sections");
  const tc = useTranslations("contact");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 pb-28">
      <SectionHeading id="contact">{t("contact")}</SectionHeading>
      <Reveal>
        <div className="card relative overflow-hidden p-6 sm:p-9">
          <div className="hero-glow" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
            {/* Left: pitch, availability accent, direct links */}
            <div>
              <div className="card-gold inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium">
                <span className="inline-block h-2 w-2 rounded-full bg-[#0a0a0b]/70" aria-hidden />
                {content.hero.availability}
              </div>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
                {tc("lead")}
              </p>
              <div className="mt-7 flex flex-col gap-3">
                <a href={linkedin} target="_blank" rel="noreferrer noopener" className="btn btn-outline justify-start">
                  LinkedIn <ExternalIcon />
                </a>
                <a href={github} target="_blank" rel="noreferrer noopener" className="btn btn-outline justify-start">
                  GitHub <ExternalIcon />
                </a>
                <div className="mt-1 text-sm text-muted">
                  <ObfuscatedEmail parts={EMAIL_PARTS} />
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-xl border border-border bg-black/15 p-5 sm:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
