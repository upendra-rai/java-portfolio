export interface SkillCategory {
  id: string
  label: string
  angle: number
  skills: string[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    label: 'BACKEND',
    angle: -90,
    skills: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'REST APIs',
      'Maven',
    ],
  },
  {
    id: 'database',
    label: 'DATABASE',
    angle: -18,
    skills: ['PostgreSQL', 'MySQL', 'Redis'],
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    angle: 54,
    skills: ['Docker', 'Nginx', 'Linux', 'CI/CD', 'Jenkins', 'AWS'],
  },
  {
    id: 'architecture',
    label: 'ARCHITECTURE',
    angle: 126,
    skills: [
      'Microservices',
      'Event-Driven Architecture',
      'REST',
      'Layered Architecture',
      'Distributed Systems',
      'Caching',
      'Async Processing',
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    angle: 198,
    skills: ['Git', 'GitHub', 'IntelliJ IDEA', 'Postman', 'DBeaver'],
  },
]
