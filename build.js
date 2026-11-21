'use strict';

/**
 * Генератор сайту Гімназії №3 м. Рубіжного
 * -----------------------------------------
 * Контент сторінок лежить у src/pages/*.html (тільки <main>…</main>).
 * Новини — у content/news/*.md (Markdown + frontmatter).
 * Спільний каркас — src/layout.js.
 *
 * Запуск:  npm run build   (або: node build.js)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const { layout, SITE } = require('./src/layout');

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const NEWS_DIR = path.join(ROOT, 'content', 'news');
const NEWS_START = '<!-- NEWS:START -->';
const NEWS_END = '<!-- NEWS:END -->';

/* ---------- markdown ---------- */
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const defaultLinkOpen = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet('href') || '';
  if (/^https?:\/\//i.test(href)) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

/* ---------- сторінки ---------- */
const pages = [
  {
    slug: 'index',
    page: 'home',
    title: 'Гімназія №3 міста Рубіжного — Маленька школа з великим серцем',
    description: 'Офіційний сайт Гімназії №3 міста Рубіжного Луганської області. Нова українська школа, дистанційне навчання, виховна робота, ДЖУРА, прозорість та відкритість.'
  },
  {
    slug: 'pro-shkolu',
    page: 'about',
    title: 'Про школу — Гімназія №3 міста Рубіжного',
    description: 'Історія, адміністрація, педагоги, досягнення та випускники Гімназії №3 міста Рубіжного Луганської області.'
  },
  {
    slug: 'navchannya',
    page: 'study',
    title: 'Навчання — Гімназія №3 міста Рубіжного',
    description: 'Навчально-виховна робота: структура навчального року, розклад дзвінків, освітні програми, ДПА, НМТ та шкільна мережа.'
  },
  {
    slug: 'vihovna',
    page: 'education',
    title: 'Виховна робота — Гімназія №3 міста Рубіжного',
    description: 'Виховна робота гімназії: цінності, учнівське самоврядування, безпека, профілактика та матеріали для батьків.'
  },
  {
    slug: 'mediateka',
    page: 'library',
    title: 'Медіатека — Гімназія №3 міста Рубіжного',
    description: 'Бібліотечно-інформаційний центр гімназії: електронні підручники, корисна література та поради для читання.'
  },
  {
    slug: 'prozorist',
    page: 'transparency',
    title: 'Прозорість та відкритість — Гімназія №3 міста Рубіжного',
    description: 'Публічна інформація Гімназії №3 міста Рубіжного: статут, ліцензія, звіти, документи, правила прийому до 1 та 2–9 класів.'
  },
  {
    slug: 'kontakty',
    page: 'contacts',
    title: 'Контакти — Гімназія №3 міста Рубіжного',
    description: 'Адреса, телефони, електронна пошта та соціальні мережі Гімназії №3 міста Рубіжного.'
  },
  {
    slug: 'nush',
    page: 'nush',
    title: 'Нова українська школа — Гімназія №3 міста Рубіжного',
    description: 'НУШ у Гімназії №3: концепція, класні керівники, корисні матеріали та посилання.'
  },
  {
    slug: 'inklyuziya',
    page: 'inclusive',
    title: 'Інклюзивна освіта — Гімназія №3 міста Рубіжного',
    description: 'Інклюзивна освіта та команда психолого-педагогічного супроводу Гімназії №3 міста Рубіжного.'
  },
  {
    slug: 'bullying',
    page: 'bullying',
    title: 'Протидія булінгу — Гімназія №3 міста Рубіжного',
    description: 'Порядок подання заяв про булінг, нормативні документи, корисні контакти та пам’ятки для учнів і батьків.'
  },
  {
    slug: 'dystantsiyne',
    page: 'distance',
    title: 'Дистанційне навчання — Гімназія №3 міста Рубіжного',
    description: 'Дистанційне навчання в гімназії: Google Classroom, накази, інструкції, розклад і відповіді на питання.'
  },
  {
    slug: 'dzura',
    page: 'dzura',
    title: 'ДЖУРА — Гімназія №3 міста Рубіжного',
    description: 'Всеукраїнська дитячо-юнацька військово-патріотична гра «Сокіл» («Джура») у Гімназії №3 міста Рубіжного.'
  },
  {
    slug: '404',
    page: 'notfound',
    title: 'Сторінку не знайдено — Гімназія №3 міста Рубіжного',
    description: 'Такої сторінки не існує. Поверніться на головну сторінку сайту гімназії.',
    noindex: true
  }
];

/* ---------- допоміжні функції ---------- */
const MONTHS = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
];

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatDate(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function isoDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function xmlEscape(value) {
  return escapeHtml(value).replace(/&#39;/g, '&apos;');
}

function stripMarkdown(text) {
  return String(text || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function makeExcerpt(text, max = 190) {
  const clean = stripMarkdown(text);
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, '') + '…';
}

const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye',
  ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'i', к: 'k', л: 'l',
  м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '',
  ю: 'yu', я: 'ya', ы: 'y', э: 'e', ъ: ''
};

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .split('')
    .map((ch) => TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch)
    .join('')
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'novyna';
}

function parseDate(value, fallback) {
  if (value instanceof Date && !isNaN(value.getTime())) return value;
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12);
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return fallback;
}

