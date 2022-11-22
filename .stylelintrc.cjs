module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-standard-scss', 'stylelint-config-styled-components', 'stylelint-config-prettier'],
  customSyntax: 'postcss-scss',
  rules: {
    'selector-type-case': ['lower', { ignoreTypes: ['/^\\$\\w+/'] }],
    'selector-type-no-unknown': [true, { ignoreTypes: ['/-styled-mixin/', '/^\\$\\w+/'] }],
    'value-keyword-case': ['lower', { ignoreKeywords: ['dummyValue'] }],
    'declaration-colon-newline-after': null,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'keyframes-name-pattern': null,
    'declaration-block-semicolon-newline-after': null,
  },
}
