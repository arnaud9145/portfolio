# Portfolio / CV en ligne — Arnaud Dufour — Design

Date : 2026-07-30
Statut : validé (design), en attente de relecture

## 1. Objectif

Site vitrine personnel servant de CV en ligne, à envoyer en candidature spontanée
et à mettre en lien depuis LinkedIn / les mails d'approche.

Recherche ciblée : poste d'**ingénieur mobile senior, CDI, Paris**. Le site sert cet
objectif précis, pas un portfolio créatif générique.

### Audience (par priorité)

1. **CTO / lead tech** de petites boîtes parisiennes (15–50 personnes) — cible
   principale, souvent contactés en spontané. Lisent vite, cherchent une preuve
   technique concrète.
2. **Chasseurs de tête tech** (Urban Linker, Elinoï, Mobiskill, talent.io) — scannent
   en 30 s, veulent le stack et le niveau de séniorité.
3. **Recruteurs RH** — cherchent des mots-clés et une disponibilité.

Conséquence : l'info doit être lisible en moins d'une minute, sans scroll infini ni
animation qui retarde la lecture.

### Positionnement (3 arguments, dans cet ordre)

1. **Senior React Native** — spécialisation rare et profonde, pas un fullstack qui fait
   « aussi » du mobile.
2. **Ex-CTO & cofondateur** (Happliness / Movizer) — sait arbitrer, cadrer un produit,
   piloter des choix techniques. Justifie le niveau lead.
3. **AI-Native** — IA intégrée au workflow de dev quotidien, avec des gains mesurables.
   Argument différenciant.

Capable de lancer un projet de zéro comme de reprendre un existant. Ouvert au back
(NestJS / PostgreSQL) mais le mobile reste le cœur.

## 2. Décisions techniques

| Décision | Choix | Note |
|----------|-------|------|
| Framework | **Next.js** (App Router) + TypeScript | Choisi par Arnaud malgré la reco Astro du brief initial ; discipline JS/perf obligatoire (voir §7). |
| Style | **Tailwind CSS** | Sobre, cohérent, rapide. |
| i18n | **next-intl**, routes `/fr` et `/en` | FR + EN dès le lancement. |
| Email formulaire | **Resend** via route API Next.js | Pas de backend séparé. |
| Hébergement | **Vercel** + repo GitHub | Domaine perso à définir. |
| Machine de dev | **Ce Mac** (`/Users/arnaud/Documents/perso/portfolio-arnaud`) | La mention « Windows 10 » du brief est obsolète pour ce projet. |

## 3. Architecture du contenu

- Contenu dans des **fichiers TypeScript typés**, un par langue :
  `content/fr.ts`, `content/en.ts`, plus un type partagé `content/types.ts`.
- Avantages : édition facile, cohérence FR/EN garantie par le typage, pas de CMS.
- Source du contenu : brief d'Arnaud + CV PDF à jour (dossier Téléchargements) +
  code de Disorder (`~/Documents/Unlockt`) pour les détails techniques + apports
  d'Arnaud pour les chiffres.

## 4. Structure de la page

Single-page, ancres en navigation, scannable en < 1 min. Ordre :

1. **Hero** — Arnaud Dufour · *Senior React Native Engineer* · accroche
   « React Native depuis 2018 · Ex-CTO & cofondateur · AI-Native » ·
   **« Reims — 45 min de Paris Gare de l'Est »** · statut *En recherche — CDI ingénieur
   mobile senior, Paris* · CTAs (Télécharger le CV, Contact, LinkedIn, GitHub).
2. **En bref** — les 3 arguments (Senior RN / Ex-CTO / AI-Native), 3 blocs courts.
3. **Apps en production** — preuve technique, pas une section « projets créatifs ».
   Chaque app : nom, rôle, concept court, chiffres, **lien store ou lien vivant**.
   - Disorder (Behind The App) — https://apps.apple.com/us/app/disorder-talk-meet-repeat/id6738487787
   - Unlockt — https://apps.apple.com/us/app/unlockt-sell-your-files/id1632025425 *(à confirmer)*
   - Exposed (Behind The App) — https://apps.apple.com/us/app/exposed-whos-most-likely-to/id1553777064 *(à confirmer)*
   - Movizer (Happliness) — store retiré (14/02/2024) ; lien vivant :
     https://lespepitestech.com/startup-de-la-french-tech/movizer ; screens fournis par Arnaud.
4. **Expériences** — timeline, avec réalisations chiffrées :
   - Unlockt.me — Senior Mobile Engineer — sept. 2024 → aujourd'hui
   - Le Collectionist — Senior Mobile Engineer — mai → sept. 2024
   - Roger Senior — Mobile Engineer — févr. 2023 → avr. 2024
   - Happliness (Movizer) — CTO & cofondateur — nov. 2021 → févr. 2023
   - BAM — Mobile Engineer — févr. 2020 → nov. 2021 (clients : Ornikar, Biogen, Lita,
     Jutheau-Husson)
