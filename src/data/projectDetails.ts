export interface ProjectSection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
}

export interface ProjectLinks {
  liveDemo?: string;
  github?: string;
  caseStudy?: string;
  paperPdfUrl?: string;
}

export interface ProjectQuickFacts {
  role: string;
  timeline: string;
  teamSize: string;
  platform: string;
  techStack: string[];
  tags: string[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: "web" | "ai" | "blockchain" | "dev-tools" | "desktop" | "mobile" | "other";
  status: "live" | "in-progress" | "archived";
  coverImage: string;
  quickFacts: ProjectQuickFacts;
  links: ProjectLinks;
  tldr: string[];
  sections: {
    problemAndGoal: ProjectSection;
    solution: ProjectSection;
    myContribution: ProjectSection;
    process: ProjectSection;
    technicalDetails?: ProjectSection;
    challengesAndSolutions: ProjectSection;
    resultsAndImpact: ProjectSection;
    learningsAndNextSteps: ProjectSection;
  };
  galleryImages?: GalleryImage[];
}

// Comprehensive project details data
export const projectDetails: Record<string, ProjectDetail> = {
  "real-time-digital-signage-system": {
    slug: "real-time-digital-signage-system",
    title: "Real-Time Digital Signage System",
    subtitle: "Enterprise-grade digital signage platform with offline-first architecture",
    summary: "A comprehensive digital signage solution featuring Electron-based players with offline capabilities, real-time device telemetry, and a React-based content management system.",
    category: "desktop",
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Lead Full-Stack Engineer",
      timeline: "8 months",
      teamSize: "5 Engineers",
      platform: "Desktop (Electron) + Web",
      techStack: ["React", "Electron.js", "TypeScript", "Fastify", "PostgreSQL", "Socket.IO", "Redis"],
      tags: ["Enterprise", "Real-time", "Offline-first", "IoT"],
    },
    links: {
      liveDemo: "https://signage-demo.example.com",
      github: "https://github.com/example/digital-signage",
      caseStudy: "/case-study/cs3",
    },
    tldr: [
      "Built offline-first Electron players that sync seamlessly when online",
      "Implemented real-time telemetry for 10,000+ devices",
      "Developed React CMS with drag-and-drop content scheduling",
      "Achieved 99.9% uptime with automatic failover mechanisms",
      "Reduced content deployment time from hours to minutes",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "Businesses needed a reliable way to manage digital displays across multiple locations without constant internet connectivity. Existing solutions were expensive, unreliable, and lacked real-time monitoring capabilities.",
        bullets: [
          "Existing solutions required constant internet connectivity",
          "No visibility into device health across locations",
          "Content updates took hours to propagate",
          "High licensing costs for enterprise features",
          "Poor handling of network interruptions",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "We built a complete digital signage ecosystem with intelligent offline-first players and a powerful cloud-based management platform.",
        bullets: [
          "Electron-based player app with SQLite for offline content storage",
          "Resumable downloads for large media files",
          "Real-time WebSocket connection for instant updates",
          "React CMS with visual content scheduling",
          "Prometheus-based monitoring with custom dashboards",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "As the lead full-stack engineer, I architected the core system and led the development of critical components.",
        bullets: [
          "Designed the offline-first architecture and sync protocol",
          "Built the Electron player application from scratch",
          "Implemented the real-time telemetry pipeline",
          "Developed the content scheduling algorithm",
          "Led code reviews and mentored junior developers",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "We followed an iterative development process with continuous feedback from pilot customers.",
        bullets: [
          "Phase 1: Research and architecture design (4 weeks)",
          "Phase 2: Core player development with offline support (8 weeks)",
          "Phase 3: CMS and scheduling system (6 weeks)",
          "Phase 4: Telemetry and monitoring (4 weeks)",
          "Phase 5: Beta testing with pilot customers (6 weeks)",
          "Phase 6: Production launch and iteration (ongoing)",
        ],
      },
      technicalDetails: {
        id: "technical-details",
        title: "Technical Details",
        content: "The system uses a microservices architecture with clear separation of concerns.",
        bullets: [
          "Electron + React for cross-platform player application",
          "Fastify backend with horizontal scaling on AWS ECS",
          "PostgreSQL for persistent storage with read replicas",
          "Redis for caching and pub/sub messaging",
          "Socket.IO cluster for real-time communication",
          "Custom binary protocol for efficient telemetry data",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "Building a reliable offline-first system presented unique technical challenges.",
        bullets: [
          "Challenge: Handling large video files on slow networks → Solution: Implemented chunked resumable downloads with integrity verification",
          "Challenge: Sync conflicts between offline changes → Solution: Designed conflict resolution with server-wins strategy",
          "Challenge: Memory leaks in long-running Electron app → Solution: Implemented aggressive garbage collection and resource monitoring",
          "Challenge: Scaling WebSocket to 10k+ connections → Solution: Deployed Socket.IO cluster with sticky sessions",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "The platform has been successfully deployed across multiple enterprise customers.",
        bullets: [
          "10,000+ active devices monitored in real-time",
          "99.9% system uptime maintained",
          "Content deployment time reduced from 4 hours to 5 minutes",
          "50% reduction in support tickets due to proactive monitoring",
          "Successfully handled 1M+ media files delivery per month",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "This project reinforced the importance of designing for failure and monitoring.",
        bullets: [
          "Offline-first should be the default for distributed systems",
          "Comprehensive telemetry is crucial for enterprise products",
          "Early beta testing with real customers saves development time",
          "Next: Implement AI-powered content recommendations",
          "Next: Add support for interactive touch displays",
        ],
      },
    },
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        alt: "System Dashboard",
        caption: "Real-time monitoring dashboard showing device fleet status",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        alt: "Content Scheduler",
        caption: "Visual drag-and-drop content scheduling interface",
      },
      {
        src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        alt: "Analytics View",
        caption: "Content performance analytics and insights",
      },
    ],
  },
  "university-online-exam-software": {
    slug: "university-online-exam-software",
    title: "University Online Exam Software",
    subtitle: "Scalable examination platform for educational institutions",
    summary: "A comprehensive online examination system serving 5,000+ concurrent users with separate admin and student portals, advanced security features, and real-time proctoring capabilities.",
    category: "web",
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Lead Backend Engineer",
      timeline: "6 months",
      teamSize: "4 Engineers, 1 PM",
      platform: "Web + Mobile (React Native)",
      techStack: ["React", "React Native", "Node.js", "PostgreSQL", "Memcached", "Redis"],
      tags: ["Education", "Scalability", "Security", "Real-time"],
    },
    links: {
      liveDemo: "https://exam-platform-demo.example.com",
      caseStudy: "/case-study/cs1",
    },
    tldr: [
      "Supports 5,000+ concurrent exam sessions",
      "Sub-100ms response times during peak load",
      "Zero downtime during 3 consecutive exam seasons",
      "Advanced anti-cheating measures implemented",
      "Auto-save prevents data loss on disconnection",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "The university's existing exam system couldn't handle the growing student population and frequently crashed during peak exam periods.",
        bullets: [
          "Legacy system crashed at 500+ concurrent users",
          "Students lost exam progress due to no auto-save",
          "No proctoring or anti-cheating measures",
          "Manual grading was time-consuming",
          "Poor mobile experience for students",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "Built a modern, scalable exam platform with comprehensive features for both administrators and students.",
        bullets: [
          "Horizontally scalable architecture on AWS",
          "Real-time auto-save with offline recovery",
          "AI-powered proctoring with browser lockdown",
          "Automated grading for objective questions",
          "Cross-platform mobile app for students",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "Led the backend architecture and optimization efforts.",
        bullets: [
          "Designed scalable microservices architecture",
          "Implemented connection pooling and caching layer",
          "Built real-time exam state synchronization",
          "Optimized database queries for performance",
          "Set up CI/CD pipeline and monitoring",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "Followed agile methodology with bi-weekly sprints and continuous stakeholder feedback.",
        bullets: [
          "Discovery phase: Stakeholder interviews and requirements gathering",
          "Architecture design with scalability focus",
          "Parallel frontend and backend development",
          "Load testing at each milestone",
          "Phased rollout starting with pilot departments",
        ],
      },
      technicalDetails: {
        id: "technical-details",
        title: "Technical Details",
        content: "The platform uses a robust microservices architecture optimized for high concurrency.",
        bullets: [
          "Node.js backend with Fastify for high throughput",
          "PostgreSQL with read replicas for query distribution",
          "Memcached for session and exam state caching",
          "WebSocket for real-time exam synchronization",
          "React + React Native sharing business logic",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "Handling thousands of concurrent exam submissions required careful optimization.",
        bullets: [
          "Challenge: Database connection exhaustion → Solution: PgBouncer connection pooling",
          "Challenge: Real-time sync at scale → Solution: Redis pub/sub with WebSocket clusters",
          "Challenge: Exam data integrity → Solution: Atomic transactions with optimistic locking",
          "Challenge: Network interruptions → Solution: Client-side queue with resumable sync",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "The platform has transformed the university's examination process.",
        bullets: [
          "5,200 peak concurrent users handled successfully",
          "Response time improved from 2s to 80ms",
          "Zero system crashes during exam seasons",
          "40% reduction in infrastructure costs",
          "95% student satisfaction score",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "Key insights from building a high-stakes educational platform.",
        bullets: [
          "Load testing early prevents production disasters",
          "Caching strategy is crucial for read-heavy workloads",
          "Next: Implement AI-powered answer evaluation",
          "Next: Add support for multimedia exam questions",
        ],
      },
    },
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        alt: "Student Exam Interface",
        caption: "Clean, distraction-free exam-taking interface for students",
      },
      {
        src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
        alt: "Admin Dashboard",
        caption: "Comprehensive admin dashboard for exam management",
      },
    ],
  },
  "vidchat": {
    slug: "vidchat",
    title: "VidChat",
    subtitle: "Real-time video calling with WebRTC",
    summary: "A peer-to-peer video calling application featuring screen sharing, text chat, and room-based communication powered by WebRTC and Socket.IO.",
    category: "web",
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Solo Developer",
      timeline: "3 weeks",
      teamSize: "1",
      platform: "Web",
      techStack: ["React", "WebRTC", "Socket.IO", "Node.js", "TypeScript"],
      tags: ["Real-time", "WebRTC", "Video", "Open Source"],
    },
    links: {
      liveDemo: "https://vidchat-demo.example.com",
      github: "https://github.com/anuragkmr45/VidChat",
    },
    tldr: [
      "Peer-to-peer video calling with no server relay",
      "Screen sharing and text chat functionality",
      "Room-based connections with shareable links",
      "Automatic ICE candidate gathering for NAT traversal",
      "Responsive design for mobile and desktop",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "Wanted to learn WebRTC by building a practical application that demonstrates real-time communication capabilities.",
        bullets: [
          "Learn WebRTC protocol and signaling",
          "Understand NAT traversal challenges",
          "Build a functional video chat product",
          "Practice Socket.IO for signaling server",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "Built a complete video chat application with modern features.",
        bullets: [
          "WebRTC for peer-to-peer video/audio",
          "Socket.IO signaling server for connection establishment",
          "Screen sharing using getDisplayMedia API",
          "Text chat channel using WebRTC data channels",
          "Room system for easy sharing",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "Designed and built the entire application as a learning project.",
        bullets: [
          "Full application architecture and implementation",
          "WebRTC connection handling and ICE management",
          "UI/UX design with responsive layout",
          "Deployment and documentation",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "Iterative development with focus on core functionality first.",
        bullets: [
          "Week 1: Research WebRTC, build basic video connection",
          "Week 2: Add screen sharing and chat features",
          "Week 3: Polish UI, handle edge cases, deploy",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "WebRTC has several gotchas that required careful handling.",
        bullets: [
          "Challenge: NAT traversal failures → Solution: Multiple STUN/TURN servers",
          "Challenge: Browser compatibility → Solution: Adapter.js polyfill",
          "Challenge: Reconnection on network change → Solution: ICE restart mechanism",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "Successfully built a functional video chat application.",
        bullets: [
          "Open-sourced with detailed documentation",
          "Featured in WebRTC tutorial discussions",
          "Personal learning milestone achieved",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "Deep understanding of real-time communication protocols.",
        bullets: [
          "WebRTC is powerful but complex to debug",
          "Signaling server design is crucial",
          "Next: Add recording feature",
          "Next: Implement SFU for group calls",
        ],
      },
    },
  },
  "magic-notes": {
    slug: "magic-notes",
    title: "Magic Notes",
    subtitle: "Collaborative note-taking for students",
    summary: "Open-source note-taking application designed for students with real-time collaboration, rich text editing, and cross-device sync.",
    category: "web",
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Project Lead & Maintainer",
      timeline: "Ongoing (4+ months)",
      teamSize: "18+ contributors",
      platform: "Web",
      techStack: ["React", "TypeScript", "Firebase", "TipTap"],
      tags: ["Open Source", "Education", "Collaboration"],
    },
    links: {
      liveDemo: "https://magic-notes-demo.example.com",
      github: "https://github.com/anuragkmr45/magic-notes",
    },
    tldr: [
      "Open-source project with 18+ contributors",
      "Real-time collaboration using Firebase",
      "Rich text editor with markdown support",
      "Organized folder structure for courses",
      "Offline support with sync on reconnect",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "Students needed a collaborative note-taking tool optimized for academic use.",
        bullets: [
          "Existing tools too complex for quick notes",
          "No academic-focused organization",
          "Expensive for student budgets",
          "Poor collaboration features",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "Built an open-source, student-focused note-taking platform.",
        bullets: [
          "Simple, clean interface for distraction-free note-taking",
          "Course and semester-based organization",
          "Real-time collaboration for study groups",
          "Completely free and open source",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "Leading the project as creator and maintainer.",
        bullets: [
          "Initial architecture and core development",
          "Managing contributors and code reviews",
          "Roadmap planning and feature prioritization",
          "Community building and documentation",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "Open-source development with community involvement.",
        bullets: [
          "Initial MVP development (solo)",
          "Open-sourced and attracted contributors",
          "Regular releases with community input",
          "Hacktoberfest participation for growth",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "Managing an open-source project has unique challenges.",
        bullets: [
          "Challenge: Varying contributor skill levels → Solution: Good-first-issue labels and mentoring",
          "Challenge: Feature creep → Solution: Clear roadmap and scope definition",
          "Challenge: Conflict resolution → Solution: Operational transforms for real-time edits",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "Growing community and active usage.",
        bullets: [
          "18+ contributors from around the world",
          "500+ GitHub stars",
          "Active user community on Discord",
          "Featured in student tech showcases",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "Open-source leadership teaches valuable skills.",
        bullets: [
          "Community management is as important as code",
          "Documentation reduces contributor friction",
          "Next: Add AI-powered summarization",
          "Next: Mobile app development",
        ],
      },
    },
  },
  "encrypt-decrypt": {
    slug: "encrypt-decrypt",
    title: "@anuragkmr_45/encrypt-decrypt",
    subtitle: "Lightweight encryption utility for Node.js",
    summary: "A npm package providing simple AES-256-GCM encryption and decryption with secure defaults, perfect for protecting sensitive data in Node.js applications.",
    category: "dev-tools",
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Solo Developer",
      timeline: "2 weeks",
      teamSize: "1",
      platform: "Node.js",
      techStack: ["Node.js", "TypeScript", "crypto"],
      tags: ["NPM Package", "Security", "Encryption"],
    },
    links: {
      liveDemo: "https://www.npmjs.com/package/@anuragkmr_45/encrypt-decrypt",
      github: "https://github.com/anuragkmr45/encrypt-decrypt",
      paperPdfUrl: "/papers/encryption-best-practices.pdf",
    },
    tldr: [
      "AES-256-GCM encryption with authenticated encryption",
      "Secure key derivation using PBKDF2",
      "Simple API for encrypt/decrypt operations",
      "TypeScript support with full type definitions",
      "Zero external dependencies",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "Many developers implement encryption incorrectly, leading to security vulnerabilities.",
        bullets: [
          "Common mistakes in encryption implementation",
          "Lack of authenticated encryption",
          "Poor key management practices",
          "Complex APIs in existing libraries",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "Created a simple, secure-by-default encryption utility.",
        bullets: [
          "AES-256-GCM for authenticated encryption",
          "Automatic IV generation for each encryption",
          "PBKDF2 for key derivation from passwords",
          "Simple encrypt/decrypt API",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "Designed and built the entire package.",
        bullets: [
          "Cryptographic design and implementation",
          "TypeScript types and documentation",
          "NPM publishing and versioning",
          "Security review and testing",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "Security-focused development process.",
        bullets: [
          "Research cryptographic best practices",
          "Design simple API with secure defaults",
          "Implement with comprehensive testing",
          "Security review before publishing",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "Balancing simplicity with security.",
        bullets: [
          "Challenge: Making crypto accessible → Solution: Sensible defaults, clear docs",
          "Challenge: Preventing misuse → Solution: API design that's hard to misuse",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "Adopted by developers needing simple encryption.",
        bullets: [
          "500+ weekly downloads on npm",
          "Used in production applications",
          "Positive feedback on simplicity",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "Publishing npm packages teaches distribution skills.",
        bullets: [
          "API design is crucial for developer experience",
          "Good documentation drives adoption",
          "Next: Add streaming encryption support",
        ],
      },
    },
  },
  "rate-limiter-utils": {
    slug: "rate-limiter-utils",
    title: "rate-limiter-utils",
    subtitle: "Type-safe rate limiting for Node.js APIs",
    summary: "A flexible npm package for implementing rate limiting in Node.js applications with support for multiple strategies including sliding window and token bucket.",
    category: "dev-tools",
    status: "live",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Solo Developer",
      timeline: "2 weeks",
      teamSize: "1",
      platform: "Node.js",
      techStack: ["Node.js", "TypeScript", "Redis"],
      tags: ["NPM Package", "API", "Security"],
    },
    links: {
      liveDemo: "https://www.npmjs.com/package/rate-limiter-utils",
      github: "https://github.com/anuragkmr45/rate-limiter-utils",
    },
    tldr: [
      "Multiple rate limiting algorithms supported",
      "Redis backend for distributed systems",
      "TypeScript-first with full type safety",
      "Express middleware included",
      "Configurable per-route limits",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "APIs need protection from abuse, but implementing rate limiting correctly is complex.",
        bullets: [
          "DDoS and brute-force attack prevention",
          "Fair resource allocation among users",
          "Distributed rate limiting challenges",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "Built a flexible rate limiting library with multiple algorithms.",
        bullets: [
          "Sliding window for smooth rate limiting",
          "Token bucket for burst handling",
          "Redis adapter for distributed systems",
          "Express middleware for easy integration",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "Full design and implementation.",
        bullets: [
          "Algorithm research and implementation",
          "Redis integration for scaling",
          "TypeScript types and middleware",
          "Documentation and examples",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "Algorithm-focused development.",
        bullets: [
          "Research rate limiting algorithms",
          "Implement core algorithms with tests",
          "Add Redis adapter for production use",
          "Create Express middleware and docs",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "Distributed rate limiting has edge cases.",
        bullets: [
          "Challenge: Race conditions in Redis → Solution: Lua scripts for atomicity",
          "Challenge: Clock skew → Solution: Server-side timestamp only",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "Used to protect production APIs.",
        bullets: [
          "300+ weekly npm downloads",
          "Positive developer feedback",
          "Used in my own production projects",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "Distributed systems are complex.",
        bullets: [
          "Atomic operations are essential",
          "Next: Add more storage backends",
          "Next: Circuit breaker integration",
        ],
      },
    },
  },
  "ai-chat-assistant": {
    slug: "ai-chat-assistant",
    title: "AI Chat Assistant",
    subtitle: "Context-aware conversational AI",
    summary: "An experimental chatbot leveraging LLM APIs with conversation memory, context awareness, and customizable personalities.",
    category: "ai",
    status: "in-progress",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Solo Developer",
      timeline: "Ongoing",
      teamSize: "1",
      platform: "Web",
      techStack: ["React", "OpenAI API", "Node.js", "TypeScript", "Pinecone"],
      tags: ["AI", "LLM", "Experimental"],
    },
    links: {
      github: "https://github.com/example/ai-chat",
    },
    tldr: [
      "Integrates with OpenAI GPT models",
      "Conversation memory using vector database",
      "Customizable AI personalities",
      "RAG for domain-specific knowledge",
      "Streaming responses for better UX",
    ],
    sections: {
      problemAndGoal: {
        id: "problem-goal",
        title: "Problem & Goal",
        content: "Exploring practical applications of LLMs and building AI integration skills.",
        bullets: [
          "Learn LLM API integration patterns",
          "Experiment with RAG architectures",
          "Build reusable AI components",
        ],
      },
      solution: {
        id: "solution",
        title: "Solution",
        content: "Building a modular AI chat system with extensible architecture.",
        bullets: [
          "OpenAI API with streaming responses",
          "Pinecone for vector storage and retrieval",
          "Modular personality system",
          "Conversation context management",
        ],
      },
      myContribution: {
        id: "my-contribution",
        title: "My Contribution",
        content: "Full-stack development and experimentation.",
        bullets: [
          "Architecture design for AI integration",
          "Prompt engineering and optimization",
          "Vector search implementation",
          "UI/UX for chat interface",
        ],
      },
      process: {
        id: "process",
        title: "Process",
        content: "Experimental, research-driven development.",
        bullets: [
          "Started with basic chat integration",
          "Added memory and context features",
          "Experimenting with RAG patterns",
          "Continuous improvement based on testing",
        ],
      },
      challengesAndSolutions: {
        id: "challenges",
        title: "Challenges & Solutions",
        content: "AI integration has unique challenges.",
        bullets: [
          "Challenge: Token limits → Solution: Sliding context window",
          "Challenge: Response latency → Solution: Streaming API",
          "Challenge: Hallucinations → Solution: RAG with verified sources",
        ],
      },
      resultsAndImpact: {
        id: "results",
        title: "Results & Impact",
        content: "Learning project with practical applications.",
        bullets: [
          "Built reusable AI integration patterns",
          "Gained deep understanding of LLM capabilities",
          "Created components usable in future projects",
        ],
      },
      learningsAndNextSteps: {
        id: "learnings",
        title: "Learnings & Next Steps",
        content: "AI is powerful but requires careful engineering.",
        bullets: [
          "Prompt engineering is an art",
          "Context management is crucial",
          "Next: Add multi-modal support",
          "Next: Implement function calling",
        ],
      },
    },
  },
};

// Helper functions
export const getProjectBySlug = (slug: string): ProjectDetail | undefined => {
  return projectDetails[slug];
};

export const getAllProjectSlugs = (): string[] => {
  return Object.keys(projectDetails);
};

export const getAdjacentProjects = (
  currentSlug: string
): { prev: ProjectDetail | null; next: ProjectDetail | null } => {
  const slugs = getAllProjectSlugs();
  const currentIndex = slugs.indexOf(currentSlug);

  return {
    prev: currentIndex > 0 ? projectDetails[slugs[currentIndex - 1]] : null,
    next: currentIndex < slugs.length - 1 ? projectDetails[slugs[currentIndex + 1]] : null,
  };
};

export const getRelatedProjects = (
  currentSlug: string,
  limit: number = 3
): ProjectDetail[] => {
  const current = projectDetails[currentSlug];
  if (!current) return [];

  return Object.values(projectDetails)
    .filter((p) => p.slug !== currentSlug)
    .filter((p) => 
      p.category === current.category || 
      p.quickFacts.tags.some(tag => current.quickFacts.tags.includes(tag))
    )
    .slice(0, limit);
};

// Map from old title to new slug for linking
export const projectTitleToSlug: Record<string, string> = {
  "Real-Time Digital Signage System": "real-time-digital-signage-system",
  "University Online Exam Software": "university-online-exam-software",
  "VidChat": "vidchat",
  "Magic Notes": "magic-notes",
  "@anuragkmr_45/encrypt-decrypt": "encrypt-decrypt",
  "rate-limiter-utils": "rate-limiter-utils",
  "AI Chat Assistant": "ai-chat-assistant",
};
