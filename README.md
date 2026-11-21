# TunisPOS website

Marketing site for TunisPOS, the point-of-sale software for Tunisian cafés, restaurants and grocery stores.
Live: https://nidhalbouaziz.github.io/TunisPOS/

Static HTML, CSS and JavaScript, hosted on GitHub Pages. Every push to `main` redeploys it.

## Pages

| URL | Built from |
| --- | --- |
| `/` | French home page |
| `/ar/` | Arabic home page (right to left) |
| `/logiciel-caisse-cafe/` | Café landing page |
| `/logiciel-caisse-restaurant/` | Restaurant landing page |
| `/logiciel-caisse-epicerie/` | Grocery landing page |

All five pages are generated from one template. **Edit the template, never the generated `index.html` files.**

## Edit and rebuild

```
cd tools
npm install        # first time only
node build.mjs
```

- `tools/template.html`: the page, in French
- `tools/i18n-ar.json`: the Arabic text, by `data-i18n` key
- `tools/pages.mjs`: titles, descriptions, headlines and articles of each page
- `tools/build.mjs`: writes the pages, SEO tags, structured data (JSON-LD), `sitemap.xml` and cache-busting fingerprints

## Other files

- `assets/css/style.css`: styles; colour tokens at the top
- `assets/css/motion.css`: animations (only for visitors who haven't asked for reduced motion)
- `assets/js/main.js`: tabs, menu, gallery; contact details in `CONTACT`, WhatsApp messages in `WA_MSG`
- `assets/js/motion.js`: animation behaviour
- `assets/js/demo.js`: the playable till ("Essayez la caisse")

## Change prices

Prices appear in `tools/template.html` (the three `.amount` values), `tools/i18n-ar.json` if mentioned in text, `tools/pages.mjs` (descriptions and articles), `tools/build.mjs` (`PRICES`, for structured data) and `assets/js/main.js` (`WA_MSG`). Rebuild after changing them.
