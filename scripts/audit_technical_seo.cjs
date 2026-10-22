const fs = require('fs');
const path = require('path');

function getAllFiles(dir, ext) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) res = res.concat(getAllFiles(full, ext));
    else if (f.endsWith(ext)) res.push(full);
  });
  return res;
}

const htmlFiles = getAllFiles('dist', '.html');
console.log('Total built HTML files in dist:', htmlFiles.length);

// 1. Canonical Audit
const canonicalResults = {
  total: htmlFiles.length,
  missing: [],
  externalOrTest: [],
  relative: [],
  selfReferencing: 0
};

// 2. Robots / Noindex Audit
const noindexPages = [];

// 3. Titles, Descriptions, H1s
const metadata = [];

htmlFiles.forEach(f => {
  const rel = path.relative('dist', f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');

  // canonical
  const canMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!canMatch) {
    canonicalResults.missing.push(rel);
  } else {
    const hrefMatch = canMatch[0].match(/href=["']([^"']+)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    if (!href.startsWith('https://cepingzhinan.fun')) {
      canonicalResults.externalOrTest.push({ file: rel, href });
    } else {
      canonicalResults.selfReferencing++;
    }
  }

  // noindex
  if (html.includes('noindex')) {
    noindexPages.push(rel);
  }

  // title
  const tMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = tMatch ? tMatch[1].trim() : '';

  // meta description
  const dMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const desc = dMatch ? dMatch[1].trim() : '';

  // h1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '';

  metadata.push({ file: rel, title, desc, h1 });
});

console.log('--- CANONICAL RESULTS ---');
console.log('Missing Canonical count:', canonicalResults.missing.length);
console.log('Missing sample:', canonicalResults.missing.slice(0, 10));
console.log('External / Test domain canonicals:', canonicalResults.externalOrTest.length);
console.log('Valid self-referencing canonicals:', canonicalResults.selfReferencing);

console.log('\n--- NOINDEX RESULTS ---');
console.log('Noindex pages count:', noindexPages.length);
console.log('Noindex files:', noindexPages);

// 4. Check Duplicate Titles / Descriptions / H1s (excluding redirects / go)
const coreMeta = metadata.filter(m => !m.file.startsWith('go/'));
const titleMap = {};
const descMap = {};
const h1Map = {};

coreMeta.forEach(m => {
  if (m.title) {
    titleMap[m.title] = titleMap[m.title] || [];
    titleMap[m.title].push(m.file);
  }
  if (m.desc) {
    descMap[m.desc] = descMap[m.desc] || [];
    descMap[m.desc].push(m.file);
  }
  if (m.h1) {
    h1Map[m.h1] = h1Map[m.h1] || [];
    h1Map[m.h1].push(m.file);
  }
});

const dupTitles = Object.entries(titleMap).filter(([t, files]) => files.length > 1);
const dupDescs = Object.entries(descMap).filter(([d, files]) => files.length > 1);
const dupH1s = Object.entries(h1Map).filter(([h, files]) => files.length > 1);

console.log('\n--- DUPLICATE TAGS IN CORE PAGES ---');
console.log('Duplicate Titles count:', dupTitles.length);
dupTitles.forEach(([t, files]) => console.log('  Title:', t, '-> Files:', files));

console.log('Duplicate Descriptions count:', dupDescs.length);
dupDescs.forEach(([d, files]) => console.log('  Desc:', d.slice(0, 40), '... -> Files:', files));

console.log('Duplicate H1s count:', dupH1s.length);
dupH1s.forEach(([h, files]) => console.log('  H1:', h.slice(0, 40), '-> Files:', files));
