<script setup>
useHead({
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Azani Ramadhan',
        'jobTitle': 'Front End Engineer',
        'url': 'https://azani-ramadhan.vercel.app',
        'image': 'https://azani-ramadhan.vercel.app/profile.jpg',
        'email': 'mailto:azanirr212@gmail.com',
        'sameAs': [
          'https://www.linkedin.com/in/azaniramadhan',
          'https://github.com/azanirr',
        ],
        'worksFor': { '@type': 'Organization', 'name': 'Mekari' },
        'alumniOf': { '@type': 'CollegeOrUniversity', 'name': 'Gadjah Mada University' },
        'address': { '@type': 'PostalAddress', 'addressCountry': 'ID' },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <a href="#main" class="skip-link">Skip to content</a>
    <PageLoader />
    <div class="grain-overlay" aria-hidden="true" />
    <CustomCursor />
    <TheNav />
    <NuxtPage />
    <TheFooter />
    <BackToTop />
  </div>
</template>
