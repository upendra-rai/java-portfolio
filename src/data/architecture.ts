export interface ArchNode {
  id: string
  label: string
  tooltip: string
}

export interface ArchLayer {
  id: string
  name: string
  nodes: ArchNode[]
}

export const ARCHITECTURE_LAYERS: ArchLayer[] = [
  {
    id: 'client',
    name: 'CLIENT',
    nodes: [
      { id: 'web', label: 'WEB', tooltip: 'Browser clients consuming REST endpoints over HTTPS with JWT sessions.' },
      { id: 'mobile', label: 'MOBILE', tooltip: 'Mobile apps using the same versioned REST API contract.' },
      { id: 'admin', label: 'ADMIN', tooltip: 'Internal operations dashboard for support, reconciliation and configuration.' },
    ],
  },
  {
    id: 'api',
    name: 'API LAYER',
    nodes: [
      { id: 'rest', label: 'REST API', tooltip: 'Versioned resource-oriented endpoints. DTO isolation from entities, consistent envelope responses.' },
      { id: 'auth', label: 'AUTHENTICATION', tooltip: 'JWT issuance and validation with refresh-token rotation and revocation.' },
      { id: 'validation', label: 'VALIDATION', tooltip: 'Bean Validation at the boundary — malformed requests never reach business logic.' },
      { id: 'ratelimit', label: 'RATE LIMITING', tooltip: 'Redis-backed sliding-window limits protecting downstream services from abuse and retry storms.' },
    ],
  },
  {
    id: 'application',
    name: 'APPLICATION LAYER',
    nodes: [
      { id: 'business', label: 'BUSINESS SERVICES', tooltip: 'Domain services owning transaction boundaries and invariants.' },
      { id: 'paymentsvc', label: 'PAYMENT SERVICES', tooltip: 'Payment orchestration: gateway routing, state machine, retries, idempotency.' },
      { id: 'notificationsvc', label: 'NOTIFICATION SERVICES', tooltip: 'Async email/SMS/webhook dispatch decoupled via events and queues.' },
      { id: 'scheduler', label: 'SCHEDULER', tooltip: 'Scheduled jobs for reconciliation, expiry sweeps and retry of pending operations.' },
      { id: 'referral', label: 'REFERRAL SYSTEM', tooltip: 'Attribution, reward rules and ledger-style credit tracking with audit trail.' },
    ],
  },
  {
    id: 'data',
    name: 'DATA LAYER',
    nodes: [
      { id: 'postgres', label: 'POSTGRESQL / MYSQL', tooltip: 'Relational source of truth. Normalized schema, foreign keys, covering indexes, migration discipline.' },
      { id: 'redis', label: 'REDIS', tooltip: 'Distributed cache used to reduce database load and improve API latency.' },
      { id: 'storage', label: 'OBJECT STORAGE', tooltip: 'Documents, media and exports stored outside the relational core.' },
    ],
  },
  {
    id: 'infra',
    name: 'INFRASTRUCTURE',
    nodes: [
      { id: 'docker', label: 'DOCKER', tooltip: 'Reproducible images; identical artifacts across environments.' },
      { id: 'nginx', label: 'NGINX', tooltip: 'Reverse proxy, TLS termination, gzip, static caching and upstream health routing.' },
      { id: 'cicd', label: 'CI/CD', tooltip: 'Automated build, test and deploy pipeline with gated promotions.' },
      { id: 'cloud', label: 'CLOUD', tooltip: 'Linux servers on cloud infrastructure with systemd-managed services.' },
      { id: 'monitoring', label: 'MONITORING', tooltip: 'Logs, metrics and alerting — observability is part of the system, not an afterthought.' },
    ],
  },
]

export interface SecurityLayer {
  id: string
  label: string
  detail: string
  radius: number
}

export const SECURITY_LAYERS: SecurityLayer[] = [
  { id: 'validation', label: 'INPUT VALIDATION', detail: 'Strict request validation and sanitization at the API boundary.', radius: 150 },
  { id: 'ratelimit', label: 'RATE LIMITING', detail: 'Per-client throttling to absorb bursts and credential-stuffing attempts.', radius: 128 },
  { id: 'cors', label: 'CORS POLICY', detail: 'Explicit origin allow-lists; no wildcard credentials.', radius: 106 },
  { id: 'rbac', label: 'RBAC / AUTHORIZATION', detail: 'Role-based checks enforced in the service layer, not just at routes.', radius: 84 },
  { id: 'jwt', label: 'JWT + AUTH', detail: 'Short-lived access tokens, hashed passwords, secret rotation.', radius: 62 },
]

export const PIPELINE_STAGES = [
  { id: 'code', label: 'CODE', detail: 'Local development, feature branches' },
  { id: 'git', label: 'GIT', detail: 'Version control, reviewed pull requests' },
  { id: 'ci', label: 'CI', detail: 'Jenkins pipeline triggered on merge' },
  { id: 'build', label: 'BUILD', detail: 'Maven compile + test suite' },
  { id: 'docker', label: 'DOCKER', detail: 'Immutable application image' },
  { id: 'server', label: 'SERVER', detail: 'Linux host via secure transfer' },
  { id: 'nginx', label: 'NGINX', detail: 'TLS termination, reverse proxy' },
  { id: 'app', label: 'APPLICATION', detail: 'systemd service, health checks' },
  { id: 'monitoring', label: 'MONITORING', detail: 'Logs, metrics, alerts' },
] as const

export const PERFORMANCE_FLOW = [
  { id: 'request', label: 'REQUEST', detail: 'Validated at the boundary' },
  { id: 'cache', label: 'CACHE', detail: 'Hot reads served from Redis' },
  { id: 'database', label: 'DATABASE', detail: 'Indexed queries, pooled connections' },
  { id: 'async', label: 'ASYNC PROCESSING', detail: 'Heavy work moved off the request thread' },
  { id: 'response', label: 'RESPONSE', detail: 'Paginated, projected DTOs' },
] as const

export const PERFORMANCE_CONCEPTS = [
  { title: 'CACHING', detail: 'Cache-aside pattern with TTLs and explicit invalidation on writes.' },
  { title: 'PAGINATION', detail: 'Keyset/offset pagination so list endpoints stay flat-cost.' },
  { title: 'DATABASE INDEXING', detail: 'Indexes driven by real query plans, not guesswork.' },
  { title: 'CONNECTION POOLING', detail: 'Bounded pools sized against database capacity.' },
  { title: 'ASYNC PROCESSING', detail: '@Async workers and scheduled jobs for non-critical paths.' },
  { title: 'BATCH OPERATIONS', detail: 'Batched inserts/updates to cut round-trips.' },
  { title: 'QUERY OPTIMIZATION', detail: 'EXPLAIN-analyzed queries, projections instead of entity loads.' },
  { title: 'RATE LIMITING', detail: 'Protects shared capacity under load and abuse.' },
] as const

export const HERO_HUD = ['JAVA', 'SPRING BOOT', 'REST', 'SQL', 'REDIS', 'DOCKER', 'AWS'] as const
