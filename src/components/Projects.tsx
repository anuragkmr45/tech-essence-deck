import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects, npmPackages } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";
import { useEffect, useRef, useState } from "react";

const Projects = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-id");
          if (entry.isIntersecting && id) {
            setVisibleItems((prev) => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    itemRefs.current.set(id, el);
  };

  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      {/* Section Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-foreground mb-2">Projects</h2>
        <div className="h-1 w-16 bg-primary rounded-full" />
      </div>

      {/* Featured Projects */}
      <div className="mb-16 space-y-12">
        {featuredProjects.map((project, index) => (
          <div
            key={`featured-${index}`}
            ref={setRef(`featured-${index}`)}
            data-id={`featured-${index}`}
            className={`group relative transition-all duration-700 ${
              visibleItems.has(`featured-${index}`)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="grid gap-6 md:grid-cols-2 bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors">
              {/* Left - Preview */}
              <div
                className={`transition-all duration-700 ${
                  visibleItems.has(`featured-${index}`)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 100}ms` }}
              >
                <ProjectCard
                  preview={project.preview}
                  title={project.title}
                  github={project.github}
                  demo={project.demo}
                />
              </div>

              {/* Right - Details */}
              <div className="flex flex-col justify-center">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-5xl font-bold text-primary/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {project.title}
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </h3>

                <p className="text-xs text-primary font-medium uppercase tracking-wider mt-1">
                  {project.role}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {project.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className={`text-sm text-muted-foreground flex gap-2 transition-all duration-500 ${
                        visibleItems.has(`featured-${index}`)
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                      style={{
                        transitionDelay: `${index * 100 + hIndex * 75 + 200}ms`,
                      }}
                    >
                      <span className="text-primary mt-0.5">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-4">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="GitHub repository"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="tech-badge">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NPM Packages */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="h-1 w-4 bg-primary rounded-full" />
          Open Source Packages
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {npmPackages.map((pkg, index) => (
            <div
              key={`pkg-${index}`}
              ref={setRef(`pkg-${index}`)}
              data-id={`pkg-${index}`}
              className={`group relative bg-secondary/30 rounded-lg p-5 hover:bg-secondary/50 transition-all duration-700 ${
                visibleItems.has(`pkg-${index}`)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h4 className="font-mono text-sm text-foreground font-medium">
                <a
                  href={pkg.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {pkg.name}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </h4>
              <p className="mt-1 text-xs text-primary font-medium">{pkg.downloads}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {pkg.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {pkg.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="tech-badge">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="h-1 w-4 bg-primary rounded-full" />
          Other Projects
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {otherProjects.map((project, index) => (
            <div
              key={`other-${index}`}
              ref={setRef(`other-${index}`)}
              data-id={`other-${index}`}
              className={`group relative bg-secondary/30 rounded-lg overflow-hidden hover:bg-secondary/50 transition-all duration-700 ${
                visibleItems.has(`other-${index}`)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Preview */}
              <ProjectCard
                preview={project.preview}
                title={project.title}
                github={project.github}
                demo={project.demo}
              />
              
              <div className="p-5">
                <h4 className="text-foreground font-medium">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {project.title}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </h4>
                <p className="text-xs text-primary mt-0.5">{project.role}</p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <span className="tech-badge">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <a
          href="/projects"
          className="inline-flex items-center font-medium leading-tight text-foreground group"
        >
          <span className="border-b border-transparent pb-px transition hover:border-primary group-hover:border-primary">
            View All Projects
          </span>
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
