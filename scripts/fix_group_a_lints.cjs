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
  ['表面标称月费 | 四口之家所需套餐数 | 家庭实际月度总支出', '官方标称月费 | 四口之家所需套餐数 | 家庭月度总支出'],
]);

cleanFile('how-to-read-speedtest-charts', [
  ['在 32 线程极限并发模式下，表面上测速软件跑出了 920Mbps 的惊人数字，但由于多线程激进抢占带宽导致交换机缓冲区溢出，实际有效传输率大幅缩水', '在 32 线程极限并发模式下，仪表盘测速软件虽然记录到了 920Mbps 的数值，但由于多线程激进抢占带宽导致交换机缓冲区溢出，最终有效传输率大幅缩水'],
]);

cleanFile('verified-airport-promo-codes-and-discounts-vault', [
  ['全链路核销安全标准', '全流程核销安全标准'],
]);
