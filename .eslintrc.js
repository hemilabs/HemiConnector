module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'max-statements': ['error', 20],
        'max-nested-callbacks': ['error', 5],
        'max-lines-per-function': 'off',
        'max-lines': ['error', {
          max: 300,
          skipBlankLines: true,
          skipComments: true
        }]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  plugins: [
    'sonarjs'
  ],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2],
    'class-methods-use-this': 'off',
    complexity: ['error', 4],
    'sonarjs/cognitive-complexity': ['error', 4],
    'max-depth': ['error', 3],
    'max-statements': ['error', 10],
    'max-lines': ['error', {
      max: 130,
      skipBlankLines: true,
      skipComments: true
    }],
    'max-lines-per-function': ['error', {
      max: 35,
      skipBlankLines: true,
      skipComments: true
    }],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 3],
    'no-useless-constructor': 'off',
    'max-classes-per-file': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-len': ['error', {
      code: 80
    }]
  }
}
