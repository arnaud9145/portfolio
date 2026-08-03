import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CvContent } from "@/content";
import { Link } from "@/i18n/navigation";
import { RevealPhone } from "@/components/ui/RevealPhone";
import { Reveal } from "@/components/ui/Reveal";

export function Hero({ content }: { content: CvContent }) {
  const t = useTranslations("actions");
  const otw = useTranslations("openToWork");
  const { hero } = content;

  return (
    <header id="top" className="relative overflow-hidden">
      <div className="hero-glow" aria-hidden />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-16 md:min-h-[calc(100svh-4rem)] md:grid-cols-[1.05fr_.95fr] md:gap-16 md:pb-16">
        {/* Text column — readable immediately, staggered entrance only */}
        <div className="relative z-10 min-w-0 max-w-xl">
          <span className="badge anim-rise" style={{ animationDelay: "60ms" }}>
            <span className="dot" aria-hidden />
            {otw("title")}
          </span>

          <h1
            className="anim-rise mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-fg"
            style={{ animationDelay: "140ms" }}
          >
            {hero.name}
          </h1>

          <div className="filet anim-rise mt-6" style={{ animationDelay: "200ms" }} aria-hidden />

          <p
            className="anim-rise mt-5 text-lg font-medium text-gold-hi"
            style={{ animationDelay: "260ms" }}
          >
            {hero.title}
          </p>
          <p className="anim-rise mt-3 text-base text-muted" style={{ animationDelay: "320ms" }}>
            {hero.tagline}
          </p>
          <p
            className="anim-rise mt-3 flex items-center gap-2 text-sm text-muted"
            style={{ animationDelay: "360ms" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gold"
              aria-hidden
            >
              <path d="M12 21s-7-6.4-7-11a7 7 0 0 1 14 0c0 4.6-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {hero.location}
          </p>

          <div
            className="anim-rise mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "440ms" }}
          >
            <a href="/cv-arnaud-dufour.pdf" download className="btn btn-gold">
              {t("downloadCv")}
            </a>
            <Link href="/contact" className="btn btn-outline">
              Contact
            </Link>
            <RevealPhone />
          </div>
        </div>

        {/* Portrait column — chiaroscuro treatment, revealed on mount */}
        <Reveal className="anim-portrait relative mx-auto w-full max-w-sm md:max-w-md">
          <div className="portrait-glow glow-pulse" aria-hidden />
          <div className="portrait-frame">
            <Image
              src="/portrait-arnaud.jpg"
              alt="Arnaud Dufour en costume et nœud papillon, portrait en clair-obscur sur fond sombre"
              width={1100}
              height={1175}
              sizes="(max-width: 768px) 90vw, 40vw"
              priority
              className="h-auto w-full"
            />
            <div className="portrait-tint" aria-hidden />
            <div className="portrait-vignette" aria-hidden />
          </div>
        </Reveal>
      </div>
    </header>
  );
}
