import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Stack({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="stack">{t("stack")}</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-3">
        {content.stack.map((g, i) => (
          <Reveal key={g.label} delay={i * 90}>
            <div className="card card-hover h-full p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                {g.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item} className="pill">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
