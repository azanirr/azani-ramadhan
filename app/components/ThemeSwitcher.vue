<script setup>
const { theme, setTheme, themes } = useTheme()
</script>

<template>
  <div class="theme-switcher" role="group" aria-label="Design theme">
    <button
      v-for="t in themes"
      :key="t.id"
      type="button"
      class="theme-option"
      :class="{ 'is-active': theme === t.id }"
      :aria-pressed="theme === t.id"
      @click="setTheme(t.id)"
    >{{ t.label }}</button>
  </div>
</template>

<style scoped>
.theme-switcher {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-1);
}

.theme-option {
  border: none;
  background: transparent;
  color: var(--color-ink-muted);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.01em;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.theme-option.is-active {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

@media (max-width: 810px) {
  .theme-switcher {
    width: 100%;
    justify-content: space-between;
    margin-top: var(--space-lg);
  }

  .theme-option {
    flex: 1;
    text-align: center;
  }
}
</style>
