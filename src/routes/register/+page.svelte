<script>
  let name = ''
  let age = ''
  let campweek = 'week1' // week1 | both
  let parentEmail = ''
  let school = ''

  let lunchOptIn = false
  let allergies = ''
  let aboutChild = ''

  let submitting = false
  let result = null // { ok, status, campLabel, error }

  // Payment display (edit these)
  const ZELLE_HANDLE = 'alouettecamp@gmail.com'
  const VENMO_URL = 'https://venmo.com/pascale-burns' // <-- replace
  const PAYMENT_NOTE = 'Memo: Alouette Camp + Child name + Week option'

  async function handleSubmit() {
    result = null

    if (!name || !age || !campweek || !parentEmail || !school) {
      alert('Please fill out all required fields.')
      return
    }

    submitting = true
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          age: String(age),
          campweek,
          parentEmail,
          school,
          lunchOptIn: lunchOptIn ? 'yes' : 'no',
          allergies,
          aboutChild
        })
      })

      const data = await res.json()
      result = data

      if (data?.ok && data?.status === 'Registered') {
        name = ''
        age = ''
        campweek = 'week1'
        parentEmail = ''
        school = ''
        lunchOptIn = false
        allergies = ''
        aboutChild = ''
      }
    } catch (err) {
      console.error(err)
      result = { ok: false, error: 'There was a problem submitting the form. Please try again.' }
    } finally {
      submitting = false
    }
  }
</script>

