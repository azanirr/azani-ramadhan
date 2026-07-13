import { track } from '@vercel/analytics'

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  document.addEventListener('click', (event) => {
    const el = event.target.closest('button, a, [role="button"]')
    if (!el) return

    const label = el.getAttribute('aria-label') || el.textContent.trim().slice(0, 60) || el.tagName.toLowerCase()

    track('Click', {
      label,
      tag: el.tagName.toLowerCase(),
      href: el.href || null,
      page: window.location.pathname,
    })
  })
})
