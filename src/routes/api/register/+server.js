import { json } from '@sveltejs/kit'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz0w_I1GgHDO3iHF6O78FLIsIefrrF5FxbIm6lH-9eDSkYHc-lNmiNkMakqcs9b89KYlg/exec'
// This endpoint receives JSON from your Svelte form,
// forwards it to Apps Script as form-encoded,
// then returns Apps Script’s JSON back to the browser.
export async function POST({ request }) {
  try {
    const payload = await request.json()

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

    // Apps Script should respond with JSON text.
    // If it doesn't, return a helpful error (so debugging is easier).
    try {
      const data = JSON.parse(text)
      return json(data, { status: resp.ok ? 200 : 502 })
    } catch {
      return json(
        {
          ok: false,
          error: 'Apps Script did not return JSON.',
          raw: text
        },
        { status: 502 }
      )
    }
  } catch (err) {
    console.error(err)
    return json(
      {
        ok: false,
        error: 'Server error in /api/register.'
      },
      { status: 500 }
    )
  }
}
