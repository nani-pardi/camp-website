<script>
  let name = ''
  let review = ''
  let anonymous = false
  let submitting = false
  let success = ''

  // Local list so new reviews appear instantly (optimistic UI)
  let reviews = []

  // Your Apps Script Web App URL (must end with /exec)
  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbzGWszMds5L0cAQgYvyUtLxVRKcxMS9AZxTPVxaZZ6XvD7YtvNcwiEgDmvIGLTZJ1lZ2g/exec'

  const MAX_LEN = 600

  function sanitize(text) {
    // Very light display sanitization; GAS should still store safely server-side
    return text.replace(/[<>]/g, '')
  }

  async function handleSubmit() {
    const text = review.trim()
    if (!text) {
      alert('Please write a short review.')
      return
    }
    if (text.length > MAX_LEN) {
      alert(`Please keep reviews under ${MAX_LEN} characters.`)
      return
    }

    submitting = true
    success = ''

    // Build FormData to avoid custom headers (no preflight)
    const fd = new FormData()
    fd.set('name', anonymous ? '' : name) // empty = treat as anonymous on GAS side
    fd.set('review', text)
    fd.set('anonymous', anonymous ? '1' : '0')

    // Optimistic UI: add the review locally first
    const displayName = anonymous || !name.trim() ? 'Anonymous' : name.trim()
    const local = {
      name: displayName,
      text: sanitize(text),
      ts: new Date().toISOString()
    }
    reviews = [local, ...reviews]

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: fd
      })

      // We can’t read the response in no-cors; assume success
      success = 'Thanks! Your review has been submitted.'
      // Reset fields
      name = ''
      review = ''
      anonymous = false
    } catch (err) {
      console.error(err)
      alert('There was a problem submitting your review. Please try again.')
      // Roll back optimistic insert if you want:
      reviews = reviews.filter((r) => r !== local)
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
      placeholder="Leave blank or check anonymous"
      disabled={anonymous}
    />
  </div>

  <div class="field">
    <label class="label" for="reviewText">Your Review</label>
    <textarea
      id="reviewText"
      class="input"
      rows="5"
      bind:value={review}
      maxlength={MAX_LEN}
      placeholder="What did your family love about Alouette?"
      required
    />
    <div class="hint">
      {review.length}/{MAX_LEN}
    </div>
  </div>

  <div class="inline">
    <input id="anonCheck" type="checkbox" bind:checked={anonymous} />
    <label for="anonCheck">Post anonymously</label>
  </div>

  <button class="btn-submit" type="submit" disabled={submitting}>
    {submitting ? 'Submitting…' : 'Submit Review'}
  </button>

  {#if success}
    <div class="success" role="status" aria-live="polite">{success}</div>
  {/if}
</form>

{#if reviews.length}
  <section class="reviews-list">
    {#each reviews as r}
      <article class="review-card">
        <div class="review-head">
          <div class="avatar">{r.name[0]}</div>
          <div class="who">
            <div class="who-name">{r.name}</div>
            <div class="when">{new Date(r.ts).toLocaleDateString()}</div>
          </div>
        </div>
        <p class="review-text">{r.text}</p>
      </article>
    {/each}
  </section>
{:else}
  <p class="empty">Be the first to leave a review!</p>
{/if}

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
    margin: 0 auto 1.5rem auto;
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
    resize: vertical;
  }
  .input:focus {
    border-color: #1b2b6b;
    box-shadow: 0 0 0 3px rgba(27, 43, 107, 0.15);
  }
  .hint {
    font-size: 0.8rem;
    color: #64748b;
    text-align: right;
    margin-top: 0.25rem;
  }
  .inline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
  .btn-submit:hover { transform: translateY(-1px); }
  .btn-submit:disabled { opacity: 0.7; transform: none; cursor: not-allowed; }

  .success {
    margin-top: 0.5rem;
    color: #155e75;
    background: #ecfeff;
    border: 1px solid #a5f3fc;
    border-radius: 12px;
    padding: 0.75rem 0.9rem;
    font-weight: 600;
  }

  .reviews-list {
    max-width: 820px;
    margin: 0.5rem auto 2rem auto;
    display: grid;
    gap: 0.9rem;
  }
  .review-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 1rem 1.1rem;
    box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04), 0 6px 12px rgba(15, 23, 42, 0.08);
  }
  .review-head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #1b2b6b;
    color: #fff;
    display: grid;
    place-items: center;
    font-weight: 900;
  }
  .who-name { font-weight: 800; color: #0f172a; }
  .when { font-size: 0.8rem; color: #64748b; }
  .review-text { color: #334155; margin-top: 0.25rem; }

  .empty {
    text-align: center;
    color: #64748b;
    margin: 1rem 0 2rem;
  }
</style>
