import { json } from '@sveltejs/kit'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwt22D2PY4OVqNsS0tROLJ6K4b36k6ZRD82pjIONroXo5dnWimFssRbT8NLRPmxAaMC/exec'

// Receives JSON -> forwards as x-www-form-urlencoded -> returns Apps Script JSON
export async function POST({ request }) {
  try {
    const payload = await request.json()

    // Basic validation (match your form field names)
    const required = ['name', 'email', 'age', 'grade', 'why', 'recommender', 'week', 'position']
    for (const field of required) {
      if (!payload?.[field]) {
        return json({ ok: false, error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Convert JSON -> x-www-form-urlencoded (Apps Script doPost reads e.parameter)
    const body = new URLSearchParams()
    for (const [k, v] of Object.entries(payload)) {
      body.set(k, String(v ?? ''))
    }

    const resp = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body
    })

    const text = await resp.text()

    // Parse Apps Script response as JSON (so you can debug errors)
    try {
      const data = JSON.parse(text)
      return json(data, { status: resp.ok ? 200 : 502 })
    } catch {
      return json(
        {
          ok: false,
          error: 'Apps Script did not return JSON.',
          raw: text,
          status: resp.status,
          statusText: resp.statusText,
          rawPreview: text.slice(0, 300)
        },
        { status: 502 }
      )
    }
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Server error in /api/jobs.' }, { status: 500 })
  }
}
