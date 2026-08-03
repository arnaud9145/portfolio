export type Locale = "fr" | "en";

/** Poids de la contribution d'Arnaud sur un projet — pilote l'emphase visuelle. */
export type Contribution = "lead" | "major" | "minor";

export interface AppItem {
  id: string;
  name: string;
  role: string;          // ex: "Senior Mobile Engineer"
  tagline: string;       // concept en une phrase
  metrics: string[];     // ex: ["50k utilisateurs", "crash-free 99.7%"] — vide si inconnu
  link?: { href: string; label: string }; // store ou lien vivant
  status?: string;       // ex: "Retirée du store (2024)"
}

/** Capture d'écran réelle d'un projet — dimensions intrinsèques fournies pour éviter le CLS. */
export interface ProjectScreenshot {
  src: string;    // chemin public, ex: "/projects/movizer/movizer-1.png"
  alt: string;    // texte alternatif descriptif, localisé
  width: number;  // largeur intrinsèque du fichier (px)
  height: number; // hauteur intrinsèque du fichier (px)
}

/** Projet unique — consommé par la page dédiée /projets. Id stable en kebab-case. */
export interface ProjectItem {
  id: string;
  name: string;
  context?: string;              // entreprise / via qui
  role?: string;
  contribution: Contribution;
  experienceId?: string;         // expérience liée — SOURCE UNIQUE des tags & liens projet↔expérience
  period?: string;               // année(s) du projet, ex. "2024" ou "2018–2019"
  badge?: string;                // libellé de badge personnalisé (prioritaire sur contribution)
  tagline: string;
  description?: string;          // paragraphe localisé, plus riche que tagline
  legacy?: boolean;              // projet ancien — affiche la note générique « captures d'époque »
  screenshotNote?: string;       // note localisée dédiée sous le visuel (prioritaire sur legacy)
  metrics: string[];             // vide si inconnu
  tech?: string[];               // stack technique — réelle si connue, minimale sinon
  link?: { href: string; label: string };
  repo?: { href: string; label: string }; // dépôt source public (GitHub, etc.)
  repoBack?: { href: string; label: string }; // second dépôt (API/back associée au front)
  status?: string;
  screenshots?: ProjectScreenshot[]; // captures réelles — sinon mockup placeholder générique
}

/** Tag d'app affiché sous une expérience → lien vers /projets#<projectId>. */
export interface AppTag {
  label: string;
  projectId: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;        // ex: "sept. 2024 → aujourd'hui"
  summary: string;
  tag?: string;          // petit libellé localisé (ex. contexte associatif) — pastille discrète
  highlights: string[];  // missions détaillées (dépliées dans l'accordéon) — vide si non renseigné
  companyUrl?: string;   // page LinkedIn entreprise — "#" placeholder
  // NB : les apps liées ne sont PAS listées ici — elles sont dérivées des projets
  // (project.experienceId === this.id) via experienceApps(). Source unique.
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  details?: string;
}

/** Centre d'intérêt — pastille emoji + libellé localisé, précision optionnelle. */
export interface InterestItem {
  icon: string;   // emoji
  label: string;  // libellé localisé
  note?: string;  // courte précision localisée (optionnelle)
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
  projects: ProjectItem[]; // catalogue complet — page /projets
  experience: ExperienceItem[];
  // La stack technique est dérivée des projets (voir derivedStack) — pas un champ.
  education: EducationItem[];
  languages: { name: string; level: string; flag: string }[];
  interests: InterestItem[];
}
