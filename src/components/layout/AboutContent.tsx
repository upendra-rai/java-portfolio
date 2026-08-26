import { ABOUT_PARAGRAPHS, ABOUT_FOCUS } from '@/data/about'
import { Reveal } from '@/components/ui/Reveal'
import { LinkButton } from '@/components/ui/Button'
import { CircuitMotif } from './CircuitMotif'

export function AboutContent() {
  return (
    <div className="grid items-start gap-12 md:grid-cols-1 lg:grid-cols-[1fr_360px]">
      <div>
        {ABOUT_PARAGRAPHS.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <p className="mb-5 max-w-2xl text-base leading-relaxed text-muted first:text-fg/90 md:text-lg">
              {paragraph}
            </p>
          </Reveal>
        ))}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-2">
            {ABOUT_FOCUS.map((focus) => (
              <span
                key={focus}
                className="rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-fg/85"
              >
                {focus.toUpperCase()}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="/resume" variant="primary">
              VIEW RESUME
            </LinkButton>
            <LinkButton href="#contact">START A CONVERSATION</LinkButton>
          </div>
        </Reveal>
      </div>

      <div className="lg:block hidden">
        <CircuitMotif className="h-full w-full" />
      </div>
    </div>
  )
}