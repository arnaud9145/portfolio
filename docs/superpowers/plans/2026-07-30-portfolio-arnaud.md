# Portfolio / CV en ligne — Arnaud Dufour — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire un CV/portfolio en ligne bilingue (FR/EN), sobre, ultra-rapide, déployé sur Vercel, servant de candidature spontanée pour un poste d'ingénieur mobile senior à Paris.

**Architecture:** Next.js App Router en génération statique, i18n via next-intl (`/fr`, `/en`), contenu dans des modules TypeScript typés par langue, une seule page composée de sections. Deux routes API dynamiques : formulaire de contact (Resend) et révélation du numéro de téléphone (variable d'env). Tests avec Vitest + React Testing Library, TDD sur la logique (routes API, utilitaires, validation de contenu).

**Tech Stack:** Next.js (latest, App Router), TypeScript, Tailwind CSS, next-intl, Resend, @vercel/analytics, Vitest, @testing-library/react.

## Global Constraints

- **Framework** : Next.js App Router + TypeScript. Développement sur macOS, dossier `/Users/arnaud/Documents/perso/portfolio-arnaud`.
- **Rédaction** : écrire « **React Native depuis 2018** », jamais « X ans d'expérience ». Localisation toujours « **Reims — 45 min de Paris Gare de l'Est** », jamais « Reims » seul.
- **Ne rien inventer** : chiffres et infos manquantes → demander à Arnaud (voir Task 14). Les champs de contenu inconnus restent vides et sont listés, jamais remplis au hasard.
- **Perf/A11y/SEO non négociables** : Lighthouse au vert (Perf/A11y/Best Practices/SEO), CLS ≈ 0, mobile-first, contrastes AA, navigation clavier, `alt` partout, HTML sémantique. JS client minimal (composants serveur par défaut ; `"use client"` seulement pour Reveal phone, ContactForm, ThemeToggle, LocaleSwitch).
- **Repo public** : ne JAMAIS committer salaire, adresse postale, secrets. `PHONE_NUMBER` et `RESEND_API_KEY` en `.env.local` gitignoré + env Vercel. Le numéro de téléphone reste dans le PDF public (décision assumée) mais **jamais en HTML/bundle/repo**.
- **Ton** : sobre et direct, aucun superlatif, aucun jargon marketing.

---

## File Structure

```
portfolio-arnaud/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # <html>, fonts, thème, analytics, providers, metadata
│   │   └── page.tsx            # assemble les sections
│   ├── api/
│   │   ├── contact/route.ts    # POST -> Resend
│   │   └── phone/route.ts      # GET -> PHONE_NUMBER (rate-limité)
│   └── globals.css             # Tailwind + variables thème
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Summary.tsx
│   │   ├── Apps.tsx
│   │   ├── Experience.tsx
│   │   ├── Stack.tsx
│   │   ├── Education.tsx        # formation + UNG + langues
│   │   └── Contact.tsx
│   └── ui/
│       ├── SectionHeading.tsx
│       ├── StoreLink.tsx
│       ├── LocaleSwitch.tsx     # client
│       ├── ThemeToggle.tsx      # client
│       ├── RevealPhone.tsx      # client
│       ├── ObfuscatedEmail.tsx  # client
│       └── ContactForm.tsx      # client
├── content/
│   ├── types.ts                # types du contenu CV
│   ├── fr.ts
│   ├── en.ts
│   └── index.ts                # getContent(locale)
├── i18n/
│   ├── routing.ts
│   ├── navigation.ts
│   └── request.ts
├── lib/
│   ├── obfuscate.ts            # assemblage email
│   ├── rate-limit.ts           # limiteur en mémoire
│   └── seo.ts                  # metadata + JSON-LD Person
├── messages/
│   ├── fr.json                 # microcopie UI (nav, labels)
│   └── en.json
├── public/
│   ├── cv-arnaud-dufour.pdf
│   └── og-image.png
├── middleware.ts               # routing locale next-intl
├── .env.example
├── .env.local                  # gitignoré
├── next.config.ts
├── vitest.config.ts
├── vitest.setup.ts
└── README.md
```

---

## Task 1: Scaffold projet + outillage de test

**Files:**
- Create: tout l'arbre `create-next-app` à la racine du repo existant
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces: projet Next.js fonctionnel ; commande `npm test` (Vitest) ; commande `npm run dev`.

- [ ] **Step 1: Scaffolder Next.js dans le dossier courant**

Le dossier contient déjà `.git`, `.gitignore` et `docs/`. Scaffolder en place :

```bash
cd /Users/arnaud/Documents/perso/portfolio-arnaud
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

Répondre « Yes » si l'outil demande d'écrire dans un dossier non vide (il conserve `.git` et `docs/`). Si `create-next-app` refuse à cause du dossier non vide, scaffolder dans un sous-dossier temporaire puis déplacer les fichiers :

```bash
npx create-next-app@latest .cna-tmp --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
cp -R .cna-tmp/. . && rm -rf .cna-tmp
```

- [ ] **Step 2: Vérifier le dev server**

Run: `npm run dev` puis ouvrir http://localhost:3000
Expected: page d'accueil Next.js par défaut s'affiche. Arrêter avec Ctrl-C.

- [ ] **Step 3: Installer les dépendances de test**

```bash
npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom
```

- [ ] **Step 4: Créer `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 5: Créer `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 6: Ajouter les scripts de test dans `package.json`**

Dans `"scripts"`, ajouter :

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Test de fumée du runner**

Créer `lib/__smoke__.test.ts` :

```ts
import { describe, it, expect } from "vitest";
describe("runner", () => {
  it("works", () => { expect(1 + 1).toBe(2); });
});
```

Run: `npm test`
Expected: 1 test passe. Puis supprimer le fichier : `rm lib/__smoke__.test.ts`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app + Vitest"
```

---

## Task 2: Modèle de contenu typé

**Files:**
- Create: `content/types.ts`, `content/fr.ts`, `content/en.ts`, `content/index.ts`
- Test: `content/content.test.ts`

**Interfaces:**
- Produces: type `CvContent` ; `getContent(locale: "fr" | "en"): CvContent`. Champs consommés par toutes les sections.

- [ ] **Step 1: Écrire le test de cohérence de contenu**

`content/content.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { getContent } from "@/content";

describe("content", () => {
  it("expose fr et en avec les mêmes clés de sections", () => {
    const fr = getContent("fr");
    const en = getContent("en");
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
  });

  it("liste les mêmes apps dans les deux langues", () => {
    const fr = getContent("fr");
    const en = getContent("en");
    expect(fr.apps.map((a) => a.id)).toEqual(en.apps.map((a) => a.id));
  });

  it("respecte la règle de localisation (jamais 'Reims' seul)", () => {
    const fr = getContent("fr");
    expect(fr.hero.location).toContain("45 min");
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test content/content.test.ts`
Expected: FAIL (module `@/content` introuvable).

- [ ] **Step 3: Écrire `content/types.ts`**

```ts
export type Locale = "fr" | "en";

export interface AppItem {
  id: string;
  name: string;
  role: string;          // ex: "Senior Mobile Engineer"
  tagline: string;       // concept en une phrase
  metrics: string[];     // ex: ["50k utilisateurs", "crash-free 99.7%"] — vide si inconnu
  link?: { href: string; label: string }; // store ou lien vivant
  status?: string;       // ex: "Retirée du store (2024)"
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;        // ex: "sept. 2024 → aujourd'hui"
  summary: string;
  highlights: string[];  // réalisations chiffrées — vide si inconnu
  clients?: string[];
}

export interface StackGroup {
  label: string;         // ex: "Mobile"
  items: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  details?: string;
}

export interface CvContent {
  hero: {
    name: string;
    title: string;       // "Senior React Native Engineer"
    tagline: string;     // "React Native depuis 2018 · Ex-CTO & cofondateur · AI-Native"
    location: string;    // "Reims — 45 min de Paris Gare de l'Est"
    availability: string;
  };
  summary: { title: string; body: string }[]; // les 3 arguments
  apps: AppItem[];
  experience: ExperienceItem[];
  stack: StackGroup[];
  education: EducationItem[];
  associative: EducationItem[]; // UNG
  languages: { name: string; level: string }[];
}
```

- [ ] **Step 4: Écrire `content/fr.ts` (squelette structuré, valeurs connues uniquement)**

Remplir avec les infos **certaines** du brief ; laisser `metrics`/`highlights` en `[]` là où les chiffres manquent (ils seront complétés en Task 14, jamais inventés).

```ts
import type { CvContent } from "./types";

export const fr: CvContent = {
  hero: {
    name: "Arnaud Dufour",
    title: "Senior React Native Engineer",
    tagline: "React Native depuis 2018 · Ex-CTO & cofondateur · AI-Native",
    location: "Reims — 45 min de Paris Gare de l'Est",
    availability: "En recherche — CDI ingénieur mobile senior, Paris",
  },
  summary: [
    { title: "Senior React Native", body: "Spécialisation mobile profonde depuis 2018. Pas un fullstack qui fait « aussi » du mobile." },
    { title: "Ex-CTO & cofondateur", body: "Happliness / Movizer : arbitrage produit, cadrage, pilotage des choix techniques." },
    { title: "AI-Native", body: "IA intégrée au workflow de dev quotidien, avec des gains mesurables." },
  ],
  apps: [
    { id: "disorder", name: "Disorder", role: "Mobile Engineer", tagline: "App sociale : chaque semaine, des group chats avec des inconnus de ta zone (groupes mixtes 50/50).", metrics: [], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" } },
    { id: "unlockt", name: "Unlockt", role: "Senior Mobile Engineer", tagline: "Vente de fichiers par des créateurs.", metrics: [], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" } },
    { id: "exposed", name: "Exposed", role: "Mobile Engineer", tagline: "Party game « Who's Most Likely To » (5000+ défis, 4 modes).", metrics: [], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" } },
    { id: "movizer", name: "Movizer", role: "CTO & cofondateur", tagline: "Recommandations personnalisées de films & séries, partage entre amis.", metrics: [], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Retirée de l'App Store (fév. 2024)" },
  ],
  experience: [
    { id: "unlockt", company: "Unlockt.me", role: "Senior Mobile Engineer", period: "sept. 2024 → aujourd'hui", summary: "", highlights: [] },
    { id: "collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "mai → sept. 2024", summary: "", highlights: [] },
    { id: "roger", company: "Roger", role: "Mobile Engineer", period: "févr. 2023 → avr. 2024", summary: "", highlights: [] },
    { id: "happliness", company: "Happliness (Movizer)", role: "CTO & cofondateur", period: "nov. 2021 → févr. 2023", summary: "", highlights: [] },
    { id: "bam", company: "BAM", role: "Mobile Engineer", period: "févr. 2020 → nov. 2021", summary: "", highlights: [], clients: ["Ornikar", "Biogen", "Lita", "Jutheau-Husson"] },
  ],
  stack: [
    { label: "Mobile", items: ["React Native", "Expo / EAS", "TypeScript", "Reanimated", "Skia", "Modules natifs", "React Query"] },
    { label: "Back", items: ["NestJS", "PostgreSQL"] },
    { label: "Infra & Outils", items: ["AWS", "RevenueCat", "Sentry", "Firebase", "GitHub Actions"] },
  ],
  education: [
    { title: "Diplôme d'ingénieur réseaux & télécommunications", org: "Université de Technologie de Troyes", period: "2020", details: "Technologies mobiles et systèmes embarqués." },
    { title: "Master sécurité des systèmes d'information", org: "Université de Technologie de Troyes", period: "2020" },
  ],
  associative: [
    { title: "UNG — UTT Net Group", org: "Association étudiante, UTT", period: "pendant les études", details: "Premiers sites et applications mobiles (~4 apps, 2-3 sites)." },
  ],
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "C1" },
    { name: "Espagnol", level: "B1" },
  ],
};
```

- [ ] **Step 5: Écrire `content/en.ts`**

Même structure que `fr`, traduite. Conserver « React Native since 2018 » et « Reims — 45 min from Paris Gare de l'Est ». Mêmes `id`, mêmes liens.

```ts
import type { CvContent } from "./types";

export const en: CvContent = {
  hero: {
    name: "Arnaud Dufour",
    title: "Senior React Native Engineer",
    tagline: "React Native since 2018 · Former CTO & co-founder · AI-Native",
    location: "Reims — 45 min from Paris Gare de l'Est",
    availability: "Open to work — senior mobile engineer, permanent role, Paris",
  },
  summary: [
    { title: "Senior React Native", body: "Deep mobile specialisation since 2018. Not a fullstack who also does mobile." },
    { title: "Former CTO & co-founder", body: "Happliness / Movizer: product trade-offs, scoping, technical decision-making." },
    { title: "AI-Native", body: "AI embedded in the daily dev workflow, with measurable gains." },
  ],
  apps: [
    { id: "disorder", name: "Disorder", role: "Mobile Engineer", tagline: "Social app: weekly group chats with strangers nearby (50/50 mixed groups).", metrics: [], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" } },
    { id: "unlockt", name: "Unlockt", role: "Senior Mobile Engineer", tagline: "Creators selling their files.", metrics: [], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" } },
    { id: "exposed", name: "Exposed", role: "Mobile Engineer", tagline: "\"Who's Most Likely To\" party game (5000+ prompts, 4 modes).", metrics: [], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" } },
    { id: "movizer", name: "Movizer", role: "CTO & co-founder", tagline: "Personalised movie & series recommendations, shared with friends.", metrics: [], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Removed from the App Store (Feb. 2024)" },
  ],
  experience: [
    { id: "unlockt", company: "Unlockt.me", role: "Senior Mobile Engineer", period: "Sep. 2024 → present", summary: "", highlights: [] },
    { id: "collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "May → Sep. 2024", summary: "", highlights: [] },
    { id: "roger", company: "Roger", role: "Mobile Engineer", period: "Feb. 2023 → Apr. 2024", summary: "", highlights: [] },
    { id: "happliness", company: "Happliness (Movizer)", role: "CTO & co-founder", period: "Nov. 2021 → Feb. 2023", summary: "", highlights: [] },
    { id: "bam", company: "BAM", role: "Mobile Engineer", period: "Feb. 2020 → Nov. 2021", summary: "", highlights: [], clients: ["Ornikar", "Biogen", "Lita", "Jutheau-Husson"] },
  ],
  stack: [
    { label: "Mobile", items: ["React Native", "Expo / EAS", "TypeScript", "Reanimated", "Skia", "Native modules", "React Query"] },
    { label: "Backend", items: ["NestJS", "PostgreSQL"] },
    { label: "Infra & Tooling", items: ["AWS", "RevenueCat", "Sentry", "Firebase", "GitHub Actions"] },
  ],
  education: [
    { title: "Network & Telecommunications Engineering degree", org: "University of Technology of Troyes", period: "2020", details: "Mobile technologies and embedded systems." },
    { title: "Master's in Information Systems Security", org: "University of Technology of Troyes", period: "2020" },
  ],
  associative: [
    { title: "UNG — UTT Net Group", org: "Student association, UTT", period: "during studies", details: "First websites and mobile apps (~4 apps, 2-3 websites)." },
  ],
  languages: [
    { name: "French", level: "Native" },
    { name: "English", level: "C1" },
    { name: "Spanish", level: "B1" },
  ],
};
```

- [ ] **Step 6: Écrire `content/index.ts`**

```ts
import type { CvContent, Locale } from "./types";
import { fr } from "./fr";
import { en } from "./en";

const byLocale: Record<Locale, CvContent> = { fr, en };

export function getContent(locale: Locale): CvContent {
  return byLocale[locale];
}

export type { CvContent, Locale };
```

- [ ] **Step 7: Vérifier que le test passe + typecheck**

Run: `npm test content/content.test.ts && npx tsc --noEmit`
Expected: 3 tests PASS, aucune erreur TypeScript.

- [ ] **Step 8: Commit**

```bash
git add content
git commit -m "feat: typed bilingual CV content model"
```

---

## Task 3: i18n (next-intl) + routing locale

**Files:**
- Create: `i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts`, `middleware.ts`, `messages/fr.json`, `messages/en.json`
- Modify: `next.config.ts`
- Test: `i18n/routing.test.ts`

**Interfaces:**
- Consumes: rien.
- Produces: `routing` (locales `["fr","en"]`, défaut `fr`) ; `Link`, `redirect`, `usePathname`, `useRouter` localisés depuis `@/i18n/navigation` ; messages UI accessibles via `useTranslations`.

- [ ] **Step 1: Installer next-intl**

```bash
npm i next-intl
```

- [ ] **Step 2: Écrire le test de routing**

`i18n/routing.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { routing } from "@/i18n/routing";

describe("routing", () => {
  it("supporte fr et en, défaut fr", () => {
    expect(routing.locales).toEqual(["fr", "en"]);
    expect(routing.defaultLocale).toBe("fr");
  });
});
```

- [ ] **Step 3: Vérifier l'échec**

Run: `npm test i18n/routing.test.ts`
Expected: FAIL (module introuvable).

- [ ] **Step 4: Écrire `i18n/routing.ts`**

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
});
```

- [ ] **Step 5: Écrire `i18n/navigation.ts`**

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 6: Écrire `i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 7: Écrire `middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
```

