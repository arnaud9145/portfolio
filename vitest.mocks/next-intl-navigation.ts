import { vi } from "vitest";

export function createNavigation() {
  return {
    Link: vi.fn(({ children, href }: any) => children),
    redirect: vi.fn(),
    usePathname: vi.fn(() => "/"),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    })),
    getPathname: vi.fn(() => "/"),
  };
}
