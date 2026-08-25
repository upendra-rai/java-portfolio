'use client'

import { useState } from 'react'
import { Loader2, Send, TerminalSquare, TriangleAlert } from 'lucide-react'
import { API_ENDPOINTS, type ApiEndpoint } from '@/data/database'
import { tokenizeJson } from '@/lib/highlight'
import { cn } from '@/lib/utils'

const METHOD_STYLES: Record<ApiEndpoint['method'], string> = {
  GET: 'border-emerald-400/50 text-emerald-300/90',
  POST: 'border-accent/60 text-accent',
}

function JsonView({ value }: { value: object }) {
  const text = JSON.stringify(value, null, 2)
  return (
    <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed">
      <code>
        {tokenizeJson(text).map((tok, i) => (
          <span key={i} className={tok.cls}>
            {tok.text}
          </span>
        ))}
      </code>
    </pre>
  )
}

export function ApiExplorer() {
  const [selected, setSelected] = useState<ApiEndpoint>(API_ENDPOINTS[0])
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [latency, setLatency] = useState(0)

  const send = () => {
    if (state === 'sending') return
    setState('sending')
    const ms = 380 + Math.floor(Math.random() * 320)
    setLatency(ms)
    setTimeout(() => setState('done'), ms)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Endpoint list */}
      <div className="panel divide-y divide-line overflow-hidden lg:self-start">
        <p className="flex items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.22em] text-muted">
            <TerminalSquare size={12} className="text-accent" />
            ENDPOINTS
          </span>
          <span className="flex items-center gap-1.5 border border-amber-400/50 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.18em] text-amber-300/90 rounded-sm">
            <TriangleAlert size={9} />
            DEMO API
          </span>
        </p>
        {API_ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.id}
            type="button"
            onClick={() => {
              setSelected(endpoint)
              setState('idle')
            }}
            aria-current={endpoint.id === selected.id}
            className={cn(
              'block w-full px-4 py-3 text-left transition-colors duration-200 hover:bg-bg2',
              endpoint.id === selected.id && 'bg-bg2',
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  'border px-1.5 py-0.5 font-mono text-[8px] tracking-[0.14em] rounded-sm',
                  METHOD_STYLES[endpoint.method],
                )}
              >
                {endpoint.method}
              </span>
              <span className="truncate font-mono text-[11px] text-fg/90">{endpoint.path}</span>
            </span>
            <span className="mt-1 block truncate pl-1 text-[11px] text-muted">{endpoint.description}</span>
          </button>
        ))}
      </div>

      {/* Request / Response */}
      <div className="space-y-5">
        <div className="panel overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
            <span
              className={cn(
                'border px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] rounded-sm',
                METHOD_STYLES[selected.method],
              )}
            >
              {selected.method}
            </span>
            <code className="font-mono text-xs text-fg/90">{selected.path}</code>
            <button
              type="button"
              onClick={send}
              disabled={state === 'sending'}
              data-cursor="link"
              className="ml-auto inline-flex items-center gap-2 border border-accent bg-accent px-4 py-1.5 font-mono text-[10px] font-semibold tracking-[0.16em] text-[#050608] transition-colors duration-300 hover:bg-accent2 disabled:opacity-60 rounded-sm"
            >
              {state === 'sending' ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Send size={11} />
              )}
              SEND
            </button>
          </div>
          {selected.request ? (
            <JsonView value={{ headers: { Authorization: 'Bearer <jwt>', 'Idempotency-Key': '<uuid>' }, body: selected.request }} />
          ) : (
            <JsonView value={{ headers: { Authorization: 'Bearer <jwt>' } }} />
          )}
        </div>

        <div className="panel overflow-hidden" aria-live="polite">
          <p className="border-b border-line px-5 py-3 font-mono text-[9px] tracking-[0.22em] text-muted">
            RESPONSE{' '}
            {state === 'done' && (
              <span className="text-emerald-300/90">— 200 OK • {latency}MS (SIMULATED)</span>
            )}
          </p>
          {state === 'done' ? (
            <JsonView value={selected.response} />
          ) : (
            <p className="px-5 py-8 text-center font-mono text-[10px] tracking-[0.2em] text-muted/60">
              {state === 'sending' ? 'PROCESSING REQUEST…' : 'PRESS SEND TO EXECUTE'}
            </p>
          )}
        </div>

        <p className="font-mono text-[9px] leading-relaxed tracking-[0.14em] text-muted/60">
          VISUAL DEMONSTRATION ONLY. NO REAL ENDPOINTS ARE CALLED AND NO CREDENTIALS EXIST ON THIS PAGE.
        </p>
      </div>
    </div>
  )
}