- [ ] **Step 8: Brancher le plugin dans `next.config.ts`**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 9: Créer la microcopie UI `messages/fr.json`**

```json
{
  "nav": {
    "summary": "En bref",
    "apps": "Apps",
    "experience": "Expériences",
    "stack": "Stack",
    "education": "Formation",
    "contact": "Contact"
  },
  "actions": {
    "downloadCv": "Télécharger le CV",
    "revealPhone": "Révéler le numéro",
    "revealing": "Chargement…",
    "toggleTheme": "Changer de thème"
  },
  "contact": {
    "name": "Nom",
    "email": "Email",
    "message": "Message",
    "send": "Envoyer",
    "sending": "Envoi…",
    "success": "Message envoyé, merci.",
    "error": "Une erreur est survenue. Réessaie ou écris-moi sur LinkedIn."
  },
  "sections": {
    "apps": "Apps en production",
    "experience": "Expériences",
    "stack": "Stack technique",
    "education": "Formation & débuts",
    "languages": "Langues",
    "contact": "Contact"
  }
}
```

- [ ] **Step 10: Créer `messages/en.json`**

```json
{
  "nav": {
    "summary": "Summary",
    "apps": "Apps",
    "experience": "Experience",
    "stack": "Stack",
    "education": "Education",
    "contact": "Contact"
  },
  "actions": {
    "downloadCv": "Download CV",
    "revealPhone": "Reveal phone number",
    "revealing": "Loading…",
    "toggleTheme": "Toggle theme"
  },
  "contact": {
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "send": "Send",
    "sending": "Sending…",
    "success": "Message sent, thank you.",
    "error": "Something went wrong. Try again or reach me on LinkedIn."
  },
  "sections": {
    "apps": "Shipped apps",
    "experience": "Experience",
    "stack": "Tech stack",
    "education": "Education & beginnings",
    "languages": "Languages",
    "contact": "Contact"
  }
}
```

