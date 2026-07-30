import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { RevealPhone } from "@/components/ui/RevealPhone";
import { LocaleSwitch } from "@/components/ui/LocaleSwitch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Hero({ content }: { content: CvContent }) {
  const t = useTranslations("actions");
  const { hero } = content;
  return (
    <header className="mx-auto max-w-3xl px-6 pt-10 pb-14">
      <div className="mb-10 flex items-center justify-end gap-2">
        <LocaleSwitch />
        <ThemeToggle />
      </div>
      <p className="text-sm font-medium text-accent">{hero.availability}</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{hero.name}</h1>
      <p className="mt-2 text-xl text-fg">{hero.title}</p>
      <p className="mt-4 text-muted">{hero.tagline}</p>
      <p className="mt-2 text-muted">{hero.location}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="/cv-arnaud-dufour.pdf"
          download
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
        >
          {t("downloadCv")}
        </a>
        <a href="#contact" className="rounded-md border border-border px-4 py-2 text-sm font-medium">
          Contact
        </a>
        <RevealPhone />
      </div>
    </header>
  );
}
