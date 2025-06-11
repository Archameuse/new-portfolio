<template>
  <section
    class="flex flex-col items-center justify-center w-full min-h-section"
    id="about"
    role="region"
    aria-labelledby="about-heading"
  >
    <div class="flex flex-col items-center md:flex-row md:items-stretch">
      <img
        src="/15.png"
        draggable="false"
        class="w-full min-h-full grow aspect-3/4 min-w-60 max-w-md rounded-md object-cover object-top"
        alt="Portrait of a developer"
      />
      <article
        role="article"
        aria-label="About developer"
        class="flex md:max-w-sm flex-col px-4 text-secondary-light dark:text-primary-light"
      >
        <h2 id="about-heading" class="text-4xl">
          {{ $t('about.hello') }}
          <b class="text-nowrap">{{ $t('firstname') + ' ' + $t('lastname') }}</b>
        </h2>
        <p class="font-light text-xl">
          <b class="font-bold">Full-Stack {{ $t('developer') }}.</b> {{ $t('about.main') }}
        </p>
      </article>
    </div>
    <button
      aria-label="Discover projects"
      @click="scroll"
      class="text-xl cursor-pointer font-bold px-2 py-1 mb-2 uppercase border-2 border-dashed border-secondary-light dark:border-primary-light flex items-center mt-4 mx-auto hover:bg-secondary-light hover:dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark active:opacity-80 transition flex-wrap justify-center"
    >
      {{ $t('discoverprojects.discover') }}
      <div class="h-8 aspect-square">
        <ArrowDownIcon />
      </div>
      {{ $t('discoverprojects.projects') }}
    </button>
  </section>
</template>

<script setup lang="ts">
import ArrowDownIcon from './icons/ArrowDownIcon.vue'

const scroll = () => {
  document.getElementById('projects')?.scrollIntoView({
    behavior: 'smooth',
  })
}
</script>
