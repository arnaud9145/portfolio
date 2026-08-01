import type { CvContent } from "./types";

export const fr: CvContent = {
  hero: {
    name: "Arnaud Dufour",
    title: "Senior React Native Engineer",
    tagline: "React Native depuis 2018 · Ex-CTO & cofondateur · AI-Native",
    location: "Reims — 45 min de Paris Gare de l'Est",
    availability: "En recherche — CDI ingénieur mobile senior, Paris (présent 2-4 j/semaine)",
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
    { id: "movizer", name: "Movizer", role: "CTO & cofondateur", tagline: "Recommandations personnalisées de films & séries, partage entre amis.", metrics: [], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Retirée de l'App Store (2024)" },
  ],
  // Catalogue complet — consommé par /projets. Ids stables (kebab-case).
  projects: [
    { id: "unlockt", name: "Unlockt", context: "Unlockt.me", role: "Senior Mobile Engineer", contribution: "major", tagline: "Vente de fichiers par des créateurs.", metrics: ["1,2 M d'utilisateurs actifs"], tech: ["React Native", "TypeScript", "React Query", "Reanimated", "Shared Element", "Veriff & Yoti (KYC)", "Firebase", "Sentry", "Amplitude", "Lottie"], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" }, screenshots: [
      { src: "/projects/unlockt/unlockt-1.jpg", alt: "Unlockt — écran d'envoi de fichier (définir un prix, générer le lien)", width: 820, height: 1777 },
      { src: "/projects/unlockt/unlockt-2.jpg", alt: "Unlockt — détail d'un lien (médias, prix, ventes, gains)", width: 820, height: 1782 },
      { src: "/projects/unlockt/unlockt-3.jpg", alt: "Unlockt — portefeuille (solde, retraits, opérations)", width: 820, height: 1782 },
    ] },
    { id: "exposed", name: "Exposed", context: "Behind The App · groupe Dashi", role: "Mobile Engineer", contribution: "major", tagline: "Party game « Who's Most Likely To » (5000+ défis, 4 modes). Vakarm en France, Exposed à l'international.", metrics: ["~500k utilisateurs/mois"], tech: ["React Native", "TypeScript", "Reanimated", "Colyseus (temps réel)", "RevenueCat", "Firebase", "Detox", "SVG"], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" }, screenshots: [
      { src: "/projects/exposed/exposed-1.jpg", alt: "Exposed — lobby d'une partie (game pin, joueurs)", width: 820, height: 1782 },
      { src: "/projects/exposed/exposed-2.jpg", alt: "Exposed — manche de vote avec résultats en direct", width: 820, height: 1781 },
    ] },
    { id: "disorder", name: "Disorder", context: "Behind The App · groupe Dashi", role: "Mobile Engineer", contribution: "major", tagline: "App sociale : chaque semaine, des group chats avec des inconnus de ta zone (groupes mixtes 50/50).", metrics: [], tech: ["React Native", "TypeScript", "Skia", "Reanimated", "Stream Chat", "React Query", "MMKV", "RevenueCat", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" }, screenshots: [
      { src: "/projects/disorder/disorder-1.jpg", alt: "Capture de l'app Disorder (1/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-2.jpg", alt: "Capture de l'app Disorder (2/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-3.jpg", alt: "Capture de l'app Disorder (3/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-4.jpg", alt: "Capture de l'app Disorder (4/4)", width: 820, height: 1775 },
    ] },
    { id: "movizer", name: "Movizer", context: "Happliness", role: "CTO & cofondateur", contribution: "lead", tagline: "Recommandations personnalisées de films & séries, partage entre amis.", metrics: [], tech: ["React Native", "TypeScript", "NestJS", "GraphQL", "PostgreSQL", "Redis", "TypeORM", "Firebase", "AWS S3"], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Retirée de l'App Store (2024)", screenshots: [
      { src: "/projects/movizer/movizer-1.png", alt: "Movizer — écran de détail d'un film (Dune) avec la recommandation d'un ami", width: 700, height: 806 },
      { src: "/projects/movizer/movizer-2.png", alt: "Movizer — écran des discussions entre amis autour d'un film", width: 700, height: 1402 },
      { src: "/projects/movizer/movizer-3.png", alt: "Movizer — écran de recherche : sélections de films et séries à découvrir", width: 700, height: 1396 },
    ] },
    { id: "le-collectionist", name: "Le Collectionist", context: "Le Collectionist", role: "Senior Mobile Engineer", contribution: "minor", tagline: "Location de villas et maisons d'exception.", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/le-collectionist/id1630324684", label: "App Store" } },
    { id: "roger", name: "Roger", context: "Roger", role: "Mobile Engineer", contribution: "minor", tagline: "Outil de communication et de collaboration d'entreprise.", metrics: [], tech: ["React Native", "TypeScript", "Sentry", "AppCenter", "Fastlane"] },
    { id: "konectom", name: "Konectom", context: "BAM — client Biogen", role: "Mobile Engineer", contribution: "minor", tagline: "Auto-évaluation clinique (Biogen) : mesure des fonctions motrices et cognitives.", metrics: [], tech: ["React Native", "TypeScript"], screenshots: [
      { src: "/projects/konectom/konectom-1.jpg", alt: "Konectom — auto-évaluation clinique (écran 1)", width: 820, height: 1455 },
      { src: "/projects/konectom/konectom-2.jpg", alt: "Konectom — auto-évaluation clinique (écran 2)", width: 820, height: 1455 },
      { src: "/projects/konectom/konectom-3.jpg", alt: "Konectom — auto-évaluation clinique (écran 3)", width: 820, height: 1455 },
    ] },
    { id: "rift", name: "More Impact / Rift", context: "Lita", role: "Mobile Engineer", contribution: "minor", tagline: "Application d'épargne à impact développée pour Lita — anciennement « More Impact », aujourd'hui renommée Rift.", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/rift/id1494745935", label: "App Store" } },
    { id: "ornikar", name: "Ornikar", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: "Code de la route et préparation au permis de conduire.", metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "jutheau-husson", name: "Jutheau-Husson", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: "Application mobile pour un leader monégasque du courtage en assurances — moderniser la relation client.", metrics: [], tech: ["React Native", "TypeScript"] },
    { id: "gala-utt", name: "Gala UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: "Application du Gala de l'UTT : infos, billetterie, programme.", metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "gala-tv", name: "Gala UTT — Affichage TV", context: "UNG — UTT Net Group (2017)", role: "Développeur", contribution: "major", tagline: "Affichage dynamique : infos et animations diffusées sur les TV de l'école pendant le gala.", metrics: [], tech: ["React", "Node"] },
    { id: "my-utt", name: "My UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: "Application de la vie étudiante de l'UTT.", metrics: [], tech: ["React Native", "Laravel / PHP"] },
    { id: "integration-utt", name: "Intégration UTT", context: "UNG — UTT Net Group", role: "Développeur", contribution: "major", tagline: "Application d'intégration des nouveaux étudiants de l'UTT.", metrics: [], tech: ["React Native", "Laravel / PHP"] },
  ],
  experience: [
    { id: "unlockt", company: "Unlockt.me", role: "Senior Mobile Engineer", period: "sept. 2024 → aujourd'hui", summary: "Ingénieur mobile senior au sein du groupe Dashi (Unlockt & Behind The App), sur plusieurs applications grand public.", highlights: [
      "Unlockt : réécriture complète de l'app de zéro (nouveau code, sur un produit existant) — nouveau design et nouvelles fonctionnalités (React Native, ~1,2 M utilisateurs actifs) ; intégration Veriff & Yoti (vérification d'identité)",
      "Disorder : développement de tout le front (Skia, Reanimated, Stream Chat) ; monétisation RevenueCat",
      "Exposed / Vakarm : refonte de l'app de zéro et développement du back (Colyseus, temps réel) ; RevenueCat",
      "Firebase & Sentry sur l'ensemble des apps",
    ], companyUrl: "https://www.linkedin.com/company/unlockt/", appTags: [{ label: "Unlockt", projectId: "unlockt" }, { label: "Disorder", projectId: "disorder" }, { label: "Exposed", projectId: "exposed" }] },
    { id: "le-collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "mai → sept. 2024", summary: "", highlights: ["Développement de l'application mobile React Native", "Squad Contrats, Paiement & Facturation : fonctionnalités critiques du parcours client et évolutions liées aux paiements"], companyUrl: "https://www.linkedin.com/company/le-collectionist/", appTags: [{ label: "Le Collectionist", projectId: "le-collectionist" }] },
    { id: "roger", company: "Roger", role: "Mobile Engineer", period: "févr. 2023 → avr. 2024", summary: "", highlights: [
      "App mobile développée de zéro en React Native",
      "Contributions au front web selon les besoins",
      "CI/CD & monitoring : Fastlane, AppCenter, Firebase, Sentry",
    ], companyUrl: "https://www.linkedin.com/company/get-roger/", appTags: [{ label: "Roger", projectId: "roger" }] },
    { id: "happliness", company: "Happliness (Movizer)", role: "CTO & cofondateur", period: "nov. 2021 → févr. 2023", summary: "", highlights: [
      "Direction technique et produit (cofondateur)",
      "App mobile React Native et back-end NestJS / GraphQL / PostgreSQL / Redis ; Firebase",
      "Landing web Next.js, infrastructure AWS",
    ], companyUrl: "https://www.linkedin.com/company/movizer/", appTags: [{ label: "Movizer", projectId: "movizer" }] },
    { id: "bam", company: "BAM · aujourd'hui Theodo Apps", role: "Mobile Engineer", period: "févr. 2020 → nov. 2021", summary: "", highlights: [
      "Ingénieur mobile React Native en régie chez plusieurs clients",
      "Konectom (Biogen) : lancement du produit de zéro au sein d'une grande équipe (4 mobile, 3 back, 2 data + PO/PM) ; développement d'un module natif Swift",
      "More Impact / Rift (Lita) : reprise du projet et développement de nouvelles fonctionnalités",
      "Ornikar : développement de fonctionnalités (mission courte)",
      "Jutheau-Husson : lancement et setup initial du projet mobile",
    ], companyUrl: "https://www.linkedin.com/company/theodo-apps/", appTags: [{ label: "Ornikar", projectId: "ornikar" }, { label: "Konectom", projectId: "konectom" }, { label: "More Impact / Rift", projectId: "rift" }, { label: "Jutheau-Husson", projectId: "jutheau-husson" }] },
    { id: "ung", company: "UNG (UTT Net Group)", role: "Développeur & Président", period: "2016 → 2019", summary: "", highlights: [
      "Applications mobiles développées de zéro : My UTT, Intégration UTT, Gala UTT (React Native)",
      "Ajout d'endpoints back-end (Laravel / PHP) et de front pour Intégration UTT",
      "Système d'affichage sur les TV de l'école pendant le Gala (2017)",
      "Président de l'association (2017 & 2019)",
    ], companyUrl: "https://uttnetgroup.fr/", appTags: [{ label: "Gala UTT", projectId: "gala-utt" }, { label: "Gala TV", projectId: "gala-tv" }, { label: "My UTT", projectId: "my-utt" }, { label: "Intégration UTT", projectId: "integration-utt" }] },
  ],
  stack: [
    { label: "Mobile", items: ["React Native", "Expo / EAS", "TypeScript", "Reanimated", "Skia", "Modules natifs", "React Query", "Stream Chat", "MMKV", "Detox", "i18n (react-intl / i18next)"] },
    { label: "Back", items: ["NestJS", "PostgreSQL", "Colyseus", "GraphQL", "Redis"] },
    { label: "Infra & Outils", items: ["AWS", "RevenueCat", "Sentry", "Firebase", "GitHub Actions", "Veriff & Yoti (KYC)"] },
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
