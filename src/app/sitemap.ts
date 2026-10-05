import type { MetadataRoute } from "next";
import { contentRepository } from "@/lib/content/repository";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const absoluteUrl = (pathname: string) => new URL(pathname, siteUrl).toString();
  const { projects, articles, caseStudies } = await contentRepository.getSitemapContent();

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/projects"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/writings"), changeFrequency: "weekly", priority: 0.9 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/article/${article.slug || article.id}`),
      lastModified: new Date(article.updatedDate || article.publishedDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: absoluteUrl(`/case-study/${caseStudy.id}`),
      lastModified: caseStudy.publishedDate ? new Date(caseStudy.publishedDate) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
