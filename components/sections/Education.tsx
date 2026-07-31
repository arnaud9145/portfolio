import { useTranslations } from "next-intl";
import type { CvContent } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Education({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="education">{t("education")}</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {content.education.map((e, i) => (
          <Reveal key={e.title} delay={i * 90}>
            <div className="card card-hover h-full p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-medium text-fg">{e.title}</h3>
                <span className="shrink-0 text-sm text-muted">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-gold-hi">{e.org}</p>
              {e.details && (
                <p className="mt-2 text-sm text-muted">{e.details}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          {t("languages")}
        </h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {content.languages.map((l) => (
            <li key={l.name} className="pill">
              {l.name} — {l.level}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
