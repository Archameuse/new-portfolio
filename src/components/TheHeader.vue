<template>
  <header
    aria-label="Site header"
    role="banner"
    class="sticky top-0 w-full h-[clamp(3rem,4vw,5rem)] py-2 px-4 flex items-center justify-end pointer-events-none z-40 max-w-5xl mx-auto"
  >
    <button
      @click="bool = !bool"
      :aria-label="bool ? 'Close menu' : 'Open menu'"
      aria-controls="navigation-menu"
      class="h-full aspect-square relative z-40 cursor-pointer pointer-events-auto"
    >
      <CrossIcon v-if="bool" aria-hidden="true" />
      <MenuIcon v-else aria-hidden="true" />
      <span class="sr-only">{{ bool ? 'Close menu' : 'Open menu' }}</span>
    </button>
  </header>
  <nav
    ref="navRef"
    id="navigation-menu"
    :aria-hidden="!bool"
    aria-label="Main navigation"
    :class="!bool && '[clip-path:inset(0_0_0_100%)]'"
    class="fixed top-0 right-0 h-full w-full flex flex-col items-center bg-secondary-light dark:bg-secondary-dark transition-all [clip-path:inset(0)] duration-700 select-none z-30 overflow-y-auto"
  >
    <div
      aria-hidden="true"
      class="h-[clamp(3rem,4vw,5rem)] w-full border-b border-primary-light dark:border-primary-light"
    ></div>
    <ul
      role="menu"
      aria-orientation="vertical"
      class="flex flex-col items-start text-primary-light font-bold text-2xl sm:text-4xl py-4 px-2 w-full max-w-xl"
    >
      <HeaderButton
        :tabindex="bool ? 0 : -1"
        aria-label="Toggle dark mode"
        @click="themeChange"
        class="flex justify-between"
      >
        DarkMode()
        <div class="flex w-24 sm:w-36 justify-between opacity-40 capitalize">
          <p>//</p>
          <p class="dark:hidden">False</p>
          <p class="hidden dark:block">True</p>
        </div>
      </HeaderButton>
      <HeaderButton
        :tabindex="bool ? 0 : -1"
        :aria-label="`Change language. Current language: ${$i18n.locale}`"
        @click="langChange"
        class="flex justify-between"
      >
        Language()
        <div class="flex w-24 sm:w-36 justify-between opacity-40 uppercase">
          <p>//</p>
          <p>{{ $i18n.locale }}</p>
        </div>
      </HeaderButton>
      <HeaderButton
        :tabindex="bool ? 0 : -1"
        aria-label="Navigate to home section"
        @click="() => scrollFunc('home')"
        >Home()</HeaderButton
      >
      <HeaderButton
        :tabindex="bool ? 0 : -1"
        aria-label="Navigate to about me section"
        @click="() => scrollFunc('about')"
        >AboutMe()</HeaderButton
      >
      <HeaderButton
        :tabindex="bool ? 0 : -1"
        aria-label="Navigate to projects section"
        @click="() => scrollFunc('projects')"
        >Projects()</HeaderButton
      >
      <HeaderButton
        :tabindex="bool ? 0 : -1"
        aria-label="Navigate to contacts section"
        @click="scrollDown"
        >ContactMe()</HeaderButton
      >
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CrossIcon from './icons/CrossIcon.vue'
import MenuIcon from './icons/MenuIcon.vue'
import HeaderButton from './HeaderButton.vue'
const navRef = ref<HTMLElement>()

const bool = ref<boolean>(false)
const chain = {
  en: 'ru',
  ru: 'ua',
  ua: 'en',
}
const { locale } = useI18n({ useScope: 'global' })
// const DarkMode = ref<boolean>(!!localStorage.getItem('dark'))
const langChange = () => {
  const a =
    locale.value === 'en' || locale.value === 'ru' || locale.value === 'ua' ? locale.value : 'ua'
  locale.value = chain[a]
  localStorage.setItem('locale', locale.value)
}
const themeChange = () => {
  // DarkMode.value = !DarkMode.value
  if (document.documentElement.toggleAttribute('theme-dark')) {
    localStorage.setItem('theme', 'dark')
  } else localStorage.setItem('theme', 'light')
}

const scrollFunc = (to: string) => {
  const target: HTMLElement | null = document.getElementById(to)
  if (target)
    target.scrollIntoView({
      behavior: 'smooth',
    })
  // @ts-expect-error blur doesnt exist for whatever reason
  if (document.activeElement) document.activeElement.blur()
  bool.value = false
}
const scrollDown = () => {
  scrollTo({
    behavior: 'smooth',
    top: document.documentElement.scrollHeight,
  })
  bool.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    bool.value = false
  }

  if (e.key === 'Tab' && navRef.value) {
    const focusables = navRef.value.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  }
}

watch(bool, (isActive) => {
  if (isActive) {
    navRef.value?.focus()
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
