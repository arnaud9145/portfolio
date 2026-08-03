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
    { title: "Senior React Native", body: "Spécialisation mobile profonde depuis 2018 : pas un fullstack qui sait faire du mobile, mais un mobile qui sait être fullstack." },
    { title: "Ex-CTO & cofondateur", body: "Happliness / Movizer : arbitrage produit, cadrage, pilotage des choix techniques." },
    { title: "AI-Native", body: "IA intégrée au workflow de dev quotidien, avec des gains mesurables." },
  ],
  apps: [
    { id: "disorder", name: "Disorder", role: "Mobile Engineer", tagline: "App sociale : chaque semaine, des group chats avec des inconnus de votre zone (groupes mixtes 50/50).", metrics: [], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" } },
    { id: "unlockt", name: "Unlockt", role: "Senior Mobile Engineer", tagline: "Vente de fichiers par des créateurs.", metrics: [], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" } },
    { id: "exposed", name: "Exposed", role: "Mobile Engineer", tagline: "Party game « Who's Most Likely To » (5000+ défis, 4 modes).", metrics: [], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" } },
    { id: "movizer", name: "Movizer", role: "CTO & cofondateur", tagline: "Recommandations personnalisées de films & séries, partage entre amis.", metrics: [], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Retirée de l'App Store (2024)" },
  ],
  // Catalogue complet — consommé par /projets. Ids stables (kebab-case).
  projects: [
    { id: "unlockt", name: "Unlockt", period: "2025 → aujourd'hui", experienceId: "unlockt", context: "Unlockt", role: "Senior Mobile Engineer", contribution: "major", tagline: "Vente de fichiers par des créateurs.", description: "Réécriture complète de l'app (produit existant) : code neuf, nouveau design, nouvelles fonctionnalités. Plateforme de vente de fichiers par des créateurs. Intégration de la vérification d'identité (Veriff & Yoti), Firebase et Sentry.", metrics: ["1,2 M d'utilisateurs actifs"], tech: ["React Native", "Expo", "TypeScript", "React Query", "Reanimated", "Shared Element", "Veriff", "Yoti", "Firebase", "Sentry", "Amplitude", "Lottie", "Claude Code"], link: { href: "https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425", label: "App Store" }, screenshots: [
      { src: "/projects/unlockt/unlockt-1.jpg", alt: "Unlockt — écran d'envoi de fichier (définir un prix, générer le lien)", width: 820, height: 1777 },
      { src: "/projects/unlockt/unlockt-2.jpg", alt: "Unlockt — détail d'un lien (médias, prix, ventes, gains)", width: 820, height: 1782 },
      { src: "/projects/unlockt/unlockt-3.jpg", alt: "Unlockt — portefeuille (solde, retraits, opérations)", width: 820, height: 1782 },
    ] },
    { id: "exposed", name: "Exposed", period: "janv. → juin 2026", experienceId: "unlockt", context: "Behind The App · groupe Dashi", role: "Mobile Engineer", contribution: "major", tagline: "Jeu de soirée « Who's Most Likely To » (5000+ défis, 4 modes).", description: "Jeu de soirée multijoueur (« Who's Most Likely To » et autres modes) : chacun rejoint la partie depuis son téléphone et répond aux questions, souvent en anonyme — du fun au plus osé. J'ai refait l'app de zéro et développé le back temps réel (Colyseus). Vakarm en France, Exposed à l'international.", metrics: ["~500k utilisateurs/mois"], tech: ["React Native", "Expo", "TypeScript", "Reanimated", "Colyseus (temps réel)", "RevenueCat", "Firebase", "SVG", "Claude Code"], link: { href: "https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064", label: "App Store" }, screenshots: [
      { src: "/projects/exposed/exposed-1.jpg", alt: "Exposed — lobby d'une partie (game pin, joueurs)", width: 820, height: 1782 },
      { src: "/projects/exposed/exposed-2.jpg", alt: "Exposed — manche de vote avec résultats en direct", width: 820, height: 1781 },
    ] },
    { id: "disorder", name: "Disorder", period: "sept. 2024 → janv. 2025", experienceId: "unlockt", context: "Behind The App · groupe Dashi", role: "Mobile Engineer", contribution: "major", tagline: "App sociale : chaque semaine, des group chats avec des inconnus de votre zone (groupes mixtes 50/50).", description: "Réseau social où, chaque semaine, on rejoint des group chats avec des inconnus de sa zone (groupes mixtes 50/50). J'ai développé tout le front (Skia, Reanimated, Stream Chat) et la monétisation RevenueCat.", metrics: [], tech: ["React Native", "TypeScript", "Skia", "Reanimated", "Stream Chat", "React Query", "MMKV", "RevenueCat", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787", label: "App Store" }, screenshots: [
      { src: "/projects/disorder/disorder-1.jpg", alt: "Capture de l'app Disorder (1/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-2.jpg", alt: "Capture de l'app Disorder (2/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-3.jpg", alt: "Capture de l'app Disorder (3/4)", width: 820, height: 1775 },
      { src: "/projects/disorder/disorder-4.jpg", alt: "Capture de l'app Disorder (4/4)", width: 820, height: 1775 },
    ] },
    { id: "portfolio", name: "Portfolio", period: "2026", context: "Projet personnel · 2026", role: "Design & développement", contribution: "lead", badge: "Projet personnel", tagline: "Ce site même — pensé comme une démonstration technique (Lighthouse au vert, accessible, SEO soigné, bilingue), réalisé quasi à 100 % avec Claude (Claude Code).", metrics: [], tech: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "next-intl", "Vercel", "Vitest", "Claude Code"], repo: { href: "https://github.com/arnaud9145/portfolio", label: "Code (GitHub)" }, screenshots: [{ src: "/projects/portfolio/portfolio-1.jpg", alt: "Portfolio — page d'accueil (hero)", width: 1600, height: 1000 }] },
    { id: "le-collectionist", name: "Le Collectionist", period: "mai → sept. 2024", experienceId: "le-collectionist", context: "Le Collectionist", role: "Senior Mobile Engineer", contribution: "minor", tagline: "Location de villas et maisons d'exception.", description: "App mobile React Native de la location de villas et maisons d'exception. Au sein de la squad Contrats, Paiement & Facturation : fonctionnalités critiques du parcours client et évolutions liées aux paiements. (Mission courte.)", metrics: [], tech: ["React Native", "Expo", "TypeScript", "GraphQL (Apollo)", "Redux Toolkit", "Stripe", "Mapbox", "Algolia", "Firebase", "Sentry"], link: { href: "https://apps.apple.com/fr/app/le-collectionist/id1630324684", label: "App Store" }, screenshots: [
      { src: "/projects/le-collectionist/le-collectionist-1.jpg", alt: "Le Collectionist — écran de détail d'une villa (1)", width: 820, height: 1775 },
      { src: "/projects/le-collectionist/le-collectionist-2.jpg", alt: "Le Collectionist — écran de recherche et réservation (2)", width: 820, height: 1775 },
      { src: "/projects/le-collectionist/le-collectionist-3.jpg", alt: "Le Collectionist — écran de détail du séjour (3)", width: 820, height: 1775 },
    ] },
    { id: "kroptek", name: "Kroptek", period: "depuis 2022", experienceId: "freelance", context: "Freelance", role: "Développeur freelance", contribution: "lead", badge: "Projet solo", tagline: "Automatisation de rapports d'impact mensuels pour les clients de Kroptek.", description: "Outil qui génère chaque mois des PDF de rapport (marc de café collecté, impact écologique) à partir des données saisies, puis les envoie automatiquement par email aux clients de Kroptek. Mission freelance depuis septembre 2022, avec un rebranding récent des rapports.", metrics: [], tech: ["Next.js", "TypeScript", "TypeORM", "PostgreSQL", "Nodemailer", "Puppeteer (PDF)", "Chart.js", "Heroku"], screenshotNote: "Exemple de rapport mensuel (sans données réelles).", status: "En service", screenshots: [{ src: "/projects/kroptek/kroptek-report.jpg", alt: "Kroptek — exemple de rapport mensuel d'impact (sans données)", width: 2000, height: 1125 }] },
    { id: "roger", name: "Roger", period: "2023–2024", experienceId: "roger", context: "Roger", role: "Senior Mobile Engineer", contribution: "major", screenshotNote: "Captures issues des stores.", tagline: "Le « Slack français » : communication et collaboration d'entreprise.", description: "Application mobile développée de zéro en React Native (communication et collaboration d'entreprise), avec des contributions ponctuelles au front web. CI/CD et monitoring : Fastlane, AppCenter, Firebase, Sentry.", metrics: [], tech: ["React Native", "Expo", "TypeScript", "Sentry", "AppCenter", "Fastlane"], status: "Retirée de l'App Store (2024)" },
    { id: "movizer", name: "Movizer", period: "2021–2023", experienceId: "happliness", context: "Happliness", role: "CTO & cofondateur", contribution: "lead", tagline: "Recommandations personnalisées de films & séries, partage entre amis.", description: "Cofondateur & CTO : app React Native de recommandations de films et séries et de partage entre amis. Back NestJS/GraphQL/PostgreSQL/Redis, landing Next.js, infra AWS. Direction technique et produit.", metrics: [], tech: ["React Native", "TypeScript", "NestJS", "GraphQL", "PostgreSQL", "Redis", "TypeORM", "ForestAdmin", "Firebase", "AWS S3", "Next.js (landing)"], link: { href: "https://lespepitestech.com/startup-de-la-french-tech/movizer", label: "Les Pépites Tech" }, status: "Retirée de l'App Store (2024)", screenshots: [
      { src: "/projects/movizer/movizer-1.png", alt: "Movizer — écran de détail d'un film (Dune) avec la recommandation d'un ami", width: 700, height: 806 },
      { src: "/projects/movizer/movizer-2.png", alt: "Movizer — écran des discussions entre amis autour d'un film", width: 700, height: 1402 },
      { src: "/projects/movizer/movizer-3.png", alt: "Movizer — écran de recherche : sélections de films et séries à découvrir", width: 700, height: 1396 },
    ] },
    { id: "flute", name: "La Flute", period: "depuis 2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", tagline: "Site de la soirée étudiante La Flûte.", description: "Que je fais évoluer chaque année : gestion de plusieurs événements par an, inscriptions et collecte des infos d'organisation, paiements via HelloAsso, et des mini-jeux pour les participants.", metrics: [], tech: ["React", "MUI", "Apollo / GraphQL", "NestJS", "TypeORM", "HelloAsso"], link: { href: "https://flute3.sale", label: "flute3.sale" }, screenshots: [
      { src: "/projects/flute/flute-1.jpg", alt: "La Flute — back-office de gestion des événements (participants, chambres, paiements)", width: 1200, height: 691 },
    ] },
    { id: "ornikar", name: "Ornikar", period: "2021", experienceId: "bam", context: "BAM", role: "Mobile Engineer", contribution: "minor", tagline: "Application pour les moniteurs d'auto-école (Ornikar Enseignants) : planning des leçons et suivi des élèves.", description: "Développement de fonctionnalités pour l'app des moniteurs (Ornikar Enseignants) : planning des leçons et suivi des élèves. Mission courte.", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/ornikar-enseignants/id1385539158", label: "App Store" }, screenshots: [
      { src: "/projects/ornikar/ornikar-1.jpg", alt: "Ornikar Enseignants — planning des leçons (1)", width: 820, height: 1775 },
      { src: "/projects/ornikar/ornikar-2.jpg", alt: "Ornikar Enseignants — mise à jour des disponibilités (2)", width: 820, height: 1775 },
      { src: "/projects/ornikar/ornikar-3.jpg", alt: "Ornikar Enseignants — suivi pédagogique de l'élève (3)", width: 820, height: 1775 },
    ] },
    { id: "jutheau-husson", name: "Jutheau-Husson", period: "2020", experienceId: "bam", context: "BAM", role: "Mobile Engineer", contribution: "major", tagline: "Application mobile pour un leader monégasque du courtage en assurances — moderniser la relation client.", description: "Lancement et setup initial de l'app mobile d'un leader monégasque du courtage en assurances, pour moderniser la relation client. (Via BAM.)", metrics: [], tech: ["React Native", "TypeScript"], screenshots: [
      { src: "/projects/jutheau-husson/jutheau-1.jpg", alt: "Jutheau-Husson — écran de l'app assurance (1)", width: 460, height: 997 },
      { src: "/projects/jutheau-husson/jutheau-2.jpg", alt: "Jutheau-Husson — écran de l'app assurance (2)", width: 460, height: 997 },
      { src: "/projects/jutheau-husson/jutheau-3.jpg", alt: "Jutheau-Husson — écran de l'app assurance (3)", width: 460, height: 997 },
    ] },
    { id: "konectom", name: "Konectom", period: "2020–2021", experienceId: "bam", context: "BAM — client Biogen", role: "Mobile Engineer", contribution: "major", tagline: "Auto-évaluation clinique (Biogen) : mesure des fonctions motrices et cognitives.", description: "Lancement du produit de zéro pour Biogen (via BAM), au sein d'une grande équipe (4 mobile, 3 back, 2 data + PO/PM). Application clinique d'auto-évaluation des fonctions motrices et cognitives ; développement d'un module natif en Swift.", metrics: [], tech: ["React Native", "TypeScript", "Modules natifs"], screenshots: [
      { src: "/projects/konectom/konectom-1.jpg", alt: "Konectom — auto-évaluation clinique (écran 1)", width: 820, height: 1455 },
      { src: "/projects/konectom/konectom-2.jpg", alt: "Konectom — auto-évaluation clinique (écran 2)", width: 820, height: 1455 },
      { src: "/projects/konectom/konectom-3.jpg", alt: "Konectom — auto-évaluation clinique (écran 3)", width: 820, height: 1455 },
    ] },
    { id: "rift", name: "More Impact / Rift", period: "2021", experienceId: "bam", context: "Lita", role: "Mobile Engineer", contribution: "minor", tagline: "Le Yuka de la finance : scannez l'impact de votre épargne. Produit de Lita, anciennement « More Impact ».", description: "Reprise du projet et développement de nouvelles fonctionnalités. Le « Yuka de la finance » : scanne l'impact de ton épargne. Produit de Lita (anciennement More Impact).", metrics: [], tech: ["React Native", "TypeScript"], link: { href: "https://apps.apple.com/fr/app/rift/id1494745935", label: "App Store" }, screenshots: [
      { src: "/projects/rift/rift-1.jpg", alt: "Rift — composition de l'épargne (1)", width: 148, height: 303 },
      { src: "/projects/rift/rift-2.jpg", alt: "Rift — impact environnemental de l'épargne (2)", width: 148, height: 303 },
      { src: "/projects/rift/rift-3.jpg", alt: "Rift — produits d'épargne éthiques (3)", width: 148, height: 303 },
    ] },
    { id: "my-utt", name: "My UTT", period: "2020", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", tagline: "Application de la vie étudiante de l'UTT.", description: "Ma première application React Native, développée de zéro : l'app de la vie étudiante de l'UTT. Ajout d'endpoints back en Laravel/PHP (et Symfony côté site étu).", metrics: [], tech: ["React Native", "Expo", "Laravel / PHP", "Symfony", "i18n"], repo: { href: "https://github.com/ungdev/etuutt-mobile", label: "App (GitHub)" }, screenshots: [
      { src: "/projects/my-utt/my-utt-1.jpg", alt: "My UTT — écran d'accueil (1)", width: 820, height: 1775 },
      { src: "/projects/my-utt/my-utt-2.jpg", alt: "My UTT — écran des services de la vie étudiante (2)", width: 820, height: 1775 },
      { src: "/projects/my-utt/my-utt-3.jpg", alt: "My UTT — écran de profil étudiant (3)", width: 820, height: 1775 },
    ] },
    { id: "etuutt", name: "EtuUTT", web: true, period: "2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", tagline: "Le site étudiant de l'UTT — les outils du quotidien, version web.", description: "Version web du portail étudiant (complément de l'app My UTT). Côté back Symfony, j'ai développé une grande partie de l'API : emplois du temps et comparaison de cours, UEs (import et parsing des données), événements, badges, notifications push, authentification. J'ai aussi initialisé la réécriture moderne du front (React / Next, TypeScript).", metrics: [], tech: ["PHP", "Symfony", "TypeScript", "React"], link: { href: "https://etu.utt.fr", label: "etu.utt.fr" }, repo: { href: "https://github.com/ungdev/EtuUTT", label: "Back (GitHub)" }, repoBack: { href: "https://github.com/ungdev/etuutt-front", label: "Front (GitHub)" } },
    { id: "integration-utt", name: "Intégration UTT", period: "2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", tagline: "Application d'intégration des nouveaux étudiants de l'UTT.", description: "App d'intégration des nouveaux étudiants. Elle existait en Ionic avant mon arrivée ; je l'ai entièrement refaite de zéro en React Native, avec ajout d'endpoints back (Laravel/PHP) et de front.", metrics: [], tech: ["React Native", "Laravel / PHP"], repo: { href: "https://github.com/ungdev/integration-mobile", label: "App RN (GitHub)" }, repoBack: { href: "https://github.com/ungdev/integration-UTT", label: "Site (GitHub)" }, screenshots: [
      { src: "/projects/integration-utt/integration-utt-1.jpg", alt: "Intégration UTT — écran d'accueil de l'onboarding (1)", width: 820, height: 1777 },
      { src: "/projects/integration-utt/integration-utt-2.jpg", alt: "Intégration UTT — écran de découverte du campus (2)", width: 820, height: 1777 },
      { src: "/projects/integration-utt/integration-utt-3.jpg", alt: "Intégration UTT — écran de checklist du nouvel étudiant (3)", width: 820, height: 1777 },
    ] },
    { id: "uttarena-app", name: "UTT Arena — Intranet", period: "2018", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", legacy: true, tagline: "Intranet de l'UTT Arena : infos tournois pour les joueurs et gestion de l'événement pour le staff. Intégré au portail captif du réseau — correspondance place ↔ IP ↔ utilisateur ↔ MAC, IPs communiquées en temps réel.", description: "Intranet du tournoi esport UTT Arena, en lien avec l'équipe réseau : le portail captif exigeait une connexion à l'intranet ; je communiquais en temps réel la correspondance place ⇄ IP ⇄ utilisateur ⇄ MAC.", metrics: ["450 joueurs gérés (édition 2018)"], tech: ["React", "Ant Design", "Chart.js", "OpenID Connect", "Node.js"], repo: { href: "https://github.com/ungdev/UA-appli", label: "App (GitHub)" }, repoBack: { href: "https://github.com/ungdev/UA-api-old", label: "API (GitHub)" }, status: "Hors ligne", screenshots: [
      { src: "/projects/uttarena-app/uttarena-app-1.jpg", alt: "UTT Arena — intranet (accueil : tournois, partenaires)", width: 1200, height: 799 },
    ] },
    { id: "utt-arena", name: "UTT Arena", period: "2018", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur & Président", contribution: "major", legacy: true, tagline: "Site de la plus grande LAN e-sport du Grand Est — président de l'UTT Arena en 2018, site réalisé la même année.", description: "Le site de l'UTT Arena 2018 (tournoi esport) : ~450 joueurs et de nombreux visiteurs. Un de mes tout premiers projets web (React / Redux).", metrics: ["450 joueurs + visiteurs (édition 2018)"], tech: ["React", "Redux", "Node.js"], link: { href: "https://arena.utt.fr", label: "arena.utt.fr" }, repo: { href: "https://github.com/ungdev/UA-front-old", label: "Site (GitHub)" }, repoBack: { href: "https://github.com/ungdev/UA-api-old", label: "API (GitHub)" }, screenshots: [
      { src: "/projects/utt-arena/utt-arena-1.jpg", alt: "UTT Arena — site de la compétition e-sport", width: 1200, height: 750 },
    ] },
    { id: "billetterie-bde", name: "Billetterie BDE", period: "2018", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", tagline: "Billetterie des événements du BDE de l'UTT.", description: "Sur le principe de l'app Gala, mais pour les événements du BDE tout au long de l'année (ex. la remise des diplômes R2D) : billetterie, infos, billets et carte. Peu utilisée en pratique.", metrics: [], tech: ["Ionic", "Angular", "Cordova", "TypeScript", "OneSignal"], repo: { href: "https://github.com/ungdev/billetterie-bde-mobile", label: "Code (GitHub)" }, screenshots: [{ src: "/projects/billetterie-bde/bde-1.png", alt: "Billetterie BDE — accueil, compte à rebours de l'événement R2D", width: 1242, height: 2208 }, { src: "/projects/billetterie-bde/bde-2.png", alt: "Billetterie BDE — écran de l'application", width: 1242, height: 2208 }, { src: "/projects/billetterie-bde/bde-3.png", alt: "Billetterie BDE — écran de l'application", width: 1242, height: 2208 }] },
    { id: "gala-tv", name: "Gala UTT — Affichage TV", period: "2019–2020", experienceId: "ung", context: "UNG — UTT Net Group (2017)", role: "Développeur étudiant", contribution: "major", legacy: true, tagline: "Affichage dynamique : infos et animations diffusées sur les TV de l'école pendant le gala.", description: "Affichage dynamique diffusé sur les écrans de l'école via Xibo. Contrainte mémorable : le rendu devait être impeccable sur Internet Explorer — un vrai calvaire.", metrics: [], tech: ["React", "Node"], repo: { href: "https://github.com/ungdev/gala-tv-front", label: "Front (GitHub)" }, repoBack: { href: "https://github.com/ungdev/TVGala_Server", label: "Server (GitHub)" }, screenshots: [
      { src: "/projects/gala-tv/gala-tv-1.jpg", alt: "Gala UTT — affichage diffusé sur les écrans de l'école", width: 1100, height: 618 },
    ] },
    { id: "gala-utt", name: "Gala UTT", period: "2018–2019", experienceId: "ung", context: "UNG — UTT Net Group", role: "Développeur étudiant", contribution: "major", screenshotNote: "Aucune capture de l'app disponible — voici l'affiche du Gala.", tagline: "Le compagnon de soirée du Gala de l'UTT : programmation en temps réel, carte interactive et notifications.", description: "Projet que j'ai lancé de zéro — d'abord en Ionic, puis entièrement refait en React Native. Pas une billetterie : un vrai compagnon de soirée, avec la programmation en temps réel, une carte interactive personnalisée avec géolocalisation, et des notifications avant chaque temps fort de la soirée.", metrics: [], tech: ["React Native", "Ionic 3", "Angular"], repo: { href: "https://github.com/ungdev/Gala-Mobile", label: "App (GitHub)" }, repoBack: { href: "https://github.com/ungdev/gala-api", label: "API (GitHub)" }, status: "Retirée de l'App Store (2020)", screenshots: [{ src: "/projects/gala-utt/gala-utt-2019.jpg", alt: "Gala UTT — affiche de l'édition 2019", width: 618, height: 914 }] },  ],
  experience: [
    { id: "unlockt", company: "Unlockt", role: "Senior Mobile Engineer", period: "sept. 2024 → aujourd'hui", summary: "Ingénieur mobile senior au sein du groupe Dashi (Unlockt & Behind The App), sur plusieurs applications grand public.", highlights: [
      "Unlockt : réécriture complète de l'app de zéro (nouveau code, sur un produit existant) — nouveau design et nouvelles fonctionnalités (React Native, ~1,2 M utilisateurs actifs) ; intégration Veriff & Yoti (vérification d'identité)",
      "Disorder : développement de tout le front (Skia, Reanimated, Stream Chat) ; monétisation RevenueCat",
      "Exposed / Vakarm : refonte de l'app de zéro et développement du back (Colyseus, temps réel) ; RevenueCat",
      "Firebase & Sentry sur l'ensemble des apps",
      "IA au cœur du workflow : Codex puis Claude (Claude Code) intégrés progressivement à ma pratique quotidienne, au point de ne plus pouvoir m'en passer aujourd'hui.",
    ], companyUrl: "https://www.linkedin.com/company/unlockt/" },
    { id: "le-collectionist", company: "Le Collectionist", role: "Senior Mobile Engineer", period: "mai → sept. 2024", summary: "", highlights: ["Développement de l'application mobile React Native", "Squad Contrats, Paiement & Facturation : fonctionnalités critiques du parcours client et évolutions liées aux paiements"], companyUrl: "https://www.linkedin.com/company/le-collectionist/" },
    { id: "roger", company: "Roger", role: "Senior Mobile Engineer", period: "févr. 2023 → avr. 2024", summary: "", highlights: [
      "App mobile développée de zéro en React Native",
      "Contributions au front web selon les besoins",
      "CI/CD & monitoring : Fastlane, AppCenter, Firebase, Sentry",
    ], companyUrl: "https://www.linkedin.com/company/get-roger/" },
    { id: "freelance", company: "Freelance", role: "Missions ponctuelles", companyUrl: "https://www.linkedin.com/company/kroptek/", period: "depuis 2022", tag: "Freelance · en parallèle", summary: "Développement freelance très ponctuel, en parallèle de mes postes salariés.", highlights: [
      "Kroptek : outil d'automatisation de rapports d'impact mensuels — génération des PDF (Puppeteer) et envoi automatique par email (Nodemailer). Stack Next.js / TypeORM / PostgreSQL, hébergé sur Heroku ; rebranding récent.",
    ] },
    { id: "happliness", company: "Happliness", role: "CTO & cofondateur", period: "nov. 2021 → févr. 2023", summary: "", highlights: [
      "Direction technique et produit (cofondateur)",
      "App mobile React Native et back-end NestJS / GraphQL / PostgreSQL / Redis ; Firebase",
      "Landing web Next.js, infrastructure AWS",
    ], companyUrl: "https://www.linkedin.com/company/movizer/" },
    { id: "bam", company: "BAM (aujourd'hui Theodo Apps)", role: "Mobile Engineer", period: "févr. 2020 → nov. 2021", summary: "", highlights: [
      "Ingénieur mobile React Native pour plusieurs clients — en interne chez BAM, en régie uniquement chez Ornikar.",
      "Konectom (Biogen) : lancement du produit de zéro au sein d'une grande équipe (4 mobile, 3 back, 2 data + PO/PM) ; développement d'un module natif Swift",
      "More Impact / Rift (Lita) : reprise du projet et développement de nouvelles fonctionnalités",
      "Ornikar : développement de fonctionnalités (mission courte)",
      "Jutheau-Husson : lancement et setup initial du projet mobile",
    ], companyUrl: "https://www.linkedin.com/company/theodo-apps/" },
    { id: "ung", company: "UTT Net Group", role: "Vice-Président & Président", period: "2016 → 2019", summary: "L'association étudiante du numérique de l'UTT.", tag: "Associatif · pendant les études", highlights: [
      "Plusieurs mandats associatifs entre 2016 et 2019 : Vice-Président puis Président de l'UNG, et Président de l'UTT Arena.",
      "Organisation d'événements étudiants d'envergure — l'UTT Arena (tournoi esport, ~450 joueurs et de nombreux visiteurs) et le Gala de l'UTT.",
      "Recrutement, formation et cohésion des équipes ; planification et coordination.",
      "Conception d'applications et de sites pour l'association (détails dans les projets).",
    ], companyUrl: "https://uttnetgroup.fr/" },
  ],
  education: [
    { title: "Diplôme d'ingénieur SRT — Systèmes Réseaux et Télécommunications", org: "Université de Technologie de Troyes", orgUrl: "https://www.utt.fr/", period: "2020", details: "Spécialité TMSE — Technologie Mobile et Système Embarqué." },
    { title: "Master Sécurité des Systèmes d'Information", org: "Université de Technologie de Troyes", orgUrl: "https://www.utt.fr/", period: "2020" },
  ],
  languages: [
    { name: "Français", level: "Natif", flag: "🇫🇷" },
    { name: "Anglais", level: "C1", flag: "🇬🇧" },
    { name: "Espagnol", level: "B1", flag: "🇪🇸" },
  ],
  interests: [
    { icon: "🏋️", label: "Sport", note: "1 à 3 séances par semaine en salle (majoritairement Slowe), bootcamp ou hyrox. ~20 kg perdus (de 125 à 105), objectif 20 de plus !" },
    { icon: "🧱", label: "LEGO", note: "J'ai encore les Harry Potter de mon enfance ; aujourd'hui je me focalise sur Star Wars et Marvel. Mon préféré : le Venator UCS. Je cherche aussi à collectionner les figurines Marvel." },
    { icon: "✈️", label: "Voyages", note: "Le plus marquant : six mois à Shanghai pendant mes études — dont une nuit à camper sur la Grande Muraille. Plus récemment, Alicante en Espagne." },
    { icon: "🚗", label: "Voitures", note: "Passionné d'autos : j'achète et je revends au gré des envies — j'en suis à ma deuxième Audi TT (une quattro V6 3.2 atmo grise). J'adore conduire, et j'ai même roulé sur circuit (en TT RS)." },
    { icon: "🎧", label: "Musique (DJ)", note: "Surtout des soirées étudiantes et quelques bars. Je touche à tout, avec un faible pour le commercial/pop, le big room et la hardstyle." },
    { icon: "🐱", label: "Chats", note: "Lucy, ma boule de poils toute noire (2021), très câline — j'ai même pris un appart en RDC pour qu'elle sorte dans la résidence." },
  ],
};
