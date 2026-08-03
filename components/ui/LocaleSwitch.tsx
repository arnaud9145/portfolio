"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

/* Small inline SVG flags — reliable across platforms (flag emojis don't render
   on Windows). Shown for the target locale the button switches to. */
function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px]" aria-hidden>
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  );
}
function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className="h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px]" aria-hidden>
      <clipPath id="locale-gb-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <g clipPath="url(#locale-gb-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      aria-label={`Switch to ${other.toUpperCase()}`}
      className="locale-switch inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-sm uppercase"
    >
      {other === "en" ? <FlagGB /> : <FlagFR />}
      {other}
    </button>
  );
}
