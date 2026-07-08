<script setup>
const words = ['Azani', 'Ramadhan']
</script>

<template>
  <section id="top" class="section hero container">
    <div class="hero-grid">
      <div class="hero-content">
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
      </div>

      <div class="hero-photo-wrap">
        <div class="hero-photo-glow" aria-hidden="true" />
        <img
          src="/profile.jpg"
          alt="Azani Ramadhan"
          width="360"
          height="360"
          class="hero-photo"
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 96px;
}

.hero-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xxl);
}

.hero-content {
  flex: 1 1 560px;
  min-width: 0;
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
  background: linear-gradient(
    110deg,
    var(--color-ink) 40%,
    var(--color-gradient-violet) 47%,
    var(--color-gradient-magenta) 53%,
    var(--color-ink) 60%
  );
  background-size: 300% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-position 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-title:hover .word-inner {
  color: transparent;
  background-position: 0 0;
}

@keyframes word-reveal {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
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

.hero-photo-wrap {
  position: relative;
  flex: 0 0 auto;
  width: 260px;
  height: 260px;
  animation: photo-float 6s ease-in-out infinite;
}

.hero-photo-glow {
  position: absolute;
  inset: -32px;
  z-index: 0;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.55;
  background: conic-gradient(
    from 180deg,
    var(--color-gradient-violet),
    var(--color-gradient-magenta),
    var(--color-gradient-orange),
    var(--color-gradient-violet)
  );
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.hero-photo {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xxl);
  border: 2px solid var(--color-surface-2);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-photo-wrap:hover .hero-photo {
  transform: scale(1.04) rotate(-1.5deg);
}

.hero-photo-wrap:hover .hero-photo-glow {
  opacity: 0.85;
  transform: scale(1.08);
}

@keyframes photo-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .word-inner {
    animation: none;
  }
  .hero-photo-wrap {
    animation: none;
  }
}

@media (max-width: 810px) {
  .hero-grid {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: var(--space-xl);
  }

  .hero-photo-wrap {
    width: 180px;
    height: 180px;
  }
}
</style>
