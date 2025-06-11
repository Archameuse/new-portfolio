<template>
  <section
    class="w-full flex flex-col min-h-section justify-center"
    id="home"
    aria-labelledby="hero-heading"
  >
    <div class="w-full">
      <div class="w-full flex flex-col items-center gap-4">
        <ContactsHolder />
        <div class="aspect-square max-w-56 w-4/5 relative">
          <img
            alt="Portrait of the developer"
            src="/1.jpg"
            draggable="false"
            class="rounded-full h-full w-full object-cover hover:opacity-75 hover:dark:opacity-50 transition-opacity peer duration-300"
          />
          <!-- <img src="/drawing3.svg" draggable="false" class="h-full w-full object-cover hover:opacity-75 hover:dark:opacity-50 transition-opacity peer duration-300"> -->
          <hr
            aria-hidden="true"
            class="absolute -bottom-2 left-0 w-0 peer-hover:w-full text-secondary-light dark:text-primary-light z-50 transition-all duration-500"
          />
        </div>
      </div>
      <div
        class="flex flex-col max-w-xs sm:max-w-sm m-auto px-4 py-2 select-none dark:text-primary-light"
      >
        <h1 id="hero-heading">{{ $t('firstname') }}</h1>
        <h1 class="text-right">{{ $t('lastname') }}</h1>
        <h2 class="text-2xl sm:text-3xl mt-4">Full Stack<br />{{ $t('developer') }}</h2>
      </div>
      <button
        @click="scroll"
        class="text-xl cursor-pointer font-bold px-2 py-1 mb-2 uppercase border-2 border-dashed border-secondary-light dark:border-primary-light flex items-center mt-4 mx-auto dark:text-primary-light hover:bg-secondary-light hover:dark:bg-primary-light hover:text-primary-light dark:hover:text-primary-dark active:opacity-80 transition"
        aria-label="Learn more about me"
      >
        {{ $t('learnmore.learn') }}
        <div class="h-8 aspect-square" aria-hidden="true">
          <ArrowDownIcon />
        </div>
        {{ $t('learnmore.more') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactsHolder from './ContactsHolder.vue'
import ArrowDownIcon from './icons/ArrowDownIcon.vue'

const scroll = () => {
  document.getElementById('about')?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>
