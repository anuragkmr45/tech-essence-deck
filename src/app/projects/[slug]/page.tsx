import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProjectDetailPage from "@/components/views/ProjectDetail";
import { personalInfo } from "@/data/portfolio";
import { contentRepository } from "@/lib/content/repository";
import { serializeJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await contentRepository.getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await contentRepository.getProject(slug);
  if (!data) return { title: `Projects | ${personalInfo.name}`, robots: { index: false } };

  const { project } = data;
  const title = `${project.title} | Projects | ${personalInfo.name}`;

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      url: `/projects/${project.slug}`,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${personalInfo.name}`,
      description: project.summary,
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const data = await contentRepository.getProject(slug);
  if (!data) redirect("/projects");

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.project.title,
    description: data.project.summary,
    url: new URL(`/projects/${data.project.slug}`, siteUrl).toString(),
    image: data.project.coverImage,
    keywords: data.project.quickFacts.techStack.join(", "),
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
      <ProjectDetailPage {...data} />
    </>
  );
}
