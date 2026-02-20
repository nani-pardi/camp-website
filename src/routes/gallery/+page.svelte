<script>
  const photos = [
    '/images/camp1.jpg',
    '/images/camp2.jpg',
    '/images/camp3.jpg',
    '/images/camp4.jpg',
    '/images/camp5.jpg',
    '/images/camp6.jpg',
    '/images/camp7.jpg',
    '/images/camp8.jpg',
    '/images/camp9.jpg',
    '/images/camp10.jpg',
    '/images/camp11.jpg',
    '/images/camp12.jpg',
    '/images/camp13.jpg',
    '/images/camp14.jpg',
    '/images/camp15.jpg',
    '/images/camp16.jpg',
    '/images/camp17.jpg',
    '/images/camp18.jpg',
  ];
</script>

<section class="gallery-section">
  <h2>Gallery</h2>
  <p>Venez vous amuser!</p>

  <div class="gallery-grid">
    {#each photos as src}
      <div class="gallery-item">
        <img src={src} alt="Camp photo" />
      </div>
    {/each}
  </div>
</section>

<style>
  .gallery-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1rem;
    text-align: center;
  }

  .gallery-section h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #0055a4;
  }

  .gallery-section p {
    margin-bottom: 2rem;
    color: #64748b;
  }

  /* THIS is the key part */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 per row */
    gap: 1.5rem;
  }

  .gallery-item {
    overflow: hidden;
    border-radius: 18px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }

  .gallery-item img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover img {
    transform: scale(1.08);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .gallery-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
