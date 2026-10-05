import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CaseStudiesArticles from "@/components/CaseStudiesArticles";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import type { HomeContent } from "@/lib/content/repository";

const Index = ({ content }: { content: HomeContent }) => {
  return (
    <>
      <div className="relative min-h-screen bg-background pt-20 md:pt-24">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded-md bg-primary px-4 py-3 text-xs font-medium text-primary-foreground focus-visible:translate-x-0"
        >
          Skip to content
        </a>

        <Hero personalInfo={content.personalInfo} />

        <main id="content" className="mx-auto max-w-5xl px-6 md:px-10 pb-24 space-y-32 md:space-y-40">
          <About />
          <Experience experience={content.experience} />
          <Projects projects={content.projects} npmPackages={content.npmPackages} />
          <CaseStudiesArticles
            articles={content.articles}
            caseStudies={content.caseStudies}
          />
          <Skills
            skills={content.skills}
            achievements={content.achievements}
            education={content.education}
          />
          <Contact personalInfo={content.personalInfo} />
          <Footer />
        </main>

        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
