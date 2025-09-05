<script>
  let name = ''
  let age = ''
  let campweek = ''
  let parentEmail = ''
  let school = ''

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbw2qwr6IR3zO6d96RY_94FpDJYSuHHGRUPwF-31GNjD_14UnjQtKrwGBuSatbk_Uoyy0Q/exec'

  let submitting = false

  async function handleSubmit() {
    if (!name || !age || !campweek || !parentEmail || !school) {
      alert('Please fill out all fields.')
      return
    }

    submitting = true

    // Use FormData to avoid custom headers (no preflight)
    const fd = new FormData()
    fd.set('name', name)
    fd.set('age', String(age))
    fd.set('campweek', String(campweek))
    fd.set('parentEmail', parentEmail)
    fd.set('school', school)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',      // prevents CORS error but makes the response opaque
        body: fd
      })

      // We can't inspect the response in no-cors; show optimistic success:
      alert(`Registered ${name} (Age: ${age}). Confirmation will be sent to ${parentEmail}.`)

      name = ''
      age = ''
      campweek = ''
      parentEmail = ''
      school = ''
    } catch (err) {
      console.error(err)
      alert('There was a problem submitting the form. Please try again.')
    } finally {
      submitting = false
    }
  }
</script>


<h2 class="register-title">Register Your Child</h2>

<form class="form-card" on:submit|preventDefault={handleSubmit} novalidate>
  <div class="field">
    <label class="label" for="child-name">Child's Name</label>
    <input
      id="child-name"
      class="input"
      bind:value={name}
      placeholder="e.g., Marie Dupont"
      required
    />
  </div>

  <div class="field">
    <label class="label" for="age">Age</label>
    <input
      id="age"
      class="input"
      type="number"
      min="4"
      max="18"
      bind:value={age}
      placeholder="e.g., 9"
      required
    />
  </div>

  <div class="field">
    <label class="label" for="campweek">Camp Week</label>
    <input
      id="campweek"
      class="input"
      type="number"
      min="1"
      max="2"
      bind:value={campweek}
      placeholder="1 or 2"
      required
    />
  </div>

  <div class="field">
    <label class="label" for="parent-email">Parent Email</label>
    <input
      id="parent-email"
      class="input"
      type="email"
      bind:value={parentEmail}
      placeholder="name@example.com"
      required
    />
  </div>

  <div class="field">
    <label class="label" for="school">School</label>
    <input
      id="school"
      class="input"
      bind:value={school}
      placeholder="e.g., Willows Academy"
      required
    />
  </div>

  <button class="btn-submit" type="submit" disabled={submitting}>
    {submitting ? 'Registering…' : 'Register'}
  </button>
</form>

<style>
  /* Simple, Prettier-friendly styles that align with your site’s vibe */
  .register-title {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    text-align: center;
    color: var(--blue, #1b2b6b);
    margin: 0 0 1.25rem 0;
  }

  .form-card {
    max-width: 640px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 1.75rem;
    box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04), 0 8px 18px rgba(15, 23, 42, 0.1);
    display: grid;
    gap: 1rem;
  }

  .field {
    display: grid;
    gap: 0.35rem;
  }

  .label {
    font-weight: 700;
    color: #334155;
  }

  .input {
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    outline: none;
  }

  .input:focus {
    border-color: #1b2b6b;
    box-shadow: 0 0 0 3px rgba(27, 43, 107, 0.15);
  }

  .btn-submit {
    width: 100%;
    padding: 0.9rem 1rem;
    border: 0;
    border-radius: 14px;
    font-weight: 800;
    color: #fff;
    background: #c31333;
    cursor: pointer;
    box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04), 0 8px 18px rgba(15, 23, 42, 0.1);
    transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
  }

  .btn-submit:hover {
    transform: translateY(-1px);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    transform: none;
    cursor: not-allowed;
  }
</style>
