import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="experience">{t("experience")}</SectionHeading>
      <ol className="mt-6 space-y-8 border-l border-border pl-6">
        {content.experience.map((xp) => (
          <li key={xp.id} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{xp.company}</h3>
              <span className="text-sm text-muted">{xp.period}</span>
            </div>
            <p className="text-sm text-accent">{xp.role}</p>
            {xp.summary && <p className="mt-2 text-sm text-muted">{xp.summary}</p>}
            {xp.highlights.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {xp.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            {xp.clients && (
              <p className="mt-2 text-xs text-muted">Clients : {xp.clients.join(", ")}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
