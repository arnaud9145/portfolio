import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";
import { Reveal } from "@/components/ui/Reveal";

// Email en morceaux — évite de l'exposer en clair dans le HTML.
const EMAIL_PARTS = ["arnaud", "@", "dufour", ".", "build"];

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.34.85 0 1.7.12 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
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
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href={linkedin} target="_blank" rel="noreferrer noopener" className="btn btn-outline justify-start sm:flex-1">
                    <LinkedInIcon /> LinkedIn <span className="ml-auto"><ExternalIcon /></span>
                  </a>
                  <a href={github} target="_blank" rel="noreferrer noopener" className="btn btn-outline justify-start sm:flex-1">
                    <GitHubIcon /> GitHub <span className="ml-auto"><ExternalIcon /></span>
                  </a>
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                  <MailIcon />
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
