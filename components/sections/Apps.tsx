import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreLink } from "@/components/ui/StoreLink";

export function Apps({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="apps">{t("apps")}</SectionHeading>
      <ul className="mt-6 space-y-6">
        {content.apps.map((app) => (
          <li key={app.id} className="rounded-lg border border-border p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{app.name}</h3>
              <span className="text-sm text-muted">{app.role}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{app.tagline}</p>
            {app.metrics.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {app.metrics.map((m) => (
                  <li key={m} className="rounded-full border border-border px-2 py-0.5 text-xs">{m}</li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex items-center gap-3 text-sm">
              {app.link && <StoreLink href={app.link.href} label={app.link.label} />}
              {app.status && <span className="text-muted">{app.status}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
