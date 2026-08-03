import type { CvContent, Locale } from "./types";
import { fr } from "./fr";
import { en } from "./en";

const byLocale: Record<Locale, CvContent> = { fr, en };

export function getContent(locale: Locale): CvContent {
  return byLocale[locale];
}

/**
 * Project ids that ship an app logo at /logos/<id>.png. Single source, shared by
 * the projects grid (ProjectsShowcase) and the experience app-tags (Experience).
 */
export const PROJECT_LOGOS = new Set<string>([
  "unlockt", "disorder", "exposed", "le-collectionist", "roger", "movizer",
  "ornikar", "konectom", "rift", "jutheau-husson", "my-utt", "integration-utt",
  "gala-utt", "gala-tv", "utt-arena", "uttarena-app", "flute",
  "kroptek", "billetterie-bde", "etuutt",
]);

export function hasProjectLogo(id: string): boolean {
  return PROJECT_LOGOS.has(id);
}

/**
 * projectId → experienceId, derived straight from each project's `experienceId`.
 * The projects list is the single source of truth for this relationship.
 */
export function experienceByProject(content: CvContent): Record<string, string> {
  const map: Record<string, string> = {};
  for (const p of content.projects) {
    if (p.experienceId) map[p.id] = p.experienceId;
  }
  return map;
}

export interface ExperienceApp {
  label: string;
  projectId: string;
  hasLogo: boolean;
}

/**
 * Apps/projects tied to a given experience — derived from the projects list
 * (project.experienceId === experienceId), in project order. This is why adding
 * a project can never again be forgotten in an experience's tag list.
 */
export function experienceApps(content: CvContent, experienceId: string): ExperienceApp[] {
  return content.projects
    .filter((p) => p.experienceId === experienceId)
    .map((p) => ({ label: p.name, projectId: p.id, hasLogo: PROJECT_LOGOS.has(p.id) }));
}

/* ---- Stack technique dérivée des projets (source unique) -------------- *
 * La stack n'est plus maintenue à la main : elle est calculée à partir des
 * `tech` de tous les projets. Ajouter une techno à un projet la fait apparaître
 * automatiquement dans la bonne catégorie. Deux réglages seulement :
 *  - TECH_ALIASES : fusionne les variantes ("Node" → "Node.js", etc.)
 *  - TECH_GROUP   : range chaque techno dans un groupe (défaut : "infra").      */

// Variantes → forme canonique unique (clé en minuscules).
const TECH_ALIASES: Record<string, string> = {
  node: "Node.js",
  "ionic 3": "Ionic",
  "next.js 16": "Next.js",
  "next.js (landing)": "Next.js",
  "graphql (apollo)": "GraphQL",
  "apollo / graphql": "GraphQL",
  "colyseus (temps réel)": "Colyseus",
  "colyseus (real-time)": "Colyseus",
  "puppeteer (pdf)": "Puppeteer",
  "aws s3": "AWS",
};
function canonicalTech(raw: string): string {
  return TECH_ALIASES[raw.trim().toLowerCase()] ?? raw.trim();
}

type StackGroupKey = "mobile" | "web" | "back" | "infra";
export const STACK_GROUP_ORDER: StackGroupKey[] = ["mobile", "web", "back", "infra"];

// Techno canonique → groupe. Non listée ⇒ "infra" (jamais perdue).
const TECH_GROUP: Record<string, StackGroupKey> = {
  "React Native": "mobile", Expo: "mobile", TypeScript: "mobile", "React Query": "mobile",
  Reanimated: "mobile", Skia: "mobile", "Shared Element": "mobile", Lottie: "mobile",
  SVG: "mobile", "Stream Chat": "mobile", MMKV: "mobile", Detox: "mobile",
  "Redux Toolkit": "mobile", OneSignal: "mobile", Ionic: "mobile", Angular: "mobile",
  Cordova: "mobile", "Modules natifs": "mobile", "Native modules": "mobile",
  i18n: "mobile",
  React: "web", "Next.js": "web", "Tailwind CSS": "web", "next-intl": "web",
  MUI: "web", "Ant Design": "web", "Chart.js": "web", Redux: "web", Vitest: "web",
  NestJS: "back", "Node.js": "back", GraphQL: "back", PostgreSQL: "back", TypeORM: "back",
  Redis: "back", Colyseus: "back", Nodemailer: "back", Puppeteer: "back",
  "OpenID Connect": "back", "Laravel / PHP": "back", PHP: "back", Symfony: "back",
  AWS: "infra", Heroku: "infra", Vercel: "infra", Firebase: "infra", Sentry: "infra",
  RevenueCat: "infra", Amplitude: "infra", "GitHub Actions": "infra", Fastlane: "infra",
  AppCenter: "infra", ForestAdmin: "infra", Stripe: "infra", Mapbox: "infra",
  Algolia: "infra", HelloAsso: "infra", Veriff: "infra", Yoti: "infra",
  "Claude Code": "infra",
};

// Technos présentes en projet mais masquées de la stack (peu vendeuses).
const STACK_EXCLUDE = new Set<string>(["SVG", "Shared Element"]);

// Technos phares : affichées plus grandes et en tête de leur groupe.
export const PRIMARY_TECHS = new Set<string>([
  "React Native", "Expo", "TypeScript", "Reanimated", "React Query", "Skia",
  "Next.js", "React", "NestJS", "Node.js", "GraphQL", "PostgreSQL", "Firebase",
  "AWS", "Sentry",
]);

export interface DerivedStackItem {
  name: string;
  primary: boolean;
}
export interface DerivedStackGroup {
  key: StackGroupKey;
  items: DerivedStackItem[];
}

/**
 * Groupes de stack dérivés de TOUTES les technos des projets (ordre de première
 * apparition, dédupliqué via les alias, phares en tête). Garantit que la stack
 * reflète toujours la base — impossible d'oublier une techno.
 */
export function derivedStack(content: CvContent): DerivedStackGroup[] {
  const group = new Map<string, StackGroupKey>(); // canonical → group, insertion order
  for (const p of content.projects) {
    for (const raw of p.tech ?? []) {
      const tech = canonicalTech(raw);
      if (STACK_EXCLUDE.has(tech) || group.has(tech)) continue;
      group.set(tech, TECH_GROUP[tech] ?? "infra");
    }
  }
  return STACK_GROUP_ORDER.map((key) => ({
    key,
    items: [...group.entries()]
      .filter(([, g]) => g === key)
      .map(([name]) => ({ name, primary: PRIMARY_TECHS.has(name) }))
      // phares en tête (tri stable : conserve l'ordre d'apparition à l'intérieur)
      .sort((a, b) => Number(b.primary) - Number(a.primary)),
  })).filter((g) => g.items.length > 0);
}

export type { CvContent, Locale };
