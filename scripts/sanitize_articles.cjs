const fs = require('fs');
const path = require('path');

const postBaseDir = path.join(__dirname, '../src/content/post');

function cleanMdx(content) {
  // Split frontmatter and body
  const parts = content.split(/^---$/m);
  if (parts.length < 3) return content;
  const fm = parts[1];
  let body = parts.slice(2).join('---');

  // Split code blocks so we don't touch code
  const codeBlocks = [];
  body = body.replace(/```[\s\S]*?```/g, (m) => {
    codeBlocks.push(m);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Split inline code
  const inlineCodes = [];
  body = body.replace(/`[^`\n]*`/g, (m) => {
    inlineCodes.push(m);
    return `__INLINE_CODE_${inlineCodes.length - 1}__`;
  });

  // Replace colons in running text
  // 1. **标题**：内容 -> **标题** 内容
  body = body.replace(/\*\*：/g, '** ');
  body = body.replace(/：\*\*/g, '**');
  // 2. 结尾冒号： -> 结尾句号。
  body = body.replace(/：\s*$/gm, '。');
  body = body.replace(/：(?=\s*\n)/g, '。');
  // 3. 行内冒号： -> 顿号或破折替换为普通连接
  body = body.replace(/：/g, ' ');

  // Fix 翻案句 patterns
  body = body.replace(/不是满互联网搜刮来源不明的劣质节点，而是通过/g, '与其满互联网搜刮来源不明的劣质节点，更明智的做法是通过');
  body = body.replace(/表面上提供代理服务，实际上在后台/g, '假借提供代理服务之名，在后台');
  body = body.replace(/宣传 100GB 流量看似充裕，但如果其香港和日本可用节点全部被标记为 3x 或 5x 倍率，那么实际上用户/g, '宣传 100GB 流量看似充裕，一旦其香港和日本可用节点被标记为 3x 或 5x 倍率，用户实际上');

  // Fix Jargon
  body = body.replace(/全链路的 UDP 丢包/g, '整条链路上的 UDP 丢包');
  body = body.replace(/全链路/g, '端到端链路');

  // Restore inline code
  inlineCodes.forEach((code, idx) => {
    body = body.replace(`__INLINE_CODE_${idx}__`, code);
  });

  // Restore code blocks
  codeBlocks.forEach((code, idx) => {
    body = body.replace(`__CODE_BLOCK_${idx}__`, code);
  });

  return `---${fm}---${body}`;
}

const subdirs = fs.readdirSync(postBaseDir);
subdirs.forEach(dir => {
  const full = path.join(postBaseDir, dir);
  if (!fs.statSync(full).isDirectory()) return;
  const mdxFile = path.join(full, 'index.mdx');
  if (fs.existsSync(mdxFile)) {
    const raw = fs.readFileSync(mdxFile, 'utf8');
    const cleaned = cleanMdx(raw);
    fs.writeFileSync(mdxFile, cleaned, 'utf8');
    console.log('Sanitized:', dir);
  }
});
