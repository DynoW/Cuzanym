import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  },
  devtools: { enabled: false },
  routeRules: {
    '/': { redirect: '/forum' },
    '/survey': { redirect: 'https://docs.google.com/forms/d/e/1FAIpQLSef26aRdhF3lF7ZPSDSh37VadOF8WTFTuetCS0RsbzEUtLnSg/viewform?usp=sf_link' },
    '/?error=server_error&error_code=500&error_description=Database+error+saving+new+user': { redirect: '/' },
    '/callback': { redirect: 'https://nuzckkykittqpmxxmzlk.supabase.co/auth/v1/callback' },
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    "@nuxtjs/seo",
    "@nuxt/content",
    "@nuxt/image",
    'nuxt-icon',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark'
  },
  css: ['@/assets/css/main.css'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirectOptions: {
      login: '/login',
      callback: '/callback',
      exclude: ['/forum', '/forum/tutorial','/cluburi', '/cluburi/*', '/evenimente', '/terms', '/policy', '/work-in-progress', '/about', '/api/get/topics'],
    }
  },
  extends: '@nuxt-themes/typography',
  site: {
    url: process.env.SITE_URL,
    name: 'Cuzanym',
    description: 'Agile - Skills for the future',
    defaultLocale: 'ro',
  },
})