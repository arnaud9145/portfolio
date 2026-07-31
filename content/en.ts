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
