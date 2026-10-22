const fs = require('fs');
const path = require('path');

const postBaseDir = path.join(__dirname, '../src/content/post');

function cleanFile(slug, replacers) {
  const p = path.join(postBaseDir, slug, 'index.mdx');
  let content = fs.readFileSync(p, 'utf8');
  for (const [target, replacement] of replacers) {
    content = content.split(target).join(replacement);
  }
  fs.writeFileSync(p, content, 'utf8');
  console.log(`Cleaned ${slug}`);
}

cleanFile('airport-plan-pricing-per-gigabyte-cost-breakdown', [
  ['并非商家给出的流量数字，而是以下三个隐性约束', '直接取决于以下三个隐性约束'],
  ['经济学结论：对于月均消耗', '经济学结论 对于月均消耗'],
]);
