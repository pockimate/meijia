export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n'],
  
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'zh', iso: 'zh-CN', file: 'zh.json', name: '中文' },
      { code: 'ja', iso: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'astro_locale',
      redirectOn: 'root',
    },
  },
  
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'Astro Nails | Cosmic Nail Art',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Future-forward nail art for the digital age. Shop cosmic-themed press-on nails, polishes, and nail care products.' },
        { name: 'keywords', content: 'nail art, press-on nails, cosmic nails, astrology nails, zodiac nails, nail polish' },
        { property: 'og:title', content: 'Astro Nails | Cosmic Nail Art' },
        { property: 'og:description', content: 'Future-forward nail art for the digital age' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { 
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        { 
          rel: 'stylesheet', 
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap' 
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY || '',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    }
  },

  // Performance Optimizations
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/': { prerender: true },
      '/shop': { swr: 3600 },
      '/product/**': { swr: 3600 },
      '/_nuxt/**': { 
        headers: { 
          'cache-control': 'public, max-age=31536000, immutable' 
        } 
      },
    },
  },

  // Build optimizations
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
            'pinia-vendor': ['pinia'],
          },
        },
      },
    },
  },

  compatibilityDate: '2024-01-20'
})
