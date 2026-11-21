// Builds the static pages of the TunisPOS site from tools/template.html.
//   cd tools && npm install && node build.mjs
// Output: index.html, ar/index.html, logiciel-caisse-*/index.html, sitemap.xml
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, '..');
const BASE = 'https://nidhalbouaziz.github.io/TunisPOS/';
const TODAY = new Date().toISOString().slice(0, 10);
const template = readFileSync(join(here, 'template.html'), 'utf8');
const AR = JSON.parse(readFileSync(join(here, 'i18n-ar.json'), 'utf8'));
const { pages, articles } = await import('./pages.mjs');

const PRICES = [
  { key: 'epicerie', name: 'TunisPOS Épicerie', price: '890' },
  { key: 'cafe', name: 'TunisPOS Café', price: '980' },
  { key: 'restaurant', name: 'TunisPOS Restaurant', price: '1290' }
];
const SCREENS = ['cafe-caisse', 'tables', 'epicerie-caisse', 'imprimantes', 'carte-restaurant', 'catalogue', 'ventes-serveur'];
const ALT_AR = {
  'cafe-caisse': 'صندوق TunisPOS في وضع المقهى: مشروبات مثبّتة بأسعارها بالدينار',
  tables: 'مخطط القاعة: الطاولة T5 مشغولة من النادل سامي، 21,000 دينار',
  'epicerie-arabe': 'صندوق البقالة بالعربية مع سلة بقيمة 30,350 دينار',
  imprimantes: 'صفحة الطابعات: طابعة المطبخ وطابعة البار، وأي عائلة تذهب إلى أي قسم',
  'carte-restaurant': 'صفحة المطعم: 39 طبقًا من القائمة محمّلة',
  catalogue: 'تحميل الكتالوج: 2 934 منتجًا مضافًا وقائمة خطوات الانطلاق',
  'ventes-serveur': 'تقرير المبيعات حسب النادل ليوم واحد'
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headTags(p) {
  const url = BASE + p.path;
  const locale = p.lang === 'ar' ? 'ar_TN' : 'fr_TN';
  const altLocale = p.lang === 'ar' ? 'fr_TN' : 'ar_TN';
  const alternates = p.hreflang
    ? `
  <link rel="alternate" hreflang="fr" href="${BASE}">
  <link rel="alternate" hreflang="ar" href="${BASE}ar/">
  <link rel="alternate" hreflang="x-default" href="${BASE}">`
    : '';
  return `<title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <link rel="canonical" href="${url}">${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="TunisPOS">
  <meta property="og:locale" content="${locale}">
  <meta property="og:locale:alternate" content="${altLocale}">
  <meta property="og:title" content="${esc(p.ogTitle || p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}assets/img/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(p.lang === 'ar' ? 'صندوق TunisPOS يحسب حتى المليم' : 'TunisPOS, la caisse qui compte en millimes')}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.ogTitle || p.title)}">
  <meta name="twitter:description" content="${esc(p.description)}">
  <meta name="twitter:image" content="${BASE}assets/img/og.png">`;
}

function jsonLd(p, doc) {
  const url = BASE + p.path;
  const org = {
    '@type': 'Organization',
    '@id': BASE + '#org',
    name: 'TunisPOS',
    url: BASE,
    logo: BASE + 'assets/img/apple-touch-icon.png',
    slogan: 'Smart Retail. Tunisian Touch.',
    email: 'bouaziz.nidhal99@gmail.com',
    areaServed: { '@type': 'Country', name: 'Tunisie' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+216-46-298-360',
      contactType: 'sales',
      areaServed: 'TN',
      availableLanguage: ['French', 'Arabic']
    }
  };
  const website = { '@type': 'WebSite', '@id': BASE + '#website', url: BASE, name: 'TunisPOS', inLanguage: ['fr', 'ar'], publisher: { '@id': BASE + '#org' } };
  const software = {
    '@type': 'SoftwareApplication',
    '@id': BASE + '#software',
    name: 'TunisPOS',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Point of sale',
    operatingSystem: 'Windows 10, Windows 11',
    inLanguage: ['fr', 'ar', 'en'],
    description: 'Logiciel de caisse pour cafés, restaurants et épiceries en Tunisie : tables et serveurs, ticket cuisine, code-barres et stock, en dinars à trois décimales, sans internet.',
    screenshot: SCREENS.map((s) => BASE + 'assets/img/screens/' + s + '.png'),
    featureList: ['Plan de salle et serveurs', 'Ticket bar et ticket cuisine', 'Addition partagée', 'Code-barres et vente au kilo', 'Import Excel', 'Étiquettes EAN-13', 'Inventaire et dates de péremption', 'Interface en français, arabe et anglais', 'Fonctionne sans internet'],
    publisher: { '@id': BASE + '#org' },
    offers: PRICES.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: 'TND',
      availability: 'https://schema.org/InStock',
      url: BASE + (o.key === 'cafe' ? 'logiciel-caisse-cafe/' : o.key === 'restaurant' ? 'logiciel-caisse-restaurant/' : 'logiciel-caisse-epicerie/'),
      seller: { '@id': BASE + '#org' }
    }))
  };
  const webpage = {
    '@type': 'WebPage',
    '@id': url + '#webpage',
    url,
    name: p.title,
    description: p.description,
    inLanguage: p.lang,
    isPartOf: { '@id': BASE + '#website' },
    about: { '@id': BASE + '#software' },
    primaryImageOfPage: BASE + 'assets/img/og.png'
  };
  const faq = {
    '@type': 'FAQPage',
    '@id': url + '#faq',
    inLanguage: p.lang,
    mainEntity: [...doc.querySelectorAll('.faq details')].map((d) => ({
      '@type': 'Question',
      name: d.querySelector('summary').textContent.trim(),
      acceptedAnswer: { '@type': 'Answer', text: d.querySelector('p').textContent.trim() }
    }))
  };
  const graph = [org, website, software, webpage, faq];
  if (p.crumb) {
    webpage.breadcrumb = { '@id': url + '#breadcrumb' };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
        { '@type': 'ListItem', position: 2, name: p.crumb, item: url }
      ]
    });
  }
  return `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)}\n  </script>`;
}

