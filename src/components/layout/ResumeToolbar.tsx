'use client'

import Link from 'next/link'
import { ArrowLeft, Printer } from 'lucide-react'
import { Button, LinkButton } from '@/components/ui/Button'

export function ResumeToolbar() {
  return (
    <div className="no-print mx-auto flex max-w-[840px] flex-wrap items-center justify-between gap-4 py-6">
      <LinkButton href="/" variant="ghost" magnetic={false} className="!py-2.5 !text-[10px]">
        <ArrowLeft size={13} />
        BACK TO PORTFOLIO
      </LinkButton>
      <Button variant="primary" onClick={() => window.print()} className="!py-2.5 !text-[10px]">
        <Printer size={13} />
        PRINT / SAVE AS PDF
      </Button>
    </div>
  )
}
