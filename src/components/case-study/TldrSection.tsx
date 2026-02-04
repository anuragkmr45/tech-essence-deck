import { AlertCircle, Lightbulb, CheckCircle } from "lucide-react";

interface TldrSectionProps {
  tldr: {
    problem: string;
    solution: string;
    outcome: string;
  };
}

const TldrSection = ({ tldr }: TldrSectionProps) => {
  const items = [
    {
      icon: AlertCircle,
      label: "Problem",
      content: tldr.problem,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: Lightbulb,
      label: "What I Did",
      content: tldr.solution,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: CheckCircle,
      label: "Outcome",
      content: tldr.outcome,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  return (
    <div className="bg-secondary/20 rounded-xl border border-secondary/50 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">TL;DR</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="flex items-start gap-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-2 rounded-lg ${item.bgColor} ${item.color} shrink-0`}>
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {item.label}
              </p>
              <p className="text-foreground">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TldrSection;
