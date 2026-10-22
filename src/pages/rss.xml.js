import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site.js";

export async function GET(context) {
	const posts = await getCollection("post");
	const sortedPosts = posts.sort(
		(a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
	);

	return rss({
		title: `${siteConfig.title} — 机场品牌评测与横向选购证据库`,
		description: siteConfig.meta.description,
		site: context.site || siteConfig.url,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.publishDate,
			description: post.data.description,
			link: `/blog/${post.id}/`,
		})),
		customData: `<language>zh-CN</language>`,
	});
}
