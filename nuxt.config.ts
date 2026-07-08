// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Azani Ramadhan — Front End Engineer',
      meta: [
        {
          name: 'description',
          content: 'Front End Engineer with 5+ years building scalable web applications with Vue, React, and Nuxt.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Azani Ramadhan — Front End Engineer' },
        {
          property: 'og:description',
          content: 'Front End Engineer with 5+ years building scalable web applications with Vue, React, and Nuxt.',
        },
        { property: 'og:image', content: '/profile.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Azani Ramadhan — Front End Engineer' },
        {
          name: 'twitter:description',
          content: 'Front End Engineer with 5+ years building scalable web applications with Vue, React, and Nuxt.',
        },
        { name: 'twitter:image', content: '/profile.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
        },
      ],
    },
  },
})