- [ ] **Step 11: Vérifier test + typecheck**

Run: `npm test i18n/routing.test.ts && npx tsc --noEmit`
Expected: PASS, aucune erreur TS.

- [ ] **Step 12: Commit**

```bash
git add i18n messages middleware.ts next.config.ts package.json
git commit -m "feat: next-intl routing + UI messages (fr/en)"
```

---

## Task 4: Layout racine par langue, thème, fonts, styles globaux

**Files:**
- Create: `app/[locale]/layout.tsx`
- Delete: `app/layout.tsx`, `app/page.tsx` (fichiers par défaut de create-next-app)
- Modify: `app/globals.css`
- Test: `app/[locale]/layout.test.tsx`

**Interfaces:**
- Consumes: `routing`, messages next-intl, `getContent`.
- Produces: `generateStaticParams` (pré-rend `/fr` et `/en`), variables CSS thème (`--bg`, `--fg`, `--accent`, `--muted`), classe `dark` sur `<html>`.

- [ ] **Step 1: Écrire le test du layout**

`app/[locale]/layout.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { generateStaticParams } from "@/app/[locale]/layout";

describe("layout", () => {
  it("génère les params fr et en", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ locale: "fr" }, { locale: "en" }]);
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test app/[locale]/layout.test.tsx`
Expected: FAIL (module introuvable).

- [ ] **Step 3: Supprimer les fichiers par défaut**

```bash
rm app/layout.tsx app/page.tsx
```

- [ ] **Step 4: Écrire `app/[locale]/layout.tsx`**

```tsx
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Applique le thème avant paint pour éviter le flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Installer Vercel Analytics**

```bash
npm i @vercel/analytics
```

- [ ] **Step 6: Écrire les variables de thème dans `app/globals.css`**

Remplacer le contenu par (Tailwind v4 utilise `@import "tailwindcss"`) :

```css
@import "tailwindcss";

:root {
  --bg: #ffffff;
  --fg: #0f172a;
  --muted: #475569;
  --accent: #2563eb;
  --border: #e2e8f0;
}

