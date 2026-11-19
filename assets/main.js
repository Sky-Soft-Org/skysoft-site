/* ==========================================================
   Sky Soft — homepage draft interactions
   - AR/EN toggle (English text lives in the HTML, Arabic below)
   - hero word rotator, parallax, count-ups, scroll reveals
   - Sky Reports auto-playing tabs, marketplace theme switcher
   ========================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Arabic dictionary ---------------- */
  const AR = {
    'nav.products': 'المنتجات',
    'nav.reports': 'سكاي ريبورتس',
    'nav.market': 'المتاجر الإلكترونية',
    'nav.why': 'لماذا سكاي سوفت',
    'nav.contact': 'تواصل معنا',
    'nav.demo': 'احجز عرضاً تجريبياً',

    'hero.pill': 'محاسبة · تقارير · تجارة إلكترونية',
    'hero.t1': 'سماء واحدة تجمع',
    'hero.lead': 'تقدّم سكاي سوفت برامج محاسبة متكاملة، ومنصة ويب للحسابات والعمليات والفواتير، ومتاجر إلكترونية مخصّصة لعلامتك — لتعمل كل أقسام شركتك من صورة واحدة واضحة.',
    'hero.cta1': 'استكشف منتجاتنا',
    'hero.cta2': 'احجز عرضاً مجانياً',
    'hero.tr1': 'عربي وإنجليزي',
    'hero.tr2': 'سطح المكتب والسحابة',
    'hero.tr3': 'فريق دعم محلي',

    'dash.title': 'نظرة عامة',
    'dash.sales': 'المبيعات',
    'dash.exp': 'المصروفات',
    'dash.net': 'صافي الربح',
    'dash.chart': 'الإيرادات الشهرية',
    'float.inv': 'فاتورة رقم 1042',
    'float.paid': 'تم السداد الآن',
    'float.order': 'طلب جديد +1',
    'float.store': 'متجر Sky Wear الإلكتروني',
    'float.stock': 'تمت مزامنة المخزون',
    'float.wh': '3 مخازن · مباشر',

    'stat.clients': 'منشأة تثق بنا',
    'stat.years': 'عاماً من الخبرة',
    'stat.platforms': 'منصات مترابطة',
    'stat.support': 'دعم وتحديثات مستمرة',
    'marquee.label': 'حلول تخدم مختلف القطاعات',

    'prod.eyebrow': 'منتجاتنا',
    'prod.title': 'ثلاث منصات. أعمال واحدة مترابطة.',
    'prod.sub': 'ابدأ بالحل الذي تحتاجه اليوم وأضف البقية مع نموّك — كل منصاتنا تعمل معاً بانسجام.',
    'learn': 'اعرف المزيد',
    'p1.tag': 'برنامج سطح المكتب',
    'p1.title': 'سكاي سوفت للمحاسبة',
    'p1.desc': 'نظام محاسبة ومخازن متكامل لمكتبك — فواتير وسندات ومخازن وتقارير مالية كاملة.',
    'p1.f1': 'فواتير المبيعات والمشتريات',
    'p1.f2': 'مخازن متعددة والتحويل بينها',
    'p1.f3': 'العملاء والموردون والصناديق',
    'p1.f4': 'صلاحيات المستخدمين ومتابعة العمليات',
    'p2.badge': 'منصة ويب',
    'p2.tag': 'حسابات · عمليات · فواتير',
    'p2.desc': 'حساباتك وعملياتك وفواتيرك من المتصفح — لوحات تحكم لحظية من أي مكان وعلى أي جهاز.',
    'p2.f1': 'لوحات تحكم ومؤشرات لحظية',
    'p2.f2': 'فوترة عبر الإنترنت',
    'p2.f3': 'متابعة العمليات والمخزون',
    'p2.f4': 'وصول من أي جهاز',
    'p3.tag': 'تجارة إلكترونية',
    'p3.title': 'سكاي ماركت',
    'p3.desc': 'منصة متاجر إلكترونية نفصّلها لك — واجهة API مهيّأة لأنظمتك وتصميم مبني حول منتجاتك.',
    'p3.f1': 'تصميم مخصّص لعلامتك التجارية',
    'p3.f2': 'ربط API مع أنظمتك',
    'p3.f3': 'المنتجات والطلبات والمدفوعات',
    'p3.f4': 'متزامن مع حساباتك',

    'rep.title': 'أعمالك كلها، مباشرة في متصفحك.',
    'rep.sub': 'منصة ويب واحدة للحسابات والعمليات والفواتير — محدّثة دائماً أينما كنت.',
    'acc.h': 'حسابات منضبطة تلقائياً',
    'acc.p': 'القيود والأرصدة وكشوف الحسابات تتحدّث مع كل عملية — بلا مفاجآت في نهاية الشهر.',
    'ops.h': 'كل مخازنك في شاشة واحدة',
    'ops.p': 'تابع المخزون والتحويلات وأداء الفروع لحظياً، مع تنبيهات قبل نفاد الأصناف.',
    'inv.h': 'فواتير في ثوانٍ',
    'inv.p': 'أنشئ فواتيرك وأرسلها وتابعها إلكترونياً، واعرف من سدّد بنظرة واحدة.',
    'acc.t': 'أرصدة الحسابات',
    'chip.month': 'هذا الشهر',
    'chip.live': 'مباشر',
    'acc.cash': 'الصندوق',
    'acc.bank': 'البنك',
    'acc.cust': 'العملاء',
    'acc.sup': 'الموردون',
    'acc.total': 'الإجمالي',
    'ops.t': 'المخزون حسب المخزن',
    'ops.w1': 'المخزن الرئيسي',
    'ops.w2': 'فرع وسط البلد',
    'ops.w3': 'فرع المول',
    'ops.alert': 'أصناف قاربت على النفاد: 4 في فرع المول',
    'ops.tr': 'تحويل · 120 قطعة',
    'inv.t': 'فاتورة مبيعات',
    'inv.to': 'العميل',
    'inv.l1': 'تيشيرت قطني × 24',
    'inv.l2': 'جاكيت جينز × 10',
    'inv.l3': 'حذاء رياضي × 6',
    'inv.total': 'الإجمالي',
    'inv.paid': 'مدفوعة',

    'mk.eyebrow': 'منصة المتاجر الإلكترونية',
    'mk.title': 'متجرك. علامتك. ومحرّكنا.',
    'mk.sub': 'نخصّص المنصة لكل عميل: نهيّئ الـ API ليتكامل مع أنظمتك الحالية، ونصمّم الواجهة حول منتجاتك. اختر نشاطاً وشاهد التغيير:',
    'mk.p1': 'تصميم مفصّل على منتجاتك',
    'mk.p2': 'تكامل API مع أنظمتك الحالية',
    'mk.p3': 'الطلبات تصل مباشرة إلى حساباتك',
    'mk.n1': 'أنظمتك',
    'mk.n3': 'متجرك',
    'mk.shop': 'تسوّق الآن',

    'why.eyebrow': 'لماذا سكاي سوفت',
    'why.title': 'صُمّم ليناسب طريقة عملك',
    'w1.h': 'عربي أولاً وثنائي اللغة',
    'w1.p': 'واجهات وفواتير وتقارير بالعربية والإنجليزية.',
    'w2.h': 'سطح المكتب + السحابة',
    'w2.p': 'اعمل من المكتب على سطح المكتب، ومن أي مكان عبر الإنترنت.',
    'w3.h': 'تقارير لحظية',
    'w3.p': 'قرارات مبنية على أرقام اليوم، لا الشهر الماضي.',
    'w4.h': 'أمان من الأساس',
    'w4.p': 'صلاحيات حسب الدور، نسخ احتياطي، وسجل كامل للعمليات.',
    'w5.h': 'مخصّص لك',
    'w5.p': 'نكيّف الخصائص والـ API والتصميم حسب نشاطك.',
    'w6.h': 'دعم يستجيب',
    'w6.p': 'فريق محلي للتركيب والتدريب والمساعدة اليومية.',

    'proc.eyebrow': 'كيف نعمل',
    'proc.title': 'من أول اتصال حتى الإطلاق',
    's1.h': 'نفهم احتياجك',
    's1.p': 'ندرس سير عملك ومنتجاتك وأهدافك.',
    's2.h': 'نخصّص',
    's2.p': 'نهيّئ البرنامج والـ API والتصميم لك.',
    's3.h': 'نطلق',
    's3.p': 'ننقل بياناتك ونجهّز النظام وندرّب فريقك.',
    's4.h': 'ننمو معك',
    's4.p': 'تحديثات ودعم مستمر مع توسّع أعمالك.',

    'cta.title': 'مستعد لترى أعمالك من الأعلى؟',
    'cta.sub': 'احجز عرضاً مجانياً وسنريك حل سكاي سوفت المناسب لأعمالك.',
    'cta.b1': 'احجز عرضاً مجانياً',
    'cta.b2': 'تواصل عبر واتساب',

    'foot.about': 'برامج محاسبة، ومنصة تقارير ويب، ومتاجر إلكترونية مخصّصة للشركات الطموحة.',
    'foot.company': 'الشركة',
    'foot.about2': 'من نحن',
    'foot.partners': 'الشركاء',
    'foot.careers': 'الوظائف',
    'foot.addr': 'المدينة، الدولة',
    'foot.copy': '© 2026 سكاي سوفت. جميع الحقوق محفوظة.',
  };

  const ROTATE = {
    en: ['accounting', 'invoicing', 'inventory', 'reports', 'online store'],
    ar: ['حساباتك', 'فواتيرك', 'مخازنك', 'تقاريرك', 'متجرك الإلكتروني'],
  };
  const INDUSTRIES = {
    en: ['Retail', 'Fashion', 'Wholesale', 'Restaurants', 'Pharmacies', 'Distribution', 'Electronics', 'Services', 'Manufacturing', 'Supermarkets'],
    ar: ['التجزئة', 'الأزياء', 'الجملة', 'المطاعم', 'الصيدليات', 'التوزيع', 'الإلكترونيات', 'الخدمات', 'التصنيع', 'السوبرماركت'],
  };
  const THEMES = [
    { c: '#E8457A', c2: '#FF9BB8', tint: '#FFF0F5', logo: 'S', url: 'skywear.store', hero: '🧥',
      label: { en: 'Fashion', ar: 'أزياء' }, name: { en: 'Sky Wear', ar: 'سكاي وير' },
      kicker: { en: 'New in', ar: 'وصل حديثاً' }, banner: { en: 'New season collection', ar: 'تشكيلة الموسم الجديد' },
      items: [['👕', 'Cotton tee', 'تيشيرت قطني', '89'], ['👟', 'Sneakers', 'حذاء رياضي', '319'], ['👜', 'Leather bag', 'حقيبة جلد', '249'], ['🧢', 'Classic cap', 'كاب كلاسيك', '59']] },
    { c: '#2B6CF2', c2: '#3BB2F6', tint: '#EAF2FF', logo: 'V', url: 'volt.store', hero: '🎧',
      label: { en: 'Electronics', ar: 'إلكترونيات' }, name: { en: 'Volt', ar: 'فولت' },
      kicker: { en: 'This week', ar: 'هذا الأسبوع' }, banner: { en: 'Smart deals on smart tech', ar: 'عروض ذكية على أجهزة ذكية' },
      items: [['📱', 'Smartphone', 'هاتف ذكي', '2,499'], ['💻', 'Laptop', 'لابتوب', '3,899'], ['⌚', 'Smartwatch', 'ساعة ذكية', '799'], ['🎧', 'Headphones', 'سماعات', '449']] },
    { c: '#16A34A', c2: '#86EFAC', tint: '#ECFDF3', logo: 'G', url: 'greenbasket.store', hero: '🥑',
      label: { en: 'Grocery', ar: 'بقالة' }, name: { en: 'Green Basket', ar: 'السلة الخضراء' },
      kicker: { en: 'Delivered today', ar: 'توصيل اليوم' }, banner: { en: 'Fresh every morning', ar: 'طازج كل صباح' },
      items: [['🍎', 'Apples 1kg', 'تفاح 1 كجم', '12'], ['🥖', 'Fresh bread', 'خبز طازج', '6'], ['🧀', 'Cheese', 'جبنة', '24'], ['🍯', 'Honey', 'عسل', '45']] },
    { c: '#8B5CF6', c2: '#E9A8FF', tint: '#F5F0FF', logo: 'G', url: 'glow.store', hero: '💄',
      label: { en: 'Beauty', ar: 'تجميل' }, name: { en: 'Glow', ar: 'جلو' },
      kicker: { en: 'Best sellers', ar: 'الأكثر مبيعاً' }, banner: { en: 'Glow up for less', ar: 'إشراقة بأقل تكلفة' },
      items: [['💄', 'Lipstick', 'أحمر شفاه', '79'], ['🧴', 'Moisturizer', 'مرطّب', '119'], ['🌸', 'Perfume', 'عطر', '349'], ['💅', 'Nail kit', 'طقم أظافر', '65']] },
  ];

  /* ---------------- i18n ---------------- */
  const i18nNodes = $$('[data-i18n]');
  i18nNodes.forEach(n => { n.dataset.en = n.innerHTML; });
  let lang = 'en';
  let themeIdx = 0;

  function setLang(next) {
    lang = next;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    i18nNodes.forEach(n => {
      const key = n.dataset.i18n;
      if (lang === 'ar' && !(key in AR)) console.warn('Missing AR key:', key);
      n.innerHTML = lang === 'ar' ? (AR[key] ?? n.dataset.en) : n.dataset.en;
    });
    const label = $('#langLabel');
    label.textContent = lang === 'ar' ? 'English' : 'العربية';
    label.className = lang === 'ar' ? 'en' : 'ar';
    document.title = lang === 'ar'
      ? 'سكاي سوفت — حلول المحاسبة والتقارير والتجارة الإلكترونية'
      : 'Sky Soft — Accounting, Reporting & Commerce Platforms';
    buildMarquee();
    buildSwatches();
    renderStore(themeIdx, false);
    restartRotator();
    try { localStorage.setItem('skysoft-lang', lang); } catch (e) { /* storage unavailable */ }
  }
  $('#langBtn').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));

  /* ---------------- Header & progress ---------------- */
  const header = $('#header');
  const progress = $('#scrollProgress');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 10);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $('#menuBtn').addEventListener('click', () => header.classList.toggle('open'));
  $$('#nav a').forEach(a => a.addEventListener('click', () => header.classList.remove('open')));

  /* ---------------- Rotating hero word ---------------- */
  const rotator = $('#rotator');
  let rotIdx = 0, rotTimer;
  function showWord(word) { rotator.innerHTML = `<span class="w">${word}</span>`; }
  function restartRotator() {
    clearInterval(rotTimer);
    rotIdx = 0;
    showWord(ROTATE[lang][0]);
    if (reduceMotion) return;
    rotTimer = setInterval(() => {
      const cur = $('.w', rotator);
      cur.classList.add('out');
      setTimeout(() => {
        rotIdx = (rotIdx + 1) % ROTATE[lang].length;
        showWord(ROTATE[lang][rotIdx]);
      }, 420);
    }, 2600);
  }

  /* ---------------- Marquee ---------------- */
  function buildMarquee() {
    const items = INDUSTRIES[lang].map(t => `<span lang="${lang}">${t}</span>`).join('');
    $('#track').innerHTML = items + items; // duplicated for a seamless loop
  }

  /* ---------------- Count-up ---------------- */
  function countUp(el) {
    const target = +el.dataset.count;
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    const dur = 1600, t0 = performance.now();
    const fmt = v => pre + Math.round(v).toLocaleString('en-US') + suf;
    if (reduceMotion) { el.textContent = fmt(target); return; }
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      $$('[data-count]', e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------------- Hero visual ---------------- */
  const visual = $('#heroVisual');
  setTimeout(() => {
    visual.classList.add('in');
    $$('[data-count]', visual).forEach(countUp);
  }, 350);

  if (!reduceMotion && matchMedia('(pointer: fine)').matches) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const r = visual.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      visual.style.setProperty('--mx', Math.max(-1, Math.min(1, x)).toFixed(3));
      visual.style.setProperty('--my', Math.max(-1, Math.min(1, y)).toFixed(3));
    });
    hero.addEventListener('pointerleave', () => {
      visual.style.setProperty('--mx', 0);
      visual.style.setProperty('--my', 0);
    });
  }

  /* ---------------- Sky Reports tabs ---------------- */
  const tabsEl = $('#tabs');
  const tabs = $$('.tab', tabsEl);
  const panels = $$('.panel');
  function activate(i) {
    tabs.forEach((t, k) => t.classList.toggle('active', k === i));
    panels.forEach((p, k) => p.classList.toggle('active', k === i));
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => { tabsEl.classList.add('manual'); activate(i); });
    $('.prog', t).addEventListener('animationend', () => activate((i + 1) % tabs.length));
  });
  new IntersectionObserver(([e]) => tabsEl.classList.toggle('playing', e.isIntersecting), { threshold: 0.3 })
    .observe($('#reports'));

  /* ---------------- Marketplace theme switcher ---------------- */
  function buildSwatches() {
    $('#swatches').innerHTML = THEMES.map((t, i) =>
      `<button type="button" class="sw${i === themeIdx ? ' active' : ''}" style="--c:${t.c}" data-i="${i}"><i></i>${t.label[lang]}</button>`
    ).join('');
    $$('.sw').forEach(b => b.addEventListener('click', () => {
      themeIdx = +b.dataset.i;
      $$('.sw').forEach(s => s.classList.toggle('active', s === b));
      renderStore(themeIdx, true);
    }));
  }
  let cart = 2;
  function renderStore(i, animate) {
    const t = THEMES[i];
    const store = $('#store');
    store.style.setProperty('--accent', t.c);
    store.style.setProperty('--accent2', t.c2);
    store.style.setProperty('--tint', t.tint);
    $('#storeLogo').textContent = t.logo;
    $('#storeName').textContent = t.name[lang];
    $('#storeUrl').textContent = t.url;
    $('#storeKicker').textContent = t.kicker[lang];
    $('#storeBanner').textContent = t.banner[lang];
    $('#storeHero').textContent = t.hero;
    const grid = $('#storeGrid');
    grid.innerHTML = t.items.map(([emo, en, ar, price], k) => `
      <div class="prod" style="--i:${animate ? k : 0};${animate ? '' : 'animation:none'}">
        <div class="th">${emo}</div>
        <b>${lang === 'ar' ? ar : en}</b>
        <div class="pr"><span>${price}</span><button type="button" aria-label="Add to cart">+</button></div>
      </div>`).join('');
    $$('button', grid).forEach(btn => btn.addEventListener('click', () => {
      const c = $('#cartCount');
      c.textContent = ++cart;
      c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    }));
  }

  // auto-cycle store themes until the visitor picks one
  let autoTheme = !reduceMotion && setInterval(() => {
    if (!$('.store-wrap').classList.contains('visible')) return;
    themeIdx = (themeIdx + 1) % THEMES.length;
    $$('.sw').forEach((s, k) => s.classList.toggle('active', k === themeIdx));
    renderStore(themeIdx, true);
  }, 4000);
  $('#swatches').addEventListener('click', () => { clearInterval(autoTheme); autoTheme = null; }, { capture: true });

  /* ---------------- Spotlight on "why" cards ---------------- */
  $$('.wcard').forEach(c => c.addEventListener('pointermove', e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--x', (e.clientX - r.left) + 'px');
    c.style.setProperty('--y', (e.clientY - r.top) + 'px');
  }));

  /* ---------------- Init ---------------- */
  let saved = null;
  try { saved = localStorage.getItem('skysoft-lang'); } catch (e) { /* ignore */ }
  const urlLang = new URLSearchParams(location.search).get('lang');
  setLang(urlLang === 'ar' || urlLang === 'en' ? urlLang : (saved || 'en'));
})();
