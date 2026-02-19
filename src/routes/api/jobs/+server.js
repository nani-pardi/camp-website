import { json } from '@sveltejs/kit'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzVm1DSqe84C8Az_HDcdMbo_qZOM1wqqn3gQbCaBcHS7zoPaXF4j59Ay4viDv7H9Jns/exec'

export async function POST({ request }) {
  try {
    const formData = await request.formData()

    // Basic validation
    const required = ['name', 'email', 'age', 'grade', 'why', 'recommender', 'week', 'position']
    for (const field of required) {
      if (!formData.get(field)) {
        return json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
      }
    }

    // Forward to Apps Script
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      throw new Error('Apps Script error')
    }

    return json({ ok: true })
  } catch (err) {
    console.error(err)
    return json({ ok: false, error: 'Submission failed.' }, { status: 500 })
  }
}

// export async function POST({ request }) {
//   try {
//     const formData = await request.formData()

//     // Basic validation
//     const required = ['name', 'email', 'age', 'grade', 'why', 'recommender', 'week', 'position']
//     for (const field of required) {
//       if (!formData.get(field)) {
//         return json({ ok: false, error: 'Missing required fields.' }, { status: 400 })
//       }
//     }

//     // Forward to Apps Script
//     const res = await fetch(GOOGLE_SCRIPT_URL, {
//       method: 'POST',
//       body: formData
//     })

//     if (!res.ok) {
//       throw new Error('Apps Script error')
//     }

//     return json({ ok: true })
//   } catch (err) {
//     console.error(err)
//     return json({ ok: false, error: 'Submission failed.' }, { status: 500 })
//   }
// }
