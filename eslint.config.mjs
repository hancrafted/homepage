import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.archgate/**', '.next/**', 'out/**'] },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [js.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic],
    rules: {
      complexity: ['error', 10],
      'max-lines-per-function': ['error', 50],
      'max-params': ['error', 4],
      'max-depth': ['error', 3],
      'max-lines': ['error', 300],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              message: 'Import Link from "@/i18n/navigation" instead (software-architecture tenet 13).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: { 'max-lines-per-function': 'off', 'max-lines': 'off' },
  },
  eslintConfigPrettier,
);
