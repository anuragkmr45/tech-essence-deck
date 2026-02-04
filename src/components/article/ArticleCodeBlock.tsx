import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArticleCodeBlockProps {
  code: string;
  language?: string;
}

const ArticleCodeBlock = ({ code, language = "typescript" }: ArticleCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-secondary/50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-secondary/50">
        <span className="text-xs font-mono text-muted-foreground uppercase">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 mr-1 text-primary" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code className="text-foreground/80">{code}</code>
      </pre>
    </div>
  );
};

export default ArticleCodeBlock;
