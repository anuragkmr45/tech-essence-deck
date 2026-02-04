import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  FileText,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getRelatedProjects,
} from "@/data/projectDetails";
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
import ProjectQuickFactsPanel from "@/components/project/ProjectQuickFactsPanel";
import ProjectTldr from "@/components/project/ProjectTldr";
import ProjectSection from "@/components/project/ProjectSection";
import ProjectGallery from "@/components/project/ProjectGallery";
import RelatedProjects from "@/components/project/RelatedProjects";
import ProjectNavigation from "@/components/project/ProjectNavigation";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const project = slug ? getProjectBySlug(slug) : null;
  const adjacentProjects = slug ? getAdjacentProjects(slug) : { prev: null, next: null };
  const relatedProjects = slug ? getRelatedProjects(slug, 3) : [];

  useEffect(() => {
    if (!project) {
      navigate("/projects", { replace: true });
    }
  }, [project, navigate]);

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
  }, [project]);

  if (!project) {
    return null;
  }

  // Collect all sections for navigation
  const allSections = [
    { id: "overview", title: "Overview / TL;DR" },
    project.sections.problemAndGoal,
    project.sections.solution,
    project.sections.myContribution,
    project.sections.process,
    project.sections.technicalDetails,
    project.sections.challengesAndSolutions,
    project.sections.resultsAndImpact,
    project.sections.learningsAndNextSteps,
    ...(project.galleryImages?.length ? [{ id: "gallery", title: "Gallery" }] : []),
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>
          {project.title} | Projects | {personalInfo.name}
        </title>
        <meta name="description" content={project.summary} />
      </Helmet>

      <div className="relative min-h-screen cursor-none">
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
                    to="/projects"
                    className="hover:text-primary transition-colors"
                  >
                    Projects
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">
                  {project.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          {/* Hero Section */}
          <header className="mb-12">
            {/* Cover Image */}
            <div className="relative aspect-[21/9] overflow-hidden rounded-xl mb-8">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Status Badge */}
              <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium ${
                project.status === "live"
                  ? "bg-primary text-primary-foreground"
                  : "bg-yellow-500 text-yellow-950"
              }`}>
                {project.status === "live" ? "🟢 Live" : "🟡 In Progress"}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-background/80 text-foreground text-sm font-medium capitalize">
                {project.category.replace("-", " ")}
              </div>
            </div>

            {/* Title & Summary */}
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 leading-tight">
                {project.title}
              </h1>

              <p className="text-lg text-primary mb-4">{project.subtitle}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {project.summary}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.links.liveDemo && (
                  <Button asChild>
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.links.github && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.links.caseStudy && (
                  <Button variant="outline" asChild>
                    <Link
                      to={project.links.caseStudy}
                      className="flex items-center gap-2"
                    >
                      <BookOpen className="h-4 w-4" />
                      Case Study
                    </Link>
                  </Button>
                )}
                {project.links.paperPdfUrl && (
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
                <ProjectQuickFactsPanel quickFacts={project.quickFacts} />

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
              {/* TL;DR Section */}
              <section id="overview">
                <ProjectTldr items={project.tldr} />
              </section>

              {/* Main Sections */}
              <ProjectSection section={project.sections.problemAndGoal} index={0} />
              <ProjectSection section={project.sections.solution} index={1} />
              <ProjectSection section={project.sections.myContribution} index={2} />
              <ProjectSection section={project.sections.process} index={3} />
              {project.sections.technicalDetails && (
                <ProjectSection section={project.sections.technicalDetails} index={4} />
              )}
              <ProjectSection section={project.sections.challengesAndSolutions} index={5} />
              <ProjectSection section={project.sections.resultsAndImpact} index={6} />
              <ProjectSection section={project.sections.learningsAndNextSteps} index={7} />

              {/* Gallery */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <ProjectGallery images={project.galleryImages} />
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <RelatedProjects projects={relatedProjects} />
              )}

              {/* Previous / Next Navigation */}
              <ProjectNavigation
                prev={adjacentProjects.prev}
                next={adjacentProjects.next}
              />
            </main>
          </div>
        </div>

        <ScrollToTop />
      </div>

      {/* PDF Viewer Modal */}
      {project.links.paperPdfUrl && (
        <PdfViewer
          isOpen={pdfViewerOpen}
          onClose={() => setPdfViewerOpen(false)}
          pdfUrl={project.links.paperPdfUrl}
          title={project.title}
        />
      )}
    </>
  );
};

export default ProjectDetailPage;
