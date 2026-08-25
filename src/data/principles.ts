export interface Principle {
  index: string
  title: string
  detail: string
}

export const PRINCIPLES: Principle[] = [
  {
    index: '01',
    title: 'DESIGN BEFORE CODE',
    detail: 'Understand requirements, data flow and failure scenarios before implementation.',
  },
  {
    index: '02',
    title: 'SIMPLE ARCHITECTURE',
    detail: 'Prefer maintainable architecture over unnecessary complexity.',
  },
  {
    index: '03',
    title: 'DATABASE MATTERS',
    detail: 'Good schema design, indexing, constraints and query optimization are foundational.',
  },
  {
    index: '04',
    title: 'FAILURE IS PART OF THE SYSTEM',
    detail: 'Design for retries, timeouts, duplicate requests and partial failures.',
  },
  {
    index: '05',
    title: 'OBSERVABILITY',
    detail: 'Logs, metrics and tracing are part of production engineering.',
  },
  {
    index: '06',
    title: 'PERFORMANCE WITH PURPOSE',
    detail: 'Optimize measurable bottlenecks rather than prematurely optimizing everything.',
  },
]
