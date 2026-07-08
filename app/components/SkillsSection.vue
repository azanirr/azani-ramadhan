<script setup>
const coreSkills = [
  'Vue.js', 'Nuxt', 'React', 'JavaScript', 'CSS', 'SCSS', 'SASS', 'Tailwind', 'Bootstrap', 'Vuex', 'Redux', 'jQuery',
]

const otherSkills = [
  'Datadog', 'Sonar', 'LLM Integration', 'Agentic AI', 'MCP', 'Jest', 'NPM', 'Yarn',
  'Git', 'BitBucket', 'REST', 'Figma', 'PHP', 'Phalcon', 'CRM', 'Ruby on Rails', 'Ruby',
]
</script>

<template>
  <section id="skills" v-reveal class="section">
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
