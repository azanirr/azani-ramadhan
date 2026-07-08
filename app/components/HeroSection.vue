<script setup>
const words = ['Azani', 'Ramadhan']
</script>

<template>
  <section id="top" class="section hero container">
    <p class="eyebrow">Front End Engineer</p>
    <h1 class="display-xxl hero-title">
      <span
        v-for="(word, index) in words"
        :key="word"
        class="word-mask"
      >
        <span class="word-inner" :style="{ '--d': `${index * 0.08}s` }">{{ word }}</span>
      </span>
    </h1>
    <p class="subhead ink-muted hero-subhead">
      Building scalable web applications with Vue, React, and Nuxt — 5+ years shipping
      reliable, performant frontends at Mekari.
    </p>

    <div class="hero-actions">
      <a v-magnetic href="mailto:azanirr212@gmail.com" class="btn btn-primary">Get in touch</a>
      <a
        v-magnetic
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

.hero-title {
  margin-top: var(--space-md);
  display: flex;
  flex-wrap: wrap;
  gap: 0.25em;
}

.word-mask {
  overflow: hidden;
  display: inline-block;
}

.word-inner {
  display: inline-block;
  animation: word-reveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--d, 0s);
}

@keyframes word-reveal {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .word-inner {
    animation: none;
  }
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
