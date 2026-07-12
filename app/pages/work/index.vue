<script setup>
useSeoMeta({
  title: 'Work — Azani Ramadhan',
  description: 'Projects and features shipped across Mekari Qontak, Qontak CDP, and Global Inovasi Ventura.',
})

const projects = [
  {
    title: 'KB WordPress Admin CRM',
    tag: 'Mekari · 06/2024 — Present',
    description: 'Built the Import Articles feature for KB WordPress Admin CRM using Nuxt 3 and the WordPress API.',
    image: '/work/kb-crm.png',
  },
  {
    title: 'CDP Nuxt 4 Migration',
    tag: 'Mekari · 06/2024 — Present',
    description: 'Migrated the CDP frontend from Nuxt 3 to Nuxt 4, improving performance and keeping the codebase on a current, supported framework version.',
    image: '/work/cdp.png',
  },
  {
    title: 'Qontak One Micro Frontend',
    tag: 'Mekari · 06/2024 — Present',
    description: 'Designed and delivered the Qontak One Micro Frontend architecture, enhancing scalability and modularity.',
    href: '/work/qontak-one-micro-frontend',
    image: '/work/cdp.png',
  },
  {
    title: 'Agentic AI Workflows',
    tag: 'Mekari · 06/2024 — Present',
    description: 'Built a suite of Claude Code skills that automate release QA — Jira acceptance-criteria validation, evidence capture, and results publishing.',
    href: '/work/agentic-ai-workflows',
  },
  {
    title: 'Qontak CRM V1',
    tag: 'Mekari · 08/2021 — 06/2024',
    description: 'Built the report template, user settings, and expenses features for Qontak CRM V1 using Ruby on Rails with vanilla JavaScript, CSS/SCSS, and ERB.',
    image: '/work/v1-crm.png',
  },
  {
    title: 'Qontak Chat',
    tag: 'Mekari · 08/2021 — 06/2024',
    description: 'Developed the inbox-v2 custom profile feature for Qontak Chat with Nuxt, NPM, Jest, Sass, and SCSS.',
    image: '/work/cdp-chat.png',
  },
  {
    title: 'Qontak CRM V2',
    tag: 'Mekari · 08/2021 — 06/2024',
    description: 'Built Deals V2, Tickets V2, Tasks V2, Approval, and embeddable deals for Qontak CRM V2 using Nuxt, Vuex, Jest, Storybook, and Yarn.',
    image: '/work/v2-crm.png',
  },
  {
    title: 'OCR Feature',
    tag: 'Global Inovasi Ventura · 11/2020 — 08/2021',
    description: 'Released an OCR (optical character recognition) feature.',
  },
]
</script>

<template>
  <main id="main" class="case-study">
    <section class="section container">
      <NuxtLink to="/#experience" class="back-link">← Back to portfolio</NuxtLink>

      <p v-reveal class="eyebrow case-eyebrow">Work</p>
      <h1 v-reveal class="display-xxl case-title" style="--reveal-delay: 0.05s">
        Projects & features
      </h1>
      <p v-reveal class="subhead ink-muted case-subhead" style="--reveal-delay: 0.1s">
        A closer look at what I've built across Mekari Qontak, Qontak CDP, and Global Inovasi Ventura.
      </p>

      <div class="grid">
        <article
          v-for="(project, i) in projects"
          :key="project.title"
          v-reveal
          class="card project"
          :style="{ '--reveal-delay': `${i * 0.06}s` }"
        >
          <img v-if="project.image" :src="project.image" :alt="project.title" class="project-image">
          <span class="tag">{{ project.tag }}</span>
          <h3 class="subhead">{{ project.title }}</h3>
          <p class="body ink-muted">{{ project.description }}</p>
          <NuxtLink v-if="project.href" :to="project.href" class="case-study-link">Read case study →</NuxtLink>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  color: var(--color-ink-muted);
  font-size: 14px;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--color-ink);
}

.case-eyebrow {
  margin-top: var(--space-xl);
}

.case-title {
  margin-top: var(--space-md);
  max-width: 900px;
}

.case-subhead {
  max-width: 680px;
  margin-top: var(--space-lg);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-xxl);
}

.project {
  display: flex;
  flex-direction: column;
}

.project-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-md);
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

.project h3 {
  margin-bottom: var(--space-sm);
}

.case-study-link {
  align-self: flex-start;
  margin-top: var(--space-md);
  font-weight: 600;
  font-size: 14px;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
  text-underline-offset: 3px;
  transition: text-decoration-color 0.15s ease;
}

.case-study-link:hover {
  text-decoration-color: currentColor;
}

@media (max-width: 810px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
