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
          className="absolute left-0 top-0 block -translate-x-full rounded-none bg-primary px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground focus-visible:translate-x-0"
        >
          Skip to Content
        </a>

        {/* Hero — Warm Archive bordered grid */}
        <Hero />

        {/* Main Content */}
        <main id="content" className="mx-auto max-w-6xl px-6 md:px-10 pt-16 md:pt-24 pb-24 space-y-24 md:space-y-32">
          <About />
          <Experience />
          <Projects />
          <CaseStudiesArticles />
          <Skills />
          <Contact />
          <Footer />
        </main>

        {/* Global status bar — bottom edge of viewport */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-walnut/60 bg-background/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 md:px-10 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80">
                Archive Online
              </span>
            </div>
            <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-[0.25em] text-walnut">
              {new Date().getFullYear()} — Anurag Kumar / Engineering Archive v3.0
            </span>
          </div>
        </div>

        {/* Scroll to top button */}
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
