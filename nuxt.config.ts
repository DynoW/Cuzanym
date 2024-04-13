import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    //    '@nuxtjs/color-mode',  // const { colorMode, toggleColorMode } = useColorMode() | <button @click="toggleColorMode">Toggle Dark Mode</button>
  ],
  css: ['@/assets/css/main.css'],
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm',
    }
  }
})