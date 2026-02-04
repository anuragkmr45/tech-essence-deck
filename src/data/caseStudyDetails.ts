export interface KPI {
  label: string;
  value: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
}

export interface CaseStudyLinks {
  liveDemo?: string;
  github?: string;
  paperPdfUrl?: string;
}

export interface QuickFacts {
  role: string;
  timeline: string;
  team: string;
  toolsOrStack: string[];
  platform?: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseStudyDetail {
  id: string;
  type: "case-study";
  title: string;
  oneLineSummary: string;
  publishedDate?: string;
  tags: string[];
  coverImage?: string;
  quickFacts: QuickFacts;
  links: CaseStudyLinks;
  kpis: KPI[];
  tldr: {
    problem: string;
    solution: string;
    outcome: string;
  };
  sections: {
    challenge: CaseStudySection;
    goals: CaseStudySection;
    constraints?: CaseStudySection;
    approach: CaseStudySection;
    architectureOrDesign?: CaseStudySection;
    implementationHighlights: CaseStudySection;
    results: CaseStudySection;
    learnings: CaseStudySection;
    nextSteps?: CaseStudySection;
  };
  galleryImages?: GalleryImage[];
}

// Sample case study data - replace with real content
export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  cs1: {
    id: "cs1",
    type: "case-study",
    title: "Scaling a University Exam Platform to 5000+ Concurrent Users",
    oneLineSummary:
      "How we architected and optimized an online examination system to handle thousands of simultaneous exam sessions with zero downtime during peak periods.",
    publishedDate: "2024-11-10",
    tags: ["Scaling", "Performance", "PostgreSQL", "Caching", "Architecture"],
    coverImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Lead Backend Engineer",
      timeline: "6 months",
      team: "4 Engineers, 1 PM, 1 Designer",
      toolsOrStack: [
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS",
        "WebSockets",
      ],
      platform: "Web & Mobile",
    },
    links: {
      liveDemo: "https://exam-platform-demo.example.com",
      github: "https://github.com/example/exam-platform",
      paperPdfUrl: "/papers/exam-platform-architecture.pdf",
    },
    kpis: [
      { label: "Concurrent Users", value: "5,000+" },
      { label: "Response Time", value: "<100ms" },
      { label: "Uptime", value: "99.99%" },
      { label: "Exams Delivered", value: "50,000+" },
      { label: "Cost Reduction", value: "40%" },
    ],
    tldr: {
      problem:
        "The existing exam platform crashed during peak usage with just 500 concurrent users.",
      solution:
        "Redesigned the architecture with connection pooling, Redis caching, and horizontal scaling.",
      outcome:
        "Achieved 10x capacity improvement with 99.99% uptime and 40% cost reduction.",
    },
    sections: {
      challenge: {
        id: "challenge",
        title: "Challenge / Context",
        content:
          "The university's existing online examination system was struggling to handle the growing number of students. During peak exam periods, the system would frequently crash, leaving students unable to complete their exams and causing significant administrative overhead.",
        bullets: [
          "System crashed at 500+ concurrent users",
          "Database connection pool exhaustion",
          "No horizontal scaling capability",
          "Poor error handling and recovery",
          "Students losing exam progress on disconnection",
        ],
      },
      goals: {
        id: "goals",
        title: "Goals",
        content:
          "We needed to transform the platform to handle 10x the current load while maintaining a seamless user experience.",
        bullets: [
          "Support 5,000+ concurrent exam sessions",
          "Achieve sub-100ms response times",
          "Implement auto-save and recovery for exam progress",
          "Enable horizontal scaling for peak periods",
          "Reduce infrastructure costs through optimization",
        ],
      },
      constraints: {
        id: "constraints",
        title: "Constraints",
        content:
          "Working within the existing university infrastructure presented unique challenges.",
        bullets: [
          "Must integrate with existing student information system",
          "Limited budget for infrastructure upgrades",
          "Tight 6-month timeline before next exam season",
          "Cannot disrupt ongoing semester operations",
          "Must maintain backwards compatibility with existing APIs",
        ],
      },
      approach: {
        id: "approach",
        title: "Approach & Process",
        content:
          "We adopted an iterative approach, focusing on quick wins first while building towards the comprehensive solution.",
        bullets: [
          "Phase 1: Database optimization and connection pooling",
          "Phase 2: Implement Redis caching layer",
          "Phase 3: WebSocket-based real-time sync",
          "Phase 4: Horizontal scaling with load balancing",
          "Phase 5: Comprehensive monitoring and alerting",
        ],
      },
      architectureOrDesign: {
        id: "architecture",
        title: "Architecture & Design",
        content:
          "The new architecture follows a microservices pattern with clear separation of concerns. We introduced a Redis caching layer to reduce database load and implemented WebSocket connections for real-time exam state synchronization.",
        bullets: [
          "Microservices architecture with API Gateway",
          "Redis cluster for session and cache management",
          "PostgreSQL with read replicas for query distribution",
          "AWS Auto Scaling Groups for dynamic capacity",
          "WebSocket server cluster for real-time features",
        ],
      },
      implementationHighlights: {
        id: "implementation",
        title: "Implementation Highlights",
        content:
          "Several key technical decisions enabled us to achieve our performance targets.",
        bullets: [
          "Implemented connection pooling with PgBouncer reducing connections by 90%",
          "Built custom Redis-based exam state machine for atomic operations",
          "Developed WebSocket reconnection logic with exponential backoff",
          "Created database query analyzer for identifying slow queries",
          "Implemented circuit breaker pattern for external service calls",
        ],
      },
      results: {
        id: "results",
        title: "Results & Impact",
        content:
          "The optimized platform exceeded all performance targets and has successfully handled multiple exam seasons.",
        bullets: [
          "Successfully supported 5,200 concurrent users during peak",
          "Average response time reduced from 2s to 80ms",
          "Zero downtime during 3 consecutive exam seasons",
          "40% reduction in infrastructure costs",
          "Student satisfaction scores improved by 35%",
        ],
      },
      learnings: {
        id: "learnings",
        title: "Key Learnings",
        content:
          "This project reinforced several important engineering principles and taught us new approaches.",
        bullets: [
          "Load testing early and often prevents surprises",
          "Caching strategy must consider invalidation complexity",
          "WebSocket scaling requires careful state management",
          "Database optimization often yields the biggest gains",
          "Monitoring is not optional for production systems",
        ],
      },
      nextSteps: {
        id: "next-steps",
        title: "Next Steps",
        content:
          "We continue to evolve the platform based on user feedback and emerging requirements.",
        bullets: [
          "Implement AI-powered proctoring features",
          "Add support for multimedia exam questions",
          "Explore edge caching for global deployment",
          "Build analytics dashboard for exam insights",
          "Investigate serverless options for cost optimization",
        ],
      },
    },
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        alt: "System Architecture Diagram",
        caption: "High-level system architecture showing microservices layout",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        alt: "Performance Dashboard",
        caption: "Real-time monitoring dashboard showing system metrics",
      },
      {
        src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        alt: "Load Testing Results",
        caption: "Load testing results showing sustained performance under load",
      },
    ],
  },
  cs2: {
    id: "cs2",
    type: "case-study",
    title: "Building a Secure Student Information System from Scratch",
    oneLineSummary:
      "A deep dive into architecting an enterprise SIS with comprehensive security measures including RBAC, audit logging, and encrypted data handling.",
    publishedDate: "2024-10-25",
    tags: ["Enterprise", "Security", "Next.js", "PostgreSQL", "RBAC"],
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Full-Stack Lead",
      timeline: "8 months",
      team: "6 Engineers, 2 PMs, 2 Designers",
      toolsOrStack: [
        "Next.js",
        "PostgreSQL",
        "Prisma",
        "AWS",
        "OAuth 2.0",
        "TypeScript",
      ],
      platform: "Web Application",
    },
    links: {
      github: "https://github.com/example/student-info-system",
    },
    kpis: [
      { label: "Active Users", value: "10,000+" },
      { label: "Data Records", value: "2M+" },
      { label: "Security Score", value: "A+" },
      { label: "API Endpoints", value: "150+" },
    ],
    tldr: {
      problem:
        "The institution needed a modern SIS with enterprise-grade security and compliance.",
      solution:
        "Built a ground-up system with RBAC, encryption, and comprehensive audit trails.",
      outcome:
        "Deployed secure SIS handling 10,000+ users with zero security incidents.",
    },
    sections: {
      challenge: {
        id: "challenge",
        title: "Challenge / Context",
        content:
          "The institution's legacy student information system was outdated, difficult to maintain, and lacked modern security features required for handling sensitive student data.",
        bullets: [
          "Legacy system built on outdated technology stack",
          "No role-based access control",
          "Missing audit logging for compliance",
          "Sensitive data stored in plain text",
          "Poor API design making integrations difficult",
        ],
      },
      goals: {
        id: "goals",
        title: "Goals",
        content:
          "Create a modern, secure, and extensible student information system.",
        bullets: [
          "Implement comprehensive RBAC with fine-grained permissions",
          "Encrypt all sensitive data at rest and in transit",
          "Build complete audit trail for compliance",
          "Design RESTful API for third-party integrations",
          "Ensure FERPA and institutional compliance",
        ],
      },
      approach: {
        id: "approach",
        title: "Approach & Process",
        content:
          "We followed a security-first development approach with regular security audits.",
        bullets: [
          "Conducted threat modeling sessions",
          "Implemented security controls at every layer",
          "Regular penetration testing throughout development",
          "Continuous integration with security scanning",
          "Phased rollout with extensive user training",
        ],
      },
      implementationHighlights: {
        id: "implementation",
        title: "Implementation Highlights",
        content:
          "Key security features that made the system enterprise-ready.",
        bullets: [
          "Custom RBAC engine with hierarchical role inheritance",
          "AES-256 encryption for PII data",
          "Immutable audit log with cryptographic verification",
          "OAuth 2.0 with PKCE for authentication",
          "Rate limiting and DDoS protection at API gateway",
        ],
      },
      results: {
        id: "results",
        title: "Results & Impact",
        content:
          "The system has been running in production for over a year with excellent security posture.",
        bullets: [
          "Zero security incidents since launch",
          "Passed three external security audits",
          "Full FERPA compliance achieved",
          "95% user adoption within first semester",
          "Reduced administrative workload by 60%",
        ],
      },
      learnings: {
        id: "learnings",
        title: "Key Learnings",
        content:
          "Security must be built in from the start, not added later.",
        bullets: [
          "Threat modeling early saves significant rework",
          "User experience and security can coexist",
          "Audit logging has debugging benefits too",
          "Regular security training for the team is essential",
          "Automated security testing catches issues early",
        ],
      },
    },
    galleryImages: [
      {
        src: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=600&fit=crop",
        alt: "Security Architecture",
        caption: "Multi-layered security architecture diagram",
      },
      {
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
        alt: "Admin Dashboard",
        caption: "Role-based admin dashboard interface",
      },
    ],
  },
  cs3: {
    id: "cs3",
    type: "case-study",
    title: "Implementing Real-time Device Telemetry at Scale",
    oneLineSummary:
      "How we built a robust telemetry system using WebSockets and Prometheus to monitor thousands of digital signage devices in real-time.",
    publishedDate: "2024-09-05",
    tags: ["IoT", "WebSockets", "Prometheus", "Monitoring", "Real-time"],
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Backend Engineer",
      timeline: "4 months",
      team: "3 Engineers, 1 DevOps",
      toolsOrStack: [
        "Go",
        "WebSockets",
        "Prometheus",
        "Grafana",
        "InfluxDB",
        "Kubernetes",
      ],
      platform: "IoT / Backend",
    },
    links: {
      liveDemo: "https://telemetry-demo.example.com",
    },
    kpis: [
      { label: "Devices Monitored", value: "10,000+" },
      { label: "Data Points/sec", value: "50,000" },
      { label: "Alert Latency", value: "<5s" },
      { label: "Data Retention", value: "90 days" },
    ],
    tldr: {
      problem:
        "No visibility into device health across thousands of distributed signage displays.",
      solution:
        "Built real-time telemetry pipeline with WebSockets, time-series database, and alerting.",
      outcome:
        "Achieved full observability with 5-second alert latency and 99.9% data capture rate.",
    },
    sections: {
      challenge: {
        id: "challenge",
        title: "Challenge / Context",
        content:
          "Managing thousands of digital signage devices across multiple locations without real-time visibility into their health and performance.",
        bullets: [
          "No centralized monitoring for device fleet",
          "Issues discovered only when customers complained",
          "Manual checking of devices was time-consuming",
          "No historical data for trend analysis",
          "Difficult to predict and prevent failures",
        ],
      },
      goals: {
        id: "goals",
        title: "Goals",
        content:
          "Build a comprehensive telemetry system providing real-time insights.",
        bullets: [
          "Real-time monitoring of all devices",
          "Sub-10 second alert latency",
          "Historical data retention for analysis",
          "Predictive maintenance capabilities",
          "Scalable to 100,000+ devices",
        ],
      },
      approach: {
        id: "approach",
        title: "Approach & Process",
        content:
          "We designed a scalable pipeline optimized for high-throughput time-series data.",
        bullets: [
          "Evaluated time-series database options",
          "Designed efficient binary protocol for devices",
          "Implemented WebSocket server cluster",
          "Built Grafana dashboards for visualization",
          "Created alerting rules and escalation policies",
        ],
      },
      implementationHighlights: {
        id: "implementation",
        title: "Implementation Highlights",
        content:
          "Technical decisions that enabled scale and reliability.",
        bullets: [
          "Go-based WebSocket server handling 50k connections per instance",
          "Custom binary protocol reducing bandwidth by 80%",
          "InfluxDB for time-series storage with downsampling",
          "Prometheus for metrics aggregation and alerting",
          "Kubernetes HPA for automatic scaling during peaks",
        ],
      },
      results: {
        id: "results",
        title: "Results & Impact",
        content:
          "Transformed device management from reactive to proactive.",
        bullets: [
          "99.9% data capture rate achieved",
          "Mean time to detect issues reduced from hours to seconds",
          "30% reduction in on-site maintenance visits",
          "Predictive alerts preventing 40% of potential failures",
          "Significant improvement in customer satisfaction",
        ],
      },
      learnings: {
        id: "learnings",
        title: "Key Learnings",
        content:
          "Building IoT telemetry systems at scale requires careful consideration of data volume and latency.",
        bullets: [
          "Binary protocols significantly reduce bandwidth costs",
          "Time-series databases need careful capacity planning",
          "Alerting fatigue is real - threshold tuning is crucial",
          "Device firmware updates must not break telemetry",
          "Edge buffering essential for intermittent connectivity",
        ],
      },
    },
  },
  cs4: {
    id: "cs4",
    type: "case-study",
    title: "Migrating a Legacy Monolith to Microservices",
    oneLineSummary:
      "Lessons learned from gradually decomposing a monolithic application into independent services without disrupting existing users.",
    publishedDate: "2024-07-20",
    tags: ["Microservices", "Migration", "Docker", "Architecture", "DevOps"],
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    quickFacts: {
      role: "Technical Architect",
      timeline: "12 months",
      team: "8 Engineers, 2 PMs",
      toolsOrStack: [
        "Docker",
        "Kubernetes",
        "RabbitMQ",
        "PostgreSQL",
        "Node.js",
        "Go",
      ],
      platform: "Enterprise Platform",
    },
    links: {
      github: "https://github.com/example/migration-patterns",
    },
    kpis: [
      { label: "Services Created", value: "12" },
      { label: "Deployment Freq", value: "50x" },
      { label: "Downtime", value: "0" },
      { label: "Team Velocity", value: "+200%" },
    ],
    tldr: {
      problem:
        "Monolithic codebase slowing down development and preventing scaling.",
      solution:
        "Gradual strangler fig pattern migration to microservices architecture.",
      outcome:
        "Zero-downtime migration with 50x improvement in deployment frequency.",
    },
    sections: {
      challenge: {
        id: "challenge",
        title: "Challenge / Context",
        content:
          "A decade-old monolithic application was becoming increasingly difficult to maintain and scale.",
        bullets: [
          "Single codebase with 500k+ lines of code",
          "Deployments required full system restart",
          "Any change required full regression testing",
          "Scaling required duplicating entire application",
          "Team productivity declining due to complexity",
        ],
      },
      goals: {
        id: "goals",
        title: "Goals",
        content:
          "Transform into a modern, maintainable, and scalable architecture.",
        bullets: [
          "Enable independent service deployments",
          "Improve team autonomy and velocity",
          "Allow selective scaling of components",
          "Zero downtime during migration",
          "Maintain all existing functionality",
        ],
      },
      approach: {
        id: "approach",
        title: "Approach & Process",
        content:
          "We used the Strangler Fig pattern for gradual migration.",
        bullets: [
          "Identified service boundaries using domain analysis",
          "Built API gateway for traffic routing",
          "Extracted services starting with least coupled",
          "Implemented event-driven communication",
          "Parallel running with traffic splitting",
        ],
      },
      implementationHighlights: {
        id: "implementation",
        title: "Implementation Highlights",
        content:
          "Key patterns and technologies that enabled successful migration.",
        bullets: [
          "API Gateway with intelligent routing and fallback",
          "Database per service with eventual consistency",
          "RabbitMQ for async inter-service communication",
          "Feature flags for gradual traffic migration",
          "Comprehensive distributed tracing with Jaeger",
        ],
      },
      results: {
        id: "results",
        title: "Results & Impact",
        content:
          "Successfully completed migration without any production incidents.",
        bullets: [
          "12 independent microservices created",
          "Deployment frequency increased 50x",
          "Mean time to production reduced from weeks to hours",
          "Team velocity doubled within 6 months",
          "Infrastructure costs reduced by 30%",
        ],
      },
      learnings: {
        id: "learnings",
        title: "Key Learnings",
        content:
          "Microservices migration is as much about people as technology.",
        bullets: [
          "Start with clear service boundaries",
          "Invest heavily in observability from day one",
          "Feature flags are essential for safe migrations",
          "Team structure should reflect architecture",
          "Don't underestimate data migration complexity",
        ],
      },
    },
  },
};

// Helper function to get all case study IDs for navigation
export const getCaseStudyIds = (): string[] => {
  return Object.keys(caseStudyDetails);
};

// Helper function to get adjacent case studies for navigation
export const getAdjacentCaseStudies = (
  currentId: string
): { prev: CaseStudyDetail | null; next: CaseStudyDetail | null } => {
  const ids = getCaseStudyIds();
  const currentIndex = ids.indexOf(currentId);

  return {
    prev: currentIndex > 0 ? caseStudyDetails[ids[currentIndex - 1]] : null,
    next:
      currentIndex < ids.length - 1
        ? caseStudyDetails[ids[currentIndex + 1]]
        : null,
  };
};
