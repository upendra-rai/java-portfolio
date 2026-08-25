import type { Metadata } from 'next'
import Link from 'next/link'
import { RESUME } from '@/data/about'
import { ResumeToolbar } from '@/components/layout/ResumeToolbar'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Upendra Rai — Java Software Engineer.',
  alternates: { canonical: '/resume' },
}

export default function ResumePage() {
  return (
    <div className="min-h-screen px-4 pb-20 pt-6 sm:px-8">
      <div className="mx-auto w-full max-w-[840px]">
        <ResumeToolbar />

        {/* Document viewer */}
        <article className="rounded-lg bg-white p-8 text-black shadow-2xl sm:p-12">
          <header className="border-b-2 border-black pb-6">
            <h1 className="text-3xl font-bold tracking-tight">UPENDRA RAI</h1>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em]">
              Java Software Engineer
            </p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-neutral-600">
              <span>hello@upendrarai.dev</span>
              <span>github.com/upendrarai</span>
              <span>linkedin.com/in/upendrarai</span>
            </p>
          </header>

          <section className="mt-7">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.22em] text-orange-700">SUMMARY</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-800">{RESUME.summary}</p>
          </section>

          <section className="mt-7">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.22em] text-orange-700">EXPERIENCE</h2>
            {RESUME.experience.map((item) => (
              <div key={item.title} className="mt-4 border-l-2 border-orange-600/70 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="font-mono text-[11px] text-neutral-500">{item.period}</p>
                </div>
                <p className="text-xs font-medium text-neutral-600">{item.subtitle}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-neutral-800">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-7">
            <h2 className="font-mono text-[11px] font-bold tracking-[0.22em] text-orange-700">TECHNICAL SKILLS</h2>
            <dl className="mt-3 space-y-1.5 text-sm">
              {Object.entries(RESUME.skills).map(([group, value]) => (
                <div key={group} className="flex gap-3">
                  <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-wider text-neutral-500 pt-0.5">
                    {group}
                  </dt>
                  <dd className="leading-relaxed text-neutral-800">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <footer className="mt-9 border-t border-neutral-300 pt-4">
            <p className="text-[11px] text-neutral-500">
              Full case studies at{' '}
              <Link href="/" className="underline">
                upendrarai.dev
              </Link>{' '}
              — references available on request.
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}
