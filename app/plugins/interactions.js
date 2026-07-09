import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

    document.addEventListener('click', (event) => {
      const anchor = event.target.closest('a[href*="#"]')
      if (!anchor) return
      const url = new URL(anchor.href, window.location.origin)
      if (url.pathname !== window.location.pathname) return
      if (url.hash.length < 2) return
      const target = document.querySelector(url.hash)
      if (!target) return

      event.preventDefault()
      history.pushState(null, '', url.hash)

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.to(window, {
        scrollTo: { y: url.hash === '#top' ? 0 : target, offsetY: 56 },
        duration: reduceMotion ? 0 : 0.9,
        ease: 'power3.out',
      })
    })
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const delay = parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0
      el.__revealTween = gsap.from(el, {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    },
    unmounted(el) {
      el.__revealTween?.revert()
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
