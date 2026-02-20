import { json } from '@sveltejs/kit'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyl-jtGqkBJjemBmnsBN79q8pgodRgNELYvD8wSMY2kB59wh8APpORdYTF8YrKBZDDW0Q/exec'

export async function POST({ request }) {
  try {
    const payload = await request.json()

    // basic validation
    const review = String(payload?.review ?? '').trim()
    const anonymous = payload?.anonymous ? '1' : '0'
    const name = anonymous === '1' ? '' : String(payload?.name ?? '').trim()

    if (!review) {
      return json({ ok: false, error: 'Review is required.' }, { status: 400 })
    }
    if (review.length > 600) {
      return json({ ok: false, error: 'Review must be 600 characters or less.' }, { status: 400 })
    }

    // Convert JSON -> x-www-form-urlencoded for Apps Script
    const body = new URLSearchParams()
    body.set('name', name)
    body.set('review', review)
    body.set('anonymous', anonymous)

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