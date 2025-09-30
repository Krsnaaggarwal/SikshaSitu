import { createComponent, renderComponent, renderHead, render } from 'astro/compiler-runtime';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const Head = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
    /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
    /* @__PURE__ */ jsx("meta", { name: "theme-color", content: "#0000FF" }),
    /* @__PURE__ */ jsx("meta", { name: "color-scheme", content: "light" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://static.parastorage.com" }),
    /* @__PURE__ */ jsx("link", { rel: "dns-prefetch", href: "https://static.parastorage.com" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }),
    /* @__PURE__ */ jsx("link", { rel: "icon", type: "image/png", href: "/favicon.png" }),
    /* @__PURE__ */ jsx("meta", { name: "format-detection", content: "telephone=no" }),
    /* @__PURE__ */ jsx("meta", { name: "msapplication-tap-highlight", content: "no" }),
    /* @__PURE__ */ jsx("meta", { name: "renderer", content: "webkit" }),
    /* @__PURE__ */ jsx("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" })
  ] });
};

const $$ = createComponent(($$result, $$props, $$slots) => {
  return render`<html lang="en" class="w-full h-full scroll-smooth"> <head>${renderComponent($$result, "Head", Head, {})}<title>Shiksha Setu - AI-Powered Career Guidance</title><meta name="description" content="Discover personalized career paths through government education with AI-powered recommendations, college directory, and job opportunities.">${renderHead($$result)}</head> <body class="w-full h-full font-paragraph bg-background"> <main class="mx-auto max-w-4xl p-6"> <header class="mb-8"> <h1 class="text-3xl font-semibold">Shiksha Setu</h1> <p class="text-sm text-muted-foreground">AI-Powered Career Guidance (static fallback)</p> </header> <section class="space-y-4"> <p>Welcome to the static fallback of the site. The full interactive experience requires additional build-time dependencies (React integrations) not available in this environment.</p> <nav class="grid gap-2 md:grid-cols-3"> <a class="p-3 border rounded" href="/assessments">Assessments</a> <a class="p-3 border rounded" href="/courses">Courses</a> <a class="p-3 border rounded" href="/colleges">Colleges</a> <a class="p-3 border rounded" href="/jobs">Jobs</a> <a class="p-3 border rounded" href="/profile">Profile</a> <a class="p-3 border rounded" href="/email-templates">Email Templates</a> </nav> </section> </main> </body></html>`;
}, "/Users/mayankaggarwal/Documents/GitHub/SikshaSitu/src/pages/[...slug].astro", void 0);

const $$file = "/Users/mayankaggarwal/Documents/GitHub/SikshaSitu/src/pages/[...slug].astro";
const $$url = "/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
