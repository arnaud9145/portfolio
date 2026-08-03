import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-7-6.4-7-11a7 7 0 0 1 14 0c0 4.6-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Prominent "open to work" panel on the home page — states clearly what Arnaud
 * is looking for, where, and his availability, with a direct contact CTA.
 */
export function OpenToWork() {
  const t = useTranslations("openToWork");
  return (
    <section className="mx-auto max-w-4xl px-6 pb-6 pt-2">
      <Reveal>
        <div className="otw card relative overflow-hidden p-6 sm:p-8">
          <div className="otw-head">
            <span className="otw-dot" aria-hidden />
            <h2 className="font-display text-xl font-semibold text-gold-hi sm:text-2xl">{t("title")}</h2>
          </div>
          <ul className="mt-5 grid gap-3.5 sm:grid-cols-3">
            <li className="otw-row"><IconBriefcase /><span>{t("role")}</span></li>
            <li className="otw-row"><IconPin /><span>{t("location")}</span></li>
            <li className="otw-row"><IconCheck /><span>{t("availability")}</span></li>
          </ul>
          <div className="mt-6">
            <Link href="/contact" className="btn btn-gold">
              {t("cta")} <IconArrow />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
