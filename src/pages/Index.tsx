import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SpotlightEffect from "@/components/SpotlightEffect";
import CustomCursor from "@/components/CustomCursor";
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

      <div className="relative min-h-screen bg-background cursor-none">
        {/* Custom illustrated cursor */}
        <CustomCursor />

        {/* Spotlight effect */}
        <SpotlightEffect />

        {/* Top Navigation */}
        <Navbar />

        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-primary px-4 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground focus-visible:translate-x-0"
        >
          Skip to Content
        </a>

        {/* Hero Section */}
        <Hero />

        {/* Main Content */}
        <main id="content" className="mx-auto max-w-4xl px-6 md:px-12 pb-24">
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;
