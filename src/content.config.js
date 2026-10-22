// 1. 从 `astro:content` 导入工具函数
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

// 2. 导入加载器
import { glob } from "astro/loaders";

// 3. 定义文章集合
const post = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/post" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		read: z.number().optional(),
		tags: z.array(z.string()).optional(),
		img: z.string().optional(),
		img_alt: z.string().optional(),
		featured: z.boolean().optional(),
	}),
});

// 4. 定义更新日志集合
const changelog = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
	schema: z.object({
		title: z.string(),
		publishDate: z.coerce.date(),
		version: z.string().optional(),
		description: z.string().optional(),
	}),
});

// 5. 核心品牌单一数据源 (SSOT: Single Source of Truth)
const brands = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/content/brands" }),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		slug: z.string(),
		tagline: z.string(),
		description: z.string().optional(),
		logo: z.string().optional(),
		rating: z.number(), // 0 - 5.0 评分
		rank: z.number().optional(), // 排名：1=光速云（第一主推），2=飞猫云...
		tier: z.string(), // "旗舰专线" | "高性价比" | "大流量主力" | "免费备用" | "精选中继"
		established: z.string(),
		lineTypes: z.array(z.string()), // ["IPLC国际专线", "IEPL内网专线", "BGP优质入口"]
		protocols: z.array(z.string()), // ["Shadowsocks", "Trojan", "Hysteria 2", "VLESS"]
		nodesCount: z.number(),
		regions: z.array(z.string()), // ["香港", "日本", "新加坡", "美国", "台湾", "英国", "德国"]
		unlocks: z.array(z.string()), // ["ChatGPT", "Claude", "Netflix 4K", "Disney+", "TikTok"]
		speedTest: z.object({
			avgDownloadMbps: z.number(),
			peakDownloadMbps: z.number(),
			avgLatencyMs: z.number(),
			packetLossRate: z.string(),
			testDate: z.string(),
			telecomGrade: z.string(), // "电信: A+"
			unicomGrade: z.string(),  // "联通: A+"
			mobileGrade: z.string(),  // "移动: A"
		}),
		hasSpeedtest: z.boolean().optional(),
		speedtestImage: z.string().optional(),
		unlockImage: z.string().optional(),
		minPriceMonthly: z.number(), // 折算最低月费(元)
		plans: z.array(z.object({
			name: z.string(),
			price: z.number(),
			billingCycle: z.string(),
			traffic: z.string(),
			deviceLimit: z.string(),
			features: z.array(z.string()),
			isPopular: z.boolean().optional(),
		})),
		coupons: z.array(z.object({
			code: z.string(),
			discount: z.string(),
			desc: z.string(),
			expiry: z.string(),
			valid: z.boolean(),
		})),
		pros: z.array(z.string()),
		cons: z.array(z.string()),
		bestFor: z.string(),
		officialUrl: z.string(),
		affUrl: z.string().optional(),
		lastVerified: z.string(),
	}),
});

// 6. 导出所有集合
export const collections = { post, changelog, brands };
