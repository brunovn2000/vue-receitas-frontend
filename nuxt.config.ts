// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/scss/main.scss',
  ],

  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],

  runtimeConfig: {
    apiBase: 'http://localhost:3000/api/v1',
    public: {
      apiBase: '/api/v1',
    },
  },

  components: [
    { path: '~/components/app', pathPrefix: false },
    { path: '~/components/recipes', pathPrefix: false },
    '~/components',
  ],

  nitro: {
    routeRules: {
      '/api/v1/**': { proxy: 'http://localhost:3000/api/v1/**' },
    },
  },
})


