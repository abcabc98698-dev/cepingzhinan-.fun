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

cleanFile('airport-runaway-early-warning-signs-and-ticket-sla', [
  ['并非突发偶发事件，而是其背后', '在其背后'],
]);

cleanFile('evening-peak-network-congestion-packet-loss-benchmark', [
  ['全链路丢包深度压测报告', '全端丢包深度压测报告'],
  ['追踪目标: 中国某地 -> 海外出口', '追踪目标为 中国某地到海外出口'],
  ['测试样本: 连续发送', '测试样本为 连续发送'],
  ['对比数据一目了然：普通公网', '对比数据一目了然 普通公网'],
  ['拥塞的物理机制拆解：', '拥塞的物理机制拆解'],
  ['核心跳数的丢包率变化实录：', '核心跳数的丢包率变化实录'],
  ['有以下三个步骤：', '有以下三个步骤'],
]);

cleanFile('feimao-cloud-massive-traffic-and-latency-review', [
  ['测试过程中的关键性能数据实录如下：', '测试过程中的关键性能数据实录如下'],
  ['抽样测试了飞猫云不同地区节点的扣费倍率一致性：', '抽样测试了飞猫云不同地区节点的扣费倍率一致性'],
  ['产品特质：', '产品特质'],
  ['最适合以下三类核心用户选型：', '最适合以下三类核心用户选型'],
  ['| 20:00 - 20:30 (峰前) |', '| 20点至20点30分 (峰前) |'],
  ['| 21:00 - 21:30 (峰顶) |', '| 21点至21点30分 (峰顶) |'],
  ['| 22:00 - 22:30 (平稳) |', '| 22点至22点30分 (平稳) |'],
]);

cleanFile('guangsu-cloud-flagship-enterprise-line-deep-dive', [
  ['全链路冗余', '端到端冗余'],
]);

cleanFile('historical-sla-uptime-tracking-and-connection-jitter', [
  ['有以下选型原则：', '有以下选型原则'],
  ['共同的痛点：为什么', '共同的痛点 为什么'],
  ['复盘公网中继在敏感时段面临的外部审查机制：', '复盘公网中继在敏感时段面临的外部审查机制'],
]);
