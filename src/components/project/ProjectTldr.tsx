import { CheckCircle } from "lucide-react";

interface ProjectTldrProps {
  items: string[];
}

const ProjectTldr = ({ items }: ProjectTldrProps) => {
  return (
    <div className="bg-secondary/20 rounded-xl border border-secondary/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-primary rounded-full" />
        Overview / TL;DR
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-foreground animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectTldr;
