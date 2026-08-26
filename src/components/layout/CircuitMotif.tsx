'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'

export function CircuitMotif({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <svg viewBox="0 0 320 320" className={className ?? 'h-full w-full'} aria-hidden>
      <defs>
        <radialGradient id="aboutGlow">
          <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="160" r="150" fill="url(#aboutGlow)" />

      {/* Static rings */}
      <circle cx="160" cy="160" r="60" fill="none" stroke="rgba(245,247,250,0.14)" strokeWidth="0.8" />
      <circle cx="160" cy="160" r="92" fill="none" stroke="rgba(245,247,250,0.14)" strokeWidth="0.8" strokeDasharray="4 7" />
      <circle cx="160" cy="160" r="124" fill="none" stroke="rgba(245,247,250,0.14)" strokeWidth="0.8" />

      {/* Core */}
      <circle cx="160" cy="160" r="40" fill="none" stroke="#FF6B2C" strokeWidth="1.2" />
      <circle cx="160" cy="160" r="18" fill="none" stroke="#F5F7FA" strokeWidth="0.9" opacity="0.85" />
      <circle cx="160" cy="160" r="5" fill="#FF6B2C" />

      {/* Spokes + nodes */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = ((-90 + i * 60) * Math.PI) / 180
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        const x1 = 160 + 40 * cos
        const y1 = 160 + 40 * sin
        const x2 = 160 + 124 * cos
        const y2 = 160 + 124 * sin
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(139,147,161,0.35)"
              strokeWidth="0.7"
            />
            <rect
              x={x2 - 4}
              y={y2 - 4}
              width="8"
              height="8"
              rx="1.5"
              fill="#101319"
              stroke="rgba(255,107,44,0.55)"
              strokeWidth="0.8"
              className="circuit-node"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
          </g>
        )
      })}

      {/* Running dashed rings */}
      <g opacity={reduced ? '0.9' : undefined}>
        <circle
          cx="160"
          cy="160"
          r="140"
          fill="none"
          stroke="rgba(255,107,44,0.5)"
          strokeWidth="1"
          pathLength={1}
          strokeDasharray="6 10"
          className="circuit-run"
        />
        <circle
          cx="160"
          cy="160"
          r="108"
          fill="none"
          stroke="rgba(245,247,250,0.35)"
          strokeWidth="0.8"
          pathLength={1}
          strokeDasharray="3 9"
          className="circuit-run-rev"
        />
      </g>

      {/* Orbiting data dots */}
      {!reduced && (
        <>
          <circle r="3" fill="#FF6B2C">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M 160 20 A 140 140 0 1 1 159.99 20 Z"
            />
          </circle>
          <circle r="2.2" fill="#F5F7FA" opacity="0.8">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 220 160 A 60 60 0 1 1 219.99 160 Z"
            />
          </circle>
        </>
      )}
    </svg>
  )
}
