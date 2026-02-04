import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import type { ProjectDetail } from "@/data/projectDetails";

interface RelatedProjectsProps {
  projects: ProjectDetail[];
}

const RelatedProjects = ({ projects }: RelatedProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <section id="related-projects" className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-primary rounded-full" />
        Related Projects
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={`/projects/${project.slug}`}
            className="group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Status Badge */}
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                project.status === "live"
                  ? "bg-primary/90 text-primary-foreground"
                  : "bg-yellow-500/90 text-yellow-950"
              }`}>
                {project.status === "live" ? "Live" : "In Progress"}
              </div>

              {/* Quick Links */}
              <div className="absolute top-3 right-3 flex gap-2">
                {project.links.github && (
                  <span className="p-1.5 rounded-full bg-background/80 text-foreground">
                    <Github className="h-3.5 w-3.5" />
                  </span>
                )}
                {project.links.liveDemo && (
                  <span className="p-1.5 rounded-full bg-background/80 text-foreground">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.summary}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:text-primary/80 transition-colors">
                View project
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
