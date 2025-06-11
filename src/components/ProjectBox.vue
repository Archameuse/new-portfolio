<template>
  <div
    class="w-full h-96 relative text-primary-light select-none max-w-5xl mx-auto"
    role="group"
    :aria-label="`${project.title}, ${project.year}, ${project.tags.join(', ')}`"
  >
    <button
      @click="active = true"
      class="w-full h-full flex flex-col justify-end px-8 pb-4 gap-4 cursor-pointer peer"
    >
      <h3 class="text-xl">{{ project.title }}</h3>
      <hr class="w-full h-px" />
      <div class="flex items-center text-xs font-bold gap-4">
        <ul class="flex flex-grow flex-wrap text-primary-light uppercase gap-2 items-center">
          <li class="border border-dashed p-1" v-bind:key="tag" v-for="tag of project.tags">
            {{ tag }}
          </li>
          <li class="items-center flex gap-[inherit]">
            <div aria-hidden="true">•</div>
            <div class="border-b py-1">{{ project.year }}</div>
          </li>
        </ul>
        <a
          :href="project.url"
          @click.stop
          :aria-label="`Visit ${project.title} project site`"
          class="uppercase h-fit px-4 py-2 border rounded-md transition-all hover:bg-white hover:text-black active:brightness-75 cursor-pointer focus:bg-white focus:text-black select-none text-wrap"
          >{{ $t('projects.visit') }}</a
        >
      </div>
    </button>
    <picture>
      <source media="(max-width: 35rem)" :srcset="project.src + '/small.webp'" />
      <img
        :src="project.src + '/big.webp'"
        :alt="`${project.title} preview image`"
        class="w-full h-full object-cover absolute top-0 left-0 -z-10 brightness-50 peer-hover:brightness-15 transition"
        aria-hidden="true"
      />
    </picture>
    <!-- <img
      class="w-full h-full object-cover absolute top-0 left-0 -z-10 brightness-50 peer-hover:brightness-15 transition"
      :srcset="`5.jpg 600w,
                6.jpg 1200w
      `"
      sizes="(min-width: 1024px) 1024px, 100vw"
      :alt="`${project.title} preview image`"
      aria-hidden="true"
    /> -->
    <ProjectModal :active="active" :project="project" v-on:close="() => (active = false)" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { projectType } from '@/text/projects'
import type { PropType } from 'vue'
// import ProjectModal from './ProjectModal.vue'
import useScrollbarWidth from '@/utils/useScrollbarWidth'
import ProjectModal from './ProjectModal.vue'

defineProps({
  project: {
    type: Object as PropType<projectType>,
    required: true,
  },
})
const active = ref<boolean>(false)
watch(active, (val) => {
  if (val) {
    const scrollbarwidth = useScrollbarWidth()
    document.documentElement.style.overflowY = 'hidden'
    document.documentElement.style.marginRight = scrollbarwidth.value + 'px'
  } else {
    document.documentElement.style.overflowY = 'scroll'
    document.documentElement.style.marginRight = '0px'
  }
})
</script>