.dark {
  --bg: #0b0f19;
  --fg: #e5e7eb;
  --muted: #94a3b8;
  --accent: #60a5fa;
  --border: #1e293b;
}

@theme inline {
  --color-bg: var(--bg);
  --color-fg: var(--fg);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --font-sans: var(--font-sans);
}

html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--fg); font-family: var(--font-sans), system-ui, sans-serif; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 7: Créer une page temporaire pour vérifier le rendu**

`app/[locale]/page.tsx` (temporaire, remplacée en Task 12) :

```tsx
export default function Page() {
  return <main className="p-8 text-fg">OK</main>;
}
```

- [ ] **Step 8: Vérifier test + rendu**

Run: `npm test app/[locale]/layout.test.tsx && npx tsc --noEmit`
Expected: PASS. Puis `npm run dev`, ouvrir `/fr` et `/en` → « OK » s'affiche, `/` redirige vers `/fr`.

- [ ] **Step 9: Commit**

```bash
git add app package.json
git commit -m "feat: locale layout, theme vars, fonts, analytics"
```

---

## Task 5: Primitives UI — SectionHeading, StoreLink, LocaleSwitch, ThemeToggle

**Files:**
- Create: `components/ui/SectionHeading.tsx`, `components/ui/StoreLink.tsx`, `components/ui/LocaleSwitch.tsx`, `components/ui/ThemeToggle.tsx`
- Test: `components/ui/ui.test.tsx`

**Interfaces:**
- Produces:
  - `SectionHeading({ id, children })` — `<h2 id>` sémantique.
  - `StoreLink({ href, label })` — `<a target=_blank rel=noreferrer>` avec `aria-label`.
  - `LocaleSwitch()` — bascule fr/en (client).
  - `ThemeToggle()` — bascule light/dark, persiste `localStorage.theme` (client).

- [ ] **Step 1: Écrire les tests des primitives serveur**

`components/ui/ui.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./SectionHeading";
import { StoreLink } from "./StoreLink";

describe("SectionHeading", () => {
  it("rend un h2 avec id d'ancre", () => {
    render(<SectionHeading id="apps">Apps</SectionHeading>);
    const h = screen.getByRole("heading", { level: 2, name: "Apps" });
    expect(h).toHaveAttribute("id", "apps");
  });
});

describe("StoreLink", () => {
  it("ouvre dans un nouvel onglet en sécurité", () => {
    render(<StoreLink href="https://example.com" label="App Store" />);
    const a = screen.getByRole("link", { name: /App Store/ });
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test components/ui/ui.test.tsx`
Expected: FAIL (modules introuvables).

- [ ] **Step 3: Écrire `components/ui/SectionHeading.tsx`**

```tsx
import type { ReactNode } from "react";

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}
```

- [ ] **Step 4: Écrire `components/ui/StoreLink.tsx`**

```tsx
export function StoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex items-center gap-1 text-accent underline underline-offset-4 hover:opacity-80"
    >
      {label} ↗
    </a>
  );
}
```

- [ ] **Step 5: Écrire `components/ui/ThemeToggle.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const t = useTranslations("actions");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("toggleTheme")}
      className="rounded-md border border-border px-2 py-1 text-sm"
    >
      {dark ? "☀︎" : "☾"}
    </button>
  );
}
```

- [ ] **Step 6: Écrire `components/ui/LocaleSwitch.tsx`**

```tsx
"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      aria-label={`Switch to ${other.toUpperCase()}`}
      className="rounded-md border border-border px-2 py-1 text-sm uppercase"
    >
      {other}
    </button>
  );
}
```

- [ ] **Step 7: Vérifier test + typecheck**

Run: `npm test components/ui/ui.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add components/ui
git commit -m "feat: UI primitives (heading, store link, theme + locale switch)"
```

---

## Task 6: Section Hero

**Files:**
- Create: `components/sections/Hero.tsx`
- Test: `components/sections/Hero.test.tsx`

**Interfaces:**
- Consumes: `getContent`, `SectionHeading`? non — Hero est le `<header>`. Consomme `content.hero`.
- Produces: `Hero({ content })` où `content: CvContent`.

- [ ] **Step 1: Écrire le test**

