import type { CvContent } from "./types";

export const en: CvContent = {
  hero: {
    name: "Arnaud Dufour",
    title: "Senior React Native Engineer",
    tagline: "React Native since 2018 · Former CTO & co-founder · AI-Native",
    location: "Reims — 45 min from Paris Gare de l'Est",
    availability: "Open to work — senior mobile engineer, permanent role, Paris (on-site 2-4 days/week)",
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
    { id: "movizer", name: "Movizer", role: "CTO & co-founder", tagline: "Personalised movie & series recommendations, shared with friends.", metrics: [], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Removed from the App Store (2024)" },
  ],
  // Full catalogue — consumed by /projets. Stable ids (kebab-case).
  projects: [
    { id: "unlockt", name: "Unlockt", context: "Unlockt.me", role: "Senior Mobile Engineer", contribution: "major", tagline: "Creators selling their files.", metrics: ["1.2M active users"], tech: ["React Native", "TypeScript", "React Query", "Reanimated", "Shared Element", "Veriff & Yoti (KYC)", "Firebase", "Sentry", "Amplitude", "Lottie"], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" }, screenshots: [
      { src: "/projects/unlockt/unlockt-1.jpg", alt: "Unlockt app screenshot (1/4)", width: 820, height: 1775 },
      { src: "/projects/unlockt/unlockt-2.jpg", alt: "Unlockt app screenshot (2/4)", width: 820, height: 1775 },
      { src: "/projects/unlockt/unlockt-3.jpg", alt: "Unlockt app screenshot (3/4)", width: 820, height: 1775 },
      { src: "/projects/unlockt/unlockt-4.jpg", alt: "Unlockt app screenshot (4/4)", width: 820, height: 1775 },
    ] },
    { id: "exposed", name: "Exposed", context: "Behind The App · Dashi group", role: "Mobile Engineer", contribution: "major", tagline: "\"Who's Most Likely To\" party game (5000+ prompts, 4 modes). Vakarm in France, Exposed internationally.", metrics: ["~500k users/month"], tech: ["React Native", "TypeScript", "Reanimated", "Colyseus (real-time)", "RevenueCat", "Firebase", "Detox", "SVG"], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" }, screenshots: [
      { src: "/projects/exposed/exposed-1.jpg", alt: "Exposed app screenshot (1/4)", width: 820, height: 1774 },
      { src: "/projects/exposed/exposed-2.jpg", alt: "Exposed app screenshot (2/4)", width: 820, height: 1774 },
      { src: "/projects/exposed/exposed-3.jpg", alt: "Exposed app screenshot (3/4)", width: 820, height: 1774 },
      { src: "/projects/exposed/exposed-4.jpg", alt: "Exposed app screenshot (4/4)", width: 820, height: 1774 },
    ] },
    { id: "disorder", name: "Disorder", context: "Behind The App · Dashi group", role: "Mobile Engineer", contribution: "major", tagline: "Social app: weekly group chats with strangers nearby (50/50 mixed groups).", metrics: [], tech: ["React Native", "TypeScript", "Skia", "Reanimated", "Stream Chat", "React Query", "MMKV", "RevenueCat", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" }, screenshots: [
      { src: "/projects/disorder/disorder-1.jpg", alt: "Disorder app screenshot (1/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-2.jpg", alt: "Disorder app screenshot (2/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-3.jpg", alt: "Disorder app screenshot (3/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-4.jpg", alt: "Disorder app screenshot (4/4)", width: 820, height: 1775 },
    ] },
    { id: "movizer", name: "Movizer", context: "Happliness", role: "CTO & co-founder", contribution: "lead", tagline: "Personalised movie & series recommendations, shared with friends.", metrics: [], tech: ["React Native", "TypeScript", "NestJS", "GraphQL", "PostgreSQL", "Redis", "TypeORM", "Firebase", "AWS S3"], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Removed from the App Store (2024)", screenshots: [
      { src: "/projects/movizer/movizer-1.png", alt: "Movizer — movie detail screen (Dune) with a friend's recommendation", width: 700, height: 806 },
      { src: "/projects/movizer/movizer-2.png", alt: "Movizer — discussions screen with friends about a movie", width: 700, height: 1402 },
      { src: "/projects/movizer/movizer-3.png", alt: "Movizer — search screen: curated movie & series picks to discover", width: 700, height: 1396 },
    ] },
    { id: "le-collectionist", name: "Le Collectionist", context: "Le Collectionist", role: "Senior Mobile Engineer", contribution: "minor", tagline: "Rentals of exceptional villas and houses.", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/le-collectionist/id1630324684", label: "App Store" } },
    { id: "roger", name: "Roger", context: "Roger", role: "Mobile Engineer", contribution: "minor", tagline: "Enterprise communication and collaboration tool.", metrics: [], tech: ["React Native", "TypeScript", "Sentry", "AppCenter", "Fastlane"] },
    { id: "konectom", name: "Konectom", context: "BAM — Biogen client", role: "Mobile Engineer", contribution: "minor", tagline: "Clinical self-assessment (Biogen): measuring motor and cognitive function.", metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "rift", name: "More Impact / Rift", context: "Lita", role: "Mobile Engineer", contribution: "minor", tagline: "Impact savings app built for Lita — formerly \"More Impact\", now renamed Rift.", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/rift/id1494745935", label: "App Store" } },
    { id: "ornikar", name: "Ornikar", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: "Driving theory and driving test preparation.", metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "jutheau-husson", name: "Jutheau-Husson", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: "Mobile app for a leading Monaco insurance broker — modernising the client relationship.", metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "gala-utt", name: "Gala UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: "UTT Gala app: info, ticketing, schedule.", metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "gala-tv", name: "Gala UTT — TV Display", context: "UNG — UTT Net Group (2017)", role: "Developer", contribution: "major", tagline: "Digital signage: live info and animations shown on the school's TVs during the gala.", metrics: [], tech: ["React", "Node"] },
    { id: "my-utt", name: "My UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: "UTT student life app.", metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "integration-utt", name: "Intégration UTT", context: "UNG — UTT Net Group", role: "Developer", contribution: "major", tagline: "Onboarding app for new UTT students.", metrics: [], tech: ["React Native", "Laravel / PHP"] },
  ],
  experience: [
    { id: "unlockt", company: "Unlockt.me", role: "Senior Mobile Engineer", period: "Sep. 2024 → present", summary: "Senior mobile engineer within the Dashi group (Unlockt & Behind The App), across several consumer apps.", highlights: [
      "Unlockt: full rewrite of the app from scratch (new codebase, on an existing product) — new design and new features (React Native, ~1.2M active users); Veriff & Yoti (identity verification)",
      "Disorder: built the entire front end (Skia, Reanimated, Stream Chat); RevenueCat monetisation",
      "Exposed / Vakarm: rebuilt the app from scratch and built the back end (Colyseus, real-time); RevenueCat",
      "Firebase & Sentry across all apps",
    ], companyUrl: "https://www.linkedin.com/company/unlockt/", appTags: [{ label: "Unlockt", projectId: "unlockt" }, { label: "Disorder", projectId: "disorder" }, { label: "Exposed", projectId: "exposed" }] },
    { id: "le-collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "May → Sep. 2024", summary: "", highlights: ["React Native mobile app development", "Contracts, Payment & Billing squad: critical customer-journey features and payment-related changes"], companyUrl: "https://www.linkedin.com/company/le-collectionist/", appTags: [{ label: "Le Collectionist", projectId: "le-collectionist" }] },
    { id: "roger", company: "Roger", role: "Mobile Engineer", period: "Feb. 2023 → Apr. 2024", summary: "", highlights: [
      "Mobile app built from scratch in React Native",
      "Contributions to the web front end as needed",
      "CI/CD & monitoring: Fastlane, AppCenter, Firebase, Sentry",
    ], companyUrl: "https://www.linkedin.com/company/get-roger/", appTags: [{ label: "Roger", projectId: "roger" }] },
    { id: "happliness", company: "Happliness (Movizer)", role: "CTO & co-founder", period: "Nov. 2021 → Feb. 2023", summary: "", highlights: [
      "Technical and product leadership (co-founder)",
      "React Native mobile app and NestJS / GraphQL / PostgreSQL / Redis back end; Firebase",
      "Next.js web landing page, AWS infrastructure",
    ], companyUrl: "https://www.linkedin.com/company/movizer/", appTags: [{ label: "Movizer", projectId: "movizer" }] },
    { id: "bam", company: "BAM · now Theodo Apps", role: "Mobile Engineer", period: "Feb. 2020 → Nov. 2021", summary: "", highlights: [
      "React Native mobile engineer staffed on-site (staff augmentation) with several clients",
      "Konectom (Biogen): launched the product from scratch within a large team (4 mobile, 3 backend, 2 data + PO/PM); built a native Swift module",
      "More Impact / Rift (Lita): took over the project and built new features",
      "Ornikar: feature development (short assignment)",
      "Jutheau-Husson: kicked off and set up the mobile project from scratch",
    ], companyUrl: "https://www.linkedin.com/company/theodo-apps/", appTags: [{ label: "Ornikar", projectId: "ornikar" }, { label: "Konectom", projectId: "konectom" }, { label: "More Impact / Rift", projectId: "rift" }, { label: "Jutheau-Husson", projectId: "jutheau-husson" }] },
    { id: "ung", company: "UNG (UTT Net Group)", role: "Developer & President", period: "2016 → 2019", summary: "", highlights: [
      "Mobile apps built from scratch: My UTT, Intégration UTT, Gala UTT (React Native)",
      "Added back-end endpoints (Laravel / PHP) and front-end for Intégration UTT",
      "TV display system for the school during the Gala (2017)",
      "President of the association (2017 & 2019)",
    ], companyUrl: "https://uttnetgroup.fr/", appTags: [{ label: "Gala UTT", projectId: "gala-utt" }, { label: "Gala TV", projectId: "gala-tv" }, { label: "My UTT", projectId: "my-utt" }, { label: "Intégration UTT", projectId: "integration-utt" }] },
  ],
  stack: [
    { label: "Mobile", items: ["React Native", "Expo / EAS", "TypeScript", "Reanimated", "Skia", "Native modules", "React Query", "Stream Chat", "MMKV", "Detox", "i18n (react-intl / i18next)"] },
    { label: "Backend", items: ["NestJS", "PostgreSQL", "Colyseus", "GraphQL", "Redis"] },
    { label: "Infra & Tooling", items: ["AWS", "RevenueCat", "Sentry", "Firebase", "GitHub Actions", "Veriff & Yoti (KYC)"] },
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
