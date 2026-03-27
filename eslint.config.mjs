import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

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
  ]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.strict, tseslint.configs.stylistic],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
    },
  },
  {
    plugins: {
      prettier,
      import: importPlugin,
    },
    rules: {
      "eol-last": ["error", "always"],
      "prettier/prettier": "error",
      "no-console": "error",
      "linebreak-style": ["error", "unix"],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "object", "parent", "sibling", "index"],
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "always",
        },
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unknown-property": "error",
      "react/self-closing-comp": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);

export default eslintConfig;
