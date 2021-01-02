module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        'plugin:react/recommended',
        'standard',
        'plugin:json/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'react',
        'class-property'
    ],
    rules: {
        indent: 'off',
        'max-len': ['error', { code: 120 }],
        'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }]
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: [
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended'
            ],
            plugins: [
                '@typescript-eslint'
            ],
            rules: {
                '@typescript-eslint/indent': ['error']
            }
        }
    ]
}
