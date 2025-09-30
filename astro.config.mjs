// @ts-check
// These integrations can be missing in non-Wix environments. We'll import them
// dynamically inside the async config so missing packages don't crash the
// config evaluation.
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

const isBuild = process.env.NODE_ENV == "production";

// https://astro.build/config
export default await (async () => {
  // Determine optional wix babel plugins (if available).
  /** @type {any[]} */
  let wixBabelPlugins = [];
  try {
    const mod1 = await import('@wix/babel-plugin-jsx-source-attrs');
    const mod2 = await import('@wix/babel-plugin-jsx-dynamic-data');
    wixBabelPlugins = [mod1.default || mod1, mod2.default || mod2];
  } catch (e) {
    // Not fatal — continue without the wix babel plugins.
    console.warn('@wix babel plugins not available; continuing without them.');
    wixBabelPlugins = [];
  }

  // Try to dynamically import Astro integrations. If they're not installed,
  // just continue without them so hosting environments without these
  // packages (for example, when building outside Wix) still work.
  let tailwindFn = null;
  let reactFn = null;
  let cloudflareFn = null;
  try {
    const t = await import('@astrojs/tailwind');
    tailwindFn = t.default || t;
  } catch (e) {
    console.warn('@astrojs/tailwind not available; skipping tailwind integration.');
  }

  try {
    const r = await import('@astrojs/react');
    reactFn = r.default || r;
  } catch (e) {
    console.warn('@astrojs/react not available; skipping react integration.');
  }

  try {
    const c = await import('@astrojs/cloudflare');
    cloudflareFn = c.default || c;
  } catch (e) {
    console.warn('@astrojs/cloudflare not available; skipping adapter cloudflare.');
  }

  // Use server output only when we have a server adapter available.
  const output = cloudflareFn ? "server" : "static";
  const integrations = await (async () => {
    // Base integrations that should be present in most environments
    const base = [];
    if (tailwindFn) base.push(tailwindFn());
    if (reactFn) base.push(reactFn({ babel: { plugins: wixBabelPlugins } }));

    // Optional: framewire-like integration (keeps previous behavior when available)
    const framewire = {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `const version = new URLSearchParams(location.search).get('framewire');
              if (version){
                const localUrl = 'http://localhost:3202/framewire/index.mjs';
                const cdnUrl = \`https://static.parastorage.com/services/framewire/\${version}/index.mjs\`;
                const url = version === 'local' ? localUrl : cdnUrl;
                const framewireModule = await import(url);
                globalThis.framewire = framewireModule;
                framewireModule.init();
                console.log('Framewire initialized');
              }`
            );
          }
        },
      },
    };

    // Try to add Wix and monitoring integrations if available. These packages are
    // often hosted on private registries and can cause builds to fail when missing.
    try {
      const wixMod = await import('@wix/astro');
      const monitoringMod = await import('@wix/monitoring-astro');
      base.push(framewire, wixMod.default({ enableHtmlEmbeds: isBuild, enableAuthRoutes: true }), monitoringMod.default());
    } catch (e) {
      // If @wix packages are not installed (common when hosting outside Wix),
      // log a friendly warning and continue with base integrations only.
      console.warn('Optional @wix integrations not available; continuing without them.');
      base.push(framewire);
    }

    return base;
  })();

  return {
    output,
    integrations,
    vite: {
      plugins: [customErrorOverlayPlugin()],
      build: {
        rollupOptions: {
          // Prevent rollup from trying to resolve certain Astro internals
          // that may not be installed in this environment.
          external: [
            'astro/app',
            'astro/compiler-runtime',
            'astro/runtime',
            'astro/jsx-runtime',
            'astro/components',
            'react/jsx-runtime',
          ],
        },
      },
    },
    adapter: isBuild && cloudflareFn ? cloudflareFn() : undefined,
    devToolbar: {
      enabled: false,
    },
    image: {
      domains: ["static.wixstatic.com"],
    },
    server: {
      allowedHosts: true,
      host: true,
    },
  };
})();
