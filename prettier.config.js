/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  singleQuote: false,
  printWidth: 100,
  bracketSameLine: true,
  endOfLine: "auto",
  semi: true,
  trailingComma: "none",
  // This plugin's options
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(react-dom/(.*)$)|^(react-dom$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(~/trpc/(.*)$)|^(~/trpc$)",
    "",
    "^(~/providers/(.*)$)|^(~/providers$)",
    "^(~/utils/(.*)$)|^(~/utils)",
    "^(~/redux/(.*)$)|^(~/redux)",
    "^(~/shared/custom(.*)$)|^(~/shared/custom$)",
    "^(~/shared/shadcn(.*)$)|^(~/shared/shadcn$)",
    "",
    "^~/(.*)$",
    "",
    "^\\../",
    "",
    "^\\./",
    "",
    "<TYPES>"
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"]
};

export default config;
