<script>
  // --- form state ---
  let name = ''
  let email = ''
  let age = ''
  let grade = ''
  let why = ''
  let recommender = ''
  let week = ''
  let experience = ''
  let submitting = false

  let success = ''
  let showModal = false

  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbzVm1DSqe84C8Az_HDcdMbo_qZOM1wqqn3gQbCaBcHS7zoPaXF4j59Ay4viDv7H9Jns/exec'

  const WEEKS = [
    { value: '1', label: 'Week 1 (July 14–18)' },
    { value: '2', label: 'Week 2 (July 21–25)' },
    { value: 'both', label: 'Both weeks' }
  ]

  function clearForm() {
    name = ''
    email = ''
    age = ''
    grade = ''
    why = ''
    recommender = ''
    week = ''
    experience = ''
  }

  async function handleSubmit() {
    if (!name || !email || !age || !grade || !why || !recommender || !week) {
      alert('Please complete all required fields.')
      return
    }

    submitting = true
    success = ''

    const fd = new FormData()
    fd.set('name', name)
    fd.set('email', email)
    fd.set('age', String(age))
    fd.set('grade', grade)
    fd.set('why', why)
    fd.set('recommender', recommender)
    fd.set('week', week)
    fd.set('experience', experience)

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: fd
      })

      success = 'Thanks! Your application has been submitted.'
      clearForm()
      scrollTo({ top: 0, behavior: 'smooth' })
      showModal = true
    } catch (err) {
      console.error(err)
      alert('There was a problem submitting your application. Please try again.')
    } finally {
      submitting = false
    }
  }

  function closeModal() {
    showModal = false
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeModal()
  }
</script>

<svelte:window on:keydown={onKeydown} />

<h2 class="jobs-title">Job Opportunities</h2>

<!-- Info cards unchanged -->
<div class="jobs-grid">
  <section class="info-card">
    <h3 class="info-head">Counselor Training (ages 14–16)</h3>
    <p class="info-text">
      $250 per week. Learn leadership, teamwork, and teaching skills while assisting with younger
      campers.
    </p>
  </section>
  <section class="info-card">
    <h3 class="info-head">Paid Counselors (17+)</h3>
    <p class="info-text">
      Join our staff team and get paid while helping create an unforgettable camp experience.
    </p>
  </section>
  <section class="info-card">
    <h3 class="info-head">Enrollment Limits</h3>
    <p class="info-text">
      First 30 campers only — so staff roles are limited as well. Apply early to secure your spot!
    </p>
  </section>
</div>

<h3 class="apply-title">Apply to Join the Team</h3>

