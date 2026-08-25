'use client'

import { useMemo, useState } from 'react'
import { SKILL_CATEGORIES } from '@/data/skills'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

interface Point {
  x: number
  y: number
}

const CX = 50
const CY = 50
const EASE = 'cubic-bezier(0.16,1,0.3,1)'

interface PanelSpec {
  id: string
  label: string
  hub: Point
  style: React.CSSProperties
  slideFrom: string
}

const PANELS: PanelSpec[] = [
  {
    id: 'backend',
    label: 'BACKEND',
    hub: { x: 33, y: 21 },
    style: { top: '5%', left: '2%', width: '31%' },
    slideFrom: 'translateY(22px)',
  },
  {
    id: 'database',
    label: 'DATABASE',
    hub: { x: 67, y: 21 },
    style: { top: '5%', right: '2%', width: '27%' },
    slideFrom: 'translateY(22px)',
  },
  {
    id: 'tools',
    label: 'TOOLS',
    hub: { x: 50, y: 81 },
    style: { bottom: '2%', left: '50%', marginLeft: '-13%', width: '26%' },
    slideFrom: 'translateY(-22px)',
  },
  {
    id: 'architecture',
    label: 'ARCHITECTURE',
    hub: { x: 33, y: 79 },
    style: { bottom: '5%', left: '2%', width: '32%' },
    slideFrom: 'translateY(-22px)',
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    hub: { x: 67, y: 79 },
    style: { bottom: '5%', right: '2%', width: '31%' },
    slideFrom: 'translateY(-22px)',
  },
]

