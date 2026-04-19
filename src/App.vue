<template>
  <Navigation />
  <div class="container">
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  components: {
    Navigation,
  },
  computed: {
    transitionName() {
      return ["About", "Home", "project", "PuzzleGame"].includes(
        this.$route.name
      )
        ? "fade"
        : "";
    },
  },
};
</script>

<style lang="css">
.container {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