<form class="form-card" on:submit|preventDefault={handleSubmit} novalidate>
  <div class="field">
    <label class="label" for="name">Full Name</label>
    <input id="name" class="input" bind:value={name} required placeholder="Your full name" />
  </div>

  <div class="field">
    <label class="label" for="email">Email</label>
    <input
      id="email"
      class="input"
      type="email"
      bind:value={email}
      required
      placeholder="you@example.com"
    />
  </div>

  <div class="row">
    <div class="field">
      <label class="label" for="age">Age</label>
      <input id="age" class="input" type="number" min="14" max="99" bind:value={age} required />
    </div>
    <div class="field">
      <label class="label" for="grade">Grade</label>
      <input id="grade" class="input" bind:value={grade} required placeholder="e.g., 10th" />
    </div>
  </div>

  <div class="field">
    <label class="label" for="week">Which week(s) do you want to work?</label>
    <select id="week" class="input" bind:value={week} required>
      <option value="" disabled selected>Select an option</option>
      {#each WEEKS as w}
        <option value={w.value}>{w.label}</option>
      {/each}
    </select>
  </div>

  <div class="field">
    <label class="label" for="why">Why do you want to be a counselor?</label>
    <textarea
      id="why"
      class="input"
      rows="4"
      bind:value={why}
      required
      placeholder="Tell us what excites you about the role"
    />
  </div>

  <div class="field">
    <label class="label" for="recommender">Recommender (name and contact)</label>
    <input
      id="recommender"
      class="input"
      bind:value={recommender}
      required
      placeholder="Teacher/coach name and email or phone"
    />
  </div>

  <div class="field">
    <label class="label" for="experience">Past experience (optional)</label>
    <textarea
      id="experience"
      class="input"
      rows="3"
      bind:value={experience}
      placeholder="Any prior camps, tutoring, childcare, or leadership experience"
    />
  </div>

  <button class="btn-submit" type="submit" disabled={submitting}>
    {submitting ? 'Submitting…' : 'Submit Application'}
  </button>

  {#if success}
    <div class="success" role="status" aria-live="polite">{success}</div>
  {/if}
</form>

<!-- Success modal -->
{#if showModal}
  <div class="modal-backdrop" on:click={closeModal} />
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="thanks-title">
    <h4 id="thanks-title" class="modal-title">Thanks for applying!</h4>
    <p class="modal-text">
      We’ve received your application and will contact you at <strong>{email}</strong>.
    </p>
    <div class="modal-actions">
      <button class="btn-primary" on:click={closeModal}>Close</button>
      <a class="btn-link" href="/">Back to Home</a>
    </div>
  </div>
{/if}

<style>
  .jobs-title {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    text-align: center;
    color: var(--blue, #1b2b6b);
    margin: 0 0 1.25rem 0;
  }

  .jobs-grid {
    max-width: 980px;
    margin: 0 auto 1.5rem auto;
    display: grid;
    gap: 1rem;
  }
  @media (min-width: 840px) { .jobs-grid { grid-template-columns: repeat(3, 1fr); } }

  .info-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 1.25rem;
    box-shadow: 0 1px 1px rgba(15,23,42,.04), 0 8px 18px rgba(15,23,42,.10);
  }
  .info-head { color: #c31333; font-weight: 800; margin: 0 0 .35rem 0; }
  .info-text { color: #334155; }

  .apply-title {
    text-align: center;
    font-weight: 900;
    color: #0f172a;
    margin: 1.5rem 0 .75rem 0;
  }

  .form-card {
    max-width: 680px;
    margin: 0 auto 2rem auto;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 1.75rem;
    box-shadow: 0 1px 1px rgba(15,23,42,.04), 0 8px 18px rgba(15,23,42,.10);
    display: grid;
    gap: 1rem;
  }
  .row { display: grid; gap: 1rem; }
  @media (min-width: 640px) { .row { grid-template-columns: 1fr 1fr; } }

  .field { display: grid; gap: .35rem; }
  .label { font-weight: 700; color: #334155; }
  .input {
    width: 100%;
    padding: .75rem .9rem;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    outline: none;
    background: #fff;
  }
  .input:focus { border-color: #1b2b6b; box-shadow: 0 0 0 3px rgba(27,43,107,.15); }

  .btn-submit {
    width: 100%;
    padding: .9rem 1rem;
    border: 0;
    border-radius: 14px;
    font-weight: 800;
    color: #fff;
    background: #c31333;
    cursor: pointer;
    box-shadow: 0 1px 1px rgba(15,23,42,.04), 0 8px 18px rgba(15,23,42,.10);
    transition: transform .15s ease, background .2s ease, color .2s ease, opacity .2s ease;
  }
  .btn-submit:hover { transform: translateY(-1px); }
  .btn-submit:disabled { opacity: .7; transform: none; cursor: not-allowed; }

  .success {
    margin-top: .6rem;
    color: #155e75;
    background: #ecfeff;
    border: 1px solid #a5f3fc;
    border-radius: 12px;
    padding: .75rem .9rem;
    font-weight: 600;
  }

  /* Modal */
  .modal-backdrop {
    position: fixed; inset: 0; background: rgba(15,23,42,.45);
    backdrop-filter: blur(2px);
  }
  .modal {
    position: fixed; inset: 0; display: grid; place-items: center; padding: 1rem;
  }
  .modal > * {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 16px;
    box-shadow: 0 10px 30px rgba(15,23,42,.25); max-width: 520px; width: 100%;
    padding: 1.25rem 1.25rem;
  }
  .modal-title { font-size: 1.15rem; margin: 0 0 .35rem 0; font-weight: 900; color: #0f172a; }
  .modal-text { color: #334155; margin: 0 0 .9rem 0; }
  .modal-actions { display: flex; gap: .5rem; justify-content: flex-end; }
  .btn-primary {
    appearance: none; border: 0; border-radius: 12px; padding: .6rem .9rem;
    background: #1b2b6b; color: #fff; font-weight: 800; cursor: pointer;
  }
  .btn-link { color: #1b2b6b; text-decoration: none; font-weight: 800; padding: .6rem .5rem; }
</style>