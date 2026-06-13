// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { projectDetails } from "../src/data/projectDetails";
import { articleDetails } from "../src/data/articleDetails";
import { caseStudyDetails } from "../src/data/caseStudyDetails";

const BASE_URL = "https://tech-essence-deck.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/writings", changefreq: "weekly", priority: "0.9" },
  ...Object.values(projectDetails).map((p) => ({
    path: `/projects/${p.slug}`,
    changefreq: "monthly" as const,
    priority: "0.8",
  })),
  ...Object.values(articleDetails).map((a) => ({
    path: `/article/${a.slug || a.id}`,
    changefreq: "monthly" as const,
    priority: "0.7",
  })),
  ...Object.values(caseStudyDetails).map((c) => ({
    path: `/case-study/${c.id}`,
    changefreq: "monthly" as const,
    priority: "0.8",
  })),
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
