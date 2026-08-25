'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight, ChevronDown, FolderGit2 } from 'lucide-react'
import type { CoreNodeInfo } from '@/components/three/EngineeringCore'
import { CoreFallback } from '@/components/three/CoreFallback'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { LazyMount } from '@/components/ui/LazyMount'
import { Magnetic } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'
import { HERO_HUD } from '@/data/architecture'

const EngineeringCore = dynamic(() => import('@/components/three/EngineeringCore'), {
  ssr: false,
})

function HeroCanvas({ onHover }: { onHover: (n: CoreNodeInfo | null) => void }) {
  const webgl = useWebGL()
  const reduced = useReducedMotion()
  const enabled = webgl === true && !reduced

  return (
    <div className="absolute inset-0" aria-hidden={reduced}>
      <ErrorBoundary fallback={<CoreFallback />}>
        <LazyMount className="h-full w-full" fallback={<CoreFallback />}>
          {enabled ? (
            <EngineeringCore onHover={onHover} particleCount={reduced ? 0 : 650} />
          ) : (
            <CoreFallback />
          )}
        </LazyMount>
      </ErrorBoundary>
    </div>
  )
}

export function Hero() {
  const [node, setNode] = useState<CoreNodeInfo | null>(null)

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(255,107,44,0.07), transparent 60%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, #050608 100%)',
        }}
      />

      <HeroCanvas onHover={setNode} />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-5 sm:px-8">
          <p className="eyebrow pointer-events-auto flex items-center gap-3">
            <span className="h-px w-10 bg-accent inline-block" />
            JAVA SOFTWARE ENGINEER
          </p>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.75rem)] font-semibold leading-[1.02] tracking-tight">
            I BUILD SYSTEMS
            <br />
            THAT <span className="text-accent text-glow">SCALE.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Backend systems. Distributed architecture. Payment infrastructure.
            Production-grade software.
          </p>

          <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#engineering"
                data-cursor="link"
                className="inline-flex items-center gap-2 border border-accent bg-accent px-7 py-4 font-mono text-xs font-semibold tracking-[0.18em] text-[#050608] transition-colors duration-300 hover:bg-accent2 hover:border-accent2 rounded-sm"
              >
                EXPLORE MY ENGINEERING
                <ArrowRight size={14} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#projects"
                data-cursor="link"
                className="inline-flex items-center gap-2 border border-line-strong px-7 py-4 font-mono text-xs tracking-[0.18em] text-fg transition-colors duration-300 hover:border-accent hover:text-accent rounded-sm"
              >
                <FolderGit2 size={14} />
                VIEW PROJECTS
              </a>
            </Magnetic>
          </div>

          <div className="mt-14 flex max-w-xl flex-wrap items-center gap-x-5 gap-y-2">
            {HERO_HUD.map((item, i) => (
              <span key={item} className="flex items-center gap-5">
                <span className="font-mono text-[10px] tracking-[0.22em] text-muted">{item}</span>
                {i < HERO_HUD.length - 1 && (
                  <span aria-hidden className="text-[8px] text-muted/50">
                    ●
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Node inspector panel */}
        <div className="absolute bottom-28 right-8 hidden w-72 lg:block" aria-live="polite">
          <div
            className={`panel p-4 transition-all duration-300 ${node ? 'border-accent/40 opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}
          >
            <p className="font-mono text-[9px] tracking-[0.24em] text-accent">
              {node ? `NODE // ${node.label}` : 'SYSTEM CORE'}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-fg/80">
              {node ? node.desc : 'Hover the orbit nodes to inspect subsystems. Click to navigate.'}
            </p>
          </div>
        </div>

        <a
          href="#engineering"
          data-cursor="link"
          aria-label="Scroll to content"
          className="pointer-events-auto absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:flex"
        >
          <span className="font-mono text-[9px] tracking-[0.3em]">SCROLL</span>
          <ChevronDown size={14} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
