import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [react(), tsConfigPaths()],
  test: {
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
      reportsDirectory: "coverage",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/tests/test-utils.tsx", "src/trpc.ts"]
    },
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    globals: true,
    environment: "happy-dom", // or 'jsdom', 'node',
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    server: {
      deps: {
        inline: ["@clerk/nextjs"]
      }
    }
  }
});
