import { EXPERIENCE } from '@/data/experience'
import { Reveal } from '@/components/ui/Reveal'

export function ExperienceTimeline() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent/70 via-line-strong to-transparent"
      />
      <ol className="space-y-14">
        {EXPERIENCE.map((entry, i) => (
          <li key={`${entry.company}-${entry.period}`} className="relative pl-10">
            <Reveal delay={i * 0.08}>
              <span
                aria-hidden
                className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent bg-bg"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <p className="font-mono text-[10px] tracking-[0.24em] text-accent">{entry.period}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{entry.role}</h3>
              <p className="mt-0.5 text-sm text-muted">{entry.company}</p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{entry.summary}</p>

              <div className="mt-5 space-y-2">
                {entry.systems.map((system) => (
                  <p key={system} className="flex items-start gap-2.5 text-sm text-fg/85">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    {system}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm border border-line px-2 py-1 font-mono text-[9px] tracking-[0.12em] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  )
}
