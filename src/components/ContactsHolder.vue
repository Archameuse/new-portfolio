<template>
  <ul
    class="flex gap-4 h-8"
    :class="footer ? ' text-primary-light' : 'text-secondary-light dark:text-primary-light'"
    aria-label="Social media links"
  >
    <ContactLink
      title="Github"
      href="https://github.com/Archameuse"
      aria-label="GitHub profile"
      :footer="footer"
    >
      <GithubIcon aria-hidden="true" />
      <span class="sr-only">Github</span>
    </ContactLink>
    <ContactLink
      title="@Archameus"
      href="https://t.me/archameus"
      aria-label="Telegram profile"
      :footer="footer"
    >
      <TelegramIcon aria-hidden="true" />
      <span class="sr-only">Telegram</span>
    </ContactLink>
    <ContactLink
      title="archameus"
      href="https://discordapp.com/users/447817370157842473"
      aria-label="Discord profile"
      :footer="footer"
    >
      <DiscordIcon aria-hidden="true" />
      <span class="sr-only">Discord</span>
    </ContactLink>
    <ContactLink
      title="divulinm@gmail.com"
      href="mailto:divulinm@gmail.com"
      aria-label="Send email to divulinm@gmail.com"
      email
      :footer="footer"
    >
      <GmailIcon aria-hidden="true" />
      <span class="sr-only">Email</span>
    </ContactLink>
  </ul>
</template>

<script setup lang="ts">
import ContactLink from './ContactLink.vue'
import DiscordIcon from './icons/DiscordIcon.vue'
import GithubIcon from './icons/GithubIcon.vue'
import GmailIcon from './icons/GmailIcon.vue'
import TelegramIcon from './icons/TelegramIcon.vue'

defineProps({
  footer: Boolean,
})
</script>