export function StackConstellation() {
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const { ref, inView } = useInViewOnce<HTMLDivElement>('-120px')
  const reduced = useReducedMotion()

  const categories = useMemo(
    () =>
      SKILL_CATEGORIES.map((cat) => ({
        ...cat,
        panel: PANELS.find((p) => p.id === cat.id),
      })),
    [],
  )

  const show = (delay: number, slideFrom: string): React.CSSProperties => ({
    opacity: inView || reduced ? 1 : 0,
    transform: inView || reduced ? 'translateY(0) scale(1)' : `${slideFrom} scale(0.96)`,
    transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
    transitionDelay: `${reduced ? 0 : delay}s`,
  })

  const lineDraw = (delay: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: inView || reduced ? 0 : 1,
    transition: `stroke-dashoffset 1s ${EASE}`,
    transitionDelay: `${reduced ? 0 : delay}s`,
  })

  return (
    <>
      {/* Desktop system map */}
      <div
        ref={ref}
        className="relative mx-auto hidden aspect-square w-full max-w-[700px] md:block"
        role="img"
        aria-label="Animated system map: a Java engineering core connected to backend, database, infrastructure, architecture and tooling modules"
      >
        {/* Trunk lines */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          {categories.map(({ id, label, panel }, i) => {
            if (!panel) return null
            const active = highlighted === id
            const dimmed = highlighted !== null && !active
            return (
              <g key={id}>
                <line
                  x1={CX}
                  y1={CY}
                  x2={panel.hub.x}
                  y2={panel.hub.y}
                  pathLength={1}
                  stroke={dimmed ? 'rgba(139,147,161,0.1)' : 'rgba(255,107,44,0.4)'}
                  strokeWidth="0.26"
                  style={{
                    ...lineDraw(0.1 + i * 0.08),
                    transition:
                      'stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1), stroke .35s ease',
                    transitionDelay: `${reduced ? 0 : 0.1 + i * 0.08}s`,
                  }}
                />
                <line
                  x1={CX}
                  y1={CY}
                  x2={panel.hub.x}
                  y2={panel.hub.y}
                  pathLength={1}
                  stroke="#FF6B2C"
                  strokeWidth="0.4"
                  strokeLinecap="round"
                  strokeDasharray="0.09 0.11"
                  style={{
                    opacity: active && !reduced ? 0.95 : 0,
                    animation: active && !reduced ? 'dash-flow 0.9s linear infinite' : undefined,
                    transition: 'opacity .35s ease',
                  }}
                />
                {!reduced && inView && (
                  <circle r="0.5" fill="#FF6B2C" opacity="0.9">
                    <animateMotion
                      dur={`${2.6 + i * 0.45}s`}
                      begin={`${i * 0.75}s`}
                      repeatCount="indefinite"
                      path={`M ${CX} ${CY} L ${panel.hub.x} ${panel.hub.y}`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.82;1"
                      dur={`${2.6 + i * 0.45}s`}
                      begin={`${i * 0.75}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {!reduced && inView && (
                  <circle r="0.3" fill="#8B93A1" opacity="0.55">
                    <animateMotion
                      dur={`${5 + i * 0.5}s`}
                      begin={`${i * 1.2}s`}
                      repeatCount="indefinite"
                      path={`M ${panel.hub.x} ${panel.hub.y} L ${CX} ${CY}`}
                    />
                  </circle>
                )}
              </g>
            )
          })}
        </svg>

        {/* Core */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl"
            style={reduced ? undefined : { animation: 'glow-breathe 4.5s ease-in-out infinite alternate' }}
          />
          {[0, 1.2, 2.4].map((delay) =>
            reduced ? null : (
              <span
                key={delay}
                aria-hidden
                className="absolute left-1/2 top-1/2 h-20 w-20 rounded-full border border-accent/40"
                style={{
                  marginLeft: '-40px',
                  marginTop: '-40px',
                  animation: `core-pulse 3.6s ease-out ${delay}s infinite`,
                }}
              />
            ),
          )}
          {reduced ? null : (
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[150px] w-[150px] rounded-full border border-dashed border-accent/30"
              style={{ marginLeft: '-75px', marginTop: '-75px', animation: 'spin-cw 28s linear infinite' }}
            />
          )}
          {reduced ? null : (
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[188px] w-[188px] rounded-full border border-line-strong"
              style={{ marginLeft: '-94px', marginTop: '-94px', animation: 'spin-ccw 44s linear infinite' }}
            />
          )}
          <div
            className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-accent/60 bg-panel shadow-[0_0_50px_rgba(255,107,44,0.25)]"
            style={{
              opacity: inView || reduced ? 1 : 0,
              transform: inView || reduced ? 'scale(1)' : 'scale(0.6)',
              transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
            }}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-accent pulse-dot" />
          </div>
          <p className="mt-3 whitespace-nowrap font-mono text-[9px] tracking-[0.24em] text-muted">
            JAVA
            <br />
            ENGINEERING CORE
          </p>
        </div>

        {/* Category modules */}
        {categories.map(({ id, label, skills, panel }, i) => {
          if (!panel) return null
          const active = highlighted === id
          const dimmed = highlighted !== null && !active
          return (
            <div key={id} className="absolute z-10" style={{ ...panel.style, ...show(0.25 + i * 0.1, panel.slideFrom) }}>
              <button
                type="button"
                data-cursor="node"
                onMouseEnter={() => setHighlighted(id)}
                onMouseLeave={() => setHighlighted(null)}
                onFocus={() => setHighlighted(id)}
                onBlur={() => setHighlighted(null)}
                aria-label={`${label} — ${skills.length} technologies`}
                className={cn(
                  'block w-full rounded-lg border p-3.5 text-left backdrop-blur-sm transition-all duration-300',
                  active
                    ? 'border-accent/60 bg-panel shadow-[0_0_36px_rgba(255,107,44,0.16)] -translate-y-0.5'
                    : dimmed
                      ? 'border-line bg-panel/50 opacity-55'
                      : 'border-line-strong bg-panel/85 hover:border-accent/40',
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em]">
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                        active ? 'bg-accent' : 'bg-muted',
                      )}
                    />
                    <span className={active ? 'text-accent' : 'text-fg'}>{label}</span>
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.18em] text-muted/60">
                    {String(skills.length).padStart(2, '0')} NODES
                  </span>
                </span>
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'whitespace-nowrap rounded-sm border px-2 py-1 font-mono text-[10px] tracking-[0.08em] transition-colors duration-200',
                        active
                          ? 'border-accent/50 bg-accent-dim text-accent2'
                          : 'border-line-strong bg-bg2/70 text-fg/85',
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </span>
              </button>
            </div>
          )
        })}

        {/* Hub junction dots on panel edges */}
        {categories.map(({ id, panel }, i) => {
          if (!panel) return null
          const active = highlighted === id
          return (
            <span
              key={`hub-${id}`}
              aria-hidden
              className="pointer-events-none absolute z-10 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                left: `${panel.hub.x}%`,
                top: `${panel.hub.y}%`,
                borderColor: active ? 'var(--accent)' : 'rgba(245,247,250,0.35)',
                backgroundColor: active ? 'var(--accent-dim)' : 'var(--bg)',
                transitionDelay: `${reduced ? 0 : 0.5 + i * 0.08}s`,
                ...(() => {
                  const visible = inView || reduced
                  return {
                    opacity: visible ? 1 : 0,
                    transform: `translate(-50%,-50%) scale(${visible ? 1 : 0})`,
                    transition:
                      'opacity .5s cubic-bezier(0.16,1,0.3,1), transform .5s cubic-bezier(0.16,1,0.3,1), background-color .3s, border-color .3s',
                  }
                })(),
              }}
            />
          )
        })}
      </div>

      {/* Mobile grouped list */}
      <Reveal className="grid gap-4 sm:grid-cols-2 md:hidden">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.id} className="panel p-5">
            <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {cat.label}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-sm border border-line-strong px-2 py-1 font-mono text-[10px] tracking-[0.1em] text-fg/90"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </>
  )
}
