<template>
  <div class="home">
    <h1>My Projects</h1>

    <div class="projects">
      <router-link to="/about">
        <h2>About</h2>
        <p class="subLabel">About me</p>
        <img class="logo" src="/images/Hochi.jpg" alt="About me" />
      </router-link>
      <router-link
        v-for="project in projects"
        :key="project.id"
        :to="{
          name: 'project',
          params: { id: project.id, slug: project.slug },
        }"
      >
        <h2>{{ project.name }}</h2>
        <p class="subLabel">{{ project.subLabel }}</p>

        <img
          class="logo"
          :src="`/images/${project.image}`"
          :alt="project.name"
        />
      </router-link>
      <router-link to="/puzzlegame">
        <h2>PuzzleGame</h2>
        <p class="subLabel">N-puzzle</p>
        <img class="logo" src="/images/Puzzle.jpg" alt="Puzzle Game" />
      </router-link>
    </div>
  </div>
</template>

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
