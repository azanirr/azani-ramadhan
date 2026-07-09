<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function handlePointerMove(event) {
  const card = event.currentTarget
  if (!card.classList.contains('spotlight-card')) return
  const rect = card.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  card.style.setProperty('--mx', `${x}%`)
  card.style.setProperty('--my', `${y}%`)
}

const achievements = [
  {
    type: 'feature',
    variant: 1,
    tag: 'Architecture',
    title: 'Qontak One Micro Frontend',
    description: 'Designed and delivered the Micro Frontend architecture, enhancing scalability and modularity across Qontak products.',
  },
  {
    type: 'stat',
    variant: 2,
    value: 0,
    suffix: '%',
    label: 'Change failure rate',
    description: 'Maintained across every major release.',
  },
  {
    type: 'stat',
    variant: 3,
    value: 3,
    suffix: '×',
    label: '"Above Expectations"',
    description: 'Performance rating, three biannual appraisals running.',
  },
  {
    type: 'feature',
    variant: 4,
    tag: 'AI · Automation',
    title: 'Agentic AI workflows',
    description: 'Built LLM-integrated workflows and a Playwright-core E2E self-test skill for automated release checks.',
  },
]

const display = reactive(achievements.map((item) => (item.type === 'stat' ? 0 : null)))
const statEls = []
let triggers = []

function setStatRef(el, index) {
  if (el) statEls[index] = el
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  achievements.forEach((item, index) => {
    if (item.type !== 'stat') return
    const el = statEls[index]
    if (!el) return

    if (reduceMotion) {
      display[index] = item.value
      return
    }

    const counter = { value: 0 }
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            value: item.value,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => { display[index] = Math.round(counter.value) },
          })
        },
      }),
    )
  })
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  triggers = []
})
</script>

<template>
  <section id="achievements" class="section container">
    <h2 class="eyebrow">Key Achievements</h2>

    <div class="grid">
      <article
        v-for="(item, index) in achievements"
        :key="item.title || item.label"
        v-reveal
        :class="item.type === 'stat' ? 'stat-card' : ['spotlight-card', `spotlight-${item.variant}`]"
        :style="{ '--reveal-delay': `${index * 0.1}s` }"
        @mousemove="handlePointerMove"
      >
        <template v-if="item.type === 'stat'">
          <p :ref="(el) => setStatRef(el, index)" class="stat-value" :class="`stat-value-${item.variant}`">
            {{ display[index] }}{{ item.suffix }}
          </p>
          <p class="body stat-label">{{ item.label }}</p>
          <p class="caption ink-muted stat-desc">{{ item.description }}</p>
        </template>
        <template v-else>
          <span class="tag">{{ item.tag }}</span>
          <h3 class="subhead">{{ item.title }}</h3>
          <p class="body">{{ item.description }}</p>
        </template>
      </article>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
}

.spotlight-card,
.stat-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.grid > :nth-child(1) {
  grid-column: 1;
  grid-row: 1 / 3;
}

.grid > :nth-child(2) {
  grid-column: 2;
  grid-row: 1;
}

.grid > :nth-child(3) {
  grid-column: 3;
  grid-row: 1;
}

.grid > :nth-child(4) {
  grid-column: 2 / 4;
  grid-row: 2;
}

.spotlight-card p {
  margin-top: var(--space-sm);
  opacity: 0.9;
}

.tag {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 4px 12px;
  margin-bottom: var(--space-sm);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, currentColor 16%, transparent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.stat-card {
  background: var(--color-surface-1);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-xxl);
  padding: 32px;
}

.stat-value {
  font-family: var(--font-body);
  font-size: clamp(48px, 6vw, 76px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  margin: 0;
}

.stat-value-2 {
  color: var(--color-block-2);
}

.stat-value-3 {
  color: var(--color-block-3);
}

[data-theme='uber'] .stat-value-2 {
  color: var(--color-ink);
}

.stat-label {
  margin-top: var(--space-sm);
  font-weight: 600;
}

.stat-desc {
  margin-top: 4px;
}

@media (max-width: 810px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .grid > :nth-child(1),
  .grid > :nth-child(2),
  .grid > :nth-child(3),
  .grid > :nth-child(4) {
    grid-column: 1;
    grid-row: auto;
  }
}
</style>
