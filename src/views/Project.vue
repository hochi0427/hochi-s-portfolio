<template>
    <div>
      <!-- Title -->
      <section v-if="project" class="project">
        <h1>{{ project.name }}</h1>
        <div class="project-details">
          <img :src="`/hochi-s-portfolio/images/${project.image}`" :alt="project.name" />
          <div>
            <p>{{ project.description }}</p>
            <!-- Motivation & Purpose -->
            <div
              v-for="demonstrate in project.demonstrates.slice(0, 2)"
              :key="demonstrate.slug"
            >
              <Collapse :demonstrate="demonstrate" />
            </div>
          </div>
        </div>
      </section>

      <section class="demonstrates">
        <h2>System Introduction</h2>
        <div class="cards">
          <router-link
            v-for="demonstrate in project.demonstrates.slice(2)"
            :key="demonstrate.slug"
            :to="{
              name: 'demonstrate',
              params: { demonstrateSlug: demonstrate.slug },
            }"
          >
            <DemonstrateCard :demonstrate="demonstrate" />
          </router-link>
        </div>
        <router-view :key="$route.params.demonstrateSlug" />
      </section>
    </div>
</template>

<script>
// Title
import sourceData from "@/data.json";
// import GoBack from "@/components/GoBack.vue";
import DemonstrateCard from "@/components/DemonstrateCard.vue";
import Collapse from "@/components/Collapse.vue";
export default {
  props: {
    id: { type: Number, required: true },
  },
  computed: {
    project() {
      return sourceData.projects.find((project) => project.id === this.id);
    },
  },
  components: {
    // GoBack,
    DemonstrateCard,
    Collapse,
  },
};
</script>
