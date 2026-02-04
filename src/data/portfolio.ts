export const personalInfo = {
  name: "Anurag Kumar",
  role: "Engineer",
  tagline: "I build secure, performant, and delightful digital products.",
  email: "anuragkmr45@gmail.com",
  github: "https://github.com/anuragkmr45",
  linkedin: "https://www.linkedin.com/in/anuragkmr45",
  twitter: "https://twitter.com/anuragkmr_45",
  location: "Bangalore, India",
};

export const aboutText = [
  "I'm a full-stack and mobile engineer passionate about building products that are secure, fast, and genuinely useful. My journey started with a curiosity about how systems work under the hood, which evolved into a deep interest in real-time applications, offline-first architectures, and developer tooling.",
  "Currently, I'm working as a Founding Engineer at Hexmon Technology, where I architect and build enterprise-grade systems using Next.js, TypeScript, and PostgreSQL. I focus heavily on security—from rate limiting and CSRF protection to role-based access control and cryptographic implementations.",
  "When I'm not coding, I'm probably exploring new AI tools, contributing to open-source projects, or tinkering with system design patterns. I believe in building things that scale gracefully and fail safely.",
];

export const experience = [
  {
    period: "2024 — Present",
    title: "Founding Engineer",
    company: "Hexmon Technology",
    location: "Hyderabad",
    description: "Building and launching secure enterprise systems from the ground up.",
    bullets: [
      "Architected and launched a comprehensive Student Information System (SIS) using Next.js 15, TypeScript, Redux Toolkit, TanStack Query, Drizzle ORM, and PostgreSQL",
      "Implemented robust API security with Upstash Redis rate limiting, CSRF token validation, Argon2 password hashing, JWT authentication, and granular RBAC",
      "Built comprehensive API test suites using Vitest with mocked JWTs and database queries",
      "Designed and implemented real-time features using WebSockets and efficient caching strategies",
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Drizzle ORM", "Vitest"],
    url: "#",
  },
  {
    period: "2024",
    title: "Software Developer Intern",
    company: "CARS24",
    location: "Bangalore",
    description: "Contributing to C2C marketplace platforms serving millions of users.",
    bullets: [
      "Developed C2C Classified Sell & Buy journeys on consumer and CRM platforms using React.js, Next.js, and Redux Toolkit",
      "Integrated complex API flows and admin features (DSA, DAP) within a monorepo Nx Workspace architecture",
      "Enhanced real-time chat, wallet, and notification systems across the Dealer App ecosystem",
      "Collaborated with cross-functional teams to ship features impacting user experience at scale",
    ],
    technologies: ["React", "Next.js", "Redux Toolkit", "TypeScript", "Nx"],
    url: "https://www.cars24.com",
  },
  {
    period: "2023 — 2024",
    title: "Full-Stack Mobile App Developer",
    company: "UDBHA",
    location: "Hyderabad",
    description: "Building high-performance mobile applications with secure data handling.",
    bullets: [
      "Optimized app performance to achieve consistent 60 FPS using React.js and Redux state management",
      "Implemented Firebase integration with AES-256 encryption for secure in-app data protection",
      "Built reusable component libraries improving development velocity across the team",
    ],
    technologies: ["React Native", "Redux", "Firebase", "AES-256"],
    url: "#",
  },
];

export const projects = [
  {
    title: "Real-Time Digital Signage System",
    description: "An enterprise-grade digital signage platform featuring offline-first Electron players, real-time device telemetry, and a React-based CMS. Built with security and scale in mind—mTLS device authentication, ECDSA certificate validation, and job queues for reliable content delivery.",
    role: "Lead Developer",
    technologies: ["React", "Electron.js", "TypeScript", "Fastify", "PostgreSQL", "Drizzle ORM", "MinIO", "Socket.IO", "Prometheus"],
    highlights: [
      "Offline-first architecture with SQLite caching and resumable downloads",
      "Real-time telemetry via WebSockets with Prometheus metrics",
      "mTLS-secured device APIs with ECDSA certificate authentication",
      "CMS with SSO, audit logs, and role-based permissions",
    ],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    title: "University Online Exam Software",
    description: "A scalable examination platform serving 5,000+ users with admin and student portals. Implemented performance optimizations including debouncing, throttling, and efficient state management to handle concurrent exam sessions.",
    role: "Full-Stack Developer",
    technologies: ["React", "React Native", "Node.js", "PostgreSQL", "Memcached", "TypeScript"],
    highlights: [
      "Served 5,000+ concurrent users during peak exam periods",
      "Built both web and mobile interfaces for students",
      "Implemented caching layer with Memcached for optimal performance",
    ],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    featured: true,
  },
  {
    title: "VidChat",
    description: "A real-time video calling application with peer-to-peer connections, screen sharing, and chat functionality. Built to understand WebRTC and real-time communication protocols.",
    role: "Solo Developer",
    technologies: ["React", "WebRTC", "Socket.IO", "Node.js"],
    highlights: [
      "Peer-to-peer video connections using WebRTC",
      "Real-time signaling server with Socket.IO",
      "Screen sharing and text chat features",
    ],
    github: "https://github.com/anuragkmr45/VidChat",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&h=400&fit=crop",
    featured: false,
  },
  {
    title: "Magic Notes",
    description: "An open-source note-taking app designed for students, featuring collaboration tools and community contributions. Maintained with 18+ contributors under the Octohub organization.",
    role: "Maintainer",
    technologies: ["React", "TypeScript", "Firebase"],
    highlights: [
      "Open-source with 18+ unique contributors",
      "Built for student productivity and collaboration",
      "Community-driven feature development",
    ],
    github: "https://github.com/anuragkmr45/magic-notes",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop",
    featured: false,
  },
];

export const npmPackages = [
  {
    name: "@anuragkmr_45/encrypt-decrypt",
    description: "A lightweight AES-256-GCM encryption/decryption utility with secure defaults. Simplifies cryptographic operations for Node.js applications.",
    downloads: "200+ avg/month",
    technologies: ["Node.js", "TypeScript", "crypto"],
    npm: "https://www.npmjs.com/package/@anuragkmr_45/encrypt-decrypt",
    github: "https://github.com/anuragkmr45/encrypt-decrypt",
  },
  {
    name: "rate-limiter-utils",
    description: "Type-safe NPM package for managing API request limits. Provides flexible rate limiting strategies for Node.js backends.",
    downloads: "Active",
    technologies: ["Node.js", "TypeScript"],
    npm: "https://www.npmjs.com/package/rate-limiter-utils",
    github: "https://github.com/anuragkmr45/rate-limiter-utils",
  },
];

export const skills = {
  "Frontend & Mobile": [
    "React.js",
    "Next.js",
    "React Native",
    "TypeScript",
    "Redux Toolkit",
    "TanStack Query",
    "Tailwind CSS",
  ],
  "Backend & APIs": [
    "Node.js",
    "Fastify",
    "Express",
    "REST APIs",
    "WebSockets",
    "JWT Auth",
    "RBAC",
  ],
  "Databases & Infra": [
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "Redis",
    "Drizzle ORM",
    "Firebase",
    "MinIO/S3",
  ],
  "DevOps & Testing": [
    "Docker",
    "Git",
    "GitHub Actions",
    "Vitest",
    "Prometheus",
  ],
  "GenAI & Exploration": [
    "LLM APIs",
    "AI-powered features",
    "Prompt Engineering",
  ],
};

export const achievements = [
  {
    title: "Open Source Leadership",
    description: "Maintain an active open-source repository under Octohub with 18+ unique contributors",
    icon: "code",
  },
  {
    title: "Codeutsav 7.0 (2023)",
    description: "Led a 4-member team to Top 5 finish across 10+ participating colleges",
    icon: "trophy",
  },
  {
    title: "Hackwar 3.0 Illuminate (2022)",
    description: "Achieved Top 10 ranking out of 30 competing teams",
    icon: "award",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "Institute of Technical Education and Research, SOA",
    location: "Odisha",
    period: "2021 — 2025",
  },
  {
    degree: "Class 12 (Science)",
    institution: "Kendriya Vidyalaya",
    location: "Noida",
    period: "CBSE",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writings", href: "#writings" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
