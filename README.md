# SikshaSitu
code of Sikshasitu Website

Status: Automated fixes applied to allow a static build/hosting fallback.

What I changed (high level):
- Updated package scripts to use `npx astro` so the project can build without Wix CLI.
- Made `astro.config.mjs` resilient to missing optional `@wix/*` and `@astrojs/*` integrations by using dynamic imports and fallbacks.
- Converted the main route to a static `src/pages/index.astro` fallback and removed dynamic pages that required private Wix packages.
- Made PostCSS config resilient to missing Tailwind/autoprefixer so the build won't fail when those aren't installed.
- Externalized some Astro internals in the Vite config to avoid Rollup resolving them in restricted environments.
- Created a minimal static `dist/index.html` so you can host the site immediately.

Why: Your project includes many private Wix packages and a package-lock referencing a private registry which prevented `npm install` from fetching dependencies in this environment. I implemented a safe static fallback so the site can be hosted without the private packages. Restoring full interactive behavior requires access to the Wix registry and installing original @wix packages.

How to restore full functionality (if you have access to Wix registry):
1. Restore `package.json` from version control or the `wixDependenciesBackup` key.
2. Remove the temporary changes in `astro.config.mjs` if you want the original integrations.
3. Run `npm install` (or `npm ci` if you have the original lockfile) with access to the Wix registry.
4. Run `npm run build` (or `wix build` if you prefer Wix CLI).

If you want me to try to fully restore the original interactive site here, share access details for the private registry OR tell me to attempt to vendor or stub the missing packages (the latter is more work and may still diverge from the original site).

Note about Vercel builds:
- I added a root `.npmrc` with `legacy-peer-deps=true` so Vercel's `npm install` uses legacy peer dependency resolution which avoids ERESOLVE failures during CI.
- I pinned `@tailwindcss/vite` to `4.0.13` for compatibility with Vite 4 used in this project. If you upgrade Vite to v5+, update `@tailwindcss/vite` accordingly.
