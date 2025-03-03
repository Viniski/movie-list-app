import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/dist"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "prettier",
)), {
    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "unused-imports": unusedImports,
        "no-relative-import-paths": noRelativeImportPaths,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.eslint.json",
        },
    },

    settings: {
        "import/resolver": {
            typescript: {},
        },
    },

    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "consistent-return": "off",

        "import/order": ["error", {
            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },

            pathGroups: [{
                pattern: "react*",
                group: "builtin",
                position: "before",
            }, {
                pattern: "@/**",
                group: "external",
                position: "after",
            }],

            pathGroupsExcludedImportTypes: ["builtin"],
        }],

        "import/prefer-default-export": "off",
        "newline-before-return": "error",

        "no-relative-import-paths/no-relative-import-paths": ["error", {
            allowSameFolder: true,
            prefix: "@",
            rootDir: "src",
        }],

        "no-empty": ["error", {
            allowEmptyCatch: true,
        }],

        "react/function-component-definition": ["error", {
            namedComponents: "arrow-function",
            unnamedComponents: "arrow-function",
        }],

        "react/hook-use-state": "error",

        "react/jsx-key": ["error", {
            checkFragmentShorthand: true,
        }],

        "react/jsx-no-useless-fragment": ["error", {
            allowExpressions: true,
        }],

        "react/jsx-props-no-spreading": "off",

        "react/jsx-sort-props": ["error", {
            callbacksLast: true,
            ignoreCase: true,
            multiline: "last",
            noSortAlphabetically: false,
            reservedFirst: true,
            shorthandFirst: true,
            shorthandLast: false,
        }],

        "react/require-default-props": "off",
        "react-hooks/exhaustive-deps": "error",

        "sort-imports": ["error", {
            ignoreCase: true,
            ignoreDeclarationSort: true,
        }],

        "unused-imports/no-unused-imports": "error",
    },
}, {
    files: ["**/*", "!src/**/*"],

    rules: {
        "import/no-extraneous-dependencies": "off",
    },
}];