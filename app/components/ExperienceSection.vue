<script setup>
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { gsap } from 'gsap'

const roles = [
  {
    company: 'Mekari Indonesia',
    title: 'Software Engineer 2',
    period: '06/2024 — Present',
    bullets: [
      { text: 'Optimized website performance, improving LCP scores using Datadog and reducing console errors from 1922 to 870 in 3 months' },
      { text: 'Maintained 0 SLA breaches during FE on-call across 3 years, with 0 major defects (P0/P1) on new releases' },
      { text: 'Individual change failure rate of 0% for major P0/P1 issues' },
      { text: 'Built the Import Articles feature for KB WordPress Admin CRM using Nuxt 3 and the WordPress API', project: 'KB WordPress Admin CRM', href: '/work', image: '/work/kb-crm.png' },
      { text: 'Migrated the CDP frontend from Nuxt 3 to Nuxt 4, improving performance and keeping the codebase on a current, supported framework version', project: 'CDP Nuxt 4 Migration', href: '/work', image: '/work/cdp.png' },
      { text: 'Designed and delivered the Qontak One Micro Frontend architecture, enhancing scalability and modularity', project: 'Qontak One Micro Frontend', href: '/work/qontak-one-micro-frontend', image: '/work/cdp.png' },
      { text: 'Built Agentic AI workflows (LLM API integration) and a playwright-core E2E self-test skill for automated browser-based quality checks before each release', project: 'Agentic AI Workflows', href: '/work/agentic-ai-workflows' },
    ],
  },
  {
    company: 'Mekari Indonesia',
    title: 'Software Engineer 1',
    period: '08/2021 — 06/2024',
    bullets: [
      { text: 'Built the report template, user settings, and expenses features for Qontak CRM V1 using Ruby on Rails with vanilla JavaScript, CSS/SCSS, and ERB', project: 'Qontak CRM V1', href: '/work', image: '/work/v1-crm.png' },
      { text: 'Developed the inbox-v2 custom profile feature for Qontak Chat with Nuxt, NPM, Jest, Sass, and SCSS', project: 'Qontak Chat', href: '/work', image: '/work/cdp-chat.png' },
      { text: 'Built Deals V2, Tickets V2, Tasks V2, Approval, and embeddable deals for Qontak CRM V2 using Nuxt, Vuex, Jest, Storybook, and Yarn', project: 'Qontak CRM V2', href: '/work', image: '/work/v2-crm.png' },
      { text: 'Collaborated with the design team to execute designs into reality with Figma and Storybook (Mekari Pixel)' },
      { text: 'On-call engineer for FE Qontak CRM, collaborating with the technical support team' },
      { text: 'PIC for several major features supporting the OKR team, and for deployment/release plans every week' },
    ],
  },
  {
    company: 'Global Inovasi Ventura',
    title: 'Front End Engineer',
    period: '11/2020 — 08/2021',
    bullets: [
      { text: 'Built features and fixed bugs with the Phalcon PHP framework, Vue.js, and jQuery' },
      { text: 'Created mockup UIs' },
      { text: 'Released an OCR (optical character recognition) feature', project: 'OCR Feature', href: '/work' },
    ],
  },
]

const activeProject = shallowRef(null)
const panel = ref(null)
const isTouch = ref(false)
let xTo, yTo

const gradientClasses = ['spotlight-1', 'spotlight-2', 'spotlight-3', 'spotlight-4']

function gradientFor(label) {
  let hash = 0
  for (const char of label) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return gradientClasses[hash % gradientClasses.length]
}

function movePanel(event) {
  xTo(event.clientX + 24)
  yTo(event.clientY - 96)
}

function handleEnter(bullet, event) {
  if (isTouch.value || !bullet.project) return
  activeProject.value = bullet
  movePanel(event)
  gsap.to(panel.value, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power2.out' })
}

function handleMove(bullet, event) {
  if (isTouch.value || !bullet.project || activeProject.value !== bullet) return
  movePanel(event)
}

function closePanel(bullet) {
  gsap.to(panel.value, {
    autoAlpha: 0,
    scale: 0.92,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => {
      if (activeProject.value === bullet) activeProject.value = null
    },
  })
}

function handleLeave(bullet) {
  if (isTouch.value || !bullet.project || activeProject.value !== bullet) return
  closePanel(bullet)
}

function handleClick(bullet) {
  if (!bullet.href) return
  window.open(bullet.href, '_blank', 'noopener,noreferrer')
}

function handleScroll() {
  if (!activeProject.value) return
  closePanel(activeProject.value)
}

onMounted(() => {
  isTouch.value = window.matchMedia('(pointer: coarse)').matches
  if (isTouch.value || !panel.value) return

  gsap.set(panel.value, { autoAlpha: 0, scale: 0.92 })
  xTo = gsap.quickTo(panel.value, 'x', { duration: 0.35, ease: 'power3' })
  yTo = gsap.quickTo(panel.value, 'y', { duration: 0.35, ease: 'power3' })
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (panel.value) gsap.killTweensOf(panel.value)
})
</script>

<template>
  <section id="experience" class="section container">
    <h2 class="eyebrow">Experience</h2>

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
          <li
            v-for="bullet in role.bullets"
            :key="bullet.text"
            class="body ink-muted"
            :class="{ 'bullet-project': bullet.project }"
            :tabindex="bullet.project && !isTouch ? 0 : undefined"
            @mouseenter="handleEnter(bullet, $event)"
            @mousemove="handleMove(bullet, $event)"
            @mouseleave="handleLeave(bullet)"
            @focus="handleEnter(bullet, $event)"
            @blur="handleLeave(bullet)"
            @click="handleClick(bullet)"
            @keydown.enter="handleClick(bullet)"
          >
            {{ bullet.text }}
            <span v-if="bullet.project" class="bullet-project-tag">▶ {{ bullet.project }}</span>
          </li>
        </ul>
      </article>
    </div>

    <div
      v-if="!isTouch"
      ref="panel"
      class="video-preview"
      :class="activeProject ? gradientFor(activeProject.project) : ''"
      aria-hidden="true"
    >
      <video
        v-if="activeProject?.video"
        :key="activeProject.video"
        :src="activeProject.video"
        class="video-preview-media"
        autoplay
        muted
        loop
        playsinline
      />
      <img
        v-else-if="activeProject?.image"
        :key="activeProject.image"
        :src="activeProject.image"
        :alt="activeProject.project"
        class="video-preview-media"
      >
      <template v-else-if="activeProject">
        <span class="video-preview-play">▶</span>
        <span class="video-preview-label">{{ activeProject.project }}</span>
      </template>
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
  background: var(--color-accent);
  box-shadow: 0 0 0 4px var(--color-canvas), 0 0 0 6px rgba(var(--color-accent-rgb), 0.25);
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

.bullet-project {
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: color 0.2s ease;
}

.bullet-project:hover,
.bullet-project:focus-visible {
  color: var(--color-ink);
}

.bullet-project-tag {
  display: inline-block;
  margin-left: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.bullet-project:hover .bullet-project-tag,
.bullet-project:focus-visible .bullet-project-tag {
  opacity: 1;
  transform: translateX(0);
}

.video-preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;
  width: 260px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  border-radius: var(--radius-lg);
  overflow: hidden;
  pointer-events: none;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  will-change: transform;
}

.video-preview-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-preview-play {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
}

.video-preview-label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding: 0 var(--space-md);
}

@media (max-width: 600px) {
  .role-head {
    flex-direction: column;
  }
}
</style>
