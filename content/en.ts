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
    { title: "Senior React Native", body: "Deep mobile specialisation since 2018: not a fullstack who can also do mobile, but a mobile engineer who can be fullstack." },
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
    { id: "unlockt", name: "Unlockt", period: "2025 → present", experienceId: "unlockt", context: "Unlockt", role: "Senior Mobile Engineer", contribution: "major", tagline: "Creators selling their files.", description: "Full rewrite of an existing app: new codebase, new design, new features. A platform for creators to sell their files. Identity verification (Veriff & Yoti), Firebase and Sentry.", metrics: ["1.2M active users"], tech: ["React Native", "Expo", "TypeScript", "React Query", "Reanimated", "Shared Element", "Veriff", "Yoti", "Firebase", "Sentry", "Amplitude", "Lottie", "Claude Code"], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" }, screenshots: [
      { src: "/projects/unlockt/unlockt-1.jpg", alt: "Unlockt — send-a-file screen (set a price, generate the link)", width: 820, height: 1777 },
      { src: "/projects/unlockt/unlockt-2.jpg", alt: "Unlockt — link detail (media, price, sales, earnings)", width: 820, height: 1782 },
      { src: "/projects/unlockt/unlockt-3.jpg", alt: "Unlockt — wallet (balance, withdrawals, transactions)", width: 820, height: 1782 },
    ] },
    { id: "exposed", name: "Exposed", period: "Jan → Jun 2026", experienceId: "unlockt", context: "Behind The App · Dashi group", role: "Mobile Engineer", contribution: "major", tagline: "Party game \"Who's Most Likely To\" (5000+ prompts, 4 modes).", description: "A multiplayer party game (\"Who's Most Likely To\" and other modes): everyone joins from their phone and answers the prompts, often anonymously — from fun to more daring. I rebuilt the app from scratch and built the real-time backend with Colyseus. Vakarm in France, Exposed internationally.", metrics: ["~500k users/month"], tech: ["React Native", "Expo", "TypeScript", "Reanimated", "Colyseus (real-time)", "RevenueCat", "Firebase", "SVG", "Claude Code"], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" }, screenshots: [
      { src: "/projects/exposed/exposed-1.jpg", alt: "Exposed — game lobby (game pin, players)", width: 820, height: 1782 },
      { src: "/projects/exposed/exposed-2.jpg", alt: "Exposed — voting round with live results", width: 820, height: 1781 },
    ] },
    { id: "disorder", name: "Disorder", period: "Sept. 2024 → Jan. 2025", experienceId: "unlockt", context: "Behind The App · Dashi group", role: "Mobile Engineer", contribution: "major", tagline: "Social app: weekly group chats with strangers nearby (50/50 mixed groups).", description: "A social app where, each week, you join group chats with strangers nearby (50/50 mixed groups). I built the whole front end (Skia, Reanimated, Stream Chat) and the RevenueCat monetization.", metrics: [], tech: ["React Native", "TypeScript", "Skia", "Reanimated", "Stream Chat", "React Query", "MMKV", "RevenueCat", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" }, screenshots: [
      { src: "/projects/disorder/disorder-1.jpg", alt: "Disorder app screenshot (1/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-2.jpg", alt: "Disorder app screenshot (2/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-3.jpg", alt: "Disorder app screenshot (3/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-4.jpg", alt: "Disorder app screenshot (4/4)", width: 820, height: 1775 },
    ] },
    { id: "portfolio", name: "Portfolio", period: "2026", context: "Personal project · 2026", role: "Design & development", contribution: "lead", badge: "Personal project", tagline: "This very site — built as a technical demonstration (green Lighthouse, accessible, careful SEO, bilingual), made almost 100% with Claude (Claude Code).", metrics: [], tech: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "next-intl", "Vercel", "Vitest", "Claude Code"], repo: { href: "https://github.com/arnaud9145/portfolio", label: "Code (GitHub)" }, screenshots: [{ src: "/projects/portfolio/portfolio-1.jpg", alt: "Portfolio — home page (hero)", width: 1600, height: 1000 }] },
    { id: "le-collectionist", name: "Le Collectionist", period: "May → Sept. 2024", experienceId: "le-collectionist", context: "Le Collectionist", role: "Senior Mobile Engineer", contribution: "minor", tagline: "Rentals of exceptional villas and houses.", description: "React Native app for renting exceptional villas and houses. Within the Contracts, Payment & Billing squad: critical client-journey features and payment-related work. (Short mission.)", metrics: [], tech: ["React Native", "Expo", "TypeScript", "GraphQL (Apollo)", "Redux Toolkit", "Stripe", "Mapbox", "Algolia", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/fr/app/le-collectionist/id1630324684", label: "App Store" }, screenshots: [
      { src: "/projects/le-collectionist/le-collectionist-1.jpg", alt: "Le Collectionist — villa listing detail screen (1)", width: 820, height: 1775 },
      { src: "/projects/le-collectionist/le-collectionist-2.jpg", alt: "Le Collectionist — search & booking screen (2)", width: 820, height: 1775 },
      { src: "/projects/le-collectionist/le-collectionist-3.jpg", alt: "Le Collectionist — trip / stay details screen (3)", width: 820, height: 1775 },
    ] },
    { id: "kroptek", name: "Kroptek", period: "since 2022", experienceId: "freelance", context: "Freelance", role: "Freelance developer", contribution: "lead", badge: "Solo project", tagline: "Automated monthly impact reports for Kroptek's clients.", description: "A tool that generates monthly PDF reports (coffee grounds collected, ecological impact) from the entered data, then automatically emails them to Kroptek's clients. Freelance mission since September 2022, including a recent rebranding of the reports.", metrics: [], tech: ["Next.js", "TypeScript", "TypeORM", "PostgreSQL", "Nodemailer", "Puppeteer (PDF)", "Chart.js", "Heroku"], screenshotNote: "Sample monthly report (no real data).", status: "In use", screenshots: [{ src: "/projects/kroptek/kroptek-report.jpg", alt: "Kroptek — sample monthly impact report (no data)", width: 2000, height: 1125 }] },
    { id: "roger", name: "Roger", period: "2023–2024", experienceId: "roger", context: "Roger", role: "Senior Mobile Engineer", contribution: "major", screenshotNote: "Screenshots from the app stores.", tagline: "The \"French Slack\": enterprise communication and collaboration.", description: "Mobile app built from scratch in React Native (enterprise communication and collaboration), with occasional contributions to the web front end. CI/CD and monitoring: Fastlane, AppCenter, Firebase, Sentry.", metrics: [], tech: ["React Native", "Expo", "TypeScript", "Sentry", "AppCenter", "Fastlane"], status: "Removed from the App Store (2024)" },
    { id: "movizer", name: "Movizer", period: "2021–2023", experienceId: "happliness", context: "Happliness", role: "CTO & co-founder", contribution: "lead", tagline: "Personalised movie & series recommendations, shared with friends.", description: "Co-founder & CTO: a React Native app for personalised movie & series recommendations shared with friends. NestJS/GraphQL/PostgreSQL/Redis backend, Next.js landing, AWS infra. Technical and product leadership.", metrics: [], tech: ["React Native", "TypeScript", "NestJS", "GraphQL", "PostgreSQL", "Redis", "TypeORM", "ForestAdmin", "Firebase", "AWS S3", "Next.js (landing)"], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Removed from the App Store (2024)", screenshots: [
      { src: "/projects/movizer/movizer-1.png", alt: "Movizer — movie detail screen (Dune) with a friend's recommendation", width: 700, height: 806 },
      { src: "/projects/movizer/movizer-2.png", alt: "Movizer — discussions screen with friends about a movie", width: 700, height: 1402 },
      { src: "/projects/movizer/movizer-3.png", alt: "Movizer — search screen: curated movie & series picks to discover", width: 700, height: 1396 },
    ] },
    { id: "flute", name: "La Flute", period: "since 2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", tagline: "Website for the La Flûte student party.", description: "Which I maintain every year: several events a year, sign-ups and organisation-info collection, payments via HelloAsso, and mini-games for attendees.", metrics: [], tech: ["React", "MUI", "Apollo / GraphQL", "NestJS", "TypeORM", "HelloAsso"], link: { href: "https://flute3.sale", label: "flute3.sale" }, screenshots: [
      { src: "/projects/flute/flute-1.jpg", alt: "La Flute — event-management back office (participants, rooms, payments)", width: 1200, height: 691 },
    ] },
    { id: "ornikar", name: "Ornikar", period: "2021", experienceId: "bam", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: "App for driving instructors (Ornikar Enseignants): lesson scheduling and student tracking.", description: "Feature development for the driving-instructor app (Ornikar Enseignants): lesson scheduling and student tracking. Short mission.", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/ornikar-enseignants/id1385539158", label: "App Store" }, screenshots: [
      { src: "/projects/ornikar/ornikar-1.jpg", alt: "Ornikar Enseignants — lesson schedule (1)", width: 820, height: 1775 },
      { src: "/projects/ornikar/ornikar-2.jpg", alt: "Ornikar Enseignants — availability update (2)", width: 820, height: 1775 },
      { src: "/projects/ornikar/ornikar-3.jpg", alt: "Ornikar Enseignants — student progress tracking (3)", width: 820, height: 1775 },
    ] },
    { id: "jutheau-husson", name: "Jutheau-Husson", period: "2020", experienceId: "bam", context: "BAM", role: "Mobile Engineer", contribution: "major", tagline: "Mobile app for a leading Monaco insurance broker — modernising the client relationship.", description: "Launch and initial setup of the mobile app for a leading Monaco insurance broker, to modernise the client relationship. (Via BAM.)", metrics: [], tech: ["React Native", "TypeScript"], screenshots: [
      { src: "/projects/jutheau-husson/jutheau-1.jpg", alt: "Jutheau-Husson — insurance app screen (1)", width: 460, height: 997 },
      { src: "/projects/jutheau-husson/jutheau-2.jpg", alt: "Jutheau-Husson — insurance app screen (2)", width: 460, height: 997 },
      { src: "/projects/jutheau-husson/jutheau-3.jpg", alt: "Jutheau-Husson — insurance app screen (3)", width: 460, height: 997 },
    ] },
    { id: "konectom", name: "Konectom", period: "2020–2021", experienceId: "bam", context: "BAM — Biogen client", role: "Mobile Engineer", contribution: "major", tagline: "Clinical self-assessment (Biogen): measuring motor and cognitive function.", description: "Launched the product from scratch for Biogen (via BAM), within a large team (4 mobile, 3 back, 2 data + PO/PM). A clinical self-assessment app for motor and cognitive function; built a native Swift module.", metrics: [], tech: ["React Native", "TypeScript", "Native modules"], screenshots: [
      { src: "/projects/konectom/konectom-1.jpg", alt: "Konectom — clinical self-assessment (screen 1)", width: 820, height: 1455 },
      { src: "/projects/konectom/konectom-2.jpg", alt: "Konectom — clinical self-assessment (screen 2)", width: 820, height: 1455 },
      { src: "/projects/konectom/konectom-3.jpg", alt: "Konectom — clinical self-assessment (screen 3)", width: 820, height: 1455 },
    ] },
    { id: "rift", name: "More Impact / Rift", period: "2021", experienceId: "bam", context: "Lita", role: "Mobile Engineer", contribution: "minor", tagline: "The Yuka of finance: scan the impact of your savings. Built for Lita, formerly \"More Impact\".", description: "Took over the project and built new features. The \"Yuka of finance\": scan the impact of your savings. Built by Lita (formerly More Impact).", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/rift/id1494745935", label: "App Store" }, screenshots: [
      { src: "/projects/rift/rift-1.jpg", alt: "Rift — savings breakdown (1)", width: 148, height: 303 },
      { src: "/projects/rift/rift-2.jpg", alt: "Rift — environmental impact of savings (2)", width: 148, height: 303 },
      { src: "/projects/rift/rift-3.jpg", alt: "Rift — ethical savings products (3)", width: 148, height: 303 },
    ] },
    { id: "my-utt", name: "My UTT", period: "2020", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", tagline: "UTT student life app.", description: "My first React Native app, built from scratch: the UTT student-life app. Added backend endpoints in Laravel/PHP (and Symfony on the student site).", metrics: [], tech: ["React Native", "Expo", "TypeScript", "Symfony (API)", "i18n"], repo: { href: "https://github.com/ungdev/etuutt-mobile", label: "App (GitHub)" }, screenshots: [
      { src: "/projects/my-utt/my-utt-1.jpg", alt: "My UTT — home screen (1)", width: 820, height: 1775 },
      { src: "/projects/my-utt/my-utt-2.jpg", alt: "My UTT — student life features screen (2)", width: 820, height: 1775 },
      { src: "/projects/my-utt/my-utt-3.jpg", alt: "My UTT — student profile screen (3)", width: 820, height: 1775 },
    ] },
    { id: "etuutt", name: "EtuUTT", web: true, period: "2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", tagline: "The UTT student portal — everyday tools, web version.", description: "Web version of the student portal (companion to the My UTT app). On the Symfony backend I built much of the API: timetables and course comparison, course units (data import & parsing), events, badges, push notifications, authentication. I also bootstrapped the modern front-end rewrite (React / Next, TypeScript).", metrics: [], tech: ["PHP", "Symfony", "TypeScript", "React"], link: { href: "https://etu.utt.fr", label: "etu.utt.fr" }, repo: { href: "https://github.com/ungdev/EtuUTT", label: "Back (GitHub)" }, repoBack: { href: "https://github.com/ungdev/etuutt-front", label: "Front (GitHub)" } },
    { id: "integration-utt", name: "Intégration UTT", period: "2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", tagline: "Freshman integration app for UTT students.", description: "Freshman integration app. It existed in Ionic before I joined; I fully rebuilt it from scratch in React Native, adding backend (Laravel/PHP) and front-end endpoints.", metrics: [], tech: ["React Native", "Laravel / PHP"], repo: { href: "https://github.com/ungdev/integration-mobile", label: "App RN (GitHub)" }, repoBack: { href: "https://github.com/ungdev/integration-UTT", label: "Site (GitHub)" }, screenshots: [
      { src: "/projects/integration-utt/integration-utt-1.jpg", alt: "Intégration UTT — onboarding welcome screen (1)", width: 820, height: 1777 },
      { src: "/projects/integration-utt/integration-utt-2.jpg", alt: "Intégration UTT — campus orientation screen (2)", width: 820, height: 1777 },
      { src: "/projects/integration-utt/integration-utt-3.jpg", alt: "Intégration UTT — new-student checklist screen (3)", width: 820, height: 1777 },
    ] },
    { id: "uttarena-app", name: "UTT Arena — Intranet", period: "2018", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", legacy: true, tagline: "UTT Arena intranet: tournament info for players and event management for staff. Integrated with the network captive portal — seat ↔ IP ↔ user ↔ MAC mapping, IPs communicated in real time.", description: "Intranet for the UTT Arena esport event, working with the network team: the captive portal required a login to the intranet; I relayed, in real time, the mapping of seat ⇄ IP ⇄ user ⇄ MAC.", metrics: ["450 players managed (2018 edition)"], tech: ["React", "Ant Design", "Chart.js", "OpenID Connect", "Node.js"], repo: { href: "https://github.com/ungdev/UA-appli", label: "App (GitHub)" }, repoBack: { href: "https://github.com/ungdev/UA-api-old", label: "API (GitHub)" }, status: "Offline", screenshots: [
      { src: "/projects/uttarena-app/uttarena-app-1.jpg", alt: "UTT Arena — intranet (home: tournaments, partners)", width: 1200, height: 799 },
    ] },
    { id: "utt-arena", name: "UTT Arena", period: "2018", experienceId: "ung", context: "UNG — UTT Net Group", role: "Developer & President", contribution: "major", legacy: true, tagline: "Website of the largest e-sport LAN in the Grand Est — president of UTT Arena in 2018, built the site that year.", description: "The UTT Arena 2018 website (esport tournament): ~450 players and many visitors. One of my very first web projects (React / Redux).", metrics: ["450 players + visitors (2018 edition)"], tech: ["React", "Redux", "Node.js"], link: { href: "https://arena.utt.fr", label: "arena.utt.fr" }, repo: { href: "https://github.com/ungdev/UA-front-old", label: "Site (GitHub)" }, repoBack: { href: "https://github.com/ungdev/UA-api-old", label: "API (GitHub)" }, screenshots: [
      { src: "/projects/utt-arena/utt-arena-1.jpg", alt: "UTT Arena — e-sport competition website", width: 1200, height: 750 },
    ] },
    { id: "billetterie-bde", name: "Billetterie BDE", period: "2018", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", tagline: "Ticketing for the UTT student-union (BDE) events.", description: "Same idea as the Gala app, but for the student union's events throughout the year (e.g. the R2D graduation ceremony): ticketing, info, tickets and a map. Barely used in practice.", metrics: [], tech: ["Ionic", "Angular", "Cordova", "TypeScript", "OneSignal"], repo: { href: "https://github.com/ungdev/billetterie-bde-mobile", label: "Code (GitHub)" }, screenshots: [{ src: "/projects/billetterie-bde/bde-1.png", alt: "Billetterie BDE — home with countdown to the R2D event", width: 1242, height: 2208 }, { src: "/projects/billetterie-bde/bde-2.png", alt: "Billetterie BDE — app screen", width: 1242, height: 2208 }, { src: "/projects/billetterie-bde/bde-3.png", alt: "Billetterie BDE — app screen", width: 1242, height: 2208 }] },
    { id: "gala-tv", name: "Gala UTT — TV Display", period: "2019–2020", experienceId: "ung", context: "UNG — UTT Net Group (2017)", role: "Student developer", contribution: "major", legacy: true, tagline: "Digital signage: live info and animations shown on the school's TVs during the gala.", description: "Digital signage pushed to the school's screens through Xibo. Memorable constraint: it had to render flawlessly on Internet Explorer — an absolute pain.", metrics: [], tech: ["React", "Node"], repo: { href: "https://github.com/ungdev/gala-tv-front", label: "Front (GitHub)" }, repoBack: { href: "https://github.com/ungdev/TVGala_Server", label: "Server (GitHub)" }, screenshots: [
      { src: "/projects/gala-tv/gala-tv-1.jpg", alt: "Gala UTT — signage shown on the school's screens", width: 1100, height: 618 },
    ] },
    { id: "gala-utt", name: "Gala UTT", period: "2018–2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Student developer", contribution: "major", screenshotNote: "No app screenshots available — here's the Gala poster.", tagline: "The UTT Gala night companion: real-time line-up, interactive map and notifications.", description: "A project I launched from scratch — first in Ionic, then fully rewritten in React Native. Not a ticketing app but a real night companion: real-time line-up, a custom interactive map with geolocation, and notifications before each highlight of the evening.", metrics: [], tech: ["React Native", "Ionic 3", "Angular"], repo: { href: "https://github.com/ungdev/Gala-Mobile", label: "App (GitHub)" }, repoBack: { href: "https://github.com/ungdev/gala-api", label: "API (GitHub)" }, status: "Removed from the App Store (2020)", screenshots: [{ src: "/projects/gala-utt/gala-utt-2019.jpg", alt: "UTT Gala — 2019 edition poster", width: 618, height: 914 }] },  ],
  experience: [
    { id: "unlockt", company: "Unlockt", role: "Senior Mobile Engineer", period: "Sep. 2024 → present", summary: "Senior mobile engineer within the Dashi group (Unlockt & Behind The App), across several consumer apps.", highlights: [
      "Unlockt: full rewrite of the app from scratch (new codebase, on an existing product) — new design and new features (React Native, ~1.2M active users); Veriff & Yoti (identity verification)",
      "Disorder: built the entire front end (Skia, Reanimated, Stream Chat); RevenueCat monetisation",
      "Exposed / Vakarm: rebuilt the app from scratch and built the back end (Colyseus, real-time); RevenueCat",
      "Firebase & Sentry across all apps",
      "AI at the core of the workflow: Codex then Claude (Claude Code) progressively integrated into my daily practice — now indispensable.",
    ], companyUrl: "https://www.linkedin.com/company/unlockt/" },
    { id: "le-collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "May → Sep. 2024", summary: "", highlights: ["React Native mobile app development", "Contracts, Payment & Billing squad: critical customer-journey features and payment-related changes"], companyUrl: "https://www.linkedin.com/company/le-collectionist/" },
    { id: "roger", company: "Roger", role: "Senior Mobile Engineer", period: "Feb. 2023 → Apr. 2024", summary: "", highlights: [
      "Mobile app built from scratch in React Native",
      "Contributions to the web front end as needed",
      "CI/CD & monitoring: Fastlane, AppCenter, Firebase, Sentry",
    ], companyUrl: "https://www.linkedin.com/company/get-roger/" },
    { id: "freelance", company: "Freelance", role: "Occasional missions", companyUrl: "https://www.linkedin.com/company/kroptek/", period: "since 2022", tag: "Freelance · alongside", summary: "Very occasional freelance development, alongside my employed roles.", highlights: [
      "Kroptek: a tool that automates monthly impact reports — PDF generation (Puppeteer) and automatic emailing (Nodemailer). Next.js / TypeORM / PostgreSQL stack, hosted on Heroku; recent rebranding.",
    ] },
    { id: "happliness", company: "Happliness", role: "CTO & co-founder", period: "Nov. 2021 → Feb. 2023", summary: "", highlights: [
      "Technical and product leadership (co-founder)",
      "React Native mobile app and NestJS / GraphQL / PostgreSQL / Redis back end; Firebase",
      "Next.js web landing page, AWS infrastructure",
    ], companyUrl: "https://www.linkedin.com/company/movizer/" },
    { id: "bam", company: "BAM (now Theodo Apps)", role: "Mobile Engineer", period: "Feb. 2020 → Nov. 2021", summary: "", highlights: [
      "React Native mobile engineer for several clients — mostly in-house at BAM, embedded on-site only for Ornikar.",
      "Konectom (Biogen): launched the product from scratch within a large team (4 mobile, 3 backend, 2 data + PO/PM); built a native Swift module",
      "More Impact / Rift (Lita): took over the project and built new features",
      "Ornikar: feature development (short assignment)",
      "Jutheau-Husson: kicked off and set up the mobile project from scratch",
    ], companyUrl: "https://www.linkedin.com/company/theodo-apps/" },
    { id: "ung", company: "UTT Net Group", role: "Vice-President & President", period: "2016 → 2019", summary: "UTT's student tech association.", tag: "Student association", highlights: [
      "Several volunteer terms between 2016 and 2019: Vice-President then President of UNG, and President of UTT Arena.",
      "Organised major student events — UTT Arena (esport tournament, ~450 players and many visitors) and the UTT Gala.",
      "Recruitment, training and team cohesion; planning and coordination.",
      "Built apps and websites for the association (details in the projects).",
    ], companyUrl: "https://uttnetgroup.fr/" },
  ],
  education: [
    { title: "Engineering degree, SRT — Systems, Networks & Telecommunications", org: "University of Technology of Troyes", orgUrl: "https://www.utt.fr/", period: "2020", details: "TMSE specialization — Mobile Technologies & Embedded Systems." },
    { title: "Master's in Information Systems Security", org: "University of Technology of Troyes", orgUrl: "https://www.utt.fr/", period: "2020" },
  ],
  languages: [
    { name: "French", level: "Native", flag: "🇫🇷" },
    { name: "English", level: "C1", flag: "🇬🇧" },
    { name: "Spanish", level: "B1", flag: "🇪🇸" },
  ],
  interests: [
    { icon: "🏋️", label: "Fitness", note: "1 to 3 gym sessions a week (mostly Slowe), bootcamp or Hyrox. ~20 kg lost (from 125 to 105), aiming for 20 more!" },
    { icon: "🧱", label: "LEGO", note: "I still have the Harry Potter sets from my childhood; these days I focus on Star Wars and Marvel. My favourite: the UCS Venator. I'm also getting into collecting Marvel figures." },
    { icon: "✈️", label: "Travel", note: "Most memorable: six months in Shanghai during my studies — including a night camping on the Great Wall. More recently, Alicante in Spain." },
    { icon: "🚗", label: "Cars", note: "Into cars: I buy and sell as the mood takes me — currently on my second Audi TT (a grey quattro V6 3.2 naturally aspirated). I love driving, and I've even done a track day (in a TT RS)." },
    { icon: "🎧", label: "Music (DJ)", note: "Mostly student parties and a few bars. I'll play anything, with a soft spot for commercial/pop, big room and hardstyle." },
    { icon: "🐱", label: "Cats", note: "Lucy, my all-black bundle of fluff (2021), super cuddly — I even got a ground-floor flat so she could roam the residence." },
  ],
};
