import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, ArrowRight, Calendar, Clock, BookOpen, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { articles, caseStudies, allContent } from "@/data/articlesAndCaseStudies";
import { personalInfo } from "@/data/portfolio";
import { Input } from "@/components/ui/input";
import SpotlightEffect from "@/components/SpotlightEffect";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";

const categories = [
  { id: "all", label: "All", count: allContent.length },
  { id: "case-study", label: "Case Studies", count: caseStudies.length },
  { id: "article", label: "Articles", count: articles.length },
];

const AllWritings = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = useMemo(() => {
    return allContent.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Case Studies & Articles | {personalInfo.name}</title>
        <meta
          name="description"
          content={`Read case studies and articles by ${personalInfo.name} about web development, architecture, and engineering best practices.`}
        />
      </Helmet>

      <div className="relative min-h-screen cursor-none">
        <CustomCursor />
        <SpotlightEffect />

        <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Case Studies & Articles
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Deep dives into projects I've built, lessons learned, and thoughts
              on software engineering, architecture, and best practices.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search writings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary/50 border-secondary focus:border-primary"
            />
          </div>

          {/* Category Tabs */}
          <div className="mb-10 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${
                      activeCategory === category.id
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {/* Animated Background */}
                  {activeCategory === category.id && (
                    <span
                      className="absolute inset-0 bg-primary rounded-full animate-scale-in"
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {activeCategory !== category.id && (
                    <span
                      className="absolute inset-0 bg-secondary/50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {category.label}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.id
                        ? "bg-primary-foreground/20"
                        : "bg-secondary"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-secondary/30 rounded-lg overflow-hidden border border-secondary/50 hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
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
                    {item.category === "article" ? (
                      <BookOpen className="h-3 w-3" />
                    ) : (
                      <FileText className="h-3 w-3" />
                    )}
                    {item.category === "article" ? "Article" : "Case Study"}
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-medium">
                      Featured
                    </div>
                  )}
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
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Read More Link */}
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredContent.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No writings found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <ScrollToTop />
      </div>
    </>
  );
};

export default AllWritings;
