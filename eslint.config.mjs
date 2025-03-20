import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      quotes: ["error", "double"], // double quotes
      semi: ["error", "always"], // Require semicolons
      indent: ["error", 2], // 2-space indentation
      "no-trailing-spaces": "error", // No spaces at end of lines
    },
  },
];
