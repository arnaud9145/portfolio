import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Summary({ content }: { content: CvContent }) {
  const t = useTranslations("nav");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="summary">{t("summary")}</SectionHeading>
      <div className="grid gap-5 sm:grid-cols-3">
        {content.summary.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <div className="card card-hover card-accent-top h-full p-6">
              <h3 className="font-display text-lg font-semibold text-gold-hi">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
