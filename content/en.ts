import type { CvContent } from "./types";

// PLACEHOLDER — missions to be written by Arnaud. Intentional lorem ipsum.
const LOREM_MISSIONS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit — mission TBD.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
];
// PLACEHOLDER — tagline to be written.
const LOREM_TAGLINE = "Lorem ipsum — description coming soon.";

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
  // Full catalogue — consumed by /projets. Stable ids (kebab-case).
  projects: [
    { id: "unlockt", name: "Unlockt", context: "Unlockt.me", role: "Senior Mobile Engineer", contribution: "major", tagline: "Creators selling their files.", metrics: ["1.2M active users"], tech: ["React Native", "TypeScript", "React Query", "Reanimated", "Shared Element", "Veriff (KYC)", "Firebase", "Sentry", "Amplitude", "Lottie"], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" } },
    { id: "exposed", name: "Exposed", context: "Behind The App", role: "Mobile Engineer", contribution: "major", tagline: "\"Who's Most Likely To\" party game (5000+ prompts, 4 modes).", metrics: ["~500k users/month"], tech: ["React Native", "TypeScript", "Reanimated", "Colyseus (real-time)", "RevenueCat", "Firebase", "Detox", "SVG"], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" } },
    { id: "disorder", name: "Disorder", context: "Behind The App", role: "Mobile Engineer", contribution: "major", tagline: "Social app: weekly group chats with strangers nearby (50/50 mixed groups).", metrics: [], tech: ["React Native", "TypeScript", "Skia", "Reanimated", "Stream Chat", "React Query", "MMKV", "RevenueCat", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" } },
    { id: "movizer", name: "Movizer", context: "Happliness", role: "CTO & co-founder", contribution: "lead", tagline: "Personalised movie & series recommendations, shared with friends.", metrics: [], tech: ["React Native", "TypeScript", "NestJS"], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Removed (2024)" },
    { id: "le-collectionist", name: "Le Collectionist", context: "Le Collectionist", role: "Senior Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/le-collectionist/id1630324684", label: "App Store" } },
    { id: "roger", name: "Roger", context: "Roger", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript", "Sentry", "AppCenter", "Fastlane"] },
    { id: "konectom", name: "Konectom", context: "BAM — Biogen client", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "rift", name: "Rift", context: "BAM — formerly More Impact", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "ornikar", name: "Ornikar", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "jutheau-husson", name: "Jutheau-Husson", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "lita", name: "Lita", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "gala-utt", name: "Gala UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "gala-tv", name: "Gala UTT — TV Display", context: "UNG — UTT Net Group (2017)", role: "Developer", contribution: "major", tagline: "Digital signage: live info and animations shown on the school's TVs during the gala.", metrics: [], tech: ["React", "Node"] },
    { id: "my-utt", name: "My UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "integration-utt", name: "Intégration UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "bde-utt", name: "BDE UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: LOREM_TAGLINE, metrics: [], tech: ["React Native", "Laravel / PHP"] },
  ],
  experience: [
    { id: "unlockt", company: "Unlockt.me", role: "Senior Mobile Engineer", period: "Sep. 2024 → present", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Unlockt", projectId: "unlockt" }] },
    // PLACEHOLDER period "20XX" — Behind The App mapping to be confirmed by Arnaud.
    { id: "behind-the-app", company: "Behind The App", role: "Mobile Engineer", period: "20XX", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Disorder", projectId: "disorder" }, { label: "Exposed", projectId: "exposed" }] },
    { id: "le-collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "May → Sep. 2024", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Le Collectionist", projectId: "le-collectionist" }] },
    { id: "roger", company: "Roger", role: "Mobile Engineer", period: "Feb. 2023 → Apr. 2024", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Roger", projectId: "roger" }] },
    { id: "happliness", company: "Happliness (Movizer)", role: "CTO & co-founder", period: "Nov. 2021 → Feb. 2023", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Movizer", projectId: "movizer" }] },
    { id: "bam", company: "BAM", role: "Mobile Engineer", period: "Feb. 2020 → Nov. 2021", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Ornikar", projectId: "ornikar" }, { label: "Konectom", projectId: "konectom" }, { label: "Rift", projectId: "rift" }, { label: "Jutheau-Husson", projectId: "jutheau-husson" }, { label: "Lita", projectId: "lita" }] },
    { id: "ung", company: "UNG (UTT Net Group)", role: "Developer & President", period: "2016 → 2019", summary: "", highlights: LOREM_MISSIONS, companyUrl: "#", appTags: [{ label: "Gala UTT", projectId: "gala-utt" }, { label: "Gala TV", projectId: "gala-tv" }, { label: "My UTT", projectId: "my-utt" }, { label: "Intégration UTT", projectId: "integration-utt" }, { label: "BDE UTT", projectId: "bde-utt" }] },
  ],
  stack: [
    { label: "Mobile", items: ["React Native", "Expo / EAS", "TypeScript", "Reanimated", "Skia", "Native modules", "React Query"] },
    { label: "Backend", items: ["NestJS", "PostgreSQL"] },
    { label: "Infra & Tooling", items: ["AWS", "RevenueCat", "Sentry", "Firebase", "GitHub Actions"] },
  ],
  education: [
    { title: "Engineering degree, SRT — Systems, Networks & Telecommunications", org: "University of Technology of Troyes", period: "2020", details: "TMSE specialization — Mobile Technologies & Embedded Systems." },
    { title: "Master's in Information Systems Security", org: "University of Technology of Troyes", period: "2020" },
  ],
  languages: [
    { name: "French", level: "Native" },
    { name: "English", level: "C1" },
    { name: "Spanish", level: "B1" },
  ],
};
