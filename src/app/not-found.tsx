import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] tracking-[0.3em] text-accent">ERROR 404 — ROUTE NOT FOUND</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl">SYSTEM HALTED.</h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        The requested resource does not exist in this system.
      </p>
      <Link
        href="/"
        data-cursor="link"
        className="mt-10 rounded-sm border border-accent bg-accent px-7 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] text-[#050608] transition-colors hover:bg-accent2"
      >
        RESTART → HOME
      </Link>
    </div>
  )
}
