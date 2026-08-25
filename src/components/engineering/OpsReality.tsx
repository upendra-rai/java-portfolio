import { INCIDENTS } from '@/data/incidents'
import { Reveal } from '@/components/ui/Reveal'
import { PERFORMANCE_CONCEPTS } from '@/data/architecture'

function Row({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-[86px_1fr] gap-3 py-2.5">
      <span className="pt-px font-mono text-[9px] leading-4 tracking-[0.18em] text-muted">{label}</span>
      <p className="text-[13px] leading-relaxed text-fg/85">{text}</p>
    </div>
  )
}

export function OpsRealityGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {INCIDENTS.map((incident, i) => (
        <Reveal key={incident.problem} delay={(i % 2) * 0.08}>
          <article className="panel h-full border-l-2 border-l-accent/70 p-6">
            <Row label="PROBLEM" text={incident.problem} />
            <div className="hairline my-2" />
            <Row label="DIAGNOSIS" text={incident.diagnosis} />
            <div className="hairline my-2" />
            <Row label="SOLUTION" text={incident.solution} />
          </article>
        </Reveal>
      ))}
    </div>
  )
}

export function PerformanceConcepts() {
  return (
    <>
      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {PERFORMANCE_CONCEPTS.map((concept) => (
          <div key={concept.title} className="bg-panel p-5 transition-colors duration-300 hover:bg-bg2">
            <p className="font-mono text-[10px] tracking-[0.18em] text-accent">{concept.title}</p>
            <p className="mt-2.5 text-xs leading-relaxed text-muted">{concept.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 font-mono text-[9px] tracking-[0.16em] text-muted/60">
        NO SYNTHETIC BENCHMARKS DISPLAYED — NUMBERS APPEAR HERE ONLY WHEN MEASURED ON REAL SYSTEMS.
      </p>
    </>
  )
}
