<script>
  const staff = [
    {
      name: 'Pascale Burns',
      role: 'Camp Director',
      blurb: `French Camp is lovingly dedicated to my parents, Marie Rose Raoul† and Joseph Raoul, Jr., who inspired in me, from a very young age, a deep love and excitement for learning languages—especially French.

At Alouette French Camp, our mission is simple: to spark the joy of language learning in a way that meets children exactly where they are developmentally. On the very first day of camp, we talk about the incredible benefits of knowing more than one language. From there, we set individual, attainable goals with each camper—and that’s when the real magic begins.

Our approach is guided by the Pareto Principle, or the 80/20 rule: by focusing on high-frequency words, foundational grammar, and training the ear to understand language in context, children absorb more than you might imagine. Year after year, both campers and parents are genuinely amazed at how much is learned in just two short weeks.

Founded in 2007, Alouette French Camp has been going strong for over 17 years. We would love for your child to join us. I can confidently say it will be one of the most fun and productive two weeks of the summer.

Vive le Français!`,

      photo: '/images/director_headshot.jpg'
    }
  ];
</script>

<h2 class="staff-title">Letter From the Director</h2>

<section class="staff-wrap">
  {#each staff as m}
    <article class="staff-card">
      {#if m.photo}
        <img class="avatar" src={m.photo} alt={`${m.name} headshot`} />
      {:else}
        <div class="avatar placeholder" aria-hidden="true">{m.name[0]}</div>
      {/if}

      <div class="content">
        <div class="name">{m.name}</div>
        <div class="role">{m.role}</div>
        {#if m.blurb}
          <p class="blurb">{m.blurb}</p>
        {/if}
      </div>
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

  .staff-wrap {
    max-width: 980px;
    margin: 0 auto 2rem auto;
    padding: 0 1rem;
  }

  .staff-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 1px 1px rgba(15, 23, 42, 0.04),
      0 10px 25px rgba(15, 23, 42, 0.12);

    display: flex;
    gap: 2.25rem;
    align-items: flex-start;
  }

  /* BIGGER image, not squished */
  .avatar {
    width: 280px;      /* increase/decrease as you like */
    height: auto;      /* keeps natural proportions */
    border-radius: 20px;
    object-fit: cover; /* safe even if browser sizes */
    flex-shrink: 0;    /* prevents it from shrinking */
    background: #f1f5f9;
    display: block;
  }

  .avatar.placeholder {
    width: 280px;
    height: 280px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    color: #fff;
    background: #1b2b6b;
    font-weight: 900;
    font-size: 3rem;
  }

  .content {
    min-width: 0;
  }

  .name {
    font-weight: 900;
    font-size: 1.35rem;
    color: #0f172a;
    margin-bottom: 0.25rem;
  }

  .role {
    color: #64748b;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .blurb {
    color: #334155;
    line-height: 1.65;
    margin: 0;
  }

  /* Mobile: stack, still keep big image */
  @media (max-width: 768px) {
    .staff-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem;
    }

    .avatar {
      width: min(340px, 100%);
    }

    .avatar.placeholder {
      width: min(340px, 100%);
      height: 240px;
    }
  }
</style>
