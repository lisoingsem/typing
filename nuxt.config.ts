export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Krupyang — Khmer Typing',
      htmlAttrs: { lang: 'km' },
      meta: [
        { name: 'description', content: 'A fast, calm, Khmer-native typing practice app.' },
        { name: 'theme-color', content: '#323437' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/brand/krupyang-mark.svg' }],
    },
  },
  typescript: { strict: true, typeCheck: true },
})
