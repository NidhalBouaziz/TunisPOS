/* TunisPOS site behaviour */
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
      epicerie: 'Bonjour, je suis intéressé par TunisPOS Épicerie (690 DT).',
      cafe: 'Bonjour, je suis intéressé par TunisPOS Café (890 DT).',
      restaurant: 'Bonjour, je suis intéressé par TunisPOS Restaurant (1 190 DT).',
      mailSubject: 'TunisPOS : demande de démo'
    },
    ar: {
      demo: 'مرحبًا، أرغب في عرض تجريبي لبرنامج TunisPOS.',
      epicerie: 'مرحبًا، أنا مهتم بعرض TunisPOS بقالة (690 دينار).',
      cafe: 'مرحبًا، أنا مهتم بعرض TunisPOS مقهى (890 دينار).',
      restaurant: 'مرحبًا، أنا مهتم بعرض TunisPOS مطعم (1190 دينار).',
      mailSubject: 'TunisPOS: طلب عرض تجريبي'
    }
  };

  // ---- Arabic dictionary (French lives in the HTML) ----
  var AR = {
    'skip': 'انتقل إلى المحتوى',
    'menu': 'القائمة',
    'nav.cafe': 'مقهى',
    'nav.restaurant': 'مطعم',
    'nav.epicerie': 'بقالة',
    'nav.pricing': 'الأسعار',
    'nav.faq': 'أسئلة',
    'nav.cta': 'اطلب عرضًا تجريبيًا',
    'nav.modules': 'الوحدات',
    'nav.shots': 'لقطات الشاشة',
    'hero.kicker': 'برنامج نقطة بيع صُنع في تونس',
    'hero.title': 'صندوق يحسب حتى المليم.',
    'hero.lede': 'TunisPOS يشغّل المقاهي والمطاعم والبقالات: الطاولات والنُدُل، تذكرة المطبخ، الباركود والمخزون. دون إنترنت، بالعربية والفرنسية.',
    'hero.cta1': 'اطلب عرضًا تجريبيًا على واتساب',
    'hero.cta2': 'شاهد الأسعار',
    'hero.note': 'عرض تجريبي مجاني ودون التزام. التثبيت والتكوين مشمولان.',
    'hero.visual': 'معاينة صندوق TunisPOS في وضع المقهى',
    'f1.t': 'يعمل دون إنترنت',
    'f1.d': 'مثبّت على حاسوبك بنظام Windows. انقطاع الشبكة لا يوقف الصندوق أبدًا.',
    'f2.t': 'العربية والفرنسية والإنجليزية',
    'f2.d': 'كل شاشة تغيّر لغتها بنقرة واحدة، والتذاكر أيضًا.',
    'f3.t': 'الدينار بثلاثة أرقام عشرية',
    'f3.d': '1,800 دينار وليس 1,80. المليمات صحيحة من التذكرة إلى التقرير.',
    'f4.t': 'نسخ احتياطي على مفتاح USB',
    'f4.d': 'أربع عشرة نسخة محفوظة. عطل الحاسوب لا يُضيّع محلّك.',
    'm.title': 'وحدة لكل مهنة.',
    'm.lede': 'عند التثبيت نختار المهنة. يحمّل TunisPOS القائمة أو الكتالوج، يضبط الصندوق، ويترك لك تحديد أسعارك.',
    'm.tabs': 'المهن',
    'm.t1': 'مقهى',
    'm.t1s': 'طاولات، نُدُل، تذكرة البار',
    'm.t2': 'مطعم',
    'm.t2s': 'قائمة، تذكرة المطبخ، تقسيم الحساب',
    'm.t3': 'بقالة ومتجر صغير',
    'm.t3s': 'باركود، كتالوج، مخزون',
    'c.h': 'المقهى، من الشرفة إلى المنضدة.',
    'c.1': '<strong>مخطط القاعة.</strong> الطاولات الشاغرة بالأخضر، والمشغولة بالبرتقالي مع اسم النادل والمبلغ الجاري.',
    'c.2': '<strong>تذكرة البار.</strong> مع كل إرسال، يستلم البار المشروبات الجديدة فقط، دون أسعار.',
    'c.3': '<strong>تقسيم الحساب.</strong> «دفع جزء»: كلٌّ يدفع ما استهلكه.',
    'c.4': '<strong>المبيعات حسب النادل.</strong> في المساء تعرف من باع ماذا.',
    'c.5': '<strong>قائمة مقهى جاهزة.</strong> 25 منتجًا في 6 عائلات مع الصور. أكثر 12 منتجًا مبيعًا مثبّتة في أعلى الصندوق.',
    'r.h': 'نقرة على «إرسال»، وكل قسم يستلم تذكرته.',
    'r.1': '<strong>تذكرة المطبخ وتذكرة البار.</strong> الأطباق تذهب إلى المطبخ والمشروبات إلى البار. أنت تختار أيّ قسم يستلم أيّ عائلة.',
    'r.2': '<strong>قائمة تونسية جاهزة.</strong> 39 طبقًا في 6 عائلات، من المقبلات إلى المشويات، مع الصور والأسعار المعتادة لمطعم حيّ.',
    'r.3': '<strong>الطابعات تُكتشف تلقائيًا.</strong> بحث في الشبكة، زرّ «طباعة تجربة»، وانتهى الأمر.',
    'r.4': '<strong>وحدة المقهى كاملة مشمولة.</strong> الطاولات، النُدُل، تقسيم الحساب والمبيعات حسب النادل.',
    'r.5': '<strong>أسعار سريعة.</strong> القائمة كلها في صفحة واحدة: غيّر أسعارك في دقيقة.',
    'e.h': 'افتح غدًا، ورفوفك موجودة في الصندوق مسبقًا.',
    'e.1': '<strong>كتالوجات جاهزة.</strong> بقالة، مساحة كبرى (2 934 منتجًا) أو مرطبات، تُحمَّل في دقائق. الأسعار المعتادة لـ400 منتج شائع معبّأة مسبقًا.',
    'e.2': '<strong>قارئ الباركود والبيع بالكيلو.</strong> امسح، أو اكتب 1,5 كغ تفاح: الصندوق يحسب.',
    'e.3': '<strong>استيراد من Excel.</strong> تجربة أولى تُظهر كل خطأ قبل إنشاء أي شيء. «1,250» و«3,200 DT» تُفهم جيدًا.',
    'e.4': '<strong>ملصقات الرفوف.</strong> باركود EAN-13، على طابعة ملصقات أو ورقة A4 من 24 ملصقًا.',
    'e.5': '<strong>مخزون تحت السيطرة.</strong> جرد موجَّه، تنبيهات تواريخ انتهاء الصلاحية، الأكثر مبيعًا وغير المباع.',
    'ro.title': 'لكلٍّ دوره، ولكلٍّ شاشاته.',
    'ro.lede': 'الكاشير يقبض. المسؤول يأذن. المالك يرى كل شيء. لا شيء يخرج من الصندوق دون أثر.',
    'ro.1.t': 'الكاشير',
    'ro.1.d': 'يفتح صندوقه برصيد البداية، يقبض، يرى المبلغ الواجب إرجاعه، ويُغلق بعدّ نقوده. لا يصل إلى التقارير ولا إلى الإعدادات.',
    'ro.2.t': 'المسؤول',
    'ro.2.d': 'رمزه الشخصي يأذن بالإلغاءات والتخفيضات. يقوم بالجرد، يطبع الملصقات ويحدّث الأسعار.',
    'ro.3.t': 'المالك',
    'ro.3.d': 'تقرير اليوم، المبيعات حسب النادل، الأكثر مبيعًا وغير المباع. كل عملية حساسة تُسجَّل مع صاحبها والوقت.',
    'ro.4.t': 'حاسوب المحل',
    'ro.4.d': 'نسخ احتياطي تلقائي على مفتاح USB. صفحة «صحة النظام» تُظهر عمر آخر نسخة والمساحة المتاحة قبل وقوع أي مشكلة.',
    'g.title': 'البرنامج الحقيقي، لا نموذج تصميم.',
    'g.lede': 'هذه اللقطات مأخوذة من TunisPOS كما يعمل اليوم.',
    'g.aria': 'لقطات الشاشة',
    'g.prev': 'اللقطة السابقة',
    'g.next': 'اللقطة التالية',
    'g.1': 'صندوق المقهى: المشروبات الأكثر مبيعًا مثبّتة في الأعلى.',
    'g.2': 'مخطط القاعة: الطاولة T5 مشغولة من سامي، 21,000 دينار.',
    'g.3': 'الصندوق نفسه بالعربية، من اليمين إلى اليسار.',
    'g.4': 'الطابعات: كل عائلة إلى قسمها.',
    'g.5': 'قائمة المطعم محمّلة: 39 طبقًا بنقرة واحدة.',
    'g.6': 'الكتالوج محمّل، مع قائمة خطوات الانطلاق.',
    'g.7': 'المبيعات حسب النادل، يومًا بيوم.',
    's.title': 'من العرض التجريبي إلى أول تذكرة.',
    's.1.t': 'عرض على واتساب',
    's.1.d': 'نريك صندوق مهنتك بمنتجاتك، عن بُعد أو في محلك.',
    's.2.t': 'التثبيت',
    's.2.d': 'على حاسوبك بنظام Windows، مع قائمة أو كتالوج مهنتك محمّلًا وطابعاتك مضبوطة.',
    's.3.t': 'التكوين',
    's.3.d': 'الكاشير والمسؤول، كلٌّ على شاشاته، حتى يعمل الصندوق دونك.',
    's.4.t': 'ابدأ البيع',
    's.4.d': 'ونبقى في الخدمة: اثنا عشر شهرًا من الدعم والتحديثات مشمولة.',
    'p.title': 'سعر واضح، يُدفع مرة واحدة.',
    'p.lede': 'رخصة لصندوق واحد، مع التثبيت والتكوين. لا اشتراك إجباري.',
    'p.once': 'دفعة واحدة · صندوق واحد',
    'p.inc': 'التثبيت، التكوين، 12 شهرًا من الدعم',
    'p.cta': 'اختر هذا العرض',
    'p.flag': 'الأكثر اكتمالًا',
    'p.1.t': 'بقالة',
    'p.1.f': 'البقالات، المتاجر الصغيرة، المواد الغذائية العامة',
    'p.1.1': 'كتالوجات جاهزة: بقالة، مساحة كبرى، مرطبات',
    'p.1.2': 'قارئ باركود، بيع بالكيلو، المبلغ الواجب إرجاعه',
    'p.1.3': 'استيراد من Excel مع تجربة مسبقة',
    'p.1.4': 'ملصقات باركود EAN-13',
    'p.1.5': 'الجرد وتواريخ انتهاء الصلاحية',
    'p.2.t': 'مقهى',
    'p.2.f': 'المقاهي وقاعات الشاي',
    'p.2.1': 'مخطط القاعة والشرفة',
    'p.2.2': 'النُدُل والمبيعات حسب النادل',
    'p.2.3': 'تذكرة البار دون أسعار',
    'p.2.4': 'تقسيم الحساب',
    'p.2.5': 'قائمة مقهى جاهزة، مشروبات مثبّتة',
    'p.3.t': 'مطعم',
    'p.3.f': 'المطاعم، الأكلات السريعة، محلات البيتزا',
    'p.3.1': 'وحدة المقهى كاملة مشمولة',
    'p.3.2': 'تذكرة المطبخ وتذكرة البار',
    'p.3.3': 'كل عائلة إلى طابعتها',
    'p.3.4': 'قائمة تونسية جاهزة: 39 طبقًا',
    'p.3.5': 'أسعار سريعة لكامل القائمة',
    'p.x1': '<strong>بعد السنة الأولى:</strong> الدعم والتحديثات بـ290 دينارًا في السنة، إن رغبت. الصندوق يواصل العمل دونها.',
    'p.x2': '<strong>حزمة المعدات:</strong> شاشة لمس، طابعة تذاكر 80 مم، درج نقود، قارئ باركود. السعر حسب الطلب، أو نثبّت على معداتك.',
    'q.title': 'أسئلتكم وأجوبتنا.',
    'q.lede': 'سؤال آخر؟ راسلنا على واتساب، نجيب بالعربية أو بالفرنسية.',
    'q.1.q': 'هل يلزم اتصال بالإنترنت؟',
    'q.1.a': 'لا. يُثبَّت TunisPOS على حاسوب المحل ويعمل دون اتصال. مبيعاتك وبياناتك تبقى عندك.',
    'q.2.q': 'ما المعدات التي أحتاجها؟',
    'q.2.a': 'حاسوب بنظام Windows 10 أو 11 (64 بت)، طابعة تذاكر 80 مم أو 58 مم، وحسب مهنتك قارئ باركود ودرج نقود. يمكننا أيضًا توفير حزمة كاملة.',
    'q.3.q': 'الكاشير عندي يتكلم العربية، هل يناسبه؟',
    'q.3.a': 'نعم. الواجهة متوفرة بالعربية والفرنسية والإنجليزية، وتنتقل بينها بنقرة واحدة.',
    'q.4.q': 'لديّ قائمة منتجاتي في Excel.',
    'q.4.a': 'ممتاز. الاستيراد يقرأ ملفات Excel أو CSV، يقوم أولًا بتجربة تُظهر كل خطأ، ثم يُنشئ ما ينقص فقط. إعادة نفس الملف لا تضيف أي تكرار.',
    'q.5.q': 'كيف أتجنّب الإلغاءات غير المبرَّرة؟',
    'q.5.a': 'الإلغاء أو التخفيض يتطلب الرمز الشخصي لمسؤول، وكل عملية تُسجَّل مع صاحبها والوقت. الكاشير لا يرى التقارير.',
    'q.6.q': 'وإذا تعطّل الحاسوب؟',
    'q.6.a': 'النسخ الاحتياطي التلقائي على مفتاح USB يحتفظ بأربع عشرة نسخة. نعيد التثبيت على حاسوب آخر ونسترجع آخر نسخة.',
    'q.7.q': 'هل يعوّض TunisPOS الصندوق الجبائي NACEF؟',
    'q.7.a': 'ليس حاليًا: TunisPOS ليس صندوقًا مصادقًا عليه من NACEF. إذا كان محلك يقدّم الاستهلاك في عين المكان ومُلزمًا بصندوق جبائي، اسأل محاسبك عمّا ينطبق عليك، ولنتحدث قبل الشراء.',
    'q.8.q': 'ماذا يحدث بعد الاثني عشر شهرًا؟',
    'q.8.a': 'رخصتك لا تتوقف. يمكنك تمديد الدعم والتحديثات بـ290 دينارًا في السنة، أو المواصلة دونها.',
    'z.title': 'شاهد صندوقك يعمل قبل أن تدفع.',
    'z.lede': 'أخبرنا بمهنتك: نحضّر لك عرضًا بقائمتك أو منتجاتك.',
    'z.cta1': 'راسلنا على واتساب',
    'z.cta2': 'أرسل بريدًا إلكترونيًا',
    'footer.aria': 'تذييل الصفحة',
    'close': 'إغلاق'
  };
  var TITLES = {
    fr: document.title,
    ar: 'TunisPOS · برنامج صندوق للمقاهي والمطاعم والبقالات في تونس'
  };

  var root = document.documentElement;
  var FR = {};       // originals captured from the HTML
  var lang = 'fr';

  function store(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; }
  }

  function captureFrench() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) { FR['t:' + el.dataset.i18n] = FR['t:' + el.dataset.i18n] || el.textContent; });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { FR['h:' + el.dataset.i18nHtml] = el.innerHTML; });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { FR['a:' + el.dataset.i18nAria] = FR['a:' + el.dataset.i18nAria] || el.getAttribute('aria-label'); });
  }

  function applyLang(next) {
    lang = next === 'ar' ? 'ar' : 'fr';
    var ar = lang === 'ar';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.dataset.i18n;
      el.textContent = ar && AR[k] ? AR[k] : FR['t:' + k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.dataset.i18nHtml;
      el.innerHTML = ar && AR[k] ? AR[k] : FR['h:' + k];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var k = el.dataset.i18nAria;
      el.setAttribute('aria-label', ar && AR[k] ? AR[k] : FR['a:' + k]);
    });
    root.lang = lang;
    root.dir = ar ? 'rtl' : 'ltr';
    document.title = TITLES[lang];
    document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
      b.textContent = ar ? 'Français' : 'العربية';
      b.lang = ar ? 'fr' : 'ar';
    });
    updateContactLinks();
    store('tunispos-lang', lang);
  }

  function waHref(kind) {
    var msg = (WA_MSG[lang] && WA_MSG[lang][kind]) || WA_MSG[lang].demo;
    return 'https://wa.me/' + CONTACT.phone + '?text=' + encodeURIComponent(msg);
  }

  function updateContactLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waHref(a.dataset.wa); });
    document.querySelectorAll('[data-mail]').forEach(function (a) {
      a.href = 'mailto:' + email + '?subject=' + encodeURIComponent(WA_MSG[lang].mailSubject);
    });
    document.querySelectorAll('[data-mail-text]').forEach(function (s) { s.textContent = email; });
    document.querySelectorAll('[data-phone-text]').forEach(function (s) { s.textContent = CONTACT.phoneDisplay; });
  }

  // ---- Tabs ----
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selectTab(name, focus) {
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

  // ---- Language ----
  document.querySelectorAll('[data-lang-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(lang === 'ar' ? 'fr' : 'ar'); });
  });

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

  // ---- Init ----
  captureFrench();
  var param = new URLSearchParams(location.search).get('lang');
  var initial = param || store('tunispos-lang') || 'fr';
  applyLang(initial);
})();
