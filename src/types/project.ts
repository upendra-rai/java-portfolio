export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectFlowNode {
  label: string
  accent?: boolean
}

export interface ProjectConcept {
  title: string
  detail: string
}

export interface CaseStudy {
  problem: string[]
  solution: string[]
  architectureFlow: ProjectFlowNode[]
  supportingServices: string[]
  concepts: ProjectConcept[]
}

export interface Project {
  slug: string
  name: string
  category: string
  summary: string
  stack: string[]
  flow: ProjectFlowNode[]
  features: string[]
  responsibilities: string[]
  challenges: string[]
  outcome: string
  links?: ProjectLink[]
  featured?: boolean
  caseStudy?: CaseStudy
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location?: string
  summary: string
  systems: string[]
  stack: string[]
}
