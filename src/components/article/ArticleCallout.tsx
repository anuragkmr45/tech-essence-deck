import { Info, Lightbulb, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCalloutProps {
  variant: "note" | "tip" | "warning";
  content: string;
}

const variants = {
  note: {
    icon: Info,
    title: "Note",
    className: "border-blue-500/30 bg-blue-500/10",
    iconClass: "text-blue-400",
  },
  tip: {
    icon: Lightbulb,
    title: "Tip",
    className: "border-green-500/30 bg-green-500/10",
    iconClass: "text-green-400",
  },
  warning: {
    icon: AlertTriangle,
    title: "Warning",
    className: "border-amber-500/30 bg-amber-500/10",
    iconClass: "text-amber-400",
  },
};

const ArticleCallout = ({ variant, content }: ArticleCalloutProps) => {
  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 p-4 my-6",
        config.className
      )}
    >
      <div className="flex gap-3">
        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClass)} />
        <div>
          <p className="font-medium text-foreground mb-1">{config.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCallout;
