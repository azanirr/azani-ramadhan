<script setup>
const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 600
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <a
    v-magnetic
    href="#top"
    class="back-to-top"
    :class="{ 'is-visible': isVisible }"
    aria-label="Back to top"
  >↑</a>
</template>

<style scoped>
.back-to-top {
  --magnet-x: 0px;
  --magnet-y: 0px;
  position: fixed;
  right: var(--space-lg);
  bottom: var(--space-lg);
  z-index: 40;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--color-surface-2);
  color: var(--color-ink);
  font-size: 18px;
  opacity: 0;
  transform: translate(var(--magnet-x), var(--magnet-y)) translateY(12px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.back-to-top.is-visible {
  opacity: 1;
  transform: translate(var(--magnet-x), var(--magnet-y)) translateY(0);
  pointer-events: auto;
}

@media (max-width: 810px) {
  .back-to-top {
    right: var(--space-md);
    bottom: var(--space-md);
  }
}
</style>
