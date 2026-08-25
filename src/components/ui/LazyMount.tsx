'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface LazyMountProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  rootMargin?: string
}

/**
 * Mounts heavy children (e.g. WebGL canvases) only while near the viewport.
 * Unmounts when scrolled far away so animation loops never run offscreen.
 */
export function LazyMount({
  children,
  fallback = null,
  className,
  rootMargin = '300px',
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={cn('relative', className)}>
      {active ? children : fallback}
    </div>
  )
}
