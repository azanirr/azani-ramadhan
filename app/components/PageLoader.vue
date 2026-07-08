<script setup>
const isLoading = ref(true)

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setTimeout(() => {
    isLoading.value = false
  }, prefersReduced ? 0 : 900)
})
</script>

<template>
  <Transition name="loader-fade">
    <div v-if="isLoading" class="page-loader">
      <span class="loader-mark">ΛZ</span>
    </div>
  </Transition>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-canvas);
}

.loader-mark {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  animation: loader-pulse 0.9s ease-in-out infinite;
}

@keyframes loader-pulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.loader-fade-leave-active {
  transition: opacity 0.4s ease;
}

.loader-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .loader-mark {
    animation: none;
  }
}
</style>
