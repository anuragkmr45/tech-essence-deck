import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { projects, npmPackages } from "@/data/portfolio";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Projects
        </h2>
      </div>

      {/* Featured Projects */}
      <div className="group/list mb-16">
        {featuredProjects.map((project, index) => (
          <div key={index} className="mb-12">
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline font-medium leading-tight text-foreground hover:text-primary focus-visible:text-primary group/link text-base"
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span className="text-lg">
                      {project.title}
                      <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1" />
                    </span>
                  </a>
                </h3>

                <p className="mt-1 text-xs text-primary font-medium uppercase tracking-wider">
                  {project.role}
                </p>

                <p className="mt-2 text-sm leading-normal text-muted-foreground">
                  {project.description}
                </p>

                {/* Project Preview */}
                <div className="mt-4">
                  <ProjectCard
                    preview={project.preview}
                    title={project.title}
                    github={project.github}
                    demo={project.demo}
                  />
                </div>

                <ul className="mt-3 space-y-1">
                  {project.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="text-sm text-muted-foreground flex gap-2"
                    >
                      <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
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
                      className="text-muted-foreground hover:text-foreground transition-colors"
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
                      className="text-muted-foreground hover:text-foreground transition-colors"
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

              <div className="z-10 sm:order-1 sm:col-span-2 flex items-start">
                <span className="text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NPM Packages */}
      <div className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Open Source Packages
        </h3>
        <div className="group/list space-y-8">
          {npmPackages.map((pkg, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary/50" />
              
              <div className="relative z-10">
                <h4 className="font-mono text-sm text-foreground font-medium">
                  <a
                    href={pkg.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {pkg.name}
                  </a>
                </h4>
                <p className="mt-1 text-xs text-primary">{pkg.downloads}</p>
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
            </div>
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
          Other Projects
        </h3>
        <div className="group/list space-y-8">
          {otherProjects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary/50" />
              
              <div className="relative z-10">
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
                
                {/* Project Preview for Other Projects */}
                <div className="mt-3">
                  <ProjectCard
                    preview={project.preview}
                    title={project.title}
                    github={project.github}
                    demo={project.demo}
                  />
                </div>
                
                <p className="mt-3 text-sm text-muted-foreground">
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

      <div className="mt-12">
        <a
          href="https://github.com/anuragkmr45"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-medium leading-tight text-foreground group"
        >
          <span className="border-b border-transparent pb-px transition hover:border-primary group-hover:border-primary">
            View All Projects on GitHub
          </span>
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default Projects;
