const fs = require('fs');

// 1. wiki/index.astro
let fWiki = 'src/pages/wiki/index.astro';
let cWiki = fs.readFileSync(fWiki, 'utf8');
cWiki = cWiki.replace(
  'href={b.data.affUrl || b.data.officialUrl}',
  'href={`/go/${b.data.id || b.data.slug}`}'
);
fs.writeFileSync(fWiki, cWiki);
console.log('Updated wiki/index.astro');

// 2. recommend/index.astro
let fRec = 'src/pages/recommend/index.astro';
let cRec = fs.readFileSync(fRec, 'utf8');
cRec = cRec.replaceAll(
  'href={b.data.affUrl || b.data.officialUrl}',
  'href={`/go/${b.data.id || b.data.slug}`}'
);
fs.writeFileSync(fRec, cRec);
console.log('Updated recommend/index.astro');

// 3. reviews/index.astro
let fRev = 'src/pages/reviews/index.astro';
let cRev = fs.readFileSync(fRev, 'utf8');
cRev = cRev.replace(
  'href={b.data.affUrl || b.data.officialUrl}',
  'href={`/go/${b.data.id || b.data.slug}`}'
);
fs.writeFileSync(fRev, cRev);
console.log('Updated reviews/index.astro');

// 4. reviews/[id].astro
let fRevId = 'src/pages/reviews/[id].astro';
let cRevId = fs.readFileSync(fRevId, 'utf8');
cRevId = cRevId.replace(
  'const registerUrl = b.affUrl || b.officialUrl;',
  'const registerUrl = `/go/${b.id || b.slug}`;'
);
fs.writeFileSync(fRevId, cRevId);
console.log('Updated reviews/[id].astro');

// 5. index.astro
let fIndex = 'src/pages/index.astro';
let cIndex = fs.readFileSync(fIndex, 'utf8');
cIndex = cIndex.replace(
  'href={featuredGuangsu.data.affUrl || featuredGuangsu.data.officialUrl}',
  'href="/go/guangsu"'
);
cIndex = cIndex.replace(
  'href={b.data.affUrl || b.data.officialUrl}',
  'href={`/go/${b.data.id || b.data.slug}`}'
);
fs.writeFileSync(fIndex, cIndex);
console.log('Updated index.astro');

// 6. coupons/index.astro
let fCoup = 'src/pages/coupons/index.astro';
let cCoup = fs.readFileSync(fCoup, 'utf8');
cCoup = cCoup.replace(
  'officialUrl: b.data.affUrl || b.data.officialUrl,',
  'officialUrl: `/go/${b.data.id || b.data.slug}`,'
);
fs.writeFileSync(fCoup, cCoup);
console.log('Updated coupons/index.astro');

// 7. blog/[...slug].astro
let fBlog = 'src/pages/blog/[...slug].astro';
let cBlog = fs.readFileSync(fBlog, 'utf8');
cBlog = cBlog.replace(
  'href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y"',
  'href="/go/guangsu"'
);
fs.writeFileSync(fBlog, cBlog);
console.log('Updated blog/[...slug].astro');
