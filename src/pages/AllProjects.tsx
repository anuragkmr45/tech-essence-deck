import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Github, ExternalLink, Play } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { allProjects } from "@/data/allProjects";
import { personalInfo } from "@/data/portfolio";
import { Input } from "@/components/ui/input";
import SpotlightEffect from "@/components/SpotlightEffect";

const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "ai", label: "AI" },
  { id: "blockchain", label: "Blockchain" },
  { id: "dev-tools", label: "Dev Tools" },
  { id: "desktop", label: "Desktop Apps" },
  { id: "mobile", label: "Mobile Apps" },
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

  return (
    <>
      <Helmet>
        <title>All Projects | {personalInfo.name}</title>
        <meta
          name="description"
          content={`Explore all projects by ${personalInfo.name} - Web, AI, Blockchain, Dev Tools, and more.`}
        />
      </Helmet>

      <div className="relative min-h-screen bg-background">
        <SpotlightEffect />

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
              All Projects
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
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
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Preview Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.preview}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-110"
                        aria-label="Play demo"
                      >
                        <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                      </a>
                    )}
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-110"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-110"
                        aria-label="Open live demo"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary capitalize shrink-0">
                      {project.category.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
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
                </div>
              </div>
            ))}
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
