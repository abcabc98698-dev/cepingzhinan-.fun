const fs = require('fs');
const path = require('path');

const postDir = 'src/content/post';

// 1. Rename tag-vpn-2026-review -> wgetcloud-2026-review
const oldTagDir = path.join(postDir, 'tag-vpn-2026-review');
const newWgetDir = path.join(postDir, 'wgetcloud-2026-review');
if (fs.existsSync(oldTagDir)) {
  if (fs.existsSync(newWgetDir)) {
    fs.rmSync(newWgetDir, { recursive: true, force: true });
  }
  fs.renameSync(oldTagDir, newWgetDir);
  console.log('Renamed tag-vpn-2026-review -> wgetcloud-2026-review');
}

// 2. Rename nexitally-vs-tag-comparison -> guangsu-vs-wgetcloud-comparison
const oldNexDir = path.join(postDir, 'nexitally-vs-tag-comparison');
const newNexDir = path.join(postDir, 'guangsu-vs-wgetcloud-comparison');
if (fs.existsSync(oldNexDir)) {
  if (fs.existsSync(newNexDir)) {
    fs.rmSync(newNexDir, { recursive: true, force: true });
  }
  fs.renameSync(oldNexDir, newNexDir);
  console.log('Renamed nexitally-vs-tag-comparison -> guangsu-vs-wgetcloud-comparison');
}

// 3. Update wgetcloud-2026-review/index.mdx
let fWget = path.join(newWgetDir, 'index.mdx');
if (fs.existsSync(fWget)) {
  let c = fs.readFileSync(fWget, 'utf8');
  c = c.replaceAll('TAG Internet', 'WgetCloud');
  c = c.replaceAll('TAG VPN', 'WgetCloud');
  c = c.replaceAll('TAG 节点', 'WgetCloud 专线节点');
  c = c.replaceAll('TAG 作为', 'WgetCloud 作为');
  c = c.replaceAll('TAG 设立', 'WgetCloud 设立');
  c = c.replaceAll('TAG 表现', 'WgetCloud 表现');
  c = c.replaceAll('TAG', 'WgetCloud');
  c = c.replaceAll('tag-vpn', 'wgetcloud');
  c = c.replaceAll('90+ 偏门国家节点', '优质 IEPL 内网专线与多地区节点覆盖');
  c = c.replaceAll('全冷门地区家宽落地', '全线高品质原生落地');
  fs.writeFileSync(fWget, c);
  console.log('Updated content of wgetcloud-2026-review');
}

// 4. Update guangsu-vs-wgetcloud-comparison/index.mdx
let fComp = path.join(newNexDir, 'index.mdx');
if (fs.existsSync(fComp)) {
  let c = fs.readFileSync(fComp, 'utf8');
  c = c.replaceAll('Nexitally 佩奇与 TAG Internet 旗舰二选一', '光速云与 WgetCloud 旗舰二选一');
  c = c.replaceAll('Nexitally 佩奇与 TAG Internet', '光速云与 WgetCloud');
  c = c.replaceAll('Nexitally 与 TAG', '光速云与 WgetCloud');
  c = c.replaceAll('Nexitally', '光速云');
  c = c.replaceAll('TAG Internet', 'WgetCloud');
  c = c.replaceAll('TAG VPN', 'WgetCloud');
  c = c.replaceAll('TAG', 'WgetCloud');
  c = c.replaceAll('nexitally', 'guangsu');
  c = c.replaceAll('tag-vpn', 'wgetcloud');
  fs.writeFileSync(fComp, c);
  console.log('Updated content of guangsu-vs-wgetcloud-comparison');
}

// 5. Update dual-active-redundant-airport-backup-strategy
let fDual = path.join(postDir, 'dual-active-redundant-airport-backup-strategy/index.mdx');
if (fs.existsSync(fDual)) {
  let c = fs.readFileSync(fDual, 'utf8');
  c = c.replaceAll('[iKuuu](/wiki#ikuuu)', '[梯子云](/reviews/tiziyun)');
  fs.writeFileSync(fDual, c);
  console.log('Updated dual-active-redundant-airport-backup-strategy');
}

// 6. Update free-proxy-security-risks
let fRisk = path.join(postDir, 'free-proxy-security-risks/index.mdx');
if (fs.existsSync(fRisk)) {
  let c = fs.readFileSync(fRisk, 'utf8');
  c = c.replaceAll('[iKuuu](/wiki#ikuuu)', '[梯子云](/reviews/tiziyun)');
  fs.writeFileSync(fRisk, c);
  console.log('Updated free-proxy-security-risks');
}

// 7. Update truth-behind-free-clash-nodes-and-public-proxies
let fTruth = path.join(postDir, 'truth-behind-free-clash-nodes-and-public-proxies/index.mdx');
if (fs.existsSync(fTruth)) {
  let c = fs.readFileSync(fTruth, 'utf8');
  c = c.replaceAll('[iKuuu](/wiki#ikuuu)', '[梯子云](/reviews/tiziyun)');
  fs.writeFileSync(fTruth, c);
  console.log('Updated truth-behind-free-clash-nodes-and-public-proxies');
}

// 8. Update isp-routing-differentiation
let fIsp = path.join(postDir, 'isp-routing-differentiation/index.mdx');
if (fs.existsSync(fIsp)) {
  let c = fs.readFileSync(fIsp, 'utf8');
  c = c.replaceAll('[TAG Internet](/reviews#tag-vpn) 与 [Nexitally 佩奇](/reviews#nexitally)', '[光速云](/reviews/guangsu) 与 [WgetCloud](/reviews/wgetcloud)');
  c = c.replaceAll('[FSCloud](/reviews#fscloud)', '[微风网络](/reviews/weifeng)');
  fs.writeFileSync(fIsp, c);
  console.log('Updated isp-routing-differentiation');
}
