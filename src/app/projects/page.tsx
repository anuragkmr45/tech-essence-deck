import type { Metadata } from "next";
import AllProjects from "@/components/views/AllProjects";
import { personalInfo } from "@/data/portfolio";
import { contentRepository } from "@/lib/content/repository";
import { serializeJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const description = `Explore all projects by ${personalInfo.name} - Web, AI, Blockchain, Dev Tools, and more.`;

export const metadata: Metadata = {
  title: `All Projects | ${personalInfo.name}`,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `All Projects | ${personalInfo.name}`,
    description,
    type: "website",
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await contentRepository.listProjects();
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Projects by ${personalInfo.name}`,
    description,
    url: new URL("/projects", siteUrl).toString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          ...(project.slug
            ? { url: new URL(`/projects/${project.slug}`, siteUrl).toString() }
            : {}),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <AllProjects projects={projects} />
    </>
  );
}
