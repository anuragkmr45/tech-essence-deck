import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ArticleDetail } from "@/data/articleDetails";

interface ArticleNavigationProps {
  prev: ArticleDetail | null;
  next: ArticleDetail | null;
}

const ArticleNavigation = ({ prev, next }: ArticleNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-secondary/50">
      {prev ? (
        <Link
          to={`/article/${prev.id}`}
          className="flex-1 group p-4 rounded-lg bg-secondary/30 border border-secondary/50 hover:border-primary/50 transition-all"
        >
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-xs uppercase tracking-wide">Previous</span>
          </div>
          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          to={`/article/${next.id}`}
          className="flex-1 group p-4 rounded-lg bg-secondary/30 border border-secondary/50 hover:border-primary/50 transition-all text-right"
        >
          <div className="flex items-center justify-end gap-2 text-muted-foreground mb-2">
            <span className="text-xs uppercase tracking-wide">Next</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
          <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {next.title}
          </p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default ArticleNavigation;
