// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    // Server-only — reads YOUTUBE_API_KEY from .env in dev,
    // and from Cloudflare Pages env vars (plain text) in prod
    youtubeApiKey: process.env.NUXT_YOUTUBE_API_KEY ?? '',
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@stefanobartoletti/nuxt-social-share',
    '@nuxt/image',
    'motion-v/nuxt',
    '@nuxt/content',
    '@nuxt/fonts',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
    '@nuxtjs/plausible'
  ],
  plausible: {
    autoOutboundTracking: true,
    fileDownloads: true,
    formSubmissions: true,
    // Prevent tracking on localhost
    ignoredHostnames: ['localhost'],
    apiHost: 'https://plausible.tfdevs.com',
  },
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
    baseUrl: 'https://tfdevs.com',
    strategy: 'prefix_except_default',
    defaultLocale: 'km',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'km', name: 'Khmer', file: 'km.json' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'km'
    }
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
  socialShare: {
    baseUrl: 'https://tfdevs.com' // required!
    // other optional module options
  },
  site: {
    url: 'https://tfdevs.com',
    name: 'TFDevs'
  },
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
  app: {
    pageTransition: { name: 'page' }
  },
  image: {
    cloudflare: {
      baseURL: 'https://tfdevs.com'
    }
  },
  // ogImage: {
  //   zeroRuntime: true
  // },
  vite: {
    optimizeDeps: {
      include: [
        'vue-i18n',
        '@intlify/shared',
        '@intlify/message-compiler',
        '@intlify/core-base',
        '@intlify/core',
        '@intlify/utils/h3',
        'ufo',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/core',
      ]
    }
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: [
        '/',
        '/en',
        '/about-us',
        // '/services',
        '/articles',
        // '/courses',
        // '/projects',
        // '/playrooms',
      ],
    },
    routeRules: {
      // Static content pages - ISR in prod
      // Homepage has dynamic YouTube videos — serve fresh from Nitro, don't let Cloudflare cache the HTML
      '/': isDev ? {} : { isr: 3600, headers: { 'cache-control': 'no-store' } },
      '/en': isDev ? {} : { isr: 3600, headers: { 'cache-control': 'no-store' } },
      // YouTube API: Nitro ISR saves quota, but CDN must not cache (no-store)
      // '/api/youtube-videos': isDev ? {} : { isr: 3600, headers: { 'cache-control': 'no-store' } },
      '/about-us': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      '/en/about-us': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/services': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/en/services': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      '/articles': isDev ? {} : { isr: 3600, headers: { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' } },
      '/en/articles': isDev ? {} : { isr: 3600, headers: { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' } },
      '/articles/**': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      '/en/articles/**': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/courses': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/en/courses': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/projects': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/en/projects': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // Playroom index - cacheable; individual tools are client-side interactive
      // '/playrooms': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/en/playrooms': isDev ? {} : { isr: 86400, headers: { 'cache-control': 's-maxage=86400, stale-while-revalidate=604800' } },
      // '/playrooms/object-detection': { ssr: false },
      // '/en/playrooms/object-detection': { ssr: false },
      // '/playrooms/document-qa': { ssr: false },
      // '/en/playrooms/document-qa': { ssr: false },
      // '/playrooms/summarization': { ssr: false },
      // '/en/playrooms/summarization': { ssr: false },
      // OG images - long cache (they rarely change)
      // '/__og-image__/**': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } },
      // Static assets - very long cache (fingerprinted by Vite)
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
    compressPublicAssets: true,
    devStorage: {
      // Use in-memory storage in dev to avoid EISDIR conflict where
      // nuxt/payload/ directory and nuxt/payload file path collide
      nuxt: { driver: 'memory' }
    }
  },
  devtools: { enabled: true }
})