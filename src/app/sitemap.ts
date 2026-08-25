import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/data/projects'

export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    'https://upendra-rai.github.io/java-portfolio'

  const now = new Date()

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${base}/resume`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    ...PROJECTS.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}