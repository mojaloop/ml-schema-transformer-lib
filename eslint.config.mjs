import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  prettier,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'error',
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single', { allowTemplateLiterals: false }],
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error'],
    },
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      // add here any rules specific to test files
    },
  },
  {
    files: ['**/*.js'],
    ...tsPlugin.configs['flat/disable-type-checked'],
  },
];
