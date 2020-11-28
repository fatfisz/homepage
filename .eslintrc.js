'use strict';

module.exports = {
  root: true,
  extends: 'fatfisz',

  overrides: [
    {
      files: '**',
      excludedFiles: ['.eslintrc.js', 'next.config.js'],
      parserOptions: {
        sourceType: 'module',
      },
      globals: {
        fetch: 'readonly',
        process: 'readonly',
      },
    },
    {
      files: 'components/**',
      globals: {
        window: 'readonly',
      },
    },
    {
      files: ['**/*.d.ts', 'pages/**'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['.eslintrc.js', 'next.config.js', 'api/**', 'pages/api/**', 'utils/fetch-api.js'],
      env: {
        node: true,
      },
    },
  ],
};
