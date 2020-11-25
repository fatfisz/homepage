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
        process: 'readonly',
      },
      rules: {
        // TODO: migrate to named exports
        'import/no-default-export': 'off',
      },
    },
    {
      files: 'components/**',
      globals: {
        window: 'readonly',
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
