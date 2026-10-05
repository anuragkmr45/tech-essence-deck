import Index from "@/components/views/Index";
import { contentRepository } from "@/lib/content/repository";
import { serializeJsonLd } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";

export default async function HomePage() {
  const content = await contentRepository.getHomeContent();
  const { personalInfo } = content;
  const siteUrl = getSiteUrl();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.role,
    url: siteUrl.toString(),
    sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.twitter],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <Index content={content} />
    </>
  );
}
