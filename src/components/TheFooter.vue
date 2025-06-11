<template>
  <footer
    aria-label="Footer with contact information"
    role="contentinfo"
    class="w-full bg-secondary-light dark:bg-secondary-dark text-white sticky bottom-0 flex flex-col justify-end text-center px-8 py-4 items-center gap-4 overflow-hidden"
  >
    <div class="w-full max-w-xl mx-auto flex">
      <h2 class="text-2xl xs:text-3xl md:text-4xl text-left">
        {{ $t('reach.1') }} <b class="text-primary-light">divulinm@gmail.com</b> {{ $t('reach.2') }}
      </h2>
    </div>
    <ContactsHolder footer />
    <hr class="w-full max-w-xl" />
    <p>© 2025 Mihail Divulin | All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
import ContactsHolder from './ContactsHolder.vue'
</script>