5. **Stack technique** — groupée : Mobile (React Native, Expo/EAS, TypeScript,
   Reanimated, Skia, modules natifs, React Query) · Back (NestJS, PostgreSQL) ·
   Infra & Outils (AWS, RevenueCat, Sentry, Firebase, GitHub Actions).
6. **Formation & débuts** — Université de Technologie de Troyes, 2020 : diplôme
   d'ingénieur réseaux & télécommunications (technologies mobiles et systèmes
   embarqués) + master sécurité des systèmes d'information. **Associatif — UNG
   (UTT Net Group)** : premiers sites et apps mobiles (~4 apps, 2–3 sites avant la fin
   des études) — appuie « React Native depuis 2018 » et le profil builder de longue date.
7. **Langues** — français natif · anglais C1 · espagnol B1.
8. **Contact** — formulaire (Resend) + email obfusqué anti-scraping + LinkedIn + GitHub.
9. **Footer**.

## 5. Formulaire de contact, PDF, vie privée

- Formulaire → route API Next.js → Resend. Champs : nom, email, message. Validation
  + protection anti-spam (honeypot au minimum).
- **Bouton Télécharger le CV** → CV à jour copié depuis le dossier Téléchargements
  vers `/public`. Le PDF **conserve le numéro de téléphone** : décision explicite
  d'Arnaud (CV déjà public depuis des années, obfuscation sans bénéfice réel).
- **Ne jamais publier** : adresse postale complète.
- Sur la **page HTML** : contact principal = formulaire + LinkedIn + email obfusqué.
  Numéro non affiché en HTML par défaut (il reste dans le PDF) — à ajouter si Arnaud
  le souhaite. LinkedIn et GitHub en liens directs.

## 6. Design / ton

- Direction : **sobre et moderne**, light + dark, une couleur d'accent, typo soignée.
- Ton : sobre et direct. Pas de superlatifs, pas de « passionné par la tech », pas de
  jargon marketing. Lecteur = pair technique : montrer plutôt que proclamer.

## 7. Contraintes non négociables (le site est lui-même une démo technique)

- **Lighthouse au vert** (Perf / A11y / Best Practices / SEO). Export statique,
  composants serveur, JS client minimal.
- **Zéro layout shift** (CLS ≈ 0), responsive impeccable, **mobile-first**.
- **Accessible** : contrastes AA, navigation clavier, attributs `alt`, HTML sémantique.
- **SEO** : `title`, meta description, **Open Graph** (image de partage LinkedIn),
  **JSON-LD `Person`**.

## 8. Règles de contenu (rédaction)

- Écrire « **React Native depuis 2018** », jamais « plus de 8 ans d'expérience ».
- **Chiffrer** les réalisations partout où c'est possible : volumétrie utilisateurs,
  crash-free rate, temps de démarrage, taille de bundle. Sans chiffre, « amélioration
  des performances » ne vaut rien.
- Toujours écrire « **Reims — 45 min de Paris Gare de l'Est** », jamais juste « Reims »
  (évite le filtre géographique des recruteurs parisiens).
- Chaque app pointe vers son store (ou un lien vivant + screens si retirée).
- **Ne rien inventer** : les chiffres et infos manquantes sont demandés à Arnaud.

## 9. À collecter auprès d'Arnaud (aucune invention)

- Confirmation des liens **Unlockt** et **Exposed**.
- **Screens de Movizer** (store retiré).
- **Chiffres par app / expérience** : utilisateurs, crash-free rate, temps de
  démarrage, taille de bundle, autres métriques.
- Détails **UNG** : noms des apps/sites, liens éventuels, période.
- CV PDF à jour (confirmer le fichier exact dans Téléchargements).
- Domaine perso souhaité.
- Handles : URL LinkedIn (arnaud-dufour), URL GitHub.

## 10. Analytics

- **Vercel Analytics** (léger, respectueux de la vie privée, sans cookie/bandeau).
  Objectif : mesurer les visites (utile en recherche d'emploi pour voir l'intérêt des
  recruteurs). Pas de tracking tiers intrusif.

## 11. Dépôt public — données sensibles

Le repo GitHub est **public**. Ne JAMAIS committer :

- prétentions / attentes salariales ;
- adresse postale complète ;
  (Le numéro de téléphone, lui, est assumé public — présent dans le CV PDF, cf. §5.)
- clé API Resend et tout secret → dans `.env.local` (**gitignoré**), configurés comme
  variables d'environnement sur Vercel ;
- toute métrique confidentielle qu'un employeur/client n'autoriserait pas à publier
  (vérifier avec Arnaud avant de chiffrer publiquement).

Un `.gitignore` correct dès l'init (`.env*`, `node_modules`, `.next`, etc.).

## 12. Hors périmètre (YAGNI)

- Pas de CMS, pas de blog, pas de section « projets créatifs » distincte.
- EN livré en même temps que FR ; pas de 3e langue.
