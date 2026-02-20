import { json } from '@sveltejs/kit'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwU4JzuRyLH9qYDHUUTvkBuvYkGUrQhvEbyrxX8MNaBGZOw6t36bdCCCD9yaQFibzJdtw/exec'

export async function POST({ request }) {
  try {
    const payload = await request.json()

    const name = String(payload?.name ?? '').trim()
    const email = String(payload?.email ?? '').trim()
    const review = String(payload?.review ?? '').trim()

    if (!review) return json({ ok: false, error: 'Review is required.' }, { status: 400 })
    if (review.length > 600)
      return json({ ok: false, error: 'Review must be 600 characters or less.' }, { status: 400 })

    if (email && !/^\S+@\S+\.\S+$/.test(email))
      return json({ ok: false, error: 'Invalid email.' }, { status: 400 })

    const body = new URLSearchParams()
    body.set('name', name)   // can be blank
    body.set('email', email) // can be blank
    body.set('review', review)

    const resp = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body
    })

    const text = await resp.text()

    try {
      const data = JSON.parse(text)
      return json(data, { status: resp.ok ? 200 : 502 })
    } catch {
      return json(
        { ok: false, error: 'Apps Script did not return JSON.', raw: text.slice(0, 300) },
        { status: 502 }
      )
    }
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Server error in /api/reviews.' }, { status: 500 })
  }
}