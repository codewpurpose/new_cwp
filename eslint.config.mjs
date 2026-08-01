import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored agent skill definitions — not our source, thousands of findings.
    "agent-skills/**",
    // Scraped reference bundles from the original site inspection.
    "docs/research/**",
    // Static assets: the ML lesson bundles are vendored build output, and
    // the lesson chrome is a vanilla IIFE outside the Next build.
    "public/**",
  ]),
]);

export default eslintConfig;