function normaliseTags(value) {
  let tags = value;
  if (typeof tags === 'string') tags = tags.split(',');
  if (!Array.isArray(tags)) tags = [];
  tags = tags.map((tag) => String(tag).trim()).filter(Boolean);
  return tags.length ? tags : ['Новини'];
}

function normaliseCover(value) {
  const cover = String(value || '').trim();
  if (!cover) return '';
  if (/^https?:\/\//i.test(cover)) return cover;
  return cover.replace(/^\.?\//, '');
}

/* ---------- читання новин ---------- */
function readNews() {
  if (!fs.existsSync(NEWS_DIR)) return [];

  const posts = fs.readdirSync(NEWS_DIR)
    .filter((file) => file.toLowerCase().endsWith('.md'))
    .map((file) => {
      const fullPath = path.join(NEWS_DIR, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const parsed = matter(raw);
      const data = parsed.data || {};
      const stat = fs.statSync(fullPath);
      const fileSlug = path.basename(file, path.extname(file));
      const date = parseDate(data.date, stat.mtime);
      const content = parsed.content || '';

      return {
        file,
        slug: slugify(data.slug || fileSlug),
        title: String(data.title || 'Без назви').trim(),
        date,
        dateISO: isoDate(date),
        author: String(data.author || 'Редакція гімназії').trim(),
        excerpt: String(data.excerpt || makeExcerpt(content)).trim(),
        cover: normaliseCover(data.cover),
        tags: normaliseTags(data.tags),
        draft: data.draft === true,
        html: md.render(content),
        content
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => b.date - a.date);

  const used = new Set();
  for (const post of posts) {
    const base = 'news-' + post.slug;
    let fileName = base + '.html';
    let counter = 2;
    while (used.has(fileName)) {
      fileName = base + '-' + counter + '.html';
      counter++;
    }
    used.add(fileName);
    post.href = fileName;
    post.url = `${SITE.url}/${fileName}`;
  }

  return posts;
}

/* ---------- HTML новин ---------- */
function tagPills(post) {
  return post.tags.map((tag) => `<span class="news-tag">${escapeHtml(tag)}</span>`).join('');
}

function newsCard(post, featured) {
  const cover = post.cover || 'assets/img/school-2.jpg';
  return `<article class="news-card${featured ? ' news-card--feature' : ''}" data-reveal>
  <a class="news-card-media" href="${post.href}" aria-label="${escapeHtml(post.title)}">
    <img src="${cover}" alt="${escapeHtml(post.title)}" loading="lazy">
  </a>
  <div class="news-card-body">
    <div class="news-meta">
      <time class="news-date" datetime="${post.dateISO}">${formatDate(post.date)}</time>
      ${tagPills(post)}
    </div>
    <h2><a href="${post.href}">${escapeHtml(post.title)}</a></h2>
    <p>${escapeHtml(post.excerpt)}</p>
    <a class="link-arrow" href="${post.href}">Читати далі
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
  </div>
</article>`;
}

function newsGrid(posts, className = '') {
  return `<div class="news-grid${className ? ' ' + className : ''}">
${posts.map((post, index) => newsCard(post, className !== 'news-grid--home' && index === 0)).join('\n')}
</div>`;
}

function latestNewsSection(posts) {
  const latest = posts.slice(0, 3);
  const inner = latest.length
    ? newsGrid(latest, 'news-grid--home')
    : `<div class="news-empty">
  <strong>Новин поки немає</strong>
  <p>Перші матеріали з'являться тут незабаром. Зазирніть пізніше.</p>
</div>`;

  return `<section class="section section--white" id="novyny">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <div>
          <span class="kicker">Новини</span>
          <h2>Що нового</h2>
          <p>Події, досягнення та важливі оголошення гімназії — без зайвого шуму.</p>
        </div>
        <a class="link-arrow" href="news.html">Усі новини
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      ${inner}
    </div>
  </section>`;
}

function newsListingBody(posts) {
  const list = posts.length
    ? newsGrid(posts)
    : `<div class="news-empty">
  <strong>Тут скоро з'являться новини</strong>
  <p>Редакція гімназії готує перші матеріали. Тим часом загляньте на головну або в соціальні мережі.</p>
</div>`;

  return `<main id="main">

  <section class="page-hero">
    <div class="wrap">
      <div class="crumbs"><a href="index.html">Головна</a><span>/</span><span>Новини</span></div>
      <h1>Новини</h1>
      <p class="page-lead">Події, досягнення, ініціативи та важливі оголошення. Тут зібрано все, чим живе наша гімназія.</p>
      <div class="page-tags">
        <span class="page-tag">2026/2027</span>
        <span class="page-tag">Шкільне життя</span>
        <span class="page-tag">Редакція</span>
      </div>
      <div class="hero-float" aria-hidden="true"><span><strong>🗞</strong>свіжі новини</span></div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      ${list}
    </div>
  </section>

  <section class="section section--white">
    <div class="wrap">
      <div class="note-box note-box--green" data-reveal>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1"/></svg>
        <div>
          <strong>Не пропускайте новини.</strong> Підпишіться на
          <a href="feed.xml">RSS-стрічку</a> або читайте нас у
          <a href="https://www.facebook.com/rubschool3" target="_blank" rel="noopener">Facebook</a>,
          <a href="http://instagram.com/rubizhne_school_3" target="_blank" rel="noopener">Instagram</a> і
          <a href="https://www.tiktok.com/@rubizhneschool3" target="_blank" rel="noopener">TikTok</a>.
        </div>
      </div>
    </div>
  </section>

</main>
`;
}

function articleBody(post, posts) {
  const index = posts.findIndex((item) => item.href === post.href);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;
  const cover = post.cover || 'assets/img/school-2.jpg';
  const shareUrl = encodeURIComponent(post.url);
  const shareText = encodeURIComponent(post.title);
  const latest = posts.filter((item) => item.href !== post.href).slice(0, 3);

  const miniPosts = latest.map((item) => `<a class="mini-post" href="${item.href}">
  <img src="${item.cover || 'assets/img/school-2.jpg'}" alt="" loading="lazy">
  <span><time datetime="${item.dateISO}">${formatDate(item.date)}</time><strong>${escapeHtml(item.title)}</strong></span>
</a>`).join('');

  const prevNext = `<nav class="article-nav" aria-label="Інші новини">
  ${newer ? `<a class="article-nav-link" href="${newer.href}"><span>← Новіша</span><strong>${escapeHtml(newer.title)}</strong></a>` : '<span></span>'}
  ${older ? `<a class="article-nav-link article-nav-link--next" href="${older.href}"><span>Старіша →</span><strong>${escapeHtml(older.title)}</strong></a>` : '<span></span>'}
</nav>`;

  return `<main id="main">

  <section class="page-hero page-hero--article">
    <div class="wrap">
      <div class="crumbs"><a href="index.html">Головна</a><span>/</span><a href="news.html">Новини</a><span>/</span><span>${escapeHtml(post.title)}</span></div>
      <div class="article-meta">
        <time class="news-date" datetime="${post.dateISO}">${formatDate(post.date)}</time>
        ${tagPills(post)}
      </div>
      <h1>${escapeHtml(post.title)}</h1>
      <p class="page-lead">${escapeHtml(post.excerpt)}</p>
      <div class="article-byline">Автор: ${escapeHtml(post.author)}</div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="wrap">
      <div class="article-layout">
        <article class="article">
          <figure class="article-cover">
            <img src="${cover}" alt="${escapeHtml(post.title)}">
          </figure>
          <div class="prose">
${post.html}
          </div>

          <div class="article-footer">
            <div class="article-tags">${post.tags.map((tag) => `<span class="news-tag">${escapeHtml(tag)}</span>`).join('')}</div>
            <div class="share-row">
              <span>Поділитися:</span>
              <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener">Facebook</a>
              <a href="https://t.me/share/url?url=${shareUrl}&text=${shareText}" target="_blank" rel="noopener">Telegram</a>
              <a href="viber://forward?text=${encodeURIComponent(post.title + ' ' + post.url)}">Viber</a>
            </div>
          </div>

          ${prevNext}
        </article>

        <aside class="article-side">
          <div class="side-card">
            <h3>Інші новини</h3>
            <div class="mini-posts">${miniPosts}</div>
            <a class="btn btn-primary btn-block btn-sm" href="news.html">Усі новини</a>
          </div>
          <div class="side-card side-card--green">
            <h3>Маєте новину?</h3>
            <p>Поділіться подією, досягненням або ідеєю — редакція допоможе з публікацією.</p>
            <a class="btn btn-gold btn-sm" href="kontakty.html">Написати редакції</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

</main>
`;
}

/* ---------- збірка ---------- */
const news = readNews();
let built = 0;
const errors = [];

for (const meta of pages) {
  const srcFile = path.join(PAGES_DIR, meta.slug + '.html');
  if (!fs.existsSync(srcFile)) {
    errors.push(`Немає файлу контенту: src/pages/${meta.slug}.html`);
    continue;
  }

  let body = fs.readFileSync(srcFile, 'utf8').trim();

  // На головну вставляємо останні новини
  if (meta.slug === 'index' && body.includes(NEWS_START) && body.includes(NEWS_END)) {
    const start = body.indexOf(NEWS_START);
    const end = body.indexOf(NEWS_END);
    body = body.slice(0, start) + latestNewsSection(news) + body.slice(end + NEWS_END.length);
  }

  const html = layout(meta, body);
  const outName = meta.slug === 'index' ? 'index.html' : meta.slug + '.html';
  fs.writeFileSync(path.join(ROOT, outName), html, 'utf8');
  built++;
}

// Сторінка новин
const newsMeta = {
  slug: 'news',
  page: 'news',
  title: 'Новини — Гімназія №3 міста Рубіжного',
  description: 'Останні новини, події та оголошення Гімназії №3 міста Рубіжного Луганської області.'
};
fs.writeFileSync(path.join(ROOT, 'news.html'), layout(newsMeta, newsListingBody(news)), 'utf8');
built++;

// Окремі сторінки новин
for (const post of news) {
  const meta = {
    slug: post.href.replace(/\.html$/, ''),
    page: 'news',
    title: `${post.title} — Гімназія №3 міста Рубіжного`,
    description: post.excerpt,
    image: post.cover || SITE.ogImage,
    type: 'article',
    published: post.date.toISOString(),
    modified: post.date.toISOString()
  };
  fs.writeFileSync(path.join(ROOT, post.href), layout(meta, articleBody(post, news)), 'utf8');
  built++;
}

/* ---------- sitemap ---------- */
const sitemapEntries = [];

for (const page of pages) {
  if (page.noindex) continue;
  const loc = page.slug === 'index' ? `${SITE.url}/` : `${SITE.url}/${page.slug}.html`;
  sitemapEntries.push(`  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page.slug === 'index' ? '1.0' : '0.8'}</priority>\n  </url>`);
}

sitemapEntries.push(`  <url>\n    <loc>${SITE.url}/news.html</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>`);

for (const post of news) {
  sitemapEntries.push(`  <url>\n    <loc>${post.url}</loc>\n    <lastmod>${post.dateISO}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

fs.writeFileSync(
  path.join(ROOT, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${SITE.url}/sitemap.xml\n`,
  'utf8'
);

/* ---------- RSS ---------- */
const rssItems = news.map((post) => `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <description>${xmlEscape(post.excerpt)}</description>
      ${post.cover ? `<enclosure url="${SITE.url}/${post.cover}" type="image/jpeg"/>` : ''}
    </item>`).join('\n');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Новини — Гімназія №3 міста Рубіжного</title>
    <link>${SITE.url}/news.html</link>
    <description>Останні новини, події та оголошення Гімназії №3 міста Рубіжного.</description>
    <language>uk</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, 'feed.xml'), feed, 'utf8');

/* ---------- перевірка локальних посилань ---------- */
const htmlFiles = fs.readdirSync(ROOT).filter((file) => file.endsWith('.html'));
const allHrefs = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const re = /(?:href|src)="([^"]+)"/g;
  let match;
  while ((match = re.exec(html))) {
    const url = match[1];
    if (/^(https?:|mailto:|tel:|viber:|#|data:|javascript:)/.test(url)) continue;
    const clean = url.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(ROOT, clean.replace(/\//g, path.sep));
    if (!fs.existsSync(target)) {
      if (!allHrefs.has(url)) allHrefs.set(url, new Set());
      allHrefs.get(url).add(file);
    }
  }
}

/* ---------- підсумок ---------- */
if (errors.length) {
  console.error('\n✖ Помилки збірки:');
  errors.forEach((error) => console.error('  · ' + error));
}
if (allHrefs.size) {
  console.warn('\n⚠ Не знайдено локальних файлів для посилань:');
  for (const [url, files] of allHrefs) {
    console.warn(`  · ${url}  ← ${[...files].join(', ')}`);
  }
}

console.log(`\n✔ Зібрано сторінок: ${built}/${pages.length + 1 + news.length}`);
console.log(`✔ Новини: ${news.length}`);
console.log('✔ sitemap.xml, robots.txt, feed.xml оновлено');
console.log(`✔ Перевірено локальних посилань: ${allHrefs.size ? 'є проблеми' : 'все ок'}\n`);
