'use client'

import { useEffect, useMemo, useState } from 'react'
import { Check, Copy, FileCode2 } from 'lucide-react'
import { CODE_SAMPLES } from '@/data/codeLab'
import { tokenizeLine } from '@/lib/highlight'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

function CodeBlock({ code, playAnimation }: { code: string; playAnimation: boolean }) {
  const lines = useMemo(() => code.split('\n'), [code])
  const [visible, setVisible] = useState(playAnimation ? 1 : lines.length)

  useEffect(() => {
    if (!playAnimation) {
      setVisible(lines.length)
      return
    }
    setVisible(1)
    const step = Math.max(14, Math.min(420 / lines.length, 40))
    const interval = setInterval(() => {
      setVisible((v) => {
        if (v >= lines.length) {
          clearInterval(interval)
          return v
        }
        return v + 1
      })
    }, step)
    return () => clearInterval(interval)
  }, [code, lines.length, playAnimation])

  return (
    <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed" tabIndex={0}>
      <code>
        {lines.map((line, i) => (
          <span
            key={i}
            className={cn('flex transition-opacity duration-200', i >= visible ? 'opacity-0' : 'opacity-100')}
          >
            <span aria-hidden className="w-9 shrink-0 select-none pr-4 text-right text-muted/40">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {tokenizeLine(line).map((tok, ti) => (
                <span key={ti} className={tok.cls}>
                  {tok.text}
                </span>
              ))}
              {'\n'}
            </span>
          </span>
        ))}
      </code>
    </pre>
  )
}

export function CodeLab() {
  const [activeId, setActiveId] = useState(CODE_SAMPLES[0].id)
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)

  const active = CODE_SAMPLES.find((s) => s.id === activeId) ?? CODE_SAMPLES[0]
  const playedRef = useMemo(() => new Set<string>(), [])
  const shouldAnimate = !reduced && inView && !playedRef.has(active.id)

  useEffect(() => {
    if (shouldAnimate) playedRef.add(active.id)
  }, [shouldAnimate, active.id, playedRef])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(active.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div role="tablist" aria-label="Code examples" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {CODE_SAMPLES.map((sample) => (
          <button
            key={sample.id}
            role="tab"
            aria-selected={sample.id === activeId}
            onClick={() => setActiveId(sample.id)}
            className={cn(
              'shrink-0 border px-4 py-2.5 text-left font-mono text-[10px] tracking-[0.16em] transition-all duration-300 rounded-sm',
              sample.id === activeId
                ? 'border-accent/60 bg-accent-dim text-accent'
                : 'border-line text-muted hover:border-line-strong hover:text-fg',
            )}
          >
            {sample.tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted">
            <FileCode2 size={13} className="text-accent" />
            {active.file}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] tracking-[0.2em] text-muted/70 border border-line rounded-sm px-1.5 py-0.5">
              JAVA
            </span>
            <button
              type="button"
              onClick={copy}
              data-cursor="code"
              aria-label="Copy code"
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
        </div>

        <p className="border-b border-line bg-bg2/60 px-5 py-2 text-xs text-muted">{active.description}</p>

        <CodeBlock key={active.id} code={active.code} playAnimation={shouldAnimate} />
      </div>
    </div>
  )
}
