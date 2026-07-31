"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Animates the first numeric token found inside a metric string, counting up
 * from zero to its target the first time it scrolls into view. Surrounding text,
 * decimal separator (comma or dot) and any k / M suffix are preserved.
 *
 * - SSR / no-JS safe: renders the final value on the server, so there is no
 *   layout shift and the number is correct without JavaScript.
 * - Respects prefers-reduced-motion (shows the final value, no animation).
 */
const NUM_RE = /(\d+(?:[.,]\d+)?)(\s*)([MmKk])?/;

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  const match = value.match(NUM_RE);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    const [full, numStr, gap, suffix = ""] = match;
    const idx = match.index ?? 0;
    const before = value.slice(0, idx);
    const after = value.slice(idx + full.length);
    const sep = numStr.includes(",") ? "," : ".";
    const decimals = numStr.includes(sep) ? numStr.split(sep)[1].length : 0;
    const target = parseFloat(numStr.replace(",", "."));

    const format = (n: number) =>
      `${before}${n.toFixed(decimals).replace(".", sep)}${gap}${suffix}${after}`;

    let raf = 0;
    let started = false;
    const DURATION = 1400;

    const run = (start: number) => {
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(format(target * eased));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            setDisplay(format(0));
            run(performance.now());
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [match, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
