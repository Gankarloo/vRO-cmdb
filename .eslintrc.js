module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    rules: {
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
    },
    overrides: [
        {
            files: ["./src/**/*.ts"],
            excludedFiles: ["*.test.ts", "*.spec.ts"],
        }
    ]
};
// docs https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md