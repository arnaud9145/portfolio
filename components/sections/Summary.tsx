import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Summary({ content }: { content: CvContent }) {
  const t = useTranslations("nav");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="summary">{t("summary")}</SectionHeading>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {content.summary.map((s) => (
          <div key={s.title} className="rounded-lg border border-border p-4">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
