import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Github, ExternalLink, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { allProjects } from "@/data/allProjects";
import { projectTitleToSlug, projectDetails } from "@/data/projectDetails";
import { personalInfo } from "@/data/portfolio";
import { Input } from "@/components/ui/input";
import SpotlightEffect from "@/components/SpotlightEffect";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";

const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "blockchain", label: "Blockchain" },
  { id: "dev-tools", label: "Dev Tools" },
  { id: "desktop", label: "Desktop" },
  { id: "mobile", label: "Mobile" },
  { id: "other", label: "Other" },
];

const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Get slug for project if it has a detail page
  const getProjectSlug = (title: string): string | null => {
    const slug = projectTitleToSlug[title];
    if (slug && projectDetails[slug]) {
      return slug;
    }
    return null;
  };

  // Get status from project details
  const getProjectStatus = (title: string): "live" | "in-progress" | "archived" | null => {
    const slug = projectTitleToSlug[title];
    if (slug && projectDetails[slug]) {
      return projectDetails[slug].status;
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>All Projects | {personalInfo.name}</title>
        <meta
          name="description"
          content={`Explore all projects by ${personalInfo.name} - Web, AI, Blockchain, Dev Tools, and more.`}
        />
      </Helmet>

      <div className="relative min-h-screen cursor-none pt-16">
        <CustomCursor />
        <SpotlightEffect />
        <ScrollToTop />

        <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              A collection of projects I've built, contributed to, or am
              currently working on. Filter by category or search to find
              specific projects.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-secondary focus:border-primary"
            />
          </div>

          {/* Category Tabs */}
          <div className="mb-10 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => {
                const count = category.id === "all" 
                  ? allProjects.length 
                  : allProjects.filter(p => p.category === category.id).length;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                      ${
                        activeCategory === category.id
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {/* Animated Background */}
                    {activeCategory === category.id && (
                      <span
                        className="absolute inset-0 bg-primary rounded-full animate-scale-in"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {activeCategory !== category.id && (
                      <span
                        className="absolute inset-0 bg-secondary/50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {category.label}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${
                        activeCategory === category.id
                          ? "bg-primary-foreground/20"
                          : "bg-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => {
              const slug = getProjectSlug(project.title);
              const status = getProjectStatus(project.title);
              const hasDetailPage = !!slug;

              const CardContent = (
                <>
                  {/* Preview Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.preview}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    
                    {/* Status Badge */}
                    {status && (
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                        status === "live"
                          ? "bg-primary/90 text-primary-foreground"
                          : "bg-yellow-500/90 text-yellow-950"
                      }`}>
                        {status === "live" ? "Live" : "In Progress"}
                      </div>
                    )}

                    {/* Quick Action Icons */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.github !== "#" && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="View on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          aria-label="Open live demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize shrink-0">
                        {project.category.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* View Project Link */}
                    {hasDetailPage && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:text-primary/80 transition-colors">
                        View project
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </>
              );

              if (hasDetailPage) {
                return (
                  <Link
                    key={project.title}
                    to={`/projects/${slug}`}
                    className="group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-300 animate-fade-in block"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={project.title}
                  className="group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {CardContent}
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProjects;
