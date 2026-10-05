"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronRight, Tag } from "lucide-react";
import type { ContentBlock } from "@/data/articleDetails";
import type { ArticlePageData } from "@/lib/content/repository";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SpotlightEffect from "@/components/SpotlightEffect";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ArticleTableOfContents from "@/components/article/ArticleTableOfContents";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleKeyTakeaways from "@/components/article/ArticleKeyTakeaways";
import ArticleReferences from "@/components/article/ArticleReferences";
import ArticleAuthorCard from "@/components/article/ArticleAuthorCard";
import RelatedArticles from "@/components/article/RelatedArticles";
import ArticleNavigation from "@/components/article/ArticleNavigation";

const ArticleDetailPage = ({ article, adjacent, related }: ArticlePageData) => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Extract TOC items from content
  const tocItems = useMemo(() => {
    if (!article) return [];
    return article.content
      .filter(
        (block): block is ContentBlock & { id: string; level: 2 | 3 } =>
          block.type === "heading" && !!block.id && !!block.level
      )
      .map((block) => ({
        id: block.id,
        title: block.content || "",
        level: block.level,
      }));
  }, [article]);

  // Track active section for TOC highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );

    const headings = document.querySelectorAll("h2[id], h3[id]");
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [article]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="relative min-h-screen cursor-none pt-16">
        <CustomCursor />
        <SpotlightEffect />

        <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/writings"
                    className="hover:text-primary transition-colors"
                  >
                    Writings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px]">
                  {article.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Back Button */}
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Writings</span>
          </Link>

          {/* Article Hero */}
          <header className="mb-12">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {article.category}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.publishedDate)}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4 leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                {article.subtitle}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/writings?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="relative aspect-[21/9] overflow-hidden rounded-xl mt-8">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            )}
          </header>

          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Article Content */}
            <article className="flex-1 min-w-0 max-w-prose">
              {/* Key Takeaways (near top) */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <ArticleKeyTakeaways takeaways={article.keyTakeaways} />
              )}

              {/* Main Content */}
              <ArticleContent content={article.content} />

              {/* References */}
              {article.references && article.references.length > 0 && (
                <ArticleReferences references={article.references} />
              )}

              {/* Author Card */}
              {article.author && <ArticleAuthorCard author={article.author} />}

              {/* Related Articles */}
              <RelatedArticles articles={related} />

              {/* Navigation */}
              <ArticleNavigation
                prev={adjacent.prev}
                next={adjacent.next}
              />
            </article>

            {/* Sidebar - Table of Contents */}
            <aside className="lg:w-72 shrink-0 order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                {/* Mobile: Collapsible TOC */}
                <div className="lg:hidden mb-8">
                  <ArticleTableOfContents
                    items={tocItems}
                    activeId={activeSection}
                  />
                </div>

                {/* Desktop: Always visible */}
                <div className="hidden lg:block">
                  <ArticleTableOfContents
                    items={tocItems}
                    activeId={activeSection}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </>
  );
};

export default ArticleDetailPage;
