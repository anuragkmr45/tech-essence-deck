import { useState } from "react";
import { X } from "lucide-react";
import type { ContentBlock } from "@/data/articleDetails";
import ArticleCallout from "./ArticleCallout";
import ArticleCodeBlock from "./ArticleCodeBlock";
import { cn } from "@/lib/utils";

interface ArticleContentProps {
  content: ContentBlock[];
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "heading":
        if (block.level === 2) {
          return (
            <h2
              key={index}
              id={block.id}
              className="text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24"
            >
              {block.content}
            </h2>
          );
        }
        return (
          <h3
            key={index}
            id={block.id}
            className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-3 scroll-mt-24"
          >
            {block.content}
          </h3>
        );

      case "paragraph":
        return (
          <p
            key={index}
            className="text-muted-foreground leading-[1.8] mb-4"
            dangerouslySetInnerHTML={{ __html: formatText(block.content || "") }}
          />
        );

      case "list":
        const ListTag = block.ordered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={cn(
              "my-4 space-y-2 text-muted-foreground",
              block.ordered ? "list-decimal list-inside" : "list-none"
            )}
          >
            {block.items?.map((item, i) => (
              <li
                key={i}
                className={cn(
                  "leading-relaxed",
                  !block.ordered && "flex items-start gap-3"
                )}
              >
                {!block.ordered && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                )}
                <span dangerouslySetInnerHTML={{ __html: formatText(item) }} />
              </li>
            ))}
          </ListTag>
        );

      case "code":
        return (
          <ArticleCodeBlock
            key={index}
            code={block.content || ""}
            language={block.language}
          />
        );

      case "callout":
        return (
          <ArticleCallout
            key={index}
            variant={block.variant || "note"}
            content={block.content || ""}
          />
        );

      case "quote":
        return (
          <blockquote
            key={index}
            className="my-6 border-l-4 border-primary/50 pl-6 italic text-foreground/80"
          >
            <p className="text-lg leading-relaxed">"{block.content}"</p>
          </blockquote>
        );

      case "image":
        return (
          <figure key={index} className="my-8">
            <div
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setLightboxImage(block.src || "")}
            >
              <img
                src={block.src}
                alt={block.alt || ""}
                className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-sm font-medium text-white bg-background/60 px-3 py-1.5 rounded">
                  Click to enlarge
                </span>
              </div>
            </div>
            {block.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case "divider":
        return (
          <hr key={index} className="my-12 border-t border-secondary/50" />
        );

      case "key-takeaways":
        return null; // Handled separately

      default:
        return null;
    }
  };

  // Format text with markdown-like syntax
  const formatText = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
      .replace(/`(.*?)`/g, '<code class="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener">$1</a>');
  };

  return (
    <>
      <div className="prose prose-lg prose-invert max-w-none">
        {content.map((block, index) => renderBlock(block, index))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ArticleContent;
