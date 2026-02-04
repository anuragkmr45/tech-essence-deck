import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { getRelatedArticles } from "@/data/articleDetails";

interface RelatedArticlesProps {
  currentId: string;
}

const RelatedArticles = ({ currentId }: RelatedArticlesProps) => {
  const related = getRelatedArticles(currentId, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-secondary/50">
      <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {related.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="group p-4 rounded-xl bg-secondary/30 border border-secondary/50 hover:border-primary/50 transition-all"
          >
            {article.coverImage && (
              <div className="relative aspect-video overflow-hidden rounded-lg mb-3">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-primary/20 text-primary mb-2">
              {article.category}
            </span>
            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {article.readingTime}
            </div>
            <div className="flex items-center gap-1 text-sm text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              Read article <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