<div class="page">
  <h2 class="register-title">Register Your Child</h2>

  <form class="form-card" on:submit|preventDefault={handleSubmit} novalidate>
    <div class="field">
      <label class="label" for="child-name">Child's Name</label>
      <input
        id="child-name"
        class="input"
        bind:value={name}
        placeholder="e.g., Marie Dupont"
        autocomplete="name"
        required
      />
    </div>

    <div class="field">
      <label class="label" for="age">Age</label>
      <input
        id="age"
        class="input"
        type="number"
        min="3"
        max="13"
        bind:value={age}
        placeholder="e.g., 9"
        required
      />
    </div>

    <div class="field">
      <label class="label" for="campweek">Camp Option</label>
      <select id="campweek" class="input" bind:value={campweek} required>
        <option value="week1">One Week (Week 1: July 14–18)</option>
        <option value="both">Both Weeks (July 14–18 & July 21–25)</option>
      </select>
    </div>

    <div class="field">
      <label class="label" for="parent-email">Parent Email</label>
      <input
        id="parent-email"
        class="input"
        type="email"
        bind:value={parentEmail}
        placeholder="name@example.com"
        autocomplete="email"
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

    <div class="field">
      <label class="checkline">
        <input type="checkbox" bind:checked={lunchOptIn} />
        <span>Add healthy international-themed lunch (+$60/week)</span>
      </label>
    </div>

    <div class="field">
      <label class="label" for="allergies">Allergies / Dietary Needs</label>
      <textarea
        id="allergies"
        class="input textarea"
        rows="3"
        bind:value={allergies}
        placeholder="Any allergies or dietary needs we should know about?"
      ></textarea>
    </div>

    <div class="field">
      <label class="label" for="aboutChild">Anything you'd like us to know about your child?</label>
      <textarea
        id="aboutChild"
        class="input textarea"
        rows="4"
        bind:value={aboutChild}
        placeholder="Share anything that helps us support your child (interests, sensitivities, etc.)"
      ></textarea>
    </div>

    <button class="btn-submit" type="submit" disabled={submitting}>
      {submitting ? 'Registering…' : 'Register'}
    </button>

    <!-- Result box (keeps the clean aesthetic) -->
    {#if result}
      {#if result.ok && result.status === 'Registered'}
        <div class="notice success">
          <div class="notice-title">✅ Registration Confirmed</div>
          <p class="notice-text">
            You’re confirmed for <strong>{result.campLabel}</strong>. A confirmation email was sent to
            <strong>{parentEmail}</strong>.
          </p>

          <div class="paybox">
            <div class="payhead">Payment</div>
            <div class="payline"><strong>Zelle:</strong> {ZELLE_HANDLE}</div>
            <div class="payline">
              <strong>Venmo:</strong>
              <a href={VENMO_URL} target="_blank" rel="noreferrer">Pay with Venmo</a>
            </div>
            <div class="payline"><strong>Memo:</strong> {PAYMENT_NOTE}</div>
          </div>
        </div>
      {:else if result.ok && result.status === 'Waitlist'}
        <div class="notice waitlist">
          <div class="notice-title">⏳ Waitlist</div>
          <p class="notice-text">
            We’re currently at capacity (30 campers). You’ve been added to the waitlist for
            <strong>{result.campLabel}</strong>. We’ll email you if a spot opens.
          </p>
        </div>
      {:else}
        <div class="notice error">
          <div class="notice-title">❌ Submission Problem</div>
          <p class="notice-text">{result.error || 'Please try again.'}</p>
        </div>
      {/if}
    {/if}
  </form>
</div>

<style>
  /* Page background like your screenshot */
  .page {
    padding: 0.5rem 0 2.5rem;
  }

  /* Big blue Playfair title */
  .register-title {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(2.1rem, 4vw, 3.2rem);
    text-align: center;
    color: var(--blue);
    margin: 0.75rem 0 1.5rem;
    font-weight: 800;
  }

  /* White card, soft shadow, big radius */
  .form-card {
    max-width: 860px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 22px;
    padding: 2rem 2.25rem;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    display: grid;
    gap: 1.1rem;
  }

  .field {
    display: grid;
    gap: 0.5rem;
  }

  .label {
    font-weight: 800;
    font-size: 1.1rem;
    color: #0f172a;
  }

  /* Light blue border inputs like screenshot */
  .input {
    width: 100%;
    padding: 0.95rem 1.1rem;
    border-radius: 14px;
    border: 2px solid rgba(148, 163, 184, 0.45);
    background: #fff;
    outline: none;
    font-size: 1.05rem;
  }

  .input::placeholder {
    color: rgba(100, 116, 139, 0.8);
  }

  .input:focus {
    border-color: rgba(0, 85, 164, 0.55);
    box-shadow: 0 0 0 4px rgba(0, 85, 164, 0.12);
  }

  .textarea {
    resize: vertical;
    min-height: 110px;
  }

  .hint {
    margin-top: 0.1rem;
    font-size: 0.92rem;
    color: #64748b;
  }

  .checkline {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    font-weight: 700;
    color: #0f172a;
  }
  .checkline input {
    margin-top: 0.3rem;
    transform: scale(1.1);
  }

  /* Big red pill button like screenshot */
  .btn-submit {
    width: 100%;
    margin-top: 0.75rem;
    padding: 1.1rem 1rem;
    border: 0;
    border-radius: 18px;
    font-weight: 900;
    font-size: 1.2rem;
    color: #fff;
    background: var(--red);
    cursor: pointer;
    box-shadow: 0 10px 18px rgba(239, 65, 53, 0.25);
    transition: transform 0.12s ease, opacity 0.2s ease;
  }

  .btn-submit:hover {
    transform: translateY(-1px);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Result boxes: still clean & within card */
  .notice {
    margin-top: 0.5rem;
    border-radius: 16px;
    padding: 1rem 1.1rem;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(248, 250, 252, 0.7);
  }

  .notice-title {
    font-weight: 900;
    margin-bottom: 0.35rem;
  }

  .notice-text {
    color: #0f172a;
  }

  .notice.success {
    border-color: rgba(34, 197, 94, 0.35);
    background: rgba(34, 197, 94, 0.06);
  }

  .notice.waitlist {
    border-color: rgba(245, 158, 11, 0.45);
    background: rgba(245, 158, 11, 0.08);
  }

  .notice.error {
    border-color: rgba(239, 68, 68, 0.4);
    background: rgba(239, 68, 68, 0.06);
  }

  .paybox {
    margin-top: 0.75rem;
    border-radius: 14px;
    padding: 0.85rem 0.95rem;
    background: #fff;
    border: 1px solid rgba(148, 163, 184, 0.35);
  }

  .payhead {
    font-weight: 900;
    margin-bottom: 0.35rem;
  }

  .payline {
    margin-top: 0.2rem;
    color: #0f172a;
  }

  .payline a {
    color: var(--blue);
    text-decoration: underline;
    font-weight: 800;
  }
</style>