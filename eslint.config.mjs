import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import security from "eslint-plugin-security";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  security.configs.recommended,
  {
    // jsx-a11y recommended rules (plugin already registered by eslint-config-next)
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  {
    rules: {
      "no-console": ["error"],
    },
  },
  {
    files: ["prisma/**/*.ts", "scripts/**/*.ts", "scripts/**/*.js", "scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated files (Workbox service worker)
    "public/sw.js",
    "public/workbox-*.js",
    // Mockups are source material, not part of the app
    "Mockups/**",
  ]),
]);

export default eslintConfig;
