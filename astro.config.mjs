import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://cepingzhinan.fun";

const copySitemapPlugin = {
	name: "copy-sitemap",
	hooks: {
		"astro:build:done": ({ dir }) => {
			const baseDir = fileURLToPath(dir);
			const indexPath = path.join(baseDir, "sitemap-index.xml");
			const sitemapPath = path.join(baseDir, "sitemap.xml");
			if (fs.existsSync(indexPath)) {
				fs.copyFileSync(indexPath, sitemapPath);
			}
		},
	},
};

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	base: "/",
	envPrefix: "PUBLIC_",
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	},

	server: {
		port: 5200,
	},

	redirects: {
		"/jichang": "/recommend",
		"/tutorial": "/tutorials",
		"/brands": "/reviews",
		"/nodes": "/speedtest",
		"/sign-up": "/recommend",
		"/sign-in": "/recommend",
		"/signup": "/recommend",
		"/signin": "/recommend",
		"/pricing": "/recommend",
		"/features": "/speedtest",
		"/blog/tag-vpn-2026-review": "/blog/wgetcloud-2026-review",
		"/blog/nexitally-vs-tag-comparison": "/blog/guangsu-vs-wgetcloud-comparison",
		"/reviews/fscloud": "/recommend",
		"/reviews/immtelecom": "/recommend",
		"/reviews/nexitally": "/recommend",
		"/reviews/tag-vpn": "/reviews/wgetcloud",
		"/reviews/ikuuu": "/free",
		"/reviews/suying666": "/recommend",
		"/go/fscloud": "/recommend",
		"/go/immtelecom": "/recommend",
		"/go/nexitally": "/recommend",
		"/go/tag-vpn": "/go/wgetcloud",
		"/go/ikuuu": "/free",
		"/go/suying666": "/recommend",
	},

	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes("/elements") && !page.includes("/go/"),
		}),
		copySitemapPlugin,
	],
});
