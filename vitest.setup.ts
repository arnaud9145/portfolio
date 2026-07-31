import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock next modules before they are imported
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-sans", className: "" }),
  Fraunces: () => ({ variable: "--font-display", className: "" }),
}));

// jsdom lacks these browser APIs used by client components (Reveal, SiteNav).
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

if (!("IntersectionObserver" in globalThis)) {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error minimal test stub
  globalThis.IntersectionObserver = MockIntersectionObserver;
}

vi.mock("next-intl/navigation", async () => {
  const mod = await import("./vitest.mocks/next-intl-navigation");
  return mod;
});
