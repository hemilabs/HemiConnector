module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'bloq',
    'prettier',
    'standard-with-typescript'
  ],
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'arrow-body-style': 'off',
        'max-lines': ['error', {
          max: 300,
          skipBlankLines: true,
          skipComments: true
        }],
        'max-lines-per-function': 'off',
        'max-nested-callbacks': ['error', 5],
        'max-statements': ['error', 20]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname
  },
  plugins: [
    'sonarjs'
  ],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'class-methods-use-this': 'off',
    complexity: ['error', 4],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    indent: ['error', 2],
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'max-classes-per-file': 'off',
    'max-depth': ['error', 3],
    'max-len': ['error', {
      code: 80
    }],
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
    'max-statements': ['error', 10],
    'no-shadow': 'off',
    'no-useless-constructor': 'off',
    'sonarjs/cognitive-complexity': ['error', 4]
  }
}
