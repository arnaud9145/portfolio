import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Interests({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="interests">{t("interests")}</SectionHeading>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {content.interests.map((it, i) => (
          <Reveal key={it.label} delay={Math.min(i, 5) * 70}>
            <div className="card card-hover flex h-full items-start gap-3 p-4">
              <span className="shrink-0 text-2xl leading-none" aria-hidden>
                {it.icon}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-fg">{it.label}</p>
                {it.note && <p className="mt-0.5 text-sm text-muted">{it.note}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
