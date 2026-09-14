<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const canonicalUrl = computed(() => {
  const siteUrl = config.public.siteUrl?.replace(/\/$/, '')
  return siteUrl ? `${siteUrl}${route.path === '/' ? '' : route.path}` : ''
})

useHead(() => ({
  link: canonicalUrl.value ? [{ rel: 'canonical', href: canonicalUrl.value }] : [],
  script: canonicalUrl.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Typing by Krupyang',
      alternateName: 'ហាត់វាយអក្សរខ្មែរ',
      url: canonicalUrl.value,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Any',
      inLanguage: 'km',
      isAccessibleForFree: true,
      description: 'កម្មវិធីហាត់វាយអក្សរខ្មែរលើក្ដារចុច NIDA ជាមួយការណែនាំគ្រាប់ចុច និងម្រាមដៃ។',
    }),
  }] : [],
}))
</script>

<template>
  <div class="min-h-screen bg-page text-text">
    <div class="mx-auto flex min-h-screen max-w-[1320px] flex-col px-5 sm:px-8 lg:px-12">
      <AppHeader />
      <main class="flex flex-1 flex-col">
        <NuxtPage />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
