module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'operator-linebreak': 0,
        'indent': 0,
        'comma-dangle': 0,
        'arrow-parens': 0,
        'no-param-reassign': 0,
        'max-len': 0,
        'react/jsx-props-no-spreading': 0,
        'react/destructuring-assignment': 0,
        'import/prefer-default-export': 0,
        'no-case-declarations': 0,
        'no-shadow': 0,
    },
    "parser": "babel-eslint",
};
