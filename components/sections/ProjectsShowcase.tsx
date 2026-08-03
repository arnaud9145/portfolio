"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PROJECT_LOGOS, type Locale } from "@/content";
import type { ProjectItem } from "@/content/types";
import { CountUp } from "@/components/ui/CountUp";

/* ---- Device frames ---------------------------------------------------- */

/** Real screenshots (Roger) shown as an overlapping two-phone fan. */
function RogerVisual({ locale }: { locale: Locale }) {
  return (
    <div className="phone-fan" aria-hidden={false}>
      <div className="phone phone--back">
        <div className="phone-screen">
          <Image
            src={`/projects/roger/roger-${locale}-2.jpg`}
            alt="Roger — écran de l'application"
            width={800}
            height={1734}
            sizes="240px"
            className="phone-img"
          />
        </div>
      </div>
      <div className="phone phone--front">
        <div className="phone-screen">
          <Image
            src={`/projects/roger/roger-${locale}-1.jpg`}
            alt="Roger — écran principal de l'application"
            width={800}
            height={1734}
            sizes="240px"
            className="phone-img"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Real screenshots driven by project data (`project.screenshots`).
 * Unlike Roger's raw in-app captures, these assets already bake in their own
 * device frame/drop-shadow (pre-rendered marketing shots), so they render as
 * plain images (object-fit: contain, no extra CSS phone bezel) fanned out:
 * the first screenshot is the hero front shot, the next two fan out behind it.
 */
function ScreenshotsVisual({
  screenshots,
  variant,
}: {
  screenshots: NonNullable<ProjectItem["screenshots"]>;
  variant?: string;
}) {
  const [front, left, right] = screenshots;
  return (
    <div className={`device-fan${variant ? ` device-fan--${variant}` : ""}`}>
      {left && (
        <Image
          src={left.src}
          alt={left.alt}
          width={left.width}
          height={left.height}
          sizes="200px"
          className="device-shot device-shot--left"
        />
      )}
      {right && (
        <Image
          src={right.src}
          alt={right.alt}
          width={right.width}
          height={right.height}
          sizes="200px"
          className="device-shot device-shot--right"
        />
      )}
      <Image
        src={front.src}
        alt={front.alt}
        width={front.width}
        height={front.height}
        sizes="220px"
        className="device-shot device-shot--front"
      />
    </div>
  );
}

/**
 * A single real screenshot in landscape orientation (e.g. TV/digital-signage
 * captures) — rendered full-width as a rounded, bordered image rather than
 * squeezed into the portrait phone frame used by `ScreenshotsVisual`.
 */
function LandscapeVisual({
  screenshot,
}: {
  screenshot: NonNullable<ProjectItem["screenshots"]>[number];
}) {
  return (
    <div className="landscape-shot">
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        sizes="(min-width: 900px) 360px, 82vw"
        className="landscape-img"
      />
    </div>
  );
}

/** Styled placeholder device for projects without real screenshots. */
function PhoneMockup({
  project,
  previewSoon,
}: {
  project: ProjectItem;
  previewSoon: string;
}) {
  const initial = project.name.trim().charAt(0).toUpperCase();
  return (
    <div className="phone-fan">
      <div className="phone phone--front">
        <div className="phone-screen phone-screen--mock">
          <span className="phone-glow" aria-hidden />
          <span className="phone-initial font-display" aria-hidden>
            {initial}
          </span>
          <span className="phone-appname">{project.name}</span>
          <span className="phone-caption">{previewSoon}</span>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({
  project,
  locale,
  previewSoon,
  legacyNote,
}: {
  project: ProjectItem;
  locale: Locale;
  previewSoon: string;
  legacyNote: string;
}) {
  let visual;
  if (project.id === "roger") {
    visual = <RogerVisual locale={locale} />;
  } else if (project.screenshots && project.screenshots.length > 0) {
    const [first] = project.screenshots;
    // Landscape captures (width > height, e.g. TV/digital-signage screens)
    // don't fit the portrait phone frame — render them as a plain wide image.
    if (project.screenshots.length === 1 && first.width >= first.height) {
      visual = <LandscapeVisual screenshot={first} />;
    } else {
      visual = (
        <ScreenshotsVisual
          screenshots={project.screenshots}
          variant={project.id === "movizer" ? "movizer" : undefined}
        />
      );
    }
  } else {
    visual = <PhoneMockup project={project} previewSoon={previewSoon} />;
  }
  const note = project.screenshotNote ?? (project.legacy ? legacyNote : null);
  return (
    <div className="proj-visual-wrap">
      {visual}
      {note && <p className="proj-legacy-note">{note}</p>}
    </div>
  );
}

/* ---- Text block ------------------------------------------------------- */


// Major technologies surfaced as one-click filter chips on /projets.
const TECH_FILTERS = ["React Native", "Expo", "Next.js", "TypeScript", "Node.js"];

function ProjectText({
  project,
  experienceByProject,
}: {
  project: ProjectItem;
  experienceByProject: Record<string, string>;
}) {
  const t = useTranslations("projects");
  const expId = experienceByProject[project.id];
  const hasLogo = PROJECT_LOGOS.has(project.id);
  return (
    <div className="proj-text">
      <div className="proj-head">
        {hasLogo && (
          <Image
            src={`/logos/${project.id}.png`}
            alt=""
            width={68}
            height={68}
            className="proj-logo"
          />
        )}
        <div className="proj-head-main">
          {project.context &&
            (expId ? (
              <Link href={`/parcours#${expId}`} className="proj-context proj-context--link">
                {project.context}
                <svg className="proj-context-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ) : (
              <p className="proj-context">{project.context}</p>
            ))}
          <h2 className="proj-name font-display">{project.name}</h2>

          <div className="proj-badges">
            {project.badge ? (
              <span className="contribution-badge contribution--minor">{project.badge}</span>
            ) : project.contribution !== "minor" ? (
              <span className={`contribution-badge contribution--${project.contribution}`}>
                {t(`contribution.${project.contribution}`)}
              </span>
            ) : null}
            {project.role && (
              <span className="proj-role">
                <span className="proj-role-label">{t("roleLabel")}</span> {project.role}
              </span>
            )}
            {project.period && <span className="proj-period">{project.period}</span>}
          </div>
        </div>
      </div>

      <p className="proj-tagline">{project.tagline}</p>

      {project.description && <p className="proj-description">{project.description}</p>}

      {project.metrics.length > 0 && (
        <ul className="proj-metrics">
          {project.metrics.map((m) => (
            <li key={m} className="proj-metric">
              <CountUp value={m} />
            </li>
          ))}
        </ul>
      )}

      {project.tech && project.tech.length > 0 && (
        <div className="proj-tech">
          <span className="proj-tech-label">{t("techLabel")}</span>
          <ul className="proj-tech-list">
            {project.tech.map((tech) => (
              <li key={tech} className="pill proj-tech-pill">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(project.link || project.repo || project.repoBack || project.status) && (
        <div className="proj-footer">
          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline proj-store"
            >
              {project.link.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline proj-store proj-repo"
            >
              {project.repo.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          )}
          {project.repoBack && (
            <a
              href={project.repoBack.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline proj-store proj-repo"
            >
              {project.repoBack.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          )}
          {project.status && <span className="proj-status">{project.status}</span>}
        </div>
      )}
    </div>
  );
}

/* ---- Scrollytelling shell -------------------------------------------- */

export function ProjectsShowcase({
  projects,
  locale,
  experienceByProject = {},
}: {
  projects: ProjectItem[];
  locale: Locale;
  experienceByProject?: Record<string, string>;
}) {
  const t = useTranslations("projects");
  const previewSoon = t("previewSoon");
  const legacyNote = t("legacyNote");
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [activeTechs, setActiveTechs] = useState<string[]>([]);

  // Deep-link : /projets?tech=React%20Native pré-active un filtre techno (depuis
  // la section Stack, ou n'importe quel lien). Lu côté client au montage.
  useEffect(() => {
    const tech = new URLSearchParams(window.location.search).get("tech");
    if (tech) setActiveTechs([tech]);
  }, []);

  // Text + tech-chip filtering. A project matches when it satisfies the text
  // query (name / context / tagline / description / role / tech) AND — if any
  // chip is active — carries at least one of the selected technologies.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (activeTechs.length > 0) {
        const techs = p.tech ?? [];
        // Match large et bidirectionnel : "Expo / EAS" (Stack) trouve "Expo",
        // "Next.js" trouve "Next.js (landing)", etc.
        const matchTech = activeTechs.some((f) => {
          const fl = f.toLowerCase();
          return techs.some((tt) => {
            const tl = tt.toLowerCase();
            return tl.includes(fl) || fl.includes(tl);
          });
        });
        if (!matchTech) return false;
      }
      if (q) {
        const hay = [p.name, p.context, p.tagline, p.description, p.role, (p.tech ?? []).join(" ")]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [projects, query, activeTechs]);
  const filterKey = filtered.map((p) => p.id).join(",");
  const isDefault = query.trim() === "" && activeTechs.length === 0;
  const resetFilters = () => {
    setQuery("");
    setActiveTechs([]);
  };
  const toggleTech = (tech: string) =>
    setActiveTechs((prev) =>
      prev.includes(tech) ? prev.filter((x) => x !== tech) : [...prev, tech],
    );

  // Whenever the filtered set changes, restart the scroll-spy at the top.
  useEffect(() => {
    setActive(0);
  }, [filterKey]);

  // Scroll-spy: the section crossing the viewport's centre band becomes active,
  // driving which visual the sticky column shows. Desktop + motion enhancement
  // only; the inline visuals cover every other case via CSS.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".proj-section"),
    );
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [filterKey]);

  // Scroll-linked fan spread: as you scroll THROUGH the active project's
  // section, the stacked screenshots fan out (--spread 0→1). Throttled via rAF,
  // desktop sticky column only, and disabled under reduced-motion (CSS default
  // --spread:1 then keeps the fan fully spread).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const inner = document.querySelector<HTMLElement>(".scrolly-visuals-inner");
    if (!inner) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".proj-section"),
    );
    if (sections.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const section = sections[active];
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = rect.height || 1;
      const p = Math.min(
        1,
        Math.max(
          0,
          (window.scrollY + window.innerHeight * 0.5 - sectionTop) / sectionHeight,
        ),
      );
      // Remap so the fan is already partly open on arrival (base ~0.4) and
      // reaches full spread before the section hands off to the next one.
      const spread = Math.min(1, 0.4 + 0.75 * p);
      inner.style.setProperty("--spread", String(spread));
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [active, filterKey]);

  return (
    <>
      <div className="proj-filters">
        <input
          type="search"
          className="proj-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
        />
        <div className="proj-filter-chips">
          <button
            type="button"
            className={`proj-filter-chip${isDefault ? " is-active" : ""}`}
            aria-pressed={isDefault}
            onClick={resetFilters}
          >
            {t("filterAll")}
          </button>
          {[
            ...TECH_FILTERS,
            ...activeTechs.filter(
              (t) => !TECH_FILTERS.some((d) => d.toLowerCase() === t.toLowerCase()),
            ),
          ].map((tech) => {
            const on = activeTechs.includes(tech);
            return (
              <button
                key={tech}
                type="button"
                className={`proj-filter-chip${on ? " is-active" : ""}`}
                aria-pressed={on}
                onClick={() => toggleTech(tech)}
              >
                {tech}
              </button>
            );
          })}
        </div>
        <span className="proj-filter-count">{t("count", { count: filtered.length })}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="proj-empty">
          <p>{t("noResults")}</p>
          <button type="button" className="btn btn-outline" onClick={resetFilters}>
            {t("resetFilters")}
          </button>
        </div>
      ) : (
        <div className="scrolly">
          <div className="scrolly-track">
            {filtered.map((project, i) => (
              <section
                key={project.id}
                id={project.id}
                data-index={i}
                className="proj-section"
              >
                <div className="proj-visual-inline">
                  <ProjectVisual
                    project={project}
                    locale={locale}
                    previewSoon={previewSoon}
                    legacyNote={legacyNote}
                  />
                </div>
                <ProjectText project={project} experienceByProject={experienceByProject} />
              </section>
            ))}
          </div>

          <div className="scrolly-visuals" aria-hidden>
            <div className="scrolly-visuals-inner">
              {filtered.map((project, i) => (
                <div
                  key={project.id}
                  className={`visual-slide${
                    i === active ? " is-active" : i < active ? " is-prev" : " is-next"
                  }`}
                >
                  <ProjectVisual
                    project={project}
                    locale={locale}
                    previewSoon={previewSoon}
                    legacyNote={legacyNote}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
