'use client'

import { PIPELINE_STAGES } from '@/data/architecture'

const TOOLS = ['Docker', 'Jenkins / CI', 'Linux', 'Nginx', 'Cloud', 'SSL', 'systemd', 'Logs']

export function DeploymentPipeline() {
  return (
    <div className="space-y-8">
      <div className="panel overflow-x-auto p-6 sm:p-8">
        <ol className="flex min-w-max items-stretch gap-0">
          {PIPELINE_STAGES.map((stage, i) => (
            <li key={stage.id} className="flex items-center">
              <div className="group relative w-24 text-center sm:w-28" title={stage.detail}>
                <span
                  className={
                    i === 0 || i === PIPELINE_STAGES.length - 1
                      ? 'mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-accent/70 bg-accent-dim font-mono text-[9px] font-semibold text-accent'
                      : 'mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-panel font-mono text-[9px] text-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent'
                  }
                  data-cursor="node"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-3 whitespace-nowrap font-mono text-[9px] tracking-[0.16em] text-fg/90">
                  {stage.label}
                </p>
                <p className="mt-1 hidden whitespace-nowrap font-mono text-[8px] text-muted/70 lg:block">
                  {stage.detail.split(',')[0]}
                </p>
              </div>
              {i < PIPELINE_STAGES.length - 1 && (
                <span aria-hidden className="relative mx-0 h-px w-10 self-center overflow-visible bg-line-strong sm:w-14">
                  <span
                    className="packet-down absolute -top-[2px] left-0 h-1 w-1 rounded-full bg-accent"
                    style={
                      {
                        '--packet-duration': '3.2s',
                        '--packet-delay': `${i * 0.38}s`,
                      } as React.CSSProperties
                    }
                  />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-wrap gap-2">
        {TOOLS.map((tool) => (
          <span
            key={tool}
            className="rounded-sm border border-line px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-muted"
          >
            {tool.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PerformanceFlowViz() {
  const stages = [
    { label: 'REQUEST' },
    { label: 'CACHE' },
    { label: 'DATABASE' },
    { label: 'ASYNC PROCESSING' },
    { label: 'RESPONSE' },
  ]
  return (
    <div className="panel overflow-x-auto p-6 sm:p-8">
      <ol className="flex min-w-max items-center">
        {stages.map((stage, i) => (
          <li key={stage.label} className="flex items-center">
            <span
              className={
                i === stages.length - 1
                  ? 'whitespace-nowrap rounded-sm border border-emerald-400/50 bg-emerald-400/10 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-emerald-300/90'
                  : 'whitespace-nowrap rounded-sm border border-line-strong px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-fg/90'
              }
            >
              {stage.label}
            </span>
            {i < stages.length - 1 && (
              <span aria-hidden className="relative mx-1 h-px w-10 overflow-visible bg-line-strong sm:w-16">
                <span
                  className="packet-down absolute -top-[2px] left-0 h-1 w-1 rounded-full bg-accent"
                  style={{ '--packet-duration': '2.8s', '--packet-delay': `${i * 0.55}s` } as React.CSSProperties}
                />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
