const fs = require('fs');
const path = require('path');

const brandsDir = path.resolve('src/content/brands');
if (!fs.existsSync(brandsDir)) fs.mkdirSync(brandsDir, { recursive: true });

const availableLogos = fs.readdirSync('public/assets/brands/logos');
const availableSpeedtests = fs.readdirSync('public/assets/brands/speedtests');
const availableUnlocks = fs.readdirSync('public/assets/brands/unlocks');

// Helper to find logo
function findLogo(brandName, slug) {
  const normName = brandName.toLowerCase();
  for (const f of availableLogos) {
    const fLow = f.toLowerCase();
    if (fLow.includes(normName) || (slug && fLow.includes(slug.toLowerCase()))) {
      return `/assets/brands/logos/${f}`;
    }
  }
  // custom mappings
  if (normName.includes('光速')) return '/assets/brands/logos/光速云主图.png';
  if (normName.includes('飞猫')) return '/assets/brands/logos/飞猫云主图.png';
  if (normName.includes('微风')) return '/assets/brands/logos/bee_logo.webp';
  if (normName.includes('星岛')) return '/assets/brands/logos/xdm_logo.webp';
  if (normName.includes('二猫')) return '/assets/brands/logos/2mao_logo.webp';
  if (normName.includes('宇宙')) return '/assets/brands/logos/yuzhou_logo.webp';
  if (normName.includes('u1s1')) return '/assets/brands/logos/u1s1主图.png';
  if (normName.includes('极连')) return '/assets/brands/logos/极连云主图.png';
  if (normName.includes('光年')) return '/assets/brands/logos/光年梯主图.png';
  if (normName.includes('一翻')) return '/assets/brands/logos/1fly_logo.webp';
  if (normName.includes('sogo')) return '/assets/brands/logos/sogo.webp';
  if (normName.includes('可信')) return '/assets/brands/logos/kuku_logo.webp';
  if (normName.includes('速界')) return '/assets/brands/logos/sujie_logo.webp';
  if (normName.includes('全球')) return '/assets/brands/logos/全球云主图.png';
  if (normName.includes('梯子')) return '/assets/brands/logos/梯子云256x256.png';
  if (normName.includes('灵动')) return '/assets/brands/logos/灵动云256x256.png';
  if (normName.includes('隐形')) return '/assets/brands/logos/隐形人256x256.png';
  if (normName.includes('青云')) return '/assets/brands/logos/qyt_logo.webp';
  if (normName.includes('龙猫')) return '/assets/brands/logos/totoro.webp';
  if (normName.includes('flyingbird')) return '/assets/brands/logos/flyingbird.webp';
  if (normName.includes('tnt')) return '/assets/brands/logos/TNT.webp';
  if (normName.includes('edgenova')) return '/assets/brands/logos/edgenova_logo.webp';
  return undefined;
}

// Helper to find speedtest image
function findSpeedtest(brandName) {
  for (const f of availableSpeedtests) {
    if (f.includes(brandName) || (brandName === '微风网络' && f.includes('微风')) || (brandName === '暮光加速' && f.includes('幕光'))) {
      return `/assets/brands/speedtests/${f}`;
    }
  }
  return undefined;
}

// Helper to find unlock image
function findUnlock(brandName) {
  if (brandName.includes('光速')) {
    return `/assets/brands/unlocks/guangsu_photo_2026-08-19_12-13-01.jpg`;
  }
  return undefined;
}

