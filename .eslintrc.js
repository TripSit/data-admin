'use strict';

module.exports = {
  root: true,
  overrides: [
    {
      files: [
        '**/*.ts',
        '**/*.tsx',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'prefer-destructuring': 0,
        'react/jsx-one-expression-per-line': 0,
      },
    },
    {
      files: ['**/*.js'],
      extends: ['airbnb'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
    {
      files: [
        '**/__tests__/*.test.ts',
        '**/__tests__/*.test.tsx',
      ],
      plugins: ['jest'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:jest/recommended',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        'jest/globals': true,
      },
    },
  ],
};
