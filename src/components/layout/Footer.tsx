import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { SITE } from '@/lib/constants'

const LINKS = [
  { label: 'GitHub', href: SITE.github, icon: Github },
  { label: 'LinkedIn', href: SITE.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: Mail },
  { label: 'Resume', href: '/resume', icon: FileText },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-wide">{SITE.name.toUpperCase()}</p>
          <p className="mt-1 font-mono text-[10px] tracking-[0.24em] text-muted">
            JAVA SOFTWARE ENGINEER
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
          {LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              data-cursor="link"
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              <Icon size={12} />
              {label.toUpperCase()}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted">
            © 2026 Upendra Rai
          </p>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
            SYSTEM ONLINE
          </p>
        </div>
      </div>
    </footer>
  )
}
