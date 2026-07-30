import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="stack">{t("stack")}</SectionHeading>
      <div className="mt-6 space-y-4">
        {content.stack.map((g) => (
          <div key={g.label}>
            <h3 className="text-sm font-semibold text-muted">{g.label}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i} className="rounded-md border border-border px-2 py-1 text-sm">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
