<script setup>
const hobbies = [
  {
    title: 'Manga',
    description: 'Tracking what I read on MyAnimeList.',
    linkLabel: 'View my list',
    href: 'https://myanimelist.net/mangalist/azanirr?status=7&order=4&order2=0',
  },
  {
    title: 'Books',
    description: 'My reading log on Goodreads.',
    linkLabel: 'View my shelf',
    href: 'https://www.goodreads.com/user/show/100494350-azani-ramadhan',
  },
]
</script>

<template>
  <section id="hobbies" v-reveal class="section container">
    <h2 class="eyebrow">Hobbies</h2>

    <div class="grid">
      <article v-for="hobby in hobbies" :key="hobby.title" class="card hobby">
        <h3 class="headline">{{ hobby.title }}</h3>
        <p class="body ink-muted">{{ hobby.description }}</p>
        <a
          v-magnetic
          :href="hobby.href"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary"
        >{{ hobby.linkLabel }}</a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-lg);
}

.hobby {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-sm);
}

.hobby .btn {
  margin-top: var(--space-xs);
}

@media (max-width: 810px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
