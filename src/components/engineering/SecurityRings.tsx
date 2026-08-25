'use client'

import { useState } from 'react'
import { SECURITY_LAYERS } from '@/data/architecture'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SecurityRings() {
  const [activeId, setActiveId] = useState<string | null>('jwt')
  const active = SECURITY_LAYERS.find((l) => l.id === activeId)

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-[420px]" role="img" aria-label="Protected API core surrounded by security layers">
        <svg viewBox="-170 -170 340 340" className="h-full w-full">
          <circle cx="0" cy="0" r="30" fill="#101319" stroke="#FF6B2C" strokeWidth="1.4" />
          <text x="0" y="4" textAnchor="middle" fontSize="9" fontFamily="monospace" letterSpacing="1.5" fill="#FF6B2C">
            CORE
          </text>

          {SECURITY_LAYERS.map((layer) => {
            const isActive = layer.id === activeId
            return (
              <g key={layer.id} className="transition-opacity duration-300" opacity={activeId && !isActive ? 0.35 : 1}>
                <circle
                  cx="0"
                  cy="0"
                  r={layer.radius}
                  fill="none"
                  stroke={isActive ? '#FF6B2C' : 'rgba(245,247,250,0.22)'}
                  strokeWidth={isActive ? 1.4 : 0.8}
                  strokeDasharray={isActive ? 'none' : '3 5'}
                  className="transition-all duration-300"
                />
                <rect
                  x={-layer.label.length * 3.1 - 6}
                  y={-layer.radius - 7}
                  width={layer.label.length * 6.2 + 12}
                  height="14"
                  rx="3"
                  fill="#0B0D11"
                  stroke={isActive ? '#FF6B2C' : 'rgba(245,247,250,0.25)'}
                  strokeWidth="0.7"
                />
                <text
                  x="0"
                  y={-layer.radius + 2.5}
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="monospace"
                  letterSpacing="1.2"
                  fill={isActive ? '#FF6B2C' : '#8B93A1'}
                >
                  {layer.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <ul className="space-y-2.5">
        {[...SECURITY_LAYERS].reverse().map((layer) => (
          <li key={layer.id}>
            <button
              type="button"
              data-cursor="node"
              onMouseEnter={() => setActiveId(layer.id)}
              onMouseLeave={() => setActiveId('jwt')}
              onFocus={() => setActiveId(layer.id)}
              onBlur={() => setActiveId(null)}
              className={cn(
                'w-full rounded-sm border px-4 py-3 text-left transition-all duration-300',
                activeId === layer.id
                  ? 'border-accent/60 bg-accent-dim'
                  : 'border-line bg-panel hover:border-line-strong',
              )}
              aria-pressed={activeId === layer.id}
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-fg">
                  <ShieldCheck size={12} className={activeId === layer.id ? 'text-accent' : 'text-muted'} />
                  {layer.label}
                </span>
                <span className="font-mono text-[8px] tracking-[0.2em] text-muted/60">L{SECURITY_LAYERS.indexOf(layer) + 1}</span>
              </span>
              {activeId === layer.id && (
                <span className="mt-2 block text-xs leading-relaxed text-muted">{layer.detail}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
