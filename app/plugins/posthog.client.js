import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  posthog.init('phc_zSjpDhJ7PcSyEiunoW2TGiqpmKZZ9EtyVFnzNENVZsy4', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
  })
})
