import { defineConfig } from "vitest/config";

import baseConfig from "./vitest.config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["**/*.spec.[jt]s?(x)"],
    coverage: {
      ...baseConfig.test.coverage,
      reportsDirectory: "./coverage/unit",
    },
  },
});
