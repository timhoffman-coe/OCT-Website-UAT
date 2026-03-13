import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
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
  ]),
]);

export default eslintConfig;
