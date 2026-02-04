import { ExternalLink, BookOpen } from "lucide-react";
import type { ArticleReference } from "@/data/articleDetails";

interface ArticleReferencesProps {
  references: ArticleReference[];
}

const ArticleReferences = ({ references }: ArticleReferencesProps) => {
  return (
    <div className="my-12 p-6 rounded-xl bg-secondary/20 border border-secondary/50">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        References & Further Reading
      </h3>
      <ul className="space-y-4">
        {references.map((ref, index) => (
          <li key={index}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-secondary/30 transition-colors"
            >
              <ExternalLink className="h-4 w-4 text-primary mt-1 shrink-0" />
              <div>
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {ref.title}
                </span>
                {ref.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {ref.description}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleReferences;
