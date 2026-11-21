/* TunisPOS site behaviour.
   Each language is its own static page (/ and /ar/), built by tools/build.mjs,
   so search engines index both. This script only adds behaviour. */
(function () {
  'use strict';

  // ---- Contact (edit here) ----
  var CONTACT = {
    phone: '21646298360',            // WhatsApp, international format without "+"
    phoneDisplay: '+216 46 298 360',
    mailUser: 'bouaziz.nidhal99',
    mailDomain: 'gmail.com'
  };
  var email = CONTACT.mailUser + '@' + CONTACT.mailDomain;

  var WA_MSG = {
    fr: {
      demo: 'Bonjour, je souhaite une démo de TunisPOS.',
      epicerie: 'Bonjour, je suis intéressé par TunisPOS Épicerie (890 DT).',
      cafe: 'Bonjour, je suis intéressé par TunisPOS Café (980 DT).',
      restaurant: 'Bonjour, je suis intéressé par TunisPOS Restaurant (1 290 DT).',
      pack: 'Bonjour, je voudrais le prix du pack TunisPOS avec le matériel (écran tactile, imprimante, tiroir-caisse).',
      tried: "Bonjour, j'ai essayé la caisse sur votre site. Je voudrais une vraie démo de TunisPOS.",
      mailSubject: 'TunisPOS : demande de démo'
    },
    ar: {
      demo: 'مرحبًا، أرغب في عرض تجريبي لبرنامج TunisPOS.',
      epicerie: 'مرحبًا، أنا مهتم بعرض TunisPOS بقالة (890 دينار).',
      cafe: 'مرحبًا، أنا مهتم بعرض TunisPOS مقهى (980 دينار).',
      restaurant: 'مرحبًا، أنا مهتم بعرض TunisPOS مطعم (1290 دينار).',
      pack: 'مرحبًا، أريد سعر حزمة TunisPOS مع المعدات (شاشة لمس، طابعة، درج نقود).',
      tried: 'مرحبًا، جرّبت الصندوق على موقعكم. أريد عرضًا تجريبيًا حقيقيًا لبرنامج TunisPOS.',
      mailSubject: 'TunisPOS: طلب عرض تجريبي'
    }
  };

  var root = document.documentElement;
  var lang = root.lang === 'ar' ? 'ar' : 'fr';

  // Old links used ?lang=ar on the French page: send them to the Arabic page.
  if (lang === 'fr' && new URLSearchParams(location.search).get('lang') === 'ar') {
    var alt = document.querySelector('link[rel="alternate"][hreflang="ar"]');
    if (alt) { location.replace(alt.href); return; }
  }

  function waHref(kind) {
    var msg = WA_MSG[lang][kind] || WA_MSG[lang].demo;
    return 'https://wa.me/' + CONTACT.phone + '?text=' + encodeURIComponent(msg);
  }
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waHref(a.dataset.wa); });
  document.querySelectorAll('[data-mail]').forEach(function (a) {
    a.href = 'mailto:' + email + '?subject=' + encodeURIComponent(WA_MSG[lang].mailSubject);
  });
  document.querySelectorAll('[data-mail-text]').forEach(function (s) { s.textContent = email; });
  document.querySelectorAll('[data-phone-text]').forEach(function (s) { s.textContent = CONTACT.phoneDisplay; });

  // ---- Hardware scene: the terminal shows the chosen trade's real screen ----
  var scene = document.querySelector('.hw-scene');
  var hwButtons = Array.prototype.slice.call(document.querySelectorAll('[data-hw]'));
  function setScene(name) {
    if (!scene || scene.dataset.scene === name) return;
    scene.dataset.scene = name;
    scene.querySelectorAll('[data-screen]').forEach(function (img) { img.classList.toggle('on', img.dataset.screen === name); });
    hwButtons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.hw === name ? 'true' : 'false'); });
    scene.classList.remove('printing');
    void scene.offsetWidth; // restart the ticket animation
    scene.classList.add('printing');
  }
  hwButtons.forEach(function (b) { b.addEventListener('click', function () { setScene(b.dataset.hw); }); });

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(name, focus) {
    setScene(name);
    tabs.forEach(function (t) {
      var on = t.dataset.tab === name;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectTab(t.dataset.tab); });
    t.addEventListener('keydown', function (e) {
      var rtl = root.dir === 'rtl';
      var step = 0;
      if (e.key === 'ArrowRight') step = rtl ? -1 : 1;
      if (e.key === 'ArrowLeft') step = rtl ? 1 : -1;
      if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0].dataset.tab, true); return; }
      if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1].dataset.tab, true); return; }
      if (!step) return;
      e.preventDefault();
      selectTab(tabs[(i + step + tabs.length) % tabs.length].dataset.tab, true);
    });
  });
  document.querySelectorAll('[data-tab-link]').forEach(function (a) {
    a.addEventListener('click', function () { selectTab(a.dataset.tabLink); });
  });

  // ---- Mobile nav ----
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  function setNav(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  document.querySelectorAll('.nav-links a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); toggle.focus(); } });

  // ---- Gallery ----
  var shots = document.querySelector('.shots');
  document.querySelectorAll('[data-scroll]').forEach(function (b) {
    b.addEventListener('click', function () {
      var first = shots.querySelector('.shot');
      var w = first ? first.getBoundingClientRect().width + 24 : 600;
      var dir = Number(b.dataset.scroll) * (root.dir === 'rtl' ? -1 : 1);
      shots.scrollBy({ left: dir * w, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    });
  });

  var box = document.querySelector('.lightbox');
  if (box && typeof box.showModal === 'function') {
    var boxImg = box.querySelector('img');
    document.querySelectorAll('.shot-btn').forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        boxImg.src = b.dataset.full;
        boxImg.alt = img.alt;
        box.showModal();
      });
    });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.lightbox-close')) box.close(); });
  } else {
    document.querySelectorAll('.shot-btn').forEach(function (b) {
      b.addEventListener('click', function () { window.open(b.dataset.full, '_blank', 'noopener'); });
    });
  }

  // ---- Floating WhatsApp: hidden while the hero or the final call to action is on screen ----
  var floatBtn = document.querySelector('.wa-float');
  if (floatBtn && 'IntersectionObserver' in window) {
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      floatBtn.classList.toggle('hide', visible.size > 0);
    }, { threshold: 0.15 });
    ['.hero-copy', '.final'].forEach(function (s) { var el = document.querySelector(s); if (el) io.observe(el); });
  }

  document.querySelectorAll('[data-year]').forEach(function (s) { s.textContent = new Date().getFullYear(); });

  window.TunisPOS = { setScene: setScene, selectTab: selectTab, getLang: function () { return lang; } };
})();
