import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    "@nuxt/image",
    'nuxt-icon',
//  '@nuxtjs/color-mode',  // const { colorMode, toggleColorMode } = useColorMode() | <button @click="toggleColorMode">Toggle Dark Mode</button>
  ],
  css: ['@/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: ['/policy', '/terms', '/confirm'],
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