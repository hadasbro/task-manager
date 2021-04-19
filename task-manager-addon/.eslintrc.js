const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  extends: ['airbnb', 'prettier', 'react-app', 'prettier/react', 'prettier/@typescript-eslint'],
  plugins: ['prettier', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  env: {
    jest: true,
    es6: true,
  },
  globals: {
    window: true,
    document: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 1,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-shadow': 'off',
    'react-hooks/exhaustive-deps': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.d.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-empty-function': 'off',
        'no-console': 'off',
      },
    },
  ],
};
