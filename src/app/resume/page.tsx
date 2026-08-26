import type { Metadata } from 'next'
import Link from 'next/link'
import { RESUME } from '@/data/about'
import { ResumeToolbar } from '@/components/layout/ResumeToolbar'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume of Upendra Rai — Software Development Engineer.',
  alternates: { canonical: '/resume' },
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="r-title font-mono text-[11px] font-bold tracking-[0.22em] text-orange-700">
      {children}
    </h2>
  )
}

export default function ResumePage() {
  return (
    <div className="min-h-screen px-4 pb-20 pt-6 sm:px-8">
      <div className="mx-auto w-full max-w-[840px]">
        <ResumeToolbar />

        <article className="resume-doc rounded-lg bg-white p-5 text-black shadow-2xl sm:p-8 md:p-12">
          {/* Header */}
          <header>
            <h1 className="text-3xl font-bold tracking-tight">{RESUME.name}</h1>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em]">
              {RESUME.role}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-neutral-600">
              <span>{RESUME.contact.phone}</span>
              <a href={`mailto:${RESUME.contact.email}`}>{RESUME.contact.email}</a>
              <a
                href={`https://${RESUME.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {RESUME.contact.linkedin}
              </a>
              <a
                href={`https://${RESUME.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span>{RESUME.contact.location}</span>
            </p>
          </header>

          {/* Summary */}
          <section className="resume-sec mt-5">
            <SectionTitle>SUMMARY</SectionTitle>
            <p className="mt-1.5 leading-relaxed">{RESUME.summary}</p>
          </section>

          {/* Skills */}
          <section className="resume-sec mt-5">
            <SectionTitle>SKILLS</SectionTitle>
            <p className="mt-1.5 leading-relaxed">
              {Object.values(RESUME.skills).join(', ')}
            </p>
          </section>

          {/* Experience */}
          <section className="resume-sec mt-5">
            <SectionTitle>EXPERIENCE</SectionTitle>
            {RESUME.experience.map((item) => (
              <div key={item.title} className="resume-item mt-3 border-l-2 border-orange-600/70 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="font-mono text-[11px] text-neutral-500">{item.period}</p>
                </div>
                <p className="text-xs font-semibold text-neutral-700">{item.subtitle}</p>
                {'lead' in item && item.lead ? (
                  <p className="mt-1 text-[13px] italic leading-snug text-neutral-600">{item.lead}</p>
                ) : null}
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4 leading-snug">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="resume-sec resume-projects mt-5">
            <SectionTitle>PROJECTS</SectionTitle>
            {RESUME.projects.map((project) => (
              <div key={project.name} className="resume-item mt-3 border-l-2 border-orange-600/70 pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <p className="text-sm font-bold">
                    {project.name}
                    {project.note ? (
                      <span className="ml-2 rounded-sm bg-orange-100 px-1.5 py-0.5 align-middle font-mono text-[9px] uppercase tracking-wider text-orange-700">
                        {project.note}
                      </span>
                    ) : null}
                  </p>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-blue-700 underline"
                    >
                      {project.link.replace('https://', '')}
                    </a>
                  ) : null}
                </div>
                <p className="mt-1 text-[13px] leading-snug text-neutral-700">
                  {project.description}
                </p>
                <ul className="mt-1.5 list-disc space-y-0.5 pl-4 leading-snug">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {project.modules ? (
                  <p className="mt-1 text-[12px] text-neutral-700">
                    <span className="font-bold">Modules:</span> {project.modules}
                  </p>
                ) : null}
                <p className="mt-0.5 text-[12px] text-neutral-700">
                  <span className="font-bold">Technologies:</span> {project.tech}
                </p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="resume-sec mt-5">
            <SectionTitle>EDUCATION</SectionTitle>
            {RESUME.education.map((edu) => (
              <div
                key={edu.school}
                className="resume-item mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5"
              >
                <div>
                  <p className="text-sm font-bold">{edu.school}</p>
                  <p className="text-xs text-neutral-600">
                    {edu.degree} · <span className="font-bold text-neutral-800">{edu.score}</span>
                  </p>
                </div>
                <p className="font-mono text-[11px] text-neutral-500">{edu.period}</p>
              </div>
            ))}
          </section>

          {/* Strengths */}
          <section className="resume-sec mt-5">
            <SectionTitle>STRENGTHS</SectionTitle>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {RESUME.strengths.map((strength) => (
                <div key={strength.title} className="resume-item rounded-md border border-neutral-200 p-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-neutral-800">
                    {strength.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-neutral-600">
                    {strength.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="resume-sec mt-6 border-t border-neutral-300 pt-3">
            <p className="text-[10px] text-neutral-500">
              Full case studies at{' '}
              <Link href="/" className="underline">
                https://upendra-rai.github.io/java-portfolio/
              </Link>{' '}
              — references available on request.
            </p>
          </footer>
        </article>
      </div>
    </div>
  )
}
