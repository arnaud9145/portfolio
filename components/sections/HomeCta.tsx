import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Closing call-to-action at the bottom of the home page. On mobile the tab bar
 * already covers navigation, so this is primarily a desktop affordance — but it
 * reads fine on every viewport, giving the landing page a clear next step.
 */
export function HomeCta() {
  const t = useTranslations("home");
  return (
    <section className="mx-auto max-w-4xl px-6 pb-20 pt-8 sm:pb-24">
      <Reveal>
        <div className="card card-accent-top flex flex-col items-center gap-6 p-8 text-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold text-gold-hi sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-2 text-sm text-muted sm:text-base">{t("ctaBody")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/parcours" className="btn btn-gold">
              {t("ctaParcours")} <ArrowIcon />
            </Link>
            <Link href="/projets" className="btn btn-outline">
              {t("ctaProjects")} <ArrowIcon />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
