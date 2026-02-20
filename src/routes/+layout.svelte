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
          <div class="header-title">
            Alouette French Language Camp
          </div>
          <div style="font-size:.75rem;color:rgba(255,255,255,.85)">Language learning on a whole new level - FUN!</div>
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
    </div>
  </header>

  <main class="container" style="padding-block:2.5rem">
    <slot />
  </main>

  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <div class="display" style="font-size:1.15rem">Alouette French Language Camp</div>
        <p style="color:#ffffff;font-size:.95rem;margin-top:.35rem">
          Language learning on a whole new level - FUN!
        </p>
      </div>
      <div>
        <div style="font-weight:800;margin-bottom:.5rem">Info</div>
        <ul style="color:#64748b;padding:0;list-style:none;display:grid;gap:.25rem">
          <li>Willows Academy</li>
          <li>Two weeks in July • 9:30–3:00 PM</li>
          <li>Ages 4–13 • All levels</li>
        </ul>
      </div>
      <div>
        <div style="font-weight:800;margin-bottom:.5rem">Contact</div>
        <ul style="color:#64748b;padding:0;list-style:none;display:grid;gap:.25rem">
          <li>Email: alouettecamp@gmail.com</li>
          <li>Phone: (773) 627-6449</li>
        </ul>
      </div>
    </div>
    <div class="smallprint">© {new Date().getFullYear()} Alouette French Camp</div>
  </footer>
</div>
