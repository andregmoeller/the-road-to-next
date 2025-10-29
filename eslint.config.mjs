import nextPlugin from "@next/eslint-plugin-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    plugins: {
      "@next/next": nextPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000", "^@?\\w", "^[^.]", "^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;
