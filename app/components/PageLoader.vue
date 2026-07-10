<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const isLoading = ref(true)
const rallies = ref(0)
const canvas = ref(null)
const gameEnabled = ref(false)
let frameId
let cleanupInput

const W = 220
const H = 140
const PADDLE_W = 46
const PADDLE_H = 8

function dismiss() {
  isLoading.value = false
}

function startGame() {
  const ctx = canvas.value.getContext('2d')
  const style = getComputedStyle(document.documentElement)
  const ink = style.getPropertyValue('--color-ink').trim() || '#ffffff'
  const accent = style.getPropertyValue('--color-accent').trim() || '#0099ff'
  const surface = style.getPropertyValue('--color-surface-1').trim() || '#141414'

  const paddle = { x: (W - PADDLE_W) / 2 }
  const ball = { x: W / 2, y: H / 2, vx: 1.6, vy: -2.1, r: 5 }

  function movePaddleTo(clientX) {
    const rect = canvas.value.getBoundingClientRect()
    const scale = W / rect.width
    const localX = (clientX - rect.left) * scale
    paddle.x = Math.min(W - PADDLE_W, Math.max(0, localX - PADDLE_W / 2))
  }

  function handlePointer(event) {
    const point = event.touches ? event.touches[0] : event
    movePaddleTo(point.clientX)
  }

  function handleKey(event) {
    if (event.key === 'ArrowLeft') paddle.x = Math.max(0, paddle.x - 18)
    if (event.key === 'ArrowRight') paddle.x = Math.min(W - PADDLE_W, paddle.x + 18)
  }

  canvas.value.addEventListener('mousemove', handlePointer)
  canvas.value.addEventListener('touchmove', handlePointer, { passive: true })
  window.addEventListener('keydown', handleKey)
  cleanupInput = () => {
    canvas.value?.removeEventListener('mousemove', handlePointer)
    canvas.value?.removeEventListener('touchmove', handlePointer)
    window.removeEventListener('keydown', handleKey)
  }

  function tick() {
    ball.x += ball.vx
    ball.y += ball.vy

    if (ball.x <= ball.r || ball.x >= W - ball.r) ball.vx *= -1
    if (ball.y <= ball.r) ball.vy *= -1

    const paddleY = H - 14
    if (
      ball.y >= paddleY - ball.r
      && ball.y <= paddleY + PADDLE_H
      && ball.x >= paddle.x
      && ball.x <= paddle.x + PADDLE_W
      && ball.vy > 0
    ) {
      ball.vy *= -1
      ball.vx += (ball.x - (paddle.x + PADDLE_W / 2)) * 0.04
      rallies.value += 1
    }

    if (ball.y > H + 20) {
      ball.x = W / 2
      ball.y = H / 2
      ball.vx = (Math.random() > 0.5 ? 1 : -1) * 1.6
      ball.vy = -2.1
    }

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = surface
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = accent
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = ink
    ctx.fillRect(paddle.x, paddleY, PADDLE_W, PADDLE_H)

    frameId = requestAnimationFrame(tick)
  }

  tick()
}

onMounted(async () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  gameEnabled.value = !prefersReduced

  if (gameEnabled.value) {
    await nextTick()
    if (canvas.value) startGame()
  }

  const minDuration = prefersReduced ? 0 : coarsePointer ? 1100 : 1700
  setTimeout(dismiss, minDuration)
})

onUnmounted(() => {
  if (frameId) cancelAnimationFrame(frameId)
  cleanupInput?.()
})
</script>

<template>
  <Transition name="loader-fade">
    <div v-if="isLoading" class="page-loader">
      <span class="loader-mark">ΛZ</span>

      <canvas
        v-if="gameEnabled"
        ref="canvas"
        class="loader-game"
        :width="W"
        :height="H"
        aria-hidden="true"
      />
      <p v-if="gameEnabled" class="loader-hint">
        rallies: {{ rallies }} · move to play
      </p>

      <button v-if="gameEnabled" type="button" class="loader-skip" @click="dismiss">
        Skip
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  background: var(--color-canvas);
}

.loader-mark {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  animation: loader-pulse 0.9s ease-in-out infinite;
}

.loader-game {
  border-radius: var(--radius-md);
  touch-action: none;
  cursor: none;
}

.loader-hint {
  margin: 0;
  font-size: 12px;
  color: var(--color-ink-muted);
  letter-spacing: 0.02em;
}

.loader-skip {
  position: absolute;
  bottom: var(--space-xl);
  background: none;
  border: none;
  padding: 8px 14px;
  color: var(--color-ink-muted);
  font-size: 13px;
  cursor: pointer;
}

.loader-skip:hover {
  color: var(--color-ink);
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
