<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const words = ['Azani', 'Ramadhan']
const heroRoot = ref(null)
let mm

onMounted(() => {
  if (!heroRoot.value) return

  mm = gsap.matchMedia()

  mm.add(
    {
      reduceMotion: '(prefers-reduced-motion: reduce)',
      motionOk: '(prefers-reduced-motion: no-preference)',
    },
    (context) => {
      const { reduceMotion } = context.conditions
      const move = reduceMotion ? 0 : 16
      const stagger = reduceMotion ? 0 : 0.08

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: reduceMotion ? 0 : 0.9 },
      })

      tl.from('.eyebrow', { autoAlpha: 0, y: move })
        .from('.word-inner', { yPercent: reduceMotion ? 0 : 110, stagger }, '-=0.6')
        .from('.hero-subhead', { autoAlpha: 0, y: move }, '-=0.5')
        .from('.hero-actions .btn', { autoAlpha: 0, y: move, stagger }, '-=0.5')
        .from('.hero-photo-wrap', { autoAlpha: 0 }, '-=0.7')
        .from('.hero-photo', { scale: reduceMotion ? 1 : 0.9, clearProps: 'transform' }, '<')
    },
    heroRoot.value,
  )
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<template>
  <section id="top" ref="heroRoot" class="section hero container">
    <div class="hero-grid">
      <div class="hero-content">
        <p class="eyebrow">Front End Engineer</p>
        <h1 class="display-xxl hero-title">
          <span
            v-for="word in words"
            :key="word"
            class="word-mask"
          >
            <span class="word-inner">{{ word }}</span>
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
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >LinkedIn</a>
        </div>
      </div>

      <div class="hero-photo-wrap">
        <div class="hero-photo-glow" aria-hidden="true" />
        <img
          src="/profile.jpg"
          alt="Portrait of Azani Ramadhan"
          width="360"
          height="360"
          fetchpriority="high"
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
  background: linear-gradient(
    110deg,
    var(--color-ink) 40%,
    var(--color-block-1) 47%,
    var(--color-block-2) 53%,
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
  display: var(--glow-display);
  border-radius: 50%;
  filter: blur(40px);
  opacity: var(--glow-opacity-rest, 0.55);
  background: conic-gradient(
    from 180deg,
    var(--color-glow-1),
    var(--color-glow-2),
    var(--color-glow-3),
    var(--color-glow-1)
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
  box-shadow: var(--photo-elevation, none);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.hero-photo-wrap:hover .hero-photo {
  transform: scale(1.04) rotate(-1.5deg);
  box-shadow: var(--photo-elevation-hover, var(--photo-elevation, none));
}

.hero-photo-wrap:hover .hero-photo-glow {
  opacity: var(--glow-opacity-hover, 0.85);
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
  .hero-photo-wrap {
    animation: none;
  }
}

@media (max-width: 810px) {
  .hero {
    padding-top: 40px;
  }

  .hero-grid {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: var(--space-lg);
  }

  .hero-photo-wrap {
    width: 140px;
    height: 140px;
  }

  .hero-title {
    margin-top: var(--space-sm);
  }

  .hero-subhead {
    margin-top: var(--space-md);
  }

  .hero-actions {
    margin-top: var(--space-lg);
  }
}

@media (max-width: 810px) and (max-height: 700px) {
  .hero-photo-wrap {
    width: 96px;
    height: 96px;
    animation: none;
  }
}
</style>
