import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/dist',
    '**/node_modules',
    '**/vitest-output',
  ],
  javascript: {
    overrides: {
      'prefer-promise-reject-errors': 'off',
      'no-restricted-globals': 'off',
    },
  },
  stylistic: {
    overrides: {
      'style/operator-linebreak': ['error', 'after'],
    },
  },
  typescript: {
    tsconfigPath: 'tsconfig.eslint.json',
    overrides: {
      'ts/no-throw-literal': 'off',
      'ts/consistent-type-definitions': 'off',
    },
    // https://github.com/antfu/eslint-config/blob/main/src/configs/typescript.ts#L43
    overridesTypeAware: {
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-call': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-floating-promises': 'off',
      'ts/strict-boolean-expressions': 'off',
      'ts/promise-function-async': 'off',
    },
  },
  react: true,
})
