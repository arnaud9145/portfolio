"use client";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import type { ExperienceItem } from "@/content/types";
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

function ExperienceRow({ xp }: { xp: ExperienceItem }) {
  const t = useTranslations("actions");
  const [open, setOpen] = useState(false);
  const uid = useId();
  const headId = `xp-head-${uid}`;
  const panelId = `xp-panel-${uid}`;

  return (
    <div className={`card card-hover p-5 sm:p-6${open ? " acc-open" : ""}`}>
      <button
        id={headId}
        type="button"
        className="acc-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="min-w-0">
          <span className="block font-display text-lg font-semibold text-fg">
            {xp.company}
          </span>
          <span className="mt-1 block text-sm">
            <span className="text-gold-hi">{xp.role}</span>
            <span className="text-muted"> · {xp.period}</span>
          </span>
        </span>
        <Chevron />
      </button>

      {xp.appTags && xp.appTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {xp.appTags.map((tag) => (
            <Link
              key={tag.projectId}
              href={`/projets#${tag.projectId}`}
              className="tag-app"
            >
              {tag.label}
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
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-gold-hi underline decoration-gold-lo/50 underline-offset-4 transition-colors hover:decoration-gold-hi"
              >
                {t("viewCompany")}
                <svg
                  width="13"
                  height="13"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading id="experience">{t("experience")}</SectionHeading>
      <div className="space-y-4">
        {content.experience.map((xp, i) => (
          <Reveal key={xp.id} delay={Math.min(i, 4) * 70}>
            <ExperienceRow xp={xp} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
