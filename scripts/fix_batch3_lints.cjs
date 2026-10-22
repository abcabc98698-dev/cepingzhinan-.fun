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

cleanFile('airport-subscription-price-inflation-and-refund-rules', [
  ['并非商家的暴利贪婪，而是其上游物理基础设施', '在其背后有上游物理基础设施'],
]);

cleanFile('residential-ip-vs-datacenter-ip-detection', [
  ['并非人为的主观标签，而是源自全球五大区域', '直接源自全球五大区域'],
]);
