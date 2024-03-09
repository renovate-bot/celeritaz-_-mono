import swc from "unplugin-swc";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      all: true,
      reporter: ["text", "html", "lcov"],
      cleanOnRerun: true,
      reportsDirectory: "./coverage",
      exclude: ["**/node_modules/**", "**/*.generated.ts", "**/coverage/**", ".eslintrc.js"],
    },
    globals: true,
    root: "./",
  },
  plugins: [
    tsConfigPaths(),
    // This is required to build the test files with SWC
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
});
