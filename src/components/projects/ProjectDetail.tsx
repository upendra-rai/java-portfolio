'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types/project'
import { Reveal } from '@/components/ui/Reveal'

function FlowColumn({ flow }: { flow: Project['flow'] }) {
  return (
    <ol className="space-y-0">
      {flow.map((node, i) => (
        <li key={node.label}>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted/60 w-6">{String(i + 1).padStart(2, '0')}</span>
            <span
              className={
                node.accent
                  ? 'rounded-sm border border-accent/60 bg-accent-dim px-3 py-2 font-mono text-[11px] tracking-[0.16em] text-accent'
                  : 'rounded-sm border border-line-strong px-3 py-2 font-mono text-[11px] tracking-[0.16em] text-fg/90'
              }
            >
              {node.label}
            </span>
          </div>
          {i < flow.length - 1 && (
            <div aria-hidden className="ml-[52px] h-5 w-px bg-gradient-to-b from-accent/60 to-line" />
          )}
        </li>
      ))}
    </ol>
  )
}

function ProseList({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal>
      <h2 className="font-mono text-xs tracking-[0.24em] text-accent">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export function ProjectDetail({ project }: { project: Project }) {
  const study = project.caseStudy

  return (
    <article className="mx-auto max-w-5xl px-5 pb-28 pt-32 sm:px-8">
      <Link
        href="/#projects"
        data-cursor="link"
        className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={13} />
        BACK TO SYSTEMS
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">{project.category}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {project.summary}
        </p>
        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[9px] tracking-[0.16em] text-muted/80">
              {tech}
            </span>
          ))}
        </div>
        {project.links?.length ? (
          <div className="mt-8 flex gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-[10px] tracking-[0.18em] transition-colors hover:border-accent hover:text-accent rounded-sm"
              >
                {link.label.toUpperCase()}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <div className="mt-14 space-y-14">
        {study ? (
          <>
            <ProseList title="// PROBLEM" items={study.problem} />
            <ProseList title="// SOLUTION" items={study.solution} />

            <Reveal>
              <h2 className="font-mono text-xs tracking-[0.24em] text-accent">// ARCHITECTURE</h2>
              <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_240px]">
                <FlowColumn flow={study.architectureFlow} />
                <div className="panel p-5 self-start">
                  <p className="font-mono text-[9px] tracking-[0.22em] text-muted">SUPPORTING SERVICES</p>
                  <ul className="mt-3 space-y-2">
                    {study.supportingServices.map((svc) => (
                      <li key={svc} className="font-mono text-[11px] tracking-[0.14em] text-fg/85">
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-mono text-xs tracking-[0.24em] text-accent">// ENGINEERING CONCEPTS</h2>
              <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {study.concepts.map((concept) => (
                  <div key={concept.title} className="bg-panel p-5 transition-colors duration-300 hover:bg-bg2">
                    <p className="font-mono text-[10px] tracking-[0.16em] text-fg">{concept.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{concept.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </>
        ) : null}

        <ProseList title="// RESPONSIBILITIES" items={project.responsibilities} />
        <ProseList title="// CHALLENGES" items={project.challenges} />

        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.24em] text-accent">// OUTCOME</h2>
          <p className="mt-4 max-w-2xl border-l-2 border-accent/70 pl-5 text-base leading-relaxed text-fg/90">
            {project.outcome}
          </p>
        </Reveal>

        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.24em] text-accent">// FEATURE SCOPE</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="rounded-sm border border-line bg-panel px-3 py-1.5 text-xs text-fg/85"
              >
                {feature}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-20 border-t border-line pt-10">
        <a
          href="/#contact"
          data-cursor="link"
          className="font-mono text-[11px] tracking-[0.2em] text-accent transition-colors hover:text-accent2"
        >
          DISCUSS A SIMILAR SYSTEM →
        </a>
      </div>
    </article>
  )
}
