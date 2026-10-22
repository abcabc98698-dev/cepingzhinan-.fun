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

cleanFile('evening-peak-network-congestion-packet-loss-benchmark', [
  ['数据清晰揭示了一个铁律：软件算法的优化', '数据清晰揭示了一个铁律 软件算法的优化'],
]);

cleanFile('residential-ip-vs-datacenter-ip-detection', [
  ['许多用户好奇：机场宣称的原生住宅', '许多用户好奇机场宣称的原生住宅'],
]);
