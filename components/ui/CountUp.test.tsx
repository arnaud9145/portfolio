import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { CountUp, parseMetric } from "./CountUp";

describe("parseMetric", () => {
  it("parses a French decimal + million suffix ('1,2 M d'utilisateurs actifs')", () => {
    const parsed = parseMetric("1,2 M d'utilisateurs actifs");
    expect(parsed).not.toBeNull();
    expect(parsed?.target).toBeCloseTo(1.2);
    expect(parsed?.suffix).toBe("M");
    expect(parsed?.separator).toBe(",");
    expect(parsed?.decimals).toBe(1);
    expect(parsed?.before).toBe("");
    expect(parsed?.after).toBe(" d'utilisateurs actifs");
    // Re-formatting the exact target must reproduce the source string byte for byte.
    expect(parsed?.format(parsed.target)).toBe("1,2 M d'utilisateurs actifs");
  });

  it("parses a tilde-prefixed thousands suffix with no space ('~500k utilisateurs/mois')", () => {
    const parsed = parseMetric("~500k utilisateurs/mois");
    expect(parsed).not.toBeNull();
    expect(parsed?.target).toBe(500);
    expect(parsed?.suffix).toBe("k");
    expect(parsed?.gap).toBe("");
    expect(parsed?.before).toBe("~");
    expect(parsed?.after).toBe(" utilisateurs/mois");
    expect(parsed?.format(parsed.target)).toBe("~500k utilisateurs/mois");
  });

  it("parses an English dot-decimal string ('1.2M active users')", () => {
    const parsed = parseMetric("1.2M active users");
    expect(parsed).not.toBeNull();
    expect(parsed?.target).toBeCloseTo(1.2);
    expect(parsed?.separator).toBe(".");
    expect(parsed?.suffix).toBe("M");
    expect(parsed?.format(parsed.target)).toBe("1.2M active users");
  });

  it("handles a plain integer with no suffix", () => {
    const parsed = parseMetric("42 projects shipped");
    expect(parsed).not.toBeNull();
    expect(parsed?.target).toBe(42);
    expect(parsed?.suffix).toBe("");
    expect(parsed?.decimals).toBe(0);
    expect(parsed?.format(parsed.target)).toBe("42 projects shipped");
  });

  it("returns null when there is no numeric token", () => {
    expect(parseMetric("no numbers here")).toBeNull();
  });
});

describe("CountUp", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the final source string immediately on mount (SSR-safe initial state)", () => {
    render(<CountUp value="1,2 M d'utilisateurs actifs" />);
    expect(screen.getByText("1,2 M d'utilisateurs actifs")).toBeInTheDocument();
  });

  it("renders the final value immediately and skips animation under prefers-reduced-motion", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: query.includes("prefers-reduced-motion"),
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          addListener: () => {},
          removeListener: () => {},
          dispatchEvent: () => false,
        }) as unknown as MediaQueryList,
    );

    render(<CountUp value="~500k utilisateurs/mois" />);
    expect(screen.getByText("~500k utilisateurs/mois")).toBeInTheDocument();
    matchMediaSpy.mockRestore();
  });

  it("triggers the count-up exactly once when it enters view, and stops observing afterwards", async () => {
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    let capturedCallback: IntersectionObserverCallback | null = null;

    class FakeIntersectionObserver {
      constructor(callback: IntersectionObserverCallback) {
        capturedCallback = callback;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
      takeRecords = () => [];
    }
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);

    let rafCount = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => {
      rafCount += 1;
      return rafCount;
    });

    render(<CountUp value="1,2 M d'utilisateurs actifs" />);
    expect(observe).toHaveBeenCalledTimes(1);

    const fakeEntry = { isIntersecting: true } as IntersectionObserverEntry;

    // First intersection: should start the animation and unobserve itself.
    act(() => {
      capturedCallback?.([fakeEntry], {} as IntersectionObserver);
    });
    expect(unobserve).toHaveBeenCalledTimes(1);
    const rafCallsAfterFirstTrigger = rafCount;
    expect(rafCallsAfterFirstTrigger).toBeGreaterThan(0);

    // A second intersection notification (e.g. a duplicate observer callback,
    // or the effect re-running for an unrelated reason) must NOT restart the
    // animation — this is the regression this test guards against.
    act(() => {
      capturedCallback?.([fakeEntry], {} as IntersectionObserver);
    });
    expect(rafCount).toBe(rafCallsAfterFirstTrigger);

    vi.unstubAllGlobals();
  });

  it("keeps a stable effect across re-renders with the same value (no observer churn)", () => {
    const observe = vi.fn();
    const disconnect = vi.fn();
    class FakeIntersectionObserver {
      observe = observe;
      unobserve = vi.fn();
      disconnect = disconnect;
      takeRecords = () => [];
    }
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);

    const { rerender } = render(
      <CountUp value="1,2 M d'utilisateurs actifs" className="a" />,
    );
    expect(observe).toHaveBeenCalledTimes(1);

    // Re-render with the same `value` prop (as happens on unrelated parent
    // re-renders) must not tear down and recreate the observer.
    rerender(<CountUp value="1,2 M d'utilisateurs actifs" className="b" />);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(disconnect).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});
