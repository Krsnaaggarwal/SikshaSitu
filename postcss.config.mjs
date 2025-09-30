/** @type {import('postcss-load-config').Config} */
let plugins = {};

try {
  await import('tailwindcss');
  plugins.tailwindcss = {};
} catch (e) {
  console.warn('tailwindcss not found; continuing without Tailwind.');
}

try {
  await import('autoprefixer');
  plugins.autoprefixer = {};
} catch (e) {
  console.warn('autoprefixer not found; continuing without autoprefixer.');
}

export default { plugins };
