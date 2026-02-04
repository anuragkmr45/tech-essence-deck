import { useState } from "react";
import { ChevronDown, Share2, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  items: TocItem[];
  activeId: string;
  className?: string;
}

const ArticleTableOfContents = ({ items, activeId, className }: ArticleTableOfContentsProps) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: "twitter" | "linkedin") => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  // Calculate reading progress based on active section
  const activeIndex = items.findIndex(item => item.id === activeId);
  const progress = items.length > 0 ? ((activeIndex + 1) / items.length) * 100 : 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress Indicator */}
      <div className="bg-secondary/30 rounded-xl border border-secondary/50 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Reading Progress
          </span>
          <span className="text-xs text-primary font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="bg-secondary/30 rounded-xl border border-secondary/50 p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h4 className="text-sm font-medium text-foreground">On this page</h4>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <ul className="space-y-1 text-sm">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block py-1.5 px-2 rounded transition-colors",
                      item.level === 3 && "pl-5",
                      activeId === item.id
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </nav>

      {/* Share Section */}
      <div className="bg-secondary/30 rounded-xl border border-secondary/50 p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share this article
        </h4>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleShare("linkedin")}
          >
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleTableOfContents;
