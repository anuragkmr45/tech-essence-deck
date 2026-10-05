import "server-only";

import { allProjects, type Project } from "@/data/allProjects";
import {
  allContent,
  articles,
  caseStudies,
  type Article as WritingSummary,
} from "@/data/articlesAndCaseStudies";
import {
  articleDetails,
  getAdjacentArticles,
  getAllArticles,
  getArticleByIdOrSlug,
  getRelatedArticles,
  type ArticleDetail,
} from "@/data/articleDetails";
import {
  caseStudyDetails,
  getAdjacentCaseStudies,
  getCaseStudyIds,
  type CaseStudyDetail,
} from "@/data/caseStudyDetails";
import {
  aboutText,
  achievements,
  education,
  experience,
  navItems,
  npmPackages,
  personalInfo,
  projects,
  skills,
} from "@/data/portfolio";
import {
  getAdjacentProjects,
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
  projectDetails,
  projectTitleToSlug,
  type ProjectDetail,
} from "@/data/projectDetails";

export interface HomeContent {
  personalInfo: typeof personalInfo;
  aboutText: typeof aboutText;
  experience: typeof experience;
  projects: typeof projects;
  npmPackages: typeof npmPackages;
  skills: typeof skills;
  achievements: typeof achievements;
  education: typeof education;
  navItems: typeof navItems;
  articles: WritingSummary[];
  caseStudies: WritingSummary[];
}

export interface ProjectListingItem extends Project {
  slug: string | null;
  status: ProjectDetail["status"] | null;
}

export interface ProjectPageData {
  project: ProjectDetail;
  adjacent: ReturnType<typeof getAdjacentProjects>;
  related: ProjectDetail[];
}

export interface CaseStudyPageData {
  caseStudy: CaseStudyDetail;
  adjacent: ReturnType<typeof getAdjacentCaseStudies>;
  related: CaseStudyDetail[];
}

export interface ArticlePageData {
  article: ArticleDetail;
  adjacent: ReturnType<typeof getAdjacentArticles>;
  related: ArticleDetail[];
}

export interface SitemapContent {
  projects: Array<Pick<ProjectDetail, "slug">>;
  articles: Array<Pick<ArticleDetail, "id" | "slug" | "publishedDate" | "updatedDate">>;
  caseStudies: Array<Pick<CaseStudyDetail, "id" | "publishedDate">>;
}

export interface ContentRepository {
  getHomeContent(): Promise<HomeContent>;
  listProjects(): Promise<ProjectListingItem[]>;
  getProject(slug: string): Promise<ProjectPageData | null>;
  getProjectSlugs(): Promise<string[]>;
  listWritings(): Promise<WritingSummary[]>;
  getArticle(identifier: string): Promise<ArticlePageData | null>;
  getArticleRouteParams(): Promise<string[]>;
  getCaseStudy(id: string): Promise<CaseStudyPageData | null>;
  getCaseStudyIds(): Promise<string[]>;
  getSitemapContent(): Promise<SitemapContent>;
}

class StaticContentRepository implements ContentRepository {
  async getHomeContent(): Promise<HomeContent> {
    return {
      personalInfo,
      aboutText,
      experience,
      projects,
      npmPackages,
      skills,
      achievements,
      education,
      navItems,
      articles,
      caseStudies,
    };
  }

  async listProjects(): Promise<ProjectListingItem[]> {
    return allProjects.map((project) => {
      const slug = projectTitleToSlug[project.title];
      const detail = slug ? projectDetails[slug] : undefined;

      return {
        ...project,
        slug: detail ? slug : null,
        status: detail?.status ?? null,
      };
    });
  }

  async getProject(slug: string): Promise<ProjectPageData | null> {
    const project = getProjectBySlug(slug);
    if (!project) return null;

    return {
      project,
      adjacent: getAdjacentProjects(slug),
      related: getRelatedProjects(slug, 3),
    };
  }

  async getProjectSlugs(): Promise<string[]> {
    return getAllProjectSlugs();
  }

  async listWritings(): Promise<WritingSummary[]> {
    return allContent;
  }

  async getArticle(identifier: string): Promise<ArticlePageData | null> {
    const article = getArticleByIdOrSlug(identifier);
    if (!article) return null;

    return {
      article,
      adjacent: getAdjacentArticles(article.id),
      related: getRelatedArticles(article.id, 3),
    };
  }

  async getArticleRouteParams(): Promise<string[]> {
    return [
      ...articles.map((article) => article.id),
      ...getAllArticles().map((article) => article.slug),
    ];
  }

  async getCaseStudy(id: string): Promise<CaseStudyPageData | null> {
    const caseStudy = caseStudyDetails[id];
    if (!caseStudy) return null;

    return {
      caseStudy,
      adjacent: getAdjacentCaseStudies(id),
      related: Object.values(caseStudyDetails)
        .filter((candidate) => candidate.id !== id)
        .slice(0, 3),
    };
  }

  async getCaseStudyIds(): Promise<string[]> {
    return getCaseStudyIds();
  }

  async getSitemapContent(): Promise<SitemapContent> {
    return {
      projects: Object.values(projectDetails).map(({ slug }) => ({ slug })),
      articles: Object.values(articleDetails).map(
        ({ id, slug, publishedDate, updatedDate }) => ({
          id,
          slug,
          publishedDate,
          updatedDate,
        }),
      ),
      caseStudies: Object.values(caseStudyDetails).map(({ id, publishedDate }) => ({
        id,
        publishedDate,
      })),
    };
  }
}

export const contentRepository: ContentRepository = new StaticContentRepository();

export type { ArticleDetail, CaseStudyDetail, ProjectDetail, WritingSummary };
