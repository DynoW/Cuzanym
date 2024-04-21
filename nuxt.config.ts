import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  devtools: { enabled: false },
  routeRules: {
    '/survey': { redirect: 'https://docs.google.com/forms/d/e/1FAIpQLSef26aRdhF3lF7ZPSDSh37VadOF8WTFTuetCS0RsbzEUtLnSg/viewform?usp=sf_link' },
    '/?error=server_error&error_code=500&error_description=Database+error+saving+new+user': { redirect: '/' },
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    "@nuxt/content",
    "@nuxt/image",
    'nuxt-icon',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'system'
  },
  // const { colorMode, toggleColorMode } = useColorMode() | <button @click="toggleColorMode">Toggle Dark Mode</button>
  css: ['@/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/',
      exclude: ['/policy', '/terms'],
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ro',
      },
    },
  },
})