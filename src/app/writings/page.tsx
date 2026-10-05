import type { Metadata } from "next";
import AllWritings from "@/components/views/AllWritings";
import { personalInfo } from "@/data/portfolio";
import { contentRepository } from "@/lib/content/repository";
import { serializeJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

const description = `Read case studies and articles by ${personalInfo.name} about web development, architecture, and engineering best practices.`;

export const metadata: Metadata = {
  title: `Case Studies & Articles | ${personalInfo.name}`,
  description,
  alternates: { canonical: "/writings" },
  openGraph: {
    title: `Case Studies & Articles | ${personalInfo.name}`,
    description,
    type: "website",
    url: "/writings",
  },
};

export default async function WritingsPage() {
  const content = await contentRepository.listWritings();
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Case studies and articles by ${personalInfo.name}`,
    description,
    url: new URL("/writings", siteUrl).toString(),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: content.map((writing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": writing.category === "article" ? "Article" : "CreativeWork",
          name: writing.title,
          description: writing.description,
          datePublished: writing.date,
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
      <AllWritings content={content} />
    </>
  );
}
