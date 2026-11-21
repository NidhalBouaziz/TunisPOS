/* TunisPOS motion layer. Everything here is an enhancement:
   the page reads complete if this file never runs. */
(function () {
  'use strict';

  var root = document.documentElement;
  var motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var api = window.TunisPOS || {};

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function tnd(n) { return (n / 1000).toFixed(3).replace('.', ','); }

  // ---- Split a heading into words that can rise into view ----
  function splitWords(el) {
    if (!el) return;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach(function (w, i) {
      var outer = document.createElement('span');
      var inner = document.createElement('span');
      outer.className = 'w';
      inner.className = 'wi';
      inner.style.setProperty('--i', i);
      inner.textContent = w;
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    el.classList.add('split');
  }

  var heroTitle = document.querySelector('.hero-copy h1');
  var finalSection = document.querySelector('.final');
  var finalTitle = finalSection && finalSection.querySelector('h2');
  splitWords(heroTitle);
  if (motionOK && finalTitle) {
    splitWords(finalTitle);
    finalSection.classList.add('words-ready');
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { finalSection.classList.add('in'); obs.disconnect(); } });
    }, { threshold: 0.35 }).observe(finalSection);
  }

  // ---- Header: shrink after the first scroll ----
  var nav = document.querySelector('.nav');
  function onNav() { nav.classList.toggle('scrolled', scrollY > 24); }
  addEventListener('scroll', onNav, { passive: true });
  onNav();

  // ---- Hero till: the total rings up with each tapped item ----
  var total = document.querySelector('[data-count-to]');
  if (total && motionOK) {
    var steps = [[1250, 3600], [1650, 4800], [2050, 7400], [2450, 10400]];
    var shown = 0;
    total.textContent = tnd(0);
    steps.forEach(function (s) {
      setTimeout(function () {
        var from = shown, to = s[1], t0 = performance.now();
        shown = to;
        (function frame(now) {
          var k = clamp((now - t0) / 320, 0, 1);
          var eased = 1 - Math.pow(1 - k, 3);
          total.textContent = tnd(Math.round(from + (to - from) * eased));
          if (k < 1) requestAnimationFrame(frame);
        })(t0);
      }, s[0]);
    });
  }

  // ---- Pointer effects: spotlight, 3D tilt, magnetic buttons ----
  if (motionOK && finePointer) {
    document.querySelectorAll('.hero, .final').forEach(function (sec) {
      sec.addEventListener('pointermove', function (e) {
        var r = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        sec.style.setProperty('--my', (e.clientY - r.top) + 'px');
        sec.classList.add('lit');
      });
      sec.addEventListener('pointerleave', function () { sec.classList.remove('lit'); });
    });

    var visual = document.querySelector('.hero-visual');
    if (visual) {
      visual.addEventListener('pointermove', function (e) {
        var r = visual.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        visual.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
        visual.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
        visual.style.setProperty('--px', (x * 2).toFixed(3));
        visual.style.setProperty('--py', (y * 2).toFixed(3));
      });
      visual.addEventListener('pointerleave', function () {
        ['--rx', '--ry'].forEach(function (p) { visual.style.setProperty(p, '0deg'); });
        ['--px', '--py'].forEach(function (p) { visual.style.setProperty(p, '0'); });
      });
    }

    document.querySelectorAll('.hero-ctas .btn, .final .btn, .hw-copy .btn, .plan-main .btn').forEach(function (b) {
      b.classList.add('magnetic');
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        b.style.translate = (dx * 0.18).toFixed(1) + 'px ' + (dy * 0.3).toFixed(1) + 'px';
      });
      b.addEventListener('pointerleave', function () { b.style.translate = ''; });
    });
  }

  // ---- Ticker: seamless loop, with a pause control ----
  var ticker = document.querySelector('.ticker');
  var pauseBtn = document.querySelector('.ticker-pause');
  if (ticker) {
    var list = ticker.querySelector('.ticker-list');
    ticker.querySelector('.ticker-track').appendChild(list.cloneNode(true));
  }
  var TK = {
    fr: { pause: 'Mettre en pause le défilement', play: 'Relancer le défilement' },
    ar: { pause: 'إيقاف الشريط المتحرك', play: 'تشغيل الشريط المتحرك' }
  };
  function tickerLabel() {
    if (!pauseBtn) return;
    var t = TK[root.lang === 'ar' ? 'ar' : 'fr'];
    pauseBtn.textContent = ticker.classList.contains('paused') ? t.play : t.pause;
  }
  if (pauseBtn) {
    pauseBtn.removeAttribute('aria-pressed');
    pauseBtn.addEventListener('click', function () { ticker.classList.toggle('paused'); tickerLabel(); });
  }

  // ---- Pole displays: digits roll like a till display ----
  document.querySelectorAll('.odo').forEach(function (odo) {
    var value = odo.dataset.odo;
    odo.textContent = '';
    var spoken = document.createElement('span');
    spoken.className = 'sr';
    spoken.textContent = value;
    odo.appendChild(spoken);
    var reels = [];
    value.split('').forEach(function (ch, i) {
      if (/\d/.test(ch)) {
        var col = document.createElement('span');
        col.className = 'odo-col';
        col.setAttribute('aria-hidden', 'true');
        var reel = document.createElement('span');
        reel.className = 'odo-reel';
        for (var n = 0; n < 20; n++) {
          var d = document.createElement('span');
          d.textContent = n % 10;
          reel.appendChild(d);
        }
        reel.style.transitionDelay = (i * 90) + 'ms';
        reel.dataset.target = 10 + Number(ch);
        col.appendChild(reel);
        odo.appendChild(col);
        reels.push(reel);
      } else {
        var sep = document.createElement('span');
        sep.className = 'odo-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = ch === ' ' ? ' ' : ch;
        odo.appendChild(sep);
      }
    });
    function roll() { reels.forEach(function (r) { r.style.translate = '0 -' + (Number(r.dataset.target) * 1.1) + 'em'; }); }
    if (!motionOK) { roll(); return; }
    new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { roll(); obs.disconnect(); } });
    }, { threshold: 0.6 }).observe(odo);
  });

  // ---- Tabs: an indicator that slides to the chosen trade ----
  var tablist = document.querySelector('.tabs');
  function placeIndicator() {
    if (!tablist) return;
    var sel = tablist.querySelector('[aria-selected="true"]');
    if (!sel) return;
    tablist.style.setProperty('--x', sel.offsetLeft + 'px');
    tablist.style.setProperty('--y', sel.offsetTop + 'px');
    tablist.style.setProperty('--w', sel.offsetWidth + 'px');
    tablist.style.setProperty('--h', sel.offsetHeight + 'px');
  }
  if (tablist) {
    tablist.classList.add('has-ind');
    placeIndicator();
    new MutationObserver(placeIndicator).observe(tablist, { attributes: true, subtree: true, attributeFilter: ['aria-selected'] });
    if ('ResizeObserver' in window) new ResizeObserver(placeIndicator).observe(tablist);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeIndicator);
  }

  // ---- Hardware: pinned while you scroll, switching café, restaurant, épicerie ----
  var hw = document.getElementById('materiel');
  var track = hw && hw.querySelector('.hw-track');
  var trades = ['cafe', 'restaurant', 'epicerie'];
  var pinQuery = matchMedia('(min-width: 921px) and (min-height: 820px)');
  var manual = false;
  var lastIdx = -1;
  function setPin() { if (hw) hw.classList.toggle('hw-pinned', motionOK && pinQuery.matches); }
  if (hw) {
    setPin();
    if (pinQuery.addEventListener) pinQuery.addEventListener('change', setPin);
    hw.querySelectorAll('[data-hw]').forEach(function (b) { b.addEventListener('click', function () { manual = true; }); });
  }
  var ticking = false;
  function onHwScroll() {
    ticking = false;
    if (!hw || !hw.classList.contains('hw-pinned')) return;
    var r = track.getBoundingClientRect();
    var span = r.height - (innerHeight - 62);
    var p = clamp((62 - r.top) / span, 0, 1);
    hw.style.setProperty('--p', p.toFixed(3));
    var inside = r.top <= 62 && r.bottom >= innerHeight;
    if (!inside) { manual = false; lastIdx = -1; return; }
    var idx = Math.min(2, Math.floor(p * 3));
    if (!manual && idx !== lastIdx && api.setScene) { api.setScene(trades[idx]); }
    lastIdx = idx;
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onHwScroll); } }, { passive: true });
  addEventListener('resize', onHwScroll);

  // ---- Language switch rewrites text: rebuild what depends on it ----
  document.addEventListener('tunispos:lang', function () {
    splitWords(heroTitle);
    if (motionOK && finalTitle) splitWords(finalTitle);
    tickerLabel();
    requestAnimationFrame(placeIndicator);
  });
})();
