import type { Metadata } from "next";
import { redirect } from "next/navigation";
import CaseStudyDetailPage from "@/components/views/CaseStudyDetail";
import { personalInfo } from "@/data/portfolio";
import { contentRepository } from "@/lib/content/repository";
import { serializeJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const ids = await contentRepository.getCaseStudyIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const data = await contentRepository.getCaseStudy(id);
  if (!data) return { title: `Case Studies | ${personalInfo.name}`, robots: { index: false } };

  const { caseStudy } = data;
  const title = `${caseStudy.title} | Case Study | ${personalInfo.name}`;

  return {
    title,
    description: caseStudy.oneLineSummary,
    alternates: { canonical: `/case-study/${caseStudy.id}` },
    openGraph: {
      title,
      description: caseStudy.oneLineSummary,
      type: "article",
      url: `/case-study/${caseStudy.id}`,
      publishedTime: caseStudy.publishedDate,
      images: caseStudy.coverImage ? [caseStudy.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.oneLineSummary,
      images: caseStudy.coverImage ? [caseStudy.coverImage] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const data = await contentRepository.getCaseStudy(id);
  if (!data) redirect("/writings");

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.caseStudy.title,
    description: data.caseStudy.oneLineSummary,
    datePublished: data.caseStudy.publishedDate,
    image: data.caseStudy.coverImage,
    url: new URL(`/case-study/${data.caseStudy.id}`, siteUrl).toString(),
    author: {
      "@type": "Person",
      name: personalInfo.name,
      url: siteUrl.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <CaseStudyDetailPage {...data} />
    </>
  );
}
