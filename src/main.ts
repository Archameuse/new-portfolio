import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n, type DefaultLocaleMessageSchema } from 'vue-i18n'
import text from './components/text/text.json'
const locale = (localStorage.getItem('locale') || navigator.language || 'en').substring(0,2).toLowerCase()
// const dark = (!!localStorage.getItem('dark') || matchMedia('(prefers-color-scheme: dark)').matches)
// if(!localStorage.getItem('dark')) localStorage.setItem('dark', 'true')
if(localStorage.getItem('theme')==='dark') document.documentElement.setAttribute('theme-dark', '')
else if(matchMedia('(prefers-color-scheme: dark)').matches) localStorage.setItem('theme', 'dark')
if(!localStorage.getItem('locale')) localStorage.setItem('locale',locale)
const i18n = createI18n<[DefaultLocaleMessageSchema], 'en'|'ru'|'ua'>({
  locale,
  fallbackLocale: 'en',
  messages: text,
  legacy: false
})
const app = createApp(App)

app.use(i18n)
app.mount('#app')
