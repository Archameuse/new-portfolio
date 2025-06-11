<template>
  <li
    class="h-full aspect-square rounded-full cursor-pointer transition-all"
    :class="
      footer
        ? 'bg-secondary-light dark:bg-secondary-dark hover:bg-primary-light hover:text-secondary-light dark:hover:text-secondary-dark'
        : 'bg-primary-light dark:bg-primary-dark hover:bg-secondary-light hover:text-primary-light dark:hover:text-primary-dark dark:hover:bg-primary-light'
    "
  >
    <a
      :title="title"
      :href="href"
      :target="!email ? '_blank' : ''"
      :rel="!email ? 'noopener noreferrer' : ''"
      ><slot></slot
    ></a>
  </li>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  href: {
    type: String,
    required: true,
  },
  email: Boolean,
  footer: Boolean,
})
</script>
