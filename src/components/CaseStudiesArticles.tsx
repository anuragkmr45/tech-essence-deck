import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, BookOpen, FileText } from "lucide-react";
import { articles, caseStudies } from "@/data/articlesAndCaseStudies";
import { Button } from "./ui/button";

const CaseStudiesArticles = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);

  // Get latest 2 articles and 2 case studies
  const latestArticles = articles.slice(0, 2);
  const latestCaseStudies = caseStudies.slice(0, 2);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.2, rootMargin: "-50px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const ContentCard = ({
    item,
    index,
    type,
  }: {
    item: (typeof articles)[0];
    index: number;
    type: "article" | "case-study";
  }) => {
    const isCaseStudy = type === "case-study";
    const isArticle = type === "article";
    const linkTo = isCaseStudy ? `/case-study/${item.id}` : `/article/${item.id}`;
    
    const cardClassName = `group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-500 block ${
      visibleItems.has(index)
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`;
    
    const cardStyle = { transitionDelay: `${(index % 2) * 100}ms` };
    
    const cardContent = (
      <>
        {/* Preview Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.preview}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Type Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
            {type === "article" ? (
              <BookOpen className="h-3 w-3" />
            ) : (
              <FileText className="h-3 w-3" />
            )}
            {type === "article" ? "Article" : "Case Study"}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(item.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {item.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More Link */}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary group-hover:text-primary/80 transition-colors">
            {isCaseStudy ? "Read case study" : "Read article"}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </>
    );
    
    return (
      <Link
        to={linkTo}
        ref={(el) => (itemRefs.current[index] = el)}
        className={cardClassName}
        style={cardStyle}
      >
        {cardContent}
      </Link>
    );
  };

  return (
    <section
      id="writings"
      ref={sectionRef}
      className="py-24 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold text-foreground">
            Case Studies & Articles
          </h2>
        </div>
      </div>

      {/* Case Studies */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Latest Case Studies
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {latestCaseStudies.map((item, index) => (
            <ContentCard
              key={item.id}
              item={item}
              index={index}
              type="case-study"
            />
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="mb-12">
        <h3 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Latest Articles
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {latestArticles.map((item, index) => (
            <ContentCard
              key={item.id}
              item={item}
              index={index + 2}
              type="article"
            />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <Button
          asChild
          variant="outline"
          className="border-primary/50 hover:border-primary hover:bg-primary/10 group"
        >
          <Link to="/writings" className="flex items-center gap-2">
            View All Writings
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CaseStudiesArticles;
