<template>
  <section id="top" class="section hero container">
    <p class="eyebrow">Front End Engineer</p>
    <h1 class="display-xxl">Azani Ramadhan</h1>
    <p class="subhead ink-muted hero-subhead">
      Building scalable web applications with Vue, React, and Nuxt — 5+ years shipping
      reliable, performant frontends at Mekari.
    </p>

    <div class="hero-actions">
      <a href="mailto:azanirr212@gmail.com" class="btn btn-primary">Get in touch</a>
      <a
        href="https://www.linkedin.com/in/azaniramadhan"
        target="_blank"
        rel="noopener"
        class="btn btn-secondary"
      >LinkedIn</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 96px;
}

.hero h1 {
  margin-top: var(--space-md);
}

.hero-subhead {
  max-width: 640px;
  margin-top: var(--space-lg);
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}
</style>
