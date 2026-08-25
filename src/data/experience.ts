import type { ExperienceEntry } from '@/types/project'

// Replace entries with your real history — components render whatever lives here.
export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Fintech Product Company',
    role: 'Senior Java Software Engineer',
    period: '2023 — PRESENT',
    summary:
      'Owning backend systems for payment orchestration, referral growth loops and merchant tooling in production.',
    systems: [
      'Payment gateway orchestration platform',
      'Referral & rewards engine with ledger-grade tracking',
      'Merchant onboarding and reconciliation services',
    ],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker', 'Jenkins'],
  },
  {
    company: 'Product Engineering Services',
    role: 'Java Backend Developer',
    period: '2021 — 2023',
    summary:
      'Delivered backend platforms for education, hospitality and travel clients — from schema design through deployment and operations.',
    systems: [
      'School management platform',
      'Multi-tenant hotel SaaS',
      'Travel booking platform',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Hibernate', 'Linux', 'Nginx'],
  },
]
