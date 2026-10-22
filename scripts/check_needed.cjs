const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/content/post');
const files = fs.readdirSync(dir);
const list = [];
for (const f of files) {
  const p = path.join(dir, f, 'index.mdx');
  if (fs.existsSync(p)) {
    const text = fs.readFileSync(p, 'utf8');
    const han = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    list.push({ slug: f, han, needed: Math.max(0, 6150 - han) });
  }
}
list.sort((a,b) => b.needed - a.needed);
console.log(JSON.stringify(list, null, 2));
