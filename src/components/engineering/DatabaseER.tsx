'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { DbEntity } from '@/data/database'
import { DB_ENTITIES } from '@/data/database'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { LazyMount } from '@/components/ui/LazyMount'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGL } from '@/hooks/useWebGL'
import { cn } from '@/lib/utils'

const DatabaseScene = dynamic(() => import('@/components/three/DatabaseScene'), { ssr: false })

function EntityInspector({ entity }: { entity: DbEntity | null }) {
  return (
    <aside className="panel p-5 lg:sticky lg:top-28 lg:self-start" aria-live="polite">
      <p className="font-mono text-[9px] tracking-[0.24em] text-accent">SCHEMA INSPECTOR</p>
      <p className="mt-3 font-mono text-sm tracking-wide">{entity ? entity.table : 'HOVER AN ENTITY'}</p>
      <div className="mt-4 space-y-4 text-xs">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-muted">PRIMARY KEY</p>
          <code className="mt-1 block font-mono text-fg/85">{entity ? entity.primaryKey : '—'}</code>
        </div>
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-muted">FIELDS</p>
          <ul className="mt-1.5 space-y-1">
            {(entity?.fields ?? ['—']).map((f) => (
              <li key={f} className="font-mono text-fg/75">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-muted">RELATIONSHIPS</p>
          <ul className="mt-1.5 space-y-1">
            {(entity?.relationships ?? ['—']).map((r) => (
              <li key={r} className="text-fg/75">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-muted">INDEXES</p>
          <ul className="mt-1.5 space-y-1">
            {(entity?.indexes ?? ['—']).map((idx) => (
              <li key={idx} className="font-mono text-accent2/80">
                {idx}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export function DatabaseER() {
  const [entity, setEntity] = useState<DbEntity | null>(null)
  const webgl = useWebGL()
  const reduced = useReducedMotion()
  const enabled = webgl === true && !reduced

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <LazyMount
          className={cn('panel overflow-hidden', enabled && 'h-[420px] lg:h-[500px]')}
          fallback={<div aria-hidden className="h-[420px] lg:h-[500px]" />}
        >
          {enabled ? (
            <ErrorBoundary fallback={<div aria-hidden className="h-full" />}>
              <DatabaseScene onHover={setEntity} particleCount={reduced ? 0 : 220} />
            </ErrorBoundary>
          ) : null}
        </LazyMount>
        <EntityInspector entity={entity} />
      </div>

      {/* Accessible entity summary — exists outside the canvas by design */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DB_ENTITIES.map((e) => {
          const active = entity?.id === e.id
          return (
            <button
              key={e.id}
              type="button"
              data-cursor="node"
              onMouseEnter={() => setEntity(e)}
              onMouseLeave={() => setEntity(null)}
              onFocus={() => setEntity(e)}
              onBlur={() => setEntity(null)}
              className={cn(
                'rounded-sm border p-3 text-left transition-colors duration-200',
                active ? 'border-accent/60 bg-accent-dim' : 'border-line bg-panel hover:border-line-strong',
              )}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] text-fg">{e.table}</p>
              <p className="mt-1 font-mono text-[9px] text-muted">{e.primaryKey}</p>
              <p className="mt-1 truncate font-mono text-[9px] text-muted/70">{e.relationships.join(' · ')}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
