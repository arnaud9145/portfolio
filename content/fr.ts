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
