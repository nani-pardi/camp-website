<script>
  const staff = [
    {
      name: 'Pascale Burns',
      role: 'Camp Director',
      blurb:
        'Camp Founder and Director.',
      photo: '/images/staff/sarah.jpg'
    },
    {
      name: 'Tom Lee',
      role: 'Activities Coordinator',
      blurb:
        'Designs our science, sports, and game-show blocks—keeping every day fresh and active.',
      photo: '/images/staff/tom.jpg'
    },
    {
      name: 'Maria Gomez',
      role: 'Counselor',
      blurb:
        'Brings warmth, creativity, and music to the classroom so all levels feel confident.',
      photo: '/images/staff/maria.jpg'
    }
  ]
</script>

<h2 class="staff-title">Meet Our Staff</h2>

<section class="staff-grid">
  {#each staff as m}
    <article class="staff-card">
      <div class="head">
        {#if m.photo}
          <img class="avatar" src={m.photo} alt={`${m.name} headshot`} />
        {:else}
          <div class="avatar placeholder" aria-hidden="true">{m.name[0]}</div>
        {/if}
        <div>
          <div class="name">{m.name}</div>
          <div class="role">{m.role}</div>
        </div>
      </div>
      {#if m.blurb}<p class="blurb">{m.blurb}</p>{/if}
    </article>
  {/each}
</section>

<style>
  .staff-title {
    font-family: 'Playfair Display', ui-serif, Georgia, serif;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    text-align: center;
    color: var(--blue, #1b2b6b);
    margin: 0 0 1.25rem 0;
  }
  .staff-grid {
    max-width: 980px;
    margin: 0 auto 2rem auto;
    display: grid;
    gap: 1rem;
  }
  @media (min-width: 840px) {
    .staff-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .staff-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 18px;
    padding: 1.25rem;
    box-shadow: 0 1px 1px rgba(15,23,42,.04), 0 8px 18px rgba(15,23,42,.10);
    display: grid;
    gap: .5rem;
  }
  .head { display: flex; gap: .9rem; align-items: center; }
  .avatar {
    width: 64px; height: 64px; border-radius: 16px; object-fit: cover;
    background: #f1f5f9;
  }
  .avatar.placeholder {
    display: grid; place-items: center; color: #fff; background: #1b2b6b; font-weight: 900;
  }
  .name { font-weight: 900; color: #0f172a; }
  .role { color: #64748b; font-size: .9rem; }
  .blurb { color: #334155; }
</style>
