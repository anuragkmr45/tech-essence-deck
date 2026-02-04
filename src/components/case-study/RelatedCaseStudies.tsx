import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";
import { caseStudyDetails } from "@/data/caseStudyDetails";

interface RelatedCaseStudiesProps {
  currentId: string;
}

const RelatedCaseStudies = ({ currentId }: RelatedCaseStudiesProps) => {
  // Get other case studies (exclude current)
  const otherCaseStudies = Object.values(caseStudyDetails)
    .filter((cs) => cs.id !== currentId)
    .slice(0, 3);

  if (otherCaseStudies.length === 0) return null;

  return (
    <section className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
        <span className="w-1 h-6 bg-primary rounded-full" />
        Related Case Studies
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherCaseStudies.map((caseStudy) => (
          <Link
            key={caseStudy.id}
            to={`/case-study/${caseStudy.id}`}
            className="group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-300"
          >
            {caseStudy.coverImage && (
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={caseStudy.coverImage}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                  <FileText className="h-3 w-3" />
                  Case Study
                </div>
              </div>
            )}

            <div className="p-4">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {caseStudy.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {caseStudy.oneLineSummary}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:text-primary/80 transition-colors">
                Read case study
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedCaseStudies;
