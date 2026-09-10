// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/fonts', '@unocss/nuxt'],
  unocss: {
    nuxtLayers: true,
  },
  runtimeConfig: {
    public: {
      updatedAt: '%UPDATED_AT%',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/projects': { prerender: true },
    '/bookmarks': { prerender: true },
  },
})
