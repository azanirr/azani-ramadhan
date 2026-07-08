<script setup>
const skills = [
  'Vue.js', 'Nuxt', 'React', 'Datadog', 'Sonar', 'LLM Integration', 'Agentic AI',
  'MCP', 'Vuex', 'Redux', 'Jest', 'SASS', 'SCSS', 'CSS', 'Bootstrap', 'Tailwind',
  'JavaScript', 'NPM', 'Yarn', 'Git', 'BitBucket', 'REST', 'Figma', 'PHP',
  'Phalcon', 'jQuery', 'CRM', 'Ruby on Rails', 'Ruby',
]
</script>

<template>
  <section id="skills" v-reveal class="section">
    <div class="container">
      <p class="eyebrow">Skills</p>
    </div>

    <div class="marquee">
      <div class="marquee-track">
        <span v-for="skill in skills" :key="`a-${skill}`" class="chip">{{ skill }}</span>
        <span v-for="skill in skills" :key="`b-${skill}`" class="chip" aria-hidden="true">{{ skill }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  margin-top: var(--space-lg);
}
</style>
