import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ArticleDetailPage from "@/components/views/ArticleDetail";
import { personalInfo } from "@/data/portfolio";
import { contentRepository } from "@/lib/content/repository";
import { serializeJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const ids = await contentRepository.getArticleRouteParams();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await contentRepository.getArticle(id);
  if (!data) return { title: `Articles | ${personalInfo.name}`, robots: { index: false } };

  const { article } = data;
  const description = article.subtitle || article.title;
  const canonicalPath = `/article/${article.slug || article.id}`;

  return {
    title: `${article.title} | ${personalInfo.name}`,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${article.title} | ${personalInfo.name}`,
      description,
      type: "article",
      url: canonicalPath,
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate || article.publishedDate,
      section: article.category,
      tags: article.tags,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const data = await contentRepository.getArticle(id);
  if (!data) redirect("/writings");

  const siteUrl = getSiteUrl();
  const { article } = data;
  const canonicalPath = `/article/${article.slug || article.id}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle || article.title,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate || article.publishedDate,
    image: article.coverImage,
    url: new URL(canonicalPath, siteUrl).toString(),
    articleSection: article.category,
    keywords: article.tags.join(", "),
    author: {
      "@type": "Person",
      name: article.author?.name || personalInfo.name,
      url: siteUrl.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <ArticleDetailPage {...data} />
    </>
  );
}
