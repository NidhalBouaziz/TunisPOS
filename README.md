# TunisPOS website

Marketing site for TunisPOS, the point-of-sale software for Tunisian cafés, restaurants and grocery stores.

Static HTML, CSS and JavaScript: no build step. French by default, Arabic (RTL) through the language button or `?lang=ar`.

## Structure

- `index.html` - the page (French copy lives here)
- `assets/css/style.css` - all styles; colour tokens at the top
- `assets/js/main.js` - tabs, menu, gallery, Arabic translations (`AR` object) and contact details (`CONTACT` object)
- `assets/img/screens/` - real screenshots of the product
- `vercel.json` - caching and security headers

## Change contact details or prices

- Phone, WhatsApp and email: `CONTACT` at the top of `assets/js/main.js`.
- Prices: the three `.amount` values in `index.html`, the pre-filled WhatsApp messages in `WA_MSG` (`main.js`), and the JSON-LD `offers` in the `<head>`.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Deploy

Hosted on GitHub Pages: https://nidhalbouaziz.github.io/TunisPOS/ . Every push to `main` redeploys it.
