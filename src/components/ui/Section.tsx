import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, LineReveal } from './Reveal'

interface SectionProps {
  id?: string
  index: string
  eyebrow: string
  title: string
  lede?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('relative py-24 md:py-32', className)}>
      <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', containerClassName)}>
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">/{index}</span>
            <span className="h-px w-8 bg-line-strong inline-block" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            <LineReveal text={title} />
          </h2>
        </Reveal>
        {lede ? (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-muted leading-relaxed">{lede}</p>
          </Reveal>
        ) : null}
        <div className="mt-14">{children}</div>
      </div>
    </section>
  )
}
