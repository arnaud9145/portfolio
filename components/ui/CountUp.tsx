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
 * - Runs exactly once per mount: an IntersectionObserver triggers the count-up
 *   the first time the element enters view, then unobserves itself, and a ref
 *   guard (`hasAnimatedRef`) blocks a second run even if the effect re-fires.
 */
const NUM_RE = /(\d+(?:[.,]\d+)?)(\s*)([MmKk])?/;

export type ParsedMetric = {
  /** Text before the numeric token, verbatim. */
  before: string;
  /** Text after the numeric token (and its suffix), verbatim. */
  after: string;
  /** Whitespace between the number and its suffix, preserved verbatim. */
  gap: string;
  /** k/M suffix from the source string, or "" when there is none. */
  suffix: string;
  /** Decimal separator used in the source string. */
  separator: "," | ".";
  /** Number of decimal digits in the source string. */
  decimals: number;
  /** Parsed numeric target, e.g. 1.2 for "1,2 M" or 500 for "500k". */
  target: number;
  /** Renders `n` (typically 0..target) using the exact same format as the source string. */
  format: (n: number) => string;
};

/**
 * Extracts the first numeric token from a metric string — handling French
 * decimal commas, thousands/millions k/M suffixes, and arbitrary leading or
 * trailing text (e.g. "~", "d'utilisateurs actifs") — and returns a formatter
 * that renders any intermediate value in that exact same format.
 *
 * Returns `null` when the string has no numeric token, in which case callers
 * should just display it as-is (no animation possible).
 */
export function parseMetric(value: string): ParsedMetric | null {
  const match = value.match(NUM_RE);
  if (!match) return null;

  const [full, numStr, gap, suffix = ""] = match;
  const idx = match.index ?? 0;
  const before = value.slice(0, idx);
  const after = value.slice(idx + full.length);
  const separator: "," | "." = numStr.includes(",") ? "," : ".";
  const decimals = numStr.includes(separator) ? numStr.split(separator)[1].length : 0;
  const target = parseFloat(numStr.replace(",", "."));

  const format = (n: number) =>
    `${before}${n.toFixed(decimals).replace(".", separator)}${gap}${suffix}${after}`;

  return { before, after, gap, suffix, separator, decimals, target, format };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const parsed = parseMetric(value);
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      // Initial state is already the full source string (SSR-safe), so there
      // is nothing to animate to — just leave `display` as-is.
      return;
    }

    const { target, format } = parsed;
    const DURATION = 1400;
    let raf = 0;

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
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            setDisplay(format(0));
            run(performance.now());
            observer.unobserve(el);
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
    // Depend only on `value` (the prop itself). Deliberately do NOT depend on
    // a value derived fresh each render (e.g. the `.match()` result used to
    // build `parsed`): a new array/object reference on every render would
    // re-run this effect on every render, recreating the IntersectionObserver
    // and restarting the animation forever — the actual cause of the
    // trembling / stuck-at-zero bug this component used to have.
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
