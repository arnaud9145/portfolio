import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Mock next modules before they are imported
vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-sans", className: "" }),
}));

vi.mock("next-intl/navigation", async () => {
  const mod = await import("./vitest.mocks/next-intl-navigation");
  return mod;
});
