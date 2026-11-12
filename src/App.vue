<template>
  <Navigation v-if="$route.name !== 'Home'" />
  <div
    class="container"
    :class="{ 'container--world-home': $route.name === 'Home' }"
  >
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";

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

.container--world-home {
  max-width: none;
  min-height: 100svh;
  margin: 0;
}

body:has(.container--world-home) {
  min-width: 320px;
  margin-top: 0;
  overflow-x: hidden;
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
