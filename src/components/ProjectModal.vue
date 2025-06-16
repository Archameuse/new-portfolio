<template>
  <aside
    v-if="exist"
    aria-disabled="true"
    @click="close"
    :class="show && active ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'"
    :style="active && { paddingRight: 16 + scrollbarwidth + 'px' }"
    class="fixed top-0 left-0 z-50 w-full h-full p-4 flex items-end justify-center transition duration-400 ease-out"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <div aria-hidden="true" class="absolute top-0 left-0 bg-black w-full h-full opacity-60"></div>
    <div
      @click.stop
      :class="show && active ? 'translate-y-0' : 'translate-y-full'"
      class="w-full h-9/10 max-w-4xl max-h-[42rem] bg-primary-light dark:bg-primary-dark brightness-85 z-50 relative rounded-md overflow-hidden transition duration-500"
      tabindex="-1"
      ref="modalRef"
    >
      <img
        class="w-full h-full absolute top-0 left-0 opacity-40 dark:opacity-15 object-cover"
        :src="project.src + '/blur.webp'"
        alt=""
        aria-hidden="true"
      />
      <div
        class="flex flex-col h-full overflow-y-auto w-full text-secondary-light dark:text-primary-light brightness-100 py-6 px-4 items-end"
      >
        <button
          @click="close"
          aria-label="Close project modal"
          class="h-8 w-8 p-1 border rounded-md hover:bg-secondary-light focus:bg-secondary-light hover:text-primary-light focus:text-primary-light cursor-pointer active:opacity-80 transition"
        >
          <span class="sr-only">Close project modal</span>
          <CrossIcon aria-hidden="true" />
        </button>
        <h1 id="modal-title" class="text-center w-full">{{ project.title }}</h1>
        <hr class="w-full" />
        <p id="modal-description" class="mt-6 text-lg">
          {{ $t(`projects.${project.descr}`) }}
        </p>
        <img
          alt=""
          aria-hidden="true"
          class="w-full h-auto rounded-xl mt-6"
          draggable="false"
          :src="project.src"
        />
        <div class="flex w-full justify-between flex-grow items-end">
          <a
            :href="project.url"
            :aria-label="`Visit ${project.title} website`"
            class="h-fit py-2 px-4 border mt-4 mb-2 uppercase flex items-center gap-2 justify-center cursor-pointer hover:bg-secondary-light hover:dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark focus:text-primary-light focus:bg-secondary-light focus:dark:bg-primary-light focus:dark:text-primary-dark active:opacity-80 transition-all rounded-lg"
          >
            {{ $t('projects.visit') }}
            <div class="h-6 aspect-square">
              <LinkIcon />
            </div>
          </a>
          <a
            :href="project.git"
            :aria-label="`View ${project.title} source code on GitHub`"
            class="h-fit py-2 px-4 border mt-4 mb-2 uppercase flex items-center gap-2 justify-center cursor-pointer hover:bg-secondary-light hover:dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark focus:text-primary-light focus:bg-secondary-light focus:dark:bg-primary-light focus:dark:text-primary-dark active:opacity-80 transition-all rounded-lg"
          >
            {{ $t('projects.source') }}
            <div class="h-6 aspect-square">
              <GithubIcon />
            </div>
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { projectType } from '@/text/projects'
import useScrollbarWidth from '@/utils/useScrollbarWidth'
import LinkIcon from './icons/LinkIcon.vue'
import CrossIcon from './icons/CrossIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'
const props = defineProps({
  project: {
    type: Object as PropType<projectType>,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
})
const exist = ref<boolean>(false)
const show = ref<boolean>(props.active)
const timerRef = ref<number | undefined>()
const modalRef = ref<HTMLElement | null>(null)
const scrollbarwidth = useScrollbarWidth()

watch(props, ({ active }) => {
  if (active) {
    exist.value = true
    if (timerRef.value) {
      clearTimeout(timerRef.value)
      timerRef.value = undefined
    }
  }
})
watch(exist, async (val) => {
  // setTimeout(() => {
  //   show.value = val
  // }, 1)
  await nextTick()
  show.value = val
})
const emit = defineEmits(['close'])
const close = () => {
  emit('close')
  timerRef.value = setTimeout(() => {
    exist.value = false
  }, 500)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }

  if (e.key === 'Tab' && modalRef.value) {
    const focusables = modalRef.value.querySelectorAll<HTMLElement>(
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

watch(
  () => props.active,
  async (isActive) => {
    if (isActive) {
      exist.value = true
      await nextTick()
      modalRef.value?.focus()
      window.addEventListener('keydown', handleKeydown)
    } else {
      window.removeEventListener('keydown', handleKeydown)
    }
  },
)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
