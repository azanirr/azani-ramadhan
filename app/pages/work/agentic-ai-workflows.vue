<script setup>
useSeoMeta({
  title: 'Agentic AI Workflows — Azani Ramadhan',
  description: 'A suite of Claude Code skills that close the loop between a Jira ticket and shipped code — automated acceptance-criteria validation, evidence capture, and results publishing.',
  ogTitle: 'Agentic AI Workflows: Automated Release QA',
  ogDescription: 'An agent that validates a feature branch against its Jira ticket, gathers real evidence, and posts a PASS/FAIL report before release.',
})

const metrics = [
  { value: '3', label: 'Claude Code skills shipped', desc: 'jira-self-test, playwright-cli, and publish-test-results.' },
  { value: '2', label: 'Evidence modes, auto-detected', desc: 'Playwright screenshots/video for UI repos, curl request/response for API-only repos.' },
  { value: '4', label: 'Phases per run', desc: 'Ticket ingestion, code inspection, evidence capture, report & comment.' },
  { value: '2', label: 'Frontend repos adopted it', desc: 'qontak-customer-fe and crm-fe-v3 run it as a pre-release gate.' },
]

const challenges = [
  {
    title: 'Hardcoded credentials made the skill unsafe to share',
    problem: 'The first version had fallback defaults baked in for staging login and the Jira account email, so anyone running the skill inherited someone else\'s credentials as an implicit default.',
    fix: 'Stripped every hardcoded default in v0.2.0 — scripts now hard-fail with a friendly message when required env vars are missing, forcing each engineer to supply their own credentials explicitly.',
  },
  {
    title: 'Headless SSO logins failed unpredictably',
    problem: 'Automating login for UI evidence hit redirect loops, MFA prompts, and captchas whenever it ran headless, which meant screenshots would silently land on a login page instead of the feature.',
    fix: 'Moved to a pre-baked session model — each engineer signs in once through a visible browser, the session is saved to disk, and every later run (including unattended CI-style runs) reuses it until it expires.',
  },
  {
    title: 'One evidence format couldn\'t cover both frontend and backend repos',
    problem: 'Frontend tickets need visual proof a screen renders correctly; backend tickets have no UI to screenshot, so forcing Playwright evidence on an API repo either failed outright or produced meaningless captures.',
    fix: 'Added mode auto-detection: the agent checks the target repo for package.json and playwright-core and switches between UI evidence (screenshot/video) and API evidence (curl request + response) with no manual flag needed.',
  },
]

const stack = ['Claude Code Skills', 'playwright-core', 'MCP Atlassian', 'Jira REST API', 'Bash', 'ffmpeg']
</script>

<template>
  <main id="main" class="case-study">
    <section class="section container">
      <NuxtLink to="/#experience" class="back-link">← Back to portfolio</NuxtLink>

      <p v-reveal class="eyebrow case-eyebrow">Case Study — Developer Tooling</p>
      <h1 v-reveal class="display-xxl case-title" style="--reveal-delay: 0.05s">
        Agentic AI Workflows
      </h1>
      <p v-reveal class="subhead ink-muted case-subhead" style="--reveal-delay: 0.1s">
        Closing the loop between a Jira ticket's acceptance criteria and the code that ships —
        with an agent that gathers real evidence instead of a manual checklist.
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
        Before a release, someone had to manually re-read a Jira ticket's acceptance criteria, click
        through the feature, and eyeball whether the branch actually satisfied every item — slow, easy
        to skip under deadline pressure, and impossible to audit after the fact. I wanted an agent that
        closes that loop automatically: read the ticket, inspect the diff, capture real evidence per
        criterion, and only call it PASS when every item is actually verified.
      </p>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">The workflow</h2>
      <p v-reveal class="body-lg" style="--reveal-delay: 0.05s">
        Given a Jira ticket URL, the agent runs four phases: it fetches the ticket and parses every
        Acceptance Criteria item (via MCP Atlassian, falling back to the Jira REST API), inspects
        <code>git diff main...HEAD</code> to map each item to the code that implements it, gathers evidence
        in whichever mode fits the repo, then posts a structured PASS/FAIL report — criteria, impacted
        code, impacted feature, edge cases — back as a Jira comment. Overall status is PASS only when
        every AC item passes; there's no partial credit. A companion skill, <strong>publish-test-results</strong>,
        takes the same evidence and publishes it to a Confluence page or a Jira comment depending on
        what's being tested against, and both are built on a shared <strong>playwright-cli</strong> browser-automation
        skill for spec-driven test exploration.
      </p>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">My role</h2>
      <p v-reveal class="body-lg" style="--reveal-delay: 0.05s">
        I designed and built the whole suite: the ticket-ingestion and AC-parsing logic, the dual-mode
        evidence engine, the credential and session-handling model, the Jira comment formatting, and the
        companion publishing skill. It rolled out incrementally to two frontend repos as a pre-release
        gate, ahead of any broader team adoption.
      </p>
    </section>

    <section class="section container">
      <h2 v-reveal class="headline section-title">What went wrong (and how I fixed it)</h2>
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
        <li>Acceptance-criteria validation now happens automatically before release, with real screenshots, video, or request/response evidence attached to the ticket — not a manual checklist.</li>
        <li>No shared or hardcoded credentials remain in the repo since the v0.2.0 hardening pass.</li>
        <li>Runs unattended by reusing a pre-baked login session, instead of depending on flaky headless SSO.</li>
        <li>Adopted as a pre-release gate on two frontend repos, with the same evidence reusable for Confluence documentation via the companion publishing skill.</li>
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
