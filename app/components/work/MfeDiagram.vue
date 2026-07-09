<template>
  <div class="diagram">
    <div v-reveal class="node host-node">
      <p class="node-label">Host — Unified Shell</p>
      <p class="caption ink-muted node-tech">Nuxt 4 · Vite</p>
      <p class="node-foot">Several routes across the host each lazy-load the remote module on demand</p>
      <p class="node-foot">Each route renders via <code>&lt;Suspense&gt;</code> + <code>defineAsyncComponent</code></p>
    </div>

    <div v-reveal class="boundary" style="--reveal-delay: 0.1s">
      <p class="boundary-label">@originjs/vite-plugin-federation</p>
      <p class="boundary-line">
        <code>import('remoteModule/EntryComponent')</code>
      </p>
      <div class="boundary-arrow" aria-hidden="true">⇄</div>
      <p class="boundary-line"><code>remoteEntry.js</code></p>
      <div class="shared-chips">
        <span class="chip">Vue</span>
        <span class="chip">Pinia</span>
        <span class="chip">Design system</span>
      </div>
      <p class="boundary-note">Runtime bridge: host exposes its live store + notification instances on <code>window</code>; the remote adopts them on boot instead of creating its own.</p>
    </div>

    <div v-reveal class="node remote-node" style="--reveal-delay: 0.2s">
      <p class="node-label">Remote — product module</p>
      <p class="caption ink-muted node-tech">Nuxt 4 · Vite · own pipeline</p>
      <p class="node-foot node-exposes">Exposes a single entry component</p>
      <p class="node-foot">Internally routes to its own set of pages, so the host only ever loads one federated module</p>
      <p class="node-foot node-deploy">Own CI pipeline → own container image → own release cadence</p>
    </div>
  </div>
</template>

<style scoped>
.diagram {
  display: grid;
  grid-template-columns: 1fr 0.9fr 1fr;
  align-items: stretch;
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.node {
  background: var(--color-surface-1);
  border: 1px solid var(--color-hairline);
  border-radius: var(--radius-xl);
  padding: 24px;
}

.node-label {
  font-weight: 700;
  font-size: 18px;
}

.node-tech {
  margin-top: 4px;
}

.node-foot code,
.boundary-line code {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 13px;
  background: var(--color-surface-2);
  padding: 2px 6px;
  border-radius: var(--radius-xs);
}

.node-foot {
  margin-top: var(--space-md);
  font-size: 14px;
  color: var(--color-ink-muted);
  line-height: 1.5;
}

.node-exposes {
  color: var(--color-ink);
}

.boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 16px;
  border-left: 1px dashed var(--color-hairline);
  border-right: 1px dashed var(--color-hairline);
}

.boundary-label {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--color-accent);
}

.boundary-line {
  font-size: 12px;
}

.boundary-arrow {
  font-size: 22px;
  color: var(--color-ink-muted);
}

.shared-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-top: 6px;
}

.boundary-note {
  margin-top: var(--space-sm);
  font-size: 12px;
  color: var(--color-ink-muted);
  line-height: 1.5;
}

@media (max-width: 960px) {
  .diagram {
    grid-template-columns: 1fr;
  }

  .boundary {
    border-left: none;
    border-right: none;
    border-top: 1px dashed var(--color-hairline);
    border-bottom: 1px dashed var(--color-hairline);
    padding: 20px 0;
  }
}
</style>
