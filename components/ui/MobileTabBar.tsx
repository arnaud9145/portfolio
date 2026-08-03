"use client";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}
function IconExperience() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}
function IconProjects() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="3" width="10" height="18" rx="2" />
      <path d="M17 7h3v11a2 2 0 0 1-2 2h-1" />
    </svg>
  );
}
function IconContact() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function Tab({
  active,
  href,
  label,
  icon,
}: {
  active: boolean;
  href: string;
  label: string;
  icon: ReactNode;
}) {
  const className = `mobile-tab${active ? " active" : ""}`;
  const current = active ? ("page" as const) : undefined;
  return (
    <Link href={href} className={className} aria-current={current}>
      <span className="mobile-tab-icon">{icon}</span>
      <span className="mobile-tab-label">{label}</span>
    </Link>
  );
}

/**
 * App-style bottom tab bar, shown on mobile only (hidden ≥ md via CSS). Turns the
 * portfolio into a native-feeling mobile app — a deliberate nod to Arnaud's craft.
 * Active tab follows the current route.
 */
export function MobileTabBar() {
  const t = useTranslations("tabs");
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="mobile-tabbar" aria-label={t("label")}>
      <Tab active={isActive("/")} href="/" label={t("home")} icon={<IconHome />} />
      <Tab active={isActive("/parcours")} href="/parcours" label={t("experience")} icon={<IconExperience />} />
      <Tab active={isActive("/projets")} href="/projets" label={t("projects")} icon={<IconProjects />} />
      <Tab active={isActive("/contact")} href="/contact" label={t("contact")} icon={<IconContact />} />
    </nav>
  );
}
