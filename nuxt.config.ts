export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://typing.krupyang.com',
    },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  app: {
    head: {
      title: 'ហាត់វាយអក្សរខ្មែរ — Typing by Krupyang',
      titleTemplate: '%s — Typing by Krupyang',
      htmlAttrs: { lang: 'km' },
      meta: [
        { name: 'description', content: 'ហាត់វាយអក្សរខ្មែរលើក្ដារចុច NIDA ដោយឥតគិតថ្លៃ ជាមួយការណែនាំម្រាមដៃ ពាក្យខ្មែរត្រឹមត្រូវ និងស្ថិតិល្បឿន WPM។' },
        { name: 'keywords', content: 'ហាត់វាយអក្សរខ្មែរ, រៀនវាយអក្សរខ្មែរ, ក្ដារចុចខ្មែរ NIDA, Khmer typing, Khmer keyboard practice' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'author', content: 'Krupyang' },
        { name: 'theme-color', content: '#23282c' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Typing by Krupyang' },
        { property: 'og:locale', content: 'km_KH' },
        { property: 'og:title', content: 'ហាត់វាយអក្សរខ្មែរ — Typing by Krupyang' },
        { property: 'og:description', content: 'រៀន និងហាត់វាយអក្សរខ្មែរលើក្ដារចុច NIDA ជាមួយការណែនាំគ្រាប់ចុច ម្រាមដៃ និងល្បឿន WPM។' },
        { property: 'og:image:alt', content: 'និមិត្តសញ្ញា Typing by Krupyang' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'ហាត់វាយអក្សរខ្មែរ — Typing by Krupyang' },
        { name: 'twitter:description', content: 'រៀន និងហាត់វាយអក្សរខ្មែរលើក្ដារចុច NIDA ដោយឥតគិតថ្លៃ។' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/brand/krupyang-key.png' },
        { rel: 'apple-touch-icon', href: '/brand/krupyang-key.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  typescript: { strict: true, typeCheck: true },
})