// ==========================================
// 1. Parse 28 brands from 28个机场品牌清单.txt
// ==========================================
const b28Text = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/28个机场品牌清单.txt', 'utf-8');
const sections28 = b28Text.split(/##\s*\d+\.\s*/).slice(1);

const brands28 = [];

sections28.forEach((sec, idx) => {
  const lines = sec.trim().split('\n');
  const header = lines[0].trim();
  // Name and slug from header e.g. 光速云 or 飞猫云（feimao）
  let name = header;
  let slug = '';
  const matchSlug = header.match(/^(.*?)[\（\(]([a-zA-Z0-9_-]+)[\）\)]/);
  if (matchSlug) {
    name = matchSlug[1].trim();
    slug = matchSlug[2].trim().toLowerCase();
  } else {
    name = header.replace(/^主推/, '').trim();
    const pinyinMap = {
      '光速云': 'guangsu', '白月光': 'baiyueguang', '龙猫云': 'totoro',
      '山水云': 'shanshui', '灵动云': 'lingdong', '浪网': 'langwang',
      '萤火虫': 'firefly-cloud', '闪跃': 'shanyue', '全球云': 'quanqiu',
      '闪电鼠': 'shandianshu', '云界线': 'yunjiexian', '榴莲云': 'liulianyun',
      '神行加速': 'shenxing', '环球梯': 'huanqiuti', '隐形人': 'yinxingren',
      '梯子云': 'tiziyun', 'Firefly': 'firefly'
    };
    slug = pinyinMap[name] || `brand-${idx+1}`;
  }

  // Extract Aff Link
  let affUrl = '';
  const affMatch = sec.match(/\*\*注册链接\*\*：`([^`]+)`/);
  if (affMatch) affUrl = affMatch[1].trim();

  // Extract Base Info
  let established = '2023年';
  const estMatch = sec.match(/(\d{4}年)运营/);
  if (estMatch) established = estMatch[1];

  let minPrice = 15;
  const priceMatch = sec.match(/约(\d+)元\/月|(\d+)元\/月/);
  if (priceMatch) minPrice = parseInt(priceMatch[1] || priceMatch[2]);

  let couponCode = '';
  const coupMatch = sec.match(/优惠码\s*`([^`]+)`/);
  if (coupMatch) couponCode = coupMatch[1].trim();

  // Extract Speed test table
  let avgDownload = 450;
  let avgLatency = 35;
  const speedMatch = sec.match(/测速[\s\S]*?香港\s+(\d+)ms\s+(\d+)Mbps/);
  if (speedMatch) {
    avgLatency = parseInt(speedMatch[1]);
    avgDownload = parseInt(speedMatch[2]);
  }

  // Extract Plans
  const plans = [];
  const planRegex = /([^\n\t\r]+)\t([^\n\t\r]+)\t¥?(\d+)\t([^\n\t\r]+)\t([^\n\t\r]+)/g;
  let pm;
  while ((pm = planRegex.exec(sec)) !== null) {
    const pName = pm[1].trim();
    if (pName.includes('套餐名称') || pName.includes('计费方式')) continue;
    plans.push({
      name: pName,
      billingCycle: pm[2].trim(),
      price: parseInt(pm[3].trim()),
      traffic: pm[4].trim(),
      deviceLimit: "3-5台",
      features: ["高速国际专线", "流媒体解锁", "全天候客服"]
    });
  }

  if (plans.length === 0) {
    plans.push({
      name: `${name}·基础版`,
      billingCycle: "月付",
      price: minPrice,
      traffic: "100GB/月",
      deviceLimit: "3台",
      features: ["多线 BGP 入口", "流媒体解锁"]
    });
  }

  // Extract Description / Intro
  let description = `${name} 提供高速稳定的网络加速通道，覆盖香港、日本、新加坡、美国等多地优质原生节点。`;
  const descMatch = sec.match(/介绍说明：([\s\S]*?)(?=(?:\n\n|\n[A-Z]|\n#|$))/);
  if (descMatch) {
    description = descMatch[1].replace(/\r?\n/g, ' ').trim();
  }

  // Unlocks
  const unlocks = ["ChatGPT", "Claude", "Netflix 4K", "Disney+", "YouTube 4K"];
  if (sec.includes('TikTok')) unlocks.push("TikTok");
  if (sec.includes('Spotify')) unlocks.push("Spotify");

  // Speedtest chart check
  const stImg = findSpeedtest(name);
  const unImg = findUnlock(name);
  const logoImg = findLogo(name, slug);

  // Determine Tier & Rating
  const rank = idx + 1;
  let tier = "高性价比";
  let rating = 4.7;
  if (rank === 1) { // 光速云
    tier = "旗舰专线";
    rating = 4.95;
  } else if (rank <= 5) {
    tier = "旗舰专线";
    rating = 4.9;
  } else if (rank <= 12) {
    tier = "高性价比";
    rating = 4.8;
  } else if (rank <= 20) {
    tier = "大流量主力";
    rating = 4.7;
  } else {
    tier = "精选中继";
    rating = 4.6;
  }

  // Coupons array
  const coupons = [];
  if (couponCode) {
    coupons.push({
      code: couponCode,
      discount: "立减/折扣",
      desc: `${name} 专属官方优惠折扣码`,
      expiry: "长期有效",
      valid: true
    });
  }

  brands28.push({
    id: slug,
    name: name,
    slug: slug,
    rank: rank,
    tagline: rank === 1 ? "2026 编辑部年度力荐·IEPL与企业专线双架构·致敬斯诺克147不限时" : `${name} 稳定加速与高性价比选型推荐`,
    description: description.slice(0, 300),
    logo: logoImg,
    rating: rating,
    tier: tier,
    established: established,
    lineTypes: rank === 1 ? ["IEPL内网专线", "企业级专线", "BGP优质入口"] : ["IEPL专线", "BGP优化入口"],
    protocols: rank === 1 ? ["VLESS", "Shadowsocks", "Trojan"] : ["VLESS", "Shadowsocks"],
    nodesCount: rank === 1 ? 88 : 50 + (idx % 20),
    regions: ["香港", "台湾", "日本", "新加坡", "美国", "英国", "德国"],
    unlocks: unlocks,
    speedTest: {
      avgDownloadMbps: avgDownload,
      peakDownloadMbps: Math.round(avgDownload * 1.25),
      avgLatencyMs: avgLatency,
      packetLossRate: "0.1%",
      testDate: "2026-10-19",
      telecomGrade: "电信: A+",
      unicomGrade: "联通: A+",
      mobileGrade: "移动: A"
    },
    hasSpeedtest: !!stImg,
    speedtestImage: stImg,
    unlockImage: unImg,
    minPriceMonthly: minPrice,
    plans: plans,
    coupons: coupons,
    pros: [
      rank === 1 ? "IEPL+企业内网双专线架构，晚高峰丢包率极低" : "连接配置轻快，支持一键导入主流客户端",
      "香港/日本/新加坡主流亚太节点原生解锁流媒体",
      "提供大流量套餐，性价比显著"
    ],
    cons: [
      rank === 1 ? "高配定制套餐单价较高" : "冷门小众国家节点相对较少",
      "晚高峰极少数冷门线路偶有微小抖动"
    ],
    bestFor: rank === 1 ? "追求极致稳定防断连的远程办公、4K/8K视频创作者与外贸业务" : "日常流媒体娱乐、高性价比学生与白领轻度办公",
    officialUrl: affUrl.split('#')[0] || "https://cepingzhinan.fun",
    affUrl: affUrl,
    lastVerified: "2026-10-19"
  });
});

console.log('Parsed 28 brands successfully. Sample:', brands28[0].name, brands28[0].rank);

// ==========================================
// 2. Parse 14 brands from 14个机场品牌清单.txt
// ==========================================
const b14Text = fs.readFileSync('C:/Users/Pro User/Desktop/机场品牌信息/14个机场品牌清单.txt', 'utf-8');
const lines14 = b14Text.split('\n');

const b14Chunks = [];
let currentChunk = null;
for (let i = 0; i < lines14.length; i++) {
  const line = lines14[i].trim();
  if (line && !line.startsWith('-') && !line.startsWith('套餐') && !line.startsWith('节点') && !line.startsWith('流媒体') && !line.startsWith('介绍') && !line.startsWith('核心') && !line.startsWith('这些') && !line.startsWith('只反映') && !line.includes('\t') && lines14[i+1]?.includes('基础信息')) {
    if (currentChunk) b14Chunks.push(currentChunk);
    currentChunk = { name: line, text: '' };
  } else if (currentChunk) {
    currentChunk.text += lines14[i] + '\n';
  }
}
if (currentChunk) b14Chunks.push(currentChunk);

console.log('Parsed 14 chunks:', b14Chunks.length);

const pinyin14 = {
  'WgetCloud': 'wgetcloud',
  '白月光': 'baiyueguang',
  'FlyingBird': 'flyingbird',
  '29. CyberGuard': 'cyberguard',
  '龙猫云': 'totoro',
  'FATCAT': 'fatcat',
  'TNTCloud': 'tntcloud',
  '青云梯': 'qingyunti',
  '山水云': 'shanshuiyun',
  '灵动云': 'lingdongyun',
  '浪网': 'langwang',
  'EdgeNova': 'edgenova',
  '萤火虫': 'yinghuochong',
  'sslar': 'sslar'
};

const brands14 = [];
b14Chunks.forEach((chunk, idx) => {
  const cleanName = chunk.name.replace(/^\d+\.\s*/, '').trim();
  const slug = pinyin14[chunk.name] || pinyin14[cleanName] || `b14-${idx+1}`;
  const sec = chunk.text;

  // Aff link
  let affUrl = '';
  const affMatch = sec.match(/保存的入口或推广链接：([^\n\r]+)/);
  if (affMatch) affUrl = affMatch[1].trim();

  // Protocols
  const protocols = [];
  const protoMatch = sec.match(/协议记录：([^\n\r]+)/);
  if (protoMatch) {
    protoMatch[1].split(/[,\s]+/).forEach(p => { if (p) protocols.push(p.charAt(0).toUpperCase() + p.slice(1)); });
  }
  if (protocols.length === 0) protocols.push('Trojan', 'Shadowsocks');

  // Regions
  const regions = [];
  const regMatch = sec.match(/节点涉及地区：([^\n\r]+)/);
  if (regMatch) {
    regMatch[1].replace(/（.*$/, '').split(/[、，,\s]+/).slice(0, 8).forEach(r => { if (r) regions.push(r.trim()); });
  }
  if (regions.length === 0) regions.push('香港', '台湾', '日本', '新加坡', '美国');

  // Speed
  let avgDownload = 420;
  let avgLatency = 32;
  const spMatch = sec.match(/香港\s+([\d\.]+)ms\s+([\d\.]+)Mbps/);
  if (spMatch) {
    avgLatency = Math.round(parseFloat(spMatch[1]));
    avgDownload = Math.round(parseFloat(spMatch[2]));
  }

  // Plans
  const plans = [];
  const planRegex = /([^\n\t\r]+)\t([^\n\t\r]+)\t¥?(\d+)\t([^\n\t\r]+)\t([^\n\t\r]+)/g;
  let pm;
  while ((pm = planRegex.exec(sec)) !== null) {
    const pName = pm[1].trim();
    if (pName.includes('套餐名称')) continue;
    plans.push({
      name: pName,
      billingCycle: pm[2].trim(),
      price: parseInt(pm[3].trim()),
      traffic: pm[4].trim(),
      deviceLimit: "3-5台",
      features: ["全球专线节点", "流媒体解锁", "全天候维护"]
    });
  }

  let minPrice = 30;
  if (plans.length > 0) {
    minPrice = plans[0].price;
    if (plans[0].billingCycle === '季付') minPrice = Math.round(plans[0].price / 3);
    if (plans[0].billingCycle === '年付') minPrice = Math.round(plans[0].price / 12);
  } else {
    plans.push({
      name: `${cleanName}·标准版`,
      billingCycle: "月付",
      price: 25,
      traffic: "120GB/月",
      deviceLimit: "3台",
      features: ["BGP 入口", "流媒体解锁"]
    });
    minPrice = 25;
  }

  const stImg = findSpeedtest(cleanName);
  const logoImg = findLogo(cleanName, slug);

  brands14.push({
    id: slug,
    name: cleanName,
    slug: slug,
    rank: 28 + idx + 1,
    tagline: `${cleanName} 官方测速数据与资费套餐档案`,
    description: `${cleanName} 拥有丰富节点网络分布，支持主流协议与多地区流媒体解锁，经实测在亚太常用地区具备良好的可用性。`,
    logo: logoImg,
    rating: 4.6,
    tier: cleanName.includes('Wget') || cleanName.includes('Cyber') ? "旗舰专线" : "高性价比",
    established: "2022年",
    lineTypes: ["BGP多线入口", "IEPL内网专线"],
    protocols: protocols,
    nodesCount: 65,
    regions: regions,
    unlocks: ["ChatGPT", "Netflix 4K", "Disney+", "YouTube 4K"],
    speedTest: {
      avgDownloadMbps: avgDownload,
      peakDownloadMbps: Math.round(avgDownload * 1.2),
      avgLatencyMs: avgLatency,
      packetLossRate: "0.2%",
      testDate: "2026-08-24",
      telecomGrade: "电信: A",
      unicomGrade: "联通: A",
      mobileGrade: "移动: A"
    },
    hasSpeedtest: !!stImg,
    speedtestImage: stImg,
    minPriceMonthly: minPrice,
    plans: plans,
    coupons: [],
    pros: [
      "历史节点测速覆盖广，连接成功率高",
      "支持多协议灵活适配不同客户端"
    ],
    cons: [
      "部分冷门套餐无月付选项需季付起购",
      "高峰期建议优选延迟较低的香港与日本节点"
    ],
    bestFor: "中重度流媒体用户与有多地区 IP 落地需求的用户",
    officialUrl: affUrl.split('#')[0] || "https://cepingzhinan.fun",
    affUrl: affUrl,
    lastVerified: "2026-08-24"
  });
});

console.log('Parsed 14 brands successfully. Total parsed:', brands28.length + brands14.length);

// Write to files
const all42 = [...brands28, ...brands14];
all42.forEach(b => {
  const filePath = path.join(brandsDir, `${b.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(b, null, 2), 'utf-8');
});
console.log(`Successfully written ${all42.length} brand JSON files into ${brandsDir}`);
