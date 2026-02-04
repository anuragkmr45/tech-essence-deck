import type { CaseStudySection as SectionType } from "@/data/caseStudyDetails";

interface CaseStudySectionProps {
  section: SectionType;
  index: number;
}

const CaseStudySection = ({ section, index }: CaseStudySectionProps) => {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
        <span className="w-1 h-6 bg-primary rounded-full" />
        {section.title}
      </h2>
      
      <div className="pl-4 border-l-2 border-secondary/50">
        <p className="text-muted-foreground leading-relaxed mb-4">
          {section.content}
        </p>
        
        {section.bullets && section.bullets.length > 0 && (
          <ul className="space-y-2">
            {section.bullets.map((bullet, bulletIndex) => (
              <li
                key={bulletIndex}
                className="flex items-start gap-3 text-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CaseStudySection;
