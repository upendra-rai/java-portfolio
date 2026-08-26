'use client'

import { forwardRef, useRef, type ReactNode } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 16 })
  const sy = useSpring(y, { stiffness: 180, damping: 16 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  )
}

type Variant = 'primary' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const base =
  'inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase px-6 py-3.5 transition-colors duration-300 rounded-sm'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-[#050608] font-semibold hover:bg-accent2 border border-accent',
  ghost:
    'border border-line-strong text-fg hover:border-accent hover:text-accent bg-transparent',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'ghost', className, children, ...rest },
  ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
})

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  magnetic?: boolean
  children: ReactNode
}

export function LinkButton({
  variant = 'ghost',
  className,
  children,
  magnetic = true,
  href,
  ...rest
}: LinkButtonProps) {
  const isInternal = typeof href === 'string' && href.startsWith('/')
  const link = isInternal ? (
    <Link href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cn(base, variants[variant], className)} {...rest}>
      {children}
    </a>
  )
  return magnetic ? <Magnetic>{link}</Magnetic> : link
}
