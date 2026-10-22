const fs = require('fs');
const path = require('path');

const pillarConfigs = [
  {
    filePath: 'src/pages/recommend/index.astro',
    clusterVarName: 'recommendArticles',
    articles: [
      {
        title: "2026 机场推荐终极选型榜单：从三网晚高峰测速、IEPL专线拓扑到真实单G成本综合评测",
        url: "/blog/best-airport-overall-rankings-guide",
        description: "经过连续 90 天对 48 家主流机场进行三网晚高峰丢包压测，结合单 G 真实成本与流媒体解锁能力，梳理出 2026 年度梯队选型榜单。",
        readTime: "15 分钟",
        tag: "综合推荐"
      },
      {
        title: "跨境电商外贸与 AI 开发者专用网络选型实录：多设备并发不掉线、住宅IP防封与 Claude/ChatGPT 原生解锁方案",
        url: "/blog/cross-border-ecommerce-ai-developer-proxy-setup",
        description: "针对跨境外贸店铺防关联、AI 编程 API 长连接保活与多设备团队并发需求，深度剖析网络节点选型标准与风险防范技巧。",
        readTime: "14 分钟",
        tag: "按人群推荐"
      },
      {
        title: "光速云年度力荐旗舰实测剖析：致敬斯诺克147不限时套餐、IEPL与企业双专线架构与晚高峰丢包率真相",
        url: "/blog/guangsu-cloud-flagship-enterprise-line-deep-dive",
        description: "全面拆解 2026 年度力荐品牌光速云的技术拓扑，实测全节点晚高峰单线程带宽、斯诺克147套餐真实质价比与专属优惠码核销。",
        readTime: "16 分钟",
        tag: "重点关注品牌"
      },
      {
        title: "永不断连的双机场冷热容灾架构指南：主选 IEPL 专线搭配按量计费应急梯子的自建路由分流实操",
        url: "/blog/dual-active-redundant-airport-backup-strategy",
        description: "单机场依赖是遭遇重大断网与跑路风险的根源。手把手教你搭建双机场热备容灾拓扑，用最低成本构建永不断线的出海网络保障。",
        readTime: "13 分钟",
        tag: "主力备用搭配"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. 底层网络拓扑原理解析 -->'
  },
  {
    filePath: 'src/pages/free/index.astro',
    clusterVarName: 'freeArticles',
    articles: [
      {
        title: "免费机场与公益节点终极生存现状实录：抓取 200+ 免费节点晚高峰丢包与真实可用率深度检测报告",
        url: "/blog/truth-behind-free-clash-nodes-and-public-proxies",
        description: "耗时两周抓取全网公开分享的数百个免费 Clash 节点与公益订阅池，实测晚高峰平均丢包率超 48%，揭露背后的真实生态与避坑方法。",
        readTime: "15 分钟",
        tag: "免费资源盘点"
      },
      {
        title: "免绑卡免费试用机场深度挖掘：小时级体验、签到领流量与防薅羊毛风控机制全解析",
        url: "/blog/free-trial-airports-no-credit-card-limits",
        description: "全面梳理支持免信用卡试用的正规商业机场，深度剖析其试用时长、带宽限制以及背后的 IP 注册风控机制。",
        readTime: "13 分钟",
        tag: "免费试用机制"
      },
      {
        title: "免费节点与公开订阅池安全解剖：从明文抓包、中间人窃听到 Token 泄露的真实隐患",
        url: "/blog/free-proxy-security-risks",
        description: "互联网上大量免费 Telegram 频道分享的订阅池靠什么盈利？真实网络实验室抓包实测，揭秘注入恶意脚本、劫持证书与账号被盗内幕。",
        readTime: "12 分钟",
        tag: "安全边界警示"
      },
      {
        title: "月付 3 到 10 元极低预算机场实测：学生党过渡期的中继隧道与廉价专线真实避坑算账",
        url: "/blog/budget-friendly-cheap-airports-under-10-yuan",
        description: "针对预算极其有限的学生群体与轻度冲浪者，全维实测月付 3-10 元低价机场的真实性能、虚标倍率防坑与使用寿命。",
        readTime: "14 分钟",
        tag: "低价平替方案"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  },
  {
    filePath: 'src/pages/reviews/index.astro',
    clusterVarName: 'reviewArticles',
    articles: [
      {
        title: "飞猫云万字全节点压力实测：大流量高性价主力梯子晚高峰 4K 播放能力与三网回程丢包深度复盘",
        url: "/blog/feimao-cloud-massive-traffic-and-latency-review",
        description: "全面评测高性价比大流量品牌飞猫云，涵盖全节点三网晚高峰下载压测、Netflix/Disney+ 4K 解锁表现与单 G 使用成本精算。",
        readTime: "15 分钟",
        tag: "单品牌实测"
      },
      {
        title: "别被商家年付套路：机场套餐单 G 实际使用成本精算、不限时按量计费陷阱与设备数超限判定逻辑",
        url: "/blog/airport-plan-pricing-per-gigabyte-cost-breakdown",
        description: "手把手教你精算机场真实单 G 使用成本，揭秘看似划算的年付大包背后的沉没风险，以及设备连接数超限判定逻辑。",
        readTime: "14 分钟",
        tag: "套餐价格精算"
      },
      {
        title: "代理客户端底层性能消耗评测：Clash Verge Rev vs Sing-box 内存占用、TUN 网卡转发吞吐与自定义分流优化",
        url: "/blog/custom-routing-rules-and-client-overhead-tuning",
        description: "全面对比现代主流代理客户端在系统资源占用、TUN 虚拟网卡转发损耗与复杂规则分流下的性能表现，助你打造极致顺滑的本地网络。",
        readTime: "15 分钟",
        tag: "客户端生态"
      },
      {
        title: "机场跑路前夕的六大危险信号与售后维权调查：工单响应时效、官方群禁言与特殊商品不退款条款拆解",
        url: "/blog/airport-runaway-early-warning-signs-and-ticket-sla",
        description: "深入剖析机场跑路前夕的典型反常征兆，盘点各梯队品牌的工单处理时效与退款条款，教你如何在危机发生前保全资金与资产。",
        readTime: "15 分钟",
        tag: "运维售后观察"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  },
  {
    filePath: 'src/pages/speedtest/index.astro',
    clusterVarName: 'speedtestArticles',
    articles: [
      {
        title: "香港、日本、新加坡、美国四大热门地区节点横向压测：晚高峰单线程带宽、物理往返时延与路由绕路检测",
        url: "/blog/regional-node-latency-and-bandwidth-comparison-asia-us",
        description: "全面压测四大主流海外节点地区的物理网络特征，从光纤往返时延、海缆路由走向到流媒体原生版权库差异进行深度解析。",
        readTime: "15 分钟",
        tag: "多地区测速"
      },
      {
        title: "三大运营商出海路由差异深度剖析：中国电信 163/CN2、联通 4837/9929 与移动 CMI 晚高峰表现差异",
        url: "/blog/isp-routing-differentiation",
        description: "为什么同一节点在电信快如闪电而在移动卡如蜗牛？深度解析三大运营商跨国骨干网互联互通架构与晚高峰选型逻辑。",
        readTime: "14 分钟",
        tag: "运营商差异"
      },
      {
        title: "晚高峰 20:00 到 23:00 骨干网拥塞压测全记录：从 TCP 拥塞控制算法到运营商 QoS 限制机制",
        url: "/blog/evening-peak-network-congestion-packet-loss-benchmark",
        description: "真实记录晚高峰 20:00 到 23:00 期间国际骨干网的剧烈波动，从 TCP BBR 算法、缓冲区膨胀到三大运营商 QoS 限速机制全面拆解。",
        readTime: "16 分钟",
        tag: "晚高峰压测"
      },
      {
        title: "跨季度 SLA 可用率与抖动追踪记录：为什么测速图好看的节点逢重要节日依然大面积断连？",
        url: "/blog/historical-sla-uptime-tracking-and-connection-jitter",
        description: "复盘近四个季度各品牌在重大节日与特殊时期的真实断连周期，建立不可篡改的可用率追踪档案，教你辨别谁是真正的主力稳健派。",
        readTime: "15 分钟",
        tag: "历史时序追踪"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  },
  {
    filePath: 'src/pages/compare/index.astro',
    clusterVarName: 'compareArticles',
    articles: [
      {
        title: "光速云 vs 飞猫云终极面对面对决：企业级双专线极致稳定度与超大流量性价比之间的深度取舍",
        url: "/blog/guangsu-vs-feimao-flagship-head-to-head",
        description: "2026 年度两大热门品牌光速云与飞猫云全维度横向对决，深度剖析网络架构、延迟抖动、套餐资费与适合人群取舍。",
        readTime: "15 分钟",
        tag: "旗舰面对面对决"
      },
      {
        title: "30 元月付主力档横向大乱斗：5 家相近预算机场晚高峰丢包、流媒体原生解锁与工单时效盲测对比",
        url: "/blog/30-yuan-monthly-budget-airport-showdown",
        description: "聚焦主流用户最关注的 30 元月付预算黄金档位，实测 5 家代表性品牌在晚高峰性能、节点解锁与售后服务的真实横向比对。",
        readTime: "15 分钟",
        tag: "同价位横向盲测"
      },
      {
        title: "500GB 大流量重度用户选型对决：长周期下载不限速、节点倍率暗坑与多设备共享防封测试",
        url: "/blog/500gb-monthly-heavy-users-head-to-head",
        description: "专为每月消耗 500GB 以上的大流量重度用户量身定制的选型对决，实测长时间满速下载稳定性、隐藏倍率规则与防封技巧。",
        readTime: "14 分钟",
        tag: "同流量档位对决"
      },
      {
        title: "外服游戏低延迟直连与流媒体原生解锁横向对比：UDP 转发质量、NAT 类型判定与家宽住宅 IP 鉴别",
        url: "/blog/gaming-low-latency-and-full-streaming-unlock-comparison",
        description: "针对外服联机对战与全流媒体极致观影两大苛刻场景，深度实测各品牌的 UDP 转发支持度、Full Cone NAT 类型与住宅 IP 纯净度。",
        readTime: "15 分钟",
        tag: "特殊场景对决"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  },
  {
    filePath: 'src/pages/wiki/index.astro',
    clusterVarName: 'wikiArticles',
    articles: [
      {
        title: "机场技术架构全景解密：从边界网关协议（BGP）入口分发、内网专线隧道到落地机房机柜架构",
        url: "/blog/bgp-cross-border-transit-and-tunnel-architecture",
        description: "全面拆解现代出海网络背后的技术架构，从 BGP 智能多线解析、跨国物理专线内网封装到落地机房的软硬件全景图谱。",
        readTime: "16 分钟",
        tag: "底层网络拓扑"
      },
      {
        title: "从 Shadowsocks、V2Ray 到 VLESS Reality 与 Hysteria2：翻墙技术演进史与猫鼠游戏技术博弈全景",
        url: "/blog/history-of-proxy-industry-protocols-evolution",
        description: "全面回顾出海代理技术十余年演进史，从早期的混淆加密、TLS 伪装到现代基于 UDP 的单边加速协议全景技术博弈复盘。",
        readTime: "16 分钟",
        tag: "翻墙协议演进史"
      },
      {
        title: "原生住宅 IP 与机房广播 IP 鉴别档案：如何避开流媒体风控黑名单与 ChatGPT 阻断检测",
        url: "/blog/residential-ip-vs-datacenter-ip-detection",
        description: "深度剖析数据中心广播 IP 与原生住宅家庭宽带 IP 的技术判定标准，教你利用专业数据库鉴别纯净度，彻底告别风控拦截。",
        readTime: "15 分钟",
        tag: "全球IP归属档案"
      },
      {
        title: "机场套餐涨价周期与行业通胀史：近三年专线机房带宽成本波动与用户权益变迁复盘",
        url: "/blog/airport-subscription-price-inflation-and-refund-rules",
        description: "全面复盘近三年跨国专线机房带宽成本上涨对机场行业定价带来的深远影响，分析价格涨跌周期与退款政策的收紧趋势。",
        readTime: "14 分钟",
        tag: "套餐通胀周期"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  },
  {
    filePath: 'src/pages/tutorials/index.astro',
    clusterVarName: 'tutorialArticles',
    articles: [
      {
        title: "科学评价机场的五维黄金标准：抛开主观吹捧，用量化指标建立不可篡改的选型证据链",
        url: "/blog/airport-evaluation-methodology",
        description: "晚高峰测速、物理专线真实性、IP 纯净度、客户端生态与售后响应，建立属于普通用户的科学评价体系。",
        readTime: "15 分钟",
        tag: "评价标准体系"
      },
      {
        title: "如何识破虚假测速图：从单线程握手时延、晚高峰丢包率到多线程跑分的防坑指南",
        url: "/blog/how-to-read-speedtest-charts",
        description: "为什么白天跑满千兆的节点晚上看视频依然卡顿？深度剖析 Speedtest 多线程与真实 TCP 单线程差异，手把手教你读懂节点真实承载力。",
        readTime: "14 分钟",
        tag: "识破虚假跑分"
      },
      {
        title: "商家线路宣传黑话大揭秘：真假 IPLC、公网中继伪装内网专线与单点故障的识别秘籍",
        url: "/blog/iplc-iepl-transit-marketing-gimmicks-debunked",
        description: "深度拆解机场商家的常见宣传话术套路，教你用简单网络诊断命令一眼识破假专线、虚假 BGP 入口与超售陷阱。",
        readTime: "15 分钟",
        tag: "线路黑话解密"
      },
      {
        title: "全平台代理客户端终极配置实战手册：Windows、macOS、iOS、Android 与软路由 TUN 模式防 DNS 泄露全攻略",
        url: "/blog/clash-verge-rev-sing-box-full-configuration-manual",
        description: "手把手实操全平台代理客户端最佳配置指南，彻底解决 TUN 虚拟网卡冲突、本地 DNS 污染泄露与规则分流失效难题。",
        readTime: "17 分钟",
        tag: "全平台配置实操"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  },
  {
    filePath: 'src/pages/coupons/index.astro',
    clusterVarName: 'couponArticles',
    articles: [
      {
        title: "2026 最新官方机场优惠码汇总与实测：光速云专属折扣码 AMM、飞猫云与主流品牌全网核销记录",
        url: "/blog/verified-airport-promo-codes-and-discounts-vault",
        description: "定期验证与收录全网主流稳定机场的官方有效优惠码，实时剔除失效代码，手把手教你如何叠加活动享受最大折扣。",
        readTime: "14 分钟",
        tag: "官方长期折扣"
      },
      {
        title: "黑五、双十一与周年庆囤货全景指南：避开假降价陷阱、计算年付实际沉没成本的最佳时机",
        url: "/blog/black-friday-double-11-airport-deal-strategy",
        description: "全面复盘每年黑五、双十一及春节大促期间机场商家的打折规律，教你识破先涨价后打折套路，合理把握囤货节奏。",
        readTime: "14 分钟",
        tag: "大促囤货策略"
      },
      {
        title: "首购立减与续费原价的套路深度拆解：警惕首月 1 元引流陷阱与自动续费绑卡风控",
        url: "/blog/first-order-discount-vs-renewal-cost-traps",
        description: "深入拆解机场商家常见的首月 1 元引流陷阱、续费原价套路与自动扣费解约风控，助你明明白白消费不花冤枉钱。",
        readTime: "14 分钟",
        tag: "核销防坑指南"
      },
      {
        title: "优惠失效记录与品牌价格弹性观察：从促销频次看机场商家的现金流健康度与跑路风险",
        url: "/blog/expired-coupon-archive-and-brand-price-trend-analysis",
        description: "通过追踪各大机场历史优惠码的失效记录与打折频次，深度透视商家的真实运营成本与资金链健康状况，防范跑路风险。",
        readTime: "14 分钟",
        tag: "优惠失效追踪"
      }
    ],
    replaceStart: '<!-- 5. 蜂巢式深度二级与三级内容集群网 -->',
    replaceEnd: '<!-- 6. FAQ 常见问题 -->'
  }
];

pillarConfigs.forEach(cfg => {
  let content = fs.readFileSync(cfg.filePath, 'utf8');

  // Check if component already imported
  if (!content.includes('import ClusterArticlesGrid')) {
    content = content.replace(
      'import Layout from "@/layouts/Layout.astro";',
      'import Layout from "@/layouts/Layout.astro";\nimport ClusterArticlesGrid from "@/components/widgets/ClusterArticlesGrid.astro";'
    );
  }

  // Inject articles data if not already present
  if (!content.includes(cfg.clusterVarName)) {
    const dataDeclaration = `\nconst ${cfg.clusterVarName} = ${JSON.stringify(cfg.articles, null, 2)};\n`;
    content = content.replace('---', '---' + dataDeclaration);
  }

  // Replace the section
  const startIdx = content.indexOf(cfg.replaceStart);
  const endIdx = content.indexOf(cfg.replaceEnd);

  if (startIdx !== -1 && endIdx !== -1) {
    const before = content.slice(0, startIdx);
    const after = content.slice(endIdx);
    const replacement = `<!-- 5. 核心深度实战研报集群 (Topic Cluster) -->\n    <section data-aos="fade-up-xs">\n      <ClusterArticlesGrid articles={${cfg.clusterVarName}} />\n    </section>\n\n    `;
    content = before + replacement + after;
    fs.writeFileSync(cfg.filePath, content, 'utf8');
    console.log('Injected cluster grid into:', cfg.filePath);
  } else {
    console.log('Could not find replace anchors in:', cfg.filePath, { startIdx, endIdx });
  }
});
