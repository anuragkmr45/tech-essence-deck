import { CheckCircle2 } from "lucide-react";

interface ArticleKeyTakeawaysProps {
  takeaways: string[];
}

const ArticleKeyTakeaways = ({ takeaways }: ArticleKeyTakeawaysProps) => {
  return (
    <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        Key Takeaways
      </h3>
      <ul className="space-y-3">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="text-muted-foreground leading-relaxed">
              {takeaway}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleKeyTakeaways;
