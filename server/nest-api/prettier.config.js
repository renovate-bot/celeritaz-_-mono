// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  singleQuote: false,
  printWidth: 110,
  bracketSameLine: true,
  endOfLine: "auto",
  semi: true,
  trailingComma: "all",
  // This plugin's options
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^(@nestjs/(.*)$)|^(@nestjs$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(~/modules/(.*)$)|^(~/modules$)",
    "^~/(.*)$",
    "",
    "^\\../",
    "",
    "^\\./",
    "<TYPES>",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypescriptVersion: "5.0.0",
};
