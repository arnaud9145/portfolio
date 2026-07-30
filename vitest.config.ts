import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

const nextMockPlugin = {
  name: "mock-next-navigation",
  enforce: "pre" as const,
  resolveId: (id: string) => {
    if (id.startsWith("next/")) {
      if (id === "next/navigation") {
        return path.resolve(__dirname, "./vitest.mocks/next-navigation.ts");
      }
    }
    return null;
  },
};

export default defineConfig({
  plugins: [nextMockPlugin, react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
