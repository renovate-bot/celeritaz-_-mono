import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
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
    css: true
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "../../api/backend/src"),
      "@ui": path.resolve(__dirname, "../../packages/ui/src")
    }
  }
});
