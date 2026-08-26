'use client'

import Link from 'next/link'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '@/types/project'
import { PROJECTS } from '@/data/projects'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

function FlowStrip({ project }: { project: Project }) {
  return (
    <div className="overflow-x-auto pb-1" data-cursor="node">
      <div className="flex min-w-max items-center gap-0">
        {project.flow.map((node, i) => (
          <div key={node.label} className="flex items-center">
            <span
              className={cn(
                'whitespace-nowrap border px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] rounded-sm',
                node.accent
                  ? 'border-accent/60 bg-accent-dim text-accent'
                  : 'border-line-strong text-muted',
              )}
            >
              {node.label}
            </span>
            {i < project.flow.length - 1 && (
              <span aria-hidden className="relative mx-1 h-px w-8 overflow-visible bg-line-strong sm:w-12">
                <span
                  className="packet-down absolute -top-[2px] left-1/3 h-1 w-1 rounded-full bg-accent"
                  style={
                    {
                      '--packet-duration': `${2.6 + i * 0.5}s`,
                      '--packet-delay': `${i * 0.7}s`,
                    } as React.CSSProperties
                  }
                />
                <span className="absolute inset-x-0 top-0 h-px bg-line-strong" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <Reveal className={cn(large && 'lg:col-span-2')}>
      <article
        data-cursor="link"
        className={cn(
          'group panel relative flex h-full flex-col p-6 transition-all duration-500 hover:border-line-strong sm:p-8',
          large ? 'lg:flex-row lg:items-center lg:gap-10' : '',
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(255,107,44,0.06), transparent 45%)',
          }}
        />

        <div className={cn('flex-1', large && 'lg:max-w-[58%]')}>
          <p className="font-mono text-[9px] tracking-[0.22em] text-accent">{project.category}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{project.name}</h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-6">
            <FlowStrip project={project} />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
            {project.stack.map((tech) => (
              <span key={tech} className="font-mono text-[9px] tracking-[0.16em] text-muted/80">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={cn('mt-7 flex items-center gap-4', large ? 'lg:mt-0 lg:flex-col lg:items-stretch' : '')}>
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="link"
            className="inline-flex items-center gap-2 border border-line-strong px-5 py-3 font-mono text-[10px] tracking-[0.18em] transition-colors duration-300 hover:border-accent hover:text-accent rounded-sm"
            aria-label={`Open case study: ${project.name}`}
          >
            CASE STUDY
            <ArrowUpRight size={13} />
          </Link>
          {project.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — ${link.label}`}
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-muted transition-colors duration-300 hover:border-accent hover:text-accent rounded-sm"
            >
              <Github size={15} />
            </a>
          ))}
        </div>
      </article>
    </Reveal>
  )
}

export function ProjectsSection() {
  const featured = PROJECTS.filter((p) => p.featured)
  const rest = PROJECTS.filter((p) => !p.featured)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {featured.map((project) => (
        <ProjectCard key={project.slug} project={project} large />
      ))}
      {rest.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
