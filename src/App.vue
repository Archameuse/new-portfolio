<script setup lang="ts">
import TheHeader from './components/TheHeader.vue';
import HeroSection from './components/HeroSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import AboutSection from './components/AboutSection.vue';
import TheFooter from './components/TheFooter.vue';
// import AsteroidsBox from './components/AsteroidsBox.vue';

</script>

<template>
  <TheHeader />
  <main class="overflow-x-hidden relative z-1 bg-primary-light dark:bg-primary-dark">
    <div class="flex flex-col gap-8 max-w-5xl mx-auto">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
    </div>
  </main>
  <TheFooter />
  <!-- <AsteroidsBox /> -->
   <!-- без Q-Learning нет смысла трогать -->
</template>

<style>

</style>
