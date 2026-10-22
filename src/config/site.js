// Get site URL from environment variable, use default value if not set
const SITE_URL = import.meta.env.PUBLIC_SITE_URL || "https://cepingzhinan.fun";

export const siteConfig = {
	title: "测评指南",
	author: "测评指南团队",
	url: SITE_URL,
	mail: "contact@cepingzhinan.fun",
	utm: {
		source: `${SITE_URL}`,
		medium: "referral",
		campaign: "navigation",
	},
	meta: {
		title: "测评指南 (cepingzhinan.fun) — 2026最新推荐42家机场品牌评测与横向选购证据库（持续更新......）",
		description:
			"测评指南（cepingzhinan.fun）：用单品牌资料库、全维套餐对比、晚高峰多探针实测记录和品牌历史更新构建的客观选购证据库，全面覆盖机场推荐、对比、百科与优惠码。",
		keywords:
			"测评指南, 机场推荐, 机场评测, 机场测速, 机场对比, 专线机场, IPLC专线, 免费机场, 翻墙机场, 梯子推荐",
		image: `${SITE_URL}/og.jpg`,
		twitterHandle: "@cepingzhinan",
	},
	// brand social links
	social: {
		twitter: "https://x.com/cepingzhinan",
		twitterName: "cepingzhinan",
		github: "https://github.com/cepingzhinan",
		blog: `${SITE_URL}/blog`,
	},
	// 搜索引擎站长平台所有权验证 Meta 预留
	verification: {
		google: import.meta.env.PUBLIC_GOOGLE_VERIFICATION || "",
		bing: import.meta.env.PUBLIC_BING_VERIFICATION || "",
		shenma: import.meta.env.PUBLIC_SHENMA_VERIFICATION || "",
		baidu: import.meta.env.PUBLIC_BAIDU_VERIFICATION || "",
	},
};

// Footer links
export const socialLinks = [
	{
		name: "GitHub",
		url: "https://github.com/cepingzhinan",
		icon: `<svg class="icon ic-github ic-social" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`,
	},
	{
		name: "Twitter",
		url: "https://x.com/cepingzhinan",
		icon: `<svg class="ic-twitter icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>`,
	},
	{
		name: "RSS",
		url: "/rss.xml",
		icon: `<svg class="icon ic-rss ic-social" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>`,
	},
];
