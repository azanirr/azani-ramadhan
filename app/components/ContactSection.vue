<script setup>
const links = [
  { label: 'azanirr212@gmail.com', href: 'mailto:azanirr212@gmail.com' },
  { label: '+62 812-3938-9645', href: 'tel:+6281239389645' },
  { label: 'linkedin.com/in/azaniramadhan', href: 'https://www.linkedin.com/in/azaniramadhan' },
  { label: 'github.com/azanirr', href: 'https://github.com/azanirr' },
]
</script>

<template>
  <section id="contact" v-reveal class="section container">
    <div class="card contact-card">
      <p class="eyebrow">Contact</p>
      <h2 class="display-lg">Let's build something reliable together.</h2>
      <p class="body-lg ink-muted contact-copy">
        Open to front-end and Micro Frontend architecture opportunities. Based in
        Kaliurang, Yogyakarta, Indonesia.
      </p>

      <div class="contact-actions">
        <a v-magnetic href="mailto:azanirr212@gmail.com" class="btn btn-primary">Email me</a>
        <a
          v-magnetic
          href="https://www.linkedin.com/in/azaniramadhan"
          target="_blank"
          rel="noopener"
          class="btn btn-secondary"
        >LinkedIn</a>
        <a
          v-magnetic
          href="https://github.com/azanirr"
          target="_blank"
          rel="noopener"
          class="btn btn-secondary"
        >GitHub</a>
      </div>

      <ul class="contact-links">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="body-sm link-accent" target="_blank" rel="noopener">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <p class="micro ink-muted education">
        Gadjah Mada University — Bachelor's Degree in Agroindustrial Technology (2014–2019)
      </p>
    </div>
  </section>
</template>

<style scoped>
.contact-card {
  padding: var(--space-xxl);
}

.contact-copy {
  max-width: 560px;
  margin-top: var(--space-md);
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  margin-top: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-hairline-soft);
}

.education {
  margin-top: var(--space-lg);
}

@media (max-width: 600px) {
  .contact-card {
    padding: var(--space-xl);
  }
}
</style>
