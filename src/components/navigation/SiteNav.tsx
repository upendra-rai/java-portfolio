'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const progress = useScrollProgress()
  const active = useActiveSection(NAV_LINKS.map((l) => l.href.slice(1)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-2.5' : 'py-5',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 transition-all duration-500',
            scrolled &&
              'mx-3 max-w-[calc(100%-1.5rem)] rounded-lg border border-line bg-bg/80 px-4 py-2 backdrop-blur-md md:mx-6 md:max-w-[calc(100%-3rem)]',
          )}
        >
          <a href="#home" data-cursor="link" className="group flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line-strong">
              <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">{SITE.name.toUpperCase()}</span>
              <span className="block font-mono text-[9px] tracking-[0.24em] text-muted">
                JAVA SOFTWARE ENGINEER
              </span>
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-cursor="link"
                className={cn(
                  'font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 hover:text-fg',
                  active === link.href.slice(1) ? 'text-accent' : 'text-muted',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 xl:flex" aria-hidden>
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="font-mono text-[9px] tracking-[0.2em] text-muted">
              ● AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="p-2 text-muted transition-colors hover:text-fg lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left bg-accent/60 transition-transform duration-300"
            style={{ transform: `scaleX(${scrolled ? Math.max(progress * 1.15 - 0.02, 0) : 0})` }}
          />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-mono text-[10px] tracking-[0.24em] text-muted">MENU</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 text-muted transition-colors hover:text-fg"
              >
                <X size={24} />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col items-center justify-center gap-7">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    'font-mono text-xl tracking-[0.28em]',
                    active === link.href.slice(1) ? 'text-accent' : 'text-fg',
                  )}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mt-8 flex items-center gap-2"
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
