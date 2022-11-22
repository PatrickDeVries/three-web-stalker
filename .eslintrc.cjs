module.exports = {
  extends: ['react-app', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
  plugins: ['jsx-a11y'],
  rules: {
    'react/jsx-key': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['variable'],
        modifiers: ['const', 'global'],
        format: ['UPPER_CASE'],
      },
      {
        selector: ['variable'],
        modifiers: ['const', 'exported'],
        format: null,
      },
      {
        selector: ['variable'],
        modifiers: ['const'],
        types: ['function'],
        format: null,
      },
    ],
    '@typescript-eslint/no-unnecessary-condition': 'warn',
  },
}
