/* =========================================================
   Гімназія №3 — shared header/footer + interactions
   ========================================================= */
(function () {
  'use strict';

  var page = document.body.dataset.page || 'home';

  /* ---------- preloader ---------- */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var preHidden = false;
    var hidePreloader = function () {
      if (preHidden) return;
      preHidden = true;
      preloader.classList.add('is-done');
      setTimeout(function () { if (preloader.parentNode) preloader.parentNode.removeChild(preloader); }, 900);
    };
    if (document.readyState === 'complete') setTimeout(hidePreloader, 300);
    else window.addEventListener('load', function () { setTimeout(hidePreloader, 300); });
    setTimeout(hidePreloader, 2600);
  }

  /* ---------- icons ---------- */
  var ico = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 10a16 16 0 006 6l1.4-1.4a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.5-.4-5.2a2.7 2.7 0 00-1.9-1.9C18 4.5 12 4.5 12 4.5s-6 0-7.7.4A2.7 2.7 0 002.4 6.8C2 8.5 2 12 2 12s0 3.5.4 5.2a2.7 2.7 0 001.9 1.9c1.7.4 7.7.4 7.7.4s6 0 7.7-.4a2.7 2.7 0 001.9-1.9C22 15.5 22 12 22 12zM10 15.5v-7l6 3.5-6 3.5z"/></svg>',
    tt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2 1.5 3.4 3.5 3.7v2.7c-1.3.1-2.5-.3-3.6-1v5.9a5.6 5.6 0 11-5.6-5.6c.3 0 .5 0 .8.1v2.8a2.8 2.8 0 102 2.7V3h2.9z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.7 4.3L2.9 11.5c-.8.3-.8 1.4 0 1.7l4.7 1.5 1.8 5.6c.2.7 1.1.9 1.6.3l2.6-2.7 4.7 3.5c.6.4 1.4.1 1.6-.6l3-15.2c.2-.9-.7-1.6-1.2-1.3zM8.7 13.9l9.3-6.6-7.4 7.6-.2 2.9-1.7-3.9z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 012-2h14v18H6a2 2 0 01-2-2V5z"/><path d="M4 19a2 2 0 012-2h14"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>'
  };

  var socials = [
    { label: 'Facebook', href: 'https://www.facebook.com/rubschool3', icon: ico.fb },
    { label: 'Instagram', href: 'http://instagram.com/rubizhne_school_3', icon: ico.ig },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCWHYB-Q8c1kOMh9RcKbPkgg', icon: ico.yt },
    { label: 'TikTok', href: 'https://www.tiktok.com/@rubizhneschool3', icon: ico.tt }
  ];

  var mainLinks = [
    { key: 'home', href: 'index.html', label: 'Головна' },
    { key: 'news', href: 'news.html', label: 'Новини' },
    { key: 'about', href: 'pro-shkolu.html', label: 'Про школу' },
    { key: 'study', href: 'navchannya.html', label: 'Навчання' },
    { key: 'education', href: 'vihovna.html', label: 'Виховання' },
    { key: 'library', href: 'mediateka.html', label: 'Медіатека' },
    { key: 'transparency', href: 'prozorist.html', label: 'Прозорість' },
    { key: 'contacts', href: 'kontakty.html', label: 'Контакти' }
  ];

  var moreLinks = [
    { key: 'nush', href: 'nush.html', label: 'Нова українська школа', tag: 'НУШ' },
    { key: 'inclusive', href: 'inklyuziya.html', label: 'Інклюзивна освіта', tag: 'Разом' },
    { key: 'bullying', href: 'bullying.html', label: 'Протидія булінгу', tag: 'Стоп' },
    { key: 'distance', href: 'dystantsiyne.html', label: 'Дистанційне навчання', tag: 'Онлайн' },
    { key: 'dzura', href: 'dzura.html', label: 'ДЖУРА', tag: 'Гра' }
  ];

  var isMore = moreLinks.some(function (l) { return l.key === page; });

  function navLink(l) {
    return '<a class="nav-link' + (page === l.key ? ' is-active' : '') + '" href="' + l.href + '"' + (page === l.key ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
  }

  var headerHTML =
    '<div class="topbar">' +
      '<div class="wrap">' +
        '<div class="topbar-info">' +
          '<span class="topbar-item">' + ico.pin + '<a href="kontakty.html">м. Рубіжне, вул. Студентська, 30</a></span>' +
          '<span class="topbar-item">' + ico.mail + '<a href="mailto:school3rub@ukr.net">school3rub@ukr.net</a></span>' +
          '<span class="topbar-item">' + ico.phone + '<a href="tel:+380645363930">(064) 536-39-30</a></span>' +
        '</div>' +
        '<div class="topbar-social">' +
          socials.map(function (s) {
            return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + s.icon + '</a>';
          }).join('') +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="site-header" id="site-header-bar">' +
      '<div class="wrap">' +
        '<nav class="nav" aria-label="Головна навігація">' +
          '<a class="brand" href="index.html" aria-label="Гімназія №3 — на головну">' +
            '<img src="assets/img/gerb.png" alt="Герб Рубіжного" width="42" height="60">' +
            '<span class="brand-text"><strong>Гімназія №3</strong><span>м. Рубіжне · Луганська обл.</span></span>' +
          '</a>' +
          '<div class="nav-links">' +
            mainLinks.map(navLink).join('') +
            '<div class="has-drop">' +
              '<button class="nav-link drop-toggle' + (isMore ? ' is-active' : '') + '" aria-expanded="false" aria-haspopup="true">Ще ' + ico.chevron + '</button>' +
              '<div class="dropdown">' +
                moreLinks.map(function (l) {
                  return '<a href="' + l.href + '">' + l.label + '<span>' + l.tag + '</span></a>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="nav-cta">' +
            '<a class="btn btn-gold btn-sm" href="prozorist.html#pryiom">Вступ 2026 ' + ico.arrow + '</a>' +
            '<button class="burger" id="burger" aria-label="Відкрити меню" aria-expanded="false"><span></span><span></span><span></span></button>' +
          '</div>' +
        '</nav>' +
      '</div>' +
    '</div>' +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<nav aria-label="Мобільна навігація">' +
        mainLinks.concat(moreLinks).map(function (l, i) {
          return '<a href="' + l.href + '" style="transition-delay:' + (0.05 + i * 0.035) + 's">' + l.label + '<small>' + String(i + 1).padStart(2, '0') + '</small></a>';
        }).join('') +
        '<div class="mm-cta">' +
          '<a class="btn btn-gold" href="prozorist.html#pryiom">Вступ 2026 ' + ico.arrow + '</a>' +
          '<a class="btn btn-light" href="kontakty.html">Написати нам</a>' +
        '</div>' +
      '</nav>' +
    '</div>';

  var year = new Date().getFullYear();

  var footerHTML =
    '<div class="wrap">' +
      '<div class="footer-top">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="index.html">' +
            '<img src="assets/img/gerb.png" alt="" width="42" height="60">' +
            '<span class="brand-text"><strong>Гімназія №3</strong><span>м. Рубіжне · Луганська обл.</span></span>' +
          '</a>' +
          '<p>Маленька школа з великим серцем. Будуємо нову українську школу вже сьогодні — онлайн, відкрито й з турботою про кожного.</p>' +
          '<div class="footer-socials">' +
            socials.map(function (s) {
              return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + s.icon + '</a>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Навігація</h4>' +
          '<ul>' + mainLinks.map(function (l) { return '<li><a href="' + l.href + '">' + l.label + '</a></li>'; }).join('') + '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Учням і батькам</h4>' +
          '<ul>' +
            '<li><a href="navchannya.html#rozklad">Розклад дзвінків</a></li>' +
            '<li><a href="navchannya.html#programy">Освітні програми</a></li>' +
            '<li><a href="dystantsiyne.html">Дистанційне навчання</a></li>' +
            '<li><a href="bullying.html">Протидія булінгу</a></li>' +
            '<li><a href="mediateka.html">Шкільна медіатека</a></li>' +
            '<li><a href="prozorist.html">Прозорість закладу</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Контакти</h4>' +
          '<div class="f-contact">' + ico.pin + '<span>93000, Луганська обл.,<br>м. Рубіжне, вул. Студентська, 30</span></div>' +
          '<div class="f-contact">' + ico.phone + '<span><a href="tel:+380645363930">(064) 536-39-30</a><br><a href="tel:+380645363840">(064) 536-38-40</a></span></div>' +
          '<div class="f-contact">' + ico.mail + '<span><a href="mailto:school3rub@ukr.net">school3rub@ukr.net</a></span></div>' +
          '<div class="f-contact">' + ico.clock + '<span>Пн–Пт · 09:00–16:00</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© ' + year + ' Гімназія №3 міста Рубіжного Луганської області. Всі права захищено.</span>' +
        '<span class="glory"><i class="flag"></i> Слава Україні · Героям слава</span>' +
      '</div>' +
    '</div>' +
    '<div class="footer-word" aria-hidden="true">ГІМНАЗІЯ №3</div>';

  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobile-menu');
  var headerBar = document.getElementById('site-header-bar');

  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Відкрити меню');
    document.body.classList.remove('is-locked');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
      document.body.classList.toggle('is-locked', open);
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- sticky header + scroll progress + to-top ---------- */
  var progress = document.getElementById('scroll-progress');
  var toTop = document.querySelector('.to-top');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (headerBar) headerBar.classList.toggle('is-scrolled', y > 12);
    if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : 0;
          setTimeout(function () { el.classList.add('is-in'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var dur = 1500;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = Math.floor(target * eased);
          el.textContent = val.toLocaleString('uk-UA') + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString('uk-UA') + suffix;
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- ripple on buttons ---------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn');
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size / 2) + 'px';
    span.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(span);
    setTimeout(function () { span.remove(); }, 700);
  });

  /* ---------- tilt cards ---------- */
  var finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 5).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });

    /* ---------- magnetic buttons ---------- */
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width;
        var y = (e.clientY - r.top - r.height / 2) / r.height;
        btn.style.transform = 'translate(' + (x * 7).toFixed(1) + 'px,' + (y * 5 - 2).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });

    /* ---------- hero photo parallax ---------- */
    var heroPhoto = document.querySelector('.hero-photo');
    var hero = document.querySelector('.hero');
    if (heroPhoto && hero) {
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        heroPhoto.style.transform = 'translate3d(' + (px * 10) + 'px,' + (py * 10) + 'px,0)';
      });
      hero.addEventListener('mouseleave', function () { heroPhoto.style.transform = ''; });
    }
  }

  /* ---------- custom cursor ---------- */
  if (finePointer && !reduceMotion) {
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var rx = 0, ry = 0, mx = 0, my = 0;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
      document.body.classList.add('cursor-ready');
    });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-tilt], summary').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });
  }

  /* ---------- tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var btns = group.querySelectorAll('.tab-btn');
    var panels = group.querySelectorAll('.tab-panel');

    function activate(btn, scroll) {
      btns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(function (p) { p.classList.remove('is-active'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      var target = group.querySelector('#' + btn.dataset.tab);
      if (target) target.classList.add('is-active');
      if (scroll) {
        var top = group.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () { activate(btn, false); });
    });

    function fromHash() {
      var hash = decodeURIComponent(window.location.hash.replace('#', ''));
      if (!hash) return;
      var btn = group.querySelector('.tab-btn[data-tab="' + hash + '"]');
      if (btn) activate(btn, true);
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  });

  /* ---------- lightbox ---------- */
  var galleryLinks = document.querySelectorAll('[data-lightbox]');
  if (galleryLinks.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" aria-label="Закрити">✕</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var closeBtn = lb.querySelector('.lightbox-close');
    function closeLb() { lb.classList.remove('is-open'); document.body.classList.remove('is-locked'); }
    galleryLinks.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        lbImg.src = a.getAttribute('href');
        lbImg.alt = a.querySelector('img') ? a.querySelector('img').alt : '';
        lb.classList.add('is-open');
        document.body.classList.add('is-locked');
      });
    });
    closeBtn.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }

  /* ---------- contact form (mailto) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();
      var subject = encodeURIComponent('Повідомлення з сайту — ' + (name || 'без імені'));
      var body = encodeURIComponent('Ім\'я: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:school3rub@ukr.net?subject=' + subject + '&body=' + body;
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Дякуємо! Відкриваємо ваш поштовий клієнт…';
    });
  }

  /* ---------- current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
})();
