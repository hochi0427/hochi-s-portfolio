<template>
  <div id="nav">
    <router-link id="logo" to="/">Hochi's Portfolio</router-link>
    <router-link to="/about">About</router-link>

    <router-link
      v-for="project in projects"
      :key="project.id"
      :to="getProjectRoute(project)"
    >
      {{ project.name }}
    </router-link>
    
  </div>
</template>

<style>
#nav .active-link {
  color: #6a3e37;
  /* border-bottom: 2px solid #6a3e37; */
}
</style>

<script>
import sourceData from "../data.json";
export default {
  data() {
    return {
      projects: this.sortMusleepLast(
        sourceData.projects.filter((project) => project.slug !== "venology")
      ),
    };
  },
  methods: {
    getProjectRoute(project) {
      if (project.slug === "vignette") {
        return { name: "Vignette" };
      }
      if (project.slug === "math-tactics") {
        return { name: "MathTactics" };
      }
      if (project.slug === "2d-unity-game") {
        return { name: "GameMod" };
      }
      if (project.slug === "3d-unity-game") {
        return { name: "WeightGame" };
      }

      return {
        name: "project",
        params: { id: project.id, slug: project.slug },
      };
    },
    sortMusleepLast(projects) {
      return [...projects].sort((current, next) => {
        if (current.slug === "musleep") return 1;
        if (next.slug === "musleep") return -1;
        return 0;
      });
    },
  },
};
</script>
