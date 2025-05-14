<template>
  <section class="flex flex-col w-full items-center gap-12 z-10" id="projects">
    <ProjectBox v-for="project of projects" v-bind:key="project" :project="project"/>
  </section>
</template>

<script setup lang="ts">
import ProjectBox from './ProjectBox.vue';

const projects = [
  '/2.jpg',
  '/3.jpg',
  '/8.jpg',
  '/5.jpg',
  '/6.jpg',
  '/7.jpg',
]

</script>
