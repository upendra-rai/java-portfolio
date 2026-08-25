import { ABOUT_PARAGRAPHS, ABOUT_FOCUS } from '@/data/about'
import { Reveal } from '@/components/ui/Reveal'
import { LinkButton } from '@/components/ui/Button'

function CircuitMotif() {
  return (
    <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="150" fill="url(#aboutGlow)" />
      {[60, 92, 124].map((r, i) => (
        <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="rgba(245,247,250,0.14)" strokeWidth="0.8" strokeDasharray={i === 1 ? '4 7' : 'none'} />
      ))}
      <circle cx="160" cy="160" r="40" fill="none" stroke="#FF6B2C" strokeWidth="1.2" />
      <circle cx="160" cy="160" r="18" fill="none" stroke="#F5F7FA" strokeWidth="0.9" opacity="0.85" />
      <circle cx="160" cy="160" r="5" fill="#FF6B2C" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180
        const x1 = 160 + 40 * Math.cos(rad)
        const y1 = 160 + 40 * Math.sin(rad)
        const x2 = 160 + 124 * Math.cos(rad)
        const y2 = 160 + 124 * Math.sin(rad)
        return (
          <g key={deg}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(139,147,161,0.35)" strokeWidth="0.7" />
            <rect x={x2 - 4} y={y2 - 4} width="8" height="8" rx="1.5" fill="#101319" stroke="rgba(255,107,44,0.55)" strokeWidth="0.8" />
          </g>
        )
      })}
    </svg>
  )
}

export function AboutContent() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1fr_360px]">
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

      <Reveal delay={0.1} className="mx-auto hidden aspect-square w-full max-w-[340px] lg:block">
        <CircuitMotif />
      </Reveal>
    </div>
  )
}
