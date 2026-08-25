import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const name = asString(payload.name, 120)
  const email = asString(payload.email, 200)
  const subject = asString(payload.subject, 200)
  const message = asString(payload.message, 5000)
  const honeypot = asString(payload.company, 50)

  // Honeypot filled → almost certainly a bot. Accept quietly, do nothing.
  if (honeypot) {
    return NextResponse.json({ ok: true })
  }

  if (name.length < 2 || !EMAIL_RE.test(email) || subject.length < 3 || message.length < 20) {
    return NextResponse.json({ ok: false, error: 'Validation failed.' }, { status: 400 })
  }

  // Wire a real transport by setting CONTACT_WEBHOOK_URL in the environment.
  // Without it, the submission is validated and acknowledged but goes nowhere.
  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, source: 'portfolio', receivedAt: new Date().toISOString() }),
      })
    } catch (err) {
      console.error('contact relay failed:', err)
      return NextResponse.json({ ok: false, error: 'Delivery failed.' }, { status: 502 })
    }
  }

  return NextResponse.json({ ok: true })
}
