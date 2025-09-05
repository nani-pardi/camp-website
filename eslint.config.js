// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import ts from '@typescript-eslint/eslint-plugin'
import svelte from 'eslint-plugin-svelte'
import svelteParser from 'svelte-eslint-parser'
import prettier from 'eslint-config-prettier'

export default [
  // 1) Ignore generated/output folders entirely
  { ignores: ['node_modules', 'build', 'dist', '.svelte-kit', 'coverage'] },

  // 2) Base JS rules
  {
    ...js.configs.recommended,
    files: ['**/*.{js,ts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: { '@typescript-eslint': ts },
    rules: {
      // prefer TS rule; silence base no-unused-vars
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },

  // 3) Svelte support (parser + plugin)
  svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,              // lets you use TS in <script lang="ts">
        extraFileExtensions: ['.svelte'],
        svelteConfig: true
      },
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      // keep Prettier as the source of truth for formatting
      ...prettier.rules,
      // optional tweaks:
      'no-undef': 'off' // Svelte handles component scope; avoid false positives
    }
  }
]
