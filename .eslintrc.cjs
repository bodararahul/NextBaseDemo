var tsConfigs = ['./tsconfig.json'];
var tsConfigEmail = ['./tsconfig-emails.json'];

var ruleOverrides = {
  '@typescript-eslint/no-unused-vars': 'warn',
};
var srcRuleOverrides = {
  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: 'lucide-react',
          message: 'Please use lucide-react/dist/esm/icons instead.',
        },
      ],
    },
  ],
  'prettier/prettier': 1,
  '@typescript-eslint/no-unused-vars': 'warn',
};

module.exports = {
  overrides: [
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfigs,
      },
      plugins: ['@typescript-eslint', 'prettier'],
      rules: srcRuleOverrides,
      files: ['src/**/*.ts', 'src/**/*.tsx'],
    },
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfigEmail,
      },
      plugins: ['@typescript-eslint', 'prettier'],
      rules: srcRuleOverrides,
      files: [
        'src/**/*.ts',
        'src/**/*.tsx',
        'emails/**/*.ts',
        'emails/**/*.tsx',
      ],
    },
    {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfigs,
      },
      plugins: [
        '@typescript-eslint',
        'plugin:playwright/playwright-test',
        'prettier',
      ],
      rules: srcRuleOverrides,
      files: ['e2e/**/*.spec.ts'],
    },
    {
      extends: ['eslint:recommended', 'prettier', 'esnext'],
      files: '*.mjs',
      rules: ruleOverrides,
    },
    // make nextconfig.mjs node environment
    {
      extends: ['eslint:recommended', 'prettier', 'node'],
      files: 'next.config.mjs',
      rules: ruleOverrides,
    },
    {
      extends: ['prettier'],
      files: '*.js',
      rules: ruleOverrides,
    },
  ],
  root: true,
};
