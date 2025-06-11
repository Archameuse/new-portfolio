<template>
  <TheHeader />
  <main
    class="overflow-x-hidden relative z-1 bg-primary-light dark:bg-primary-dark flex flex-col gap-8"
  >
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import AboutSection from './components/AboutSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TheFooter from './components/TheFooter.vue'
import TheHeader from './components/TheHeader.vue'
</script>
