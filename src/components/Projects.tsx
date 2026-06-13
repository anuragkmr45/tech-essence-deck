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
      <div className="mb-14">
        <p className="text-sm text-muted-foreground/80 mb-4">Works</p>
        <h2 className="section-title">
          <span className="italic font-light">Built</span> & shipped
        </h2>
      </div>

      {/* Timeline line */}
      <div className="relative">
        <div className="absolute left-0 md:left-1/3 top-0 bottom-0 w-px bg-secondary ml-3 md:ml-0 hidden md:block" />

        {/* Featured Projects */}
        <div className="space-y-16 md:space-y-0 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={`featured-${index}`}
              ref={setRef(`featured-${index}`)}
              data-id={`featured-${index}`}
              className={`relative md:grid md:grid-cols-3 md:gap-8 transition-all duration-700 mb-12 ${
                visibleItems.has(`featured-${index}`)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Left Side - Sticky Info */}
              <div className="md:sticky md:top-24 md:self-start md:pr-8 md:text-right mb-6 md:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/3 w-7 h-7 -ml-0.5 md:-ml-3.5 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 hidden md:flex">
                  <span className="text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Project Number - Mobile */}
                <span className="md:hidden text-4xl font-bold text-primary/20 mb-2 block">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-2">
                  <a
                    href={project.github !== "#" ? project.github : project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1 md:flex-row-reverse"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                    {project.title}
                  </a>
                </h3>

                {/* Role */}
                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-4">
                  {project.role}
                </p>

                {/* Preview Media */}
                <div
                  className={`transition-all duration-700 ${
                    visibleItems.has(`featured-${index}`)
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 150}ms` }}
                >
                  <ProjectCard
                    preview={project.preview}
                    title={project.title}
                    github={project.github}
                    demo={project.demo}
                  />
                </div>

                {/* Links */}
                <div className="mt-4 flex items-center gap-3 md:justify-end">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span className="hidden sm:inline">Code</span>
                    </a>
                  )}
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="hidden sm:inline">Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Side - Details */}
              <div className="md:col-span-2 md:pl-8 md:border-l border-secondary/50">
                <div className="bg-secondary/30 rounded-lg p-5 hover:bg-secondary/50 transition-colors">
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">
                    {project.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-5">
                    {project.highlights.map((highlight, hIndex) => (
                      <li
                        key={hIndex}
                        className={`text-sm text-muted-foreground flex gap-3 transition-all duration-500 ${
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

                  {/* Technologies */}
                  <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
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
