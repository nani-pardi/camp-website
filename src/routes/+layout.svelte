<script>
  import '../app.css'
  let open = false
</script>

<div>
  <div class="site-topbar"></div>

  <header class="site-header">
    <div class="container navbar">
      <a href="/" class="brand">
        <img
  src="/images/camplogo.JPG"
  alt="Alouette French Camp logo"
  class="brandmark"
          />

        <div>
          <div style="font-family:'Playfair Display',serif;font-size:1.25rem">
            Alouette French Camp
          </div>
          <div style="font-size:.7rem;color:#64748b">Summer language adventures</div>
        </div>
      </a>

      <nav class="nav">
        <a href="/">Home</a>
        <a href="/staff">Staff</a>
        <a href="/register">Register</a>
        <a href="/jobs">Jobs</a>
        <a href="/reviews">Reviews</a>
        <a href="/gallery">Gallery</a>
      </nav>

      <a href="/register" class="btn btn-primary cta">Register Now</a>

      <button class="burger" aria-label="Toggle menu" on:click={() => (open = !open)}>
        <svg
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg
        >
      </button>
    </div>

    <div class:open={open} class="menu">
      <div class="container stack" style="padding:12px 0">
        <a href="/" on:click={() => (open = false)}>Home</a>
        <a href="/staff" on:click={() => (open = false)}>Staff</a>
        <a href="/register" on:click={() => (open = false)}>Register</a>
        <a href="/jobs" on:click={() => (open = false)}>Jobs</a>
        <a href="/reviews" on:click={() => (open = false)}>Reviews</a>
        <a href="/gallery" on:click={() => (open = false)}>Gallery</a>
        <a
          href="/register"
          on:click={() => (open = false)}
          class="btn btn-primary"
          style="justify-content:center">Register Now</a
        >
      </div>
    </div>
  </header>

  <main class="container" style="padding-block:2.5rem">
    <slot />
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <div class="display" style="font-size:1.15rem">Alouette French Camp</div>
        <p style="color:#64748b;font-size:.95rem;margin-top:.35rem">
          Language learning has never been so fun!
        </p>
      </div>
      <div>
        <div style="font-weight:800;margin-bottom:.5rem">Info</div>
        <ul style="color:#64748b;padding:0;list-style:none;display:grid;gap:.25rem">
          <li>Willows Academy</li>
          <li>Two weeks in July • 9:30–3:00 PM</li>
          <li>Ages 4–14 • All levels</li>
        </ul>
      </div>
      <div>
        <div style="font-weight:800;margin-bottom:.5rem">Contact</div>
        <ul style="color:#64748b;padding:0;list-style:none;display:grid;gap:.25rem">
          <li>Email: alouettecamp@gmail.com</li>
          <li>Phone: (555) 123-4567</li>
        </ul>
      </div>
    </div>
    <div class="smallprint">© {new Date().getFullYear()} Alouette French Camp</div>
  </footer>
</div>
