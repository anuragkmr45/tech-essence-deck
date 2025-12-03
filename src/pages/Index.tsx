import Sidebar from "@/components/Sidebar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SpotlightEffect from "@/components/SpotlightEffect";
import { Helmet } from "react-helmet-async";
import { personalInfo } from "@/data/portfolio";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{personalInfo.name} | {personalInfo.role}</title>
        <meta name="description" content={`${personalInfo.name} - ${personalInfo.role}. ${personalInfo.tagline}`} />
        <meta property="og:title" content={`${personalInfo.name} | ${personalInfo.role}`} />
        <meta property="og:description" content={personalInfo.tagline} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personalInfo.name} | ${personalInfo.role}`} />
        <meta name="twitter:description" content={personalInfo.tagline} />
      </Helmet>

      <div className="relative min-h-screen bg-background">
        {/* Spotlight effect */}
        <SpotlightEffect />

        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <a
            href="#content"
            className="absolute left-0 top-0 block -translate-x-full rounded bg-primary px-4 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground focus-visible:translate-x-0"
          >
            Skip to Content
          </a>

          <div className="lg:flex lg:justify-between lg:gap-4">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Contact />
              <Footer />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
