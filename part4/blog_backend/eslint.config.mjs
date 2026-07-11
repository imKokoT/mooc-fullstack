import globals from "globals";
import { defineConfig } from "eslint/config";
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn'
    }
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  { 
    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" },
    plugins: { 
      '@stylistic/js': stylisticJs,
    },
    rules: { 
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
    }, 
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  { 
    ignores: ['dist/**'], 
  }
]);
