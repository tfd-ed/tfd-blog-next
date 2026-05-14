// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'motion-v/nuxt',
    '@nuxt/content',
    '@nuxt/fonts'
  ],
  content: {
    build: {
      markdown: {
        highlight: {
          // theme: 'github-dark',
          langs: [
            'python',
            'sh',
            'vue'
          ]
        },
        remarkPlugins: {
          'remark-math': {}
        },
        rehypePlugins: {
          "rehype-katex": {},
        },
      }
    }
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'km',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'km', name: 'Khmer', file: 'km.json' }
    ]
  },
  css: ['~/assets/css/main.css'],
  // googleFonts: {
  //   families: {
  //     "Roboto": true,
  //     "Source Sans Pro": true,
  //     'Kantumruy Pro': true,
  //     'Playfair Display': true
  //   }
  // },
  fonts: {
    families: [
      {
        name: 'Google Sans',
        weights: [400, 500, 600, 700, 800, 900],
        global: true, provider: 'google',
        subsets: ['latin', 'khmer']
      },
    ]
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  // icon: {
  //   serverBundle: {
  //     collections: ['lucide']
  //   }
  // },
  devtools: { enabled: true }
})