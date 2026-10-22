const fs = require('fs');
const path = require('path');

const HARD_STOPS = ["说白了", "说穿了", "先说结论"];
const HARD_JARGON = [
  "赋能", "抓手", "商业闭环", "价值闭环", "能力沉淀", "拉通",
  "底层逻辑", "顶层设计", "认知跃迁", "价值释放", "能力建设",
  "降本增效", "内容矩阵", "全链路", "组合拳", "打开想象空间",
  "结构性机会", "关键命题", "深层逻辑", "技术底座", "公共底座",
  "技术主权", "单点风险", "主脊柱", "材料锚点", "认知增量", "迭代闭环"
];
const ROAD_SIGNS = [
  "更微妙的是", "还有一层", "只说对了一半", "值得注意的是",
  "需要指出的是", "从某种意义上说"
];
const PIVOT_PATTERNS = [
  /(?:并)?不是[^。！？\n]{0,90}而是/g,
  /并非[^。！？\n]{0,90}而是/g,
  /不在于[^。！？\n]{0,90}而在于/g,
  /与其说[^。！？\n]{0,90}(?:不如|毋宁|倒不如)/g,
  /[。！？!?]\s*而是/g,
  /表面(?:上)?[^。！？\n]{0,90}(?:其实|实际|实则)/g,
  /看似[^。！？\n]{0,90}(?:其实|实际|实则)/g,
];

function maskNonProse(text) {
  // Mask frontmatter
  let masked = text.replace(/^---[\s\S]*?---/g, m => ' '.repeat(m.length));
  // Mask code blocks
  masked = masked.replace(/```[\s\S]*?```/g, m => ' '.repeat(m.length));
  // Mask inline code
  masked = masked.replace(/`[^`\n]*`/g, m => ' '.repeat(m.length));
  // Mask markdown table alignment rows e.g. | :--- | :---: |
  masked = masked.replace(/^\|[\s\-:|]+\|$/gm, m => ' '.repeat(m.length));
  // Mask markdown links [text](url)
  masked = masked.replace(/\]\([^\n)]*\)/g, m => ' '.repeat(m.length));
  // Mask URLs
  masked = masked.replace(/https?:\/\/[^\s)>]+/g, m => ' '.repeat(m.length));
  // Mask HTML tags
  masked = masked.replace(/<[^>\n]+>/g, m => ' '.repeat(m.length));
  return masked;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const prose = maskNonProse(content);
  const errors = [];

  // Punctuation check
  const colonMatches = prose.match(/[：:]/g);
  if (colonMatches) {
    errors.push(`冒号共 ${colonMatches.length} 处`);
  }
  const dashMatches = prose.match(/[—–]/g);
  if (dashMatches) {
    errors.push(`破折号共 ${dashMatches.length} 处`);
  }

  // Hard stops
  for (const stop of HARD_STOPS) {
    if (prose.includes(stop)) {
      errors.push(`硬停词: ${stop}`);
    }
  }

  // Hard jargon
  for (const jargon of HARD_JARGON) {
    if (prose.includes(jargon)) {
      errors.push(`黑话词: ${jargon}`);
    }
  }

  // Road signs
  for (const sign of ROAD_SIGNS) {
    if (prose.includes(sign)) {
      errors.push(`模型路标: ${sign}`);
    }
  }

  // Pivot patterns
  for (const pattern of PIVOT_PATTERNS) {
    const matches = prose.match(pattern);
    if (matches) {
      errors.push(`翻案句: ${matches[0]}`);
    }
  }

  return errors;
}

// Check all posts
const postDir = path.join(__dirname, '../src/content/post');
const subdirs = fs.readdirSync(postDir);
let totalErrors = 0;

for (const dir of subdirs) {
  const full = path.join(postDir, dir);
  if (!fs.statSync(full).isDirectory()) continue;
  const mdxFile = path.join(full, 'index.mdx');
  if (fs.existsSync(mdxFile)) {
    const errs = checkFile(mdxFile);
    if (errs.length > 0) {
      console.log(`[FAIL] ${dir}:`);
      errs.forEach(e => console.log('  -', e));
      totalErrors += errs.length;
    } else {
      console.log(`[PASS] ${dir}`);
    }
  }
}

console.log(`\nTotal errors: ${totalErrors}`);
process.exit(totalErrors > 0 ? 1 : 0);
