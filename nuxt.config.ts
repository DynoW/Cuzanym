import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/auth/v1/callback': { proxy: 'https://nlcgmuwupgqpxcurbmbi.supabase.co/auth/v1/callback' },
    },
    prerender: {
      autoSubfolderIndex: false
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    //  '@nuxtjs/color-mode',  // const { colorMode, toggleColorMode } = useColorMode() | <button @click="toggleColorMode">Toggle Dark Mode</button>
    'nuxt-icon',
    "@nuxt/content"
  ],
  css: ['@/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/policy', '/terms', '/confirm', '/auth/v1/callback', '/api/callback'],
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