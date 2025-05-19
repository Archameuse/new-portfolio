<template>
  <header class="sticky top-0 w-full h-[clamp(3rem,4vw,5rem)] py-2 px-4 flex items-center justify-end pointer-events-none z-40 max-w-5xl mx-auto">
    <!-- <div :class="bool?'text-primary-light':'text-secondary-light'" @click="bool=!bool" class="h-full aspect-square relative z-40 cursor-pointer"> -->
    <div @click="bool=!bool" class="h-full aspect-square relative z-40 cursor-pointer">
      <svg v-if="bool" stroke="currentColor"  class="w-full h-full absolute top-0 left-0 z-30 pointer-events-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path class="text-secondary-light dark:text-transparent" stroke="currentColor" d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
          <path class="text-primary-light dark:text-primary-light" stroke="currentColor" d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
      </svg>
      <svg v-else  class="w-full h-full absolute top-0 left-0 z-30 pointer-events-auto overflow-visible" viewBox="0 0 16.00 16.00" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path class="text-primary-light dark:text-transparent" stroke-width="1" fill="none" stroke="currentColor" d="M0 0h4v4H0V0zm0 6h4v4H0V6zm0 6h4v4H0v-4zM6 0h4v4H6V0zm0 6h4v4H6V6zm0 6h4v4H6v-4zm6-12h4v4h-4V0zm0 6h4v4h-4V6zm0 6h4v4h-4v-4z" fill-rule="evenodd"></path>
          <path class="text-secondary-light dark:text-primary-light" fill="currentColor" stroke="none" d="M0 0h4v4H0V0zm0 6h4v4H0V6zm0 6h4v4H0v-4zM6 0h4v4H6V0zm0 6h4v4H6V6zm0 6h4v4H6v-4zm6-12h4v4h-4V0zm0 6h4v4h-4V6zm0 6h4v4h-4v-4z" fill-rule="evenodd"></path>
        </g>
      </svg>
    </div>
  </header>
  <menu :class="!bool&&'[clip-path:inset(0_0_0_100%)]'" class="fixed top-0 right-0 h-full w-full flex flex-col items-center bg-secondary-light dark:bg-secondary-dark transition-all [clip-path:inset(0)] duration-700 select-none z-30 overflow-y-auto">
    <div class="h-[clamp(3rem,4vw,5rem)] w-full border-b border-primary-light dark:border-primary-light"></div>
    <ul class="flex flex-col items-start text-primary-light font-bold text-2xl sm:text-4xl py-4 px-2 w-full max-w-xl
    [&>li]:border-b-2 [&>li]:w-full [&>li]:cursor-pointer [&>li]:py-2 [&>li]:px-4
    [&>li]:hover:bg-primary-light [&>li]:hover:text-secondary-light [&>li]:dark:hover:text-secondary-dark [&>li]:transition-all
    [&>li]:active:opacity-80
    ">
      <li @click="themeChange" class="flex justify-between">DarkMode()
        <div class="flex w-24 sm:w-36 justify-between opacity-40 capitalize">
          <p>//</p>
          <p class="dark:hidden">False</p>
          <p class="hidden dark:block">True</p>
        </div>
      </li>
      <li @click="langChange" class="flex justify-between">Language()
        <div class="flex w-24 sm:w-36 justify-between opacity-40 uppercase">
          <p>//</p>
          <p>{{ $i18n.locale }}</p>
        </div>
      </li>
      <!-- <li @click="() => (LangId++>=languages.length-1&&(LangId=0))" class="flex justify-between">Language()
        <div class="flex w-24 sm:w-36 justify-between opacity-40 uppercase">
          <p>//</p>
          <p>{{languages[LangId]}}</p>
        </div>
      </li> -->
      <li @click="() => scrollFunc('home')">Home()</li>
      <li @click="() => scrollFunc('about')">AboutMe()</li>
      <li @click="() => scrollFunc('projects')">Projects()</li>
      <li @click="scrollDown">ContactMe()</li>
    </ul>
  </menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const chain = {
  'en': 'ru',
  'ru': 'ua',
  'ua': 'en'
}
const {locale} = useI18n({useScope: 'global'})
const bool = ref<boolean>(false)
// const DarkMode = ref<boolean>(!!localStorage.getItem('dark'))
const langChange = () => {
  const a = (locale.value==='en'||locale.value==='ru'||locale.value==='ua')?locale.value:'ua'
  locale.value = chain[a]
  localStorage.setItem('locale',locale.value)
}
const themeChange = () => {
  // DarkMode.value = !DarkMode.value
  if(document.documentElement.toggleAttribute('theme-dark')) {
    localStorage.setItem('theme', 'dark')
  } else localStorage.setItem('theme', 'light')
}

const scrollFunc = (to:string) => {
  const target:HTMLElement|null = document.getElementById(to)
  if(target) target.scrollIntoView({
    behavior: 'smooth'
  })
  bool.value = false
}
const scrollDown = () => {
  scrollTo({
    behavior: 'smooth',
    top: document.documentElement.scrollHeight
  })
  bool.value = false
}
</script>
