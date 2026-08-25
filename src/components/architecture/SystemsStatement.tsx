'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function SystemsStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-6%', '3%'])

  return (
    <section id="engineering" ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow">/01 — ENGINEERING PHILOSOPHY</p>

        <h2 className="sr-only">I don&apos;t just write code. I design systems.</h2>

        <div aria-hidden className="mt-10 select-none">
          <motion.p
            style={{ x: x1 }}
            className="text-[clamp(2rem,6vw,4.75rem)] font-semibold tracking-tight text-muted/60"
          >
            I DON&apos;T JUST WRITE CODE.
          </motion.p>
          <motion.p
            style={{ x: x2 }}
            className="mt-2 text-[clamp(2.4rem,7.5vw,6rem)] font-semibold tracking-tight"
          >
            I DESIGN <span className="text-accent text-glow">SYSTEMS.</span>
          </motion.p>
        </div>

        <p className="mt-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          From API design and database modeling to distributed workflows, payment
          processing, caching, deployment, monitoring and production operations.
        </p>
      </div>
    </section>
  )
}
