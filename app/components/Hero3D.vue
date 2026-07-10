<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import * as THREE from 'three'

const canvas = ref(null)
let renderer, scene, camera, group, frameId, resizeObserver, themeObserver
let xTo, yTo

function readColors() {
  const style = getComputedStyle(document.documentElement)
  const read = (name) => style.getPropertyValue(name).trim() || '#ffffff'
  return [read('--color-block-1'), read('--color-block-2'), read('--color-block-3')]
}

function buildMesh() {
  const geometry = new THREE.IcosahedronGeometry(1, 1)
  const position = geometry.attributes.position
  const colorArray = new Float32Array(position.count * 3)
  const [c1, c2, c3] = readColors().map((hex) => new THREE.Color(hex))
  const tmp = new THREE.Vector3()

  for (let i = 0; i < position.count; i++) {
    tmp.fromBufferAttribute(position, i)
    const t = (tmp.y + 1) / 2
    const mixed = t < 0.5
      ? c1.clone().lerp(c2, t * 2)
      : c2.clone().lerp(c3, (t - 0.5) * 2)
    colorArray[i * 3] = mixed.r
    colorArray[i * 3 + 1] = mixed.g
    colorArray[i * 3 + 2] = mixed.b
  }

  geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true,
    roughness: 0.45,
    metalness: 0.15,
  })

  const mesh = new THREE.Mesh(geometry, material)

  const edges = new THREE.EdgesGeometry(geometry)
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }),
  )

  const wrapper = new THREE.Group()
  wrapper.add(mesh, line)
  return { wrapper, material, geometry, edges }
}

onMounted(() => {
  if (!import.meta.client || !canvas.value) return
  if (window.matchMedia('(pointer: coarse)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (window.innerWidth < 811) return

  const size = canvas.value.clientWidth || 260

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, 1, 0.1, 10)
  camera.position.z = 3.3

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(size, size, false)

  scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1.1))
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.4)
  dirLight.position.set(2, 3, 4)
  scene.add(dirLight)

  const { wrapper } = buildMesh()
  group = wrapper
  scene.add(group)

  xTo = gsap.quickTo(group.rotation, 'y', { duration: 0.6, ease: 'power3' })
  yTo = gsap.quickTo(group.rotation, 'x', { duration: 0.6, ease: 'power3' })

  let baseRotation = 0
  let lastTime = performance.now()

  function handlePointerMove(event) {
    const nx = (event.clientX / window.innerWidth) * 2 - 1
    const ny = (event.clientY / window.innerHeight) * 2 - 1
    xTo(baseRotation + nx * 0.5)
    yTo(ny * 0.35)
  }

  function tick() {
    const now = performance.now()
    baseRotation += ((now - lastTime) / 1000) * 0.25
    lastTime = now
    if (!gsap.isTweening(group.rotation)) group.rotation.y = baseRotation
    renderer.render(scene, camera)
    frameId = requestAnimationFrame(tick)
  }

  window.addEventListener('mousemove', handlePointerMove)
  tick()

  resizeObserver = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width
    if (!width) return
    renderer.setSize(width, width, false)
  })
  resizeObserver.observe(canvas.value)

  themeObserver = new MutationObserver(() => {
    const { wrapper: fresh } = buildMesh()
    scene.remove(group)
    group.traverse((child) => {
      child.geometry?.dispose()
      child.material?.dispose()
    })
    group = fresh
    scene.add(group)
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handlePointerMove)
    if (frameId) cancelAnimationFrame(frameId)
    resizeObserver?.disconnect()
    themeObserver?.disconnect()
    group?.traverse((child) => {
      child.geometry?.dispose()
      child.material?.dispose()
    })
    renderer?.dispose()
  })
})
</script>

<template>
  <canvas ref="canvas" class="hero-3d" aria-hidden="true" />
</template>

<style scoped>
.hero-3d {
  position: absolute;
  inset: -40px;
  width: calc(100% + 80px);
  height: calc(100% + 80px);
  z-index: 0;
  display: block;
  pointer-events: none;
}
</style>
