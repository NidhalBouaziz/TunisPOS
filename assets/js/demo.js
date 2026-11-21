/* Playable till: a small, honest demonstration of how TunisPOS rings up a sale.
   All money is kept in millimes (integers) so 1,800 + 1,200 is always 3,000. */
(function () {
  'use strict';

  var section = document.getElementById('essayer');
  if (!section) return;

  var root = document.documentElement;
  var lang = root.lang === 'ar' ? 'ar' : 'fr';
  var motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  var T = {
    fr: {
      add: 'Ajouter', remove: 'Retirer un', plus: 'Ajouter un', items: 'articles', item: 'article',
      exact: 'Montant exact', scan: 'Scanner un article', perKg: '/kg', kg: 'kg',
      cash: 'Espèces', change: 'Rendu', total: 'TOTAL', ticket: 'Ticket n°', table: 'Table T5 · Serveur : Sami',
      counter: 'Comptoir', shop: { cafe: 'CAFÉ EL WAHA', restaurant: 'RESTAURANT DAR EL BEY', epicerie: 'ÉPICERIE YASMINE' },
      thanks: 'Merci de votre visite !', demo: 'Ticket de démonstration',
      added: 'ajouté. Total', printed: 'Ticket imprimé. Rendu', emptied: 'Commande vidée.'
    },
    ar: {
      add: 'إضافة', remove: 'حذف واحد من', plus: 'إضافة واحد من', items: 'منتجات', item: 'منتج',
      exact: 'المبلغ بالضبط', scan: 'مسح منتج', perKg: '/كغ', kg: 'كغ',
      cash: 'Espèces', change: 'Rendu', total: 'TOTAL', ticket: 'Ticket n°', table: 'Table T5 · Serveur : Sami',
      counter: 'Comptoir', shop: { cafe: 'CAFÉ EL WAHA', restaurant: 'RESTAURANT DAR EL BEY', epicerie: 'ÉPICERIE YASMINE' },
      thanks: 'Merci de votre visite !', demo: 'Ticket de démonstration',
      added: 'أُضيف. المجموع', printed: 'طُبعت التذكرة. الباقي', emptied: 'أُفرغت الطلبية.'
    }
  }[lang];

  // Prices are examples. kg items add a weighed quantity in grams.
  var CATALOG = {
    cafe: [
      { id: 'express', n: 'Express', p: 1800, i: 'cup', c: '#6b3f1d' },
      { id: 'capucin', n: 'Capucin', p: 2000, i: 'cup', c: '#6b3f1d' },
      { id: 'direct', n: 'Direct', p: 2200, i: 'cup', c: '#6b3f1d' },
      { id: 'creme', n: 'Café crème', p: 2800, i: 'cup', c: '#6b3f1d' },
      { id: 'the', n: 'Thé à la menthe', p: 1200, i: 'glass', c: '#2f6b3a', f: '#cfe8c9' },
      { id: 'citron', n: 'Citronnade', p: 3000, i: 'glass', c: '#8a6a00', f: '#fbe7a1' },
      { id: 'orange', n: "Jus d'orange pressé", p: 3500, i: 'glass', c: '#a3480c', f: '#ffcf99' },
      { id: 'eau', n: 'Eau minérale 0,5 L', p: 1000, i: 'bottle', c: '#2b5a8a' },
      { id: 'croissant', n: 'Croissant', p: 1300, i: 'croissant', c: '#8a5a12' }
    ],
    restaurant: [
      { id: 'lablabi', n: 'Lablabi', p: 3500, i: 'bowl', c: '#8a4a12', f: '#f6d7a8' },
      { id: 'brik', n: "Brik à l'œuf", p: 3500, i: 'plate', c: '#8a5a12', f: '#f4c26b' },
      { id: 'salade', n: 'Salade tunisienne', p: 6000, i: 'plate', c: '#2f6b3a', f: '#9fd08f' },
      { id: 'ojja', n: 'Ojja merguez', p: 9000, i: 'bowl', c: '#9a2b1d', f: '#f29a7c' },
      { id: 'couscous', n: 'Couscous poulet', p: 12000, i: 'plate', c: '#8a6a00', f: '#f1d58a' },
      { id: 'escalope', n: 'Escalope panée', p: 16000, i: 'plate', c: '#8a5a12', f: '#e0a85a' },
      { id: 'sandwich', n: 'Sandwich tunisien', p: 6000, i: 'sandwich', c: '#6b3f1d' },
      { id: 'citron', n: 'Citronnade', p: 3000, i: 'glass', c: '#8a6a00', f: '#fbe7a1' },
      { id: 'eau15', n: 'Eau minérale 1,5 L', p: 1500, i: 'bottle', c: '#2b5a8a' }
    ],
    epicerie: [
      { id: 'scan', scan: true, i: 'scan', c: '#102A43' },
      { id: 'pates', n: 'Pâtes spaghetti 500 g', p: 1200, i: 'pack', c: '#8a6a00', f: '#fbe7a1' },
      { id: 'cafe', n: 'Café moulu 250 g', p: 6900, i: 'pack', c: '#5a3417', f: '#c79a72' },
      { id: 'lait', n: 'Lait demi-écrémé 1 L', p: 1450, i: 'carton', c: '#2b5a8a', f: '#dcebfa' },
      { id: 'sucre', n: 'Sucre blanc 1 kg', p: 2300, i: 'pack', c: '#56606b', f: '#ffffff' },
      { id: 'huile', n: "Huile d'olive 1 L", p: 18500, i: 'bottle', c: '#4c6b1e' },
      { id: 'harissa', n: 'Harissa 380 g', p: 2100, i: 'jar', c: '#9a1d1d', f: '#e2493b' },
      { id: 'pommes', n: 'Pommes', p: 2800, kg: 1500, i: 'apple', c: '#7a1f17' }
    ]
  };
  var SCANNABLE = [
    { id: 'eau15s', n: 'Eau minérale 1,5 L', p: 850, code: '6191513500515' },
    { id: 'biscuit', n: 'Biscuits 200 g', p: 1350, code: '6194002011288' },
    { id: 'tomate', n: 'Double concentré de tomates 400 g', p: 2600, code: '6191500110031' }
  ];

  function tnd(m) {
    var neg = m < 0; m = Math.abs(m);
    var dt = Math.floor(m / 1000), mil = String(m % 1000).padStart(3, '0');
    var dtStr = String(dt).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '−' : '') + dtStr + ',' + mil;
  }
  function kgText(g) { return (g / 1000).toFixed(3).replace('.', ',') + ' ⁨' + T.kg + '⁩'; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function icon(name, color, fill) {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.color = color;
    if (fill) svg.style.setProperty('--fill', fill);
    var use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#i-' + name);
    svg.appendChild(use);
    return svg;
  }

  var grid = section.querySelector('.demo-products');
  var linesEl = section.querySelector('.demo-lines');
  var emptyEl = section.querySelector('.demo-empty');
  var totalEl = section.querySelector('.demo-total');
  var countEl = section.querySelector('.demo-count');
  var payBtn = section.querySelector('.demo-pay');
  var clearBtn = section.querySelector('.demo-clear');
  var panel = section.querySelector('.demo-paypanel');
  var cashBox = section.querySelector('.demo-cash');
  var ppAmount = section.querySelector('.demo-pp-amount');
  var changeEl = section.querySelector('.demo-change-amount');
  var confirmBtn = section.querySelector('.demo-confirm');
  var backBtn = section.querySelector('.demo-back');
  var receipt = section.querySelector('.demo-receipt');
  var idle = section.querySelector('.demo-idle');
  var after = section.querySelector('.demo-after');
  var newBtn = section.querySelector('.demo-new');
  var live = section.querySelector('.demo-live');
  var clock = section.querySelector('.demo-clock');
  var modeBtns = section.querySelectorAll('[data-mode]');

  var mode = 'cafe';
  var cart = [];          // { item, qty (units or grams) }
  var given = 0;
  var ticketNo = 1;
  var locked = false;     // after printing, until "Nouvelle vente"

  function lineAmount(l) { return l.item.kg ? Math.round(l.item.p * l.qty / 1000) : l.item.p * l.qty; }
  function total() { return cart.reduce(function (s, l) { return s + lineAmount(l); }, 0); }

  function tick() {
    var d = new Date();
    clock.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  tick(); setInterval(tick, 30000);

  function renderProducts() {
    grid.textContent = '';
    CATALOG[mode].forEach(function (item) {
      var b = el('button', 'demo-tile' + (item.scan ? ' demo-tile-scan' : ''));
      b.type = 'button';
      b.appendChild(icon(item.i, item.c, item.f));
      if (item.scan) {
        b.appendChild(el('b', null, T.scan));
        b.appendChild(el('em', null, 'EAN-13'));
        b.addEventListener('click', scanItem);
      } else {
        b.appendChild(el('b', null, item.n));
        b.appendChild(el('em', null, tnd(item.p) + (item.kg ? ' TND' + T.perKg : ' TND')));
        b.addEventListener('click', function () { add(item, b); });
      }
      grid.appendChild(b);
    });
  }

  function bump(node) {
    if (!motionOK || !node) return;
    node.classList.remove('bump'); void node.offsetWidth; node.classList.add('bump');
  }

  function add(item, tile) {
    if (locked) newSale();
    var line = cart.find(function (l) { return l.item.id === item.id; });
    var step = item.kg || 1;
    if (line) line.qty += step; else cart.push({ item: item, qty: step });
    renderCart(item.id);
    bump(tile);
    live.textContent = item.n + ' ' + T.added + ' ' + tnd(total()) + ' TND';
  }

  function scanItem(e) {
    var tile = e.currentTarget;
    var item = SCANNABLE[Math.floor(Math.random() * SCANNABLE.length)];
    if (motionOK) {
      grid.classList.remove('scanning'); void grid.offsetWidth; grid.classList.add('scanning');
      tile.querySelector('em').textContent = item.code;
      setTimeout(function () { add(item, tile); }, 380);
    } else {
      tile.querySelector('em').textContent = item.code;
      add(item, tile);
    }
  }

  function changeQty(id, dir) {
    var line = cart.find(function (l) { return l.item.id === id; });
    if (!line) return;
    line.qty += dir * (line.item.kg || 1);
    if (line.qty <= 0) cart = cart.filter(function (l) { return l !== line; });
    renderCart(dir > 0 ? id : null);
  }

  function renderCart(flashId) {
    linesEl.textContent = '';
    cart.forEach(function (l) {
      var li = el('li', 'demo-line' + (l.item.id === flashId ? ' flash' : ''));
      var name = el('div', 'demo-line-name');
      name.appendChild(el('span', null, l.item.n));
      name.appendChild(el('small', null, l.item.kg ? kgText(l.qty) + ' × ' + tnd(l.item.p) : l.qty + ' × ' + tnd(l.item.p)));
      var q = el('div', 'demo-qty');
      var minus = el('button', null, '−'); minus.type = 'button';
      minus.setAttribute('aria-label', T.remove + ' ' + l.item.n);
      minus.addEventListener('click', function () { changeQty(l.item.id, -1); });
      var plus = el('button', null, '+'); plus.type = 'button';
      plus.setAttribute('aria-label', T.plus + ' ' + l.item.n);
      plus.addEventListener('click', function () { changeQty(l.item.id, 1); });
      q.appendChild(minus); q.appendChild(plus);
      li.appendChild(name);
      li.appendChild(q);
      li.appendChild(el('strong', 'demo-line-amt', tnd(lineAmount(l))));
      linesEl.appendChild(li);
    });
    var t = total();
    var units = cart.reduce(function (s, l) { return s + (l.item.kg ? 1 : l.qty); }, 0);
    totalEl.textContent = tnd(t);
    bump(totalEl);
    countEl.textContent = units + ' ' + (units > 1 ? T.items : T.item);
    emptyEl.hidden = cart.length > 0;
    payBtn.disabled = t === 0;
    clearBtn.disabled = cart.length === 0;
    linesEl.scrollTop = linesEl.scrollHeight;
  }

  function openPay() {
    var t = total();
    if (!t) return;
    given = 0;
    ppAmount.textContent = tnd(t) + ' TND';
    changeEl.textContent = '—';
    confirmBtn.disabled = true;
    cashBox.textContent = '';
    var options = [t];
    [5000, 10000, 20000, 50000, 100000].forEach(function (n) { if (n > t && options.length < 4) options.push(n); });
    options.forEach(function (amount, i) {
      var b = el('button', 'demo-cash-btn');
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.appendChild(el('span', null, i === 0 ? T.exact : (amount / 1000) + ' DT'));
      b.appendChild(el('small', null, tnd(amount)));
      b.addEventListener('click', function () {
        given = amount;
        cashBox.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        changeEl.textContent = tnd(given - t) + ' TND';
        bump(changeEl);
        confirmBtn.disabled = false;
      });
      cashBox.appendChild(b);
    });
    panel.hidden = false;
    cashBox.querySelector('button').focus();
  }

  function closePay() { panel.hidden = true; payBtn.focus(); }

  function row(left, right, cls) {
    var p = el('p', 'r-row' + (cls ? ' ' + cls : ''));
    p.appendChild(el('span', null, left));
    if (right != null) p.appendChild(el('span', null, right));
    return p;
  }

  function printTicket() {
    var t = total();
    var d = new Date();
    receipt.textContent = '';
    receipt.appendChild(el('p', 'r-center r-strong', T.shop[mode]));
    receipt.appendChild(el('p', 'r-center', T.demo));
    receipt.appendChild(el('p', 'r-rule'));
    receipt.appendChild(row(T.ticket + ' ' + String(ticketNo).padStart(4, '0'), String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0')));
    receipt.appendChild(row(mode === 'epicerie' ? T.counter : T.table, null));
    receipt.appendChild(el('p', 'r-rule'));
    cart.forEach(function (l) {
      var qty = l.item.kg ? kgText(l.qty) : l.qty + ' ×';
      receipt.appendChild(row(qty + ' ' + l.item.n, tnd(lineAmount(l))));
    });
    receipt.appendChild(el('p', 'r-rule'));
    receipt.appendChild(row(T.total, tnd(t) + ' TND', 'r-total'));
    receipt.appendChild(row(T.cash, tnd(given)));
    receipt.appendChild(row(T.change, tnd(given - t)));
    receipt.appendChild(el('p', 'r-rule'));
    var thanks = el('p', 'r-center');
    var ar = el('span', 'r-ar', 'شكرا على زيارتكم'); ar.lang = 'ar';
    thanks.appendChild(ar);
    thanks.appendChild(document.createTextNode(' · ' + T.thanks));
    receipt.appendChild(thanks);

    receipt.hidden = false;
    idle.hidden = true;
    receipt.classList.remove('printing'); void receipt.offsetWidth;
    if (motionOK) receipt.classList.add('printing');
    after.hidden = false;
    live.textContent = T.printed + ' ' + tnd(given - t) + ' TND';
    ticketNo += 1;
    locked = true;
    panel.hidden = true;
    after.querySelector('.btn').focus({ preventScroll: true });
  }

  function newSale() {
    cart = [];
    locked = false;
    renderCart();
    receipt.hidden = true;
    idle.hidden = false;
    after.hidden = true;
  }

  modeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (mode === b.dataset.mode) return;
      mode = b.dataset.mode;
      modeBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      newSale();
      renderProducts();
    });
  });
  payBtn.addEventListener('click', openPay);
  backBtn.addEventListener('click', closePay);
  confirmBtn.addEventListener('click', printTicket);
  clearBtn.addEventListener('click', function () { newSale(); live.textContent = T.emptied; });
  newBtn.addEventListener('click', function () { newSale(); grid.querySelector('button').focus(); });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePay(); });

  // A trade page opens the till on its own trade.
  var start = section.dataset.start;
  if (start && CATALOG[start]) {
    mode = start;
    modeBtns.forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.mode === start ? 'true' : 'false'); });
  }
  renderProducts();
  renderCart();
})();
