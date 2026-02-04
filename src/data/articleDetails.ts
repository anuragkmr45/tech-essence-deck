export interface ContentBlock {
  type: 
    | "paragraph" 
    | "heading" 
    | "list" 
    | "code" 
    | "callout" 
    | "quote" 
    | "image" 
    | "divider"
    | "key-takeaways";
  content?: string;
  level?: 2 | 3; // For headings
  items?: string[]; // For lists
  ordered?: boolean; // For lists
  language?: string; // For code blocks
  variant?: "note" | "tip" | "warning"; // For callouts
  src?: string; // For images
  alt?: string; // For images
  caption?: string; // For images
  id?: string; // For anchor linking
}

export interface ArticleReference {
  title: string;
  url: string;
  description?: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  description: string;
  readingTime: string;
  category: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface ArticleDetail {
  id: string;
  slug: string;
  type: "article";
  title: string;
  subtitle?: string;
  publishedDate: string;
  updatedDate?: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  content: ContentBlock[];
  keyTakeaways?: string[];
  references?: ArticleReference[];
  author?: ArticleAuthor;
}

// Sample article data with deep-dive format
export const articleDetails: Record<string, ArticleDetail> = {
  "1": {
    id: "1",
    slug: "building-secure-apis-rate-limiting-csrf",
    type: "article",
    title: "Building Secure APIs with Rate Limiting and CSRF Protection",
    subtitle: "A comprehensive guide to implementing robust API security using Redis-based rate limiting, CSRF tokens, and best practices for protecting your Node.js backend.",
    publishedDate: "2024-12-15",
    readingTime: "8 min read",
    category: "Engineering",
    tags: ["Security", "Node.js", "Redis", "API", "Backend"],
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop",
    keyTakeaways: [
      "Rate limiting prevents abuse and ensures fair resource allocation across users",
      "CSRF tokens protect against cross-site request forgery attacks on state-changing operations",
      "Redis provides fast, distributed rate limiting that works across multiple server instances",
      "Defense in depth: combine multiple security layers for robust protection",
      "Always validate and sanitize input, even with authentication in place"
    ],
    content: [
      {
        type: "heading",
        level: 2,
        content: "Introduction",
        id: "introduction"
      },
      {
        type: "paragraph",
        content: "API security isn't optional—it's foundational. Whether you're building a public API or an internal service, protecting your endpoints from abuse and attacks is critical. In this guide, we'll explore two essential security mechanisms: rate limiting and CSRF protection."
      },
      {
        type: "paragraph",
        content: "I've implemented these patterns across multiple production systems serving millions of requests daily. The approaches here are battle-tested and practical, focusing on real-world implementation rather than theoretical concepts."
      },
      {
        type: "callout",
        variant: "note",
        content: "This guide assumes you have a basic understanding of Node.js and Express. We'll be using Redis for distributed rate limiting, but the concepts apply to any caching solution."
      },
      {
        type: "heading",
        level: 2,
        content: "Understanding Rate Limiting",
        id: "understanding-rate-limiting"
      },
      {
        type: "paragraph",
        content: "Rate limiting controls how many requests a client can make to your API within a given time window. Without it, a single user (or attacker) could overwhelm your servers, affecting everyone else."
      },
      {
        type: "heading",
        level: 3,
        content: "Why Rate Limiting Matters",
        id: "why-rate-limiting"
      },
      {
        type: "list",
        ordered: false,
        items: [
          "**Prevents abuse**: Stops malicious actors from flooding your API",
          "**Ensures fairness**: Allocates resources equitably across users",
          "**Protects infrastructure**: Prevents cascading failures under load",
          "**Reduces costs**: Limits expensive operations like database queries or external API calls"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "Implementing Redis-Based Rate Limiting",
        id: "redis-rate-limiting"
      },
      {
        type: "paragraph",
        content: "Redis is ideal for rate limiting because it's fast, atomic, and works across distributed systems. We'll implement the sliding window algorithm, which provides smoother rate limiting than fixed windows."
      },
      {
        type: "code",
        language: "typescript",
        content: `import Redis from 'ioredis';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

class RateLimiter {
  private redis: Redis;
  private windowMs: number;
  private maxRequests: number;

  constructor(redis: Redis, windowMs = 60000, maxRequests = 100) {
    this.redis = redis;
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  async checkLimit(key: string): Promise<RateLimitResult> {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Use Redis transaction for atomicity
    const pipeline = this.redis.pipeline();
    pipeline.zremrangebyscore(key, 0, windowStart);
    pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`);
    pipeline.zcard(key);
    pipeline.pexpire(key, this.windowMs);

    const results = await pipeline.exec();
    const requestCount = results?.[2]?.[1] as number;

    return {
      allowed: requestCount <= this.maxRequests,
      remaining: Math.max(0, this.maxRequests - requestCount),
      resetTime: now + this.windowMs
    };
  }
}`
      },
      {
        type: "callout",
        variant: "tip",
        content: "Use different rate limit tiers for different user types. Authenticated users might get 1000 requests/minute while anonymous users get 100."
      },
      {
        type: "heading",
        level: 2,
        content: "Express Middleware Integration",
        id: "express-middleware"
      },
      {
        type: "paragraph",
        content: "Wrapping our rate limiter in Express middleware makes it reusable across routes:"
      },
      {
        type: "code",
        language: "typescript",
        content: `import { Request, Response, NextFunction } from 'express';

const rateLimitMiddleware = (limiter: RateLimiter) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Use IP + user ID for more accurate limiting
    const identifier = req.user?.id 
      ? \`user:\${req.user.id}\` 
      : \`ip:\${req.ip}\`;
    
    const result = await limiter.checkLimit(identifier);
    
    // Set standard rate limit headers
    res.setHeader('X-RateLimit-Limit', limiter.maxRequests);
    res.setHeader('X-RateLimit-Remaining', result.remaining);
    res.setHeader('X-RateLimit-Reset', result.resetTime);
    
    if (!result.allowed) {
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
      });
    }
    
    next();
  };
};`
      },
      {
        type: "heading",
        level: 2,
        content: "CSRF Protection Deep Dive",
        id: "csrf-protection"
      },
      {
        type: "paragraph",
        content: "Cross-Site Request Forgery (CSRF) tricks authenticated users into executing unwanted actions. An attacker crafts a malicious request and lures the victim into triggering it, exploiting the victim's authenticated session."
      },
      {
        type: "quote",
        content: "CSRF attacks are particularly dangerous because they exploit the trust that a site has in the user's browser, not vulnerabilities in the application code itself."
      },
      {
        type: "heading",
        level: 3,
        content: "How CSRF Attacks Work",
        id: "how-csrf-works"
      },
      {
        type: "list",
        ordered: true,
        items: [
          "User logs into trusted site A and receives a session cookie",
          "User visits malicious site B while still logged into A",
          "Site B contains hidden form/script that submits request to A",
          "Browser automatically includes A's cookies with the request",
          "Site A processes the request as legitimate, not knowing it wasn't intentional"
        ]
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
        alt: "CSRF Attack Flow Diagram",
        caption: "Visualization of how CSRF attacks exploit session-based authentication"
      },
      {
        type: "heading",
        level: 2,
        content: "Implementing CSRF Tokens",
        id: "implementing-csrf"
      },
      {
        type: "paragraph",
        content: "The synchronizer token pattern is the most reliable CSRF defense. We generate a random token, store it server-side, and require it with every state-changing request."
      },
      {
        type: "code",
        language: "typescript",
        content: `import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// Generate cryptographically secure token
const generateCsrfToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to set CSRF token
const csrfTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateCsrfToken();
  }
  
  // Make token available to templates/responses
  res.locals.csrfToken = req.session.csrfToken;
  next();
};

// Middleware to validate CSRF token on mutations
const validateCsrf = (req: Request, res: Response, next: NextFunction) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }
  
  const token = req.headers['x-csrf-token'] || req.body._csrf;
  
  if (!token || token !== req.session.csrfToken) {
    return res.status(403).json({ 
      error: 'Invalid CSRF token' 
    });
  }
  
  next();
};`
      },
      {
        type: "callout",
        variant: "warning",
        content: "Never expose CSRF tokens in URLs or logs. Always transmit them via headers or hidden form fields, and regenerate tokens after authentication state changes."
      },
      {
        type: "heading",
        level: 2,
        content: "Combining Both Protections",
        id: "combining-protections"
      },
      {
        type: "paragraph",
        content: "The real power comes from layering security mechanisms. Here's how to apply both rate limiting and CSRF protection in a production Express app:"
      },
      {
        type: "code",
        language: "typescript",
        content: `import express from 'express';
import Redis from 'ioredis';

const app = express();
const redis = new Redis(process.env.REDIS_URL);

// Initialize rate limiters for different tiers
const standardLimiter = new RateLimiter(redis, 60000, 100);
const strictLimiter = new RateLimiter(redis, 60000, 10);

// Apply middleware
app.use(csrfTokenMiddleware);
app.use(validateCsrf);

// Standard rate limit for most endpoints
app.use('/api', rateLimitMiddleware(standardLimiter));

// Stricter limits for sensitive operations
app.use('/api/auth', rateLimitMiddleware(strictLimiter));
app.use('/api/payments', rateLimitMiddleware(strictLimiter));

// Your routes...
app.post('/api/transfer', async (req, res) => {
  // Both rate limiting and CSRF protection applied!
  // Safe to process the transfer
});`
      },
      {
        type: "divider"
      },
      {
        type: "heading",
        level: 2,
        content: "Best Practices & Common Pitfalls",
        id: "best-practices"
      },
      {
        type: "heading",
        level: 3,
        content: "Do's",
        id: "dos"
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Use cryptographically secure random number generators for tokens",
          "Set appropriate TTLs on rate limit keys to prevent memory bloat",
          "Include rate limit headers in responses for client awareness",
          "Log rate limit violations for monitoring and abuse detection",
          "Consider different limits for different user tiers or endpoints"
        ]
      },
      {
        type: "heading",
        level: 3,
        content: "Don'ts",
        id: "donts"
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Don't rely solely on client-side rate limiting—always enforce server-side",
          "Don't use predictable tokens or sequential IDs",
          "Don't store sensitive tokens in localStorage (use httpOnly cookies)",
          "Don't forget to rate limit by authenticated user, not just IP",
          "Don't apply the same limits to all endpoints—be strategic"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusion",
        id: "conclusion"
      },
      {
        type: "paragraph",
        content: "Security is not a feature you add at the end—it's a mindset you maintain throughout development. Rate limiting and CSRF protection are just two pieces of a comprehensive security strategy."
      },
      {
        type: "paragraph",
        content: "Start with these fundamentals, then build upon them with input validation, authentication hardening, and regular security audits. Your users trust you with their data; these measures help you honor that trust."
      }
    ],
    references: [
      {
        title: "OWASP CSRF Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
        description: "Comprehensive guide to CSRF prevention techniques"
      },
      {
        title: "Redis Rate Limiting Patterns",
        url: "https://redis.io/commands/incr/#pattern-rate-limiter-1",
        description: "Official Redis documentation on rate limiting implementations"
      },
      {
        title: "Express.js Security Best Practices",
        url: "https://expressjs.com/en/advanced/best-practice-security.html",
        description: "Security recommendations from the Express.js team"
      }
    ],
    author: {
      name: "Anurag Affection",
      role: "Full-Stack Developer",
      bio: "Building scalable web applications with a focus on security and performance. Previously at EdTech startups, now exploring the intersection of AI and developer tools.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      social: {
        github: "https://github.com/anuragaffection",
        linkedin: "https://linkedin.com/in/anuragaffection",
        twitter: "https://twitter.com/anuragaffection"
      }
    }
  },
  "2": {
    id: "2",
    slug: "offline-first-architecture-digital-signage",
    type: "article",
    title: "Offline-First Architecture: Lessons from Building a Digital Signage System",
    subtitle: "Deep dive into designing offline-first applications with SQLite caching, resumable downloads, and seamless sync when connectivity is restored.",
    publishedDate: "2024-11-28",
    readingTime: "12 min read",
    category: "Architecture",
    tags: ["Architecture", "Electron", "SQLite", "Offline-First"],
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    keyTakeaways: [
      "Offline-first isn't just caching—it's a complete shift in how you think about data flow",
      "SQLite provides a robust local database that works identically across platforms",
      "Design your sync logic to be idempotent and conflict-aware from day one",
      "Resumable downloads are essential for large media files on unreliable networks",
      "Test offline scenarios as rigorously as you test the happy path"
    ],
    content: [
      {
        type: "heading",
        level: 2,
        content: "The Problem with Always-Online Assumptions",
        id: "the-problem"
      },
      {
        type: "paragraph",
        content: "When we started building the digital signage system, we assumed network connectivity would be reliable. Shopping malls have WiFi, right? Corporate offices have Ethernet. What could go wrong?"
      },
      {
        type: "paragraph",
        content: "Everything. Network outages at 3 AM. ISP maintenance windows. That one screen in the basement with terrible reception. We learned quickly that treating connectivity as optional—not guaranteed—fundamentally changes how you architect applications."
      },
      {
        type: "callout",
        variant: "note",
        content: "This article shares lessons from building a system that manages 10,000+ digital displays across 500+ locations. The patterns apply to any application that needs to work reliably in poor network conditions."
      },
      {
        type: "heading",
        level: 2,
        content: "Core Principles of Offline-First",
        id: "core-principles"
      },
      {
        type: "paragraph",
        content: "Offline-first isn't a library or framework—it's a design philosophy. These principles guided our architecture:"
      },
      {
        type: "list",
        ordered: true,
        items: [
          "**Local-first data**: The local database is the source of truth, not a cache",
          "**Sync as enhancement**: Features work offline; sync improves them",
          "**Graceful degradation**: Limited functionality is better than no functionality",
          "**Conflict resolution**: Concurrent modifications must be handled deterministically"
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "SQLite as the Local Foundation",
        id: "sqlite-foundation"
      },
      {
        type: "paragraph",
        content: "We chose SQLite for local storage, and it's been rock-solid. It's embedded, requires no separate process, and handles concurrent reads efficiently. Here's our schema design pattern:"
      },
      {
        type: "code",
        language: "sql",
        content: `-- Every table includes sync metadata
CREATE TABLE playlists (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  content JSON NOT NULL,
  
  -- Sync metadata
  local_version INTEGER DEFAULT 1,
  server_version INTEGER DEFAULT 0,
  sync_status TEXT DEFAULT 'pending', -- pending, synced, conflict
  last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_synced DATETIME,
  
  -- Soft delete for sync
  deleted_at DATETIME
);

-- Track pending operations for sync queue
CREATE TABLE sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  operation TEXT NOT NULL, -- create, update, delete
  payload JSON,
  attempts INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`
      },
      {
        type: "heading",
        level: 2,
        content: "The Sync Engine",
        id: "sync-engine"
      },
      {
        type: "paragraph",
        content: "Our sync engine follows a push-then-pull pattern. Local changes are pushed to the server first, then we pull any remote changes. This order matters for conflict detection."
      },
      {
        type: "code",
        language: "typescript",
        content: `class SyncEngine {
  private db: Database;
  private api: ApiClient;
  private isOnline: boolean = false;

  async sync(): Promise<SyncResult> {
    if (!this.isOnline) {
      return { status: 'offline', synced: 0, conflicts: 0 };
    }

    try {
      // Phase 1: Push local changes
      const pushResult = await this.pushChanges();
      
      // Phase 2: Pull remote changes
      const pullResult = await this.pullChanges();
      
      // Phase 3: Resolve any conflicts
      const conflicts = await this.resolveConflicts();
      
      return {
        status: 'success',
        synced: pushResult.count + pullResult.count,
        conflicts: conflicts.length
      };
    } catch (error) {
      return { status: 'error', error: error.message };
    }
  }

  private async pushChanges(): Promise<{ count: number }> {
    const pending = await this.db.query(
      'SELECT * FROM sync_queue ORDER BY created_at ASC LIMIT 50'
    );
    
    let synced = 0;
    for (const item of pending) {
      try {
        await this.api.sync(item);
        await this.db.run(
          'DELETE FROM sync_queue WHERE id = ?', 
          [item.id]
        );
        synced++;
      } catch (error) {
        // Increment retry count, will try again next sync
        await this.db.run(
          'UPDATE sync_queue SET attempts = attempts + 1 WHERE id = ?',
          [item.id]
        );
      }
    }
    
    return { count: synced };
  }
}`
      },
      {
        type: "callout",
        variant: "tip",
        content: "Implement exponential backoff for failed sync attempts. After 5 failures, mark the item for manual review rather than retrying indefinitely."
      },
      {
        type: "heading",
        level: 2,
        content: "Resumable Downloads for Media Files",
        id: "resumable-downloads"
      },
      {
        type: "paragraph",
        content: "Digital signage involves large video files—sometimes 500MB or more. Downloading these over unreliable connections required resumable downloads with integrity verification."
      },
      {
        type: "code",
        language: "typescript",
        content: `interface DownloadState {
  url: string;
  targetPath: string;
  totalBytes: number;
  downloadedBytes: number;
  checksum: string;
  status: 'pending' | 'downloading' | 'paused' | 'complete' | 'failed';
}

class ResumableDownloader {
  async download(state: DownloadState): Promise<void> {
    const headers: Record<string, string> = {};
    
    // Resume from where we left off
    if (state.downloadedBytes > 0) {
      headers['Range'] = \`bytes=\${state.downloadedBytes}-\`;
    }
    
    const response = await fetch(state.url, { headers });
    
    if (response.status === 206) {
      // Partial content - resuming
      await this.appendToFile(state.targetPath, response.body);
    } else if (response.status === 200) {
      // Starting fresh
      await this.writeToFile(state.targetPath, response.body);
    }
    
    // Verify integrity
    const actualChecksum = await this.calculateChecksum(state.targetPath);
    if (actualChecksum !== state.checksum) {
      throw new Error('Checksum mismatch - file corrupted');
    }
  }
}`
      },
      {
        type: "heading",
        level: 2,
        content: "Conflict Resolution Strategies",
        id: "conflict-resolution"
      },
      {
        type: "paragraph",
        content: "When the same record is modified both locally and remotely, you have a conflict. We use a combination of strategies based on the data type:"
      },
      {
        type: "list",
        ordered: false,
        items: [
          "**Last-write-wins**: For simple fields like status or settings",
          "**Server-wins**: For data requiring central authority (schedules)",
          "**Merge**: For additive data like logs or analytics",
          "**Manual resolution**: For critical conflicts requiring human decision"
        ]
      },
      {
        type: "quote",
        content: "The best conflict resolution strategy is preventing conflicts in the first place. Design your data model to minimize concurrent modifications to the same records."
      },
      {
        type: "heading",
        level: 2,
        content: "Lessons Learned",
        id: "lessons-learned"
      },
      {
        type: "paragraph",
        content: "After two years running this system in production, here are the patterns that worked and the mistakes we made:"
      },
      {
        type: "heading",
        level: 3,
        content: "What Worked",
        id: "what-worked"
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Treating the network as unreliable from day one",
          "Using SQLite's WAL mode for better concurrent performance",
          "Implementing health checks that work offline",
          "Building a sync debug UI for troubleshooting"
        ]
      },
      {
        type: "heading",
        level: 3,
        content: "Mistakes We Made",
        id: "mistakes"
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Initially storing too much in memory instead of SQLite",
          "Not implementing proper retry logic for failed syncs",
          "Underestimating storage requirements for media caching",
          "Not testing offline mode as rigorously as online mode"
        ]
      },
      {
        type: "callout",
        variant: "warning",
        content: "Don't assume users will always be online when you test. Create automated tests that simulate network partitions, slow connections, and complete offline scenarios."
      },
      {
        type: "heading",
        level: 2,
        content: "Conclusion",
        id: "conclusion"
      },
      {
        type: "paragraph",
        content: "Offline-first architecture requires more upfront investment, but the payoff is tremendous. Our digital signage system now handles network outages gracefully, and users rarely notice connectivity issues."
      },
      {
        type: "paragraph",
        content: "The key insight is that offline-first isn't about caching—it's about treating the local database as the authoritative source and synchronization as an enhancement. Start with this mindset, and the technical implementation follows naturally."
      }
    ],
    references: [
      {
        title: "Local-First Software",
        url: "https://www.inkandswitch.com/local-first/",
        description: "Seminal paper on local-first software principles by Ink & Switch"
      },
      {
        title: "SQLite in Production",
        url: "https://www.sqlite.org/whentouse.html",
        description: "Official SQLite documentation on appropriate use cases"
      }
    ],
    author: {
      name: "Anurag Affection",
      role: "Full-Stack Developer",
      bio: "Building scalable web applications with a focus on security and performance. Previously at EdTech startups, now exploring the intersection of AI and developer tools.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      social: {
        github: "https://github.com/anuragaffection",
        linkedin: "https://linkedin.com/in/anuragaffection"
      }
    }
  }
};

