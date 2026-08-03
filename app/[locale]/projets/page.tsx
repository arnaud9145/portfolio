import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getContent, experienceByProject, type Locale } from "@/content";
import { buildProjectsMetadata } from "@/lib/seo";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildProjectsMetadata(locale as Locale);
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  const t = await getTranslations("projects");

  // projectId → experienceId, derived from the projects themselves (single source).
  const projectExperience = experienceByProject(content);

  return (
    <main className="projets-main">
      <header className="projets-hero">
        <div className="hero-glow" aria-hidden />
        <div className="projets-hero-inner">
          <span className="projets-eyebrow">{t("eyebrow")}</span>
          <h1 className="projets-title font-display">{t("title")}</h1>
          <div className="filet" aria-hidden />
          <p className="projets-intro">{t("intro")}</p>
          <span className="projets-count">{t("count", { count: content.projects.length })}</span>
        </div>
      </header>

      <ProjectsShowcase
        projects={content.projects}
        locale={locale as Locale}
        experienceByProject={projectExperience}
      />
    </main>
  );
}
