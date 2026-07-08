<script setup>
const enabled = ref(false)
const isHovering = ref(false)
const x = ref(0)
const y = ref(0)

onMounted(() => {
  if (window.matchMedia('(pointer: coarse)').matches) return

  enabled.value = true
  document.body.classList.add('custom-cursor-active')

  function handleMove(event) {
    x.value = event.clientX
    y.value = event.clientY
  }

  function handleOver(event) {
    isHovering.value = !!event.target.closest('a, button, .card, .spotlight-card')
  }

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseover', handleOver)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMove)
    window.removeEventListener('mouseover', handleOver)
    document.body.classList.remove('custom-cursor-active')
  })
})
</script>

<template>
  <div
    v-if="enabled"
    class="cursor-dot"
    :class="{ 'is-active': isHovering }"
    :style="{ transform: `translate(${x}px, ${y}px)` }"
  />
</template>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease;
}

.cursor-dot.is-active {
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
}
</style>
