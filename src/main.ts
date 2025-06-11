import './assets/main.css'

import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import text from './text/text.json'

const locale = (localStorage.getItem('locale') || navigator.language || 'en')
  .substring(0, 2)
  .toLowerCase()
const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: 'en',
  messages: text,
})
const theme = localStorage.getItem('theme')
if (theme === 'dark') document.documentElement.setAttribute('theme-dark', '')
else if (theme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('theme-dark', '')
if (!localStorage.getItem('locale')) localStorage.setItem('locale', locale)

// Export the app using ViteSSG
export const createApp = ViteSSG(App, ({ app }) => {
  app.use(i18n)
})
