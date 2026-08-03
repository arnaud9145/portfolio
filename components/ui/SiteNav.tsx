"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitch } from "@/components/ui/LocaleSwitch";

// Real route links (one per page). Labels come from the `tabs` namespace so the
// desktop nav stays consistent with the mobile tab bar.
const NAV = [
  { id: "home", href: "/", label: "home" },
  { id: "parcours", href: "/parcours", label: "experience" },
  { id: "projets", href: "/projets", label: "projects" },
  { id: "contact", href: "/contact", label: "contact" },
] as const;

export function SiteNav() {
  const t = useTranslations("tabs");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Elevate the bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={`site-nav${scrolled ? " scrolled" : ""}`}
      aria-label={t("label")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="nav-brand shrink-0 text-lg"
          aria-label="Arnaud Dufour — retour à l'accueil"
        >
          AD
        </Link>
        <ul className="nav-scroller hidden flex-1 items-center gap-5 overflow-x-auto md:flex sm:gap-7">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={item.href}
                  className={`nav-link${active ? " active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {t(item.label)}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="ml-auto shrink-0">
          <LocaleSwitch />
        </div>
      </div>
    </nav>
  );
}
