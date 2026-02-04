import { Play, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  preview: string;
  title: string;
  github: string;
  demo: string;
}

const ProjectCard = ({ preview, title, github, demo }: ProjectCardProps) => {
  const hasDemo = demo !== "#";
  const hasGithub = github !== "#";

  return (
    <div className="relative group overflow-hidden rounded-lg aspect-video bg-secondary/30">
      {/* Preview Image */}
      <img
        src={preview}
        alt={`${title} preview`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
        {/* Play Demo Button */}
        {hasDemo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Play demo"
          >
            <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
          </a>
        )}
        
        {/* GitHub Link */}
        {hasGithub && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="View on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        
        {/* External Demo Link */}
        {hasDemo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200 hover:scale-110 shadow-lg"
            aria-label="Open live demo"
          >
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
      </div>
      
      {/* Bottom gradient for better text visibility */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ProjectCard;
