"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Locale } from "@/content";
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
}: {
  screenshots: NonNullable<ProjectItem["screenshots"]>;
}) {
  const [front, left, right] = screenshots;
  return (
    <div className="device-fan">
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
}: {
  project: ProjectItem;
  locale: Locale;
  previewSoon: string;
}) {
  if (project.id === "roger") return <RogerVisual locale={locale} />;
  if (project.screenshots && project.screenshots.length > 0) {
    const [first] = project.screenshots;
    // Landscape captures (width > height, e.g. TV/digital-signage screens)
    // don't fit the portrait phone frame — render them as a plain wide image.
    if (project.screenshots.length === 1 && first.width > first.height) {
      return <LandscapeVisual screenshot={first} />;
    }
    return <ScreenshotsVisual screenshots={project.screenshots} />;
  }
  return <PhoneMockup project={project} previewSoon={previewSoon} />;
}

/* ---- Text block ------------------------------------------------------- */

function ProjectText({ project }: { project: ProjectItem }) {
  const t = useTranslations("projects");
  return (
    <div className="proj-text">
      {project.context && <p className="proj-context">{project.context}</p>}
      <h2 className="proj-name font-display">{project.name}</h2>

      <div className="proj-badges">
        <span className={`contribution-badge contribution--${project.contribution}`}>
          {t(`contribution.${project.contribution}`)}
        </span>
        {project.role && (
          <span className="proj-role">
            <span className="proj-role-label">{t("roleLabel")}</span> {project.role}
          </span>
        )}
      </div>

      <p className="proj-tagline">{project.tagline}</p>

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

      {(project.link || project.repo || project.status) && (
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
}: {
  projects: ProjectItem[];
  locale: Locale;
}) {
  const t = useTranslations("projects");
  const previewSoon = t("previewSoon");
  const [active, setActive] = useState(0);

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
  }, []);

  return (
    <div className="scrolly">
      <div className="scrolly-track">
        {projects.map((project, i) => (
          <section
            key={project.id}
            id={project.id}
            data-index={i}
            className="proj-section"
          >
            <div className="proj-visual-inline">
              <ProjectVisual project={project} locale={locale} previewSoon={previewSoon} />
            </div>
            <ProjectText project={project} />
          </section>
        ))}
      </div>

      <div className="scrolly-visuals" aria-hidden>
        <div className="scrolly-visuals-inner">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`visual-slide${
                i === active ? " is-active" : i < active ? " is-prev" : " is-next"
              }`}
            >
              <ProjectVisual project={project} locale={locale} previewSoon={previewSoon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
