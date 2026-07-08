<script setup>
const roles = [
  {
    company: 'Mekari Indonesia',
    title: 'Software Engineer 2',
    period: '06/2024 — Present',
    bullets: [
      'Optimized website performance, improving LCP scores using Datadog and reducing console errors from 1922 to 870 in 3 months',
      'Maintained 0 SLA breaches during FE on-call across 3 years, with 0 major defects (P0/P1) on new releases',
      'Individual change failure rate of 0% for major P0/P1 issues',
      'Managed and released features on KB WordPress Admin CRM using Nuxt 3 and the WordPress API',
      'Designed and delivered the Qontak One Micro Frontend architecture, enhancing scalability and modularity',
      'Built Agentic AI workflows (LLM API integration) and a playwright-core E2E self-test skill for automated browser-based quality checks before each release',
    ],
  },
  {
    company: 'Mekari Indonesia',
    title: 'Software Engineer 1',
    period: '08/2021 — 06/2024',
    bullets: [
      'Managed and developed new features for Qontak CRM V1 using Ruby on Rails with vanilla JavaScript, CSS/SCSS, and ERB',
      'Managed and developed new features for Qontak Chat with Nuxt, NPM, Jest, Sass, and SCSS',
      'Managed and developed new features for Qontak CRM V2 using Nuxt, Vuex, Jest, Storybook, and Yarn',
      'Collaborated with the design team to execute designs into reality with Figma and Storybook (Mekari Pixel)',
      'On-call engineer for FE Qontak CRM, collaborating with the technical support team',
      'PIC for several major features supporting the OKR team, and for deployment/release plans every week',
    ],
  },
  {
    company: 'Global Inovasi Ventura',
    title: 'Front End Engineer',
    period: '11/2020 — 08/2021',
    bullets: [
      'Built features and fixed bugs with the Phalcon PHP framework, Vue.js, and jQuery',
      'Created mockup UIs',
      'Released an OCR (optical character recognition) feature',
    ],
  },
]
</script>

<template>
  <section id="experience" class="section container">
    <p class="eyebrow">Experience</p>

    <div class="roles">
      <article
        v-for="(role, index) in roles"
        :key="role.title + role.period"
        v-reveal
        class="card role"
        :class="{ 'role-current': index === 0 }"
        :style="{ '--reveal-delay': `${index * 0.1}s` }"
      >
        <div class="role-head">
          <div>
            <h3 class="headline">{{ role.title }}</h3>
            <p class="body-sm ink-muted">{{ role.company }}</p>
          </div>
          <p class="caption ink-muted role-period">{{ role.period }}</p>
        </div>

        <ul class="role-bullets">
          <li v-for="bullet in role.bullets" :key="bullet" class="body ink-muted">
            {{ bullet }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.roles {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-top: var(--space-lg);
  padding-left: 28px;
}

.roles::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--color-hairline);
}

.role {
  position: relative;
}

.role::before {
  content: '';
  position: absolute;
  left: -28px;
  top: 28px;
  width: 9px;
  height: 9px;
  border-radius: var(--radius-full);
  background: var(--color-ink-muted);
  box-shadow: 0 0 0 4px var(--color-canvas);
}

.role-current::before {
  background: var(--color-accent-blue);
  box-shadow: 0 0 0 4px var(--color-canvas), 0 0 0 6px rgba(0, 153, 255, 0.25);
}

.role-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
}

.role-period {
  white-space: nowrap;
}

.role-bullets {
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.role-bullets li {
  padding-left: var(--space-md);
  position: relative;
}

.role-bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-ink-muted);
}

@media (max-width: 600px) {
  .role-head {
    flex-direction: column;
  }
}
</style>
