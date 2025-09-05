/** @type {import("prettier").Config} */
module.exports = {
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: false, // required so Prettier finds plugins in node_modules
  semi: true,
  singleQuote: false,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  svelteSortOrder: 'scripts-markup-styles',
  svelteStrictMode: false,
  svelteAllowShorthand: true,
  svelteBracketNewLine: true,
}
