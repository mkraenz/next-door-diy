// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    singleQuote: true,
    overrides: [
        {
            files: ['*.yml', '*.yaml', '*.json', '*.webmanifest'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};

export default config;
