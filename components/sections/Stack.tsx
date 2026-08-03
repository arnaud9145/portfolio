import { useTranslations } from "next-intl";
import { derivedStack, type CvContent } from "@/content";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Stack({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  // Groupes dérivés des technos de tous les projets (source unique, toujours à jour).
  const groups = derivedStack(content);
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="stack">{t("stack")}</SectionHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((g, i) => (
          <Reveal key={g.key} delay={i * 90}>
            <div className="card card-hover h-full p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                {t(`stackGroups.${g.key}`)}
              </h3>
              <ul className="mt-4 flex flex-wrap items-center gap-2">
                {g.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/projets?tech=${encodeURIComponent(item.name)}`}
                      className={`pill pill--link${item.primary ? " pill--lg" : ""}`}
                      title={t("filterBy", { tech: item.name })}
                    >
                      {item.name}
                    </Link>
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
