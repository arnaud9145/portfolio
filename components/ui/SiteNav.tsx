"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitch } from "@/components/ui/LocaleSwitch";

// On-page anchors (scroll-spy). "projets" is a separate cross-page route.
const SECTIONS = ["summary", "experience", "stack", "education", "contact"] as const;

type NavItem =
  | { kind: "anchor"; id: (typeof SECTIONS)[number] }
  | { kind: "route"; id: "projets"; href: string };

const NAV: NavItem[] = [
  { kind: "anchor", id: "summary" },
  { kind: "anchor", id: "experience" },
  { kind: "route", id: "projets", href: "/projets" },
  { kind: "anchor", id: "stack" },
  { kind: "anchor", id: "education" },
  { kind: "anchor", id: "contact" },
];

export function SiteNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Elevate the bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy only makes sense on the home one-pager (sections live there).
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <nav
      className={`site-nav${scrolled ? " scrolled" : ""}`}
      aria-label={t("summary")}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        {onHome ? (
          <a
            href="#top"
            className="nav-brand shrink-0 text-lg"
            aria-label="Arnaud Dufour — haut de page"
          >
            AD
          </a>
        ) : (
          <Link
            href="/"
            className="nav-brand shrink-0 text-lg"
            aria-label="Arnaud Dufour — retour au CV"
          >
            AD
          </Link>
        )}
        <ul className="nav-scroller flex flex-1 items-center gap-5 overflow-x-auto sm:gap-7">
          {NAV.map((item) => {
            if (item.kind === "route") {
              return (
                <li key={item.id} className="shrink-0">
                  <Link
                    href={item.href}
                    className={`nav-link${!onHome ? " active" : ""}`}
                    aria-current={!onHome ? "page" : undefined}
                  >
                    {t(item.id)}
                  </Link>
                </li>
              );
            }
            // Anchor items: in-page smooth scroll on home, cross-page link elsewhere.
            return (
              <li key={item.id} className="shrink-0">
                {onHome ? (
                  <a
                    href={`#${item.id}`}
                    className={`nav-link${active === item.id ? " active" : ""}`}
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    {t(item.id)}
                  </a>
                ) : (
                  <Link href={`/#${item.id}`} className="nav-link">
                    {t(item.id)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="shrink-0">
          <LocaleSwitch />
        </div>
      </div>
    </nav>
  );
}
