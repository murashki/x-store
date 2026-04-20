import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: [
      '**/*.{ts,tsx}',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'off',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/ban-ts-comment': {
        'ts-check': false,
        'ts-expect-error': false,
        'ts-ignore': true,
        'ts-nocheck': true,
      },
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    },
  },
);
