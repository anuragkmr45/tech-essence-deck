import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  ChevronRight,
  Calendar,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import {
  caseStudyDetails,
  getAdjacentCaseStudies,
} from "@/data/caseStudyDetails";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SpotlightEffect from "@/components/SpotlightEffect";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import PdfViewer from "@/components/case-study/PdfViewer";
import QuickFactsPanel from "@/components/case-study/QuickFactsPanel";
import KpiStrip from "@/components/case-study/KpiStrip";
import TldrSection from "@/components/case-study/TldrSection";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import ImageGallery from "@/components/case-study/ImageGallery";
import RelatedCaseStudies from "@/components/case-study/RelatedCaseStudies";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";

const CaseStudyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const caseStudy = id ? caseStudyDetails[id] : null;
  const adjacentCaseStudies = id ? getAdjacentCaseStudies(id) : { prev: null, next: null };

  useEffect(() => {
    if (!caseStudy) {
      navigate("/writings", { replace: true });
    }
  }, [caseStudy, navigate]);

  // Track active section for progress indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [caseStudy]);

  if (!caseStudy) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Collect all sections for navigation
  const allSections = [
    caseStudy.sections.challenge,
    caseStudy.sections.goals,
    caseStudy.sections.constraints,
    caseStudy.sections.approach,
    caseStudy.sections.architectureOrDesign,
    caseStudy.sections.implementationHighlights,
    caseStudy.sections.results,
    caseStudy.sections.learnings,
    caseStudy.sections.nextSteps,
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>
          {caseStudy.title} | Case Study | {personalInfo.name}
        </title>
        <meta name="description" content={caseStudy.oneLineSummary} />
      </Helmet>

      <div className="relative min-h-screen cursor-none pt-16">
        <CustomCursor />
        <SpotlightEffect />

        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/writings"
                    className="hover:text-primary transition-colors"
                  >
                    Writings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">
                  {caseStudy.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back Button */}
          <Link
            to="/writings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Writings</span>
          </Link>

          {/* Hero Section */}
          <header className="mb-12">
            {/* Cover Image */}
            {caseStudy.coverImage && (
              <div className="relative aspect-[21/9] overflow-hidden rounded-xl mb-8">
                <img
                  src={caseStudy.coverImage}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
            )}

            {/* Title & Summary */}
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Case Study
                </span>
                {caseStudy.publishedDate && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(caseStudy.publishedDate)}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {caseStudy.title}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                {caseStudy.oneLineSummary}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {caseStudy.links.liveDemo && (
                  <Button asChild>
                    <a
                      href={caseStudy.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {caseStudy.links.github && (
                  <Button variant="outline" asChild>
                    <a
                      href={caseStudy.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {caseStudy.links.paperPdfUrl && (
                  <Button variant="outline" onClick={() => setPdfViewerOpen(true)}>
                    <FileText className="h-4 w-4" />
                    Paper (PDF)
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Quick Facts - Sticky on Desktop */}
            <aside className="lg:w-80 shrink-0 order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                <QuickFactsPanel
                  quickFacts={caseStudy.quickFacts}
                  tags={caseStudy.tags}
                />

                {/* Section Navigation - Desktop Only */}
                <nav className="hidden lg:block mt-6 bg-secondary/20 rounded-xl border border-secondary/50 p-4">
                  <h4 className="text-sm font-medium text-foreground mb-3">
                    On this page
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {allSections.map((section) => (
                      <li key={section!.id}>
                        <a
                          href={`#${section!.id}`}
                          className={`block py-1.5 px-2 rounded transition-colors ${
                            activeSection === section!.id
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                          }`}
                        >
                          {section!.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 space-y-12">
              {/* KPI Strip */}
              <section>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Key Metrics
                </h2>
                <KpiStrip kpis={caseStudy.kpis} />
              </section>

              {/* TL;DR Section */}
              <TldrSection tldr={caseStudy.tldr} />

              {/* Main Sections */}
              {allSections.map((section, index) => (
                <CaseStudySection
                  key={section!.id}
                  section={section!}
                  index={index}
                />
              ))}

              {/* Gallery */}
              {caseStudy.galleryImages && caseStudy.galleryImages.length > 0 && (
                <ImageGallery images={caseStudy.galleryImages} />
              )}

              {/* Related Case Studies */}
              <RelatedCaseStudies currentId={caseStudy.id} />

              {/* Previous / Next Navigation */}
              <CaseStudyNavigation
                prev={adjacentCaseStudies.prev}
                next={adjacentCaseStudies.next}
              />
            </main>
          </div>
        </div>

        <ScrollToTop />
      </div>

      {/* PDF Viewer Modal */}
      {caseStudy.links.paperPdfUrl && (
        <PdfViewer
          isOpen={pdfViewerOpen}
          onClose={() => setPdfViewerOpen(false)}
          pdfUrl={caseStudy.links.paperPdfUrl}
          title={caseStudy.title}
        />
      )}
    </>
  );
};

export default CaseStudyDetailPage;
