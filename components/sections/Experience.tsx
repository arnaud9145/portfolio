"use client";
import { useEffect, useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { experienceApps, type CvContent, type ExperienceApp } from "@/content";
import type {
  EducationItem,
  ExperienceItem,
  Locale,
} from "@/content/types";

/**
 * Machine-readable timeline dates (decimal years — month/12), keyed by the
 * entry id used in the rendered order: experience ids first, then the two
 * "formation-N" study rows. `end: null` means "still ongoing" (resolved to the
 * current date at runtime — this is a client component). These drive both the
 * time-proportional vertical spacing and each entry's visible duration; they
 * are intentionally NOT part of content/*.ts.
 */
export const TIMELINE_DATES: Record<
  string,
  { start: number; end: number | null }
> = {
  unlockt: { start: 2024.67, end: null },
  "le-collectionist": { start: 2024.33, end: 2024.67 },
  roger: { start: 2023.08, end: 2024.25 },
  freelance: { start: 2022.67, end: null },
  happliness: { start: 2021.83, end: 2023.08 },
  bam: { start: 2020.08, end: 2021.83 },
  ung: { start: 2016.67, end: 2019.5 },
  "formation-0": { start: 2020.0, end: 2020.0 },
  "formation-1": { start: 2020.0, end: 2020.0 },
};

// Vertical spacing: pixels per year of real time between two entries, clamped.
const PX_PER_YEAR = 90;
const GAP_MIN = 14;
const GAP_MAX = 130;

/** Current date as a decimal year, used to resolve `end: null` entries. */
function currentDecimalYear(): number {
  const now = new Date();
  return now.getFullYear() + now.getMonth() / 12;
}

/** Resolve an entry's [start, end] in decimal years (null end → today). */
function span(id: string, now: number): { start: number; end: number } | null {
  const d = TIMELINE_DATES[id];
  if (!d) return null;
  return { start: d.start, end: d.end ?? now };
}

/**
 * Discreet human duration for an entry.
 * - ongoing (end === null) → « en cours » / « ongoing »
 * - a point-in-time entry (start === end, e.g. a diploma year) → null (hidden)
 * - otherwise « X an(s) Y mois » (FR) / « X yr Y mo » (EN); < 1 month → 1 month
 */
function formatDuration(id: string, locale: Locale, now: number): string | null {
  const d = TIMELINE_DATES[id];
  if (!d) return null;
  if (d.end === null) return locale === "fr" ? "en cours" : "ongoing";
  const diff = d.end - d.start;
  if (diff <= 0) return null;
  const totalMonths = Math.max(1, Math.round(diff * 12));
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (locale === "fr") {
    if (years > 0) {
      const y = `${years} an${years > 1 ? "s" : ""}`;
      return months > 0 ? `${y} ${months} mois` : y;
    }
    return `${months} mois`;
  }
  if (years > 0) {
    const y = `${years} yr`;
    return months > 0 ? `${y} ${months} mo` : y;
  }
  return `${months} mo`;
}

/**
 * Top margin for the entry at `index` so the vertical gap to the entry above it
 * is proportional to the real time elapsed between them (clamped). The list is
 * ordered recent → older; between entry i (above) and i+1 (below) the gap is
 * clamp((start[i] − end[i+1]) · PX_PER_YEAR, GAP_MIN, GAP_MAX).
 */
function gapBefore(orderedIds: string[], index: number, now: number): number {
  if (index === 0) return 0;
  const above = span(orderedIds[index - 1], now);
  const current = span(orderedIds[index], now);
  if (!above || !current) return GAP_MIN;
  const px = (above.start - current.end) * PX_PER_YEAR;
  return Math.round(Math.min(GAP_MAX, Math.max(GAP_MIN, px)));
}
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function Chevron() {
  return (
    <svg
      className="acc-chevron"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}

function ExperienceRow({
  xp,
  apps,
  centered,
  duration,
}: {
  xp: ExperienceItem;
  apps: ExperienceApp[];
  centered: boolean;
  duration: string | null;
}) {
  const t = useTranslations("actions");
  const [open, setOpen] = useState(false);
  const uid = useId();
  const headId = `xp-head-${uid}`;
  const panelId = `xp-panel-${uid}`;

  // Open + scroll into view when the URL hash targets this experience
  // (e.g. arriving from /projets via /#bam). Read the hash on the client only,
  // never during render, to avoid any hydration mismatch.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const openIfTargeted = () => {
      if (window.location.hash === `#${xp.id}`) {
        setOpen(true);
        document
          .getElementById(xp.id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    openIfTargeted();
    window.addEventListener("hashchange", openIfTargeted);
    return () => window.removeEventListener("hashchange", openIfTargeted);
  }, [xp.id]);

  return (
    <div
      id={xp.id}
      className={`card card-hover scroll-mt-24 p-5 sm:p-6${open ? " acc-open" : ""}${
        centered ? " xp-centered" : ""
      }`}
    >
      <span className="xp-node" aria-hidden />
      <button
        id={headId}
        type="button"
        className="acc-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex w-full items-start justify-between gap-4">
          <span className="min-w-0">
            <span className="xp-period">
              {xp.period}
              {duration && <span className="xp-duration"> · {duration}</span>}
            </span>
            <span className="block font-display text-lg font-semibold text-fg">
              {xp.company}
            </span>
            <span className="mt-1 block text-sm text-gold-hi">{xp.role}</span>
            {xp.tag && <span className="xp-tag">{xp.tag}</span>}
            {xp.summary && (
              <span className="mt-1.5 block text-sm text-muted">{xp.summary}</span>
            )}
          </span>
          <Chevron />
        </span>
      </button>

      {apps.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {apps.map((app) => (
            <Link
              key={app.projectId}
              href={`/projets#${app.projectId}`}
              className="tag-app"
            >
              {app.hasLogo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/logos/${app.projectId}.png`}
                  alt=""
                  width={18}
                  height={18}
                  className="tag-app-logo"
                  loading="lazy"
                />
              )}
              {app.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Link>
          ))}
        </div>
      )}

      <div
        id={panelId}
        role="region"
        aria-labelledby={headId}
        className={`acc-panel${open ? " open" : ""}`}
        inert={!open}
      >
        <div className="acc-inner">
          <div className="pt-5">
            {xp.highlights.length > 0 && (
              <ul className="space-y-2 border-l border-border pl-4 text-sm leading-relaxed text-muted">
                {xp.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {xp.companyUrl && xp.companyUrl !== "#" && (
              <a
                href={xp.companyUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="xp-linkedin"
              >
                <LinkedInIcon />
                {t("viewCompany")}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudyRow({
  edu,
  label,
  id,
  centered,
}: {
  edu: EducationItem;
  label: string;
  id: string;
  centered: boolean;
}) {
  return (
    <div
      id={id}
      className={`card scroll-mt-24 p-5 sm:p-6 xp-study${
        centered ? " xp-centered xp-centered--study" : ""
      }`}
    >
      <span className="xp-node xp-node--study" aria-hidden />
      <span className="xp-period xp-period--study">{edu.period}</span>
      <span className="xp-edu-label">{label}</span>
      <span className="block font-display text-lg font-semibold text-fg">
        {edu.title}
      </span>
      {edu.orgUrl ? (
        <a
          href={edu.orgUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="xp-org--study xp-org--link mt-1 inline-block text-sm"
        >
          {edu.org}
        </a>
      ) : (
        <span className="mt-1 block text-sm xp-org--study">{edu.org}</span>
      )}
      {edu.details && (
        <span className="mt-1.5 block text-sm text-muted">{edu.details}</span>
      )}
    </div>
  );
}

export function Experience({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  const locale = useLocale() as Locale;
  const [centeredId, setCenteredId] = useState<string | null>(null);

  // Rendered order (recent → older): experiences, then study rows. The study
  // ids (formation-N) mirror the keys in TIMELINE_DATES.
  const orderedIds = useMemo(
    () => [
      ...content.experience.map((xp) => xp.id),
      ...content.education.map((_, i) => `formation-${i}`),
    ],
    [content.experience, content.education],
  );

  // Resolve current date once per render for null-ended entries.
  const now = currentDecimalYear();

  // Highlight the card crossing the viewport's centre band as the list is
  // scrolled — experiences AND study rows. Observe each by its id; clean up on
  // unmount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const cards = orderedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (cards.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCenteredId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [orderedIds]);

  const expCount = content.experience.length;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="experience">{t("experience")}</SectionHeading>
      <div className="xp-timeline">
        {content.experience.map((xp, i) => (
          <Reveal
            key={xp.id}
            delay={Math.min(i, 4) * 70}
            className="xp-item"
            style={{ marginTop: gapBefore(orderedIds, i, now) }}
          >
            <ExperienceRow
              xp={xp}
              apps={experienceApps(content, xp.id)}
              centered={centeredId === xp.id}
              duration={formatDuration(xp.id, locale, now)}
            />
          </Reveal>
        ))}
        {content.education.map((edu, i) => {
          const id = `formation-${i}`;
          return (
            <Reveal
              key={edu.title}
              delay={Math.min(i, 4) * 70}
              className="xp-item"
              style={{ marginTop: gapBefore(orderedIds, expCount + i, now) }}
            >
              <StudyRow
                edu={edu}
                label={t("education")}
                id={id}
                centered={centeredId === id}
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
