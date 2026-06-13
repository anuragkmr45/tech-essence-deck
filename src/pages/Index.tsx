import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import CaseStudiesArticles from "@/components/CaseStudiesArticles";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Helmet } from "react-helmet-async";
import { personalInfo } from "@/data/portfolio";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{personalInfo.name} | {personalInfo.role}</title>
        <meta name="description" content={`${personalInfo.name} - ${personalInfo.role}. ${personalInfo.tagline}`} />
        <link rel="canonical" href="https://tech-essence-deck.lovable.app/" />
        <meta property="og:title" content={`${personalInfo.name} | ${personalInfo.role}`} />
        <meta property="og:description" content={personalInfo.tagline} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tech-essence-deck.lovable.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personalInfo.name} | ${personalInfo.role}`} />
        <meta name="twitter:description" content={personalInfo.tagline} />
      </Helmet>

      <div className="relative min-h-screen bg-background pt-20 md:pt-24">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded-md bg-primary px-4 py-3 text-xs font-medium text-primary-foreground focus-visible:translate-x-0"
        >
          Skip to content
        </a>

        <Hero />

        <main id="content" className="mx-auto max-w-5xl px-6 md:px-10 pb-24 space-y-32 md:space-y-40">
          <About />
          <Experience />
          <Projects />
          <CaseStudiesArticles />
          <Skills />
          <Contact />
          <Footer />
        </main>

        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
