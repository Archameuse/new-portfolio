<template>
  <aside v-if="exist" aria-disabled="true" @click="close" :class="(show&&active)?'opacity-100 pointer-events-all':'opacity-0 pointer-events-none'" class="fixed top-0 left-0 z-50 w-full h-full p-4 flex items-end justify-center transition duration-400 ease-out">
    <div class="absolute top-0 left-0 bg-black w-full h-full opacity-60"></div>
    <div @click.stop.prevent :class="(show&&active)?'translate-y-0':'translate-y-full'" class="w-full h-full max-w-4xl max-h-[48rem] bg-primary-light brightness-85 z-50 relative rounded-md transition duration-500">
      <img class=" w-full h-full absolute top-0 left-0 opacity-60 blur-xl object-cover" :src="src">
      <div class="flex flex-col h-full overflow-y-auto w-full text-secondary-light brightness-100 py-6 px-4">
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
        <h1>{{ src }}</h1>
        <hr class="w-full">
        <p class="mt-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero debitis accusantium totam eaque doloribus est accusamus facere ex minus commodi cupiditate mollitia sed nesciunt, molestiae, corrupti sapiente corporis voluptas amet! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum a, temporibus tempore debitis dicta ipsam fugit quas maxime exercitationem labore suscipit quos libero dignissimos vel necessitatibus natus, neque in magni.
        Eligendi soluta accusamus quo illum ut magnam doloremque animi earum nostrum commodi. Cupiditate dolore quidem natus rem eligendi expedita earum nisi dignissimos itaque facilis. Suscipit ab soluta rem officiis eligendi! Eligendi sit eum ullam quae ipsam veritatis doloremque, dignissimos, molestiae qui voluptatibus distinctio. Aspernatur amet, voluptatibus alias tempora saepe voluptas voluptates explicabo.</p>
        <img class="w-full h-auto rounded-xl" draggable="false" :src="src">
        <button class="w-full py-2 px-4 border mt-4 mb-2 uppercase flex items-center gap-2 justify-center cursor-pointer hover:bg-secondary-light hover:text-primary-light focus:text-primary-light focus:bg-secondary-light active:opacity-80 transition-all rounded-lg">
          Visit Website
          <div class="h-6 aspect-square">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </div>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
  const props = defineProps({
    src: {
      type: String,
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
