import baseTailwindConfig from "@repo/ui/tailwind.config";

import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  presets: [baseTailwindConfig],
  theme: {}
} satisfies Config;

export default config;
