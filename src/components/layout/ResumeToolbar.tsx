'use client'

import Link from 'next/link'
import { ArrowLeft, Download, Printer } from 'lucide-react'
import { Button, LinkButton } from '@/components/ui/Button'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function ResumeToolbar() {
  return (
    <div className="no-print mx-auto flex max-w-[840px] flex-wrap items-center justify-between gap-4 py-6">
      <LinkButton href="/" variant="ghost" magnetic={false} className="!py-2.5 !text-[10px]">
        <ArrowLeft size={13} />
        BACK TO PORTFOLIO
      </LinkButton>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`${BASE}/Upendra-Rai-Resume.pdf`}
          download="Upendra-Rai-Resume.pdf"
          data-cursor="link"
          className="inline-flex items-center gap-2 rounded-sm border border-accent bg-accent px-4 py-2.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-[#050608] transition-colors duration-300 hover:bg-accent2 hover:border-accent2"
        >
          <Download size={13} />
          DOWNLOAD PDF
        </a>
        <Button variant="ghost" onClick={() => window.print()} className="!py-2.5 !text-[10px]">
          <Printer size={13} />
          PRINT
        </Button>
      </div>
    </div>
  )
}
