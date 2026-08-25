import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    slug: 'payment-gateway',
    name: 'PAYMENT GATEWAY',
    category: 'FINTECH • BACKEND • DISTRIBUTED SYSTEM',
    summary:
      'A payment orchestration backend that routes transactions across multiple gateways, survives bank failures and keeps money movement consistent.',
    stack: ['JAVA', 'SPRING BOOT', 'MYSQL', 'REDIS', 'REST', 'DOCKER'],
    flow: [
      { label: 'MERCHANT' },
      { label: 'API' },
      { label: 'PAYMENT ENGINE', accent: true },
      { label: 'PG' },
      { label: 'BANK' },
    ],
    features: [
      'Multi-gateway transaction routing',
      'Idempotent payment initiation',
      'Callback verification and deduplication',
      'Retry scheduling for pending transactions',
      'Daily reconciliation jobs',
    ],
    responsibilities: [
      'Designed the transaction state machine and persistence model',
      'Built gateway adapters behind a common PaymentGateway interface',
      'Implemented idempotency keys and callback signature verification',
      'Created scheduler-driven retries and reconciliation reporting',
    ],
    challenges: [
      'Duplicate and out-of-order bank callbacks',
      'Bank downtime requiring graceful degradation and queued retries',
      'Guaranteeing exactly-once side effects with at-least-once delivery',
    ],
    outcome:
      'A payment pipeline that stays consistent under gateway outages and duplicate callbacks, with every transaction auditable end-to-end.',
    featured: true,
    caseStudy: {
      problem: [
        'Reliable payment processing requires handling multiple payment gateways with different APIs and failure modes.',
        'Transaction states must be tracked precisely — a payment is not simply "success" or "failed", it passes through pending, submitted, confirmed and settled states.',
        'Banks send duplicate callbacks, go offline mid-transaction, and respond out of order.',
        'Without idempotency, a single retry can double-charge a customer. Without reconciliation, mismatches surface days later as manual accounting work.',
      ],
      solution: [
        'Every payment request carries an idempotency key; repeated requests return the original result instead of creating a second transaction.',
        'A strict state machine governs transitions — illegal transitions are rejected at the service layer and logged.',
        'Callbacks are verified by signature and matched to transactions before any state change; duplicates are absorbed safely.',
        'A scheduler sweeps stuck transactions, re-queries gateway status and retries with exponential backoff.',
        'A nightly reconciliation job compares internal ledgers against gateway reports and flags discrepancies.',
      ],
      architectureFlow: [
        { label: 'MERCHANT' },
        { label: 'PAYMENT API' },
        { label: 'TRANSACTION SERVICE', accent: true },
        { label: 'PAYMENT GATEWAY' },
        { label: 'BANK' },
        { label: 'CALLBACK' },
        { label: 'MERCHANT' },
      ],
      supportingServices: ['REDIS', 'DATABASE', 'SCHEDULER', 'RECONCILIATION'],
      concepts: [
        { title: 'IDEMPOTENCY', detail: 'Unique keys ensure retried requests never create duplicate charges.' },
        { title: 'STATE MANAGEMENT', detail: 'Explicit transaction states with guarded transitions.' },
        { title: 'RETRY MECHANISMS', detail: 'Backoff-based retries for timeouts and gateway failures.' },
        { title: 'CALLBACK HANDLING', detail: 'Signature verification plus deduplication before processing.' },
        { title: 'FAILURE HANDLING', detail: 'Timeouts, circuit behavior and fallback status polling.' },
        { title: 'DB CONSISTENCY', detail: 'Transactional writes keep ledger and status aligned.' },
        { title: 'ASYNC PROCESSING', detail: 'Non-blocking callbacks processed off the request path.' },
        { title: 'RECONCILIATION', detail: 'Scheduled comparison against gateway settlement reports.' },
        { title: 'LOGGING', detail: 'Correlated, structured logs across the transaction lifecycle.' },
        { title: 'MONITORING', detail: 'Alerts on stuck transactions and anomaly rates.' },
      ],
    },
  },
  {
    slug: 'school-management-platform',
    name: 'SCHOOL MANAGEMENT PLATFORM',
    category: 'EDTECH • FULL BACKEND • REST API',
    summary:
      'A complete academic operations backend — students, staff, exams, fees and attendance behind one secured REST API.',
    stack: ['JAVA', 'SPRING BOOT', 'MYSQL', 'REDIS', 'REST'],
    flow: [
      { label: 'WEB / MOBILE' },
      { label: 'REST API' },
      { label: 'SPRING BOOT', accent: true },
      { label: 'DATABASE' },
    ],
    features: [
      'Students, teachers, classes and sections',
      'Exam and question-bank management',
      'Fee structures and payment tracking',
      'Attendance workflows',
      'Role-based authentication',
    ],
    responsibilities: [
      'Modeled the academic domain schema end-to-end',
      'Built exam engine with question banks and evaluation flows',
      'Secured all modules with role-based access control',
    ],
    challenges: [
      'Concurrent fee updates during peak admission periods',
      'Complex timetable and section relationships without query explosions',
    ],
    outcome:
      'One coherent system replacing spreadsheets and disconnected tools for daily school operations.',
  },
  {
    slug: 'hotel-management-saas',
    name: 'HOTEL MANAGEMENT SAAS',
    category: 'SAAS • MULTI-TENANT • BACKEND',
    summary:
      'Multi-hotel property management with strict tenant isolation, subscriptions and role-based staff access.',
    stack: ['JAVA', 'SPRING BOOT', 'POSTGRESQL', 'REDIS', 'REST'],
    flow: [
      { label: 'HOTEL PORTALS' },
      { label: 'API GATEWAY' },
      { label: 'TENANT RESOLVER', accent: true },
      { label: 'SERVICES' },
      { label: 'SHARED DATA LAYER' },
    ],
    features: [
      'Multi-hotel architecture with tenant scoping',
      'User and staff management per hotel',
      'Subscription management',
      'Role-based access control',
    ],
    responsibilities: [
      'Designed tenant resolution and data-isolation strategy',
      'Implemented subscription lifecycle gating features per plan',
    ],
    challenges: [
      'Guaranteeing zero cross-tenant leakage at the query level',
      'Feature-flagging per subscription tier without code forks',
    ],
    outcome:
      'A single deployment safely serving many independent hotels — MULTI-TENANT ARCHITECTURE done at the data layer.',
  },
  {
    slug: 'travel-platform',
    name: 'TRAVEL PLATFORM',
    category: 'MARKETPLACE • BOOKINGS • INTEGRATIONS',
    summary:
      'Search, booking and partner-integrated travel commerce with payments and an operations admin.',
    stack: ['JAVA', 'SPRING BOOT', 'MYSQL', 'REDIS', 'REST'],
    flow: [
      { label: 'SEARCH' },
      { label: 'BOOKING ENGINE', accent: true },
      { label: 'PARTNERS' },
      { label: 'PAYMENTS' },
      { label: 'ADMIN' },
    ],
    features: [
      'Inventory search with cached results',
      'Booking lifecycle with partner integrations',
      'User accounts and payment flows',
      'Operations admin panel',
    ],
    responsibilities: [
      'Integrated third-party inventory and booking partners',
      'Cached search responses to absorb traffic spikes',
    ],
    challenges: [
      'Partner APIs with slow, inconsistent response times',
      'Holding inventory during checkout without overselling',
    ],
    outcome:
      'A booking pipeline that stays responsive even when upstream partners are not.',
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
