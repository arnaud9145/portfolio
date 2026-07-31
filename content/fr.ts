import type { CvContent } from "./types";

// PLACEHOLDER — missions à rédiger par Arnaud. Lorem ipsum volontaire.
const LOREM_MISSIONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit — mission à préciser.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
];
// PLACEHOLDER — tagline à rédiger.
const LOREM_TAGLINE = "Lorem ipsum — description à venir.";

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
  // Catalogue complet — consommé par /projets. Ids stables (kebab-case).
  projects: [
    { id: "unlockt", name: "Unlockt", context: "Unlockt.me", role: "Senior Mobile Engineer", contribution: "major", tagline: "Vente de fichiers par des créateurs.", metrics: ["1,2 M d'utilisateurs actifs"], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" } },
    { id: "exposed", name: "Exposed", context: "Behind The App", role: "Mobile Engineer", contribution: "major", tagline: "Party game « Who's Most Likely To » (5000+ défis, 4 modes).", metrics: ["~500k utilisateurs/mois"], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" } },
    { id: "disorder", name: "Disorder", context: "Behind The App", role: "Mobile Engineer", contribution: "major", tagline: "App sociale : chaque semaine, des group chats avec des inconnus de ta zone (groupes mixtes 50/50).", metrics: [], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" } },
    { id: "movizer", name: "Movizer", context: "Happliness", role: "CTO & cofondateur", contribution: "lead", tagline: "Recommandations personnalisées de films & séries, partage entre amis.", metrics: [], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Retirée du store (2024)" },
    { id: "le-collectionist", name: "Le Collectionist", context: "Le Collectionist", role: "Senior Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], link: { href: "https://apps.apple.com/fr/app/le-collectionist/id1630324684", label: "App Store" } },
    { id: "roger", name: "Roger", context: "Roger", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "konectom", name: "Konectom", context: "BAM — client Biogen", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "rift", name: "Rift", context: "BAM — ex-More Impact", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "ornikar", name: "Ornikar", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "jutheau-husson", name: "Jutheau-Husson", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "lita", name: "Lita", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "gala-utt", name: "Gala UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "my-utt", name: "My UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "integration-utt", name: "Intégration UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: LOREM_TAGLINE, metrics: [] },
    { id: "bde-utt", name: "BDE UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: LOREM_TAGLINE, metrics: [] },
  ],
  experience: [
    { id: "unlockt", company: "Unlockt.me", role: "Senior Mobile Engineer", period: "sept. 2024 → aujourd'hui", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Unlockt", projectId: "unlockt" }] },
    // PLACEHOLDER période "20XX" — mapping Behind The App à confirmer par Arnaud.
    { id: "behind-the-app", company: "Behind The App", role: "Mobile Engineer", period: "20XX", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Disorder", projectId: "disorder" }, { label: "Exposed", projectId: "exposed" }] },
    { id: "le-collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "mai → sept. 2024", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Le Collectionist", projectId: "le-collectionist" }] },
    { id: "roger", company: "Roger", role: "Mobile Engineer", period: "févr. 2023 → avr. 2024", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Roger", projectId: "roger" }] },
    { id: "happliness", company: "Happliness (Movizer)", role: "CTO & cofondateur", period: "nov. 2021 → févr. 2023", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Movizer", projectId: "movizer" }] },
    { id: "bam", company: "BAM", role: "Mobile Engineer", period: "févr. 2020 → nov. 2021", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Ornikar", projectId: "ornikar" }, { label: "Konectom", projectId: "konectom" }, { label: "Rift", projectId: "rift" }, { label: "Jutheau-Husson", projectId: "jutheau-husson" }, { label: "Lita", projectId: "lita" }] },
    { id: "ung", company: "UNG (UTT Net Group)", role: "Développeur & Président", period: "2016 → 2019", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Gala UTT", projectId: "gala-utt" }, { label: "My UTT", projectId: "my-utt" }, { label: "Intégration UTT", projectId: "integration-utt" }, { label: "BDE UTT", projectId: "bde-utt" }] },
  ],
  stack: [
    { label: "Mobile", items: ["React Native", "Expo / EAS", "TypeScript", "Reanimated", "Skia", "Modules natifs", "React Query"] },
    { label: "Back", items: ["NestJS", "PostgreSQL"] },
    { label: "Infra & Outils", items: ["AWS", "RevenueCat", "Sentry", "Firebase", "GitHub Actions"] },
  ],
  education: [
    { title: "Diplôme d'ingénieur SRT — Systèmes Réseaux et Télécommunications", org: "Université de Technologie de Troyes", period: "2020", details: "Spécialité TMSE — Technologie Mobile et Système Embarqué." },
    { title: "Master sécurité des systèmes d'information", org: "Université de Technologie de Troyes", period: "2020" },
  ],
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "C1" },
    { name: "Espagnol", level: "B1" },
  ],
};
