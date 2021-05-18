module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    rules: {
        'comma-style': [2, 'last'],
        'no-duplicate-case': 2,
        'no-constant-condition': 2,
        'no-const-assign': 2,
        'no-lone-blocks': 2,
        'no-dupe-keys': 2,
        'no-else-return': 2,
        'no-eval': 1,
        'no-var': 1,
        '@typescript-eslint/explicit-module-boundary-types': 1,
        'no-redeclare': 2,
        'no-undef': 2,
        '@typescript-eslint/no-var-requires': 0,
    },
    env: {
        //指定代码的运行环境
        browser: true,
        node: true,
    },
    globals: {
        baseInterfaceGloab: true,
    },
};
