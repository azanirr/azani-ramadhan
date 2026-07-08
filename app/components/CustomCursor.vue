<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const enabled = ref(false)
const isHovering = ref(false)
const dot = ref(null)

onMounted(async () => {
  if (window.matchMedia('(pointer: coarse)').matches) return

  enabled.value = true
  document.body.classList.add('custom-cursor-active')
  await nextTick()

  gsap.set(dot.value, { xPercent: -50, yPercent: -50, x: -100, y: -100 })
  const xTo = gsap.quickTo(dot.value, 'x', { duration: 0.12, ease: 'power3' })
  const yTo = gsap.quickTo(dot.value, 'y', { duration: 0.12, ease: 'power3' })

  function handleMove(event) {
    xTo(event.clientX)
    yTo(event.clientY)
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
    if (dot.value) gsap.killTweensOf(dot.value)
  })
})
</script>

<template>
  <div
    v-if="enabled"
    ref="dot"
    class="cursor-dot"
    :class="{ 'is-active': isHovering }"
  />
</template>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-ink);
  box-shadow: 0 0 0 2px var(--color-canvas);
  opacity: 0.9;
  pointer-events: none;
  z-index: 9999;
  transition: width 0.2s ease, height 0.2s ease, background-color 0.2s ease;
}

.cursor-dot.is-active {
  width: 36px;
  height: 36px;
  background: var(--color-accent);
}
</style>
