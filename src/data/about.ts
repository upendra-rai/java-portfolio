export const ABOUT_PARAGRAPHS = [
  'I am a Java software engineer who specializes in the backend — the part of the system users never see but always feel. My work centers on Spring Boot services, well-modeled relational databases, and APIs that stay correct when traffic spikes or dependencies fail.',
  'I care about distributed systems fundamentals: clear transaction boundaries, idempotent operations, honest retries and observability that makes production debuggable. Payment infrastructure taught me that correctness is a feature — every edge case eventually happens.',
  'From API design and database modeling to deployment pipelines and monitoring, I engineer the full path from idea to reliable production system.',
] as const

export const ABOUT_FOCUS = [
  'Backend Engineering',
  'Java / Spring Boot',
  'Distributed Systems',
  'API Design',
  'Databases & Modeling',
  'Production Operations',
] as const

export interface ResumeItem {
  title: string
  subtitle: string
  period: string
  points: string[]
}

export const RESUME = {
  summary:
    'Senior Java Software Engineer specializing in backend systems, payment infrastructure and distributed architecture. I design, build and operate production-grade services end to end — API design, database modeling, caching, async processing, deployment and monitoring.',
  skills: {
    Languages: 'Java, SQL, Bash',
    Backend: 'Spring Boot, Spring Security, Spring Data JPA, Hibernate, REST APIs',
    Data: 'PostgreSQL, MySQL, Redis',
    Infrastructure: 'Docker, Nginx, Linux, Jenkins / CI/CD, AWS',
    Practices:
      'Microservices, event-driven systems, idempotency, reconciliation, observability',
  },
  experience: [
    {
      title: 'Senior Java Software Engineer',
      subtitle: 'Fintech Product Company',
      period: '2023 — Present',
      points: [
        'Own payment orchestration platform handling multi-gateway routing, retries and reconciliation.',
        'Designed idempotent transaction pipeline with verified callbacks and auditable state machine.',
        'Built referral engine with ledger-grade credit tracking and scheduled reward settlement.',
      ],
    },
    {
      title: 'Java Backend Developer',
      subtitle: 'Product Engineering Services',
      period: '2021 — 2023',
      points: [
        'Delivered school management, multi-tenant hotel SaaS and travel booking backends.',
        'Modeled core schemas, tuned queries with real query plans, enforced access control in service layers.',
        'Containerized services and established CI/CD pipelines with Nginx + systemd deployments.',
      ],
    },
  ],
} as const
