import { useTranslations } from "next-intl";
import type { CvContent, EducationItem } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

function EduList({ items }: { items: EducationItem[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {items.map((e) => (
        <li key={e.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-medium">{e.title}</h3>
            <span className="text-sm text-muted">{e.period}</span>
          </div>
          <p className="text-sm text-accent">{e.org}</p>
          {e.details && <p className="mt-1 text-sm text-muted">{e.details}</p>}
        </li>
      ))}
    </ul>
  );
}

export function Education({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="education">{t("education")}</SectionHeading>
      <EduList items={content.education} />
      <EduList items={content.associative} />
      <h3 className="mt-8 text-sm font-semibold text-muted">{t("languages")}</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {content.languages.map((l) => (
          <li key={l.name} className="rounded-md border border-border px-2 py-1 text-sm">
            {l.name} — {l.level}
          </li>
        ))}
      </ul>
    </section>
  );
}
