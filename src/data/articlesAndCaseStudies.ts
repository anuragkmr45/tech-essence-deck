export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  category: "article" | "case-study";
  preview: string;
  link: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "Building Secure APIs with Rate Limiting and CSRF Protection",
    description: "A comprehensive guide to implementing robust API security using Redis-based rate limiting, CSRF tokens, and best practices for protecting your Node.js backend.",
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["Security", "Node.js", "Redis", "API"],
    category: "article",
    preview: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    link: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Offline-First Architecture: Lessons from Building a Digital Signage System",
    description: "Deep dive into designing offline-first applications with SQLite caching, resumable downloads, and seamless sync when connectivity is restored.",
    date: "2024-11-28",
    readTime: "12 min read",
    tags: ["Architecture", "Electron", "SQLite", "Offline-First"],
    category: "article",
    preview: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    link: "#",
    featured: true,
  },
  {
    id: "3",
    title: "TypeScript Generics: From Basics to Advanced Patterns",
    description: "Master TypeScript generics with practical examples, from simple type parameters to complex conditional types and mapped types.",
    date: "2024-10-20",
    readTime: "10 min read",
    tags: ["TypeScript", "Programming", "Tutorial"],
    category: "article",
    preview: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    id: "4",
    title: "Real-time Communication with WebRTC: A Practical Guide",
    description: "Learn how to implement peer-to-peer video calling, screen sharing, and data channels using WebRTC and Socket.IO for signaling.",
    date: "2024-09-15",
    readTime: "15 min read",
    tags: ["WebRTC", "Real-time", "Socket.IO", "JavaScript"],
    category: "article",
    preview: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    id: "5",
    title: "State Management in 2024: Redux Toolkit vs TanStack Query",
    description: "A comparison of modern state management solutions for React applications, when to use each, and how to combine them effectively.",
    date: "2024-08-10",
    readTime: "7 min read",
    tags: ["React", "Redux", "TanStack Query", "State Management"],
    category: "article",
    preview: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    link: "#",
  },
];

export const caseStudies: Article[] = [
  {
    id: "cs1",
    title: "Scaling a University Exam Platform to 5000+ Concurrent Users",
    description: "How we architected and optimized an online examination system to handle thousands of simultaneous exam sessions with zero downtime during peak periods.",
    date: "2024-11-10",
    readTime: "20 min read",
    tags: ["Scaling", "Performance", "PostgreSQL", "Caching"],
    category: "case-study",
    preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    link: "#",
    featured: true,
  },
  {
    id: "cs2",
    title: "Building a Secure Student Information System from Scratch",
    description: "A deep dive into architecting an enterprise SIS with comprehensive security measures including RBAC, audit logging, and encrypted data handling.",
    date: "2024-10-25",
    readTime: "25 min read",
    tags: ["Enterprise", "Security", "Next.js", "PostgreSQL"],
    category: "case-study",
    preview: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
    link: "#",
    featured: true,
  },
  {
    id: "cs3",
    title: "Implementing Real-time Device Telemetry at Scale",
    description: "How we built a robust telemetry system using WebSockets and Prometheus to monitor thousands of digital signage devices in real-time.",
    date: "2024-09-05",
    readTime: "18 min read",
    tags: ["IoT", "WebSockets", "Prometheus", "Monitoring"],
    category: "case-study",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    link: "#",
  },
  {
    id: "cs4",
    title: "Migrating a Legacy Monolith to Microservices",
    description: "Lessons learned from gradually decomposing a monolithic application into independent services without disrupting existing users.",
    date: "2024-07-20",
    readTime: "22 min read",
    tags: ["Microservices", "Migration", "Docker", "Architecture"],
    category: "case-study",
    preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    link: "#",
  },
];

export const allContent = [...articles, ...caseStudies].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
