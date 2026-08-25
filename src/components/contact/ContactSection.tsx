'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertTriangle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { cn } from '@/lib/utils'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<keyof FormState, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormState): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'
  if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.'
  if (values.message.trim().length < 20) errors.message = 'Message must be at least 20 characters.'
  return errors
}

const TERMINAL_LINES = [
  '$ initiate_connection',
  '> handshake ............ OK',
  '> transport ............ SECURE',
  'STATUS: READY',
]

function Terminal() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (shown >= TERMINAL_LINES.length) return
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 200 : 550)
    return () => clearTimeout(t)
  }, [inView, shown])

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const visible = reduced ? TERMINAL_LINES.length : shown

  return (
    <div ref={ref} className="panel overflow-hidden">
      <p className="flex items-center gap-2 border-b border-line px-5 py-3 font-mono text-[9px] tracking-[0.24em] text-muted">
        <span className="h-2 w-2 rounded-full bg-accent/70" />
        CONTACT.SYS — INTERACTIVE CHANNEL
      </p>
      <pre className="min-h-[132px] p-5 font-mono text-xs leading-loose">
        {TERMINAL_LINES.slice(0, visible).map((line) => (
          <p key={line} className={line.startsWith('STATUS') ? 'text-emerald-300/90' : line.startsWith('$') ? 'text-fg' : 'text-muted'}>
            {line}
          </p>
        ))}
        <span className="caret-blink inline-block h-3.5 w-2 translate-y-0.5 bg-accent" aria-hidden />
      </pre>
    </div>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="font-mono text-[9px] tracking-[0.22em] text-muted">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="mt-1 block text-[11px] text-red-400">
          {error}
        </span>
      ) : null}
    </label>
  )
}

const inputCls =
  'mt-2 w-full rounded-sm border border-line bg-bg2/60 px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/50 transition-colors focus:border-accent/60 focus:outline-none'

export function ContactSection() {
  const [values, setValues] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validate(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, company: '' }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      formRef.current?.reset()
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <Terminal />
        <div className="panel space-y-3 p-6 text-sm">
          <p className="flex justify-between border-b border-line pb-3">
            <span className="font-mono text-[9px] tracking-[0.22em] text-muted">EMAIL</span>
            <a href="mailto:upendrarai02@gmail.com" data-cursor="link" className="transition-colors hover:text-accent">
              upendrarai02@gmail.com
            </a>
          </p>
          <p className="flex justify-between border-b border-line pb-3">
            <span className="font-mono text-[9px] tracking-[0.22em] text-muted">GITHUB</span>
            <a href="https://github.com/upendrarai" target="_blank" rel="noopener noreferrer" data-cursor="link" className="transition-colors hover:text-accent">
              github.com/upendrarai
            </a>
          </p>
          <p className="flex justify-between border-b border-line pb-3">
            <span className="font-mono text-[9px] tracking-[0.22em] text-muted">LINKEDIN</span>
            <a href="https://www.linkedin.com/in/upendrarai" target="_blank" rel="noopener noreferrer" data-cursor="link" className="transition-colors hover:text-accent">
              linkedin.com/in/upendrarai
            </a>
          </p>
          <p className="flex justify-between">
            <span className="font-mono text-[9px] tracking-[0.22em] text-muted">RESUME</span>
            <a href="/resume" data-cursor="link" className="transition-colors hover:text-accent">
              VIEW DOCUMENT →
            </a>
          </p>
        </div>
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="panel space-y-5 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="NAME *" error={errors.name}>
            <input type="text" value={values.name} onChange={set('name')} autoComplete="name" placeholder="Your name" className={cn(inputCls, errors.name && 'border-red-400/60')} />
          </Field>
          <Field label="EMAIL *" error={errors.email}>
            <input type="email" value={values.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" className={cn(inputCls, errors.email && 'border-red-400/60')} />
          </Field>
        </div>
        <Field label="SUBJECT *" error={errors.subject}>
          <input type="text" value={values.subject} onChange={set('subject')} placeholder="Backend role / project inquiry" className={cn(inputCls, errors.subject && 'border-red-400/60')} />
        </Field>
        <Field label="MESSAGE *" error={errors.message}>
          <textarea rows={5} value={values.message} onChange={set('message')} placeholder="Tell me about the system you want to build…" className={cn(inputCls, 'resize-none', errors.message && 'border-red-400/60')} />
        </Field>

        <input type="hidden" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor="link"
          className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-accent bg-accent px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-[#050608] transition-colors duration-300 hover:bg-accent2 disabled:opacity-60 sm:w-auto"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              TRANSMITTING…
            </>
          ) : (
            <>
              <Send size={13} />
              SEND MESSAGE →
            </>
          )}
        </button>

        <p aria-live="polite">
          {status === 'success' && (
            <span className="flex items-center gap-2 text-xs text-emerald-300/90">
              <CheckCircle2 size={14} />
              Message received. Expect a response within 48 hours.
            </span>
          )}
          {status === 'error' && (
            <span className="flex items-center gap-2 text-xs text-red-400">
              <AlertTriangle size={14} />
              Transmission failed. Try again or reach out via email.
            </span>
          )}
        </p>
      </form>
    </div>
  )
}
