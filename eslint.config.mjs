import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import security from "eslint-plugin-security";
import jsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Next.js Core Vitals & TypeScript Support
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // 2. Security Plugin
  security.configs.recommended,

  // 3. Global Rules & jsx-a11y
  {
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      "jsx-a11y/label-has-associated-control": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/anchor-is-valid": "warn",
      "no-console": "error",
    },
  },

  // 4. Overrides for Scripts and Prisma
  {
    files: ["prisma/**/*.ts", "scripts/**/*.ts", "scripts/**/*.js", "scripts/**/*.mjs"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // 5. Global Ignores (This replaces globalIgnores function)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "public/sw.js",
      "public/workbox-*.js",
      "Mockups/**",
    ],
  },
];

export default eslintConfig;