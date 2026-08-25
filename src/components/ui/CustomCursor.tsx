'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Copy, Crosshair } from 'lucide-react'

type CursorMode = 'default' | 'link' | 'node' | 'code'

const MODE_LABELS: Record<CursorMode, string> = {
  default: '',
  link: '',
  node: 'INSPECT',
  code: 'COPY',
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    let raf = 0
    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const marked = target.closest('[data-cursor]')
      if (marked) {
        setMode(marked.getAttribute('data-cursor') as CursorMode)
        return
      }
      const interactive = target.closest('a, button, input, textarea, select, [role="button"]')
      setMode(interactive ? 'link' : 'default')
    }

    const onLeave = () => setVisible(false)

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.16
      ring.y += (pos.y - ring.y) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${pos.x + 34}px, ${pos.y - 6}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  const expanded = mode !== 'default'
  const label = MODE_LABELS[mode]

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-accent"
        style={{ marginLeft: -2, marginTop: -2 }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300"
        style={{
          width: expanded ? 52 : 30,
          height: expanded ? 52 : 30,
          marginLeft: expanded ? -26 : -15,
          marginTop: expanded ? -26 : -15,
          borderColor:
            mode === 'node' || mode === 'code'
              ? 'var(--accent)'
              : 'rgba(245,247,250,0.4)',
          backgroundColor:
            mode === 'node' || mode === 'code' ? 'var(--accent-dim)' : 'transparent',
        }}
      >
        {mode === 'link' && <ArrowUpRight size={13} className="text-accent" />}
        {mode === 'node' && <Crosshair size={13} className="text-accent" />}
        {mode === 'code' && <Copy size={12} className="text-accent" />}
      </div>
      {label ? (
        <div
          ref={labelRef}
          className="absolute left-0 top-0 font-mono text-[9px] tracking-[0.22em] text-accent"
        >
          {label}
        </div>
      ) : null}
    </div>
  )
}
