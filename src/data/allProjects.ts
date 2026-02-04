export interface Project {
  title: string;
  description: string;
  category: "web" | "ai" | "blockchain" | "dev-tools" | "desktop" | "mobile" | "other";
  technologies: string[];
  github: string;
  demo: string;
  preview: string;
}

export const allProjects: Project[] = [
  // Featured Projects
  {
    title: "Real-Time Digital Signage System",
    description: "Enterprise-grade digital signage platform with offline-first Electron players, real-time device telemetry, and React-based CMS.",
    category: "desktop",
    technologies: ["React", "Electron.js", "TypeScript", "Fastify", "PostgreSQL", "Socket.IO"],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "University Online Exam Software",
    description: "Scalable examination platform serving 5,000+ users with admin and student portals.",
    category: "web",
    technologies: ["React", "React Native", "Node.js", "PostgreSQL", "Memcached"],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  },
  {
    title: "VidChat",
    description: "Real-time video calling application with peer-to-peer connections, screen sharing, and chat functionality.",
    category: "web",
    technologies: ["React", "WebRTC", "Socket.IO", "Node.js"],
    github: "https://github.com/anuragkmr45/VidChat",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&h=400&fit=crop",
  },
  {
    title: "Magic Notes",
    description: "Open-source note-taking app for students with collaboration tools and 18+ contributors.",
    category: "web",
    technologies: ["React", "TypeScript", "Firebase"],
    github: "https://github.com/anuragkmr45/magic-notes",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop",
  },
  // Dev Tools / NPM Packages
  {
    title: "@anuragkmr_45/encrypt-decrypt",
    description: "Lightweight AES-256-GCM encryption/decryption utility with secure defaults for Node.js applications.",
    category: "dev-tools",
    technologies: ["Node.js", "TypeScript", "crypto"],
    github: "https://github.com/anuragkmr45/encrypt-decrypt",
    demo: "https://www.npmjs.com/package/@anuragkmr_45/encrypt-decrypt",
    preview: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
  },
  {
    title: "rate-limiter-utils",
    description: "Type-safe NPM package for managing API request limits with flexible rate limiting strategies.",
    category: "dev-tools",
    technologies: ["Node.js", "TypeScript"],
    github: "https://github.com/anuragkmr45/rate-limiter-utils",
    demo: "https://www.npmjs.com/package/rate-limiter-utils",
    preview: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
  // Other Projects
  {
    title: "ToDo List Manager",
    description: "Full-stack MERN-based task management application with user authentication and real-time updates.",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/anuragkmr45/todo-list",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
  },
  {
    title: "NIRF Rank Monitor",
    description: "Monitoring tool for tracking NIRF rankings of educational institutions over time.",
    category: "web",
    technologies: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/anuragkmr45/nirf-rank-monitor",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  // AI Projects (placeholder)
  {
    title: "AI Chat Assistant",
    description: "Experimental chatbot powered by LLM APIs with context-aware responses and memory.",
    category: "ai",
    technologies: ["React", "OpenAI API", "Node.js", "TypeScript"],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  // Blockchain (placeholder)
  {
    title: "Web3 Wallet Connect",
    description: "Decentralized wallet connection interface supporting multiple blockchain networks.",
    category: "blockchain",
    technologies: ["React", "ethers.js", "TypeScript", "Solidity"],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
  },
  // Mobile (placeholder)
  {
    title: "Expense Tracker App",
    description: "Cross-platform mobile app for tracking personal expenses with offline sync.",
    category: "mobile",
    technologies: ["React Native", "Redux", "Firebase", "TypeScript"],
    github: "#",
    demo: "#",
    preview: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
  },
];
