import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    { languageOptions: { globals: globals.browser } },
    { ignores: [
        "build/**/*",
        ".next/**/*",
        "node_modules/**/*",
        "dist/**/*",
        "out/**/*"
    ] },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat["jsx-runtime"],
    {
        plugins: { "@stylistic/js": stylisticJs },

        rules: {
            "@stylistic/js/indent": ["error", 4],
            "@stylistic/js/quotes": ["error", "double"],
            "@stylistic/js/semi": ["error", "always"],
            "@stylistic/js/array-bracket-spacing": ["error", "never"],
            "@stylistic/js/max-len": ["error", {
                "code": 120,
                "tabWidth": 4,
                "ignoreUrls": true,
                "ignoreTemplateLiterals": true,
                "ignoreStrings": true
            }],
            "@stylistic/js/arrow-parens": ["error", "always"],
            "@stylistic/js/arrow-spacing": "error",
            "@stylistic/js/block-spacing": "error",
            "@stylistic/js/brace-style": "error",
            "@stylistic/js/comma-dangle": ["error", "never"],
            "@stylistic/js/comma-spacing": ["error", { "before": false, "after": true }],
            "@stylistic/js/computed-property-spacing": ["error", "never"],
            "@stylistic/js/eol-last": ["error", "always"],
            "@stylistic/js/function-call-spacing": ["error", "never"],
            "@stylistic/js/jsx-quotes": ["error", "prefer-double"],
            "@stylistic/js/key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
            "@stylistic/js/keyword-spacing": ["error", { "before": true, "after": true }],
            "@stylistic/js/max-statements-per-line": ["error", { "max": 1 }],
            "@stylistic/js/no-mixed-operators": "error",
            "@stylistic/js/no-multi-spaces": "error",
            "@stylistic/js/no-multiple-empty-lines": "error",
            "@stylistic/js/no-trailing-spaces": "error",
            "@stylistic/js/object-curly-spacing": ["error", "always"],
            "@stylistic/js/object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
            "@stylistic/js/operator-linebreak": ["error", "after"],
            "@stylistic/js/padded-blocks": ["error", "never"],
            "@stylistic/js/padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }
            ],
            "@stylistic/js/space-in-parens": ["error", "never"],
            "@stylistic/js/space-infix-ops": "error",
            "@stylistic/js/spaced-comment": ["error", "always", {
                "line": {
                    "markers": ["/"],
                    "exceptions": ["-", "+"]
                },
                "block": {
                    "markers": ["!"],
                    "exceptions": ["*"],
                    "balanced": true
                }
            }],
            "@stylistic/js/template-curly-spacing": "error",
            "react/jsx-first-prop-new-line": ["error", "multiline"],
            "react/jsx-max-props-per-line": ["error", { "when": "multiline" }],
            "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
            "react/jsx-one-expression-per-line": ["error", { allow: "non-jsx" }],
            "react/jsx-tag-spacing": ["error", {
                "closingSlash": "never",
                "beforeSelfClosing": "always",
                "afterOpening": "never",
                "beforeClosing": "never"
            }],
            "react/jsx-wrap-multilines": ["error", {
                "declaration": "parens-new-line",
                "assignment": "parens-new-line",
                "return": "parens-new-line",
                "arrow": "parens-new-line",
                "condition": "parens-new-line",
                "logical": "parens-new-line",
                "prop": "parens-new-line"
            }],
            "react/no-array-index-key": "error",
            "react/self-closing-comp": "error"
        }
    },
    {
        files: ["**/*.spec.tsx"],
        rules: {
            "react/jsx-props-no-spreading": "off"
        }
    },
    {
        files: ["**/*.config.{js,ts}", "**/next.config.js", "**/postcss.config.js"],
        languageOptions: { globals: globals.node },
        rules: {
            "no-undef": "off"
        }
    }
];
