module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true,
    node: true,
    "cypress/globals": true,
  },
  plugins: [
    "react",
    "react-hooks",
    "prettier",
    "@typescript-eslint",
    "cypress",
    "chai-friendly",
    "no-only-tests",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:chai-friendly/recommended",
    "plugin:cypress/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", "_explicacoes/"],
  // Cherry of the Cake
  rules: {
    "no-console": "error",
    "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "no-only-tests/no-only-tests": "error",
  },
};
