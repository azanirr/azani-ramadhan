<script setup>
function handlePointerMove(event) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  card.style.setProperty('--mx', `${x}%`)
  card.style.setProperty('--my', `${y}%`)
}

const achievements = [
  {
    title: 'Qontak One Micro Frontend architecture',
    description: 'Designed and delivered Qontak One Micro Frontend architecture, enhancing scalability and modularity.',
    variant: 'violet',
  },
  {
    title: 'Scalability & reliability',
    description: 'Maintained a 0% change failure rate in major releases and facilitated the delivery of scalable features.',
    variant: 'magenta',
  },
  {
    title: 'Agentic AI workflows',
    description: 'Built Agentic AI workflows with LLM API integration and a playwright-core E2E self-test skill.',
    variant: 'orange',
  },
  {
    title: '3x "Above Expectations" performer',
    description: 'Achieved "Above Expectations" performance ratings three times in Mekari’s biannual appraisals.',
    variant: 'coral',
  },
]
</script>

<template>
  <section id="achievements" class="section container">
    <p class="eyebrow">Key Achievements</p>

    <div class="grid">
      <article
        v-for="(item, index) in achievements"
        :key="item.title"
        v-reveal
        class="spotlight-card"
        :class="`spotlight-${item.variant}`"
        :style="{ '--reveal-delay': `${index * 0.1}s` }"
        @mousemove="handlePointerMove"
      >
        <h3 class="subhead">{{ item.title }}</h3>
        <p class="body">{{ item.description }}</p>
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

.spotlight-card p {
  margin-top: var(--space-sm);
  opacity: 0.9;
}

@media (max-width: 810px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
