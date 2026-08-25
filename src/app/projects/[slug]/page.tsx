import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject } from '@/data/projects'
import { ProjectDetail } from '@/components/projects/ProjectDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
