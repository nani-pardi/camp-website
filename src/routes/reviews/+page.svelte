<script>
  let name = ''
  let email = ''
  let review = ''

  let submitting = false
  let result = null // { ok, error? }

  const MAX_LEN = 600

  async function handleSubmit() {
    result = null

    const text = review.trim()
    if (!text) {
      alert('Please write a short review.')
      return
    }
    if (text.length > MAX_LEN) {
      alert(`Please keep reviews under ${MAX_LEN} characters.`)
      return
    }

    // If email is filled, do a light check
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      alert('Please enter a valid email (or leave it blank).')
      return
    }

    submitting = true
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email, // optional
          review: text
        })
      })

      const data = await res.json()
      result = data

      if (data?.ok) {
        name = ''
        email = ''
        review = ''
      }
    } catch (err) {
      console.error(err)
      result = { ok: false, error: 'There was a problem submitting your review. Please try again.' }
    } finally {
      submitting = false
    }
  }
</script>

<h2 class="reviews-title">Parent Reviews</h2>

<form class="form-card" on:submit|preventDefault={handleSubmit} novalidate>
  <div class="field">
    <label class="label" for="reviewerName">Your Name (optional)</label>
    <input
      id="reviewerName"
      class="input"
      bind:value={name}
      placeholder="Leave blank to post as Anonymous"
      autocomplete="name"
    />
  </div>

  <div class="field">
    <label class="label" for="reviewerEmail">Your Email (optional)</label>
    <input
      id="reviewerEmail"
      class="input"
      type="email"
      bind:value={email}
      placeholder="name@example.com"
      autocomplete="email"
    />
  </div>

  <div class="field">
    <label class="label" for="reviewText">Your Review</label>
    <textarea
      id="reviewText"
      class="input textarea"
      rows="6"
      bind:value={review}
      maxlength={MAX_LEN}
      placeholder="What did your family love about Alouette?"
      required
    />
    <div class="hint right">{review.length}/{MAX_LEN}</div>
  </div>

  <button class="btn-submit" type="submit" disabled={submitting}>
    {submitting ? 'Submitting…' : 'Submit Review'}
  </button>

  {#if result}
    {#if result.ok}
      <div class="success" role="status" aria-live="polite">
        ✅ Thanks! Your review has been submitted.
      </div>
    {:else}
      <div class="notice error" role="alert">
        <div class="notice-title">❌ Submission Problem</div>
        <p class="notice-text">{result.error || 'Please try again.'}</p>
      </div>
    {/if}
  {/if}
</form>

<style>
  .reviews-title {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    text-align: center;
    color: var(--blue, #1b2b6b);
    margin: 0 0 1.25rem 0;
  }

  .form-card {
    max-width: 640px;
    margin: 0 auto 2rem auto;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 1.75rem;
    box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04), 0 8px 18px rgba(15, 23, 42, 0.1);
    display: grid;
    gap: 1rem;
  }

  .field { display: grid; gap: 0.35rem; }
  .label { font-weight: 700; color: #334155; }

  .input {
    width: 100%;
    padding: 0.75rem 0.9rem;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    outline: none;
    background: #fff;
  }

  .textarea { resize: vertical; min-height: 140px; }

  .input:focus {
    border-color: #1b2b6b;
    box-shadow: 0 0 0 3px rgba(27, 43, 107, 0.15);
  }

  .hint {
    font-size: 0.85rem;
    color: #64748b;
    margin-top: 0.15rem;
  }
  .hint.right { text-align: right; }

  .btn-submit {
    width: 100%;
    padding: 0.9rem 1rem;
    border: 0;
    border-radius: 14px;
    font-weight: 800;
    color: #fff;
    background: #f5123b;
    cursor: pointer;
    box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04), 0 8px 18px rgba(15, 23, 42, 0.1);
    transition: transform 0.15s ease, opacity 0.2s ease;
  }
  .btn-submit:hover { transform: translateY(-1px); }
  .btn-submit:disabled { opacity: 0.7; transform: none; cursor: not-allowed; }

  .success {
    color: #155e75;
    background: #ecfeff;
    border: 1px solid #a5f3fc;
    border-radius: 12px;
    padding: 0.75rem 0.9rem;
    font-weight: 700;
  }

  .notice {
    border-radius: 12px;
    padding: 0.85rem 0.95rem;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(248, 250, 252, 0.7);
  }
  .notice-title { font-weight: 900; margin-bottom: 0.35rem; }
  .notice-text { color: #0f172a; margin: 0; }
  .notice.error { border-color: rgba(232, 18, 18, 0.4); background: rgba(239, 68, 68, 0.06); }
</style>