<script setup>
const skills = [
  'Vue.js', 'Nuxt', 'React', 'Datadog', 'Sonar', 'LLM Integration', 'Agentic AI',
  'MCP', 'Vuex', 'Redux', 'Jest', 'SASS', 'SCSS', 'CSS', 'Bootstrap', 'Tailwind',
  'JavaScript', 'NPM', 'Yarn', 'Git', 'BitBucket', 'REST', 'Figma', 'PHP',
  'Phalcon', 'jQuery', 'CRM', 'Ruby on Rails', 'Ruby',
]
</script>

<template>
  <section id="skills" class="section container">
    <p class="eyebrow">Skills</p>

    <div class="chips">
      <span v-for="skill in skills" :key="skill" class="chip">{{ skill }}</span>
    </div>
  </section>
</template>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-top: var(--space-lg);
}
</style>
