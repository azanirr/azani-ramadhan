export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el) {
      el.classList.add('reveal')
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        },
        { threshold: 0.15 },
      )
      observer.observe(el)
      el.__revealObserver = observer
    },
    unmounted(el) {
      el.__revealObserver?.disconnect()
    },
  })

  nuxtApp.vueApp.directive('magnetic', {
    mounted(el) {
      const strength = 0.35

      function handleMove(e) {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) * strength
        const y = (e.clientY - rect.top - rect.height / 2) * strength
        el.style.setProperty('--magnet-x', `${x}px`)
        el.style.setProperty('--magnet-y', `${y}px`)
      }

      function handleLeave() {
        el.style.setProperty('--magnet-x', '0px')
        el.style.setProperty('--magnet-y', '0px')
      }

      el.addEventListener('mousemove', handleMove)
      el.addEventListener('mouseleave', handleLeave)
      el.__magneticCleanup = () => {
        el.removeEventListener('mousemove', handleMove)
        el.removeEventListener('mouseleave', handleLeave)
      }
    },
    unmounted(el) {
      el.__magneticCleanup?.()
    },
  })
})
