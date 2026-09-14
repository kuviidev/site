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
    // base URL of the kuvii/blog backend, proxied via /api/blog/*
    blogApiBase: process.env.BLOG_API_BASE || 'http://localhost:8080',
    public: {
      updatedAt: '%UPDATED_AT%',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/projects': { prerender: true },
    '/bookmarks': { prerender: true },
    '/blog/admin': { ssr: false },
  },
});
