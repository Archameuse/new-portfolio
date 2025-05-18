<template>
  <aside v-if="exist" aria-disabled="true" @click="close" :class="(show&&active)?'opacity-100 pointer-events-all':'opacity-0 pointer-events-none'" :style="active&&{paddingRight:16+scrollbarwidth+'px'}" class="fixed top-0 left-0 z-50 w-full h-full p-4 flex items-end justify-center transition duration-400 ease-out">
    <div class="absolute top-0 left-0 bg-black w-full h-full opacity-60"></div>
    <div @click.stop.prevent :class="(show&&active)?'translate-y-0':'translate-y-full'" class="w-full h-9/10 max-w-4xl max-h-[42rem] bg-primary-light dark:bg-primary-dark brightness-85 z-50 relative rounded-md overflow-hidden transition duration-500">
      <img class=" w-full h-full absolute top-0 left-0 opacity-40 dark:opacity-25 blur-xl object-cover" :src="project.src">
      <div class="flex flex-col h-full overflow-y-auto w-full text-secondary-light dark:text-primary-light brightness-100 py-6 px-4">
        <button @click="close" class="h-8 w-8 p-1 border rounded-md hover:bg-secondary-light focus:bg-secondary-light hover:text-primary-light focus:text-primary-light cursor-pointer active:opacity-80 transition">
          <svg stroke="currentColor"  class="w-full h-full" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path  stroke="currentColor" d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>
              <path  stroke="currentColor" d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </button>
        <h1>{{ project.title }}</h1>
        <hr class="w-full">
        <p class="mt-6">
          {{ $t(`projects.${project.descr}`) }}
        </p>
        <img class="w-full h-auto rounded-xl mt-6" draggable="false" :src="project.src">
        <div class="flex w-full justify-between">
          <a :href="project.url" class="py-2 px-4 border mt-4 mb-2 uppercase flex items-center gap-2 justify-center cursor-pointer hover:bg-secondary-light hover:text-primary-light focus:text-primary-light focus:bg-secondary-light active:opacity-80 transition-all rounded-lg">
            {{ $t('projects.visit') }}
            <div class="h-6 aspect-square">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>
          </a>
          <a :href="project.git" class="py-2 px-4 border mt-4 mb-2 uppercase flex items-center gap-2 justify-center cursor-pointer hover:bg-secondary-light hover:text-primary-light focus:text-primary-light focus:bg-secondary-light active:opacity-80 transition-all rounded-lg">
            {{ $t('projects.source') }}
            <div class="h-6 aspect-square">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9992 5.95846C21.0087 6.565 20.9333 7.32649 20.8658 7.8807C20.8395 8.09686 20.8037 8.27676 20.7653 8.42453C21.6227 10.01 22 11.9174 22 14C22 16.4684 20.8127 18.501 18.9638 19.8871C17.1319 21.2605 14.6606 22 12 22C9.33939 22 6.86809 21.2605 5.0362 19.8871C3.18727 18.501 2 16.4684 2 14C2 11.9174 2.37732 10.01 3.23472 8.42452C3.19631 8.27676 3.16055 8.09685 3.13422 7.8807C3.06673 7.32649 2.99133 6.565 3.00081 5.95846C3.01149 5.27506 3.10082 4.5917 3.19988 3.91379C3.24569 3.60028 3.31843 3.30547 3.65883 3.11917C4.00655 2.92886 4.37274 2.99981 4.73398 3.1021C5.95247 3.44713 7.09487 3.93108 8.16803 4.51287C9.2995 4.17287 10.5783 4 12 4C13.4217 4 14.7005 4.17287 15.832 4.51287C16.9051 3.93108 18.0475 3.44713 19.266 3.1021C19.6273 2.99981 19.9935 2.92886 20.3412 3.11917C20.6816 3.30547 20.7543 3.60028 20.8001 3.91379C20.8992 4.5917 20.9885 5.27506 20.9992 5.95846ZM20 14C20 12.3128 19.6122 10 17.5 10C16.5478 10 15.6474 10.2502 14.7474 10.5004C13.8482 10.7502 12.9495 11 12 11C11.0505 11 10.1518 10.7502 9.25263 10.5004C8.35261 10.2502 7.45216 10 6.5 10C4.39379 10 4 12.3197 4 14C4 15.7636 4.82745 17.231 6.23588 18.2869C7.66135 19.3556 9.69005 20 12 20C14.3099 20 16.3386 19.3555 17.7641 18.2869C19.1726 17.231 20 15.7636 20 14ZM10 14.5C10 15.8807 9.32843 17 8.5 17C7.67157 17 7 15.8807 7 14.5C7 13.1193 7.67157 12 8.5 12C9.32843 12 10 13.1193 10 14.5ZM15.5 17C16.3284 17 17 15.8807 17 14.5C17 13.1193 16.3284 12 15.5 12C14.6716 12 14 13.1193 14 14.5C14 15.8807 14.6716 17 15.5 17Z" fill="currentColor"></path> </g></svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { PropType } from 'vue';
import type { projectType } from './text/projects';
import useScrollbarWidth from './utils/useScrollbarWidth';
  const props = defineProps({
    project: {
      type: Object as PropType<projectType>,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  })
  const exist = ref<boolean>(false)
  const show = ref<boolean>(props.active)
  const timerRef = ref<number|undefined>()
  const scrollbarwidth = useScrollbarWidth()

  watch(props, ({active}) => {
    if(active) {
      exist.value = true
      if(timerRef.value) {
        clearTimeout(timerRef.value)
        timerRef.value = undefined
      }
    }
  })
  watch(exist, (val) => {
    setTimeout(() => {
      show.value = val
    }, 1)
  })
  const emit = defineEmits(['close'])
  const close = () => {
    emit('close')
    timerRef.value = setTimeout(() => {
      exist.value = false
    }, 500)
  }
</script>
