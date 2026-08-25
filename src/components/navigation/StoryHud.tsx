'use client'

import { useActiveSection } from '@/hooks/useActiveSection'

const STORY: Array<{ id: string; label: string }> = [
  { id: 'home', label: 'I BUILD SYSTEMS THAT SCALE.' },
  { id: 'engineering', label: "I DON'T JUST WRITE CODE." },
  { id: 'architecture', label: 'I DESIGN SYSTEMS.' },
  { id: 'stack', label: 'THE TOOLS BEHIND THE SYSTEMS.' },
  { id: 'projects', label: 'SYSTEMS IN PRODUCTION.' },
  { id: 'experience', label: 'THE ENGINEERING JOURNEY.' },
  { id: 'principles', label: 'HOW I THINK.' },
  { id: 'contact', label: "LET'S BUILD SOMETHING THAT MATTERS." },
]

export function StoryHud() {
  const ids = STORY.map((s) => s.id)
  const active = useActiveSection(ids)
  const current = STORY.find((s) => s.id === active)

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-6 z-40 hidden items-center gap-3 xl:flex"
    >
      <span className="h-1 w-1 rounded-full bg-accent" />
      <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
        {current?.label ?? STORY[0].label}
      </span>
    </div>
  )
}
