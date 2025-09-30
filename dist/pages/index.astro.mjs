import { createComponent, renderHead, render } from 'astro/compiler-runtime';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return render`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Shiksha Setu - Static</title><meta name="description" content="Static fallback for Shiksha Setu"><link rel="stylesheet" href="/styles/global.css">${renderHead($$result)}</head> <body> <main style="max-width:900px;margin:48px auto;padding:16px;font-family:system-ui,Arial,sans-serif;"> <h1>Shiksha Setu</h1> <p>Static fallback build — interactive features require additional integrations.</p> <nav> <a href="/assessments">Assessments</a> |
<a href="/courses">Courses</a> |
<a href="/colleges">Colleges</a> </nav> </main> </body></html>`;
}, "/Users/mayankaggarwal/Documents/GitHub/SikshaSitu/src/pages/index.astro", void 0);

const $$file = "/Users/mayankaggarwal/Documents/GitHub/SikshaSitu/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
