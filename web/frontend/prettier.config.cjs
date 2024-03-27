// @ts-check

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
module.exports = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  singleQuote: false,
  printWidth: 110,
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
    "^(~/modules/(.*)$)|^(~/modules$)",
    "^~/(.*)$",
    "",
    "^\\../",
    "",
    "^\\./",
    "",
    "<TYPES>",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypescriptVersion: "5.0.0",
};
