const fs = require('fs');
const path = require('path');

const postBaseDir = path.join(__dirname, '../src/content/post');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix timestamps with colons: 18:00 -> 18点, 20:30 -> 20点30分, etc.
  content = content.replace(/20:30 到 22:30/g, '20点30分到22点30分');
  content = content.replace(/20:00 到 23:00/g, '20点整到23点整');
  content = content.replace(/20:00-23:00/g, '20点到23点');
  content = content.replace(/19:30/g, '19点30分');
  content = content.replace(/19:45/g, '19点45分');
  content = content.replace(/03:00-08:00/g, '3点到8点');
  content = content.replace(/00:00/g, '0点');
  content = content.replace(/08:00/g, '8点');
  content = content.replace(/16:00/g, '16点');
  content = content.replace(/18:00/g, '18点');
  content = content.replace(/20:00/g, '20点');
  content = content.replace(/22:00/g, '22点');
  content = content.replace(/24:00/g, '24点');

  // Fix table colons: 码: `AMM` -> 优惠码 `AMM`
  content = content.replace(/\(码: `AMM`\)/g, '(优惠码 `AMM`)');

  // Fix scheme colons: 方案一: -> 方案一
  content = content.replace(/方案一:\s*/g, '方案一 ');
  content = content.replace(/方案二:\s*/g, '方案二 ');
  content = content.replace(/方案三:\s*/g, '方案三 ');
  content = content.replace(/优点:\s*/g, '优点 ');
  content = content.replace(/缺点:\s*/g, '缺点 ');

  // Fix generation colons in history: 第一代: -> 第一代（...）
  content = content.replace(/第一代: 对称混淆时代/g, '第一代 对称混淆时代');
  content = content.replace(/第二代: 通用隧道时代/g, '第二代 通用隧道时代');
  content = content.replace(/第三代: 完美 TLS 时代/g, '第三代 完美 TLS 时代');
  content = content.replace(/第四代: 极速单边时代/g, '第四代 极速单边时代');
  content = content.replace(/伪装目标: 例如偷取苹果官网证书指纹: icloud.com/g, '伪装目标 例如偷取苹果官网证书指纹 icloud.com');

  // Fix 策略 1: -> 策略 1
  content = content.replace(/策略 1: 尾部随机丢包/g, '策略 1 尾部随机丢包');
  content = content.replace(/策略 2: 优先丢弃民用/g, '策略 2 优先丢弃民用');

  // Fix 翻案句 in budget-friendly-cheap-airports-under-10-yuan
  content = content.replace(/宣传 100GB 流量看似充裕，一旦其香港和日本可用节点被标记为 3x 或 5x 倍率，用户实际上只能使用 20GB 到 33GB 真实流量。/g, '商家宣传的 100GB 流量，如果香港和日本可用节点被标记为 3x 或 5x 倍率，实际折算下来只有 20GB 到 33GB 真实可用额度。');
  content = content.replace(/表面看似便宜/g, '标价显得便宜');

  // Clean any remaining English colons in Chinese text outside links and tables
  // Replace remaining " :" or ": " in prose
  const parts = content.split(/^---$/m);
  if (parts.length >= 3) {
    let body = parts.slice(2).join('---');
    
    // protect code blocks
    const codeBlocks = [];
    body = body.replace(/```[\s\S]*?```/g, (m) => {
      codeBlocks.push(m);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });
    // protect inline code
    const inlineCodes = [];
    body = body.replace(/`[^`\n]*`/g, (m) => {
      inlineCodes.push(m);
      return `__INLINE_CODE_${inlineCodes.length - 1}__`;
    });
    // protect urls
    const urls = [];
    body = body.replace(/https?:\/\/[^\s)>]+/g, (m) => {
      urls.push(m);
      return `__URL_${urls.length - 1}__`;
    });

    // Replace any remaining colons in prose
    body = body.replace(/：/g, ' ');
    body = body.replace(/(?<![0-9a-zA-Z]):(?![0-9a-zA-Z\-_/])/g, ' ');

    // restore urls
    urls.forEach((u, i) => { body = body.replace(`__URL_${i}__`, u); });
    // restore inline codes
    inlineCodes.forEach((c, i) => { body = body.replace(`__INLINE_CODE_${i}__`, c); });
    // restore code blocks
    codeBlocks.forEach((b, i) => { body = body.replace(`__CODE_BLOCK_${i}__`, b); });

    content = `---${parts[1]}---${body}`;
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

const subdirs = fs.readdirSync(postBaseDir);
subdirs.forEach(dir => {
  const full = path.join(postBaseDir, dir);
  if (!fs.statSync(full).isDirectory()) return;
  const mdxFile = path.join(full, 'index.mdx');
  if (fs.existsSync(mdxFile)) {
    fixFile(mdxFile);
  }
});
console.log('Fixed all files.');
