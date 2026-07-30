export type Locale = "fr" | "en";

export interface AppItem {
  id: string;
  name: string;
  role: string;          // ex: "Senior Mobile Engineer"
  tagline: string;       // concept en une phrase
  metrics: string[];     // ex: ["50k utilisateurs", "crash-free 99.7%"] — vide si inconnu
  link?: { href: string; label: string }; // store ou lien vivant
  status?: string;       // ex: "Retirée du store (2024)"
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;        // ex: "sept. 2024 → aujourd'hui"
  summary: string;
  highlights: string[];  // réalisations chiffrées — vide si inconnu
  clients?: string[];
}

export interface StackGroup {
  label: string;         // ex: "Mobile"
  items: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  period: string;
  details?: string;
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
  experience: ExperienceItem[];
  stack: StackGroup[];
  education: EducationItem[];
  associative: EducationItem[]; // UNG
  languages: { name: string; level: string }[];
}
