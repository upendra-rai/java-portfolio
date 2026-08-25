import { PRINCIPLES } from '@/data/principles'
import { Reveal } from '@/components/ui/Reveal'

export function PrinciplesGrid() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {PRINCIPLES.map((principle, i) => (
        <div key={principle.index} className="group relative bg-panel p-7 transition-colors duration-300 hover:bg-bg2">
          <Reveal delay={(i % 3) * 0.07}>
            <p className="font-mono text-xs tracking-[0.2em] text-accent">{principle.index}</p>
            <h3 className="mt-4 font-mono text-sm font-semibold tracking-[0.08em]">{principle.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{principle.detail}</p>
          </Reveal>
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
          />
        </div>
      ))}
    </div>
  )
}