function translate(doc) {
  doc.querySelectorAll('[data-i18n]').forEach((el) => { const v = AR[el.dataset.i18n]; if (v) el.textContent = v; });
  doc.querySelectorAll('[data-i18n-html]').forEach((el) => { const v = AR[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });
  doc.querySelectorAll('[data-i18n-aria]').forEach((el) => { const v = AR[el.dataset.i18nAria]; if (v) el.setAttribute('aria-label', v); });
  const set = (sel, attr, val) => doc.querySelectorAll(sel).forEach((e) => e.setAttribute(attr, val));
  set('.brand[href="#top"]', 'aria-label', 'TunisPOS، الصفحة الرئيسية');
  set('#nav-links', 'aria-label', 'القائمة الرئيسية');
  set('.lightbox', 'aria-label', 'لقطة شاشة مكبّرة');
  set('.hero-visual', 'aria-label', AR['hero.visual']);
  doc.querySelectorAll('img[src*="screens/"]').forEach((img) => {
    const key = img.getAttribute('src').split('/').pop().replace('.png', '');
    if (ALT_AR[key] && img.getAttribute('alt')) img.setAttribute('alt', ALT_AR[key]);
  });
  const contact = doc.querySelector('.contact-line');
  if (contact) contact.setAttribute('dir', 'ltr');
}

function preselect(doc, trade) {
  doc.querySelectorAll('[role="tab"]').forEach((t) => {
    const on = t.dataset.tab === trade;
    t.setAttribute('aria-selected', on ? 'true' : 'false');
    if (on) t.removeAttribute('tabindex'); else t.setAttribute('tabindex', '-1');
    const panel = doc.getElementById(t.getAttribute('aria-controls'));
    if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
  });
  const scene = doc.querySelector('.hw-scene');
  scene.setAttribute('data-scene', trade);
  scene.querySelectorAll('[data-screen]').forEach((img) => img.classList.toggle('on', img.dataset.screen === trade));
  doc.querySelectorAll('[data-hw]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.hw === trade ? 'true' : 'false'));
  doc.getElementById('essayer').setAttribute('data-start', trade);
  doc.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === trade ? 'true' : 'false'));
}

