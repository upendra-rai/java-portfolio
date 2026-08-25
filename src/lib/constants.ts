export const SITE = {
  name: 'Upendra Rai',
  role: 'Java Software Engineer',
  tagline: 'I build systems that scale.',
  description:
    'Java Software Engineer specializing in Spring Boot, backend systems, APIs, databases, distributed systems and production-grade software.',
  email: 'hello@upendrarai.dev',
  github: 'https://github.com/upendrarai',
  linkedin: 'https://www.linkedin.com/in/upendrarai',
  status: 'AVAILABLE FOR OPPORTUNITIES',
} as const

export const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'ENGINEERING', href: '#engineering' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'ARCHITECTURE', href: '#architecture' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
] as const

export const SECTION_IDS = [
  'home',
  'engineering',
  'architecture',
  'projects',
  'experience',
  'about',
  'contact',
] as const
