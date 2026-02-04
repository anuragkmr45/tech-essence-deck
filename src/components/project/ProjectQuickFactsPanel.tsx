import {
  User,
  Calendar,
  Users,
  Monitor,
  Wrench,
  Tag,
} from "lucide-react";
import type { ProjectQuickFacts } from "@/data/projectDetails";

interface ProjectQuickFactsPanelProps {
  quickFacts: ProjectQuickFacts;
}

const ProjectQuickFactsPanel = ({ quickFacts }: ProjectQuickFactsPanelProps) => {
  const facts = [
    { icon: User, label: "Role", value: quickFacts.role },
    { icon: Calendar, label: "Timeline", value: quickFacts.timeline },
    { icon: Users, label: "Team Size", value: quickFacts.teamSize },
    { icon: Monitor, label: "Platform", value: quickFacts.platform },
    {
      icon: Wrench,
      label: "Tech Stack",
      value: quickFacts.techStack,
      isArray: true,
    },
  ];

  return (
    <div className="bg-secondary/30 rounded-xl border border-secondary/50 p-6 space-y-5">
      <h3 className="text-lg font-semibold text-foreground">Quick Facts</h3>

      <div className="space-y-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
              <fact.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {fact.label}
              </p>
              {fact.isArray ? (
                <div className="flex flex-wrap gap-1.5">
                  {(fact.value as string[]).map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 rounded-md bg-secondary text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-foreground">{fact.value as string}</p>
              )}
            </div>
          </div>
        ))}

        {/* Tags */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
            <Tag className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickFacts.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectQuickFactsPanel;
