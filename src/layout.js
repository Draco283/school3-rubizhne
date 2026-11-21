'use strict';

/**
 * Спільний каркас сторінки.
 * Усі сторінки генеруються з src/pages/*.html через build.js
 */

const SITE = {
  name: 'Гімназія №3 міста Рубіжного',
  short: 'Гімназія №3',
  // Безкоштовна адреса Netlify. Якщо назва сайту інша — змініть тут.
  url: 'https://school3-rubizhne.netlify.app',
  email: 'school3rub@ukr.net',
  phone: '+380645363930',
  address: '93000, Луганська обл., м. Рубіжне, вул. Студентська, 30',
  ogImage: 'assets/img/school-2.jpg'
};

function layout(meta, body) {
  const title = meta.title;
  const description = meta.description;
  const image = meta.image || SITE.ogImage;
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow';
  const canonical = meta.canonical || `${SITE.url}/${meta.slug === 'index' ? '' : meta.slug + '.html'}`;
  const ogType = meta.type || 'website';
  const articleMeta = meta.published
    ? `<meta property="article:published_time" content="${meta.published}">\n<meta property="article:modified_time" content="${meta.modified || meta.published}">\n`
    : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: 'Гімназія №3 міста Рубіжного Луганської області',
    alternateName: 'Гімназія №3',
    url: SITE.url,
    logo: `${SITE.url}/assets/img/gerb.png`,
    image: `${SITE.url}/${image}`,
    description: 'Маленька школа з великим серцем. Гімназія №3 міста Рубіжного Луганської області.',
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'вул. Студентська, 30',
      addressLocality: 'Рубіжне',
      addressRegion: 'Луганська область',
      postalCode: '93000',
      addressCountry: 'UA'
    },
    sameAs: [
      'https://www.facebook.com/rubschool3',
      'https://www.instagram.com/rubizhne_school_3',
      'https://www.youtube.com/channel/UCWHYB-Q8c1kOMh9RcKbPkgg',
      'https://www.tiktok.com/@rubizhneschool3'
    ]
  };

  return `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#123D32">
<meta name="author" content="Гімназія №3 міста Рубіжного">
<link rel="canonical" href="${canonical}">
<link rel="alternate" type="application/rss+xml" title="Новини — Гімназія №3" href="${SITE.url}/feed.xml">

<!-- Open Graph -->
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="uk_UA">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${SITE.url}/${image}">
<meta property="og:url" content="${canonical}">
${articleMeta}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${SITE.url}/${image}">

<link rel="icon" href="assets/img/gerb.png" type="image/png">
<link rel="apple-touch-icon" href="assets/img/gerb.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body data-page="${meta.page}" class="${meta.bodyClass || ''}">
<a class="skip-link" href="#main">Перейти до змісту</a>

<div class="preloader" id="preloader" aria-hidden="true">
  <div class="preloader-inner">
    <img src="assets/img/gerb.png" alt="" width="64" height="90">
    <span class="preloader-name">ГІМНАЗІЯ №3</span>
    <span class="preloader-line"><i></i></span>
    <span class="preloader-sub">м. Рубіжне · Луганська область</span>
  </div>
</div>

<div id="scroll-progress"></div>
<header id="site-header"></header>

${body}

<footer id="site-footer" class="site-footer"></footer>
<a class="to-top" href="#" aria-label="Догори">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
</a>
<a class="float-contact" href="viber://chat?number=%2B380956164089" aria-label="Написати у Viber" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.2 2C7 2 2.9 5.7 2.9 10.6c0 2.8 1.4 5.3 3.6 7v3.7c0 .5.6.8 1 .5l3-2.1c.5.1 1.1.1 1.7.1 5.2 0 9.3-3.7 9.3-8.6S17.4 2 12.2 2zm4.9 12.1c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.4-1.1-2.7 0-1.3.7-1.9.9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5l-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.4.3.1.1.1.6-.1 1.2z"/></svg>
</a>
<noscript><style>[data-reveal]{opacity:1!important;transform:none!important}.preloader{display:none!important}</style></noscript>
<script src="assets/js/site.js"></script>
</body>
</html>
`;
}

module.exports = { layout, SITE };
