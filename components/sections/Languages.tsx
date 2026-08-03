import { useTranslations } from "next-intl";
import type { CvContent } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Languages({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="languages">{t("languages")}</SectionHeading>
      <Reveal>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {content.languages.map((l) => (
            <li key={l.name} className="card card-hover flex items-center gap-4 p-5">
              <span className="text-4xl leading-none" aria-hidden>{l.flag}</span>
              <div>
                <div className="font-display text-lg font-semibold text-gold-hi">{l.name}</div>
                <div className="mt-0.5 text-sm text-muted">{l.level}</div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