// Cache busting: each CSS/JS link carries a fingerprint of its file's content.
const fingerprints = {};
function fingerprint(doc) {
  doc.querySelectorAll('link[rel="stylesheet"][href^="assets/"], script[src^="assets/"]').forEach((el) => {
    const attr = el.tagName === 'LINK' ? 'href' : 'src';
    const file = el.getAttribute(attr);
    if (!fingerprints[file]) fingerprints[file] = createHash('sha1').update(readFileSync(join(site, file))).digest('hex').slice(0, 8);
    el.setAttribute(attr, file + '?v=' + fingerprints[file]);
  });
}

function rebase(doc) {
  const local = /^(assets\/|logiciel-caisse-|ar\/|site\.webmanifest)/;
  doc.querySelectorAll('[href],[src],[data-full]').forEach((el) => {
    ['href', 'src', 'data-full'].forEach((a) => {
      const v = el.getAttribute(a);
      if (v && local.test(v)) el.setAttribute(a, '../' + v);
    });
  });
}

for (const p of pages) {
  let html = template
    .replace('<!--SEO-HEAD-->', headTags(p))
    .replace('<!--SEO-ARTICLE-->', p.article ? articles[p.article] : '');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const root = doc.documentElement;
  root.setAttribute('lang', p.lang);
  root.setAttribute('dir', p.lang === 'ar' ? 'rtl' : 'ltr');

  if (p.lang === 'ar') translate(doc);
  if (p.h1) doc.querySelector('.hero-copy h1').textContent = p.h1;
  if (p.lede) doc.querySelector('.hero .lede').textContent = p.lede;
  if (p.trade) preselect(doc, p.trade);
  if (p.crumb) {
    const nav = doc.createElement('nav');
    nav.className = 'crumbs';
    nav.setAttribute('aria-label', "Fil d'Ariane");
    nav.innerHTML = `<a href="../">Accueil</a> › <span aria-current="page">${esc(p.crumb)}</span>`;
    const copy = doc.querySelector('.hero-copy');
    copy.insertBefore(nav, copy.firstChild);
    // The page's own "Tout sur…" link would point to itself.
    doc.querySelectorAll(`.more-link[href="logiciel-caisse-${p.trade}/"]`).forEach((a) => a.remove());
  }

  // Language link: French pages lead to the Arabic page and back.
  const langLink = doc.querySelector('[data-lang-link]');
  if (p.lang === 'ar') {
    langLink.setAttribute('href', '../');
    langLink.setAttribute('hreflang', 'fr');
    langLink.setAttribute('lang', 'fr');
    langLink.textContent = 'Français';
  }
  fingerprint(doc);
  if (p.path) rebase(doc);

  doc.querySelector('head').insertAdjacentHTML('beforeend', '  ' + jsonLd(p, doc) + '\n');
  const out = join(site, p.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, dom.serialize() + '\n');
  console.log('built', p.path || '/', '-', p.title.length, 'chars title,', p.description.length, 'chars description');
}

// Sitemap, with the French and Arabic home pages declared as alternates
const xhtml = (href, lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`;
const homeAlts = [xhtml(BASE, 'fr'), xhtml(BASE + 'ar/', 'ar'), xhtml(BASE, 'x-default')].join('\n');
const urls = pages.map((p) => `  <url>
    <loc>${BASE + p.path}</loc>
    <lastmod>${TODAY}</lastmod>
${p.hreflang ? homeAlts + '\n' : ''}    <priority>${p.path === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n');
writeFileSync(join(site, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);
console.log('sitemap.xml with', pages.length, 'pages');
