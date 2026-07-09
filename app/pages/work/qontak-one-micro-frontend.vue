<script setup>
useSeoMeta({
  title: 'Qontak One Micro-Frontend Architecture — Azani Ramadhan',
  description: 'How we federated an independently-owned product module into a unified host shell with Vite Module Federation, without a big-bang rewrite or dual-bundling the design system.',
  ogTitle: 'Qontak One: Micro-Frontend Architecture',
  ogDescription: 'A case study on federating an independently-deployed module into a unified product shell with Vite Module Federation.',
})

const metrics = [
  { value: '2', label: 'Independently deployable apps', desc: 'Host shell and remote module ship on separate pipelines.' },
  { value: '5', label: 'Shared singleton libraries', desc: 'Vue, Pinia, and the design system — never dual-bundled.' },
  { value: '0%', label: 'Change failure rate', desc: 'Maintained across major releases after the migration.' },
  { value: '200ms', label: 'Loading-state grace period', desc: 'Delay before showing a spinner, so fast loads never flicker.' },
]

const challenges = [
  {
    title: 'The remote entry shipped with broken asset paths',
    problem: 'The remote app builds into a non-default output directory. The federation plugin\'s emitted entry file ended up with duplicated path prefixes, pointing at asset paths that didn\'t exist.',
    fix: 'Added a small post-build script that rewrites the emitted entry file\'s paths before it ships — it now runs automatically after every build.',
  },
  {
    title: 'A bundle-size optimization silently broke shared state',
    problem: 'A manual chunk-splitting rule aimed at trimming vendor bundle size pulled the shared framework and design-system libraries into their own chunk. That broke Module Federation\'s shared-module negotiation at runtime — host and remote each loaded a separate copy instead of one shared instance, causing state and theme to desync.',
    fix: 'Excluded every federation-shared package from manual chunking, with a comment on both sides explaining why — so the next optimization pass doesn\'t reintroduce it.',
  },
  {
    title: 'The remote needed the host\'s already-loaded state',
    problem: 'The remote module needs the signed-in user\'s permissions and feature flags, which the host already fetches on boot. Re-fetching or duplicating that store risked drift between host and remote.',
    fix: 'The host exposes its live store instance (and a shared notification instance) on a window global. The remote checks for it on boot and adopts it instead of creating its own — both sides read and write the exact same store.',
  },
]

const stack = ['Nuxt 4', 'Vue 3', 'Vite', '@originjs/vite-plugin-federation', 'Pinia', 'TypeScript']
</script>

<template>
  <main id="main" class="case-study">
    <section class="section container">
      <NuxtLink to="/#achievements" class="back-link">← Back to portfolio</NuxtLink>

      <p v-reveal class="eyebrow case-eyebrow">Case Study — Architecture</p>
      <h1 v-reveal class="display-xxl case-title" style="--reveal-delay: 0.05s">
        Qontak One: Micro-Frontend Architecture
      </h1>
      <p v-reveal class="subhead ink-muted case-subhead" style="--reveal-delay: 0.1s">
        Federating an independently-owned product module into a single host shell —
        without a big-bang rewrite, and without dual-bundling the design system.
      </p>

      <div class="metrics">
        <div v-for="(m, i) in metrics" :key="m.label" v-reveal class="metric" :style="{ '--reveal-delay': `${i * 0.08}s` }">
          <p class="metric-value">{{ m.value }}</p>
          <p class="body metric-label">{{ m.label }}</p>
          <p class="caption ink-muted metric-desc">{{ m.desc }}</p>
        </div>
      </div>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">The problem</h2>
      <p v-reveal class="body-lg" style="--reveal-delay: 0.05s">
        Qontak One unifies several product surfaces under one shell. One of those modules was already a
        mature, separately-owned codebase with its own release cadence and team. Rebuilding it inside the
        host would have meant a slow, risky rewrite; an iframe would have meant a second design system
        and no shared auth or state. We needed the module to render as if it were native to the host,
        while staying independently built, tested, and deployed.
      </p>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">The architecture</h2>
      <p v-reveal class="body-lg" style="--reveal-delay: 0.05s">
        We federated the two apps at the module level with <strong>Vite Module Federation</strong>
        (<code>@originjs/vite-plugin-federation</code>). The host declares the remote's entry URL and lazy-loads
        a single exposed component; the remote stays a fully standalone Nuxt app that happens to also emit
        an entry file for the host to consume at runtime.
      </p>
      <WorkMfeDiagram />
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">My role</h2>
      <p v-reveal class="body-lg" style="--reveal-delay: 0.05s">
        I designed and delivered this architecture end to end: the federation contract on both sides,
        the shared-dependency negotiation strategy, the loading/error boundary for the host, and the
        runtime state bridge between the two apps. It went out incrementally — first behind a feature
        flag on one module, then extended to two more product surfaces once the pattern proved
        stable — rather than as one big cutover.
      </p>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">What went wrong (and how we fixed it)</h2>
      <div class="challenges">
        <article v-for="(c, i) in challenges" :key="c.title" v-reveal class="card challenge" :style="{ '--reveal-delay': `${i * 0.1}s` }">
          <h3 class="subhead">{{ c.title }}</h3>
          <p class="body challenge-block"><span class="challenge-tag">Problem</span>{{ c.problem }}</p>
          <p class="body challenge-block"><span class="challenge-tag challenge-tag-fix">Fix</span>{{ c.fix }}</p>
        </article>
      </div>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">Outcome</h2>
      <ul v-reveal class="outcome-list body-lg">
        <li>The remote module's team ships on its own pipeline, without coordinating a redeploy of the host shell.</li>
        <li>0% change failure rate maintained across major releases since the migration.</li>
        <li>The design system stays single-sourced across host and remote — no risk of visual drift from two independently-versioned copies.</li>
        <li>The pattern proved reusable: the same federation contract now also powers two additional product surfaces.</li>
      </ul>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">Stack</h2>
      <div v-reveal class="stack-chips" style="--reveal-delay: 0.05s">
        <span v-for="item in stack" :key="item" class="chip">{{ item }}</span>
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

.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-xxl);
}

.metric {
  background: var(--color-surface-1);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-xl);
  padding: 20px;
}

.metric-value {
  font-size: clamp(32px, 3.4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--color-accent);
}

.metric-label {
  margin-top: var(--space-sm);
  font-weight: 600;
}

.metric-desc {
  margin-top: 4px;
}

.section-title {
  margin-bottom: var(--space-lg);
}

code {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 0.92em;
  background: var(--color-surface-1);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
}

.challenges {
  display: grid;
  gap: var(--space-lg);
}

.challenge-block {
  margin-top: var(--space-sm);
}

.challenge-block:first-of-type {
  margin-top: var(--space-md);
}

.challenge-tag {
  display: inline-block;
  margin-right: 8px;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-2);
  color: var(--color-ink-muted);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  vertical-align: middle;
}

.challenge-tag-fix {
  background: color-mix(in srgb, var(--color-accent) 18%, transparent);
  color: var(--color-accent);
}

.outcome-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding-left: 1.2em;
  list-style: disc;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

@media (max-width: 810px) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
