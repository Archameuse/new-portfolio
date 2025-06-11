<template>
  <section
    class="flex flex-col w-full items-center gap-12 z-10"
    id="projects"
    role="region"
    aria-labelledby="projects-title"
  >
    <h2 id="projects-title" class="sr-only">Developers projects</h2>
    <ProjectBox v-for="project in projects" v-bind:key="project.title" :project="project" />
  </section>
</template>

<script setup lang="ts">
import { projects } from '@/text/projects'
import ProjectBox from './ProjectBox.vue'
</script>
