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
  ]
</script>

<h2 class="text-center font-heading text-3xl text-campblue">Gallery</h2>
<p class="mt-2 mb-8 text-center text-gray-600">A peek at activities, crafts, and all the fun!</p>

<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
  {#each photos as src}
    <figure class="group overflow-hidden rounded-2xl border bg-white shadow-card">
      <img
        {src}
        alt="Camp photo"
        class="h-56 w-full object-cover transition group-hover:scale-105"
      />
    </figure>
  {/each}
</div>
