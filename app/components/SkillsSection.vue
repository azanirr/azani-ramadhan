<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const marqueeRoot = ref(null)
let mm

onMounted(() => {
  if (!marqueeRoot.value) return

  mm = gsap.matchMedia()

  mm.add(
    { motionOk: '(prefers-reduced-motion: no-preference)' },
    () => {
      const loop = gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 32,
        ease: 'none',
        repeat: -1,
      })

      let hovered = false
      let settleTween

      ScrollTrigger.create({
        onUpdate(self) {
          if (hovered) return
          const velocity = self.getVelocity()
          const direction = velocity < 0 ? -1 : 1
          const boost = gsap.utils.clamp(1, 6, Math.abs(velocity) / 300)
          settleTween?.kill()
          loop.timeScale(boost * direction)
          settleTween = gsap.to(loop, { timeScale: 1, duration: 1.2, ease: 'power2.out' })
        },
      })

      const track = marqueeRoot.value.querySelector('.marquee')
      const pause = () => {
        hovered = true
        settleTween?.kill()
        settleTween = gsap.to(loop, { timeScale: 0, duration: 0.4 })
      }
      const resume = () => {
        hovered = false
        settleTween?.kill()
        settleTween = gsap.to(loop, { timeScale: 1, duration: 0.4 })
      }
      track.addEventListener('mouseenter', pause)
      track.addEventListener('mouseleave', resume)
      return () => {
        track.removeEventListener('mouseenter', pause)
        track.removeEventListener('mouseleave', resume)
      }
    },
    marqueeRoot.value,
  )
})

onUnmounted(() => {
  mm?.revert()
})

const coreSkills = [
  'Vue.js', 'Nuxt', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'CSS', 'SCSS', 'SASS', 'Tailwind', 'Bootstrap', 'Vuex', 'Redux', 'jQuery',
]

const otherSkills = [
  'Datadog', 'Sonar', 'LLM Integration', 'Agentic AI', 'MCP', 'Jest', 'NPM', 'Yarn',
  'Git', 'BitBucket', 'REST', 'Figma', 'PHP', 'Phalcon', 'CRM', 'Ruby on Rails', 'Ruby',
]
</script>

<template>
  <section id="skills" ref="marqueeRoot" v-reveal class="section">
    <div class="container">
      <h2 class="eyebrow">Skills</h2>

      <p class="caption ink-muted core-label">Core Frontend Stack</p>
      <div class="core-chips">
        <span v-for="skill in coreSkills" :key="skill" class="chip chip-core">{{ skill }}</span>
      </div>

      <p class="caption ink-muted other-label">Also Working With</p>
    </div>

    <div class="marquee">
      <div class="marquee-track">
        <span v-for="skill in otherSkills" :key="`a-${skill}`" class="chip">{{ skill }}</span>
        <span v-for="skill in otherSkills" :key="`b-${skill}`" class="chip" aria-hidden="true">{{ skill }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.core-label {
  margin-top: var(--space-xl);
}

.core-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-md);
}

.chip-core {
  background: var(--color-surface-2);
  font-weight: 700;
  box-shadow: 0 0 0 1px var(--color-hairline);
}

.other-label {
  margin-top: var(--space-xl);
  margin-bottom: 0;
}

.marquee {
  margin-top: var(--space-md);
}
</style>
