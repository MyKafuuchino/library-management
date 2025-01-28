import js from "@eslint/js";
import globals from "globals";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";


/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts,tsx}"],
        ignores: ["node_modules", "dist"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": ts,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": ["error", {argsIgnorePattern: "^_"}],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },
];