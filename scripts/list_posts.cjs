const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/content/post');
const files = fs.readdirSync(dir);
const list = [];
for (const f of files) {
  const p = path.join(dir, f, 'index.mdx');
  if (fs.existsSync(p)) {
    const text = fs.readFileSync(p, 'utf8');
    const titleMatch = text.match(/title:\s*['"](.*?)['"]/);
    const categoryMatch = text.match(/category:\s*['"](.*?)['"]/);
    const han = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    list.push({
      slug: f,
      category: categoryMatch ? categoryMatch[1] : '',
      han,
      total: text.length,
      title: titleMatch ? titleMatch[1] : ''
    });
  }
}
console.log(JSON.stringify(list, null, 2));
