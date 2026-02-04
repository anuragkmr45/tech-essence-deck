import { Github, Linkedin, Twitter } from "lucide-react";
import type { ArticleAuthor } from "@/data/articleDetails";

interface ArticleAuthorCardProps {
  author: ArticleAuthor;
}

const ArticleAuthorCard = ({ author }: ArticleAuthorCardProps) => {
  return (
    <div className="my-12 p-6 rounded-xl bg-secondary/30 border border-secondary/50">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
        )}
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-foreground">{author.name}</h4>
          <p className="text-sm text-primary mb-2">{author.role}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {author.bio}
          </p>
        </div>
      </div>
      
      {author.social && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-secondary/50">
          {author.social.github && (
            <a
              href={author.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {author.social.linkedin && (
            <a
              href={author.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {author.social.twitter && (
            <a
              href={author.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleAuthorCard;
