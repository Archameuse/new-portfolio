<script setup lang="ts">
import HeroSection from './components/HeroSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import TheHeader from './components/TheHeader.vue';
import AboutSection from './components/AboutSection.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
<TheHeader />
<main class="overflow-x-hidden relative z-1 bg-primary-light">
  <div class="flex flex-col gap-8 max-w-5xl mx-auto">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
  </div>
</main>
<TheFooter />
</template>

<style>

</style>
