<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const siteOrigin = computed(() => config.public.siteUrl?.replace(/\/$/, ''))

const canonicalUrl = computed(() => {
  return siteOrigin.value ? `${siteOrigin.value}${route.path === '/' ? '' : route.path}` : ''
})

const shareImageUrl = computed(() => `${siteOrigin.value}/brand/typing-share-v2.png`)

useHead(() => ({
  link: canonicalUrl.value ? [{ rel: 'canonical', href: canonicalUrl.value }] : [],
  meta: canonicalUrl.value ? [
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: shareImageUrl.value },
    { property: 'og:image:secure_url', content: shareImageUrl.value },
    { name: 'twitter:image', content: shareImageUrl.value },
  ] : [],
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
