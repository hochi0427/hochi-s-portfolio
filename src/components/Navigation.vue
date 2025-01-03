<template>
  <div id="nav">
    <router-link id="logo" to="/">Hochi's Portfolio</router-link>
    <router-link to="/about">About</router-link>

    <router-link
      v-for="project in projects"
      :key="project.id"
      :to="{ name: 'project', params: { id: project.id, slug: project.slug } }"
    >
      {{ project.name }}
    </router-link>
    <router-link to="/puzzlegame">Puzzle Game</router-link>
  </div>
</template>

<style>
#nav .active-link {
  color: #6a3e37;
  /* border-bottom: 2px solid #6a3e37; */
}
</style>

<script>
import sourceData from "@/data.json";
export default {
  data() {
    return {
      projects: sourceData.projects,
    };
  },
};
</script>