`components/sections/Hero.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Hero } from "./Hero";

function wrap(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>
  );
}

describe("Hero", () => {
  it("affiche nom, titre et la localisation complète", () => {
    wrap(<Hero content={getContent("fr")} />);
    expect(screen.getByRole("heading", { level: 1, name: /Arnaud Dufour/ })).toBeInTheDocument();
    expect(screen.getByText(/45 min de Paris/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test components/sections/Hero.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Écrire `components/sections/Hero.tsx`**

```tsx
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { RevealPhone } from "@/components/ui/RevealPhone";
import { LocaleSwitch } from "@/components/ui/LocaleSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Hero({ content }: { content: CvContent }) {
  const t = useTranslations("actions");
  const { hero } = content;
  return (
    <header className="mx-auto max-w-3xl px-6 pt-10 pb-14">
      <div className="mb-10 flex items-center justify-end gap-2">
        <LocaleSwitch />
        <ThemeToggle />
      </div>
      <p className="text-sm font-medium text-accent">{hero.availability}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{hero.name}</h1>
      <p className="mt-2 text-xl text-fg">{hero.title}</p>
      <p className="mt-4 text-muted">{hero.tagline}</p>
      <p className="mt-2 text-muted">{hero.location}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="/cv-arnaud-dufour.pdf"
          download
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          {t("downloadCv")}
        </a>
        <a href="#contact" className="rounded-md border border-border px-4 py-2 text-sm font-medium">
          Contact
        </a>
        <RevealPhone />
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Créer un stub `RevealPhone` pour compiler (remplacé en Task 11)**

`components/ui/RevealPhone.tsx` :

```tsx
"use client";
export function RevealPhone() {
  return null;
}
```

- [ ] **Step 5: Vérifier test + typecheck**

Run: `npm test components/sections/Hero.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components
git commit -m "feat: hero section"
```

---

## Task 7: Section « En bref » (Summary)

**Files:**
- Create: `components/sections/Summary.tsx`
- Test: `components/sections/Summary.test.tsx`

**Interfaces:**
- Consumes: `content.summary`, `SectionHeading`.
- Produces: `Summary({ content })`.

- [ ] **Step 1: Écrire le test**

`components/sections/Summary.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { getContent } from "@/content";
import { Summary } from "./Summary";

describe("Summary", () => {
  it("rend les 3 arguments", () => {
    render(<Summary content={getContent("fr")} />);
    expect(screen.getByText(/Senior React Native/)).toBeInTheDocument();
    expect(screen.getByText(/Ex-CTO/)).toBeInTheDocument();
    expect(screen.getByText(/AI-Native/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test components/sections/Summary.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Écrire `components/sections/Summary.tsx`**

```tsx
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Summary({ content }: { content: CvContent }) {
  const t = useTranslations("nav");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="summary">{t("summary")}</SectionHeading>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {content.summary.map((s) => (
          <div key={s.title} className="rounded-lg border border-border p-4">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Vérifier test + typecheck**

Run: `npm test components/sections/Summary.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Summary.tsx components/sections/Summary.test.tsx
git commit -m "feat: summary section"
```

---

## Task 8: Section « Apps en production »

**Files:**
- Create: `components/sections/Apps.tsx`
- Test: `components/sections/Apps.test.tsx`

**Interfaces:**
- Consumes: `content.apps`, `SectionHeading`, `StoreLink`.
- Produces: `Apps({ content })`.

- [ ] **Step 1: Écrire le test**

`components/sections/Apps.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Apps } from "./Apps";

describe("Apps", () => {
  it("rend chaque app avec son lien", () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Apps content={getContent("fr")} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("Disorder")).toBeInTheDocument();
    expect(screen.getByText("Movizer")).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBeGreaterThanOrEqual(4);
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test components/sections/Apps.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Écrire `components/sections/Apps.tsx`**

```tsx
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreLink } from "@/components/ui/StoreLink";

export function Apps({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="apps">{t("apps")}</SectionHeading>
      <ul className="mt-6 space-y-6">
        {content.apps.map((app) => (
          <li key={app.id} className="rounded-lg border border-border p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold">{app.name}</h3>
              <span className="text-sm text-muted">{app.role}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{app.tagline}</p>
            {app.metrics.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {app.metrics.map((m) => (
                  <li key={m} className="rounded-full border border-border px-2 py-0.5 text-xs">{m}</li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex items-center gap-3 text-sm">
              {app.link && <StoreLink href={app.link.href} label={app.link.label} />}
              {app.status && <span className="text-muted">{app.status}</span>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Vérifier test + typecheck**

Run: `npm test components/sections/Apps.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Apps.tsx components/sections/Apps.test.tsx
git commit -m "feat: apps section"
```

---

## Task 9: Section Expériences

**Files:**
- Create: `components/sections/Experience.tsx`
- Test: `components/sections/Experience.test.tsx`

**Interfaces:**
- Consumes: `content.experience`, `SectionHeading`.
- Produces: `Experience({ content })`.

- [ ] **Step 1: Écrire le test**

`components/sections/Experience.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Experience } from "./Experience";

describe("Experience", () => {
  it("rend les 5 expériences avec périodes", () => {
    render(
      <NextIntlClientProvider locale="fr" messages={messages}>
        <Experience content={getContent("fr")} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText("Unlockt.me")).toBeInTheDocument();
    expect(screen.getByText("BAM")).toBeInTheDocument();
    expect(screen.getByText(/Ornikar/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test components/sections/Experience.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Écrire `components/sections/Experience.tsx`**

```tsx
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="experience">{t("experience")}</SectionHeading>
      <ol className="mt-6 space-y-8 border-l border-border pl-6">
        {content.experience.map((xp) => (
          <li key={xp.id} className="relative">
            <span className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{xp.company}</h3>
              <span className="text-sm text-muted">{xp.period}</span>
            </div>
            <p className="text-sm text-accent">{xp.role}</p>
            {xp.summary && <p className="mt-2 text-sm text-muted">{xp.summary}</p>}
            {xp.highlights.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {xp.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            {xp.clients && (
              <p className="mt-2 text-xs text-muted">Clients : {xp.clients.join(", ")}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
```

- [ ] **Step 4: Vérifier test + typecheck**

Run: `npm test components/sections/Experience.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Experience.tsx components/sections/Experience.test.tsx
git commit -m "feat: experience timeline"
```

---

## Task 10: Sections Stack + Formation/UNG/Langues

**Files:**
- Create: `components/sections/Stack.tsx`, `components/sections/Education.tsx`
- Test: `components/sections/StackEducation.test.tsx`

**Interfaces:**
- Consumes: `content.stack`, `content.education`, `content.associative`, `content.languages`, `SectionHeading`.
- Produces: `Stack({ content })`, `Education({ content })`.

- [ ] **Step 1: Écrire le test**

`components/sections/StackEducation.test.tsx` :

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/fr.json";
import { getContent } from "@/content";
import { Stack } from "./Stack";
import { Education } from "./Education";

function wrap(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="fr" messages={messages}>{ui}</NextIntlClientProvider>
  );
}

describe("Stack & Education", () => {
  it("rend les groupes de stack", () => {
    wrap(<Stack content={getContent("fr")} />);
    expect(screen.getByText("React Native")).toBeInTheDocument();
    expect(screen.getByText("NestJS")).toBeInTheDocument();
  });
  it("rend formation, UNG et langues", () => {
    wrap(<Education content={getContent("fr")} />);
    expect(screen.getByText(/Université de Technologie de Troyes/)).toBeInTheDocument();
    expect(screen.getByText(/UNG/)).toBeInTheDocument();
    expect(screen.getByText(/Espagnol/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test components/sections/StackEducation.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Écrire `components/sections/Stack.tsx`**

```tsx
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="stack">{t("stack")}</SectionHeading>
      <div className="mt-6 space-y-4">
        {content.stack.map((g) => (
          <div key={g.label}>
            <h3 className="text-sm font-semibold text-muted">{g.label}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((i) => (
                <li key={i} className="rounded-md border border-border px-2 py-1 text-sm">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Écrire `components/sections/Education.tsx`**

```tsx
import { useTranslations } from "next-intl";
import type { CvContent, EducationItem } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

function EduList({ items }: { items: EducationItem[] }) {
  return (
    <ul className="mt-4 space-y-4">
      {items.map((e) => (
        <li key={e.title}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-medium">{e.title}</h3>
            <span className="text-sm text-muted">{e.period}</span>
          </div>
          <p className="text-sm text-accent">{e.org}</p>
          {e.details && <p className="mt-1 text-sm text-muted">{e.details}</p>}
        </li>
      ))}
    </ul>
  );
}

export function Education({ content }: { content: CvContent }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="education">{t("education")}</SectionHeading>
      <EduList items={content.education} />
      <EduList items={content.associative} />
      <h3 className="mt-8 text-sm font-semibold text-muted">{t("languages")}</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {content.languages.map((l) => (
          <li key={l.name} className="rounded-md border border-border px-2 py-1 text-sm">
            {l.name} — {l.level}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 5: Vérifier test + typecheck**

Run: `npm test components/sections/StackEducation.test.tsx && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Stack.tsx components/sections/Education.tsx components/sections/StackEducation.test.tsx
git commit -m "feat: stack + education/UNG/languages sections"
```

---

## Task 11: Révélation du numéro — route API + rate-limit + composant client

**Files:**
- Create: `lib/rate-limit.ts`, `app/api/phone/route.ts`
- Modify: `components/ui/RevealPhone.tsx` (remplace le stub)
- Create: `.env.example`, `.env.local`
- Test: `lib/rate-limit.test.ts`, `app/api/phone/route.test.ts`

**Interfaces:**
- Consumes: `process.env.PHONE_NUMBER`.
- Produces:
  - `rateLimit(key: string, opts?: { limit?: number; windowMs?: number }): { allowed: boolean }`.
  - `GET /api/phone` → `200 { phone }` ou `429` / `503` si non configuré.
  - `RevealPhone()` client : bouton qui `fetch("/api/phone")` et affiche le numéro.

- [ ] **Step 1: Écrire le test du rate-limiter**

`lib/rate-limit.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("autorise sous la limite puis bloque", () => {
    const key = "test-ip";
    const opts = { limit: 2, windowMs: 60_000 };
    expect(rateLimit(key, opts).allowed).toBe(true);
    expect(rateLimit(key, opts).allowed).toBe(true);
    expect(rateLimit(key, opts).allowed).toBe(false);
  });
});
```

- [ ] **Step 2: Vérifier l'échec**

Run: `npm test lib/rate-limit.test.ts`
Expected: FAIL.

- [ ] **Step 3: Écrire `lib/rate-limit.ts`**

```ts
type Entry = { count: number; reset: number };
const store = new Map<string, Entry>();

// Limiteur en mémoire. Note : sur Vercel serverless, l'état est par-instance
// et se réinitialise au cold start — protection best-effort, pas absolue.
export function rateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number } = {}
): { allowed: boolean } {
  const limit = opts.limit ?? 5;
  const windowMs = opts.windowMs ?? 60_000;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { allowed: true };
  }
  entry.count += 1;
  return { allowed: entry.count <= limit };
}
```

- [ ] **Step 4: Vérifier le test du rate-limiter**

Run: `npm test lib/rate-limit.test.ts`
Expected: PASS.

- [ ] **Step 5: Écrire le test de la route**

`app/api/phone/route.test.ts` :

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "@/app/api/phone/route";

function req() {
  return new Request("http://localhost/api/phone", {
    headers: { "x-forwarded-for": `1.2.3.${Math.floor(Math.random() * 1000)}` },
  });
}

describe("GET /api/phone", () => {
  beforeEach(() => { process.env.PHONE_NUMBER = "+33600000000"; });

  it("renvoie le numéro configuré", async () => {
    const res = await GET(req());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.phone).toBe("+33600000000");
  });

  it("renvoie 503 si non configuré", async () => {
    delete process.env.PHONE_NUMBER;
    const res = await GET(req());
    expect(res.status).toBe(503);
  });
});
```

- [ ] **Step 6: Vérifier l'échec**

Run: `npm test app/api/phone/route.test.ts`
Expected: FAIL (route inexistante).

- [ ] **Step 7: Écrire `app/api/phone/route.ts`**

```ts
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`phone:${ip}`, { limit: 5, windowMs: 60_000 }).allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const phone = process.env.PHONE_NUMBER;
  if (!phone) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  return NextResponse.json({ phone });
}
```

- [ ] **Step 8: Vérifier le test de la route**

Run: `npm test app/api/phone/route.test.ts`
Expected: PASS.

- [ ] **Step 9: Écrire le composant `components/ui/RevealPhone.tsx` (remplace le stub)**

```tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function RevealPhone() {
  const t = useTranslations("actions");
  const [phone, setPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function reveal() {
    setLoading(true);
    try {
      const res = await fetch("/api/phone");
      if (res.ok) {
        const data = await res.json();
        setPhone(data.phone);
      }
    } finally {
      setLoading(false);
    }
  }

  if (phone) {
    return (
      <a href={`tel:${phone}`} className="rounded-md border border-border px-4 py-2 text-sm font-medium">
        {phone}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={reveal}
      disabled={loading}
      className="rounded-md border border-border px-4 py-2 text-sm font-medium disabled:opacity-60"
    >
      {loading ? t("revealing") : t("revealPhone")}
    </button>
  );
}
```

- [ ] **Step 10: Créer `.env.example` et `.env.local`**

`.env.example` (committé) :

```bash
# Numéro affiché par le bouton "Révéler le numéro" (jamais en HTML/bundle)
PHONE_NUMBER=
# Clé API Resend pour le formulaire de contact
RESEND_API_KEY=
# Destinataire des messages du formulaire
CONTACT_TO_EMAIL=
```

`.env.local` (gitignoré — Arnaud renseigne les vraies valeurs) : mêmes clés, remplies. Vérifier que `.env.local` est bien ignoré :

```bash
git check-ignore .env.local
```
Expected: affiche `.env.local` (donc ignoré).

- [ ] **Step 11: Vérifier suite complète + typecheck**

Run: `npm test && npx tsc --noEmit`
Expected: tous les tests PASS.

- [ ] **Step 12: Commit**

```bash
git add lib/rate-limit.ts lib/rate-limit.test.ts app/api/phone components/ui/RevealPhone.tsx .env.example
git commit -m "feat: reveal phone via API route + in-memory rate limit"
```

---

## Task 12: Assemblage de la page + email obfusqué + Contact (formulaire)

**Files:**
- Create: `lib/obfuscate.ts`, `components/ui/ObfuscatedEmail.tsx`, `components/ui/ContactForm.tsx`, `components/sections/Contact.tsx`, `app/api/contact/route.ts`
- Modify: `app/[locale]/page.tsx` (remplace la page temporaire)
- Test: `lib/obfuscate.test.ts`, `app/api/contact/route.test.ts`

**Interfaces:**
- Consumes: `getContent`, toutes les sections, `process.env.RESEND_API_KEY`, `process.env.CONTACT_TO_EMAIL`.
- Produces:
  - `deobfuscate(parts: string[]): string`.
  - `POST /api/contact` → `200 { ok: true }` ; `400` si champs invalides ou honeypot rempli.
  - Page finale assemblant Hero → Summary → Apps → Experience → Stack → Education → Contact.

- [ ] **Step 1: Installer Resend**

```bash
npm i resend
```

- [ ] **Step 2: Écrire le test d'obfuscation**

`lib/obfuscate.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { deobfuscate } from "@/lib/obfuscate";

describe("deobfuscate", () => {
  it("reconstitue l'email à partir de morceaux", () => {
    expect(deobfuscate(["arnaud", "@", "example", ".", "com"])).toBe("arnaud@example.com");
  });
});
```

- [ ] **Step 3: Vérifier l'échec puis écrire `lib/obfuscate.ts`**

Run: `npm test lib/obfuscate.test.ts` → FAIL, puis :

```ts
export function deobfuscate(parts: string[]): string {
  return parts.join("");
}
```

Run: `npm test lib/obfuscate.test.ts` → PASS.

- [ ] **Step 4: Écrire le test de la route contact**

`app/api/contact/route.test.ts` :

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMock = vi.fn().mockResolvedValue({ data: { id: "1" }, error: null });
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}));

import { POST } from "@/app/api/contact/route";

function post(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "9.9.9.9" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    sendMock.mockClear();
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO_EMAIL = "arnaud@example.com";
  });

  it("envoie l'email pour un payload valide", async () => {
    const res = await POST(post({ name: "Jean", email: "j@x.com", message: "Bonjour, un poste ?", website: "" }));
    expect(res.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it("rejette si le honeypot est rempli", async () => {
    const res = await POST(post({ name: "Bot", email: "b@x.com", message: "spam", website: "http://spam" }));
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejette un email invalide", async () => {
    const res = await POST(post({ name: "Jean", email: "pasunemail", message: "Bonjour", website: "" }));
    expect(res.status).toBe(400);
  });
});
```

- [ ] **Step 5: Vérifier l'échec**

Run: `npm test app/api/contact/route.test.ts`
Expected: FAIL (route inexistante).

- [ ] **Step 6: Écrire `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`contact:${ip}`, { limit: 5, windowMs: 600_000 }).allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, email, message, website } = body;
  // Honeypot : un vrai humain ne remplit pas ce champ caché.
  if (website) return NextResponse.json({ error: "spam" }, { status: 400 });
  if (!name || !email || !message || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Contact portfolio — ${name}`,
    text: `De : ${name} <${email}>\n\n${message}`,
  });
  if (error) return NextResponse.json({ error: "send_failed" }, { status: 502 });

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 7: Vérifier le test de la route**

Run: `npm test app/api/contact/route.test.ts`
Expected: 3 tests PASS.

Note pour l'exécution : le `from` utilise le domaine de test `onboarding@resend.dev`. Une fois le domaine perso vérifié sur Resend (Task 15), remplacer par une adresse du domaine.

- [ ] **Step 8: Écrire `components/ui/ContactForm.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setStatus("ok"); form.reset(); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div>
        <label htmlFor="name" className="block text-sm font-medium">{t("name")}</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">{t("email")}</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">{t("message")}</label>
        <textarea id="message" name="message" required rows={5} className="mt-1 w-full rounded-md border border-border bg-transparent px-3 py-2" />
      </div>
      <button type="submit" disabled={status === "sending"} className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
        {status === "sending" ? t("sending") : t("send")}
      </button>
      {status === "ok" && <p className="text-sm text-accent" role="status">{t("success")}</p>}
      {status === "error" && <p className="text-sm text-red-500" role="alert">{t("error")}</p>}
    </form>
  );
}
```

- [ ] **Step 9: Écrire `components/ui/ObfuscatedEmail.tsx`**

```tsx
"use client";
import { deobfuscate } from "@/lib/obfuscate";

// Les morceaux évitent d'exposer l'email en clair dans le HTML.
export function ObfuscatedEmail({ parts }: { parts: string[] }) {
  const email = deobfuscate(parts);
  return <a href={`mailto:${email}`} className="text-accent underline underline-offset-4">{email}</a>;
}
```

- [ ] **Step 10: Écrire `components/sections/Contact.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedEmail";

// Email en morceaux — à remplacer par la vraie adresse d'Arnaud en Task 14.
const EMAIL_PARTS = ["prenom", ".", "nom", "@", "example", ".", "com"];

export function Contact({ linkedin, github }: { linkedin: string; github: string }) {
  const t = useTranslations("sections");
  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <SectionHeading id="contact">{t("contact")}</SectionHeading>
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <a href={linkedin} target="_blank" rel="noreferrer noopener" className="text-accent underline underline-offset-4">LinkedIn ↗</a>
        <a href={github} target="_blank" rel="noreferrer noopener" className="text-accent underline underline-offset-4">GitHub ↗</a>
        <ObfuscatedEmail parts={EMAIL_PARTS} />
      </div>
      <ContactForm />
    </section>
  );
}
```

- [ ] **Step 11: Écrire la page finale `app/[locale]/page.tsx`**

```tsx
import { setRequestLocale } from "next-intl/server";
import { getContent, type Locale } from "@/content";
import { Hero } from "@/components/sections/Hero";
import { Summary } from "@/components/sections/Summary";
import { Apps } from "@/components/sections/Apps";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

// À remplacer par les vraies URL en Task 14.
const LINKEDIN = "https://www.linkedin.com/in/arnaud-dufour/";
const GITHUB = "https://github.com/";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = getContent(locale as Locale);
  return (
    <main>
      <Hero content={content} />
      <Summary content={content} />
      <Apps content={content} />
      <Experience content={content} />
      <Stack content={content} />
      <Education content={content} />
      <Contact linkedin={LINKEDIN} github={GITHUB} />
    </main>
  );
}
```

- [ ] **Step 12: Vérifier suite complète + rendu**

Run: `npm test && npx tsc --noEmit`
Expected: tous PASS. Puis `npm run dev`, parcourir `/fr` et `/en` : toutes les sections s'affichent, bascule langue/thème OK, formulaire s'affiche.

- [ ] **Step 13: Commit**

```bash
git add lib components app
git commit -m "feat: contact form (Resend) + obfuscated email + full page assembly"
```

---

## Task 13: SEO — metadata, Open Graph, JSON-LD Person

**Files:**
- Create: `lib/seo.ts`, `app/[locale]/opengraph-image.tsx`
- Modify: `app/[locale]/layout.tsx` (ajout `generateMetadata`), `app/[locale]/page.tsx` (ajout JSON-LD)
- Test: `lib/seo.test.ts`

**Interfaces:**
- Consumes: `getContent`.
- Produces: `buildMetadata(locale)`, `personJsonLd(locale, url)`.

- [ ] **Step 1: Écrire le test SEO**

`lib/seo.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { personJsonLd, buildMetadata } from "@/lib/seo";

describe("seo", () => {
  it("génère un JSON-LD Person cohérent", () => {
    const ld = personJsonLd("fr", "https://arnaud.dev");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe("Arnaud Dufour");
    expect(ld.jobTitle).toContain("React Native");
  });
  it("génère un titre et une description", () => {
    const m = buildMetadata("fr");
    expect(m.title).toContain("Arnaud Dufour");
    expect(m.description).toBeTruthy();
  });
});
```

- [ ] **Step 2: Vérifier l'échec puis écrire `lib/seo.ts`**

Run: `npm test lib/seo.test.ts` → FAIL, puis :

```ts
import type { Metadata } from "next";
import { getContent, type Locale } from "@/content";

const DESCRIPTION: Record<Locale, string> = {
  fr: "Senior React Native Engineer — React Native depuis 2018, ex-CTO & cofondateur, AI-Native. Reims, 45 min de Paris.",
  en: "Senior React Native Engineer — React Native since 2018, former CTO & co-founder, AI-Native. Reims, 45 min from Paris.",
};

export function buildMetadata(locale: Locale): Metadata {
  const c = getContent(locale);
  const title = `${c.hero.name} — ${c.hero.title}`;
  return {
    title,
    description: DESCRIPTION[locale],
    openGraph: {
      title,
      description: DESCRIPTION[locale],
      type: "profile",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description: DESCRIPTION[locale] },
  };
}

export function personJsonLd(locale: Locale, url: string) {
  const c = getContent(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.hero.name,
    jobTitle: c.hero.title,
    url,
    address: { "@type": "PostalAddress", addressLocality: "Reims", addressCountry: "FR" },
    knowsLanguage: c.languages.map((l) => l.name),
  } as const;
}
```

Run: `npm test lib/seo.test.ts` → PASS.

- [ ] **Step 3: Ajouter `generateMetadata` dans `app/[locale]/layout.tsx`**

Ajouter en haut du fichier (après les imports) :

```tsx
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale as Locale);
}
```

- [ ] **Step 4: Ajouter le JSON-LD dans `app/[locale]/page.tsx`**

Dans le composant `Page`, avant `<main>`, injecter le script (adapter l'URL du site) :

```tsx
import { personJsonLd } from "@/lib/seo";
// ... dans le rendu :
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale as Locale, "https://arnaud.dev")) }}
/>
```

- [ ] **Step 5: Créer l'image Open Graph `app/[locale]/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";
import { getContent, type Locale } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale as Locale);
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0b0f19", color: "#e5e7eb" }}>
        <div style={{ fontSize: 64, fontWeight: 700 }}>{c.hero.name}</div>
        <div style={{ fontSize: 36, marginTop: 12 }}>{c.hero.title}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#94a3b8" }}>{c.hero.tagline}</div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 6: Vérifier suite + build**

Run: `npm test && npx tsc --noEmit && npm run build`
Expected: tests PASS, build réussit, `/fr` et `/en` en statique.

- [ ] **Step 7: Commit**

```bash
git add lib/seo.ts lib/seo.test.ts app
git commit -m "feat: SEO metadata, OG image, JSON-LD Person"
```

---

## Task 14: Peupler le contenu réel (aucune invention) + CV PDF

**Files:**
- Modify: `content/fr.ts`, `content/en.ts`, `components/sections/Contact.tsx` (EMAIL_PARTS), `app/[locale]/page.tsx` (LINKEDIN, GITHUB, URL site)
- Create: `public/cv-arnaud-dufour.pdf`

**Interfaces:**
- Consumes: CV PDF (dossier Téléchargements), code Disorder (`~/Documents/Unlockt`), réponses d'Arnaud.

- [ ] **Step 1: Lire le CV PDF à jour**

Localiser le CV dans `~/Downloads` (confirmer le fichier exact avec Arnaud), le lire pour extraire résumés d'expérience, réalisations et chiffres déjà présents. Ne recopier que ce qui y figure.

- [ ] **Step 2: Extraire des détails techniques du code Disorder**

Explorer `~/Documents/Unlockt` (lecture seule) pour préciser la stack réellement employée (modules natifs, libs). N'utiliser que des faits vérifiables ; ne rien committer depuis ce dossier.

- [ ] **Step 3: Dresser la liste des manques et la poser à Arnaud**

Établir et envoyer à Arnaud la liste exacte des infos manquantes :
- Confirmation liens **Unlockt** et **Exposed**.
- **Chiffres** par app/expérience : utilisateurs, crash-free rate, temps de démarrage, taille de bundle.
- **Screens Movizer**.
- Détails **UNG** (noms/dates/liens des ~4 apps et 2-3 sites).
- **Email** de contact à afficher, **URL GitHub**, confirmation URL LinkedIn.
- **Domaine** souhaité (pour l'URL canonique / JSON-LD / OG).

**Ne rien remplir tant qu'Arnaud n'a pas répondu.** Compléter `fr.ts`/`en.ts` (`summary`, `highlights`, `metrics`) uniquement avec ses réponses.

- [ ] **Step 4: Mettre à jour email, LinkedIn, GitHub, URL site**

Avec les valeurs fournies : `EMAIL_PARTS` dans `Contact.tsx`, `LINKEDIN`/`GITHUB` et l'URL du site dans `page.tsx` + `opengraph`/JSON-LD.

- [ ] **Step 5: Copier le CV PDF dans `public/`**

```bash
cp ~/Downloads/<fichier-cv-confirmé>.pdf "/Users/arnaud/Documents/perso/portfolio-arnaud/public/cv-arnaud-dufour.pdf"
```

Vérifier le lien « Télécharger le CV » en dev.

- [ ] **Step 6: Vérifier suite + build**

Run: `npm test && npm run build`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add content components app public/cv-arnaud-dufour.pdf
git commit -m "content: real CV data, links, and PDF (validated with Arnaud)"
```

---

## Task 15: Déploiement Vercel + repo GitHub public + README

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: env `PHONE_NUMBER`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`.

- [ ] **Step 1: Écrire `README.md`**

```markdown
# Portfolio — Arnaud Dufour

CV en ligne bilingue (FR/EN). Next.js (App Router) + Tailwind + next-intl, déployé sur Vercel.

## Développement
\`\`\`bash
npm install
cp .env.example .env.local   # renseigner les valeurs
npm run dev
\`\`\`

## Tests
\`\`\`bash
npm test
\`\`\`

## Variables d'environnement
Voir \`.env.example\`. À définir en local (\`.env.local\`, gitignoré) et sur Vercel :
- \`PHONE_NUMBER\` — numéro renvoyé par le bouton « Révéler le numéro ».
- \`RESEND_API_KEY\` — clé API Resend (formulaire de contact).
- \`CONTACT_TO_EMAIL\` — destinataire des messages.
```

- [ ] **Step 2: Vérifier build de production**

Run: `npm run build`
Expected: build réussit sans erreur.

- [ ] **Step 3: Commit + push (repo GitHub public)**

Créer le repo public. Confirmer avec Arnaud avant de pousser (repo public).

```bash
git add README.md
git commit -m "docs: README"
gh repo create arnaud-dufour-portfolio --public --source=. --remote=origin --push
```

Si `gh` n'est pas connecté, Arnaud lance `gh auth login` (ou crée le repo à la main puis `git remote add origin ... && git push -u origin HEAD`).

- [ ] **Step 4: Déployer sur Vercel**

Importer le repo sur Vercel (dashboard ou `vercel`). Définir les 3 variables d'env dans les settings Vercel (Production + Preview). Lancer le déploiement.

- [ ] **Step 5: Vérifier le site déployé**

Sur l'URL Vercel : parcourir `/fr` et `/en`, tester bascule langue/thème, bouton révéler numéro (renvoie le vrai numéro), envoi du formulaire (email reçu), téléchargement du CV.

- [ ] **Step 6: Lancer Lighthouse**

Sur l'URL de production, exécuter Lighthouse (Chrome DevTools ou `npx lighthouse <url> --view`). Corriger jusqu'à obtenir **Perf / A11y / Best Practices / SEO au vert (≥ 95)**. Vérifier CLS ≈ 0.

- [ ] **Step 7: Domaine perso (optionnel)**

Configurer le domaine perso dans Vercel une fois choisi par Arnaud, puis mettre à jour l'URL canonique/JSON-LD/OG (`page.tsx`, `seo.ts`) et redéployer.

---

## Self-Review (rempli par l'auteur du plan)

- **Couverture spec** : hero/positionnement (T6), 3 arguments (T7), apps + liens (T8), expériences (T9), stack (T10), formation/UNG/langues (T10), contact + Resend + email obfusqué (T12), révéler numéro (T11), PDF (T6 lien + T14 fichier), i18n FR/EN (T3), analytics (T4), SEO/OG/JSON-LD (T13), perf/a11y/Lighthouse (T15 step 6), garde-fous repo public (T11 env + .gitignore existant), règles de rédaction (Global Constraints + T2/T14), déploiement (T15). ✔
- **Placeholders** : les champs de contenu vides (`metrics`/`highlights`/email/URL) sont un **processus de collecte** explicite (T14), pas des placeholders de plan ; chaque étape de code est complète.
- **Cohérence des types** : `CvContent`/`getContent` (T2) réutilisés tels quels partout ; `rateLimit` (T11) réutilisé en T12 ; `deobfuscate` (T12) réutilisé par `ObfuscatedEmail` ; `RevealPhone` stub (T6) remplacé (T11).