// Helper function to get all articles as a list
export const getAllArticles = (): ArticleDetail[] => {
  return Object.values(articleDetails);
};

// Helper function to get article by ID or slug
export const getArticleByIdOrSlug = (identifier: string): ArticleDetail | null => {
  // Try by ID first
  if (articleDetails[identifier]) {
    return articleDetails[identifier];
  }
  
  // Try by slug
  const bySlug = Object.values(articleDetails).find(a => a.slug === identifier);
  return bySlug || null;
};

// Get adjacent articles for navigation
export const getAdjacentArticles = (currentId: string): { prev: ArticleDetail | null; next: ArticleDetail | null } => {
  const allArticles = getAllArticles().sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
  
  const currentIndex = allArticles.findIndex(a => a.id === currentId);
  
  return {
    prev: currentIndex > 0 ? allArticles[currentIndex - 1] : null,
    next: currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
  };
};

// Get related articles (same category or overlapping tags)
export const getRelatedArticles = (currentId: string, limit = 3): ArticleDetail[] => {
  const current = articleDetails[currentId];
  if (!current) return [];
  
  const allOthers = getAllArticles().filter(a => a.id !== currentId);
  
  // Score by category match and tag overlap
  const scored = allOthers.map(article => {
    let score = 0;
    if (article.category === current.category) score += 2;
    score += article.tags.filter(t => current.tags.includes(t)).length;
    return { article, score };
  });
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.article);
};
