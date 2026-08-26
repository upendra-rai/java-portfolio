'use client'

import { useState } from 'react'
import { ARCHITECTURE_LAYERS } from '@/data/architecture'
import { cn } from '@/lib/utils'

export function ArchitectureDiagram() {
  const [active, setActive] = useState<{
    node: string
    label: string
    tooltip: string
    layer: string
  } | null>(null)

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-[1fr_280px]">
      <div className="panel relative overflow-hidden p-4 sm:p-6">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative space-y-0">
          {ARCHITECTURE_LAYERS.map((layer, li) => (
            <div key={layer.id}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <p className="shrink-0 font-mono text-[9px] tracking-[0.22em] text-muted">
                  {layer.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layer.nodes.map((node) => (
                    <button
                      key={node.id}
                      type="button"
                      data-cursor="node"
                      onMouseEnter={() =>
                        setActive({ node: node.id, label: node.label, tooltip: node.tooltip, layer: layer.name })
                      }
                      onFocus={() =>
                        setActive({ node: node.id, label: node.label, tooltip: node.tooltip, layer: layer.name })
                      }
                      onMouseLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      aria-label={`${node.label} — ${node.tooltip}`}
                      className={cn(
                        'border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] transition-all duration-200 rounded-sm',
                        active?.node === node.id
                          ? 'border-accent bg-accent-dim text-accent -translate-y-px'
                          : 'border-line-strong bg-panel/60 text-fg/85 hover:border-accent/50',
                      )}
                    >
                      {node.label}
                    </button>
                  ))}
                </div>
              </div>
              {li < ARCHITECTURE_LAYERS.length - 1 && (
                <div className="ml-2 flex h-10 items-center gap-2 pl-2" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="relative h-full w-px overflow-visible">
                      <span className="absolute inset-x-0 top-0 h-full w-px bg-line" />
                      <span
                        className="packet-down absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                        style={
                          {
                            '--packet-duration': `${1.4 + i * 0.35}s`,
                            '--packet-delay': `${i * 0.45}s`,
                          } as React.CSSProperties
                        }
                      />
                    </span>
                  ))}
                  <svg width="10" height="8" viewBox="0 0 10 8" className="text-muted">
                    <path d="M0 0 L5 8 L10 0" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Inspector */}
      <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <div className={cn('panel p-5 transition-colors duration-300', active && 'border-accent/40')}>
          <p className="font-mono text-[9px] tracking-[0.24em] text-accent">
            {active ? `INSPECT // ${active.layer}` : 'ARCHITECTURE INSPECTOR'}
          </p>
          <p className="mt-3 font-mono text-sm tracking-wide text-fg">
            {active ? active.label : 'HOVER A COMPONENT'}
          </p>
          <p className="mt-3 min-h-[72px] text-xs leading-relaxed text-muted">
            {active ? active.tooltip : 'Every component in this stack is one I have designed, built or operated in production systems.'}
          </p>
        </div>
        <ul className="mt-4 space-y-2 font-mono text-[9px] tracking-[0.18em] text-muted/70">
          <li>REQUEST PATH: CLIENT → API → SERVICES → DATA</li>
          <li>CROSS-CUTTING: AUTH • CACHE • OBSERVABILITY</li>
        </ul>
      </aside>
    </div>
  )
}
